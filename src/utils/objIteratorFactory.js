function* objIteratorFactory (obj) {
  let index = 0, objKeys = {};

  if (obj === null || obj === undefined || typeof obj !== "object") {
    yield obj;
  } else {
    objKeys = Object.keys(obj);

    while (index < objKeys.length) {
      yield obj[objKeys[index++]];
    }
  }
}

export default objIteratorFactory;
