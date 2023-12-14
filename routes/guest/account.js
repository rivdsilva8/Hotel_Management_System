import {Router} from 'express';
const router = Router();
import * as helpers from '../../helpers.js';
import {getAccountById,updateAccount} from "../../data/account.js";
import fs from 'fs/promises';

const loadCountryCodes = async ()=>{
  try{
    const data = await fs.readFile(new URL('../../public/js/countryCodes.json',import.meta.url),'utf8');
    return JSON.parse(data);
  }catch(e){
    console.error("Error loading country codes",e)
    //return res.status(500).render('guest/errorPage',{error:e.message});
    return[];

  }
}

//new code 
router.get("/", async (req, res) => {
  try {
    res.render("./guest/guestAccount/account", {
      title: "guest account page",
      userId:req.session.user.id
    });
  } catch (e) {
    return res.status(500).render('guest/errorPage',{error:e.message});
  }
});

//

  router
  .route('/view/:id')
  .get(async(req,res)=>{
    if(!req.session.user || req.session.user.id!== req.params.id){
      return res.status(403).send("Unauthorized access");
    }
    const countryCodes = await loadCountryCodes();
    //console.log(countryCodes);
    try{
      const accountID=await helpers.checkId(req.params.id,"account id");
      const accountDetails = await getAccountById(accountID);
      return res.render('./guest/guestAccount/viewAccount',{title: "guest view account page",account:accountDetails,codes:countryCodes});

    }catch(e){
      return res.status(500).render('guest/errorPage',{error:e.message});
    }
  })

  router
  .route('/edit/:id')
  .get(async(req,res)=>{
    if(!req.session.user || req.session.user.id!== req.params.id){
      return res.status(403).send("Unauthorized access");
    }
    const countryCodes = await loadCountryCodes();
    try{
      const accountID=await helpers.checkId(req.params.id,"account id");
      const accountDetails = await getAccountById(accountID);
      //return res.render('guest/guestAccount/editAccount',{account:accountDetails});
      return res.render('./guest/guestAccount/editAccount',{title: "guest edit account page",account:accountDetails,codes:countryCodes});

    }catch(e){
      return res.status(500).render('guest/errorPage',{error:e.message});
    }
  })
  .post(async(req,res)=>{
    if(!req.session.user || req.session.user.id!== req.params.id){
      return res.status(403).send("Unauthorized access");
    }
    let{firstNameInput,lastNameInput,email,phonePrefix,phone} = req.body;
    let accountUpdateID=await helpers.checkId(req.params.id,"account id");
    try{
      await helpers.checkIfExistsForAccountUpdate(firstNameInput,lastNameInput,email,phonePrefix,phone);
      const firstNameErr = {empty:'First name  cannot be Empty', invalid:'First name is invalid'};
      const lastNameErr = {empty:'Last name cannot be Empty', invalid:'Last name is invalid'};
      const firstName = await helpers.validateString(firstNameInput,2,25,firstNameErr);
      const lastName = await helpers.validateString(lastNameInput,2,25,lastNameErr);
      const emailAddress = await helpers.validateEmail(email);
      const phoneNumber = await helpers.validatePhoneNumber(phone);
      const roleInput ="user";
      const updateDetails = await updateAccount(accountUpdateID,firstName,lastName,emailAddress,phonePrefix,phoneNumber,roleInput);
      return res.render('./guest/guestAccount/editAccount',{title: "guest edit account page",account:updateDetails,
      successMessage:'Account updated successfully!'})
      //res.redirect('/account/view/${req.params.id}',{updateDetails});
    }catch(e){
      /*const mappedData={firstName:req.body.firstNameInput,
        lastName:req.body.lastNameInput,
        phoneNumber:req.body.phone,
        email:req.body.email}*/
      const accountDetails = await getAccountById(accountUpdateID);
      return res.status(e.code).render('./guest/guestAccount/editAccount',{title: "guest edit account page",error:e.error,account:accountDetails});
    }

  })


  export default router;