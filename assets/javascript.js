//Arrays to display date as human legible
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
month[7] = "Augt";
month[8] = "Sep";
month[9] = "Oct";
month[10] = "Nov";
month[11] = "Dec";


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

//Function run upon load to color code rows for past, present and future
function colorCode(){
    //add class to every th that equals the text content
    $(".row").addClass();

    // if(nowAmPm === row class){
    //     time-block . addClass present
    // }
    // else if (nowAmPm < row class){
    //     time-block . addclass future
    // }
    // else{
    //     time-clock . addClass past
    // }
}    
colorCode();




//Enter and store event to local storage once save is clicked

//BONUS:
//I added a goals section
//save checked box to local storage if checked
//save goals to local storage when entered

