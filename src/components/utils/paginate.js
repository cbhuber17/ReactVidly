import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;

  // (items) is a lodash wrapper
  // value() returns it back to a normal array
  // slice() the array at the start index
  // take() the number of items from the start index
  return _(items).slice(startIndex).take(pageSize).value();

  // This is equivalent to:
  //_.slice(items, startIndex)._take(items, pageSize)._value();
}
