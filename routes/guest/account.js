import {Router} from 'express';
const router = Router();
import * as helpers from '../../helpers.js';
import {getAccountById} from "../../data/account.js";


  router
  .route('/account/view/:id')
  .get(async(req,res)=>{
    if(!req.session.user || req.session.user.id!== req.params.id){
      return res.status(403).send("Unauthorized access");
    }
    try{
      const accountDetails = await getAccountById(req.params.id);
      req.render('./guest/guestAccount/viewAccount',{account:accountDetails});

    }catch(e){
      res.status(500).render('errorPage',{error:e.message});
    }
  })

  router
  .route('/account/edit/:id')
  .get(async(req,res)=>{
    console.log("I am in edit");
    if(!req.session.user || req.session.user.id!== req.params.id){
      return res.status(403).send("Unauthorized access");
    }
    try{
      const accountDetails = await getAccountById(req.params.id);
      req.render('./guest/guestAccount/editAccount',{account:accountDetails});

    }catch(e){
      res.status(500).render('errorPage',{error:e.message});
    }
  })
  .post(async(req,res)=>{
    if(!req.session.user || req.session.user.id!== req.params.id){
      return res.status(403).send("Unauthorized access");
    }
    try{
      await updateAccount(req.params.id,req.body);
      res.redirect('/account/view/${req.params.id}');
    }catch(e){
      res.status(400).render('./guest/guestAccount/editAccount',{error:e.message,account:req.body});
    }

  })


  export default router;