// CREATE, DELETE, EDIT, GET ALL
// CREATE: name, email, contact number, create youe own id, password, confirm password

import { ObjectId } from "mongodb";
import {accounts } from "../config/mongoCollections.js";
import * as helpers from '../helpers.js'

export const deleteAccount = async(accountId)=>{
    accountId = await helpers.checkId(accountId,"account Id");
    let forRemoveAccountData = await accounts();
     //logic to check if the id exists
     const checkAccountDeletionId = await forRemoveAccountData.findOne({
        "_id": new ObjectId(accountId)
    });
    if(!checkAccountDeletionId){
        throw `No attendee found with the id: ${accountId}`;
    }
    const deleteAccount = await forRemoveAccountData.deleteOne({"_id":new ObjectId(accountId)});
    if(deleteAccount.deletedCount === 0){
        throw `Error: Could not delete user with id of ${accountId}`;

    }
    else{
        return deleteAccount;
    }
    /*const deleteAccount = await forRemoveAccountData.updateOne(
        {_id:checkAccountDeletionId._id},
        {$pull:{attendees:{_id:new ObjectId(accountId)}}}
    );

    if (deleteAccount.modifiedCount === 0 ) {
        throw `Error: Could not delete user with id of ${accountId}`;
    }else{
        return "Deleted Successfully";
    }*/


}
export const updateAccount = async(accountId, updateData)=>{
    accountId = await helpers.checkId(accountId,"account Id");
    let accountBeforeUpdateDetails = await accounts();
    await helpers.checkIfExistsForAccountUpdate(updateData.firstNameInput,updateData.lastNameInput,updateData.email,updateData.phone);
    const firstNameErr = {empty:'First Name cannot be Empty', invalid:'First Name is invalid and cannot be less than 2 letters'};
    const lastNameErr = {empty:'Last Name cannot be Empty', invalid:'Last Name is invalid and cannot be less than 2 letters'};
    const firstAcctName = await helpers.validateString(updateData.firstNameInput,2,25,firstNameErr);
    const lastAcctName = await helpers.validateString(updateData.lastNameInput,2,25,lastNameErr);
    const emailAddress= await helpers.validateEmail(updateData.email);
    const phone = await helpers.validatePhoneNumber(updateData.phone);
    const mappedUpdatedData={firstName:firstAcctName,
    lastName:lastAcctName,
    phoneNumber:phone,
    email:emailAddress}
    const updateResult = await accountBeforeUpdateDetails.updateOne(
        {"_id":new ObjectId(accountId)},
        {$set:mappedUpdatedData});
    if(updateResult.modifiedCount === 0){
        throw `Could not update  account with id ${accountId}`;
    }else{
        let updatedData =await accountBeforeUpdateDetails.findOne({"_id":new ObjectId(accountId)});
        if(!updatedData){
            throw`Error retrieving updated data for id${accountId}`;
        }
        return updatedData;
    }
}

export const getAll = async()=>{
    let accountCollection = await accounts();
    return await accountCollection.find({}).toArray();//needs work.
}

export const getAccountById = async (accountId) => {
    accountId = await helpers.checkId(accountId,"Attendee Id");
    let accountGetDetails = await accounts();
    const accountData = await accountGetDetails.findOne({"_id":new ObjectId(accountId)});
    if(!accountData){
        throw `Account with the id:${accountId} not found`;
    }
    accountData._id = accountData._id.toString();
    return accountData;
  };//needs work

//const exportedMethods = {};

//export default exportedMethods;
