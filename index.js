const inputField = document.getElementById('input-field');
const btnField = document.getElementById('search-button');
const searchForm = document.getElementById('search-form');
const movieList = document.getElementById('movie-list');
const errorPlaceholder = document.getElementById('errorPlaceholder');
const cardMovie = document.getElementById('card-movie');
const cardMovieBox = document.getElementById('card-movie-box');
const closeBtn = document.getElementById('close-btn');




btnField.addEventListener('click', () => {
    getResults();
});


const getResults = () => {
    let movieTitle = inputField.value
    movieList.innerHTML = `` ;
    errorPlaceholder.innerHTML = `` ;
    fetch(`https://www.omdbapi.com/?s=${movieTitle}&apikey=1bb85eb&`)
    .then((response) => {
        return response.json()
    })
    
    .then((result) => {
        let errors = result.Response
        let errorMessage = result.Error

        if ((inputField.value === '' || inputField.value == null)) {
            errorPlaceholder.innerHTML = `<p class="error-message">Please enter movie name.</p>`
        }   else if (errors != 'False') {

        let movies = result.Search;
        movies.forEach(e => {
            const title = e.Title;
            const year = e.Year;
            const imdbID = e.imdbID;
            const type = e.Type;
            const poster = e.Poster
            movieList.innerHTML += `
            <div id="${imdbID}" class ="search-item">
                <div class="descr">
                    <div class="description">
                    <img src="${poster}" alt="${title}">
                    </div>
                    <div class="description"> 
                        <div> ${title} </div>
                        <div> ${year} </div>
                        <div> ${type} </div> 
                    </div>  
                </div>
            </div>`;
        });
        inputField.value = "";
    } else {
        errorPlaceholder.innerHTML = `<p class="error-message">${errorMessage}</p>`
        inputField.value = "";
    }          
    })
}


movieList.addEventListener('click', (e) => {
    cardMovie.innerHTML = "";
    cardMovieBox.classList.add('active')
    document.body.classList.add('body_off')
    const target = e.target.closest(".search-item");
    
    const targetId = target.id;

    fetch(`https://www.omdbapi.com/?&apikey=1bb85eb&i=${targetId}`)
    .then((response) => {
        return response.json()
    })

    .then((result) => {
        let title = result.Title;
        let year = result.Year;
        let rated = result.Rated;
        let released = result.Released;
        let runtime = result.Runtime;
        let genre = result.Genre;
        let director = result.Director;
        let writer = result.Writer;
        let actors = result.Actors;
        let plot = result.Plot;
        let poster = result.Poster;
        let imdbID = result.imdbID;
    
        cardMovie.innerHTML += `
            <div id="${imdbID}" class ="search-item-popup">
                <img src="${poster}" alt="${title}">
                <div class="description">
                    <div> ${title} </div>
                    <div> <span>${year}</span></div>
                    <div> Rating: <span>${rated}</span></div>
                    <div> Released: <span>${released}</span></div>
                    <div> Duration: <span>${runtime}</span></div>
                    <div> Genre: <span>${genre}</span></div>
                    <div> Director: <span>${director}</span></div>
                    <div> Writer <span>${writer}</span></div>
                    <div> Cast: <span>${actors}</span></div>
                    <div> Plot: <span>${plot}</span></div>
                </div>
            </div>`;
    })
    
})


closeBtn.addEventListener('click', () => {
   cardMovieBox.classList.remove('active');
   document.body.classList.remove('body_fix');
})
