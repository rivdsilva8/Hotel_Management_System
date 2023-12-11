import { ObjectId } from "mongodb";
import {accounts } from "../config/mongoCollections.js";
import * as helpers from '../helpers.js';
import bcrypt from 'bcryptjs';
const saltRounds = 16;

export const loginUser = async (email, password) => {
    email= await helpers.validateEmail(email);
    password =await helpers.validatePassword(password);
    const userData = await accounts();
    let userRecord = await userData.findOne({email:email});
    if(!userRecord){
    throw{code:400,error:'Either the email address or password is invalid'};
    }
    let matchPwd = await bcrypt.compare(password,userRecord.password);
    if(!matchPwd){
    throw{code:400,error:'Either the email address or password is invalid'};
    }
    return userRecord;
  };
  
export const createAccount = async(firstName,lastName,email,phoneNumber,password)=>{
    const firstNameErr = {empty:'First Name cannot be Empty', invalid:'First Name is invalid'};
    const lastNameErr = {empty:'Last Name cannot be Empty', invalid:'Last Name is invalid'};
    const firstAcctName = await helpers.validateString(firstName,2,25,firstNameErr);
    const lastAcctName = await helpers.validateString(lastName,2,25,lastNameErr);
    const emailAddress= await helpers.validateEmail(email);
    const phone = await helpers.validatePhoneNumber(phoneNumber);
    const pwd = await helpers.validatePassword(password);
    let accountDetails;
    try{
        accountDetails = await accounts();
    }catch(e){
        throw `Error -- Failed to connect to accounts due to :${e.message}`;
    }
    let hashedPassword = await bcrypt.hash(pwd,saltRounds);
    let acctDetail = {
        firstName: firstAcctName.trim(), 
        lastName: lastAcctName.trim(),
        email: emailAddress.trim(),
        phoneNumber:phone,
        password:hashedPassword,
        role:"user"
      }
    const accountExists = await accountDetails.findOne({$and:[{firstName:firstAcctName.trim()},{email:emailAddress.trim()}]});
    if(accountExists){
      const acct = "account Exists already"
      throw `Account already exists with the same details`;
    }
    const insertAcct = await accountDetails.insertOne(acctDetail);
    if (!insertAcct.acknowledged || !insertAcct.insertedId){
      throw 'Could not add the details for the  account';
    }
    const newAcctId = insertAcct.insertedId
    const detailsAct = await accountDetails.findOne({_id: newAcctId})
    detailsAct._id = detailsAct._id.toString();
    return detailsAct;
};
