//Objectives:
//Current day and time displayed at the top
//Color code time blocks based on what time it is
//Enter and store event to local storage once save is clicked

//BONUS:
//I added a goals section
//save checked box to local storage if checked
//save goals to local storage when entered

  
//this gives time in format to use if/then for past present and future
var time = new Date();
console.log(
    time.toLocaleString('en-US', { hour: 'numeric', hour12: true })
);  

$("#currentDay").html(time);


