from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
import joblib
import os
from your_ml_script import extract_data_from_pdf, check_conditions, reasons

app = Flask(__name__)
CORS(app)

model = joblib.load('model/school_result_model.pkl')

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

@app.route('/reasons', methods=['GET'])
def get_reasons():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    full_data = extract_data_from_pdf(filepath)

    reasons_output = reasons(full_data)

    return reasons_output

if __name__ == '__main__':
    app.run(debug=True)