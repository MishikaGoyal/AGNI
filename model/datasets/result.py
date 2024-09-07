from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client['Data'] 
collection = db['School'] 

def check_conditions(record):
    total_teachers = int(record.get("Total Teachers", 0))
    total_students = int(record.get("Total Students", 0))
    cwsn = int(record.get("CWSN", 0))
    separate_room_for_hm = int(record.get("Separate Room for HM", 0))
    grade_configuration = tuple(map(int, record.get("Grade Configuration", "0-0").split('-')))
    school_type = int(record.get("School Type", 0))
    total_washrooms = tuple(map(int, record.get("Total Washrooms", "0-0").split('-')))
    boundary_wall = int(record.get("Boundary Wall", 0))
    library_available = int(record.get("Library Available", 0))
    drinking_water_available = int(record.get("Drinking Water Available", 0))
    playground_available = int(record.get("Playground Available", 0))
    electricity_availability = int(record.get("Electricity Availability", 0))
    total_classrooms = int(record.get("Total Class Rooms", 0))

    if (total_teachers * 40 > total_students or
        cwsn < 1 or
        separate_room_for_hm != 1 or
        grade_configuration not in [(1, 5), (1, 10), (1, 12), (6, 10), (11, 12)] or
        (school_type == 3 and (total_washrooms[0] < 1 or total_washrooms[1] < 1)) or
        boundary_wall != 1 or
        library_available != 1 or
        drinking_water_available != 1 or
        playground_available != 1 or
        electricity_availability != 1 or
        total_classrooms < total_teachers):
        return "ODD"
    else:
        return "Standard"

for record in collection.find():
    result = check_conditions(record)
    # Update or add the 'Result' field in the record
    collection.update_one(
        {"_id": record["_id"]},  # Use the unique identifier to find the record
        {"$set": {"Result": result}}
    )

print("Records updated successfully.")
