export function sheetToLowerCase(data: any) {
const upperCasedData = data.map((entry : any) => {
  return Object.fromEntries(
    Object.entries(entry).map(([key, value]) => {
      if (typeof value === 'string') {
        return [key, value.toUpperCase()];
      }
      return [key, value];
    })
  );
});
return upperCasedData;
}