export function vlookup(valueToFind, dataArray, key) {
    return dataArray.find(item => item[key] == valueToFind);
}
