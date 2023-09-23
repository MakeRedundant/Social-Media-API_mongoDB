const addDates = date => {
  // Convert the numeric date to a string.
  let dateStr = date.toString();

  // Get the last character (digit) of the date string.
  const lastChar = dateStr.charAt(dateStr.length - 1);

  // Check if the last character is '1' and the date string is not '11'.
  if (lastChar === '1' && dateStr !== '11') {
    // Append 'st' to the date string for 1st.
    dateStr = `${dateStr}st`;
  } else if (lastChar === '2' && dateStr !== '12') {
    // Append 'nd' to the date string for 2nd.
    dateStr = `${dateStr}nd`;
  } else if (lastChar === '3' && dateStr !== '13') {
    // Append 'rd' to the date string for 3rd.
    dateStr = `${dateStr}rd`;
  } else {
    // Append 'th' to the date string for all other cases.
    dateStr = `${dateStr}th`;
  }

  // Return the formatted date string with the ordinal suffix.
  return dateStr;
};

//This code takes a numeric date as a input and converts it to a string.
//It extracts the last character of the date string (rightmost digit)
//Checks the last character and vlaue of the date string (for the st,nd rd and th)
//Dpending on the last character it appends the correct suffux to the date string
/*
For example:

If you call addDates(1), it will return '1st'.
*/

// Function that formats a timestamp
const formatTimeStamp = (
  timestamp,
  { monthLength = 'Months', dateSuffix = true } = {}
) => {
  let months;

  // Define month names based on the specified monthLength option.
  if (monthLength === 'Months') {
    months = {
      // Short month names
      0: 'Jan',
      1: 'Feb',
      2: 'Mar',
      3: 'Apr',
      4: 'May',
      5: 'Jun',
      6: 'Jul',
      7: 'Aug',
      8: 'Sep',
      9: 'Oct',
      10: 'Nov',
      11: 'Dec'
    };
  }

  // Create a Date object from the provided timestamp.
  const dateObj = new Date(timestamp);

  // Get the formatted month name based on the month index.
  const formattedMonth = months[dateObj.getMonth()];

  let dayOfMonth;

  // Check if dateSuffix is enabled, and if so, add the suffix to the day of the month.
  if (dateSuffix) {
    dayOfMonth = addDates(dateObj.getDate());
  } else {
    dayOfMonth = dateObj.getDate();
  }

  // Get the year from the date.
  const year = dateObj.getFullYear();

  let hour;

  // Check for 24-hour time format and adjust the hour accordingly.
  if (dateObj.getHours() > 12) {
    hour = Math.floor(dateObj.getHours() / 2);
  } else {
    hour = dateObj.getHours();
  }

  // If the hour is 0 (midnight), change it to 12.
  if (hour === 0) {
    hour = 12;
  }

  // Get the minutes from the date.
  const minutes = dateObj.getMinutes();

  // Determine if it's night or day based on the hour.
  let nightOrDay;
  if (dateObj.getHours() >= 12) {
    nightOrDay = 'pm'; // Nighttime (post meridiem)
  } else {
    nightOrDay = 'am'; // Daytime (ante meridiem)
  }
  // Create the formatted timestamp string.
  const formattedTimeStamp = `${dayOfMonth} ${formattedMonth} ${year} at ${hour}:${minutes} ${nightOrDay}`;

  // Return the formatted timestamp string.
  return formattedTimeStamp;
};

module.exports = formatTimeStamp;

// Formats a timestamp as 'DD Mon YYYY at HH:mm AM/PM'