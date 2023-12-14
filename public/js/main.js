/*import { response } from "express";*/

document.addEventListener("DOMContentLoaded", (event) => {
  var errorMessage = document.getElementById('error-container')?.textContent.trim();
  var successMessage = document.getElementById('success-message')?.textContent.trim();

  if(errorMessage && errorMessage !=="{{error}}"){
    alert("Error:" + decodeURIComponent(errorMessage));
  }else if(successMessage && successMessage !== "{{successMessage}}"){
    alert("Success:" + decodeURIComponent(successMessage));
  }
  const deleteButtons = document.querySelectorAll('.delete-button');
  deleteButtons.forEach(button =>{
    button.addEventListener('click',function(event){
      const confirmed = confirm("Are you sure you want to delete this account?");
      if(!confirmed){
        event.preventDefault();
      }
    });
  });
  const userEditForm = document.getElementById('userEditForm');
  if(userEditForm){
    userEditForm.addEventListener('submit',function(even){
      const phoneInput = document.getElementById('phone');
      formatPhoneNumberOnSubmit(phoneInput);
    });
  }
  fetchCountryCodes();
  formatPhoneNumber();
});

async function deleteFlaggedFeedback() {
  const checkboxes = document.querySelectorAll(".deleteFeedbackIds:checked");
  const feedbackIds = Array.from(checkboxes).map((checkbox) => checkbox.value);

  console.log("In delete flagged function");
  const response = await fetch("/admin/feedback", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ deleteFeedbackIds: feedbackIds }),
  });

  if (response.ok) {
    window.location.reload();
  } else {
    console.error("Failed to delete feedback:", response.statusText);
  }

  console.error("Error during fetch:", error);
}

function updateRatingValue(value) {
  document.getElementById("ratingOutput").textContent = value;
}

function fetchCountryCodes(){
  fetch('/public/js/countryCodes.json')
      .then(response =>{
        if(!response.ok){
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data =>{
        const selectElement = document.getElementById('phonePrefix');
        data.codes.forEach(item =>{
          const option = document.createElement('option');
          option.value = item.code;
          option.textContent =`${item.code} (${item.name})`;
          selectElement.appendChild(option);
        });
      })
      .catch(error =>{
        console.error('Problem with fetch country code operation:',error);
      });
}

function formatPhoneNumber(){
  const phoneInput = document.getElementById('phone');
  phoneInput.addEventListener('input',function(e){
    var x = e.target.value.replace(/\D/g, '').match(/(\d{3})(\d{0,3})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] :`${x[1]}-${x[2]}${x[3] ? `-${x[3]}` : ''}`;
  });
}

function formatPhoneNumberOnSubmit(phoneInput){
  var x = phoneInput.value.replace(/\D/g,'').match(/(\d{3})(\d{0,3})(\d{0,4})/);
  phoneInput.value= !x[2] ? x[1] :`${x[1]}-${x[2]}${x[3] ? `-${x[3]}` : ''}`;
}