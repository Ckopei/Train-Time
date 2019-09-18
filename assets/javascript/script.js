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

    if ($("#name-input").val() === "" || $("#destination-input").val() ==="" || $("#first-time-input").val() === "" || $("#frequency-input").val() === "") {
        $(".alert").show()
    }
    else {
        $(".alert").hide()
        let trainName = $("#name-input").val().trim();
        let destination = $("#destination-input").val().trim();
        let firstTime = $("#first-time-input").val().trim()
        let frequency = $("#frequency-input").val().trim()
        console.log(trainName, destination, firstTime, frequency)
        //put vars into temporary object
        let newTrain = {
            trainName: trainName,
            destination: destination,
            firstTime: firstTime,
            frequency: frequency
        }
        //push object to database
        database.ref().push(newTrain);
        //clear every text box on the page with .val("")
        $("#name-input").val("");
        $("#destination-input").val("");
        $("#first-time-input").val("");
        $("#frequency-input").val("");
    }
})

//database side
//on child added so it calls this every time an entry is made
database.ref().on("child_added", function (snapshot) {
    console.log(snapshot.val());
    // set variables from the snapshot 
    let trainName = snapshot.val().trainName;
    let destination = snapshot.val().destination;
    let firstTime = snapshot.val().firstTime;
    let frequency = snapshot.val().frequency;
    //blank var for the next two until i work moment.js into this

    //moment.js math 
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var minutesAway = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

    // Next Train
    var nextTrain = moment().add(minutesAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

    //append the snapshot variables to the page
    //var for <tr>
    var newRow = $("<tr>").append(
        //append all the <tr>'s to it.
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        //WHY DOESNT THIS TIME FORMAT WORK WHEN APPENDING BUT IT DOES IN CONSOLE.LOG
        $("<td>").text(moment(nextTrain).format("HH:mm")),
        $("<td>").text(minutesAway),
    );

    //append new <tr> to the tbody
    $("#appendNewRowHere").append(newRow)
})
