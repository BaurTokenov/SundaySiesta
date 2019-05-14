$( document ).ready(function()	{
	// checkboxIDs = ['allCheckbox', 'cookingCheckbox', 'dancingCheckbox', 'traditionalGamesCheckbox', 'otherCheckbox']
	// typeOfEvents = ['cookingEvent', 'dancingEvent',  'tradGamesEvent', 'otherEvent'];
	// events = [{'title': "Blah_Blah_Blah", 'description': "Blah blah blah blah blah", 
	// 'date': '2019.05.25', "type": "cookingEvent", "help": [['cooking', 4, 3, 0], ['reservation_of_speaker', 1, 0, 0], ['reservation_of_room', 1, 1, 1]], "join_status": true },
	// 	{'title': "Meow_Meow", 'description': 'Meow meow meowm meow', 'date': '2019.05.25',
	// 	 "type": "dancingEvent", "help": [['helper_dancers', 3, 1, 0, 0], ['reservation_of_speaker', 1, 0, 0], ['reservation_of_room', 1, 0, 0] ], "join_status": false}
	// ] 
	// checkbox2EventType = {}	
	// for (i = 1; i < checkboxIDs.length; i++) {
	// 	checkbox2EventType[checkboxIDs[i]] = typeOfEvents[i-1];
	// }

	function parse_string(s) {
		ans = ""
		for (var i = 0; i < s.length; i++) {
			if (s[i] == '_')
				ans += ' '
			else {
				if (i == 0)
					ans += s[i].toUpperCase();
				else
					ans += s[i];
			}
		}
		return ans;

	}

	function toLower(s) {
		ans = ""
		for (var i = 0; i < s.length; ++i) {
			if (s[i] == ' ')
				ans += ' '
			else
				ans += s[i].toLowerCase();
		}
		return ans;
	}

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
	async function populateEvents() {
		// var checkPopulate =  readFromDatabase();
		// var checkPopulate1 = await checkPopulate;
		
		$("#events").empty();
		for (var i = 0; i < events.length; i++) {
			curEvent = events[i];
			curEvent.join_status = false;
			for (var j = 0; j < curEvent.help.length; ++j) {
				if (curEvent.help[j][3] == 1) {
					curEvent.join_status = true;
					break;
				}

			}
			var markup = `<div class="col-md-6 `  + curEvent.type + ` z` + i.toString() + `">
			 				<div style="text-align: left;margin-top: 2%" class = "eventDescr">
		 						<h4> Title: ` + parse_string(curEvent.title) + `</h4>
					 			<h4> Description: ` + curEvent.description + `</h4>
			 					<h4> Date: ` + curEvent.date + `</h4>`
			 					if (!curEvent.join_status) {
			 						markup += `<div class="text-right" style="margin-bottom: 1%; margin-right: 1%">
				 						<button type="button" class="btn btn-primary joinButton" > Join </button>
			 						</div>`
			 					} else {
			 						markup += `<p class = "mb-0"> You have already joined this event</p>	
			 						<div class="text-right" style="margin-bottom: 1%; margin-right: 1%"> 
			 									<button type="button" class="btn btn-primary editButton" > Edit </button>
			 									</div>`
			 					}
			 			
			// $('#events').append(markup);
				   markup+=`<div class = "fillout" style="text-align: center;background-color:white;">
								<h2 style = "margin-top:2%"> How would you like to help the organizer? </h2>
								<div class = "row" style="margin-top: 1%">`
								// <h3 style="text-align: left;margin-top: 3%"> Title: ` + curEvent.title +` </h3>
									
					for (j = 0; j < (curEvent.help).length; j++) {
						var needed = `<div class = "helpersNumbers" style="float:right;"><p style = "display:inline;">(` + (curEvent.help[j][2]).toString() + `/` + (curEvent.help[j][1]).toString() + `</p><i class=\"fas fa-user\"></i>)</div>`;
						markup += `<div class = "checkbox" >
										<input type = "checkbox" class = "helpCheckbox" id ="` + curEvent.title + curEvent.help[j][0] + i.toString() ;		
									if (curEvent.help[j][2] == curEvent.help[j][1] && curEvent.help[j][3] == 0) {
										markup += `" name = "ossm" disabled >`
									} else {
										if (curEvent.help[j][3] == 1)
											markup += `" name = "ossm" checked>`
										else
											markup += `" name = "ossm">`
									}

								markup += 	`<label class = "checkboxLabels" for="` + curEvent.title + curEvent.help[j][0] + i.toString() + `">  
												` + parse_string((curEvent.help)[j][0]) + needed + `
											</label>
									</div>`
					}		
					markup += `</div>
								<div class="text-right" style="margin-bottom: 1%; margin-right: 1%">
									<button type="button" class="btn btn-primary submitButton" > Submit </button>
									<button type="button" class="btn btn-primary cancelButton" > Cancel </button>
								</div>
							</div>
						</div>`
			if (curEvent.userCreate == 1) {
				markup = `<div class="col-md-6 `  + curEvent.type + ` z` + i.toString() + `">
			 				<div style="text-align: left;margin-top: 2%" class = "eventDescr">
		 						<h4> Title: ` + parse_string(curEvent.title) + `</h4>
					 			<h4> Description: ` + curEvent.description + `</h4>
			 					<h4> Date: ` + curEvent.date + `</h4>`
			 					
			 						markup += `<p class = "mb-0"> You are the creator of this event.</p>`
			 						// <div class="text-right" style="margin-bottom: 1%; margin-right: 1%"> 
			 						// 			<button type="button" class="btn btn-primary editButton" > Edit </button>
			 						// 			</div>`
			 					
			 			markup += `</div>`
			 	}
			 	markup += `</div>`
			$('#events').append(markup)
			}
			

		

		$(".fillout input[type=checkbox]").change(function () {
			var x = ($(this).parent());
			var z = x.find(".helpersNumbers p");
			var y = z.text().toString();
			if ($(this).prop("checked")) {
				y = y[0] + (parseInt(y[1], 10) + 1).toString() + y.substring(2, y.length)		
			} else {
				y = y[0] + (parseInt(y[1], 10) - 1).toString() + y.substring(2, y.length)		
			}
			z.text(y);
		
			// x.append()

		});
		
	}


	$(".row").on('click','.joinButton',function(){
			var x = ($(this).closest('div')).parent().children('.fillout');
				// .parent().parent()..children('.fillout'))
			x.animate( { "opacity": "show", top:"100"} , 500 );
			
     });

	$(".row").on('click','.cancelButton',function(){
			var ind = ($(this).closest('div')).parent().hide()
			var x = events;
			populateEvents();
			// var x = ($(this).closest('div').parent().parent().children('.eventDescr'))
			// x.animate( { "opacity": "show", top:"100"} , 500 );
			
     });
	
	function hideForms() {
		var x = ($('.eventDescr'))
			x.animate( { "opacity": "show", top:"100"} , 500 );
		x = ($('.fillout')).hide();
	}


	$(".row").on('click','.submitButton',function(){
		// var kek = ($(this).closest('div')).parent().parent().children('.eventDescr').children('.joinButton')
		// kek.attr("disabled", true); 
		var ind = ($(this).closest('div')).parent().hide();
		// $("#join").show(); 			// var x =  $(this).closest('div .fillout')
			// console.log(x.attr('class'));   		
			// console.log(ind.attr('class'))
		var x = ($(this).closest('div').parent().parent().children('.eventDescr'))
			x.animate( { "opacity": "show", top:"100"} , 500 );
		var y = ($(this).closest('div').parent().parent().parent().prop('class'));
		console.log(y);
		var ind = y[y.length - 1]
		var curEvent = events[ind];
		// for (var i = 0; i < curEvent.help; ++i) {
			// if ($(`.col-md-6 .` + curEvent.type + ' .' + ind).prop('checked') == true) {
			// 	curEvent.help[i][2] += 1;
			// }
			for (var j = 0; j < curEvent.help.length; ++j) {
				var selector = $('#' + curEvent.title + curEvent.help[j][0] + ind.toString());
				// selector.hide();
				if (selector.prop('checked') && !curEvent.help[j][3]) {
					curEvent.help[j][2] += 1;
					curEvent.help[j][3] = 1;
				} else if (!selector.prop('checked') && curEvent.help[j][3]) {
					curEvent.help[j][2] -= 1;
					curEvent.help[j][3] = 0;
				}
			// }
		}
		writeToDatabase({'title': curEvent.title, 'description': curEvent.description, 
			'date': curEvent.date, "type": curEvent.type, "help": curEvent.help, 'index': curEvent.index, 'userCreate': 0, 'type': event.type, 'userCreate': 0})

		// curEvent.join_status = true;
		
		populateEvents();
     });
	
	$(".row").on('click','.editButton',function(){
			var x = ($(this).closest('div')).parent().children('.fillout');
				// .parent().parent()..children('.fillout'))
			x.animate( { "opacity": "show", top:"100"} , 500 );
     });

		
	function show(x) {
		// x.animate( { "opacity": "show", top:"100"} , 500 );
		x.prop('class', x.prop('class') + ' visible-lg')
	}


	function hide(x) {
		var str = x.prop('class');
		x.prop('class', str.substring(0, str.length - 10));
	}
	
	function updateEventTable() {
		if ($("#allCheckbox").prop('checked') == true) {
			for (var key in checkbox2EventType) {
				var value = checkbox2EventType[key]
				$('.' + value).show();
			}	
			return;
		}
		console.log('here');
		for (var key in checkbox2EventType) {
			var value = checkbox2EventType[key]
			console.log("#" + key);
			value = '.' + value
			console.log(value);
			console.log('all checkbox checked? - ' + $("#allCheckbox").prop('checked'));
			if ($('#' + key).prop('checked')) {
				// show($(value));
				$(value).show();
				console.log('shown');
			}
			else {
				$(value).hide();
			}
		}
	}
	console.log($('.fillout input[type=checkbox]'));
	



	$(".eventFilter input[type=checkbox]").change(function (){
		// alert($(this).attr('id'));
		if ($(this).attr('id') == 'allCheckbox' && this.checked) {
			for (i = 1; i < checkboxIDs.length; i++) {
				$('#' + checkboxIDs[i]).prop('checked', false);
				$('')
			}
			updateEventTable();
		} else {
			$("#allCheckbox").prop('checked', false);
			updateEventTable();
			console.log($(this).attr('id'));
		}
		// if (this.checked) {
		// 	alert('checked');
		// }

	});
	async function f() {
		// var kek1 = writeToDatabase({'title': "Blah_Blah_Blah", 'description': "Blah blah blah blah blah", 
		// 	'date': '2019.05.25', "type": "cookingEvent", "help": [['cooking', 4, 3, 0], ['reservation_of_speaker', 1, 0, 0], ['reservation_of_room', 1, 0, 0]], 'index': 0, 'userCreate': 0, 'type': `dancingEvent`})
				
		// var kek2 = writeToDatabase({'title': "Gaf_gaf_gaf", 'description': "gaf blah gaf blah blah", 
		// 	'date': '2019.05.31', "type": "cookingEvent", "help": [['cooking', 2, 2, 0], ['reservation_of_speaker', 1, 0, 0], ['reservation_of_room', 1, 1, 1]], 'index': 1, 'userCreate': 1, 'type': `cookingEvent`})
		// // readFromDatabase();	
		// var kek3 = await kek1;
		// var kek4 = await kek2;
		// if (kek3 && kek4) {
		var checkPopulate =  readFromDatabase();
		var checkPopulate1 = await checkPopulate;
		// checkPopulate1 = true;
		if (checkPopulate1) {
			

			populateEvents();
		}
	// }
	} 
	f();
		$(".row").on('click', '#create_event', function () {
  window.location.replace("create-event.html");
  //   async function demo() {
  // console.log('Taking a break...');
  // await sleep(2000);
  
// } 

// demo();
    
})
	// populateEvents();
	f();


});
