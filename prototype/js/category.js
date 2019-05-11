
var sources = ["Bauak", "nai", "syau"]
// ["Where can I order Halal meat?",
// "Where is the most affordable market near the campus?",
// "Where can I order fresh vegetables?",
// "What is the closest grocery shop?",
// "Where can I store food for the event on the campus?"]
// {"category":"Food","question":"Where can I order Halal meat?"},
// {"category":"Food","question":"Where is the most affordable market near the campus?"},
// {"category":"Food","question":"Where can I order fresh vegetables?"},
// {"category":"Food","question":"What is the closest grocery shop?"},
// {"category":"Food","question":"Where can I store food for the event on the campus?"},
// {"category":"Equipment","question":"Luanda"},
// {"category":"Budget","question":"The Valley"},
// {"category":"Budget","question":"Buenos Aires"},
// {"category":"Budget","question":"Yerevan"},
// {"category":"Reservation","question":"Canberra"}];



$(function() {
    var availableTags = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];
    var x = $("#tags")
    x.autocomplete ({
      source: availableTags
    })
});

// console.log($( "#search-bar" ));
// $("#search-bar").autocomplete({
//   source: sources
// });
