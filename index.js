function createEmployeeRecord([firstNameString, familyNameString, titleString, numberPayRate]) {
    return {
        firstName: firstNameString,
        familyName: familyNameString,
        title: titleString,
        payPerHour: numberPayRate,
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(employeeRecord => createEmployeeRecord(employeeRecord));
}

function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    const timeInEvent = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    }
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    const timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    }
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    let startTime = timeInEvent.hour;
    let endTime = timeOutEvent.hour;
    let hoursWorked = (endTime - startTime) / 100;

    if (!timeInEvent || !timeOutEvent) {
        return 0;
    }
    return hoursWorked;
}

function wagesEarnedOnDate(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    let startTime = timeInEvent.hour;
    let endTime = timeOutEvent.hour;
    let hoursWorked = (endTime - startTime) / 100;
    let wagesEarnedOnDate = hoursWorked * employeeRecord.payPerHour;

    if (!timeInEvent || !timeOutEvent) {
        return 0;
    }
    return wagesEarnedOnDate;
}

function allWagesFor(employeeRecord) {
    let totalWages = 0;

    employeeRecord.timeOutEvents.forEach(event => {
        const date = event.date;
        const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
        const wagesForDate = hoursWorked * employeeRecord.payPerHour;
        totalWages += wagesForDate;
    });
    return totalWages;
}

function calculatePayroll(allEmployeeRecords) {
    let totalPayroll = 0;

    allEmployeeRecords.forEach(employeeRecord => {
        totalPayroll += allWagesFor(employeeRecord);
    });

    return totalPayroll;
}