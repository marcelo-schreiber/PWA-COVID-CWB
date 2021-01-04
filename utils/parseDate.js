export const parseDate = arr => {
  try {
    arr.forEach(item => {
      const [_, month, day] = item.dateupdate.split("-");
      item.date = `${day}/${month}`;
      delete item.dateupdate;
    });
  } catch {
    return arr;
  }

  return arr;
};
