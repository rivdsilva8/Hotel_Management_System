import {Router} from 'express';
const router = Router();
import * as helpers from '../../helpers.js';
import {getAccountById,updateAccount} from "../../data/account.js";


  router
  .route('/view/:id')
  .get(async(req,res)=>{
    if(!req.session.user || req.session.user.id!== req.params.id){
      return res.status(403).send("Unauthorized access");
    }
    try{
      const accountID=await helpers.checkId(req.params.id,"account id");
      const accountDetails = await getAccountById(accountID);
      return res.render('guest/guestAccount/viewAccount',{account:accountDetails});

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
    try{
      const accountID=await helpers.checkId(req.params.id,"account id");
      const accountDetails = await getAccountById(accountID);
      return res.render('guest/guestAccount/editAccount',{account:accountDetails});

    }catch(e){
      console.log(e);
      return res.status(500).render('guest/errorPage',{error:e.message});
    }
  })
  .post(async(req,res)=>{
    if(!req.session.user || req.session.user.id!== req.params.id){
      return res.status(403).send("Unauthorized access");
    }
    let{firstNameInput,lastNameInput,email,phone} = req.body;
    let accountUpdateID=await helpers.checkId(req.params.id,"account id");
    try{
      await helpers.checkIfExistsForAccountUpdate(firstNameInput,lastNameInput,email,phone);
      const updateDetails = await updateAccount(accountUpdateID,req.body);
      return res.render('guest/guestAccount/editAccount',{account:updateDetails,
      successMessage:'Account updated successfully!'})
      //res.redirect('/account/view/${req.params.id}',{updateDetails});
    }catch(e){
      /*const mappedData={firstName:req.body.firstNameInput,
        lastName:req.body.lastNameInput,
        phoneNumber:req.body.phone,
        email:req.body.email}*/
      const accountDetails = await getAccountById(accountUpdateID);
      return res.status(e.code).render('guest/guestAccount/editAccount',{error:e.error,account:accountDetails});
    }

  })


  export default router;