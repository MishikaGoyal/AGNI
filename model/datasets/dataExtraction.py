import PyPDF2
import re
import json
import os
def extract_school_data(pdf_file):
    with open(pdf_file, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ''
        for page in reader.pages:
            text += page.extract_text()

    # Regular expression patterns to match the required data
    patterns = {
        "UDISE CODE": r'UDISE CODE\s*:\s*(\d{2}\s+\d{2}\s+\d{2}\s+\d{2}\s+\d{3})',
        "School Name": r'School Name\s*:\s*(.+)',
        "State": r'State\s+([A-Za-z]+)',
        "School Category": r'School Category\s*(\d+)',  # Extracting only the number
        "School Management": r'School Management\s*(\d+\s*-\s*.+)',
        "School Type": r'School Type\s*(\d+\s*-\s*.+)',
        "Grade Configuration": r'Lowest & Highest Class\s*(\d+)\s*-\s*(\d+)',  # Adjusting format below
        "Year of Establishment": r'Year of Establishment\s*(\d{4})',
        "Boundary Wall": r'Boundary wall\s*(\d+)',
        "Total Class Rooms": r'Total Class Rooms\s*(\d+)',
        "Library Available": r'Library Availability\s*(\d+)',
        "Separate Room for HM": r'Separate Room for HM\s*(\d+)',
        "Drinking Water Available": r'Drinking Water Available\s*(\d+)',
        "Playground Available": r'Playground Available\s*(\d+)',
        "Electricity Availability": r'Electricity Availability\s*(\d+)',
        "Total Teachers": r'Total\s*(\d+)\s*',
        "CWSN": r'Cwsn*\s(\d+)(?:\s|$)',
        "Total Students": r'G\.Tot.*\s(\d+)(?:\s|$)'
    }

    extracted_data = {}

    # Extract data using regular expressions
    for key, pattern in patterns.items():
        match = re.search(pattern, text)
        if match:
            if key == "Lowest & Highest Class":
                # Formatting the output to "1-7"
                extracted_data[key] = f"{match.group(1)}-{match.group(2)}"
            else:
                extracted_data[key] = match.group(1)

    return extracted_data

# Define the folder path containing the PDF files
folder_path = "./School Downloads"

# Create a list to store the extracted data from each PDF
all_school_data = []

# Iterate over all PDF files in the folder
for filename in os.listdir(folder_path):
    if filename.endswith(".pdf"):
        pdf_file_path = os.path.join(folder_path, filename)
        # Extract data from the current PDF file
        school_data = extract_school_data(pdf_file_path)
        all_school_data.append(school_data)

# Define the output JSON file path
output_json_path = "./schools_data.json"

# Save the extracted data to a JSON file
with open(output_json_path, "w") as json_file:
    json.dump(all_school_data, json_file, indent=4)

print(f"Data extracted and saved to {output_json_path}")
