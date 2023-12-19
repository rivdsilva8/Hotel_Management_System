(function ($) {
  let mySearchForm = $('#BookingGetData'),
    firstNameInput = $('#DisplayFirstName'),
    emailInput = $('#DisplayEmailId'),
    searchResults = $('#search-results'),
    errorDiv = $('#error'),
    empty = $('#empty');

  mySearchForm.submit(async (event) => {
    event.preventDefault();
    $('#noResults').hide();
    errorDiv.hide();
    empty.hide();
    searchResults.hide();

    let firstName = firstNameInput.val().trim();
    let email = emailInput.val().trim();

    if(!firstName && !email){
      errorDiv.show().html("Please enter for search criteria");
        return;
    }

    if (firstName) {
      if (firstName.trim().length === 0) {
        errorDiv.show().html("Error: First Name Can not contain empty spaces");
        return;
      }
    }

    if (email) {
      if (email.trim().length === 0) {    
        errorDiv.show().html("Error: Email Can not contain empty spaces");
        return;
      }
    }

    if (firstName && email) {

      let requestConfig = {
        method: 'POST',
        url: '/admin/booking/search.html',
        contentType: 'application/json',
        data: JSON.stringify({
          firstName: firstName,
          email: email
        })
      };

      $.ajax(requestConfig).then(function (responseMessage) {
        let newElement = $(responseMessage);
        searchResults.show().empty();
        if (newElement.children().length === 0) {
          $('#noResults').show().html("No results found. Please try again.");
        }else{
          searchResults.html(newElement);

        }
        
      });
    } else {
      empty.show();
      searchResults.hide();
    }
  });
})(window.jQuery);