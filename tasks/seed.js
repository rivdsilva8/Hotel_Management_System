import { dbConnection, closeConnection } from "../config/mongoConnection.js";
import * as accountData from "../data/users.js";
import feedbackData from "../data/feedback.js";
import * as roomData from "../data/room.js";
import * as bookingData from "../data/booking.js";


const db = await dbConnection();
await db.dropDatabase();

//account seeding
try {
  await accountData.createAccount(
    "Alice",
    "Smith",
    "alice@example.com",
    "+1",
    "1234567890",
    "admin",
    "Pass123!"
  );
  await accountData.createAccount(
    "Bob",
    "Johnson",
    "bob@example.com",
    "+1",
    "1234567891",
    "admin",
    "Adm1n#321"
  );

  await accountData.createAccount(
    "Carol",
    "Williams",
    "carol@example.com",
    "+1",
    "1234567892",
    "staff",
    "StafF@456"
  );
  await accountData.createAccount(
    "David",
    "Brown",
    "david@example.com",
    "+1",
    "1234567893",
    "staff",
    "Dav3S$taff"
  );
  await accountData.createAccount(
    "Eve",
    "Jones",
    "eve@example.com",
    "+1",
    "1234567894",
    "staff",
    "EveSt#1234"
  );

  let frankDetails = await accountData.createAccount(
    "Frank",
    "Miller",
    "frank@example.com",
    "+1",
    "1234567895",
    "user",
    "UserF1*234"
  );
  
  let henryDetails = await accountData.createAccount(
    "Henry",
    "Garcia",
    "henry@example.com",
    "+1",
    "1234567897",
    "user",
    "HenrY2@34"
  );
  let isabelDetails = await accountData.createAccount(
    "Isabel",
    "Martinez",
    "isabel@example.com",
    "+1",
    "1234567898",
    "user",
    "Isa3*6789"
  );
  let jackDetails = await accountData.createAccount(
    "Jack",
    "Wilson",
    "jack@example.com",
    "+1",
    "1234567899",
    "user",
    "JackW1!23"
  );

  let lauraDetails = await accountData.createAccount(
    "Laura",
    "Smith",
    "laura@example.com",
    "+1",
    "1234567800",
    "user",
    "Laur4S!mth"
  );

  let michaelDetails = await accountData.createAccount(
    "Michael",
    "Johnson",
    "michael@example.com",
    "+1",
    "1234567801",
    "user",
    "M1chaelJ@hn"
  );

  let noraDetails = await accountData.createAccount(
    "Nora",
    "Brown",
    "nora@example.com",
    "+1",
    "1234567802",
    "user",
    "NoraB#1234"
  );

  let oliverDetails = await accountData.createAccount(
    "Oliver",
    "Jones",
    "oliver@example.com",
    "+1",
    "1234567803",
    "user",
    "0liverJ!789"
  );

  let patriciaDetails = await accountData.createAccount(
    "Patricia",
    "Gonzalez",
    "patricia@example.com",
    "+1",
    "1234567804",
    "user",
    "Patr1c!aGz"
  );

  console.log("Done seeding accounts");
  //feedbacks
  await feedbackData.create(
    frankDetails._id.toString(),
    "single",
    "Frank Miller",
    10,
    "Best hotel ever!!!"
  );

  

  await feedbackData.create(
    henryDetails._id.toString(),
    "double",
    "Henry Garcia",
    8,
    "Lovely room and excellent customer service."
  );

  await feedbackData.create(
    isabelDetails._id.toString(),
    "single",
    "Isabel Martinez",
    7,
    "Comfortable stay with a great view."
  );

  await feedbackData.create(
    jackDetails._id.toString(),
    "suite",
    "Jack Wilson",
    9,
    "Exceptional service, highly recommend."
  );

  await feedbackData.create(
    lauraDetails._id.toString(),
    "double",
    "Laura Smith",
    8,
    "Very clean and well-maintained facilities."
  );

  await feedbackData.create(
    michaelDetails._id.toString(),
    "single",
    "Michael Johnson",
    6,
    "Good location but the bed was uncomfortable."
  );

  await feedbackData.create(
    noraDetails._id.toString(),
    "suite",
    "Nora Brown",
    9,
    "Fantastic experience, very relaxing stay."
  );

  await feedbackData.create(
    oliverDetails._id.toString(),
    "double",
    "Oliver Jones",
    7,
    "Pleasant staff, but the room was a bit noisy."
  );

  await feedbackData.create(
    patriciaDetails._id.toString(),
    "single",
    "Patricia Gonzalez",
    8,
    "Great amenities and friendly service."
  );


  console.log("Done seeding feedbacks");

  //room seeding

  await roomData.createRoom(
    101,
    "single",
    60,
    true,
    [],
    "Comfy single room",
    true
  );
  await roomData.createRoom(
    102,
    "single",
    65,
    true,
    [],
    "Cozy single room with a view",
    true
  );
  await roomData.createRoom(
    103,
    "single",
    70,
    false,
    [],
    "Spacious single room",
    false
  );
  await roomData.createRoom(
    104,
    "single",
    75,
    true,
    [],
    "Modern single room",
    true
  );
  await roomData.createRoom(
    201,
    "double",
    80,
    true,
    [],
    "Elegant double room",
    true
  );
  await roomData.createRoom(
    202,
    "double",
    85,
    false,
    [],
    "Classic double room",
    false
  );
  await roomData.createRoom(
    203,
    "double",
    90,
    true,
    [],
    "Double room with extra comfort",
    true
  );
  await roomData.createRoom(
    204,
    "double",
    95,
    true,
    [],
    "Stylish double room",
    true
  );
  await roomData.createRoom(
    301,
    "suite",
    120,
    true,
    [],
    "Luxurious suite",
    true
  );
  await roomData.createRoom(
    302,
    "suite",
    130,
    false,
    [],
    "Executive suite with amenities",
    false
  );
  await roomData.createRoom(
    303,
    "suite",
    140,
    true,
    [],
    "Royal suite experience",
    true
  );
  await roomData.createRoom(
    304,
    "suite",
    150,
    true,
    [],
    "Presidential suite",
    true
  );

  await bookingData.CreateBooking(
    "Alice",
    "Smith",
    "alice@example.com",
    "1234567890",
    "12/15/2023",
    "12/17/2023"
  );
  await bookingData.CreateBooking(
    "Bob",
    "Johnson",
    "bob@example.com",
    "1234567891",
    "12/15/2023",
    "12/17/2023"
  );

  await bookingData.CreateBooking(
    "Carol",
    "Williams",
    "carol@example.com",
    "1234567892",
    "12/15/2023",
    "12/17/2023"
  );
  await bookingData.CreateBooking(
    "David",
    "Brown",
    "david@example.com",
    "1234567893",
    "12/15/2023",
    "12/17/2023"
  );

  await bookingData.CreateBooking(
    "Eve",
    "Jones",
    "eve@example.com",
    "1234567894",
    "12/15/2023",
    "12/17/2023"
  );
  console.log("Done seeding rooms");

  console.log("Done seeding database");

  await closeConnection();
} catch (e) {
  console.log(e);
}

//CODE FOR GALLERY POST (MAHESH PLS)
// const response = await fetch("/guest/feedback/deleteFeedback", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
// body:{}
//   });

