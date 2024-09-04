import pdfplumber
import re

# Path to your PDF file
pdf_file = "Beawar 1 school example.pdf"
# Initialize a list to store extracted data
data = []

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
    'Total(Excluding CWSN)': r'Total\(Excluding CWSN\)\s*:?[\s\n]*(\d+)\s+(\d+)',
    'Total Class Rooms': r'Total Class Rooms\s*:?[\s\n]*(\d+)',
    'Library Available': r'Library Availability\s*:?[\s\n]*(\d\s*-\s*[\w\s]+)',
    'Separate Room for HM': r'Separate Room for HM\s*:?[\s\n]*(\d\s*-\s*[\w\s]+)',
    'Drinking Water Available': r'Drinking Water Available\s*:?[\s\n]*(\d\s*-\s*[\w\s]+)',
    'Playground Available': r'Playground Available\s*:?[\s\n]*(\d\s*-\s*[\w\s]+)',
    'Electricity Availability': r'Electricity Availability\s*:?[\s\n]*(\d\s*-\s*[\w\s]+)',
    'ICT Lab': r'ICT Lab\s*:?[\s\n]*(\d\s*-\s*[\w\s]+)',
    'G.Tot': r'G.Tot\s*:?[\s\n]*(\d+)',
    'Total': r'Total\s*:?[\s\n]*(\d+)\s+(\d+)'  # This is for the total right of the Classes Taught
}

# Open the PDF file
with pdfplumber.open(pdf_file) as pdf:
    for page in pdf.pages:
        # Extract text from each page
        text = page.extract_text()
        if text:
            # Store extracted data for this page
            page_data = {}
            for key, pattern in patterns.items():
                match = re.search(pattern, text, re.MULTILINE)
                if match:
                    if key in ['Total(Excluding CWSN)', 'Lowest & Highest Class', 'Total']:
                        page_data[key] = f"{match.group(1)} - {match.group(2)}"
                    else:
                        page_data[key] = match.group(1).strip()
            if page_data:
                data.append(page_data)

# Print the extracted data
for entry in data:
    print(entry)
