// Empty JS for your own code to be here
$( document ).ready(function()	{
	checkboxIDs = ['allCheckbox', 'cookingCheckbox', 'dancingCheckbox', 'traditionalGamesCheckbox', 'otherCheckbox']
  typeOfEvents = ['cookingEvent', 'dancingEvent',  'tradGamesEvent', 'otherEvent'];
  checkbox2EventType = {}
	for (i = 1; i < checkboxIDs.length; i++) {
		checkbox2EventType[checkboxIDs[i]] = typeOfEvents[i-1];
	}

  function updateEventTable() {
		if ($("#allCheckbox").prop('checked') == true) {
			for (var key in checkbox2EventType) {
				var value = checkbox2EventType[key]
				$('.' + value).show();
			}
			return;
		}
		for (var key in checkbox2EventType) {
			var value = checkbox2EventType[key]
			value = '.' + value
			if ($('#' + key).prop('checked')) {
				$(value).show();
			}
			else {
				$(value).hide();
			}
		}
	}
  $(".eventFilter input[type=checkbox]").change(function (){
		if ($(this).attr('id') == 'allCheckbox' && this.checked) {
			for (i = 1; i < checkboxIDs.length; i++) {
				$('#' + checkboxIDs[i]).prop('checked', false);
			}
			updateEventTable();
		} else {
			$("#allCheckbox").prop('checked', false);
			updateEventTable();
		}
	});
})

$('#myTable').on('click','.contBtn',function(){
		curPastEventText = parseForDB($(this).closest('tr').find('h4').text());
		window.location.href = ("createEx.html#" + curPastEventText);
		
  })
$('#notificationCanvas').on('click','.back',function(){
		window.location.replace("history.html");
  })
