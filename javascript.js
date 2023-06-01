/* first lets use the API key that we generated before and put it inside of API-URL variable, then the image and 
at the end the serach api.at the end of search-api we put it equal to nothimg and leave it like this*/
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a0814a81d9e0ea8e164320078c18b3cb&page=1';
/*we want to generate the movie image but in order to get each image we need to add this at the begining */
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=a0814a81d9e0ea8e164320078c18b3cb&query="';


/*we bring elements that we Want to manipulate using .document and their ID*/ 
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');


getMovie(API_URL)
/*when making a request to an API ,the response may not be immediate .instead the request is sent and the response 
is received, asynchronously,promises can be used to handle the response of the API request once it is received allowing the code to continue executing 
while waiting for the response.
in order to use the data received in our javascript code ,we need to parse it into a javascript object using the '.jon()'
method-ps:when we want to send data from our client-side javascript to a server we need to convert js object into JSON'
string using the"JSON.stringify()-therefore .json() is used to parse the response and .JSON.stringify is used to convert javascript object
to a JSON string before sending it to a server."*/

async function getMovie(url) {
    const res = await fetch(url);
    const data = await res.json();

    showMovies(data.results);
}


function showMovies(movies){
    main.innerHTML = '';

    movies.forEach(movie => {
        const {title, poster_path, vote_average, overview } = movie
        
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>

            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `

        main.appendChild(movieEl)
    });

}
/*let's set the color of the vote average */
function getClassByRate(vote){
    if(vote >= 8){
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

/* we want to handle the form submission in javascript,first we prevent default actions.
then we set the searchTerm to be the value that we insert in the searchbox.
at the end we create an if statement, if the search term is not a falsey value and it is not an empty string
we run the function getMovie and empty the searchbar.otherwise we just reload the web page.
the default bahavior of the reload is to reload the page from the cache if the cache is not available 
the page will be reload from the server*/
form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value;

    if(searchTerm && searchTerm !== '') {
        getMovie(SEARCH_API + searchTerm)

        search.value = '';
    } else {
        window.location.reload()
    }
})