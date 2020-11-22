export const getDateFromMilliseconds = (milliseconds) => {
  let date = new Date(milliseconds)
  let formatDate = date.toString()

  return formatDate
}
