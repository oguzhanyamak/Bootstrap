//Api genel bilgileri
const url = 'https://api.openweathermap.org/data/2.5/'
const key = ''

//Arama butonu olomadığından 'Enter'üzerinden tetiklenmektedir.
const searchBar = document.getElementById('searchBar')
searchBar.addEventListener('keypress',setQuery)

//Bayrak resmini eklemek için genel olarak tanımlanmıştır.
const city = document.querySelector('.city')

function setQuery(e){
    // 'Enter' a basılma kontrolü
    if(e.keyCode == '13'){
        getResult(searchBar.value)
    }
}

function getResult(cityName){
    //OpenWeatherApi isteği 
    let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`
    fetch(query)
    .then(weather => {
        return weather.json()
    })
    .then(displayResult)
}

function displayResult(result){
    //Gelen ülke kodu ile bayrak sembolünü getirme işlemi
    getCountryFlag(result.sys.country)
    
    //OpenWeatherApi üzerinden gelen değerlerin ekrana geçilmesi
    city.innerText = `${result.name}`

    let temp = document.querySelector('.temp')
    temp.innerText = `${Math.round(result.main.temp)} °C `

    let desc = document.querySelector('.desc')
    desc.innerText = `${result.weather[0].description}`

    let minmax = document.querySelector('.minmax')
    minmax.innerText = (`${Math.round(result.main.temp_min)} °C / ${Math.round(result.main.temp_max)} °C`)
}

function getCountryFlag(Country){
    //Bayrak sembolünün getirilmesi
    let query = `https://countryflagsapi.com/png/${Country}`
    fetch(query)
    .then( res => {return res.blob()})
    .then(blob => {
        var img = URL.createObjectURL(blob);
        const flag = document.createElement('img');
        flag.setAttribute('src',img)
        flag.classList.add('flag');
        city.appendChild(flag)
    })
}