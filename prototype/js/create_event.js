// Empty JS for your own code to be here
function cal(){
  document.getElementById("pick_date").style.color = "#393A3B";
}



// TASKS
var newRow = '<tr class = "helpRow"><td class = "col0"><button type = "button"; class = "remove" ; > Remove </button></td><td class = "col1"><input type="text" id = "title"placeholder= "Task title" style="width:230px;height:45px;";></input> <center><input type="number" id="pplNumber" style="height:45px; width: 230px" min="1" max = "30" placeholder = "Number of helpers"></input></center></td><td class = "col2"><textarea class="form-control" id="descriptionOfTask" placeholder="Describe responsibilities" ></textarea></td></td></tr>'

document.getElementById("addNew").onclick=function() {
  $("#helpTable").append(newRow)
}

$('#helpTable').on('click','.remove',function(){
    $(this).closest('tr')[0].remove()
  })

$(".lastBtn").on('click', '#submitBtn', function () {
    alert("Your event successfully created!");
  window.location.replace("homepage.html");
  //   async function demo() {
  // console.log('Taking a break...');
  // await sleep(2000);
  
// } 

demo();
    
})

// REQUEST
var allnames= ["Bauka", "Tosha", "Assem", "Naziya", "Ayan", "Yerba", "Shyngys", "Nurs"]
var textBox = document.getElementById("name");
var helper = document.getElementById("reqBtn");

$('#reqTable').on('click','.undo',function(){
    $(this).closest('tr')[0].remove()
  })
helper.onclick = function() {
    myRow = '<tr> <td>'+textBox.value +'<button type = "button"; class = "undo" ; > x </button></td></tr>'
    if (textBox.value.length > 0){
      $("#reqTable tr").eq(0).after(myRow);
    }
    textBox.value = ""
}
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
