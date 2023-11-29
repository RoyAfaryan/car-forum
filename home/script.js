// script.js

function toggleDropdown() {
   var dropdown = document.getElementById("dropdown");
   dropdown.classList.toggle("show-dropdown");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
   if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
         var openDropdown = dropdowns[i];
         if (openDropdown.classList.contains('show-dropdown')) {
            openDropdown.classList.remove('show-dropdown');
         }
      }
   }
};
