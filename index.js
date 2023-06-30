// Your code here
function createEmployeeRecord(employeeDetails){

    return {
        firstName: employeeDetails[0],
        familyName: employeeDetails[1],
        title: employeeDetails[2],
        payPerHour: employeeDetails[3],
        timeInEvents:[],
        timeOutEvents: []       
    }

}

function createEmployeeRecords(employeesCard) {
    return employeesCard.map(function (employeeInfo) {
        return createEmployeeRecord(employeeInfo)
    });
}

function createTimeInEvent(employeeRecord, timeIn) {
    const [date, hour] = timeIn.split(' ');
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, timeOut) {
    const [date, hour] = timeOut.split(' ');
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, dateToBePaid) {
    let clockIn = employeeRecord.timeInEvents.find((e) => e.date == dateToBePaid).hour
   let clockOut = employeeRecord.timeOutEvents.find((e) => e.date == dateToBePaid).hour
   return (clockOut - clockIn)/100
}

// Using hoursWorkedOnDate, multiply the hours by the record's payRate to determine amount owed. Amount should be returned as a number.
let wagesEarnedOnDate = (employeeRecord, dateOfTheForm) => {
   const payPerHour = parseInt(employeeRecord.payPerHour)
   const hoursWorked = hoursWorkedOnDate(employeeRecord, dateOfTheForm)
   return payPerHour * hoursWorked
}

// Using wagesEarnedOnDate, accumulate the value of all dates worked by the employeeDetails in the record
let allWagesFor = (employeeRecord) => {
   let employeeWages = []
   let datesWorked = employeeRecord.timeInEvents.map((e) => e.date)
   for (let date of datesWorked) {
      employeeWages.push(wagesEarnedOnDate(employeeRecord, date))
   }
   return employeeWages.reduce((total, wage) => total + wage)
}

// Using wagesEarnedOnDate, accumulate the value of all dates worked by the employeeDetails in the record 
let calculatePayroll = (AllEmployeeRecords) => {
   return AllEmployeeRecords.reduce((previoutAmount, employeeDetails) => {
      return previoutAmount + allWagesFor(employeeDetails)
  }, 0)
}