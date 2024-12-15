const apiKey = "99d1b81d78f84f8aa6b190224240912"
let searchBar = document.getElementById("searchBar");
let tempcalender = document.getElementById("tempcalender");
console.log(tempcalender);

searchBar.addEventListener("keyup", () => {
    if (searchBar.value != "" || searchBar.value.length > 2) {
        getTemToday(searchBar.value)
    }
})

async function getTemToday(searchValue) {
    try {
        let api = await fetch(`http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${searchValue}`, {
            method: "get"
        });
        let data = await api.json();
        console.log(data);
        console.log(data[0]);
        // console.log(new Date().toString());
        console.log(Date.parse("2024-12-15").toString("MMMM yyyy"));


    } catch (err) {
        console.log("q is empty")
    }

}
async function getTem3days(searchValue) {
    // try {
    let api = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${searchValue}&days=3`, {
        method: "get"
    });
    let data = await api.json();
    console.log(data);
    //current day
    console.log(data.current.condition.text);
    console.log(data.current.condition.icon);

    console.log(data.current.temp_c);
    console.log(data.current.last_updated);
    //location 
    console.log(data.location.name);
    console.log(data.location.localtime);
    console.log((data.location.localtime.split(" ", 1)).toString());
    // console.log(Date.parse((data.location.localtime.split(" ", 1)).toString("MMMM yyyy")));
    // console.log(Date.parse((data.location.localtime.split(" ", 1)).toString()).toString("MMMM yyyy"));
    // console.log(Date.parse("2024-12-15").toString("MMMM yyyy"));
    // console.log(Date.parse("05/05/2010").toString("MMMM yyyy"));

    let [dayName, month, numOfDay] = getDaynameAndDate(data.location.localtime)
    console.log(dayName);
    console.log(numOfDay);
    console.log(month);
    // } catch (err) {
    //     console.log("q is empty")
    //     console.log(err)
    // }

}
console.log(['aaa'].toString());

console.log("ss ss".split(" ", 1));

getTem3days("london")

function getDaynameAndDate(date) {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const d = new Date(date);
    return [weekday[d.getDay()], month[d.getMonth()], date.split("-", 3)[2].split(" ", 1)[0]];
}