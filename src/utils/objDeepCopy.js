const objDeepCopy = obj => {
  let output, v, key;

  if (obj === null || undefined) {
    output = obj;
  } else {
    output = Array.isArray(obj) ? [] : {};
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        v = obj[key];
        output[key] = (typeof v === "object") ? objDeepCopy(v) : v;
      }
    }
  }

  return output;
};

export default objDeepCopy;
