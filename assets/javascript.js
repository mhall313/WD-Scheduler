//To remove any potential syncing issues on load
$(document).ready(function(){

//Variable for current date on load to display at the top
var dt = new Date();
//Arrays to iterate through for days, month and times
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var month = new Array(12);
month[0] = "Jan";
month[1] = "Feb";
month[2] = "Mar";
month[3] = "Apr";
month[4] = "May";
month[5] = "Jun";
month[6] = "Jul";
month[7] = "Aug";
month[8] = "Sep";
month[9] = "Oct";
month[10] = "Nov";
month[11] = "Dec";

var hours = new Array(9);
hours[0] = "9";
hours[1] = "10";
hours[2] = "11";
hours[3] = "12";
hours[4] = "13";
hours[5] = "14";
hours[6] = "15";
hours[7] = "16";
hours[8] = "17";


//Weekday and Calendar Month Date, Year
var d = weekday[dt.getDay()];
var calD = month[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear();
//Set HTML in IDs currentDay and currentDate as the current day and time
$("#currentDay").html(d);
$("#currentDate").html(calD);

//initialize saved events array to later popular with objects for each saved event in forms in time block rows 
var calEvents = [];
//window.localStorage.clear(); //for testing

//For each element with class "table-row" assign data attribute hour cooresponding to the index of the variable hours
function rowHour(){
    var i = 0;
    $.each($(".table-row"),function(){
        $(this).attr("data-hour",hours[i]);
        i ++;
    })
}
//Function to color code rows for past, present and future using classes past, present and future
function colorCode(){
    //Run rowHour that adds the data-hour attribute
    rowHour();
    //Run init function
    init();
    //Update nowHour each time this function is run
    var nowDt = new Date();
    //Sets as military time for better analysis
    var nowTime = nowDt.getHours();

    //For each html element with class table-row ... 
    $(".table-row").each(function(){
        //set plannerTime equal to the data attribute hour of the current table-row
        var plannerTime = $(this).data("hour");
        //if the plannerTime/table-row data-hour equals current hour/nowTime add the class "present" and remove classes "future" and "past" from that row 
        if(plannerTime === nowTime){
            $(this).removeClass("past");
            $(this).removeClass("future");
            $(this).addClass("present");
        }
        //if the plannerTime/table-row data-hour greater than the current hour/nowTime add the class "future" and remove classes "present" and "past" from that row 
        else if (plannerTime > nowTime){
            $(this).removeClass("past");
            $(this).addClass("future");
            $(this).removeClass("present");
        }
        //Otherwise add the class "past" and remove classes "present" and "future" from that row 
        else{
            $(this).addClass("past");
            $(this).removeClass("future");
            $(this).removeClass("present");
        }
    });
}    
//Timer/Interval to rerun colorCode so that appropriate hour is highlighted when the hour changes
function whatHour(){
    colorCode();
    setInterval(function(){
        colorCode();
        //console.log("its a me mario") //for testing :)
    },60000);
    
}
whatHour();

//Save calendar item to local storage once save button is clicked
$(".saveBtn").click(function(event){
    //prevent default of the form clearing
    event.preventDefault();
    //Set plannerTime to the data hour attribute of the table row
    var plannerTime = $(this).parent("tr").data("hour");
    //Set eventName to the value of the text in the form's textarea
    var eventName = $(this).parent("tr").find("textarea").val();
    //Store the two values above locally
    localStorage.setItem(plannerTime,eventName);
    //Create an objects and populate with the locally stored variables
    var calEvent = {
        plannerTime: plannerTime,
        eventName: eventName
    }
    //Push created object into array calEvents
    calEvents.push(calEvent);
    //run functions storeEvents and renderEvents
    storeEvents();
    renderEvents();
});
//Render events in the form fields of appropriate time blocks
function renderEvents(){
    //For eeach row find the event with corresponding index and populate form
    $.each($(".table-row"),function(){
        //Set variable as data hour attribute of the current row
        var rowHour = $(this).data("hour");
        //Set variable of the textarea for that row
        var calEventBox = $(this).find("textarea");
        //Use method find with implicit anonymous function to find the key plannerTime that matches the rowHour and returns the event
        var calEvent = calEvents.find(event => {
            if(event.plannerTime === rowHour){
                return event;
            } 
        })
        //If the array calEvent/the stored events is not empty, populate the form with the saved event returned above
        if(calEvent != null ){
            calEventBox.val(calEvent.eventName);
        }
    });    
}
//Store events in local storage
function storeEvents(){
    localStorage.setItem("calEvents", JSON.stringify(calEvents));
}
//Initialize storing functions and execute the function renderEvents
function init(){
    var storedEvents = JSON.parse(localStorage.getItem("calEvents"));
    if (storedEvents !== null){
        calEvents = storedEvents;
    }
    renderEvents();
}
});
