$(document).ready(function () {

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
		$(".otherEvents").empty();

		for (var i = 0; i < myCreatedEvents.length; ++i) {
			var markup;
			curEvent = myCreatedEvents[i];
			markup = `<div class ="row myEvents" style = "background-color: white; width: 100%; margin: 0 auto;margin-top: 2%">
			 				<div class="col-md-8` + curEvent.type +  `" style="border: 2px solid black">
			 				<div class="text-right" style="margin-bottom: 1%; margin-right: 1%">
								<button type="button" class="btn btn-primary editOwn" > Edit </button>
							</div>
						<div class="accordion" id = "accordion` + curEvent.title +  `"">
    						<div class="card-header col-md-7" style="background-color: white">
					      		<h2 class="mb-0">
					        		<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#list` + curEvent.title + `" aria-expanded="true" aria-controls="collapseOne">
					          			Participants list
					        		</button>
					      		</h2>
							</div>
						<div id="` + curEvent.title + `" class="collapse hide col-md-7" aria-labelledby="headingOne" data-parent="#accordion` + curEvent.title +`" style="margin-top: 1%">
		      					<div class="card-body">
		      						<div style="margin-bottom: : 3%">
		      							<h2> Helpers1 <p style="display: inline;">` + curEvent.help[2].toString() + `/`  + curEvent.help[1].toString() + `</p></h2>
		        						<ul class="list-group">
									  	  <li class="list-group-item">  </li>
										</ul>
									</div>	
									<div style="margin-bottom: 5%">
										<h2> Helpers2 <p style="display: inline;"	> 3/3 </p></h2>
	        							<ul class="list-group">
									  	  <li class="list-group-item"> Participant </li>
										  <li class="list-group-item"> Participant </li>
										  <li class="list-group-item"> Participant </li>
										</ul>
									</div>
	      						</div>
      						</div>
      					</div>`
						


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
			var markup;
			if (i != myJoinedEvents.length - 1)
				markup = `<div class="col-md-8 `  + curEvent.type + ` z` + i.toString() + `" style = "border: 1px solid black; border-botttom: none">`
			else
				markup = `<div class="col-md-8 `  + curEvent.type + ` z` + i.toString() + `" style = "border: 1px solid black">`
			markup += 		`<div style="text-align: left;margin-top: 2%" class = "eventDescr">
		 						<h4> Title: ` + parse_string(curEvent.title) + `</h4>
					 			<h4> Description: ` + curEvent.description + `</h4>
			 					<h4> Date: ` + curEvent.date + `</h4>`
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
				   markup +=`<div class = "fillout" style="text-align: center">
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
	} 
	f();

})	
