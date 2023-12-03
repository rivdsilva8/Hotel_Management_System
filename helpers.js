// mahesh, yuzhi, kaushik: Bookings, room both routes and data functions

// sushmita, rivaldo: account, feedback, gallery both routes and data functions
import { ObjectId } from "mongodb";
//sushmita helpers
import validator from "validator";
const nameRegex = /[^A-Za-z]/;
const prefixPattern = /^([a-zA-Z0-9]+([_\.-]?[a-zA-Z0-9]+)*)$/;
const domainPattern = /^([a-zA-Z0-9-]+)+(\.[a-zA-Z]{2,})+$/;
const UpperCase = /[A-Z]/;
const number = /[0-9]/;
const specialChar = /[^A-Za-z0-9]/;

export const validateString = async (name, min, max, errMsg) => {
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    throw { code: 400, error: `Please provide valid name` };
  }
  if (name.length < min || name.length > max || nameRegex.test(name)) {
    //check for the name with space condition
    throw { code: 400, error: errMsg.invalid };
  }
  return name.trim();
};

export const validateEmail = async (emailAddress) => {
  emailAddress = emailAddress.trim().toLowerCase();
  if (!validator.isEmail(emailAddress)) {
    throw {
      code: 400,
      error: `Given email: ${emailAddress} is not in a valid email address format`,
    };
  }
  let [prefix, domain] = emailAddress.split("@");
  if (!prefixPattern.test(prefix) || !domainPattern.test(domain)) {
    throw {
      code: 400,
      error: `Given email: ${emailAddress} doesn't have a valid prefix or domain`,
    };
  }
  return emailAddress;
};

export const validatePassword = async (password) => {
  if (
    typeof password !== "string" ||
    password.includes(" ") ||
    password.length < 8
  ) {
    throw {
      code: 400,
      error: `Password must be valid String with no spaces and should be at least 8 characters long`,
    };
  }
  if (
    !UpperCase.test(password) ||
    !number.test(password || !specialChar.test(password))
  ) {
    throw {
      code: 400,
      error: `Password must contain at least one upperCase character, one number and one special character`,
    };
  }
  return password;
};
export const validatePhoneNumber = async (phNumber) => {
  if (typeof phNumber !== "Number") {
    throw { code: 400, error: `Phone Number must be of Number type` };
  }
  return phNumber;
};

//rivaldo helpers
// You can add and export any helper functions you want here - if you aren't using any, then you can just leave this file as is
export function checknum(num) {
  if (typeof num !== "number" || num == Infinity || isNaN(num))
    throw "ERROR : input is not a number";
}

export function checkstring(string) {
  if (typeof string != "string") throw "ERROR : input is not a string";
}

export function checkundefined(input) {
  if (input === undefined)
    throw "ERROR : input cannot be undefined or not enough inputs passed into function";
}

export function countParameters(obj) {
  let count = 0;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      count++;
    }
  }
  return count;
}

export function myArrFunc(arr) {
  /*so I'm expecting the input param to be an array, if it's anything else, I should throw an error (even if it's an object. However, if you do a typeof check on an array, it will return 'object'  which if you checked it using typeof, and an object was supplied to the function (not an array) it would get through.  so instead of checking typeof on a function that must ONLY take in an array, we should check if it's an actual array, not the type using typeof */

  if (!arr)
    throw "ERROR : Input is not supplied, is undefined, null, 0, false, '', or NaN";
  if (!Array.isArray(arr)) throw "ERROR : Invalid Input detected ";

  if (typeof obj === "object") throw "ERROR: Input must not an object!";
}

export function myObjFunc(obj) {
  if (!obj)
    throw "ERROR:  Input is not supplied, is undefined, null, 0, false, '', or NaN";
  if (Array.isArray(obj))
    throw "ERROR: Input must be an object, but an array was supplied";
  //now that I made sure it's not an array, I can check to make sure it's an object using typeof
  if (typeof obj !== "object") throw "ERROR: Input must be an object!";
}

export function justSpaces(string) {
  if (/^\s*$/.test(string)) {
    throw "ERROR : String cannot be only spaces";
  }
}

export function emptyStringCheck(string) {
  if (string.length == 0) throw "ERROR : string cannot be empty";
}

export function stringValidation(string) {
  checkundefined(string);
  checkstring(string);
  emptyStringCheck(string);
  justSpaces(string);
}

export function numberValidation(num) {
  checkundefined(num);
  checknum(num);
  justSpaces(num);
}

export function validMonth(month) {
  let vmonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  if (!vmonths.includes(month)) {
    throw "ERROR : month is not valid";
  }
  return true;
}

export function validDay(month, day) {
  let months31Days = [1, 3, 5, 7, 8, 10, 12];
  let months30Days = [4, 6, 9, 11];
  let months28Days = [2];
  let valid31days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  let valid30days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  let valid28days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28,
  ];

  if (months31Days.includes(month)) {
    if (!valid31days.includes(day)) {
      throw "ERROR : day is not valid";
    }
  }

  if (months30Days.includes(month)) {
    if (!valid30days.includes(day)) {
      throw "ERROR : day is not valid";
    }
  }

  if (months28Days.includes(month)) {
    if (!valid28days.includes(day)) {
      throw "ERROR : day is not valid";
    }
  }
}

export function minStringLength(string, name, min) {
  if (string.length < min)
    throw "ERROR :  " + name + " cannot be less than " + min + " characters";
}

export function ValidEmail(email) {
  let emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email))
    throw "ERROR : Email is not in a valid email address format";
}

export function validDate(date) {
  let dateFormatRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
  if (!dateFormatRegex.test(date))
    throw "ERROR : eventDate is not in a valid date format";
}

export function validTime(time) {
  let timeFormatRegex = /^([1-9]|1[0-2]):[0-5][0-9] [AP][M]$/;
  // Check if the time format matches
  if (!timeFormatRegex.test(time))
    throw "ERROR : time is not is not in a valid time format";
}

export function validMinutes(minutes) {
  if (minutes < 0 || minutes > 59) throw "ERROR : Minutes is not valid";
}
export function validHours(hours) {
  if (hours < 0 || hours > 12) throw "ERROR : Hours is not valid";
}

export function sTimeBeforeETime(
  shours,
  sminutes,
  smeridiem,
  ehours,
  eminutes,
  emeridiem
) {
  let tstime;
  let tetime;
  let shrstomins = shours * 60;
  let ehrstomins = ehours * 60;
  if (smeridiem == "PM" || smeridiem == "pm") {
    shrstomins += 720;
    tstime = shrstomins + sminutes;
  } else {
    tstime = shrstomins + sminutes;
  }

  if (emeridiem == "PM" || emeridiem == "pm") {
    ehrstomins += 720;
    tetime = ehrstomins + eminutes;
  } else {
    tetime = ehrstomins + eminutes;
  }

  if (tstime > tetime) throw "ERROR : start time cannot be later than end time";

  if (tetime < tstime)
    throw "ERROR : end time cannot be earlier than start time";

  if (tetime < tstime + 30)
    throw "ERROR : end time cannot be less than 30 minutes afte start time";
}

export function booleanValidation(bool) {
  if (!(typeof bool === "boolean"))
    throw "ERROR : publicEvent is not a boolean";
}

export function validState(state) {
  let stateAbbreviationRegex = /^[A-Z]{2}$/;

  if (!stateAbbreviationRegex.test(state))
    throw "ERROR : state must be a valid two character state abbreviation";
}

export function validZip(zip) {
  stringValidation(zip);
  minStringLength(zip, "zip", 5);
  maxStringLength(zip, "zip", 5);

  if (!/^\d+$/.test(zip)) {
    throw "zip must contain only a string of 5 NUMBERS";
  }
}

export function maxStringLength(string, name, max) {
  if (string.length > max)
    throw "ERROR :  " + name + " cannot be more than " + max + " characters";
}

export function validRating(rating) {
  numberValidation(rating);
  if (rating > 10) {
    throw "ERROR :  " + rating + " cannot be more than 10";
  }
  if (rating < 0) {
    throw "ERROR :  " + rating + " cannot be less than 0";
  }
}

export function isAdmin(object) {
  if (object.isAdmin == true) {
    return true;
  } else return false;
}

export const checkId = async(id, varName) =>{
  if (!id) throw `Error: You must provide a ${varName}`;
  if (typeof id !== 'string') throw `Error:${varName} must be a string`;
  id = id.trim();
  if (id.length === 0)
    throw `Error: ${varName} cannot be an empty string or just spaces`;
  if (!ObjectId.isValid(id)) throw `Error: ${varName} invalid object ID`;
  return id;
}