function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (txt: string) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  );
}

export default toTitleCase;
