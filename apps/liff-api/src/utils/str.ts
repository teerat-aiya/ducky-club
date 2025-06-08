const camelcaseKeys = (obj: any): any => {
  if (typeof obj !== "object" || obj === null) {
    return obj; // Return unchanged if not an object
  }

  // If array, map over each element
  if (Array.isArray(obj)) {
    return obj.map((item) => camelcaseKeys(item));
  }

  // Convert keys to camelCase
  const newObj: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const camelCaseKey = key.replace(/_([a-z])/g, (match, letter) =>
        letter.toUpperCase()
      );
      newObj[camelCaseKey] = camelcaseKeys(obj[key]);
    }
  }

  return newObj;
};

export { camelcaseKeys };
