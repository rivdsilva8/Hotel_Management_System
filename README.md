
## Hotel Management System

Team Members:
•	Mahesh Pisharody
•	Rivaldo D Silva
•	Yuzhi Wang
•	Sushmita Bahala
•	Kaushik Parmar

## Introduction

Welcome to our Hotel Management System, your portal to effortless and streamlined hospitality management. With just a few clicks, manage rooms seamlessly add, update, or remove them with detailed information at your fingertips. Guests experience a swift and intuitive booking process, finding their perfect room based on preferences. Our Admin Dashboard offers real-time insights, ensuring efficient operations. Simplify check-ins and check-outs with digital forms and detailed invoices. Explore our Hotel Photo Gallery, read guest feedback, and immerse yourself in local recommendations. Join vibrant discussions within our secure platform and stay updated with automated notifications. Here, every feature is meticulously crafted for an exceptional guest experience. Welcome to a world where technology elevates hospitality, one click at a time.

## Core Features

1.	Room Management:
•	Add, update, and delete rooms with details such as room number, type, price, and availability. Implement a room availability list type calendar for staff to manage bookings effectively.
2.	Booking System:
•	Allow guest to search for available rooms based on check-out dates. Implement a booking from where administrators can view booking statistics, occupancy rates, and revenue summaries. Generate reports for various periods to analyze hotel performance.
3.	Admin Dashboard and Reporting:
•	Create an admin dashboard where administrators can view booking statistics, occupancy rates, and revenue summaries. Generate reports for various periods to analyze hotel performance.
4.	Check-in and Check-out:
•	Implement digital check-in forms for guests. Staff should be able to verify check-in details and process check-outs, marking rooms as cleaned and available.
5.	Payment Handling:
•	Generate invoices for guests upon check-out, detailing the total cost of stay and any additional charges. Implement a payment system (without real transactions, for demonstration purposes) to simulate payment processing.
6.	Hotel Photo Gallery:
•	Admin can Add and Delete photos of hotel to show it to the users online.
7.	Feedback and Reviews:
•	Allow guests to leave feedback and reviews after their stay. Display average ratings and reviews for rooms and services.

Extra Features:
1.	Local Attraction and Recommendations:
•	Include a section showcasing local attractions, restaurants, and activities near the hotel.
2.	Notifications and Reminders:
•	Send email or SMS notifications to guests for booking confirmations, reminders for upcoming reservations, and thank you messages after check-out.

## Prerequisites for Application
Before starting with the project, ensure you have the following prerequisites installed and configured:

MongoDB: MongoDB is a NoSQL database system that stores data in a flexible, JSON-like format. Make sure you have MongoDB installed on your system. You can download and install MongoDB from the official MongoDB website: MongoDB Download

MongoDB Compass: MongoDB Compass is a graphical user interface (GUI) for MongoDB. It provides a convenient way to visualize and interact with your MongoDB data. You can download and install MongoDB Compass from the official MongoDB website: MongoDB Compass Download

Node.js: Node.js is a JavaScript runtime environment that allows you to run JavaScript code outside of a web browser. Make sure you have Node.js installed on your system. You can download and install Node.js from the official Node.js website: Node.js Download

By ensuring that MongoDB, MongoDB Compass, and Node.js are installed and properly configured on your system, you will be ready to start working on the project and interact with MongoDB databases using Node.js.


## Running the Application


```bash
# Install all Node Dependencies
npm i
```

```bash
# To add data in mongodb
npm run seed
```
```bash
# To run the application
npm start
```

Now if you didn't change any of the configurations mentioned above or the Port, the applications should be running on:
- application will run on : `http://localhost:3000`

  ## Using the Application

  via the seed.js file we have a few basic accounts setup for each role, Admin, Staff and Guest.
  Here are the credentails for each
```bash
Admin:
Username: alice@example.com
Password: Pass123!

Staff:
Username: carol@example.com
Password: StafF@456

Guest:
Username: frank@example.com
Password: UserF1*234
  ```

### Admin Role: 

* Allowed to CRUD all accounts, rooms, gallery photos
* Can change roles of all accounts
* Delete feedbacks
* Change room status from clean to dirty vice-versa etc.
* Admin dashboard for various statistics about the hotel rooms.

### Staff Role: 

* Change room status from clean to dirty vice-versa etc.

### Guest Role: 

* Guests can book rooms from start to end dates and also make simulated payments with complete validation in all fields
* You can add feedback as well about your experience in our hotel rooms
* view all rooms, gallery, images, feedbacks etc.

### Unloggedin user Role: 

* view all rooms, gallery, images, feedbacks etc.
* without logging in your abilites are limited, you can either use one of the provided credentials on top or register your own account, if you want any of the other roles, you will have to change it from the database or use an admin account to change the role of your account.

