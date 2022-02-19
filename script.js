'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const getJSON = function(url, errorMsg = 'Something went wrong'){
    return fetch(url)
    .then((response) => {
        //console.log(response)
        if(!response.ok) 
            throw new Error(`${response.status} ${errorMsg}`)
        return response.json()
    })
}



///////////////////////////////////////

//old school way
/* const getCountryData = function (country) {

    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.eu/rest/v2/name/${country}?fullText=true`)
    request.send()

    request.addEventListener('load', function () {
        const [data] = JSON.parse(this.responseText)
        console.log(data)

        const html = `
            <article class="country">
                <img class="country__img" src="${data.flag}" />
                <div class="country__data">
                    <h3 class="country__name">${data.name}</h3>
                    <h4 class="country__region">${data.region}</h4>
                    <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
                    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
                </div>
            </article>
        `;

        countriesContainer.insertAdjacentHTML('beforeend', html)
        countriesContainer.style.opacity = 1;
    })

}

getCountryData('india');
getCountryData('usa')
getCountryData('france') */

// Callback Hell
/* const renderCountry = function (data, className = '') {
    const html = `
            <article class="country ${className}">
                <img class="country__img" src="${data.flag}" />
                <div class="country__data">
                    <h3 class="country__name">${data.name}</h3>
                    <h4 class="country__region">${data.region}</h4>
                    <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
                    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
                </div>
            </article>
        `;

    countriesContainer.insertAdjacentHTML('beforeend', html)
    countriesContainer.style.opacity = 1;
}


const getCountryAndNeighbour = function (country) {
    //AJAX call to country 1
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.eu/rest/v2/name/${country}?fullText=true`)
    request.send()

    request.addEventListener('load', function () {
        const [data] = JSON.parse(this.responseText)
        console.log(data)
        //render country 1
        renderCountry(data);

        //get neighbour country(2)
        const neighbour = data.borders[3]

        if(!neighbour) return;
        //AJAX call to country 2
        const request2 = new XMLHttpRequest();
        request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`)
        request2.send()

        request2.addEventListener('load', function(){
            const neighbourData = JSON.parse(this.responseText)
            console.log(neighbourData)

            //render country 2
            renderCountry(neighbourData, 'neighbour');

        })

    })
}

getCountryAndNeighbour('india'); */

// fetch API
// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.eu/rest/v2/name/${country}?fullText=true`)
// request.send()

const renderCountry = function (data, className = '') {
    const html = `
            <article class="country ${className}">
                <img class="country__img" src="${data.flag}" />
                <div class="country__data">
                    <h3 class="country__name">${data.name}</h3>
                    <h4 class="country__region">${data.region}</h4>
                    <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
                    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
                </div>
            </article>
        `;

    countriesContainer.insertAdjacentHTML('beforeend', html)
    countriesContainer.style.opacity = 1;
};

// const getCountryData = function(country){
//     const request = fetch(`https://restcountries.eu/rest/v2/name/${country}?fullText=true`)
//     .then(function(response){
//         console.log(response)
//         return response.json();
//     }).then(function(data){
//         console.log(data)
//         renderCountry(data[0])
//     })
// }

/* const renderError = function(msg){
    countriesContainer.insertAdjacentText('beforeend', msg)
    //countriesContainer.style.opacity = 1;
}

const getJSON = function(url, errorMsg = 'Something went wrong'){
    return fetch(url)
    .then((response) => {
        console.log(response)
        if(!response.ok) 
            throw new Error(`${response.status} ${errorMsg}`)
        return response.json()
    })
}

const getCountryData = function(country){
    //country 1
    getJSON(`https://restcountries.eu/rest/v2/name/${country}?fullText=true`, 'Country not found!')
    .then((data) => { 
        renderCountry(data[0]);
        const neighbour = data[0].borders[3]
        if(!neighbour) throw new Error('No neighbour found!');
        //country 2
        return getJSON(`https://restcountries.eu/rest/v2/alpha/${neighbour}`, 'Country not found!')
    })
    .then((data) => renderCountry(data, 'neighbour'))
    .catch(err => {
        console.error(`${err} 😖😖😖`);
        renderError(`Something went wrong 😖😖😖 
        ${err.message}. Try again!`)
    })
    .finally(() => {
        countriesContainer.style.opacity = 1
    })
} */


// const getCountryData = function(country){
//     //country 1
//     fetch(`https://restcountries.eu/rest/v2/name/${country}?fullText=true`)
//     .then((response) => {
//         console.log(response)

//         if(!response.ok) 
//             throw new Error(`${response.status} Country not found!`)

//         return response.json()
//     })
//     .then((data) => { 
//         renderCountry(data[0]);
//         //const neighbour = data[0].borders[3]
//         const neighbour = 'fgbfes'
//         if(!neighbour) return;
//         //country 2
//         return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`)
//     })
//     .then((response) => {
//         if(!response.ok) 
//             throw new Error(`${response.status} Country not found!`)
//         return response.json()
//     })
//     .then((data) => renderCountry(data, 'neighbour'))
//     .catch(err => {
//         console.error(`${err} 😖😖😖`);
//         renderError(`Something went wrong 😖😖😖 
//         ${err.message}. Try again!`)
//     })
//     .finally(() => {
//         countriesContainer.style.opacity = 1
//     })
// }

/* btn.addEventListener('click', function(){
    getCountryData('australia')
}) */

// getCountryData('fjhvskjfs')

// Event loop
/* console.log('Test start');
setTimeout(()=> console.log("0 sec timer"), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));
Promise.resolve('Resolved promise 2').then(res => {

    for(let i=0; i< 1000; i++){

    }
    console.log(res)
})

console.log('Test end') */

//building a simple promise

/* const lotteryPromise = new Promise(function(resolve, reject){
    console.log('Lottery draw is happening!!!!')
    setTimeout(function(){
        if(Math.random() >= 0.5){
            resolve('You WIN!!!')
        } else {
            reject(new Error ('You Loose!!!'))
        }
    }, 2000)
})

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err))

//Promisifying setTimeout
const wait = function(seconds) {
    return new Promise(function(resolve){
        setTimeout(resolve, seconds * 1000)
    })
}

wait(2).then(()=> {
    console.log('I waited for 2 seconds')
    return wait(1)
}).then(()=>{
    console.log('I waited again for 1 second')
})

Promise.resolve('abc').then(x => console.log(x))
Promise.reject('abc').catch(x => console.error(x)) */

/* navigator.geolocation.getCurrentPosition(
    position => console.log(position),
    err => console.log(err)
)
console.log('Getting position') */

/* const getPosition = function(){
    return new Promise(function(resolve, reject){
        // navigator.geolocation.getCurrentPosition(
        //     position => resolve(position),
        //     err => reject(err)
        // )
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

getPosition().then(pos => console.log(pos))

const whereAmI = function () {

    getPosition().then(pos => {
        const {latitude: lat, longitude: lng} = pos.coords;
        return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    })    
        .then((response) => {
            if (!response.ok) throw new Error(`You have exceeded max number of request. Try again later!`);
            return response.json()
        })
        .then((data) => {
            console.log(data)
            if (!data) return;
            console.log(`You are in ${data.state}, ${data.country}`)
            return fetch(`https://restcountries.eu/rest/v2/name/${data.country}?fullText=true`)
        })
        .then((response) => {
            if (!response.ok)
                throw new Error(`${response.status} Country not found!`)
            return response.json()
        })
        .then((data) => {
            renderCountry(data[0]);
        })
        .catch((err) => console.log(`Something went wrong!, ${err.message}`))
}

btn.addEventListener('click', whereAmI)  */

// Async/await

// const renderError = function(msg){
//     countriesContainer.insertAdjacentText('beforeend', msg)
//     countriesContainer.style.opacity = 1;
// }

// const getPosition = function(){
//     return new Promise(function(resolve, reject){
//         // navigator.geolocation.getCurrentPosition(
//         //     position => resolve(position),
//         //     err => reject(err)
//         // )
//         navigator.geolocation.getCurrentPosition(resolve, reject)
//     })
// }


// const whereAmI = async function(){

//     try{
//         //Geolocation
//         const pos = await getPosition()
//         const {latitude: lat, longitude: lng} = pos.coords;
//         //Reverse Geocaoding
//         const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//         if(!resGeo.ok) throw new Error('Problem getting location data');
//         const dataGeo = await resGeo.json()
//         //Country data
//         const res = await fetch(`https://restcountries.eu/rest/v2/name/${dataGeo.country}?fullText=true`);
//         if(!res.ok) throw new Error('Problem getting country data');
//         const data = await res.json();
//         renderCountry(data[0]);

//         return `You are in ${dataGeo.city}, ${dataGeo.country}`
//     } catch(err){
//         console.error(`${err} 😥`)
//         renderError(`😥 ${err.message}`)

//         //Reject promise returned from async function
//         throw err;
//     }
// }
//console.log('1. will get location');
// const city = whereAmI();
// console.log(city)

// whereAmI().then(city => console.log(city))
// .catch(err => 
//     console.error(`Unable to fetch data ${err.message}`)
// )
// .finally(()=>{
//     console.log('3. Finished getting location')

// })

// (async function(){
//     try{
//         const city = await whereAmI();
//         console.log(city)
//     } catch(err){
//         console.error(`Unable to fetch data ${err.message}`)
//     }
//     console.log('Finished getting location')
// })();

// promises in parallel

// const get3countries = async function(c1, c2, c3){
//     try{
//         // const [data1] = await getJSON(`https://restcountries.eu/rest/v2/name/${c1}?fullText=true`);
//         // const [data2] = await getJSON(`https://restcountries.eu/rest/v2/name/${c2}?fullText=true`);
//         // const [data3] = await getJSON(`https://restcountries.eu/rest/v2/name/${c3}?fullText=true`);
    
//         const data = await Promise.all([
//             getJSON(`https://restcountries.eu/rest/v2/name/${c1}?fullText=true`),
//             getJSON(`https://restcountries.eu/rest/v2/name/${c2}?fullText=true`),
//             getJSON(`https://restcountries.eu/rest/v2/name/${c3}?fullText=true`)
//         ])

//         console.log(data.map(d => d[0].capital))
//         //console.log([data1.capital, data2.capital, data3.capital])
//     } catch(err){
//         console.error(err)
//     }
// }
// get3countries('india','canada','france')


//Promise combinator

//Promise.race
/* (async function(){
    const res = await Promise.race([
        getJSON(`https://restcountries.eu/rest/v2/name/italy?fullText=true`),
        getJSON(`https://restcountries.eu/rest/v2/name/india?fullText=true`),
        getJSON(`https://restcountries.eu/rest/v2/name/france?fullText=true`)
    ])

    console.log(res[0])
})(); */

//Promise.any
// Promise.any([
//     Promise.reject('Success'),
//     Promise.reject('Error'),
//     Promise.reject('Another success')
// ])
// .then(Res => console.log(Res))
// .catch(err => console.error(err))
