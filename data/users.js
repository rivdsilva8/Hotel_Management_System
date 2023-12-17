import { ObjectId } from "mongodb";
import { accounts } from "../config/mongoCollections.js";
import * as helpers from "../helpers.js";
import bcrypt from "bcryptjs";
const saltRounds = 16;

export const loginUser = async (email, password) => {
  email = await helpers.validateEmail(email);
  password = await helpers.validatePassword(password);
  const userData = await accounts();
  let userRecord = await userData.findOne({ email: email });
  if (!userRecord) {
    throw {
      code: 400,
      error: "Either the email address or password is invalid",
    };
  }
  let matchPwd = await bcrypt.compare(password, userRecord.password);
  if (!matchPwd) {
    throw {
      code: 400,
      error: "Either the email address or password is invalid",
    };
  }
  return userRecord;
};

export const createAccount = async (
  firstName,
  lastName,
  email,
  phonePrefix,
  phoneNumber,
  roleInput,
  password
) => {
  const firstNameErr = {
    empty: "First Name cannot be Empty",
    invalid: "First Name is invalid",
  };
  const lastNameErr = {
    empty: "Last Name cannot be Empty",
    invalid: "Last Name is invalid",
  };
  const firstAcctName = await helpers.validateString(
    firstName,
    2,
    25,
    firstNameErr
  );
  const lastAcctName = await helpers.validateString(
    lastName,
    2,
    25,
    lastNameErr
  );
  const emailAddress = await helpers.validateEmail(email);
  const phonePrefixVal = await helpers.validatePhonePrefix(phonePrefix);
  const phone = await helpers.validatePhone(phoneNumber);
  const pwd = await helpers.validatePassword(password);
  const roleInputValue = await helpers.validateRole(roleInput);
  let accountDetails;
  try {
    accountDetails = await accounts();
  } catch (e) {
    throw {
      code: 400,
      error: `Error -- Failed to connect to accounts due to :${e.message}`,
    };
  }
  let hashedPassword = await bcrypt.hash(pwd, saltRounds);
  let acctDetail = {
    firstName: firstAcctName.trim(),
    lastName: lastAcctName.trim(),
    email: emailAddress.trim(),
    phonePrefix: phonePrefixVal,
    phoneNumber: phone,
    password: hashedPassword,
    role: roleInputValue ? roleInputValue : "user",
  };

  const emailExists = await accountDetails.findOne({ email: emailAddress });
  if (emailExists) {
    const acct = "Email address Exists already";
    throw {
      code: 400,
      error: `Email address exits already so provide a new email`,
    };
  }
  const phoneDetailsExists = await accountDetails.findOne({
    phoneNumber: phone,
  });
  if (phoneDetailsExists) {
    const acct = "Phone Number Exists already";
    throw {
      code: 400,
      error: `Phone Number exits already so provide a new number`,
    };
  }
  const accountExists = await accountDetails.findOne({
    $and: [{ firstName: firstAcctName.trim() }, { email: emailAddress.trim() }],
  });
  if (accountExists) {
    const acct = "account Exists already";
    throw { code: 400, error: `Account already exists with the same details` };
  }
  const insertAcct = await accountDetails.insertOne(acctDetail);
  if (!insertAcct.acknowledged || !insertAcct.insertedId) {
    throw { code: 400, error: "Could not add the details for the  account" };
  }
  const newAcctId = insertAcct.insertedId;
  const detailsAct = await accountDetails.findOne({ _id: newAcctId });
  detailsAct._id = detailsAct._id.toString();
  return detailsAct;
};

export const resetPassword = async (email, password) => {
  email = await helpers.validateEmail(email);
  password = await helpers.validatePassword(password);
  const userData = await accounts();
  const userRecord = await userData.findOne({ email: email });
  if (!userRecord) {
    throw { code: 400, error: "Not an Registered Email" };
  }
  const isPasswordMatch = await bcrypt.compare(password, userRecord.password);
  if (isPasswordMatch) {
    throw {
      code: 400,
      error:
        "New Password cannot be same as the Old Password - So provide a new password or login with old Password",
    };
  }
  let hashedPassword = await bcrypt.hash(password, saltRounds);
  const updateInfo = await userData.updateOne(
    { email: email },
    { $set: { password: hashedPassword } }
  );
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount) {
    throw { code: 500, error: "Could not update the password" };
  }
  return { updated: true, userId: userRecord._id };
};
