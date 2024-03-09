var MenuItems = document.getElementById("Menu");
MenuItems.style.maxHeight =  "0px";

function menutoggle(){
    if(MenuItems.style.maxHeight ==  "0px"){
        MenuItems.style.maxHeight =  "200px";
    }else{
        MenuItems.style.maxHeight =  "0px";
    }
}

  document.addEventListener('DOMContentLoaded', function() {
    var header = document.getElementById('typing-header');
    header.textContent = ''; 
    var text = "Welcome..."; 
    var speed = 25; 

    function typeWriter(text, i, cb) {
      if (i < text.length) {
        header.textContent += text.charAt(i);
        i++;
        setTimeout(function() {
          typeWriter(text, i, cb);
        }, speed);
      } else {
        cb(); 
      }
    }

    typeWriter(text, 0, function() {
      header.style.borderRight = 'none'; 
    });
  });

