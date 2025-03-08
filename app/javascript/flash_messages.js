document.addEventListener("turbo:load", function() {
  
    setTimeout(function() {
      let notice = document.getElementById("notice");
      let alert = document.getElementById("alert");
  
      if (notice) {
        notice.style.transition = "opacity 0.5s";
        notice.style.opacity = "0";
        setTimeout(() => notice.remove(), 500);
      }
  
      if (alert) {
        alert.style.transition = "opacity 0.5s";
        alert.style.opacity = "0";
        setTimeout(() => alert.remove(), 500);
      }
    }, 5000); 
  });

  
