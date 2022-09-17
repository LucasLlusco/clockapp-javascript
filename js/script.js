const getQuote = async () => {
    try {
        const res = await fetch("https://programming-quotes-api.herokuapp.com/Quotes/random");
        const data = await res.json() 
        const author = data.author; 
        const quote = data.en; 
        displayQuote(author, quote)
    } catch (error) {
        console.log(error) 
    }
}
const displayQuote = async (author, quote) => {
    document.querySelector(".quote-author").innerHTML = `${author}`;
    document.querySelector(".quote-text").innerHTML = `"${quote}"`;
}
document.getElementById("refreshBtn").addEventListener("click", getQuote)

getQuote() 

const getLocationDetails = async () => {
    try {
        const res = await fetch("https://api.ipbase.com/v1/json/?apikey=444a35f0-99ab-11ec-b4af-4bdc71d09ea9");
        const data = await res.json() 
        
        const timeZone = data.time_zone; 
        const city = data.city;
        const country = data.country_code; 
        getTimeDetails(timeZone, city, country)
    } catch (error) {
        console.log(error)
    }
}

const getTimeDetails = async (locationTimeZone, locationCity, locationCountry) => {
    const timeZone = locationTimeZone;
    const city = locationCity; 
    const country = locationCountry; 
    try {
        const res = await fetch(`http://worldtimeapi.org/api/timezone/${timeZone}`);
        const data = await res.json() 
        const abbreviation = data.abbreviation;
        const dayOfWeek = data.day_of_week;
        const dayOfYear = data.day_of_year;
        const weekNumber = data.week_number;
        const dateTime = data.datetime;

        const details = [abbreviation, dayOfWeek, dayOfYear, weekNumber, timeZone, dateTime, city, country];
        displayDetails(details)

    } catch (error) {
        console.log(error)
    }
}

const displayDetails = async (details) => {
    document.getElementById("areaText").innerHTML = `in ${details[6]}, ${details[7]}`
    document.getElementById("utc").innerHTML = `${details[0]}`;
    document.querySelector(".current-timeZone").innerHTML = `${details[4].replaceAll("/", "-")}`

    document.querySelector('.dayOfYear').innerHTML = `${details[2]}`;
    document.querySelector('.dayOfWeek').innerHTML = `${details[1]}`;
    document.querySelector('.weekNumber').innerHTML = `${details[3]}`;
}
getLocationDetails() 

const btnExpand = document.getElementById("expandBtn");
btnExpand.addEventListener("click", () => {
    document.querySelector(".quote-content").classList.toggle("hidden");
    document.querySelector(".expanded-section").classList.toggle("hidden");
    document.querySelector(".main-section").classList.toggle("expand-active");
    document.querySelector('.fa-chevron-circle-down').classList.toggle('fa-flip-vertical');

    const btnText = document.getElementById("expandBtn").firstElementChild.textContent;
    if (btnText === "more") { 
        document.getElementById("expandBtn").firstElementChild.innerHTML = "less"
    } else { 
        document.getElementById("expandBtn").firstElementChild.innerHTML = "more"
    }
})


const displayTime = () => {
    const today = new Date(); 
    const hours = today.getHours(); 
    const minutes = today.getMinutes(); 

    const greetingText = document.getElementById("greetingText");

    if (hours >= 5 && hours < 12) { 
        greetingText.innerHTML = `<img src="images/desktop/icon-sun.svg" alt="sun-svg"><span>good morning<span class="staticText">, it's currently</span></span>`
        document.querySelector("main").classList.remove("night-time-bg");

    } else if (hours >= 12 && hours < 18) {
        greetingText.innerHTML = `<img src="images/desktop/icon-sun.svg" alt="sun-svg"><span>good afternoon<span class="staticText">, it's currently</span></span>`
        document.querySelector("main").classList.remove("night-time-bg");
    } else { 
        greetingText.innerHTML = `<img src="images/desktop/icon-moon.svg" alt="sun-svg"><span>good evening<span class="staticText">, it's currently</span></span>`
        document.querySelector("main").classList.add("night-time-bg");
    }

    const hrs = addZero(hours);
    const mins = addZero(minutes);
    const time = `${hrs}:${mins}`;
    document.getElementById("timeText").firstElementChild.innerHTML = time; 
}              
const addZero = (num) => {
    num = String(num);
    while (num.length < 2) num = "0" + num; 
    return num 
}
displayTime() 
setInterval(displayTime, 10000); 

