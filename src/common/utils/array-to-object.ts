function arrayToObject(arr: any[]) {
  return arr.reduce(
    (obj, curr, i) => ((obj[i] = curr), obj),
    {} as { [key: number]: any }
  );
}

export default arrayToObject;
