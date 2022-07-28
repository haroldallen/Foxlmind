function formatDay(day, dateInstance) {
    return day + ", " + ("0" + dateInstance.getDate()).slice(-2) + "/" + ("0" + (dateInstance.getMonth() + 1)).slice(-2) + "/" + dateInstance.getFullYear()
}

function formatDate(dateInstance) {
    return dateInstance.getFullYear()+"-"+("0" + (dateInstance.getMonth() + 1)).slice(-2)+"-"+("0" + dateInstance.getDate()).slice(-2)
}

this.format = {
    day: formatDay,
    date: formatDate
};

module.exports = format;