export function sheetToUpperCase(inputData: any) {
const uppercasedData = inputData.map((dataEntry: any) => {
  return Object.fromEntries(
    Object.entries(dataEntry).map(([propertyKey, propertyValue]) => {
      if (typeof propertyValue === 'string') {
        return [propertyKey, propertyValue.toUpperCase()];
      }
      return [propertyKey, propertyValue];
    })
  );
});
return uppercasedData;
}