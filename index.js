const inputField = document.getElementById('input-field');
const btnField = document.getElementById('search-button');
const searchForm = document.getElementById('search-form');
const movieList = document.getElementById('movie-list');
const errorPlaceholder = document.getElementById('errorPlaceholder');
const cardMovie = document.getElementById('card-movie');
const cardMovieBox = document.getElementById('card-movie-box');
const closeBtn = document.getElementById('close-btn');
const key = '1bb85eb';




btnField.addEventListener('click', () => {
    getResults();
});


const getResults = () => {
    let movieTitle = inputField.value
    movieList.innerHTML = `` ;
    errorPlaceholder.innerHTML = `` ;
    fetch(`https://www.omdbapi.com/?s=${movieTitle}&apikey=${key}&`)
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
                <div class="description_flex">
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


const openModal =(event) =>{

    if (!event.target.closest('.search-item')) {
        return
    }

    if (event.target.closest('.search-item')){
        const selectMovie = event.target.closest('.search-item');
        id = selectMovie.getAttribute('id');
        showModalCard(id);
        cardMovieBox.classList.add('active')
        document.body.classList.add('body_off')
    }
    
}

const showModalCard=(id)=> {
    const targetId = id

    fetch(`https://www.omdbapi.com/?&apikey=${key}&i=${targetId}`)
    .then(response => response.json())
    .then((result) => {
        renderModalCard(result)
        }); 
}

const renderModalCard = (result)=>{
    cardMovie.innerHTML = ''
    cardMovie.innerHTML += `
            <div id="${result.imdbID}" class ="search-item-popup">
                <img src="${result.Poster}" alt="${result.Title}">
                <div class="description">
                    <div class="title_movie"> ${result.Title} </div>
                    <div> <span>${result.Year}</span></div>
                    <div> Rating: <span>${result.Rated}</span></div>
                    <div> Released: <span>${result.Released}</span></div>
                    <div> Duration: <span>${result.Runtime}</span></div>
                    <div> Genre: <span>${result.Genre}</span></div>
                    <div> Director: <span>${result.Director}</span></div>
                    <div> Writer <span>${result.Writer}</span></div>
                    <div> Cast: <span>${result.Actors}</span></div>
                    <div> Plot: <span>${result.Plot}</span></div>
                </div>
            </div>`;
    }


const closeModal = (event) => {
    if (!event.target.closest('.close-btn')) {
        return
    }

    if (event.target.closest('.close-btn')){
        cardMovieBox.classList.remove('active');
        document.body.classList.remove('body_off');
      }
}




    movieList.addEventListener('click',openModal);


    closeBtn.addEventListener('click', closeModal);



