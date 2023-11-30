// CREATE, DELETE, EDIT, READ ALL
// CREATE: name, email, contact number, create youe own id, password, confirm password
import { ObjectId } from "mongodb";
import {accounts } from "../config/mongoCollections.js";
import * as helpers from '../helpers.js'

const checkUserDetails = async(accountName,email,password)=>{
    const nameErr = {empty:'Name cannot be Empty', invalid:'Given name is invalid'};
    accountName = await helpers.validateString(accountName,2,25,nameErr);
    email= await helpers.validateEmail(email);
    password =await helpers.validatePassword(password);   
}
export const loginUser = async (accountName,email, password) => {
    await checkUserDetails(accountName,email,password);
    //await checkIfExistsForLogin (emailAddress,password);
    const userData = await accounts();//sbahala@stevens.edu
    //console.log(emailAddress);
    //console.log(userData);
    let userRecord = await userData.findOne({$and:[{name:accountName.trim()},{email:email.trim()}]});
    if(!userRecord){
      //console.log("no data found");
      throw{code:400,error:'no data found for user'};
    }
    return userRecord;
  };
  
export const createAccount = async( accountName, email, password)=>{
    await checkUserDetails(accountName,email,password);
    let accountDetails;
    try{
        accountDetails = await accounts();
    }catch(e){
        throw `Error -- Failed to connect to accounts due to :${e.message}`;
    }
    let acctDetail = {
        name: accountName.trim(), 
        email: email.trim(),
        password
      }
    const accountExists = await accountDetails.findOne({$and:[{name:accountName.trim()},{email:email.trim()}]});
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
}
//const exportedMethods = {createAccount};

//export default exportedMethods;
