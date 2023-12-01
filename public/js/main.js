document.addEventListener('DOMContentLoaded',(event)=>{
    const userDropdownButton = document.getElementById("UserDropdownButton");
    const userDropdown = document.getElementById("userDropdown");
    if(userDropdownButton){
        userDropdownButton.onclick = function(){
            userDropdown.classList.toggle("show");
        }
    }

    window.onclick = function(event){
        if(!event.target.matches('.dropbtn')){
            var dropdowns = document.getElementsByClassName("dropdown-content");
            for(var i =0;i<dropdowns.length;i++){
                var openDropdown = dropdowns[i];
                if(openDropdown.classList.contains('show')){
                    openDropdown.classList.remove('show');
                }
            }
        }
    }
})