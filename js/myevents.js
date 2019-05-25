	$(document).ready(function () {
	// var kek1 = writeToDatabase({'title': "Blah_Blah_Blah", 'description': "Blah blah blah blah blah",
	// 		'date': '2019.05.25', "type": "cookingEvent", "help": [['cooking', 3, 3, 0], ['reservation_of_speaker', 1, 0, 0],
	// 		 ['reservation_of_room', 1, 0, 0]], 'index': 0, 'userCreate': 1, 'type': `otherEvent`})
	// writeToDatabase({'title': "Blah_Blah_Blah", 'description': "Blah blah blah blah blah",
	// 		'date': '2019.05.25', "type": "cookingEvent", "help": [['cooking', 3, 3, 0], ['reservation_of_speaker', 1, 0, 0],
	// 		 ['reservation_of_room', 1, 0, 0]], 'index': 1, 'userCreate': 1, 'type': `otherEvent`})
	// writeToDatabase({'title': "Blah_Blah_Blah", 'description': "Blah blah blah blah blah",
	// 		'date': '2019.05.25', "type": "cookingEvent", "help": [['cooking', 3, 3, 0], ['reservation_of_speaker', 1, 0, 0],
	// 		 ['reservation_of_room', 1, 0, 0]], 'index': 2, 'userCreate': 1, 'type': `otherEvent`})
	// writeToDatabase({'title': "Blah_Blah_Blah", 'description': "Blah blah blah blah blah",
	// 		'date': '2019.05.25', "type": "cookingEvent", "help": [['cooking', 3, 3, 1], ['reservation_of_speaker', 1, 0, 0],
	// 		 ['reservation_of_room', 1, 0, 0]], 'index': 3, 'userCreate': 0, 'type': `otherEvent`})
	// debil
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


	function populateEvents(check) {
		var participantNames = ['Pablo Escobar', 'Antonio Vivaldi', 'Beethoven', 'Joseph Stalin', 'Tovarisch Lenin']
		$(".otherEvents").empty();
		$(".myEvents").empty();
		if (myCreatedEvents.length == 0) {
			var markup = `<div class = "col-md-12" style = "background-color: white;width:100%; margin-left: 2%">
							<h2 style="color: grey; font-size: 18px; margin: 1%; padding: 1%;" > You have not created any events yet. You can <a href = "create_new.html">create event</a>. </h2>
  		  	 	 	    </div>
					  </div>`
			$(".myEvents").append(markup)
		}
		for (var i = 0; i < myCreatedEvents.length; ++i) {
			curEvent = myCreatedEvents[i];
		var markup = `<div class="col-md-4 col-sm-6 portfolio-item">
            <a class="portfolio-link" data-toggle="modal" href="#portfolioModal6">
              <div class="portfolio-hover">
                <div class="portfolio-hover-content">
                  <i class="fas fa-plus fa-3x"></i>
                </div>
              </div>

            </a>
          <div class="portfolio-caption">
            <h4 style = "font-weight:600;">`  + parse_string(curEvent.title) + `</h4>
            <p class = "text-muted">` + curEvent.date +`</p><br>
            <div style = "margin-bottom: 5px">  Description:  ` + curEvent.description + `
            </div>
            <div class="accordion" id="accordion` + curEvent.index + `">

    						<div class="card-header col-md-12" id="headingOne` + curEvent.index +`" style="background-color: white; border:none;">
					      		<h2 class="mb-0">
					        		<button class="btn btn-link" type="button" style = "white-space: nowrap; text-align: center;" data-toggle="collapse" data-target="#collapse` + curEvent.index + `" aria-expanded="true" aria-controls="collapseOne">
					          			Helpers list
					        		</button>
					      		</h2>
							</div>

					<div id="collapse` + curEvent.index + `" class="collapse hide col-md-12" aria-labelledby="headingOne` + curEvent.index +`" data-parent="#accordion` + curEvent.index+`" style="margin-top: 0%">
      					<div class="card-body">`
      					for (var j = 0; j < curEvent.help.length; ++j) {
      						markup += `<div style="margin-bottom: : 3%">
      							<h5 > <strong>` + parse_string(curEvent.help[j][0]) + `</strong><p style="display: inline;"><br>` + ' ' + curEvent.help[j][2].toString() + '/' + curEvent.help[j][1].toString() + ` joined: </p></h5>
        						<ul class="list-group" style = "font-size: 14px;">`
        						if (curEvent.help[j][2] == 0) {
        							markup += 	`<li class="list-group-item" style="color: orange; font-size: 22px;" ><i>` + 'Noone has entered yet' +  `</i></li>`
        						}
								 for (var k = 0; k < curEvent.help[j][2]; ++k) {
								  		markup += `<li class="list-group-item" style= "white-space: nowrap; text-align: center; width: ; border: ;">` + participantNames[k % 4] +  `</li>`
									}

								markup += `</ul>

							</div>`
						}

  						markup += `</div>
  					</div>
  					</div>
  				</div>
  			</div>`

  			$(".myEvents").append(markup);
		}
		if (myJoinedEvents.length == 0) {
			var markup = `<div class = "col-md-12" style = "background-color: white;width:100%; margin-left: 2%">
							<h2 style="color: grey; font-size: 18px; margin: 1%; padding: 1%;" > Currently you have no joined events. You can join events from the <a href = "homepage.html">  home page </a>. </h2>
  		  	 	 	    </div>



			`
			$(".otherEvents").append(markup)
		}
		for (var i = 0; i < myJoinedEvents.length; i++) {
			curEvent = myJoinedEvents[i];
			curEvent.join_status = false;
			for (var j = 0; j < curEvent.help.length; ++j) {
				if (curEvent.help[j][3]) {
					curEvent.join_status = true;
					break;
				}
			}
			var markup = `<div class="col-md-4 col-sm-6 portfolio-item ` + curEvent.type + ` z` + i.toString()  + `">
            <a class="portfolio-link" data-toggle="modal" href="#portfolioModal6">
              <div class="portfolio-hover">
                <div class="portfolio-hover-content">
                  <i class="fas fa-plus fa-3x"></i>
                </div>
              </div>

            </a>
            <div class="portfolio-caption">
              <h4>` + parse_string(curEvent.title) + `</h4>
              <p class = "text-muted"> ` + curEvent.date  + `</p><br>
              <div style = "margin-bottom: 5px">  Description: ` + curEvent.description + `
              </div>`;
            if (!curEvent.join_status) {
			 						markup += `<div class="text-right" style="margin-bottom: 1%; margin-right: 1%">
				 						<button type="button" class="btn btn-primary joinButton" > Join </button>
			 						</div>`
			 					} else {
			 						markup += `
			 						<div class="text-right" style="margin-bottom: 1%; margin-right: 1%">

			 									<button type="button" class="btn btn-primary editButton" > Edit </button>
			 									</div>`
			 					}
			 			markup += `</div>`

			// $('#events').append(markup);
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
								<div class="text-right" style="margin-bottom: 1%; margin-right: 1%">
									<button type="button" class="btn btn-primary submitButton" > Submit </button>
									<button type="button" class="btn btn-primary cancelButton" > Cancel </button>
								</div>
							</div>
						</div>`
			$('.otherEvents').append(markup)
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

	$(".otherEvents").on('click','.joinButton',function(){
			var x = ($(this).closest('div').parent().parent().children('.fillout'))
			x.animate( { "opacity": "show", top:"100"} , 500 );

     });

	$(".otherEvents").on('click','.cancelButton',function(){
			var ind = ($(this).closest('div')).parent().hide()
			var x = events;
			populateEvents();
			// var x = ($(this).closest('div').parent().parent().children('.eventDescr'))
			// x.animate( { "opacity": "show", top:"100"} , 500 );

     });

	$(".otherEvents").on('click','.editButton',function(){
		$(this).hide();
		var x = ($(this).closest('div').parent().parent().children('.fillout'))
		x.animate( { "opacity": "show", top:"100"} , 500 );
		var y = ($(this).closest('div').parent().parent().prop('class'));
     });
	$(".otherEvents").on('click','.submitButton',function(){
		var ind = ($(this).closest('div')).parent().hide();

		var x = ($(this).closest('div').parent().parent().children('.eventDescr'))
			x.animate( { "opacity": "show", top:"100"} , 500 );
		var y = ($(this).closest('div').parent().parent().prop('class'));
		console.log(y);
		var ind = y[y.length - 1]
		var curEvent = myJoinedEvents[ind];
		for (var j = 0; j < curEvent.help.length; ++j) {
			var selector = $('#' + curEvent.title + curEvent.help[j][0] + ind.toString());
			if (selector.prop('checked') && !curEvent.help[j][3]) {
				curEvent.help[j][2] += 1;
				curEvent.help[j][3] = 1;
			} else if (!selector.prop('checked') && curEvent.help[j][3]) {
				curEvent.help[j][2] -= 1;
				curEvent.help[j][3] = 0;
			}

		}
		writeToDatabase({'title': curEvent.title, 'description': curEvent.description,
			'date': curEvent.date, "type": curEvent.type, "help": curEvent.help, 'index': curEvent.index, 'userCreate': 0, 'type': event.type, 'userCreate': 0})

		populateEvents();
     });
	async function f() {
		// var kek1 = writeToDatabase({'title': "Blah_Blah_Blah", 'description': "Blah blah blah blah blah",
		// 	'date': '2019.05.25', "type": "cookingEvent", "help": [['cooking', 4, 3, 0], ['reservation_of_speaker', 1, 0, 0], ['reservation_of_room', 1, 0, 0]], 'index': 0})

		// var kek2 = writeToDatabase({'title': "Gaf_gaf_gaf", 'description': "gaf blah gaf blah blah",
		// 	'date': '2019.05.31', "type": "cookingEvent", "help": [['cooking', 2, 2, 0], ['reservation_of_speaker', 1, 0, 0], ['reservation_of_room', 1, 1, 1]], 'index': 1})
		// readFromDatabase();
		// var kek3 = await kek1;
		// var kek4 = await kek2;
		// if (kek3 && kek4) {
		var checkPopulate =  readFromDatabase();
		var checkPopulate1 = await checkPopulate;
		// checkPopulate1 = true;
		if (checkPopulate1) {
			populateEvents();
		// }
		}
			$(".row").on('click', '#create_event', function () {
  	window.location.replace("create_new.html");
  	//   async function demo() {
  	// console.log('Taking a break...');
  	// await sleep(2000);

	// }

	// demo();

	})
				$(".row").on('click', '#go_home_page', function () {
  	window.location.replace("homepage.html");
  	//   async function demo() {
  	// console.log('Taking a break...');
  	// await sleep(2000);

	// }

	// demo();

	})

	}

	f();

})