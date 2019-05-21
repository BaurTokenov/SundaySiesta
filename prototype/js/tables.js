var checkboxIDs = ['allCheckbox', 'cookingCheckbox', 'dancingCheckbox', 'traditionalGamesCheckbox', 'otherCheckbox']
var typeOfEvents = ['cookingEvent', 'dancingEvent',  'tradGamesEvent', 'otherEvent'];
var events = [{'title': "Blah_Blah_Blah", 'description': "Blah blah blah blah blah", 
'date': '2019.05.25', "type": "cookingEvent", "help": [['cooking', 4, 3, 0], ['reservation_of_speaker', 1, 0, 0], ['reservation_of_room', 1, 0, 0]], "join_status": false },
	{'title': "Meow_Meow", 'description': 'Meow meow meowm meow', 'date': '2019.05.25',
	 "type": "dancingEvent", "help": [['helper_dancers', 3, 1, 0, 0], ['reservation_of_speaker', 1, 0, 0], ['reservation_of_room', 1, 0, 0] ], "join_status": false},
	 {'title': "Gaf_gaf_gaf", 'description': "gaf blah gaf blah blah", 
'date': '2019.05.31', "type": "cookingEvent", "help": [['cooking', 2, 2, 0], ['reservation_of_speaker', 1, 0, 0], ['reservation_of_room', 1, 1, 1]], "join_status": true },
	{'title': "Meow_Meow", 'description': 'Meow alo privet meow', 'date': '2019.05.19',
	 "type": "dancingEvent", "help": [['helper_dancers', 3, 1, 0, 0], ['reservation_of_speaker', 1, 0, 0], ['reservation_of_room', 1, 1, 1] ], "join_status": true}
] 
var myJoinedEvents = [{'title': "Gaf_gaf_gaf", 'description': "gaf blah gaf blah blah", 
'date': '2019.05.31', "type": "cookingEvent", "help": [['cooking', 2, 2, 0], ['reservation_of_speaker', 1, 0, 0], ['reservation_of_room', 1, 1, 1]], "join_status": true },
	{'title': "Meow_Meow", 'description': 'Meow alo privet meow', 'date': '2019.05.19',
	 "type": "dancingEvent", "help": [['helper_dancers', 3, 1, 0, 0], ['reservation_of_speaker', 1, 0, 0], ['reservation_of_room', 1, 1, 1] ], "join_status": true}]
var checkbox2EventType = {}	
var myCreatedEvents = [];
for (i = 1; i < checkboxIDs.length; i++) {
	checkbox2EventType[checkboxIDs[i]] = typeOfEvents[i-1];
}




currentVal = null;
currentTable = [];
const firebaseConfig = {
		  apiKey: "AIzaSyB7kwTP2xjBw-5KBuC9xgp53TyOALL7Gak",
		  authDomain: "sundaysiesta-5bc7a.firebaseapp.com",
		  databaseURL: "https://sundaysiesta-5bc7a.firebaseio.com",
		  projectId: "sundaysiesta-5bc7a",
		  storageBucket: "sundaysiesta-5bc7a.appspot.com",
		  messagingSenderId: "1026169717890",
		  // appId: "1:1026169717890:web:0ef9fb717bc117b2"
		};

// firebase.initializeApp(firebaseConfig);
// var database = firebase.database()

var config = {
  apiKey: "AIzaSyAR7Rduey2cV3LNzLAQDKMC8WSIRs7JeFI",
    authDomain: "programming3-5fd67.firebaseapp.com",
    databaseURL: "https://programming3-5fd67.firebaseio.com",
    projectId: "programming3-5fd67",
    storageBucket: "programming3-5fd67.appspot.com",
    messagingSenderId: "950045693008"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database()




function writeToDatabase(event) {
	if (event == null)
			return;
	var newKey = database.ref('/allEvents/').child('event' + event.index)
	newKey.set ({
		index: event.index,
		title: event.title,
		description: event.description,
		date: event.date,
		userCreate: event.userCreate,
		type: event.type
	});
	var newKey = database.ref('/allEvents/event' + event.index + '/').child('helpers');
	for (var i = 0; i < event.help.length; ++i) {
		var x = 'help' + i;
		var newKey = database.ref('/allEvents/event' + event.index + '/helpers/').child(x);
		newKey.set ({
			name: event.help[i][0],
			needed: event.help[i][1],
			joined: event.help[i][2],
			userJoin: event.help[i][3],
			description: event.help[i][4]
	})
	}
	return true;
}


function readFromDatabase() {
  return database.ref('/allEvents/').once('value').then(function(snapshot) {
    // initializeTable();
    
    currentVal = snapshot.val();
    if (currentVal != null) {
	    console.log(currentVal)
	    var keyList = Object.keys(currentVal);
	    currentTable = keyList;
	    console.log(keyList.length);
	} else {
		currentTable = [];
	}
	events = [];
	for (var key in currentTable) {
		var curEvent = currentVal[currentTable[key]];
		var x;
		var curHelpKeys = [];
		var curHelpTable = null;
		var curHelpList = []
		// for (curEvent.helpers)
		var helpersNumber = Object.keys(curEvent.helpers)
		for (var j = 0; j < helpersNumber.length; ++j) {
			var str = 'help' + (j).toString();	
			// var xd = str.length;
			var curHelpNode = curEvent.helpers[str]
			curHelpList.push([curHelpNode.name, curHelpNode.needed, curHelpNode.joined, curHelpNode.userJoin, curHelpNode.description])
		}

		// var str = 'help' + (parseInt(key, 10) + 1).toString();
		
		// for (var i = 0; i < curEvent.helpers; ++i) {
		// 	curHelpTable = curEvent.helpers
		// }
		// database.ref('/allEvents/' + currentTable[key] + '/helpers/').once('value').then(function(snapshot1) {
		// 	curHelpTable = snapshot1.val();
		// 	if (curHelpTable != null) {
		// 		var keyList = Object.keys(curHelpTable);
		// 		curHelpKeys = keyList;
		// 	} else {
		// 		curHelpKeys = [];
		// 	}
			// for (var i = 0; i < curHelpKeys.length; ++i) {
		// 		var curHelpNode = curHelpTable[curHelpKeys[i]]
		
		// 	}
			var x = {'title': curEvent.title, 'index': curEvent.index,'type': curEvent.type, 'date': curEvent.date,'description': curEvent.description, 'help': curHelpList, join_status: false, userCreate: curEvent.userCreate} 
			events.push(x);
// 'date': '2019.05.31', "type": "cookingEvent", "help": [['cooking', 2, 2, 0], ['reservation_of_speaker', 1, 0, 0], ['reservation_of_room', 1, 1, 1]], "join_status": true }
		// })
	}
	myJoinedEvents = [];
	for (var i = 0; i < events.length	; ++i) {
		var curEvent = events[i];
		for (var j = 0; j < curEvent.help.length; ++j) {
					if (curEvent.help[j][3] == 1) {
						curEvent.join_status = true;
						myJoinedEvents.push(curEvent)
						break;
					}
		}
		if (curEvent.userCreate == 1) 
			myCreatedEvents.push(curEvent)
	}
	
	return true;
		
});
}










