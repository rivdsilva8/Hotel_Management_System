import { dbConnection, closeConnection } from "../config/mongoConnection.js";
import * as accountData from "../data/users.js";
import feedbackData from "../data/feedback.js";
import * as roomData from "../data/room.js";
import * as bookingData from "../data/booking.js";
import { saveImageDetailsToMongoDB } from "../data/gallery.js";


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

  //Room seeding
  await roomData.createPhotos("single", "https://firebasestorage.googleapis.com/v0/b/hotel-management-eceff.appspot.com/o/images%2Fsingle.jpg?alt=media&token=4b75d0d6-9179-4c7a-bad7-574cad70e1cb")

  await roomData.createPhotos("double", "https://firebasestorage.googleapis.com/v0/b/hotel-management-eceff.appspot.com/o/images%2F1.PNG?alt=media&token=ff4bb65a-2c8e-424b-b555-eee16ae79eeb")

  await roomData.createPhotos("suite", "https://firebasestorage.googleapis.com/v0/b/hotel-management-eceff.appspot.com/o/images%2F10.PNG?alt=media&token=80da958a-f091-4891-b927-478d9a0663a9")
 

  await roomData.createRoom(
    1001,
    "single",
    13.09,
    true,
    "new single room",
    true
)


  await roomData.createRoom(
      1002,
      "single",
      13.09,
      true,
      "new single room",
      false
  )

  

  await roomData.createRoom(
      1003,
      "single",
      13.09,
      true,
      "new single room",
      true
  )

  
  
  await roomData.createRoom(
      2001,
      "double",
      20.00,
      true,
      "new double room",
      true
  )

  await roomData.createRoom(
    2002,
    "double",
    20.00,
    true,
    "new double room",
    true
)

await roomData.createRoom(
  2003,
  "double",
  20.00,
  true,
  "new double room",
  true
)


await roomData.createRoom(
  3001,
  "suite",
  50.00,
  true,
  "new suite room",
  true
)

await roomData.createRoom(
3002,
"suite",
50.00,
true,
"new suite room",
true
)

await roomData.createRoom(
3003,
"suite",
50.00,
true,
"new suite room",
false
)


  console.log("Done seeding rooms");

  await bookingData.CreateBooking(
    "Frank",
    "Miller",
    "frank@example.com",
    "1234567895",
    "12/15/2023",
    "12/17/2023",
    
  );
  await bookingData.CreateBooking(
    "Henry",
    "Garcia",
    "henry@example.com",
    "1234567897",
    "12/15/2023",
    "12/17/2023",
  
  );

  await bookingData.CreateBooking(
    "Isabel",
    "Martinez",
    "isabel@example.com",
    "1234567898",
    "12/15/2023",
    "12/17/2023",
    
  );
  await bookingData.CreateBooking(
    "Jack",
    "Wilson",
    "jack@example.com",
    "1234567899",
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

  await saveImageDetailsToMongoDB({
    filename: 'hotel1',
    url: 'https://firebasestorage.googleapis.com/v0/b/hotel-management-eceff.appspot.com/o/images%2F1.PNG?alt=media&token=ff4bb65a-2c8e-424b-b555-eee16ae79eeb'
})

await saveImageDetailsToMongoDB({
  filename: 'hotel2',
  url: 'https://firebasestorage.googleapis.com/v0/b/hotel-management-eceff.appspot.com/o/images%2F2.PNG?alt=media&token=b03bbd4a-7f9e-4064-9bd9-c495a3bfa89e'
})

await saveImageDetailsToMongoDB({
  filename: 'hotel3',
  url: 'https://firebasestorage.googleapis.com/v0/b/hotel-management-eceff.appspot.com/o/images%2F3.PNG?alt=media&token=405ce41e-05e4-4a58-bd98-53b7038cf4b0'
})
await saveImageDetailsToMongoDB({
  filename: 'hotel4',
  url: 'https://firebasestorage.googleapis.com/v0/b/hotel-management-eceff.appspot.com/o/images%2F3.PNG?alt=media&token=405ce41e-05e4-4a58-bd98-53b7038cf4b0'
})
await saveImageDetailsToMongoDB({
  filename: 'hotel5',
  url: 'https://firebasestorage.googleapis.com/v0/b/hotel-management-eceff.appspot.com/o/images%2F5.PNG?alt=media&token=8c82fbc5-9bb2-47d0-a325-d0d129cc307a'
})
await saveImageDetailsToMongoDB({
  filename: 'hotel6',
  url: 'https://firebasestorage.googleapis.com/v0/b/hotel-management-eceff.appspot.com/o/images%2F6.PNG?alt=media&token=d072fad6-94c4-41f9-b369-0fd02548021a'
})
await saveImageDetailsToMongoDB({
  filename: 'hotel7',
  url: 'https://firebasestorage.googleapis.com/v0/b/hotel-management-eceff.appspot.com/o/images%2F7.PNG?alt=media&token=094df96c-a936-48c4-8566-d0b212bb8a27'
})
await saveImageDetailsToMongoDB({
  filename: 'hotel8',
  url: 'https://firebasestorage.googleapis.com/v0/b/hotel-management-eceff.appspot.com/o/images%2F8.PNG?alt=media&token=c939bf4b-db43-4c1a-a2e0-1b248980d6f6'
})
await saveImageDetailsToMongoDB({
  filename: 'hotel9',
  url: 'https://firebasestorage.googleapis.com/v0/b/hotel-management-eceff.appspot.com/o/images%2F9.PNG?alt=media&token=90bbcfc0-8144-433a-872e-628a0a35dce5'
})
await saveImageDetailsToMongoDB({
  filename: 'hotel10',
  url: 'https://firebasestorage.googleapis.com/v0/b/hotel-management-eceff.appspot.com/o/images%2F10.PNG?alt=media&token=80da958a-f091-4891-b927-478d9a0663a9'
})
  console.log("Done seeding gallery");

  console.log("Done seeding database");

  await closeConnection();
} catch (e) {
  console.log(e);
}


