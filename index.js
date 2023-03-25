require("dotenv").config()

const container = document.querySelector('.container')
const search = document.querySelector('.search-box button')
const weatherBox = document.querySelector('.weather-box')
const weatherDetails = document.querySelector('.weather-details')
const error404 = document.querySelector('.not-found')

const func = () => {

    const API_KEY = process.env.API_KEY
    const city = document.querySelector('.search-box input').value

    if(city === '')
        return

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
    .then(response => response.json())
    .then(json => {
        if(json.cod == 404){
            container.style.height = '400px'
            weatherBox.style.display = 'none'
            weatherDetails.style.display = 'none'
            error404.style.display = 'block'
            error404.classList.add('fade-in')
            return
        }

        error404.style.display = 'none'
        error404.classList.remove('fade-in')

        const img = document.querySelector('.weather-box img')
        const temperature = document.querySelector('.temperature')
        const description = document.querySelector('.description')
        const humidity = document.querySelector('.humidity span')
        const wind = document.querySelector('.wind span')

        switch(json.weather[0].main){
            case 'Clear':
                img.src = 'images/clear.png'
                break
            case 'Rain':
                img.src = 'images/rain.png'
                break
            case 'Snow':
                img.src = 'images/snow.png'
                break
            case 'Clouds':
                img.src = 'images/cloud.png'
                break
            case 'Mist':
            case "Haze":
            case "Fog":
                img.src = 'images/mist.png'
                break   
            default:
                img.src = ''
                break     
        }

        temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`
        description.innerHTML = `${json.weather[0].description}`
        humidity.innerHTML = `${json.main.humidity}%`
        wind.innerHTML = `${json.wind.speed.toFixed(1)}km/h`

        weatherBox.style.display = '';
        weatherDetails.style.display = ''
        weatherDetails.classList.add('fade-in')
        weatherBox.classList.add('fade-in')
        container.style.height = '590px'
    })


}

search.addEventListener('click', func)
document.addEventListener("keydown", (event) => {
    if(event.code === 'Enter'){
        func()
    }
})