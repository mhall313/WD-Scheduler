//To remove any potential syncing issues on load
$(document).ready(function(){

//Arrays to iterate through for days, month and times
var dt = new Date();
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
hours[0] = "9 AM";
hours[1] = "10 AM";
hours[2] = "11 AM";
hours[3] = "12 PM";
hours[4] = "1 PM";
hours[5] = "2 PM";
hours[6] = "3 PM";
hours[7] = "4 PM";
hours[8] = "5 PM";


//Weekday and Calendar Month Date, Year
var d = weekday[dt.getDay()];
var calD = month[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear();
$("#currentDay").html(d);
$("#currentDate").html(calD);

//Objectives:
//Color code time blocks based on what time it is

//Variable time in format matching html to use in if/then logic to color code for past, present and future events
var time = new Date();
var nowAmPm = time.toLocaleString('en-US', { hour: 'numeric', hour12: true })

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
    $(".table-row").each(function(){
        var plannerAmPm = $(this).data("hour");
        if(plannerAmPm === nowAmPm){
            console.log("equal");
        }
        else if (plannerAmPm > nowAmPm){
            console.log("greater than" + plannerAmPm);
        }
        else{
            console.log("else");
        }
        
    });
    //once this bs fucking works add in conditionals in the .each to remove and then add classes
      
}    
colorCode();



//Enter and store event to local storage once save is clicked

//BONUS:
//I added a goals section
//save checked box to local storage if checked
//save goals to local storage when entered
});
