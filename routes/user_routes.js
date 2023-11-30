import {Router} from 'express';
const router = Router();
import validator from "validator";
import * as helpers from '../helpers.js';
import { loginUser,createAccount} from "../data/users.js";

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
      const userName = await helpers.validateString(name,2,25,nameErr);
      const emailAddress = await helpers.validateEmail(email);
      const passwordGiven= await helpers.validatePassword(password);
      const loginDetails = await loginUser(userName, emailAddress, passwordGiven);
      if(loginDetails._id){
        return res.render('./guest/guestAccount/createAccount');
      }else{
        res.status(500).render('./login/UserLogin',{error:`Internal Server Error`,title:"Login"});
      }
    }catch(e){
        console.log(e);
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
        const nameInput = await helpers.validateString(name,2,25,nameErr);
        const emailAddress = await helpers.validateEmail(email);
        const userPassword = await helpers.validatePassword(password);
        const confirmPwd = await helpers.validatePassword(cpassword);
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