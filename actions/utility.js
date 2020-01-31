function showPage(loaded) {
    if (loaded === true) {
      document.getElementById("loader").style.display = "none";
      document.getElementById("main").style.display = "block";
    } else if (loaded === false) {
      document.getElementById("loader").style.display = "block";
      document.getElementById("main").style.display = "none";
    }
  }
  
  function buttonState(page) {
    if (page === 1) {
      document.getElementById("previous").style.display = "none";
    } else {
      document.getElementById("previous").style.display = "block";
    }
  }
  
  function goBack() {
    window.history.back();
  }