const getDataForCountry = country => {
    // fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    axios.get(`https://restcountries.eu/rest/v2/name/${country}`)
        .then(response => {
            console.log(response);
            const countryDetail = response.data[0]
            // set the country name
            document.querySelector('#country-name').innerText = countryDetail.name;
            // set population
            document.querySelector('#country-population').innerText = countryDetail.population;

            document.querySelector('#country-flag')
                .setAttribute('src', countryDetail.flag)
        })
}

document.querySelector('button').onclick = () => {
    const userInput = document.querySelector('#name').value;
    console.log(userInput);
    getDataForCountry(userInput)
}