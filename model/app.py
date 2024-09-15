from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
import joblib
import os
import google.generativeai as genai
from dotenv import load_dotenv
from your_ml_script import extract_data_from_pdf, check_conditions, reasons, gemini_pro_response

app = Flask(__name__)
CORS(app)

load_dotenv()
api_key = os.getenv("api_key")
genai.configure(api_key=api_key)

model = joblib.load('school_result_model.pkl')

app.config['UPLOAD_FOLDER'] = 'uploads/'

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Save the file
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    new_data, full_data = extract_data_from_pdf(filepath)
    
    relevant_columns = ['School Type', 'Grade Configuration', 'Boundary Wall', 'Total Class Rooms', 
                        'Library Available', 'Separate Room for HM', 'Drinking Water Available', 
                        'Playground Available', 'Electricity Availability', 'Total Teachers', 
                        'Total Washrooms', 'Total Students']
    
    new_data = new_data[relevant_columns]

    check = check_conditions(full_data)
    predicted_result = model.predict(new_data)

    if check == predicted_result:
        full_data['Result'] = 'Standard' if predicted_result[0] == 1 else 'ODD'
    else:
        full_data['Result'] = check

    return full_data

@app.route('/reasons', methods=['POST'])
def get_reasons():

    full_data = request.get_json()

    if not full_data:
        return jsonify({"error": "No data provided"}), 400
    
    reasons_output = reasons(full_data)
    return reasons_output

@app.route('/suggestions', methods=['POST'])
def generate_guidance():
    data = request.get_json()

    reason = reasons(data)

    if not data or 'Reasons' not in data:
        return jsonify({"error": "No reasons provided"}), 400

    prompt_header = '''
    You are Sam, an AI assistant helping school principals in India align their schools with the Samagra Shiksha Framework and the New Education Policy (NEP), use data from these policies as well as other policies, and use correct data only.

    Objective: When provided with the reason for being classified as an "odd" structure, generate a clear, actionable guidance message. The message should provide solutions based on government policies and available resources. If the school is standard, then just output that the school is standard.

    Guidance Message Structure:
    Comparison to Standards: Highlight the exact differences, such as teacher-student ratios or infrastructure gaps, based on policy benchmarks.
    Action Plan:
    
    Immediate Actions: Suggest specific steps to align with Samagra Shiksha or NEP standards, such as restructuring grades or optimizing class sizes.
    Resource Use: Identify precise and correct government schemes or grants for improving infrastructure, staff, or learning materials to standardize the school.

    Implementation:
    Stakeholder Involvement: Define roles for public, students, and school authorities in the school’s transformation, be precise about their roles.
    Resource Management: Properly guide the principal on accessing and using available grants for necessary changes.
    Timeline: Provide a clear timeline for immediate fixes and long-term improvements.
    Do not assume if information is not provided.
    '''

    prompt = prompt_header + f"\n\nReasons: {reason}"
    guidance_message = gemini_pro_response(prompt)

    return guidance_message

if __name__ == '__main__':
    app.run(debug=True)