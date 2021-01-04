export const parseData = arr => {
  try {
    arr.forEach(item => {
      const [_, month, day] = item.dateupdate.split("-");
      item.date = `${day}/${month}`;
      item.ocupation = parseInt(item.hospital_ocupation.replace("%", ""));
      delete item.dateupdate;
      delete item.hospital_ocupation;
    });
  } catch {
    return arr;
  }

  return arr;
};
