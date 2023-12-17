// create a account creation file where we will get input form admin like name, email, contact number, create youe own id, password,confirm password
// POST function
// here admin can add and edit details

import { Router } from "express";
const router = Router();
import * as helpers from '../../helpers.js';
import {getAccountById,updateAccount,getAll,deleteAccount,getSearchData} from "../../data/account.js";
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
    return res.render('./Admin/adminAccount/adminCreateAccount',{title:"Admin Create Users Account",role:role});
  });
router.post('/create',async (req, res) => {
    let registerDetails = req.body;
    const role = req.session.user.role;
    let{firstNameInput,lastNameInput,email,phonePrefix,phone,roleInput,password,cpassword,} = registerDetails;
      if(password!==cpassword){
        res.status(400).render('./Admin/adminAccount/adminCreateAccount',{title:"Admin Create Users Account",error:"Passwords doesn't match"});
      }
      try{
        await helpers.checkIfExistsForRegister(firstNameInput,lastNameInput,email,phonePrefix,phone,roleInput,password,cpassword);
        const firstNameErr = {empty:'First name  cannot be Empty', invalid:'First name is invalid'};
        const lastNameErr = {empty:'Last name cannot be Empty', invalid:'Last name is invalid'};
        const firstName = await helpers.validateString(firstNameInput,2,25,firstNameErr);
        const lastName = await helpers.validateString(lastNameInput,2,25,lastNameErr);
        const emailAddress = await helpers.validateEmail(email);
        const phonePrefixVal = await helpers.validatePhonePrefix(phonePrefix);
        const phoneNumber = await helpers.validatePhoneNumber(phone);
        const userPassword = await helpers.validatePassword(password);
        const confirmPwd = await helpers.validatePassword(cpassword);
        if(userPassword!==confirmPwd){
          throw{code:400,error:`Password and Confirm password don't match`};
        }
        const roleInputValue = await helpers.validateRole(roleInput);
        const result = await createAccount(firstName,lastName,emailAddress,phonePrefixVal,phoneNumber,roleInputValue,userPassword);
        if(result._id){
          return res.render('./Admin/adminAccount/adminCreateAccount',{title:"Admin Create Users Account",role:role,successMessage:"Account created successfully !"});
        }else{
          return res.status(500).render('./Admin/adminAccount/adminCreateAccount',{title:"Admin Create Users Account",error:`Internal Server Error`,role:role});
        }
      }catch(e){
        return res.status(400).render('./Admin/adminAccount/adminCreateAccount',{title:"Admin Create Users Account",error:e.error,role:role});
      }
});

router
  .route('/edit')
  .get(async (req, res) => {
    //const role = req.session.user? req.session.user.role:null;
    const role = req.session.user.role;
    const details = await getAll();
    let successMessage= null;
    let errorMessage = null;
    if(req.query.success === "true"){
      successMessage = "Account Updated Successfully!";
    }else if (req.query.success === "fail"){
      errorMessage = req.query.error?decodeURIComponent(req.query.error):"Update Failed";
    }
    //const successMessage = req.query.success === "true"?"Account Updated Successfully!":null;
    return res.render('./Admin/adminAccount/adminEditAccount',{title:"Admin Edit Users Account",role:role, details:details,successMessage:successMessage,error:errorMessage});
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
    let{accountId,firstNameInput,lastNameInput,email,phonePrefix,phone,roleInput} = req.body;
    let accountUpdateID=await helpers.checkId(accountId,"account id");
    try{
      await helpers.checkIfExistsForAccountUpdate(firstNameInput,lastNameInput,email,phonePrefix,phone,roleInput);
      const firstNameErr = {empty:'First name  cannot be Empty', invalid:'First name is invalid'};
      const lastNameErr = {empty:'Last name cannot be Empty', invalid:'Last name is invalid'};
      const firstName = await helpers.validateString(firstNameInput,2,25,firstNameErr);
      const lastName = await helpers.validateString(lastNameInput,2,25,lastNameErr);
      const emailAddress = await helpers.validateEmail(email);
      const phonePrefixVal = await helpers.validatePhonePrefix(phonePrefix);
      const phoneNumber = await helpers.validatePhoneNumber(phone);
      const roleInputValue = await helpers.validateRole(roleInput);
      const updateDetails = await updateAccount(accountUpdateID,firstName,lastName,emailAddress,phonePrefixVal,phoneNumber,roleInputValue);
      return res.redirect('/admin/account/edit?success=true');
    }catch(e){
      //const details = await getAll();
      //return res.status(400).render('./Admin/adminAccount/adminEditAccount',{title:"Admin Edit Users Account",role:role,error:e.error,details:details});
      return res.redirect(`/admin/account/edit?success=fail&error=${encodeURIComponent(e.error)}`);
    }

  })

  router
  .route('/view')
  .get(async (req, res) => {
    //const role = req.session.user? req.session.user.role:null;
    const role = req.session.user.role;
    const details = await getAll();
    const errorMessage = null;
    //console.log(details);
    const successMessage = req.query.success === "true"?"Account Updated Successfully!":null;
    return res.render('./Admin/adminAccount/adminViewAccount',{title:"Admin View Users Account",role:role, details:details,successMessage:successMessage,error:errorMessage});
  });

  router
  .route('/delete')
  .get(async (req, res) => {
    //const role = req.session.user? req.session.user.role:null;
    const role = req.session.user.role;
    const details = await getAll();
    //console.log(details);
    let successMessage= null;
    let errorMessage = null;
    if(req.query.success === "true"){
      successMessage = "Account Deleted Successfully!";
    }else if (req.query.success === "fail"){
      errorMessage = req.query.error?decodeURIComponent(req.query.error):"Delete Failed";
    }
    //const successMessage = req.query.success === "true"?"Account Deleted Successfully!":null;
    return res.render('./Admin/adminAccount/adminDeleteAccount',{title:"Admin Delete Users Account",role:role, details:details,successMessage:successMessage,error:errorMessage});
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
      return res.redirect('/admin/account/delete?success=fail');
    }
    
  });


  router
  .route('/search')
  .post(async (req, res) => {
    //const role = req.session.user? req.session.user.role:null;
    let role = req.session.user.role;
    let searchDetails ="";
    let successMessage= null;
    let errorMessage = null;
    try{
    const{searchFName ,searchLName}= req.body;
    const firstNameErr = {empty:'First name  cannot be Empty', invalid:'First name is invalid'};
    const firstName = await helpers.validateString(searchFName,2,25,firstNameErr);
    const lastNameErr = {empty:'Last name cannot be Empty', invalid:'Last name is invalid'};
    const lastName = await helpers.validateString(searchLName,2,25,lastNameErr);
    searchDetails = await getSearchData(firstName,lastName);
    if(searchDetails.length === 0 ){
      errorMessage = 'No results found for the given Name!';
      return res.render('./Admin/adminAccount/adminEditAccount',{title:"Admin Edit Users Account",role:role, searchDetails:searchDetails,successMessage:successMessage,error:errorMessage});
    }else{
      return res.render('./Admin/adminAccount/adminEditAccount',{title:"Admin Edit Users Account",role:role, searchDetails:searchDetails,successMessage:successMessage,error:errorMessage});
    }
    }catch(e){
      return res.render('./Admin/adminAccount/adminEditAccount',{title:"Admin Edit Users Account",role:role, searchDetails:searchDetails,successMessage:successMessage,error:e.error});
    }
    
  });

  router
  .route('/deleteSearch')
  .post(async (req, res) => {
    //const role = req.session.user? req.session.user.role:null;
    let role = req.session.user.role;
    let searchDetails ="";
    let successMessage= null;
    let errorMessage = null;
    try{
    const{searchFName , searchLName}= req.body;
    const firstNameErr = {empty:'First name  cannot be Empty', invalid:'First name is invalid'};
    const firstName = await helpers.validateString(searchFName,2,25,firstNameErr);
    const lastNameErr = {empty:'Last name cannot be Empty', invalid:'Last name is invalid'};
    const lastName = await helpers.validateString(searchLName,2,25,lastNameErr);
    searchDetails = await getSearchData(firstName,lastName);
    if(searchDetails.length === 0 ){
      errorMessage = 'No results found for the given Name!';
      return res.render('./Admin/adminAccount/adminDeleteAccount',{title:"Admin Delete Users Account",role:role, searchDetails:searchDetails,successMessage:successMessage,error:errorMessage});
    }
    else{
      return res.render('./Admin/adminAccount/adminDeleteAccount',{title:"Admin Delete Users Account",role:role, searchDetails:searchDetails,successMessage:successMessage,error:errorMessage});

    }
    }catch(e){
      return res.render('./Admin/adminAccount/adminDeleteAccount',{title:"Admin Delete Users Account",role:role, searchDetails:searchDetails,successMessage:successMessage,error:e.error});
    }
    
  });

  router
  .route('/viewSearch')
  .post(async (req, res) => {
    //const role = req.session.user? req.session.user.role:null;
    let role = req.session.user.role;
    let searchDetails ="";
    let successMessage= null;
    let errorMessage = null;
    try{
    const{searchFName ,searchLName}= req.body;
    const firstNameErr = {empty:'First name  cannot be Empty', invalid:'First name is invalid'};
    const firstName = await helpers.validateString(searchFName,2,25,firstNameErr);
    const lastNameErr = {empty:'Last name cannot be Empty', invalid:'Last name is invalid'};
    const lastName = await helpers.validateString(searchLName,2,25,lastNameErr);
    searchDetails = await getSearchData(firstName,lastName);
    if(searchDetails.length === 0 ){
      errorMessage = 'No results found for the given Name!';
      return res.render('./Admin/adminAccount/adminViewAccount',{title:"Admin View Users Account",role:role, searchDetails:searchDetails,successMessage:successMessage,error:errorMessage});
    }
    else{
      return res.render('./Admin/adminAccount/adminViewAccount',{title:"Admin View Users Account",role:role, searchDetails:searchDetails,successMessage:successMessage,error:errorMessage});
    }
    }catch(e){
      return res.render('./Admin/adminAccount/adminViewAccount',{title:"Admin View Users Account",role:role, searchDetails:searchDetails,successMessage:successMessage,error:e.error});
    }
    
  });

  
export default router;

