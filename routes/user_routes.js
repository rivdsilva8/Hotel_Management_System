import {Router} from 'express';
const router = Router();
import validator from "validator";
const nameRegex = /[^A-Za-z]/;
const prefixPattern = /^([a-zA-Z0-9]+([_\.-]?[a-zA-Z0-9]+)*)$/
const domainPattern = /^([a-zA-Z0-9-]+)+(\.[a-zA-Z]{2,})+$/
const UpperCase = /[A-Z]/;
const number = /[0-9]/;
const specialChar = /[^A-Za-z0-9]/;
import { loginUser,createAccount} from "../data/users.js";
const validateString = async (name, min,max,errMsg) =>{
    if(!name || typeof(name)!=='string'||name.trim().length === 0){
      throw{code:400,error: errMsg.empty};
    }
    if(name.length<min || name.length>max || nameRegex.test(name)){//check for the name with space condition
      throw{code:400,error: errMsg.invalid};  
    }
    return name.trim();
  }
const validateEmail = async(emailAddress) =>{
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
  
  const validatePassword = async (password)=>{
    if(typeof(password)!=='string' || password.includes(' ') || password.length<8){
      throw{code:400,error:`Password must be valid String with no spaces and should be at least 8 characters long`}; 
    }
    if(!UpperCase.test(password)|| !number.test(password || !specialChar.test(password))){
      throw{code:400,error:`Password must contain at least one upperCase character, one number and one special character`}; 
    }
    return password;
  
  }

router
  .route('/login')
  .get(async (req, res) => {
    /*if(req.session.user){
      return res.redirect(req.session.user.role === 'admin'?'/admin':'/protected');
    }*/
    return res.render('./login/UserLogin');
  })
  .post(async (req, res) => {
    const{name,email,password} = req.body;
    //await checkIfExistsForLogin (name,email,password);
    try{
      const nameErr = {empty:'Name cannot be Empty', invalid:'Given name is invalid'};
      const userName = await validateString(name,2,25,nameErr);
      const emailAddress = await validateEmail(email);
      const passwordGiven= await validatePassword(password);
      const loginDetails = await loginUser(userName, emailAddress, passwordGiven);
      if(loginDetails._id){
        return res.render('./guest/guestAccount/createAccount');
      }else{
        res.status(500).render('./login/UserLogin',{error:`Internal Server Error`,title:"Login"});
      }
    }catch(e){
      res.status(400).render('./login/UserLogin',{error:e.error,title:"login"});
    }
  });


  router
  .route('/register')
  .get(async (req, res) => {
    return res.render('./login/UserCreate');
  })
  .post(async (req, res) => {
    let registerDetails = req.body;
    let{name,email,password,cpassword,} = registerDetails;
      if(password!==cpassword){
        res.status(400).render('./login/UserCreate',{error:"Passwords doesn't match",title:"Register"});
      }
      try{
        const nameErr = {empty:'Name cannot be Empty', invalid:'Given name is invalid'};
        const nameInput = await validateString(name,2,25,nameErr);
        const emailAddress = await validateEmail(email);
        const userPassword = await validatePassword(password);
        const confirmPwd = await validatePassword(cpassword);
        //await validateString(firstName,lastName,emailAddress,password,role);
        if(userPassword!==confirmPwd){
          throw{code:400,error:`Password and Confirm password don't match`};
        }
        const result = await createAccount(nameInput,emailAddress,userPassword);
        if(result._id){
          return res.redirect('/login');
        }else{
          res.status(500).render('./login/UserCreate',{error:`Internal Server Error`,title:"Register"});
        }
      }catch(e){
        res.status(400).render('./login/UserCreate',{error:e.error,title:"Register"});
      }
  });

  export default router;