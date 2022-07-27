function formatDay(day, dateInstance) {
    return day + ", " + ("0" + dateInstance.getDate()).slice(-2) + "/" + ("0" + (dateInstance.getMonth() + 1)).slice(-2) + "/" + dateInstance.getFullYear()
}

this.formatDay = formatDay;

module.exports = formatDay;