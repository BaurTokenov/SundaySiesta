// Empty JS for your own code to be here
function cal(){
  document.getElementById("pick_date").style.color = "#393A3B";
}



// TASKS
var newRow = '<tr class = "helpRow"><td class = "col0"><button type = "button"; class = "remove" ; > Remove </button></td><td class = "col1"><input type="text" id = "title"placeholder= "Task title" style="width:230px;height:45px;";></input> <center><input type="number" id="pplNumber" style="height:45px; width: 230px" min="1" max = "30" placeholder = "Number of helpers"></input></center></td><td class = "col2"><textarea class="form-control" id="descriptionOfTask" placeholder="Describe responsibilities" ></textarea></td></td></tr>'




// REQUEST
var allnames= ["Bauka", "Tosha", "Assem", "Naziya", "Ayan", "Yerba", "Shyngys", "Nurs"]
var textBox = document.getElementById("name");
var helper = document.getElementById("reqBtn");

$('#reqTable').on('click','.undo',function(){
    $(this).closest('tr')[0].remove()
  })

$( function() {
  $( "input[type='text']").on("keypress",function(){//typing
    if (event.keyCode == 13) {
      $("#reqBtn").click()
    }
  })
  $( "#name" ).autocomplete({
    source: allnames,
    select: function(event,ui){
      if( event.keyCode == 13 ) {//keyboard
          $("#reqBtn").click()
        }
      else{
          var selectedObj = ui.item//mouse
          textBox.value = selectedObj.value
          $("#reqBtn").click()
        }
        $(this).val("");
          return false;
          event.preventDefault();
      },
    });//autoselect
});


///// NOTIFICATION

// $("#openNotif").hide();

$('#bell').on('click',function(){
  var x = ($("#openNotif").is(":hidden"));
  if (x){
    // alert("asdasfd erba is nevtemw'ik!!!");
    $("#openNotif").show();
  } else {
    $("#openNotif").hide()
  }
  })
