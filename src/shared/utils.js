const longMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const shortMonths = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export function convertToLongDate(date) {
  // date = dd/mm/yyyy
  let arr = date.split('/');
  return `${longMonths[arr[1] - 1]} ${arr[0]}, ${arr[2]}`;
}

export function convertToShortDate(date) {
  // date = dd/mm/yyyy
  let arr = date.split('/');
  return `${arr[0]} ${shortMonths[arr[1] - 1]} ${arr[2]}`;
}
