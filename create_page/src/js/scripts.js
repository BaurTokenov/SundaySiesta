// Empty JS for your own code to be here
function cal(){
  document.getElementById("pick_date").style.color = "#393A3B";
}

var newRow = '<tr class = "helpRow"> <td class = "col1"><button type = "button"; class = "delete"; > Remove </button></td> <td class = "col2"><input type="text" placeholder= "e.g. Reservation" style="width:230px;height:37px;"></input><input type="number" id="pplNumber" style="height:28px" min="1" placeholder = "1"></input><img id = "imagePerson" src="file:///Users/assem/Desktop/GitHub/SundaySiesta/create_page/src/6b7e95cf9c.svg" style="height:30px;"/></td><td class = "col3"><textarea class="form-control" id="descriptionOfTask" placeholder="e.g. Responsibilities are to reserve room and apparature..." ></textarea></td></td> </tr>'

document.getElementById("addNew").onclick=function() {
  $("#helpTable").append(newRow)
}

$('#helpTable').on('click','.delete',function(){
    $(this).closest('tr')[0].remove()
  })
