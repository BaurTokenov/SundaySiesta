function myFunction() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  var check = 0;
  input = document.getElementById('search-bar');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName('li');
    $("#noResults")[0].style.display = "none";
  if (filter == "") {
    ul.style.display = "none";

  } else {
    ul.style.display = "block";
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "block";
        check = 1;
      } else {
        li[i].style.display = "none";
      }
    }
    if ( check == 0 ) {
      $("#noResults")[0].style.display = "block";
    }
  }

}

function openQuestion(a) {
  // if (assem != -1) {
    closeQuestions();
    $('#heading' + a + ' button').attr("aria-expanded", "true");
    $('#heading' + a + ' button').removeClass('collapsed');
    $('#a' + a).addClass('show');
    $('#a' + a).attr("aria-expanded", "true");
    var target = $('#heading' + a);
    if( target. length ) {
      // event. preventDefault();
      $('html, body'). stop(). animate({
      scrollTop: target. offset(). top-95}, 1000);
  }
}

function closeQuestions() {
  for (var i = 1; i <= 9; i++) {
    $('#heading' + i + ' button').attr("aria-expanded", "false");
    $('#heading' + i + ' button').addClass('collapsed');
    $('#a' + i).removeClass('show');
    $('#a' + i).attr("aria-expanded", "false");
  }
}

$( document ).ready(function()	{
var text = window.location.hash.substring(1);

// $('#heading' + a + ' button').attr("aria-expanded", "true");
// $('#heading' + a + ' button').removeClass('collapsed');
// $('#a' + a).addClass('show');
// $('#a' + a).attr("aria-expanded", "true");


openQuestion(text);
})
