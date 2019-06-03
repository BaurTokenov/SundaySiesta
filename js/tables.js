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

var pastEvents = [{'title': "bangladesh_national_cuisine", 'description': parseForDB("Traditional, authentic Bangladeshi cuisine is made up of a diverse range of delicious spices, herbs, rice, fish meats and breads."), 
'date': '2019-03-20', "type": "cookingEvent", "help": [['cooking', 2, parseForDB("Need someone proficient in cooking")], ['buy_groceries', 2, parseForDB("In need to bring groceries from GLobal Food Market")], ['reservation_of_room', 1, "have got to reseve a room"]], 'location': 'N13-1 Woolim hall', 'duration': 3, 'creator': 'Rahman Latifur'},
	
	{'title': "brazilian_dance", 'description': parseForDB("Samba is a Brazilian music genre and dance style notable for its fast footwork and flowing hip swings which, when coupled with the beats of a steel drum, seems to leave spectators in a trance."), 'date': '2019-03-15',
	 "type": "dancingEvent", "help": [['Access_to_loud_music', 1, parseForDB("I could use some help with putting music through a loud speaker")], ['room_reservation', 1, parseForDB("Someone to be in charge of reserving room for the event")]], 'location': 'W2-1 Multipurpose hall', 'duration': 2, 'creator': 'Alberto Carlos'},

	 {'title': "kuwait_national_game", 'description': parseForDB("You will probably see the similarities that the Kuwaiti game Al-lagsa, has with the more commonly known game of jacks. In jacks, players bounce a ball while grabbing up more jacks than the other players."), 'date': '2019-04-11',
	 "type": "tradGamesEvent", "help": [], "location": 'W8 barbeque place', 'duration': 2,  'creator': 'Rawan Abdullah'},
	 
	 {'title': "english_tea_drinking", 'description': parseForDB("Enjoying afternoon tea while perched on a gilded hotel armchair is a fine British tradition, but hardly sustainable as a regular pursuit. Throwing your own afternoon tea party means you can stick to your own budget, plus you can select your favourite finger food."), 'date': '2019-04-05',
	 "type": "otherEvent", "help": [['Cups', 1, parseForDB("To bring cups for the tea")]], "location": 'Top of Lotteria building N13-1', 'duration': 1, 'creator': 'John Smith' }]

var curPastEventText = null;
var curPastEvent = null;


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
		type: event.type,
		location: event.location,
		duration: event.duration
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
		if (curEvent.helpers != null) {

			var helpersNumber = Object.keys(curEvent.helpers)
			for (var j = 0; j < helpersNumber.length; ++j) {
				var str = 'help' + (j).toString();	
				// var xd = str.length;
				var curHelpNode = curEvent.helpers[str]
				curHelpList.push([curHelpNode.name, curHelpNode.needed, curHelpNode.joined, curHelpNode.userJoin, curHelpNode.description])
			}
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
			var x = {'title': curEvent.title, 'index': curEvent.index,'type': curEvent.type, 'date': curEvent.date,'description': curEvent.description, 'help': curHelpList, join_status: false, userCreate: curEvent.userCreate, duration: curEvent.duration, location: curEvent.location} 
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










