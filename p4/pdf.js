document.getElementById("Date Completed").innerHTML = formatAMPM();

var first = sessionStorage.getItem("account");
document.getElementById("acnumber").innerHTML = acprinter();

function formatAMPM() {
    // console.log(first);
var d = new Date(),
    minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
    hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
    ampm = d.getHours() >= 12 ? 'pm' : 'am',
    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
return days[d.getDay()]+' '+months[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear()+' '+hours+':'+minutes+ampm;
}

function acprinter(){
 console.log(first);
 return first;

}





 
// window.onload = function accNum() {
//     //when the document is finished loading, replace everything
//     // console.log(first);
//     //between the <a ...> </a> tags with the value of splitText
// document.getElementById('myLink').innerHTML=accNum();


// } 


function locater() {
    navigator.geolocation.getCurrentPosition(success, error);

    function success(pos) {
        const crd = pos.coords;
        document.write(crd.latitude);
        return(crd.latitude);
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);

      }
      
  
  navigator.geolocation.getCurrentPosition(success, error);
  return("crd.longitude");
  
}