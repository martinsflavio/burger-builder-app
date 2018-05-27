const objDeepCopy = obj => {
  let outputObj, value, key;

  if (obj === null || obj === undefined || typeof obj !== "object") {
    outputObj = obj;
  } else {
    outputObj = Array.isArray(obj) ? [] : {};

    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        value = obj[key];
        outputObj[key] = (typeof value === "object") ? objDeepCopy(value) : value;
      }
    }

  }

  return outputObj;
};

export default objDeepCopy;
