// Helper functions
const getCurrentYear = () => new Date().getFullYear();

const extractMainValue = ({ "Year_of_Establishment": yearOfEstablishment, "Result": result, "School_Management": schoolManagement }) => ({
  yearOfEstablishment: parseInt(yearOfEstablishment, 10),
  result,
  schoolManagement: parseInt(schoolManagement, 10),
});

const calculateYear = (yearOfEstablishment, currentYear) => currentYear - yearOfEstablishment;

const managementCategory = (schoolManagement) => [1, 2, 3, 6, 89, 90, 91, 4, 7, 92, 93, 94, 95, 96, 101, 8, 97, 98, 102].includes(schoolManagement);

const getTeacherandStudent = ({ "Total_Teachers": teachers, "Total_Students": students }) => ({
  current_teacher: parseInt(teachers, 10),
  current_stud: parseInt(students, 10),
});

const getTeahcerAndClass = ({ "Total_Class_Rooms": classrooms, "Total_Teachers": teachers }) => ({
  current_classroom: parseInt(classrooms, 10),
  current_teacher: parseInt(teachers, 10),
});

const getLibrary = ({ "Library_Available": isLibrary, "School_Category": school_category }) => ({
  isLibrary: parseInt(isLibrary, 10),
  school_category: parseInt(school_category, 10),
});

const getWashroomData = ({ "Total_Washrooms": washrooms, "Total_Students": total_students }) => {
  const [boys_washroom, girls_washroom] = washrooms.replace(/[()]/g, '').split(',').map(Number);
  return { boys_washroom, girls_washroom, total_students: parseInt(total_students, 10) };
};

const getDrinkingWater = ({ "Drinking_Water_Available": drinkingWater }) => parseInt(drinkingWater, 10);

const getBoundaryWall = ({ "Boundary_Wall": wall }) => parseInt(wall, 10);

const getHeadmasterRoom = ({ "Separate_Room_for_HM": headmaster_room }) => parseInt(headmaster_room, 10);

const getPlayground = ({ "Playground_Available": playground }) => parseInt(playground, 10);

const getElectricity = ({ "Electricity_Availability": electricity }) => parseInt(electricity, 10);

// Main logic functions

const checkEligibility = (inputData) => {
  const currentYear = getCurrentYear();
  const { yearOfEstablishment, result, schoolManagement } = extractMainValue(inputData);

  const yearsSinceEstablishment = calculateYear(yearOfEstablishment, currentYear);
  const isManagedProperly = managementCategory(schoolManagement);

  if (yearsSinceEstablishment <= 10) {
    return { eligible: false, reason: "The school is less than 10 years old." };
  }

  if (result !== "ODD") {
    return { eligible: false, reason: `The result is '${result}', not 'ODD'.` };
  }

  if (!isManagedProperly) {
    return { eligible: false, reason: "The school management category is not in the eligible list." };
  }

  return { eligible: true };
};

const teacherGrant = (inputData) => {
  const { current_teacher, current_stud } = getTeacherandStudent(inputData);
  if (current_teacher * 40 < current_stud) {
    const requiredTeachers = Math.ceil(current_stud / 40);
    return requiredTeachers - current_teacher;
  } else {
    return "No teacher required.";
  }
};

const classRoomGrant = (inputData) => {
  const { current_classroom, current_teacher } = getTeahcerAndClass(inputData);
  const classroomShortage = current_teacher - current_classroom;
  return classroomShortage > 0 ? classroomShortage * 10000 : "No classroom required.";
};

const libraryGrant = (inputData) => {
  const { isLibrary, school_category } = getLibrary(inputData);
  const grants = {
    1: 5000, 2: 13000, 3: 20000, 4: 10000, 8: 10000, 11: 10000,
    5: 15000, 6: 15000, 7: 15000, 10: 15000,
  };
  return isLibrary === 2 || isLibrary === 3 ? grants[school_category] || "No grant" : "Library not required.";
};

const washroomGrant = (inputData) => {
  const { boys_washroom, girls_washroom, total_students } = getWashroomData(inputData);
  const grantAmounts = [
    { max: 100, amount: 27500 },
    { max: 250, amount: 55000 },
    { max: 1000, amount: 82500 },
    { max: 3000, amount: 110000 },
  ];

  let totalAmount = 0;
  if (boys_washroom < 1 || girls_washroom < 1) {
    const studentGrant = grantAmounts.find(({ max }) => total_students <= max).amount;
    totalAmount += boys_washroom < 1 ? studentGrant : 0;
    totalAmount += girls_washroom < 1 ? studentGrant : 0;
    return totalAmount;
  }
  return "Already enough washrooms.";
};

const waterGrant = (inputData) => {
  return getDrinkingWater(inputData) === 2 || getDrinkingWater(inputData) === 3 ? 10000 : "Drinking water available.";
};

const grantForWall = (inputData) => {
  return getBoundaryWall(inputData) === 2 || getBoundaryWall(inputData) === 3 ? 10000 : "Wall is present.";
};

const grantForHMroom = (inputData) => {
  return getHeadmasterRoom(inputData) === 2 || getHeadmasterRoom(inputData) === 3 ? 10000 : "Headmaster room available.";
};

const grantPlayGround = (inputData) => {
  return getPlayground(inputData) === 2 || getPlayground(inputData) === 3 ? 10000 : "Playground available.";
};

const grantElectricity = (inputData) => {
  return getElectricity(inputData) === 2 || getElectricity(inputData) === 3 ? 10000 : "Electricity available.";
};

// Export the functions
export  {
  checkEligibility,
  teacherGrant,
  classRoomGrant,
  libraryGrant,
  washroomGrant,
  waterGrant,
  grantForWall,
  grantForHMroom,
  grantPlayGround,
  grantElectricity,
};
