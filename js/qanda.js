
function questionFunction(a) {
  $("#" + a).attr("aria-expanded", "true");
  $("#" + a).addClass('show');
  $("#button" + a).removeClass('collapsed');
    $("#button" + a).attr("aria-expanded", "true");
}

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

$("#openNotif").hide()

$('#bell').on('click',function(){
  var x = ($("#openNotif").is(":hidden"));
  if (x){
    // alert("asdasfd erba is nevtemw'ik!!!");
    $("#openNotif").show();
  } else {
    $("#openNotif").hide()
  }
})


document.getElementById('newQ').onclick = function(){
    document.getElementById('askQ').style.display = "block";
    var p = $("#askQ");
    var offset = p.offset();
    window.scrollBy(offset.left, offset.top);
}

document.getElementById('cancel').onclick = function(){
    document.getElementById('askQ').style.display = "none";
}

console.log($('#alert'));

document.getElementById('submit').onclick = function(){
  // var selectedCategory = $("select.category").children("option:selected").val();
  // console.log(selectedCategory);
  if (($('#description').val()!="")) {
    alert("Your question has been sent to users! You will be notified once the question is answered.")
    $('#description').val("");
    $("#category").val('default');

  } else {
    $("#alert")[0].style.display = "block";
  }
}

document.getElementById('alert-close').onclick = function(){
    $("#alert")[0].style.display = "none";
}

// });
