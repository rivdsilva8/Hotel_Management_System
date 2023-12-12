import {Router} from 'express';
const router = Router();
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
      //const userName = await helpers.validateString(name,2,25,nameErr);
      const emailAddress = await helpers.validateEmail(email);
      const passwordGiven= await helpers.validatePassword(password);
      const loginDetails = await loginUser(emailAddress, passwordGiven);
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

        }            
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
    let{firstNameInput,lastNameInput,email,phone,password,cpassword,} = registerDetails;
      if(password!==cpassword){
        res.status(400).render('./login/UserCreate',{error:"Passwords doesn't match",title:"Register"});
      }
      try{
        await helpers.checkIfExistsForRegister(firstNameInput,lastNameInput,email,phone,password,cpassword);
        const firstNameErr = {empty:'First name  cannot be Empty', invalid:'First name is invalid'};
        const lastNameErr = {empty:'Last name cannot be Empty', invalid:'Last name is invalid'};
        const firstName = await helpers.validateString(firstNameInput,2,25,firstNameErr);
        const lastName = await helpers.validateString(lastNameInput,2,25,lastNameErr);
        const emailAddress = await helpers.validateEmail(email);
        const phoneNumber = await helpers.validatePhoneNumber(phone);
        const userPassword = await helpers.validatePassword(password);
        const confirmPwd = await helpers.validatePassword(cpassword);
        if(userPassword!==confirmPwd){
          throw{code:400,error:`Password and Confirm password don't match`};
        }
        const result = await createAccount(firstName,lastName,emailAddress,phoneNumber,userPassword);
        if(result._id){
          if(result.role === 'user'){
            return res.redirect('/login');
          }else if (result.role === 'admin'){
            return res.redirect('/admin/account/create',{successMessage:'Account created successfully!'});
          }
        }else{
          res.status(500).render('./login/UserCreate',{error:`Internal Server Error`,title:"Register"});
        }
      }catch(e){
        console.log(e);
        res.status(400).render('./login/UserCreate',{error:e.error,title:"Register"});
      }
  });

  export default router;