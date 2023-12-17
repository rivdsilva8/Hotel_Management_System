import {Router} from 'express';
const router = Router();
import * as helpers from '../helpers.js';
import { loginUser,createAccount,resetPassword} from "../data/users.js";
import xss from 'xss';

router
  .route('/login')
  .get(async (req, res) => {
    /*if(req.session.user){
      return res.redirect(req.session.user.role === 'admin'?'/admin':'/protected');
    }*/
    return res.render('./login/UserLogin',{title:"Login"});
  })
  .post(async (req, res) => {
    const{email,password} = req.body;
    //await checkIfExistsForLogin (name,email,password);
    try{
      //const nameErr = {empty:'Name cannot be Empty', invalid:'Given name is invalid'};
      //const userName = await helpers.validateString(name,2,25,nameErr);
      await helpers.checkIfExistsForLogin(email,password);
      const emailAddress = await helpers.validateEmail(email);
      const passwordGiven= await helpers.validatePassword(password);
      const emailCheck = xss(emailAddress);
      const passwordCheck = xss(passwordGiven);
      const loginDetails = await loginUser(emailCheck, passwordCheck);
      if(loginDetails._id){
        req.session.user = {id:loginDetails._id,
          firstName:loginDetails.firstName,
          lastName:loginDetails.lastName,
          role:loginDetails.role};
        if(loginDetails.role === 'user'){
          req.session.save(()=>{
            return res.redirect('/guest');

        });
        }else if(loginDetails.role === 'admin'){
          req.session.save(()=>{
            return res.redirect('/admin');
        });

        }else if(loginDetails.role === 'staff'){
          req.session.save(()=>{
            return res.redirect('/staff');
        });

        }          
      }else{
        res.status(500).render('./login/UserLogin',{error:`Internal Server Error`,title:"Login"});
      }
    }catch(e){
      res.status(400).render('./login/UserLogin',{error:e.error,title:"Login"});
    }
  });


  router
  .route('/register')
  .get(async (req, res) => {
    return res.render('./login/UserCreate',{title:"Register"});
  })
  .post(async (req, res) => {
    let registerDetails = req.body;
    let{firstNameInput,lastNameInput,email,phonePrefix,phone,password,cpassword,} = registerDetails;
      if(password!==cpassword){
        res.status(400).render('./login/UserCreate',{error:"Passwords doesn't match",title:"Register"});
      }
      try{
        await helpers.checkIfExistsForRegister(firstNameInput,lastNameInput,email,phonePrefix,phone,password,cpassword);
        const firstNameErr = {empty:'First name  cannot be Empty', invalid:'First name is invalid'};
        const lastNameErr = {empty:'Last name cannot be Empty', invalid:'Last name is invalid'};
        const firstName = await helpers.validateString(firstNameInput,2,25,firstNameErr);
        const sanitizedFirstName = xss(firstName);
        const lastName = await helpers.validateString(lastNameInput,2,25,lastNameErr);
        const sanitizedLastName = xss(lastName);
        const emailAddress = await helpers.validateEmail(email);
        const sanitizedEmailAddress = xss(emailAddress);
        const phoneNumber = await helpers.validatePhoneNumber(phone);
        const sanitizedPhoneNumber = xss(phoneNumber);
        const phonePrefixVal = await helpers.validatePhonePrefix(phonePrefix);
        const sanitizedphonePrefixVal = xss(phonePrefixVal);
        const userPassword = await helpers.validatePassword(password);
        const confirmPwd = await helpers.validatePassword(cpassword);
        if(userPassword!==confirmPwd){
          throw{code:400,error:`Password and Confirm password don't match`};
        }
        const roleInput = "user";
        const result = await createAccount(sanitizedFirstName,sanitizedLastName,sanitizedEmailAddress,sanitizedphonePrefixVal,sanitizedPhoneNumber,roleInput,userPassword);
        if(result._id){
          if(result.role === 'user'){
            return res.redirect('/login');
          }else if (result.role === 'admin'){
            return res.redirect('/admin/account/create',{successMessage:'Account created successfully!'});
          }
        }else{
          res.status(500).render('./login/UserCreate',{error:`Internal Server Error`,title:"Register"});
          //return res.status(500).json({error:`Internal Server Error`});
        }
      }catch(e){
        res.status(400).render('./login/UserCreate',{error:e.error,title:"Register"});
        //return res.status(400).json({error:e.error});
      }
  });


  router
  .route('/reset')
  .get(async (req, res) => {
    /*if(req.session.user){
      return res.redirect(req.session.user.role === 'admin'?'/admin':'/protected');
    }*/
    return res.render('./login/UserReset',{title:"Reset Password"});
  })
  .post(async (req, res) => {
    const{email,password,confirmPassword} = req.body;
    try{
      await helpers.checkIfExistsForReset(email,password,confirmPassword);
      const emailAddress = await helpers.validateEmail(email);
      const sanitizeEmailAddress = xss(emailAddress);
      const userPassword = await helpers.validatePassword(password);
      const confirmPasswd = await helpers.validatePassword(confirmPassword);
      if(userPassword!==confirmPasswd){
        throw{code:400,error:`Password and Confirm password don't match`};
      }
      const loginDetails = await resetPassword(sanitizeEmailAddress, userPassword);
      if(loginDetails.updated){
        return res.render('./login/UserReset',{title:"Reset Password",successMessage:"Password updated successfully !"});       
      }else{
        res.status(500).render('./login/UserReset',{error:`Internal Server Error`,title:"Reset Password"});
      }
    }catch(e){
      res.status(400).render('./login/UserReset',{error:e.error,title:"Reset Password"});
    }
  });

  router.route('/logout').get(async (req, res) => {
    req.session.destroy(()=>{
      res.render('./login/UserLogout',{title:"Logout Page",isLoginPage:false,message:"You have been successfully logged out.", homeLink:"/"});
    });
    res.clearCookie('AuthState');
  });

  export default router;