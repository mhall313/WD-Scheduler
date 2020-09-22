//To remove any potential syncing issues on load
$(document).ready(function(){

//Variable for current date
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
$("#currentDay").html(d);
$("#currentDate").html(calD);

//initialize saved events
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
//Function run upon load to color code rows for past, present and future
function colorCode(){
    rowHour();
    init();
    var nowTime = dt.getHours();

    $(".table-row").each(function(){
        var plannerTime = $(this).data("hour");
        if(plannerTime === nowTime){
            $(this).removeClass("past");
            $(this).removeClass("future");
            $(this).addClass("present");
        }
        else if (plannerTime > nowTime){
            $(this).removeClass("past");
            $(this).addClass("future");
            $(this).removeClass("present");
        }
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
    setInterval(function(){colorCode();},60000);
}
whatHour();

//Save calendar item to local storage (once save button is clicked or enter key is pressed)
$(".saveBtn").click(function(event){
    event.preventDefault();

    var plannerTime = $(this).parent("tr").data("hour");
    var eventName = $(this).parent("tr").find("textarea").val();
    localStorage.setItem(plannerTime,eventName);
    //need to push variables into some array or object for conditionals in renderEvents

    storeEvents();
    renderEvents();
});

function renderEvents(){
    //Render event name inside of form feild - for every row find the event with corresponding index and populate form
    $.each($(".table-row"),function(){
        var rowHour = $(this).data("hour");
        var calEventBox = $(this).find("textarea");
        //i want to find the hour/key/whatever in calEvents equal to rowHour and put that text into calEventBox
        //calEventBox.val("the event text that cooresponds with rowHour");
    
    });    
}

function storeEvents(){
    localStorage.setItem("calEvents", JSON.stringify(calEvents));
}

function init(){ //doesn't work yet
    var storedEvents = JSON.parse(localStorage.getItem("calEvents"));
    if (storedEvents !== null){
        calEvents = storedEvents;
    }
    renderEvents();
}

//BONUS:
//I added a goals section
//save checked box to local storage if checked
//save goals to local storage when entered
});
