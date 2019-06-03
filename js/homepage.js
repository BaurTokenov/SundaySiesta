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
		if (events.length == 0) {
			var markup = `<div class="col-md-4 col-sm-6 portfolio-item ` + curEvent.type + ` z` + i.toString() +  `">
							<h2> There are currently no events  :( </h2>
  		  	 	 	    </div>
			`
			$(".events").append(markup)
			return;
		}
		for (var i = 0; i < events.length; i++) {
			curEvent = events[i];
			curEvent.join_status = false;
			for (var j = 0; j < curEvent.help.length; ++j) {
				if (curEvent.help[j][3] == 1) {
					curEvent.join_status = true;
					break;
				}

			}
			var markup = `<div class="col-md-4 col-sm-6 portfolio-item ` + curEvent.type + ` z` + i.toString() +  `">
          <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1">
            <div class="portfolio-hover">
              <div class="portfolio-hover-content">
                <i class="fas fa-plus fa-3x"></i>
              </div>
            </div>

          </a>
          <div class="portfolio-caption event eventDescr">
            <h4>`+ parse_string(curEvent.title) + `</h4>
             <i class="text-muted"><p style="font-weight:530;display:inline;"> Date:&nbsp</p>` + curEvent.date + `</i><br>
             <i class="text-muted"> <p style="font-weight:530;display:inline;"> Location:&nbsp</p>` + curEvent.location + `</i><br>
             <i class="text-muted"><p style="font-weight:530;display:inline;"> Duration:&nbsp</p>` + curEvent.duration + ` hours` + `</i><br>
             <p  style = "margin-bottom: 5px;"><p style="font-weight:530;display:inline;">Description: &nbsp</p>` +  curEvent.description + `</p><br>`;

            if (!curEvent.join_status) {
            		markup += `<button type="button" class="btn btn-primary joinButton"> Join </button>`
            } else {
            	markup += `<p class = "mb-0" style = "color: green;"> You have already joined this event.</p>
			 						<button type="button" class="btn btn-primary editButton"  > Edit </button>`
            }
            markup += '</div>'




				markup+=`<div class = "fillout" style="text-align: center; background-color: white;">
								<h2 style = "margin-top:0%; font-size: 22px;"> How would you like to help the organizer? </h2>
								<div class = "row" style="font-size: 22px;margin-top: 1%; ">`
								// <h3 style="text-align: left;margin-top: 3%"> Title: ` + curEvent.title +` </h3>

					for (j = 0; j < (curEvent.help).length; j++) {
						var needed = `<div class = "helpersNumbers" style="float:right; font-size: 22px; "><p style = "display:inline;">(` + (curEvent.help[j][2]).toString() + `/` + (curEvent.help[j][1]).toString() + `</p><i class=\"fas fa-user\"></i>)</div>`;
						markup += `<div class="custom-control custom-checkbox custom-control-inline checkbox" style = "margin-top: ;">
									<input type = "checkbox" style = "font-size: 22px; margin-top: 300px;" class = "custom-control-input helpCheckbox" id ="` + curEvent.title + curEvent.help[j][0] + i.toString() ;
									if (curEvent.help[j][2] == curEvent.help[j][1] && curEvent.help[j][3] == 0) {
										markup += `" name = "ossm" disabled >`
									} else {
										if (curEvent.help[j][3] == 1)
											markup += `" name = "ossm" checked>`
										else
											markup += `" name = "ossm">`
									}

								markup += 	`<label style = "font-size: 22px; white-space: nowrap;" class = "custom-control-label checkboxLabels" for="` + curEvent.title + curEvent.help[j][0] + i.toString() + `">
												` + parse_string((curEvent.help)[j][0]) + needed + `
											</label>
									</div>`
					}
					markup += `</div>
								<div class="text-right" style="margin-bottom: 3%; margin-right: 3%; background-color: white;">
									<button type="button" class="btn btn-primary submitButton" > Submit </button>
									<button type="button" class="btn btn-primary cancelButton" style = "margin-right: 2%;"> Cancel </button>
								</div>
							</div>
						</div>`
			if (curEvent.userCreate == 1) {
				 markup = `<div class="col-md-4 col-sm-6 portfolio-item ` + curEvent.type + ` z` + i.toString() +  `">
						          <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1">
						            <div class="portfolio-hover">
						              <div class="portfolio-hover-content">
						                <i class="fas fa-plus fa-3x"></i>
						              </div>
						            </div>

						          </a>
						          <div class="portfolio-caption event eventDescr">
							            <h4>`+ parse_string(curEvent.title) + `</h4>
							             <i class="text-muted"><p style="font-weight:530;display:inline;"> Date:&nbsp</p>` + curEvent.date + `</i><br>
							             <i class="text-muted"> <p style="font-weight:530;display:inline;"> Location:&nbsp</p>` + curEvent.location + `</i><br>
							             <i class="text-muted"><p style="font-weight:530;display:inline;"> Duration:&nbsp</p>` + curEvent.duration + ` hours` + `</i><br>
							             <p  style = "margin-bottom: 5px;"><p style="font-weight:530;display:inline;">Description: &nbsp</p>` +  curEvent.description + `</p><br>
							             <p class = "mb-0" style = "color: #4286f4;"> You are the creator of this event.</p>
						          </div>`;
						          
			 	}
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


	$("#events").on('click','.joinButton',function(){
			var x = ($(this).closest('div').parent().children('.fillout'))
			$(this).hide();
			x.animate( { "opacity": "show", top:"100"} , 500 );

     });

	$("#events").on('click','.cancelButton',function(){
			var ind = ($(this).closest('div')).parent().parent().hide()
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


	$("#events").on('click','.submitButton',function(){
		// var kek = ($(this).closest('div')).parent().parent().children('.eventDescr').children('.joinButton')
		// kek.attr("disabled", true);
		var ind = ($(this).closest('div')).parent().hide();
		// $("#join").show(); 			// var x =  $(this).closest('div .fillout')
			// console.log(x.attr('class'));
			// console.log(ind.attr('class'))
		var x = ($(this).closest('div').parent().parent().children('.eventDescr'))
			x.animate( { "opacity": "show", top:"100"} , 500 );
		var y = ($(this).closest('div').parent().parent().prop('class'));
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
			'date': curEvent.date, 'type': curEvent.type, "help": curEvent.help, 'index': curEvent.index, 'userCreate': 0, 'location': curEvent.location, 'duration': curEvent.duration})

		// curEvent.join_status = true;

		populateEvents();
     });

	$("#events").on('click','.editButton',function(){
		// var x = ($(this).closest('div').parent().parent().children('.fillout'))
		// x.animate( { "opacity": "show", top:"100"} , 500 );
		// var y = ($(this).closest('div').parent().parent().prop('class'));
		// var ind = y[y.length - 1]
		// var curEvent = events[ind];
		$(this).hide();
		var x = ($(this).closest('div').parent().children('.fillout'))
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
				// $('')
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
	
		var checkPopulate =  readFromDatabase();
		var checkPopulate1 = await checkPopulate;
		// checkPopulate1 = true;
		if (checkPopulate1) {
			populateEvents();
		}
	// }
	}
	f();
		$(".container").on('click', '#create_event', function () {
  window.location.replace("create-event.html");


})
	// populateEvents();
	f();


});