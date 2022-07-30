/**
 * Formats a day string to match whatever format was already hard coded in.
 */
function formatDay(day, dateInstance) {
    return day + ", " + ("0" + dateInstance.getDate()).slice(-2) + "/" + ("0" + (dateInstance.getMonth() + 1)).slice(-2) + "/" + dateInstance.getFullYear()
}

/**
 * Formats a date instance to match whatever format was already hard coded in.
 */
function formatDate(dateInstance) {
    return dateInstance.getFullYear()+"-"+("0" + (dateInstance.getMonth() + 1)).slice(-2)+"-"+("0" + dateInstance.getDate()).slice(-2)
}

this.format = {
    day: formatDay,
    date: formatDate
};

module.exports = format;