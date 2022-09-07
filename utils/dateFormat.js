const addDateSuffix = (date) => {                           // add date suffix to the date number (1st, 2nd, 3rd, etc.)
    let dateStr = date.toString();                          // convert the date to a string
  
    const lastChar = dateStr.charAt(dateStr.length - 1);    // get the last character of the date string
  
    if (lastChar === '1' && dateStr !== '11') {             // if the last character is a 1 and the date string is not 11
      dateStr = `${dateStr}st`;                             // add 'st' to the end of the date string
    } else if (lastChar === '2' && dateStr !== '12') {      // if the last character is a 2 and the date string is not 12
      dateStr = `${dateStr}nd`;                             // add 'nd' to the end of the date string
    } else if (lastChar === '3' && dateStr !== '13') {      // if the last character is a 3 and the date string is not 13
      dateStr = `${dateStr}rd`;                             // add 'rd' to the end of the date string
    } else {                                                // otherwise (if the last character is not a 1, 2, or 3 or the date string is 11, 12, or 13)
      dateStr = `${dateStr}th`;                             // add 'th' to the end of the date string
    }
  
    return dateStr;
  };
  
  module.exports = (                                        // export the function    
    timestamp,                                              // timestamp to format (required) 
    { monthLength = 'short', dateSuffix = true } = {}       // set default values for the monthLength and dateSuffix parameters
  ) => {
    // create month object
    const months = {
      0: monthLength === 'short' ? 'Jan' : 'January',       // if monthLength is 'short' then set the value of the 0 key to 'Jan' otherwise set it to 'January'
      1: monthLength === 'short' ? 'Feb' : 'February',      // if monthLength is 'short' then set the value of the 1 key to 'Feb' otherwise set it to 'February'
      2: monthLength === 'short' ? 'Mar' : 'March',         // if monthLength is 'short' then set the value of the 2 key to 'Mar' otherwise set it to 'March'
      3: monthLength === 'short' ? 'Apr' : 'April',         // if monthLength is 'short' then set the value of the 3 key to 'Apr' otherwise set it to 'April'
      4: monthLength === 'short' ? 'May' : 'May',           // if monthLength is 'short' then set the value of the 4 key to 'May' otherwise set it to 'May'
      5: monthLength === 'short' ? 'Jun' : 'June',          // if monthLength is 'short' then set the value of the 5 key to 'Jun' otherwise set it to 'June'
      6: monthLength === 'short' ? 'Jul' : 'July',          // if monthLength is 'short' then set the value of the 6 key to 'Jul' otherwise set it to 'July'
      7: monthLength === 'short' ? 'Aug' : 'August',        // if monthLength is 'short' then set the value of the 7 key to 'Aug' otherwise set it to 'August'
      8: monthLength === 'short' ? 'Sep' : 'September',     // if monthLength is 'short' then set the value of the 8 key to 'Sep' otherwise set it to 'September'
      9: monthLength === 'short' ? 'Oct' : 'October',       // if monthLength is 'short' then set the value of the 9 key to 'Oct' otherwise set it to 'October'
      10: monthLength === 'short' ? 'Nov' : 'November',     // if monthLength is 'short' then set the value of the 10 key to 'Nov' otherwise set it to 'November'
      11: monthLength === 'short' ? 'Dec' : 'December',      // if monthLength is 'short' then set the value of the 11 key to 'Dec' otherwise set it to 'December'
    };
  
    const dateObj = new Date(timestamp);                    // create a new Date object from the timestamp
    const formattedMonth = months[dateObj.getMonth()];      // get the month from the date object and use it to get the corresponding value from the months object
  
    const dayOfMonth = dateSuffix                           // if dateSuffix is true
      ? addDateSuffix(dateObj.getDate())                    // get the date from the date object and add the date suffix   
      : dateObj.getDate();                                  // otherwise get the date from the date object
  
    const year = dateObj.getFullYear();                     // get the year from the date object
    let hour =  dateObj.getHours();                         // get the hour from the date object
      dateObj.getHours() > 12                               // if the hour is greater than 12
        ? Math.floor(dateObj.getHours() - 12)               // subtract 12 from the hour
        : dateObj.getHours();                               // otherwise get the hour from the date object
  
 
    if (hour === 0) {                                       // if the hour is 0
      hour = 12;                                            // set the hour to 12
    }                                                 
  
    const minutes = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();  // get the minutes from the date object and add a 0 if the minutes are less than 10

    const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';                     // if the hour is greater than or equal to 12 then set the period of day to 'pm' otherwise set it to 'am'
  
    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`; // create the formatted timestamp
  
    return formattedTimeStamp;                                                                                  // return the formatted timestamp
  };