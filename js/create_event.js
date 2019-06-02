// Empty JS for your own code to be here
function cal(){
  document.getElementById("pick_date").style.color = "#393A3B";
}

$(document).ready(function() {
  readFromDatabase();
})

// TASKS
var newRow = '<tr class = "helpRow"><td class = "col0"><button type = "button"; class = "remove" ; > Remove </button></td><td class = "col1"><input type="text" class = "helpTitle" placeholder= "Task title" style="width:230px;height:45px;";></input> <center><input type="number" class="pplNumber" style="height:45px; width: 230px" min="1" max = "30" placeholder = "Number of helpers"></input></center></td><td class = "col2"><textarea class="form-control descriptionOfHelp" placeholder="Describe responsibilities" ></textarea></td></td></tr>'

document.getElementById("addNew").onclick=function() {
  $("#helpTable").append(newRow)
}

$('#helpTable').on('click','.remove',function(){
    $(this).closest('tr')[0].remove()
  })

function parseForDB(s) {
    ans = ""
    for (var i = 0; i < s.length; ++i) {
      if (s[i] == ' ')
        ans += '_'
      else
        ans += s[i].toLowerCase();
    }
    return ans;
  }

$(".lastBtn").on('click', '#submitBtn', function () {
    var event;
    var title = $('#eventTitle').val();
    if (title == '') {
      alert('Please, enter event title.')
      return;
    }
    var date = $('#pick_date').val();
    if (date == '') {
      alert('Please, enter date of the event.');
      return;
    }
    var expecDur = $('#durationInput').val();
    if (expecDur == '') {
      alert('Please, enter approximate duration.');
      return;
    }
    var location = $('#locationInput').val();
    if (location == '') {
      alert('Please, enter location.');
      return;
    }
    var description = $('#description').val();
    if (description == '') {
      alert('Please, enter event description.');
      return;
    }
    var totalHelpNumber = $('#helpTable tr').length;
    var totalHelp = [];
    var curHelp = [];
    for (var i = 0; i < totalHelpNumber; ++i) {
      var curHelpTitle = $("#helpTable tr:eq(" + i.toString() + ") .helpTitle").val(); 
      if (curHelpTitle == '')
        continue;
      var curHelpNumber = $("#helpTable tr:eq(" + i.toString() + ") .pplNumber").val(); 
      var curHelpDescription = $("#helpTable tr:eq(" + i.toString() + ") .descriptionOfHelp").val(); 
      curHelp = [parseForDB(curHelpTitle), curHelpNumber, Math.min(curHelpNumber, 2), 0, curHelpDescription];
      totalHelp.push(curHelp);
    }
    var type = $('#categorySelection').val();
    if (type == "default") {
      alert('Please, choose category of the event.')
      return;
    }
    writeToDatabase({'title': parseForDB(title), 'description': description, 
      'date': date, "type": type, "help": totalHelp, 'index': events.length, 'userCreate': 1})
    // writeToDatabase({'title': "Blah_Blah_Blah", 'description': "Blah blah blah blah blah", 
    //  'date': '2019.05.25', "type": "cookingEvent", "help": [['cooking', 4, 3, 0], ['reservation_of_speaker', 1, 0, 0], ['reservation_of_room', 1, 0, 0]], 'index': 0})
        

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
