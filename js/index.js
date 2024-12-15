const apiKey = "99d1b81d78f84f8aa6b190224240912"
let searchBar = document.getElementById("searchBar");
let tempcalender = document.getElementById("tempcalender");

searchBar.addEventListener("keyup", () => {
    if (searchBar.value != "" || searchBar.value.length > 2) {
        getTem3days(searchBar.value)
    }
})
navigator.geolocation.getCurrentPosition(async (position) => {
    Your_API_Access_Token = 'pk.3a33c1aa8eaa54c3d139ffefb3675ced'
    let response = await fetch(`https://us1.locationiq.com/v1/reverse?key=${Your_API_Access_Token}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&`);
    let data = await response.json()
    console.log(data.address.city);
    localStorage.setItem("UserAddres", JSON.stringify(data.address.city))
})
console.log(localStorage.getItem("UserAddres"));
getTem3days(localStorage.getItem("UserAddres"));

async function getTem3days(searchValue) {
    try {
        console.log(apiKey);
        console.log(searchValue);

        let api = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${searchValue}&days=3`);
        let data = await api.json();
        //getDaynameAndDate
        let [dayNameToday, monthName, numOfDayToday] = getDaynameAndDate(data.location.localtime)
        let [dayNameTomorrow, , numOfDayTomorrow] = getDaynameAndDate(data.forecast.forecastday[1].date)
        let [dayNameAfterTomorrow, , numOfDayAfterTomorrow] = getDaynameAndDate(data.forecast.forecastday[2].date)

        calender = `
    <div id="today" class="card mt-5">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <span>${dayNameToday}</span>
                        <span>${numOfDayToday} ${monthName}</span>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${data.location.name}</h5>
                        <span class="card-text d-lg-block">${data.current.temp_c}<sup>o</sup>C</span>
                        <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">
                        <p class="states">${data.current.condition.text}</p>
                        <div class="cardFooter">
                            <span class="px-2"><img src="weather/icon-umberella@2x.png" alt="umberella"> 20%</span>
                            <span class="px-2"><img src="weather/icon-wind@2x.png" alt="umberella"> 18km/h</span>
                            <span class="px-2"><img src="weather/icon-compass@2x.png" alt="umberella"> East</span>
                        </div>
                    </div>
                </div>
                <!--------------------------------------------------------------------->
                <div id="tomorrow" class="card middle-card text-center mt-lg-5">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <span>${dayNameTomorrow}</span>
                        <span>${numOfDayTomorrow} ${monthName}</span>
                    </div>
                    <div class="card-body">
                        <img src="${data.forecast.forecastday[1].day.condition.icon}" alt="${data.forecast.forecastday[1].day.condition.text}">
                        <p class="card-text d-lg-block mb-0">${data.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>c</p>
                        <p class="card-text d-lg-block">${data.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></p>
                        <p class="states">${data.forecast.forecastday[1].day.condition.text} Cloudy</p>
                    </div>
                </div>
                <!--------------------------------------------------------------------->
                <div id="aftertomorrow" class="card text-center mt-lg-5">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <span>${dayNameAfterTomorrow}</span>
                        <span>${numOfDayAfterTomorrow} ${monthName}</span>
                    </div>
                    <div class="card-body">
                        <img src="${data.forecast.forecastday[2].day.condition.icon}" alt="${data.forecast.forecastday[2].day.condition.text}">
                        <p class="card-text d-lg-block mb-0">${data.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>c</p>
                        <p class="card-text d-lg-block">${data.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></p>
                        <p class="states">${data.forecast.forecastday[2].day.condition.text} Cloudy</p>
                    </div>
                </div>`
        tempcalender.innerHTML = calender;

    } catch (err) {
        console.log("q is empty")
    }
}
function getDaynameAndDate(date) {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const d = new Date(date);
    return [weekday[d.getDay()], month[d.getMonth()], date.split("-", 3)[2].split(" ", 1)[0]];
}





