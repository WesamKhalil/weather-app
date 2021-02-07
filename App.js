import React, {useState, useEffect} from 'react'
import './styles.css'

const apiKey = '21975f4aeaed6ecd1e238f5f6a61cebd'
const apiUrl = 'https://api.openweathermap.org/data/2.5/'

function App() {

    const [query, setQuery] = useState('London')
    const [weather, setWeather] = useState({})

    const search = evt => {

        if(evt.key === 'Enter') {
            fetch(`${apiUrl}weather?q=${query}&units=metric&appid=${apiKey}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setQuery('')
                    setWeather(data)
                })
        }
    }

    useEffect(() => {
        fetch(`${apiUrl}weather?q=london&units=metric&appid=${apiKey}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setQuery('')
                setWeather(data)
            })
    }, [])

    const coldWarm = () => {
        if(weather.main && weather.main.temp > 16) {
            return 'app warm'
        } else {
            return 'app'
        }
    }

    return (
        <div className={coldWarm()}>
            <main>
                <div className="search-box">
                    <input 
                        type="text"
                        className="search-bar"
                        placeholder="Search..."
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                    />
                </div>
                <div className="location-box">
                    <div className="location">{weather.name ? `${weather.name}, ${weather.sys.country}` : ''}</div>
                    <div className="date">{Date().toString().slice(0, 16)}</div>
                </div>
                <div className="weather-box">
                    <div className="temp">
                        {weather.main ? Math.round(weather.main.temp) + '°C': ''}
                    </div>
                    <div className="weather">
                        {weather.weather ? weather.weather[0].main : ''}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default App
