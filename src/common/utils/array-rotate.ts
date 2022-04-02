function arrayRotate(arr: any[], count: number) {
  arr = arr.slice();
  count -= arr.length * Math.floor(count / arr.length);
  arr.push.apply(arr, arr.splice(0, count));
  return arr;
}

export default arrayRotate;
