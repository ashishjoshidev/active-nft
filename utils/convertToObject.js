// utils.js
const convertArrayToObject = (inputArray) => {
  return inputArray.map((item) => {
    return {
      address: item[0],
      tokenID: item[1].hex,
      price: item[2].hex,
      quantity: item[3].hex,
      active: item[4],
    };
  });
};

export default convertArrayToObject;
