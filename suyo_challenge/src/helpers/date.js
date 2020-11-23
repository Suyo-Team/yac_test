export const getDateFromSeconds = (seconds) => {
  let date = new Date(seconds)
  let formatDate = date.toString()

  return formatDate
}
