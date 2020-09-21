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
colorCode();



//Enter and store event to local storage once save is clicked

//BONUS:
//I added a goals section
//save checked box to local storage if checked
//save goals to local storage when entered
});
