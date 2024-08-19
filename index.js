const btnSearch = document.getElementById("btnSearch")

let api_key = 'fcba032d8c9ec51d255042b8748701ef'

let urlPoster = 'https://image.tmdb.org/t/p/w500'

btnSearch.addEventListener("click", function(){
    const searchInput = document.getElementById("searchInput")
    const searchInputValue = searchInput.value


    fetch(`https://api.themoviedb.org/3/search/movie?query=${searchInputValue}&api_key=${api_key}`)
    .then(response => response.json())
    .then(response => showMovie(response.results))
})

function showMovie(movies){
    const resultados = document.getElementById("resultados")
    resultados.innerHTML = ''

    if(movies.length === 0){
        resultados.innerHTML = '<p>No hay resultados</p>'
        return //ES PARA SALIR DE LA FUNCION
    }

    movies.forEach(movie => {
        let movieDiv = document.createElement('div')
        movieDiv.classList.add("movie")
        
        let title = document.createElement("h2")
        title.textContent = movie.title

        let releaseDate = document.createElement("p")
        releaseDate.textContent = "Fecha de lanzamiento: " + movie.release_date

        let overview = document.createElement("p")
        overview.textContent = "Sinopsis: " + movie.overview

        let poster = urlPoster + movie.poster_path
        let posterImg = document.createElement("img")
        posterImg.src = poster

        let watchMovieBtn = document.createElement("button")
        watchMovieBtn.textContent = "Ver película"
        watchMovieBtn.addEventListener("click",function(){
            streamMovie(movie.id)
        })


        movieDiv.appendChild(posterImg)
        movieDiv.appendChild(title)
        movieDiv.appendChild(overview)
        movieDiv.appendChild(releaseDate)

        resultados.appendChild(movieDiv)
    });
}
