// Make sure that your app suits this basic spec:

//   * When adding trains, administrators should be able to submit the following:

//     * Train Name

//     * Destination 

//     * First Train Time -- in military time

//     * Frequency -- in minutes

//   * Code this app to calculate when the next train will arrive; this should be relative to the current time.

//   * Users from many different machines must be able to view same train times.

//   * Styling and theme are completely up to you. Get Creative!

//firebase inputs and initialize
var firebaseConfig = {
    apiKey: "AIzaSyBotGGIkKHNu0tFMny5IIrUyHDCE2bTYGs",
    authDomain: "train-time-f6c25.firebaseapp.com",
    databaseURL: "https://train-time-f6c25.firebaseio.com",
    projectId: "train-time-f6c25",
    storageBucket: "",
    messagingSenderId: "18087529133",
    appId: "1:18087529133:web:8abac6d2a49579d9be9424"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database()

//user form

//on click for add train button
$("#addTrain").on("click", function (event) {
    event.preventDefault();
    //set vars for each form
    var trainName = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTime = $("#first-time-input").val().trim()
    var frequency = $("#frequency-input").val().trim()
    console.log(trainName, destination, firstTime, frequency)
    //put vars into temporary object
    var newTrain = {
        trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency
    }
    //push object to database
    database.ref().push(newEmp);
    //clear every text box on the page with .val("")
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val();
    $("#frequency-input").val();
})

//database side

//on child added so it calls this every time an entry is made
//database.ref().on("child_added", function(childSnapshot) {}
// set variables from the snapshot 
//console log it so I know it worked
//append the snapshot variables to the page
//var for <tr>
//append all the <tr>'s to it.
//append new <tr> to the tbody

//cry as you figure out how to work in the moment.js math