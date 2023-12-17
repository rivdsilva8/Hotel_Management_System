(function ($) {
    let mySearchForm = $('#BookingGetData'),
      firstNameInput = $('#DisplayFirstName'),
      emailInput = $('#DisplayEmailId'),
      searchResults = $('#search-results'),
      error = $('#error'),
      empty = $('#empty');
  
    mySearchForm.submit(async (event) => {
      event.preventDefault();
      $('#noResults').hide();
      error.hide();
  
      let firstName = firstNameInput.val();
      let email = emailInput.val();
  
      if (firstName) {
        if (firstName.trim().length === 0) {
          searchResults.hide();
          empty.hide();
          error.show();
          error.html("Error: First Name Can not contain empty spaces");
          return;
        }
      }

      if (email) {
        if (email.trim().length === 0) {
          searchResults.hide();
          empty.hide();
          error.show();
          error.html("Error: Email Can not contain empty spaces");
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
          if (newElement.children().length === 0) {
            empty.hide();
            searchResults.show();
            searchResults.empty();
            $('#noResults').show();
            $('#noResults').html("No results found. Please try again.");
          }

          empty.hide();
          searchResults.show();
          searchResults.empty();
          searchResults.html(newElement);
        });
      } else {
        empty.show();
        searchResults.hide();
      }
    });
  })(window.jQuery);