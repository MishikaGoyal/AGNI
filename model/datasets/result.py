from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client['Data'] 
collection = db['School'] 

def check_conditions(record):
    total_teachers = int(record.get("Total Teachers", 0))
    total_students = int(record.get("Total Students", 0))
    separate_room_for_hm = int(record.get("Separate Room for HM", 0))
    grade_configuration_str = record.get("Grade Configuration", "(0,0)")
    grade_configuration = tuple(map(int, grade_configuration_str.strip("()").split(',')))
    school_type = int(record.get("School Type", 0))
    total_washrooms_str = record.get("Total Washrooms", "(0,0)")
    total_washrooms = tuple(map(int, total_washrooms_str.strip("()").split(',')))
    boundary_wall = int(record.get("Boundary Wall", 0))
    library_available = int(record.get("Library Available", 0))
    drinking_water_available = int(record.get("Drinking Water Available", 0))
    playground_available = int(record.get("Playground Available", 0))
    electricity_availability = int(record.get("Electricity Availability", 0))
    total_classrooms = int(record.get("Total Class Rooms", 0))

    if (total_teachers * 40 < total_students):
        return "1ODD"
    if (separate_room_for_hm != 1 ):
        return "2ODD"
    if (grade_configuration not in [(1, 5), (1, 10), (1, 12), (6, 10), (11, 12), (6,12)] ):
        return "3ODD"
    if (school_type == 3 and (total_washrooms[0] < 1 or total_washrooms[1] < 1)) :
        return "4ODD"
    if (boundary_wall != 1 ):
        return "5ODD"
    if (library_available != 1) :
        return "6ODD"
    if (drinking_water_available != 1): 
        return "7ODD"
    if (playground_available != 1 ):
        return "8ODD"
    if (electricity_availability != 1 ):
        return "9ODD"
    if (total_classrooms < total_teachers):
        return "10ODD"
    else:
        return "Standard"

for record in collection.find():
    result = check_conditions(record)
    collection.update_one(
        {"_id": record["_id"]},  
        {"$set": {"Result": result}}
    )

print("Records updated successfully.")

'''
Errors to be solved:
The conditions for Grade configuration and Washrooms are not working
'''