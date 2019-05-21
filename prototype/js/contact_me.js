  function buttonAction() {
    window.location.replace("history_new.html");
  }
  function bindEvents() {
 var btn =  document.getElementById("yadebil") 
 btn.onclick = buttonAction
}
bindEvents();