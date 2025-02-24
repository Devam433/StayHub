export default function modifyDataStructure(dataToModify, structure) {

  console.log('Inside modifyDataStructure')
  const modifiedData = {};

  Object.keys(structure).forEach((key) => {
    if (typeof structure[key] === "object" && !Array.isArray(structure[key])) {
      // Nested object
      modifiedData[key] = modifyDataStructure(dataToModify, structure[key]);
    } else if (Array.isArray(structure[key])) {
      // Array handling
      modifiedData[key] = Array.isArray(dataToModify[key]) ? dataToModify[key] : [];
    } else {
      // Primitive value
      modifiedData[key] = Object.hasOwn(dataToModify, key) ? dataToModify[key] : structure[key];
    }
  });
  return modifiedData;
}

// Example inputs
// const structure = {
//   createdBy: "",
//   starydeatils: {
//     address: {
//       village: "",
//       landmark: "",
//       geolocation: "",
//     },
//     rent: 0,
//     category: "",
//     isBooked: false,
//     images: [],
//   },
// };

// const dataToModify = {
//   village: "wood",
//   rent: 10000,
//   landmark: "school",
//   geolocation: "some geo location",
//   images: ["url", "url", "url"],
//   isBooked: false,
// };

// const result = modifyDataStructure(dataToModify, structure);
// console.log(result);
