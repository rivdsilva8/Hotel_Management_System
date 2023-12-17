document.addEventListener("DOMContentLoaded", function(){
    const loginForm = document.querySelector('form[action="/login"]');
    const registerForm = document.querySelector('form[action="/register"]');
    const resetForm = document.querySelector('form[action="/reset"]');
    const errorDiv = document.getElementById('error-container');
    const userEditForm = document.querySelector('#userEditForm');
    const adminAccountSearch = document.querySelector('#adminAccountSearch');
    const adminCreateForm = document.querySelector('#adminCreateForm');
    const createFeedbackForm = document.querySelector('form[action="/guest/feedback/createFeedback"]');
    const updateFeedbackForm = document.querySelector('form[action="/guest/feedback/updateFeedback"]');
    //Booking ClientSide
    const BookingForm = document.querySelector('form[action="/guest/booking/book"]');


    if(loginForm){
        loginForm.addEventListener('submit', function(event){
            let errorMessage =[];
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            if(!validateEmail(email)){
                errorMessage.push('Please enter a valid email address.');
            }
            const [prefix,domain]=email.split("@");
            if(!/^([a-zA-Z0-9]+([_\.-]?[a-zA-Z0-9]+)*)$/.test(prefix) || !/^([a-zA-Z0-9-]+)+(\.[a-zA-Z]{2,})+$/.test(domain)) 
            {
            errorMessage.push(' Email Address given does not  have a valid prefix or domain'); 
            }
            if(!password){
                errorMessage.push('Please enter your password');               
            }
            if(password){
                if(typeof(password) !== 'string' || password.includes(' ')|| password.length<8){
                    errorMessage.push('Password must be a valid string with no spaces and should be at least of 8 characters long.');
                }
                if(!/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)){
                    errorMessage.push('Password must contain at least one uppercase character, one number and one special character.');
                }
            }
            if(errorMessage.length>0){
                event.preventDefault();
                errorDiv.innerHTML = errorMessage.join('<br>');
                errorDiv.style.display ='block';
            }
        });
    }

        if(registerForm){
            registerForm.addEventListener('submit',function(event){
                let errorMessage =[];
                const firstName = document.getElementById('firstNameInput').value.trim();
                const lastName = document.getElementById('lastNameInput').value.trim();
                const email = document.getElementById('email').value.trim();
                const phone = document.getElementById('phone').value;
                const password = document.getElementById('password').value;
                const confirmPassword = document.getElementById('cpassword').value;
    
                if(!firstName || firstName.length <2 || firstName.length>25 || !/^[A-Za-z]+$/.test(firstName)){
                    errorMessage.push('First Name must be between 2 to 25 characters and must contain only letters.');
                }
                if(!lastName || lastName.length <2 || lastName.length>25 || !/^[A-Za-z]+$/.test(lastName)){
                    errorMessage.push('Last Name must be between 2 to 25 characters and must contain only letters.');
                }
                if(!validateEmail(email)){
                    errorMessage.push('Please enter a valid email address.');
                }
                const [prefix,domain]=email.split("@");
                if(!/^([a-zA-Z0-9]+([_\.-]?[a-zA-Z0-9]+)*)$/.test(prefix) || !/^([a-zA-Z0-9-]+)+(\.[a-zA-Z]{2,})+$/.test(domain)) 
                {
                errorMessage.push(' Email Address given does not  have a valid prefix or domain'); 
                }
                const phoneValidationResult = validatePhone(phone);
                if(phoneValidationResult !== true){
                    errorMessage.push(phoneValidationResult);
                }
                if(!password){
                    errorMessage.push('Please enter your password');               
                }
                if(!confirmPassword){
                    errorMessage.push('Please enter your Confirm password');               
                }
                if(password && confirmPassword){
                    if(typeof(password) !== 'string' || password.includes(' ')|| password.length<8){
                        errorMessage.push('Password must be a valid string with no spaces and should be at least of 8 characters long.');
                    }
                    if(!/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)){
                        errorMessage.push('Password must contain at least one uppercase character, one number and one special character.');
                    }
                    if(typeof(confirmPassword) !== 'string' || confirmPassword.includes(' ')|| confirmPassword.length<8){
                        errorMessage.push('ConfirmPassword must be a valid string with no spaces and should be at least of 8 characters long.');
                    }
                    if(!/[A-Z]/.test(confirmPassword) || !/[0-9]/.test(confirmPassword) || !/[^A-Za-z0-9]/.test(confirmPassword)){
                        errorMessage.push('ConfirmPassword must be contain at least one uppercase character, one number and one special character.');
                    }
                    if(password !== confirmPassword){
                        errorMessage.push(`Password and Confirm password don't match.`)
                    }
                }
                if(errorMessage.length>0){
                    event.preventDefault();
                    errorDiv.innerHTML = errorMessage.join('<br>');
                    errorDiv.style.display ='block';
                }
            });
    
        }

    if(adminCreateForm){
        adminCreateForm.addEventListener('submit',function(event){
            let errorMessage =[];

            const firstName = document.getElementById('firstNameInput').value.trim();
            const lastName = document.getElementById('lastNameInput').value.trim();
            const userEmail = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('cpassword').value;
            if(!firstName || firstName.length <2 || firstName.length>25 || !/^[A-Za-z]+$/.test(firstName)){
                errorMessage.push('First Name must be between 2 to 25 characters and must contain only letters.');
            }
            if(!lastName || lastName.length <2 || lastName.length>25 || !/^[A-Za-z]+$/.test(lastName)){
                errorMessage.push('First Name must be between 2 to 25 characters and must contain only letters.');
            }
            if(!validateEmail(userEmail)){
                errorMessage.push('Please enter a valid email address.');
            }
            const [prefix,domain]=userEmail.split("@");
            if(!/^([a-zA-Z0-9]+([_\.-]?[a-zA-Z0-9]+)*)$/.test(prefix) || !/^([a-zA-Z0-9-]+)+(\.[a-zA-Z]{2,})+$/.test(domain)) 
            {
            errorMessage.push(' Email Address given does not  have a valid prefix or domain'); 
            }
            const phoneValidationResult = validatePhone(phone);
            if(phoneValidationResult !== true){
                errorMessage.push(phoneValidationResult);
            }
            if(!password){
                errorMessage.push('Please enter your password');               
            }
            if(!confirmPassword){
                errorMessage.push('Please enter your Confirm password');               
            }
            if(password && confirmPassword){
                if(password !== confirmPassword){
                    errorMessage.push(`Password and Confirm password don't match.`)
                }
                if(typeof(password) !== 'string' || password.includes(' ')|| password.length<8){
                    errorMessage.push('Password must be a valid string with no spaces and should be at least of 8 characters long.');
                }
                if(!/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)){
                    errorMessage.push('Password must contain at least one uppercase character, one number and one special character.');
                }
                if(typeof(confirmPassword) !== 'string' || confirmPassword.includes(' ')|| confirmPassword.length<8){
                    errorMessage.push('ConfirmPassword must be a valid string with no spaces and should be at least of 8 characters long.');
                }
                if(!/[A-Z]/.test(confirmPassword) || !/[0-9]/.test(confirmPassword) || !/[^A-Za-z0-9]/.test(confirmPassword)){
                    errorMessage.push('ConfirmPassword must be contain at least one uppercase character, one number and one special character.');
                }
            }
            if(errorMessage.length>0){
                event.preventDefault();
                errorDiv.innerHTML = errorMessage.join('<br>');
                errorDiv.style.display ='block';
            }


        });
    }

    document.body.addEventListener('submit',function(event){
        if(event.target.classList.contains('admin-edit-form')){
            let errorMessage =[];
            const targetForm = event.target;
            const accountId = targetForm.dataset.accountId;
            const firstName = document.getElementById('firstNameInput-' + accountId).value.trim();
            const lastName = document.getElementById('lastNameInput-' + accountId).value.trim();
            const userEmail = document.getElementById('email-' + accountId).value.trim();
            const phone = document.getElementById('phone-' + accountId).value;
            if(!firstName || firstName.length <2 || firstName.length>25 || !/^[A-Za-z]+$/.test(firstName)){
                errorMessage.push('First Name must be between 2 to 25 characters and must contain only letters.');
            }
            if(!lastName || lastName.length <2 || lastName.length>25 || !/^[A-Za-z]+$/.test(lastName)){
                errorMessage.push('First Name must be between 2 to 25 characters and must contain only letters.');
            }
            if(!validateEmail(userEmail)){
                errorMessage.push('Please enter a valid email address.');
            }
            const [prefix,domain]=userEmail.split("@");
            if(!/^([a-zA-Z0-9]+([_\.-]?[a-zA-Z0-9]+)*)$/.test(prefix) || !/^([a-zA-Z0-9-]+)+(\.[a-zA-Z]{2,})+$/.test(domain)) 
            {
            errorMessage.push(' Email Address given does not  have a valid prefix or domain'); 
            }
            const phoneValidationResult = validatePhone(phone);
            if(phoneValidationResult !== true){
                errorMessage.push(phoneValidationResult);
            }
            if(errorMessage.length>0){
                event.preventDefault();
                errorDiv.innerHTML = errorMessage.join('<br>');
                errorDiv.style.display ='block';
            }
        }
    });


    if(adminAccountSearch){
        adminAccountSearch.addEventListener('submit',function(event){
            let errorMessage =[];
            const firstName = document.getElementById('searchFName').value.trim();
            const lastName = document.getElementById('searchLName').value.trim();
            if(!firstName || firstName.length <2 || firstName.length>25 || !/^[A-Za-z]+$/.test(firstName)){
                errorMessage.push('First Name must be between 2 to 25 characters and must contain only letters.');
            }
            if(!lastName || lastName.length <2 || lastName.length>25 || !/^[A-Za-z]+$/.test(lastName)){
                errorMessage.push('Last Name must be between 2 to 25 characters and must contain only letters.');
            }

            if(errorMessage.length>0){
                event.preventDefault();
                errorDiv.innerHTML = errorMessage.join('<br>');
                errorDiv.style.display ='block';
            }
        })
    }

    if(userEditForm){
        userEditForm.addEventListener('submit', function(event){
            let errorMessage =[];
            const firstName = document.getElementById('firstNameInput').value.trim();
            const lastName = document.getElementById('lastNameInput').value.trim();
            const userEmail = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value;

            if(!firstName || firstName.length <2 || firstName.length>25 || !/^[A-Za-z]+$/.test(firstName)){
                errorMessage.push('First Name must be between 2 to 25 characters and must contain only letters.');
            }
            if(!lastName || lastName.length <2 || lastName.length>25 || !/^[A-Za-z]+$/.test(lastName)){
                errorMessage.push('Last Name must be between 2 to 25 characters and must contain only letters.');
            }

            if(!validateEmail(userEmail)){
                errorMessage.push('Please enter a valid email address.');
            }
            const [prefix,domain]=userEmail.split("@");
            if(!/^([a-zA-Z0-9]+([_\.-]?[a-zA-Z0-9]+)*)$/.test(prefix) || !/^([a-zA-Z0-9-]+)+(\.[a-zA-Z]{2,})+$/.test(domain)) 
            {
            errorMessage.push(' Email Address given does not  have a valid prefix or domain'); 
            }
            const phoneValidationResult = validatePhone(phone);
            if(phoneValidationResult !== true){
                errorMessage.push(phoneValidationResult);
            }
            if(errorMessage.length>0){
                event.preventDefault();
                errorDiv.innerHTML = errorMessage.join('<br>');
                errorDiv.style.display ='block';
            }
        });
    }

    if(resetForm){
        resetForm.addEventListener('submit', function(event){
            let errorMessage =[];
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            if(!validateEmail(email)){
                errorMessage.push('Please enter a valid email address.');
            }
            const [prefix,domain]=email.split("@");
            if(!/^([a-zA-Z0-9]+([_\.-]?[a-zA-Z0-9]+)*)$/.test(prefix) || !/^([a-zA-Z0-9-]+)+(\.[a-zA-Z]{2,})+$/.test(domain)) 
            {
            errorMessage.push(' Email Address given does not  have a valid prefix or domain'); 
            }
            if(!password){
                errorMessage.push('Please enter your password');               
            }
            if(!confirmPassword){
                errorMessage.push('Please enter your Confirm password');               
            }
            if(password && confirmPassword){
                if(password !== confirmPassword){
                    errorMessage.push(`Password and Confirm password don't match.`)
                }
                if(typeof(password) !== 'string' || password.includes(' ')|| password.length<8){
                    errorMessage.push('Password must be a valid string with no spaces and should be at least of 8 characters long.');
                }
                if(!/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)){
                    errorMessage.push('Password must contain at least one uppercase character, one number and one special character.');
                }
                if(typeof(confirmPassword) !== 'string' || confirmPassword.includes(' ')|| confirmPassword.length<8){
                    errorMessage.push('ConfirmPassword must be a valid string with no spaces and should be at least of 8 characters long.');
                }
                if(!/[A-Z]/.test(confirmPassword) || !/[0-9]/.test(confirmPassword) || !/[^A-Za-z0-9]/.test(confirmPassword)){
                    errorMessage.push('ConfirmPassword must be contain at least one uppercase character, one number and one special character.');
                }
            }
            if(errorMessage.length>0){
                event.preventDefault();
                errorDiv.innerHTML = errorMessage.join('<br>');
                errorDiv.style.display ='block';
            }
        });
    };

    if (createFeedbackForm) {
        createFeedbackForm.addEventListener("submit", function (event) {
          console.log("in createFeedbackForm CSV:");
          const roomType = document.getElementById("roomType").value;
          const rating = document.getElementById("rating").value;
          const comment = document.getElementById("comment").value;
          console.log("roomType:", roomType);
          console.log("rating:", rating);
          console.log("comment:", comment);
    
          if (roomType == null) throw "Please select a Room Type";
          if (comment.length > 500)
            throw "ERROR : comment cannot be more than 500 characters ";
    
          stringValidation(roomType);
          validRating(rating);
          stringValidation(comment);
        });
      }

  if (updateFeedbackForm) {
    updateFeedbackForm.addEventListener("submit", function (event) {
      console.log("in updateFeedbackForm CSV:");
      const roomType = document.getElementById("roomType").value;
      const rating = document.getElementById("rating").value;
      const comment = document.getElementById("comment").value;
      console.log("roomType:", roomType);
      console.log("rating:", rating);
      console.log("comment:", comment);

      if (roomType == null) throw "Please select a Room Type";
      if (comment.length > 500)
        throw "ERROR : comment cannot be more than 500 characters ";

      stringValidation(roomType);
      validRating(rating);
      stringValidation(comment);
    });
  }
  function numberValidation(num) {
    checkundefined(num);
    checknum(num);
    justSpaces(num);
  }

  function checknum(num) {
    if (typeof num !== "number" || num == Infinity || isNaN(num))
      throw "ERROR : input is not a number";
  }

  function checkundefined(input) {
    if (input === undefined)
      throw "ERROR : input cannot be undefined or not enough inputs passed into function";
  }
  function justSpaces(string) {
    if (/^\s*$/.test(string)) {
      throw "ERROR : String cannot be only spaces";}
    }

  function validRating(rating) {
    rating = parseInt(rating);
    numberValidation(rating);
    if (rating > 10) {
      throw "ERROR :  " + rating + " cannot be more than 10";
    }
    if (rating < 0) {
      throw "ERROR :  " + rating + " cannot be less than 0";
  }};

  function stringValidation(string) {
    checkundefined(string);
    checkstring(string);
    emptyStringCheck(string);
    justSpaces(string);
  }


  function checkundefined(input) {
    if (input === undefined)
      throw "ERROR : input cannot be undefined or not enough inputs passed into function";
  }

  function emptyStringCheck(string) {
    if (string.length == 0) throw "ERROR : string cannot be empty";
  }

  function checkstring(string) {
    if (typeof string != "string") throw "ERROR : input is not a string";
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  function validatePhone(phone) {
    if (typeof phone !== "string") {
      return `Phone Number needs to be a string`;
    } else if (phone.trim().length === 0) {
      return `Phone Number cannot be just empty spaces`;
    }
    const parts = phone.split("-");
    if (parts.length !== 3) {
      return `Please provide a valid phone Number`;
    } else if (
      parts[0].length !== 3 ||
      parts[1].length !== 3 ||
      parts[2].length !== 4
    ) {
      return `Please provide phone number in the format 123-456-7890`;
    }

    for (const part of parts) {
      if (!/^[0-9]+$/.test(part)) {
        return `It is phone number, please enter numbers in the format 123-456-7890`;
      }
    }
    return true;
  }


  //Booking Client Side:
  if(BookingForm){
    BookingForm.addEventListener('submit', function(event){
        let errorMessage =[];
        const email = document.getElementById('EmailIdInput').value.trim();
        const firstName = document.getElementById('FirstNameInput').value.trim();
        const lastName = document.getElementById('LastNameInput').value.trim();
        const phone = document.getElementById('ContactNumberInput').value.trim();
        const CheckinDate = document.getElementById('CheckinDateInput').value.trim();
        const CheckoutDate = document.getElementById('CheckoutDateInput').value.trim();


        if(!firstName || firstName.length <2 || firstName.length>25 || !/^[A-Za-z]+$/.test(firstName)){
            errorMessage.push('First Name must be between 2 to 25 characters and must contain only letters.');
        }
        if(!lastName || lastName.length <2 || lastName.length>25 || !/^[A-Za-z]+$/.test(lastName)){
            errorMessage.push('Last Name must be between 2 to 25 characters and must contain only letters.');
        }
        if(!validateEmail(email)){
            errorMessage.push('Please enter a valid email address.');
        }

        const [prefix,domain]=email.split("@");
        if(!/^([a-zA-Z0-9]+([_\.-]?[a-zA-Z0-9]+)*)$/.test(prefix) || !/^([a-zA-Z0-9-]+)+(\.[a-zA-Z]{2,})+$/.test(domain)) 
        {
        errorMessage.push(' Email Address given does not  have a valid prefix or domain'); 
        }

        const phoneValidationResult = validatePhone(phone);
        if(phoneValidationResult !== true){
            errorMessage.push(phoneValidationResult);
        }

        //Date Validation MM/DD/YYYY
        let DateArray = CheckinDate.split("/");
        let Month_31 = [1,3,5,7,8,10,12];
        let Month_30 = [4,6,9,11];
        let Feb_Month = [2];
        let month_Valid = parseInt(DateArray[0]);
        let Day_Valid = parseInt(DateArray[1]);
        let Year_Valid = parseInt(DateArray[2]);
        let Month_Name = {
            1: "Jan",
            2: "Feb",
            3: "Mar",
            4: "Apr",
            5: "May",
            6: "Jun",
            7: "Jul",
            8: "Aug",
            9: "Sept",
            10: "Oct",
            11: "Nov",
            12: "Dec"
        };
        if(month_Valid > 12){
            errorMessage.push(`${eventDate} is not valid since there are only 12 months in a year`);
        }
        if(Month_31.includes(month_Valid)){
            if(Day_Valid > 31){
            errorMessage.push(`${eventDate} is not valid since days in ${Month_Name[month_Valid]} is only 31 days`);
            }
        }else if(Month_30.includes(month_Valid)){
            if(Day_Valid > 30){
            errorMessage.push(`${eventDate} is not valid since there are not 31 days in ${Month_Name[month_Valid]}`);
            }
        }else if(Feb_Month.includes(month_Valid)){
            if ((Day_Valid > 29 && (Year_Valid % 4 === 0 && (Year_Valid % 100 !== 0 || Year_Valid % 400 === 0))) || (Day_Valid > 28)) {
            errorMessage.push(`${eventDate} is not valid since February has ${
                Year_Valid % 4 === 0 && (Year_Valid % 100 !== 0 || Year_Valid % 400 === 0) ? "29" : "28"
            } days in ${Month_Name[month_Valid]}`);
            }
        }
        if(Year_Valid < 1900 && Year_Valid > 9999){
            errorMessage.push(`${eventDate} is not valid since the year is not valid`);
        }


        // Date should be greater then current date
        let New_DateArray = CheckinDate.split("/");
        let Next_month_Valid = parseInt(New_DateArray[0]);
        if (Next_month_Valid >= 11) {
            Next_month_Valid -= 1; // decrement November and December
        }
        let Next_Day_Valid = parseInt(New_DateArray[1]);
        let Next_Year_Valid = parseInt(New_DateArray[2]);
        let Input_Date = new Date(Next_Year_Valid, Next_month_Valid, Next_Day_Valid);
        let CurrentDate = new Date();
        if(Input_Date < CurrentDate){
            errorMessage.push('only future events can be created');
        }

        if(errorMessage.length>0){
            event.preventDefault();
            errorDiv.innerHTML = errorMessage.join('<br>');
            errorDiv.style.display ='block';
        }
    });
}





});
/* if (roomType == null) throw "Please select a Room Type";
      if (comment.length > 500)
        throw "ERROR : comment cannot be more than 500 characters ";

      stringValidation(roomType);
      validRating(rating);
      stringValidation(comment);*/


