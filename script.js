const row = document.querySelector('#row');
const all = document.querySelector('#all');
const search = document.querySelector('#search');
const searchBox = document.querySelector('#search-wrapper')
const searchInput = document.querySelector('#searchInput')
const submit = document.querySelector('#submit')

const handleGetCountries = () => {
    fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => {
            data.forEach(country => {
                row.innerHTML += `
            <div class="col-4">
                <div class="card">
                    <img src="${country.flags.png}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${country.translations.rus.official}</h5>
                        <p class="card-text">${country.capital}</p>
                    </div>
                </div>
            </div>
            `
            })
        })
}

all.addEventListener('change', () => {
    if (all.checked) {
        row.classList.remove('hidden')
        searchBox.classList.add('hidden')
    }
})

search.addEventListener('change', () => {
    if (search.checked) {
        row.classList.add('hidden')
        searchBox.classList.remove('hidden')
    }
})

handleGetCountries()
