// CREATE, DELETE, EDIT, READ ALL
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
        return "Account Deleted Successfully";
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
    const updateResult = await accountBeforeUpdateDetails.updateOne(
        {"_id":new ObjectId(accountId)},
        {$set:updateData});
    if(updateResult.modifiedCount === 0){
        throw `Could not update  account with id ${accountId}`;
    }else{
        return "Account updated Successfully";
    }
}

export const readAll = async()=>{
    let accountCollection = await accounts();
    return await accountCollection.find({}).toArray();//needs work.
}

export const getAccountById = async (accountId) => {
    await checkId(accountId,"Attendee Id");
    let accountGetDetails = await events();
    const accountData = await accountGetDetails.aggregate([
      {$unwind:"$attendees"},
      {$match:{"attendees._id": new ObjectId(accountId)}},
      {$replaceRoot:{newRoot:"$attendees"}}
    ]).toArray();
    if(accountData.length === 0){
      throw `Attendee with the give id :${accountId} not found`;
    }
    accountData[0]._id = accountData[0]._id.toString();
    return accountData[0];
  };//needs work

//const exportedMethods = {};

//export default exportedMethods;
