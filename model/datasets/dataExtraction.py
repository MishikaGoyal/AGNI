import pdfplumber
import re
import pprint

# Path to your PDF file
pdf_file = r"model\datasets\Beawar 1 school example.pdf"

# Initialize a dictionary to store extracted data
data = {}

# Define refined regex patterns for the required fields
patterns = {
    'UDISE CODE': r'UDISE CODE\s*:?[\s\n]*(\d{2}\s*\d{2}\s*\d{2}\s*\d{2}\s*\d{3})',
    'School Name': r'School Name\s*:?[\s\n]*(.+)',
    'State': r'State\s*:?[\s\n]*([\w\s]+)\s+District',
    'School Category': r'School Category\s*:?[\s\n]*(\d\s*-\s*[\w\s.]+)',
    'School Management': r'School Management\s*:?[\s\n]*(\d\s*-\s*[\w\s()]+)',
    'School Type': r'School Type\s*:?[\s\n]*(\d\s*-\s*[\w\s]+)',
    'Lowest & Highest Class': r'Lowest & Highest Class\s*:?[\s\n]*(\d{1,2})\s*-\s*(\d{1,2})',
    'Year of Establishment': r'Year of Establishment\s*:?[\s\n]*(\d{4})',
    'Boundary Wall': r'Boundary wall\s*:?[\s\n]*(\d\s*-\s*[\w\s]+)',
    'Total Toilets (Excluding CWSN)': r'Total\(Excluding CWSN\)\s*:?[\s\n]*(\d+)\s+(\d+)',
    'Total Class Rooms': r'Total Class Rooms\s*:?[\s\n]*(\d+)',
    'Library Available': r'Library Availability\s*:?[\s\n]*(\d\s*-\s*[\w\s]+)',
    'Separate Room for HM': r'Separate Room for HM\s*:?[\s\n]*(\d\s*-\s*[\w\s]+)',
    'Drinking Water Available': r'Drinking Water Available\s*:?[\s\n]*(\d\s*-\s*[\w\s]+)',
    'Playground Available': r'Playground Available\s*:?[\s\n]*(\d\s*-\s*[\w\s]+)',
    'Electricity Availability': r'Electricity Availability\s*:?[\s\n]*(\d\s*-\s*[\w\s]+)',
    'ICT Lab': r'ICT Lab\s*:?[\s\n]*(\d\s*-\s*[\w\s]+)',
    'Total Number of teachers': r'Total\s*:?[\s\n]*(\d+)\s+(\d+)',
    'Total Number of students': r'G\.Tot.*\s(\d+)(?:\s|$)'
}

# Custom cleanup function to remove extra text
def clean_text(text, key):
    text = text.strip()
    # Remove specific unwanted patterns
    text = re.sub(r'\nTotal', '', text)
    text = re.sub(r'\nHandwash Facility for Meal 1', '', text)
    text = re.sub(r'\nUrinal 43 14 Furniture Availability 2400\nHandwash Near Toilet 1', '', text)
    text = re.sub(r' 1$', '', text)
    text = re.sub(r'Anganwadi Girls 0\nYear of Recognition', '', text)
    text = re.sub(r'Solar Panel', '', text)
    text = re.sub(r'Medium of Instruction|Visit of school for', '', text)
    text = re.sub(r'Medium 1 19', '', text)
    text = re.sub(r'Medical checkups', '', text)
    text = re.sub(r'Internet', '', text)
    
    return text.strip()

# Open the PDF file
with pdfplumber.open(pdf_file) as pdf:
    for page in pdf.pages:
        # Extract text from each page
        text = page.extract_text()
        
        if text:
            for key, pattern in patterns.items():
                if key == 'Total Number of students':
                    # Find the G.Tot row and extract the last number
                    match = re.search(pattern, text, re.MULTILINE)
                    if match:
                        # The last number in the G.Tot row
                        data[key] = match.group(1)
                else:
                    match = re.search(pattern, text, re.MULTILINE)
                    if match:
                        # Clean up unwanted data using the custom cleanup function
                        cleaned_data = clean_text(match.group(1), key)

                        # Handle special cases for multi-group matches
                        if key in ['Total Toilets (Excluding CWSN)', 'Lowest & Highest Class']:
                            cleaned_data = f"{match.group(1)} - {match.group(2)}"

                        # Avoid duplicating School Name and UDISE CODE
                        if key not in data or key in ['Total Number of students', 'Total Number of Teachers']:
                            data[key] = cleaned_data

# Print the extracted data as a single dictionary
pprint.pprint(data)