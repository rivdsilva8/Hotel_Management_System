document.addEventListener("DOMContentLoaded", (event) => {
  const userDropdownButton = document.getElementById("UserDropdownButton");
  const userDropdown = document.getElementById("userDropdown");
  if (userDropdownButton) {
    userDropdownButton.onclick = function () {
      userDropdown.classList.toggle("show");
    };
  }

  window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };
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
