// mahesh, yuzhi, kaushik: Bookings, room both routes and data functions

// sushmita, rivaldo: account, feedback, gallery both routes and data functions
import validator from "validator";
const prefixPattern = /^([a-zA-Z0-9]+([_\.-]?[a-zA-Z0-9]+)*)$/
const domainPattern = /^([a-zA-Z0-9-]+)+(\.[a-zA-Z]{2,})+$/
const UpperCase = /[A-Z]/;
const number = /[0-9]/;
const specialChar = /[^A-Za-z0-9]/;

export const validateString = async (name) =>{
  if(!name || typeof(name)!=='string'||name.trim().length === 0){
    throw{code:400,error: `Please provide valid name`};
  }
  /*if(nameRegex.test(name)){//check for the name with space condition
    throw{code:400,error: `Name format is improper`};  
  }*/
  return name.trim();
}

export const validateEmail = async(emailAddress) =>{
  emailAddress = emailAddress.trim().toLowerCase();
  if(!validator.isEmail(emailAddress)){
    throw{code:400,error:`Given email: ${emailAddress} is not in a valid email address format`}; 

  }
  let [prefix,domain]=emailAddress.split("@");
  if(!prefixPattern.test(prefix) || !domainPattern.test(domain)) {
    throw{code:400,error:`Given email: ${emailAddress} doesn't have a valid prefix or domain`}; 
  }
  return emailAddress;
}

export const validatePassword = async (password)=>{
  if(typeof(password)!=='string' || password.includes(' ') || password.length<8){
    throw{code:400,error:`Password must be valid String with no spaces and should be at least 8 characters long`}; 
  }
  if(!UpperCase.test(password)|| !number.test(password || !specialChar.test(password))){
    throw{code:400,error:`Password must contain at least one upperCase character, one number and one special character`}; 
  }
  return password;

}
export const validatePhoneNumber = async(phNumber)=>{
  if(typeof(phNumber) !=='Number'){
    throw{code:400,error:`Phone Number must be of Number type`}; 
  }
  return phNumber;
}

export function isAdmin(object) {
  if (object.isAdmin == true) {
    return true;
  } else return false;
}
