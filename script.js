//Dom
const search = document.querySelector('#search');
const city = document.querySelector('#city');
const showDate = document.querySelector('#date');
const temp = document.querySelector('#temp');
const cloud = document.querySelector('#cloud');
const highLow = document.querySelector('#hi_low');


const url = {
    base:'https://api.openweathermap.org/data/2.5/',
    key:'appid=374717bdbe8d3da318b86bbb61d909b6'
}

const weatherUrl = url.base + 'weather?units=metric&' + url.key;

//fetch api function
function fetchApi(url, q) {
    let path = url + q;
    fetch(path)
        .then(res => res.json())
        .then(data => { displayResult(data), console.log(data) })
        .catch(err => console.log(err));
}

//display result
function displayResult(data) {
    city.innerHTML='';
    city.innerHTML = `${data.name},${data.sys.country}`;
    temp.innerHTML = '';
    temp.innerHTML = `${data.main.temp.toFixed(0)}⚬ C`;
    highLow.innerHTML = '';
    highLow.innerHTML = `${Math.ceil(data.main.temp_min)}⚬ C / ${Math.ceil(data.main.temp_max)}⚬ C`;
    const date = new Date();
    const d = date.getDate();
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wenesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    showDate.innerHTML = '';
    showDate.innerHTML = `${days[day]} ${d} ${months[month]} ${year}`;

    cloud.innerHTML = '';
    cloud.innerHTML = `${data.weather[0].main}`;

}

//Input Event Listener
search.addEventListener('keypress' , (e) => {
    if (e.keyCode === 13) // enter keycode is 13 
    {
        let val = e.target.value;
        if (val) {
            let query = '&q=' + val;
            fetchApi(weatherUrl,query)
        }
    }
})


//window load put default data
window.addEventListener('load', () => {
    let val = 'Myitkyina';
    let q = '&q='+val;
    fetchApi(weatherUrl, q);
})