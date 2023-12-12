// create a account creation file where we will get input form admin like name, email, contact number, create youe own id, password,confirm password
// POST function
// here admin can add and edit details

import { Router } from "express";
const router = Router();
import * as helpers from '../../helpers.js';
import {getAccountById,updateAccount,getAll,deleteAccount} from "../../data/account.js";
import {createAccount} from "../../data/users.js";

router.get("/", async (req, res) => {
  try {
    res.render("./Admin/adminAccount/adminAccountMainPage", {
      title: "admin account manipulation",
    });
  } catch (e) {}
});

router
  .route('/create')
  .get(async (req, res) => {
    //const role = req.session.user? req.session.user.role:null;
    const role = req.session.user.role;
    return res.render('./Admin/adminAccount/adminCreateAccount',{role:role});
  });
router.post('/create',async (req, res) => {
    let registerDetails = req.body;
    const role = req.session.user.role;
    let{firstNameInput,lastNameInput,email,phone,password,cpassword,} = registerDetails;
      if(password!==cpassword){
        res.status(400).render('./Admin/adminAccount/adminCreateAccount',{error:"Passwords doesn't match",title:"Register"});
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
          return res.render('./Admin/adminAccount/adminCreateAccount',{role:role,successMessage:"Account created successfully !"});
        }else{
          return res.status(500).render('./Admin/adminAccount/adminCreateAccount',{error:`Internal Server Error`,title:"Register",role:role});
        }
      }catch(e){
        console.log(e);
        return res.status(400).render('./Admin/adminAccount/adminCreateAccount',{error:e.error,title:"Register",role:role});
      }
});

router
  .route('/edit')
  .get(async (req, res) => {
    //const role = req.session.user? req.session.user.role:null;
    const role = req.session.user.role;
    const details = await getAll();
    //console.log(details);
    const successMessage = req.query.success === "true"?"Account Updated Successfully!":null;
    return res.render('./Admin/adminAccount/adminEditAccount',{role:role, details:details,successMessage:successMessage});
  });


  router
  .route('/edit/:id')
  .post(async(req,res)=>{
    /*console.log(req.session.user);
    if(!req.session.user || req.session.user.id!== req.params.id){
      return res.status(403).send("Unauthorized access");
    }*/
    //console.log(req.session.user);
    const role = req.session.user.role;
    let{accountId,firstNameInput,lastNameInput,email,phone} = req.body;
    let accountUpdateID=await helpers.checkId(accountId,"account id");
    try{
      await helpers.checkIfExistsForAccountUpdate(firstNameInput,lastNameInput,email,phone);
      const updateDetails = await updateAccount(accountUpdateID,req.body);
      return res.redirect('/admin/account/edit?success=true');
    }catch(e){
      console.log(e);
      const details = await getAll();
      return res.status(e.code).render('./Admin/adminAccount/adminEditAccount',{role:role,error:e.error,account:details});
    }

  })

  router
  .route('/view')
  .get(async (req, res) => {
    //const role = req.session.user? req.session.user.role:null;
    const role = req.session.user.role;
    const details = await getAll();
    //console.log(details);
    const successMessage = req.query.success === "true"?"Account Updated Successfully!":null;
    return res.render('./Admin/adminAccount/adminViewAccount',{role:role, details:details,successMessage:successMessage});
  });

  router
  .route('/delete')
  .get(async (req, res) => {
    //const role = req.session.user? req.session.user.role:null;
    const role = req.session.user.role;
    const details = await getAll();
    //console.log(details);
    const successMessage = req.query.success === "true"?"Account Deleted Successfully!":null;
    return res.render('./Admin/adminAccount/adminDeleteAccount',{role:role, details:details,successMessage:successMessage});
  });

  router
  .route('/delete/:id')
  .post(async (req, res) => {
    //const role = req.session.user? req.session.user.role:null;
    const role = req.session.user.role;
    let{accountId,firstNameInput,lastNameInput,email,phone} = req.body;
    let accountDeleteID=await helpers.checkId(accountId,"account id");
    const details = await deleteAccount(accountDeleteID);
    if(details.acknowledged === true){
      return res.redirect('/admin/account/delete?success=true');
    }else{
      return res.redirect('/admin/account/delete?success=false');
    }
    
  });

export default router;

