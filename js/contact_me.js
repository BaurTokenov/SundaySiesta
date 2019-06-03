function buttonAction() {
	window.location.replace("history_new.html");
}

function parse_string(s) {
		ans = ""
		for (var i = 0; i < s.length; i++) {
			if (s[i] == '_') {
				ans += ' '
			}
			else {
				if (i == 0)
					ans += s[i].toUpperCase();
				else
					ans += s[i];
			}
		}
		return ans;

	}

var stupid2normal = {'cookingEvent': 'Cooking', 'dancingEvent': 'Dancing', 'otherEvent': 'Others', 'tradGamesEvent': "Traditional Games"};


function bindEvents() {
	var btn =  document.getElementById("backButton") 
	btn.onclick = buttonAction
}

bindEvents();

 $(document).ready(function() {
 	var eventTitle = window.location.hash.substring(1);
 	curPastEvent = null;
 	for (key in pastEvents) {
 		if (pastEvents[key].title == eventTitle) {
 			curPastEvent = pastEvents[key];
 			break;
 		}
 	} 
 	$("#organizerName").text('Past event by ' + parse_string(curPastEvent.creator));
	$("#eventTitle").text(parse_string(curPastEvent.title));	 		
	$("#eventType").text(stupid2normal[curPastEvent.type]);
	$("#duration").text(curPastEvent.duration);
	$("#pick_date").text(curPastEvent.date);
	$("#locationInput").text(curPastEvent.location);
	$("#description").text(parse_string(curPastEvent.description));
	$('#helpTable tr').remove();
	if (curPastEvent.help.length == 0) {
		var markup = `<tr class = 'helpRow'>
			<td><h3> No helpers were specified for this event</h3><td>
		</tr>`
		
		$('#helpTable').eq(0).after(markup);
	}
	for (var i in curPastEvent.help) {
		var curHelp = curPastEvent.help[i];
		var markup = `<tr class = "helpRow">
                <td class = "col1"><input type="text" id = "title" placeholder= "` +parse_string(curHelp[0])+`" style="width:230px;height:45px;pointer-events:none;";></input> <center><input  type = "text" id="pplNumber" style="height:45px; width: 230px; pointer-events:none;" max = "30" min="1" placeholder = "` + curHelp[1]+` people"></input></center></td>
                <td class = "col2"><text class="form-control" class="descriptionOfTask" >` +parse_string(curHelp[2])+`</text></td></td>
              </tr>`;
        
        $('#helpTable').eq(0).after(markup);
	}
 }) 		
