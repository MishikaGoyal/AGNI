from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
import joblib
import os
from pymongo import MongoClient
from your_ml_script import extract_data_from_pdf, check_conditions

app = Flask(__name__)
CORS(app)

# MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['Data']  # Database
collection = db['predicted_results']  # Collection where results will be stored

# Load the pre-trained model
model = joblib.load('C:/Users/Hp/Desktop/Working/SIH 2024/Test/model/school_result_model.pkl')

# Create upload folder for storing files
app.config['UPLOAD_FOLDER'] = 'uploads/'

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

# Prediction and MongoDB update route
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

    
    # Extract data from PDF and make prediction
    new_data, full_data = extract_data_from_pdf(filepath)
    
    # Define relevant columns for the model
    relevant_columns = ['School Type', 'Grade Configuration', 'Boundary Wall', 'Total Class Rooms', 
                        'Library Available', 'Separate Room for HM', 'Drinking Water Available', 
                        'Playground Available', 'Electricity Availability', 'Total Teachers', 
                        'Total Washrooms', 'Total Students']
    
    new_data = new_data[relevant_columns]

    # Check conditions and make predictions
    check = check_conditions(full_data)
    predicted_result = model.predict(new_data)

    # Update the result based on prediction and conditions
    if check == predicted_result:
        full_data['Result'] = 'Standard' if predicted_result[0] == 1 else 'ODD'
    else:
        full_data['Result'] = check
    
    print (full_data)

    # Store the result in MongoDB
    collection.insert_one(full_data)

    return full_data

if __name__ == '__main__':
    app.run(debug=True)