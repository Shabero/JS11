const row = document.querySelector('.row')
const all = document.querySelector('#all')
const search = document.querySelector('#search')
const searchInput = document.querySelector('#searchInput')
const submit = document.querySelector('#submit')
const searchWrapper = document.querySelector('.search-wrapper')

all.addEventListener('change', () => {
    if (all.checked) {
        row.classList.remove('hidden')
        searchWrapper.classList.add('hidden')
        country.classList.add('hidden')
    }
})

search.addEventListener('change', () => {
    if (search.checked) {
        row.classList.add('hidden')
        searchWrapper.classList.remove('hidden')
    }
})


const handleGetCountries = () => {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            data.forEach(country => {
                row.innerHTML += `
                <div class="col-4">
                    <div class="card">
                        <img src="${country.flags.png}" alt="">
                        <div class="card-body">
                            <h3 class="card-title">${country.translations.rus.official}</h3>
                            <p class="card-text">${country.capital}</p>
                        </div>
                    </div>  
                </div>
            `
            })
        })
}

handleGetCountries()


const country = document.querySelector('.country')
const apiKey = 'cc0297641400496380760659230811'

submit.addEventListener('click', () => {
    country.classList.remove('hidden')
    const handleGetNameCountries = () => {
        let nameCountry = searchInput.value
        console.log(nameCountry)
        fetch(`https://restcountries.com/v3.1/name/${nameCountry}`)
            .then(response => response.json())
            .then(data => {
                const result = data[0]
                const capitalCity = result.capital;
                fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${capitalCity}`)
                    .then(weatherResponse => weatherResponse.json())
                    .then(weatherData => {
                        country.innerHTML += `
                        <div class="col-4">
                            <div class="card">
                                <img src="${result.flags.png}" alt="">
                                <div class="card-body">
                                    <h3 class="card-title">${result.name.official}</h3>
                                    <p class="card-text">${result.capital}</p>
                                    <p class="card-text">${weatherData.current.temp_c}°C</p>
                                </div>
                            </div>
                        </div>
                    `;
                    });
            })
    }
    handleGetNameCountries()
})

