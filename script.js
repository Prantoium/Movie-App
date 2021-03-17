const apiUrl =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const imgPath = "https://image.tmdb.org/t/p/w1280";
const searchApi =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const main = document.querySelector("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

    
getMovies(apiUrl);
async function getMovies(Url) {
    const resp = await fetch(Url) ; 
     const respData =await resp.json();
    console.log(respData);
    
    showMovies(respData.results);
  
    
}
function showMovies(movies) { 
    main.innerHTML = "";
 
      movies.forEach((movie) => {
      const movieE1 = document.createElement("div");
      movieE1.classList.add("movie");
      movieE1.innerHTML = `
        <img src="${imgPath + movie.poster_path}" alt="Movie Poster">
        <div class="movie-info">
            <h3>${movie.title}</h3>
            <span class="${getClassByRate(movie.vote_average)}">${
        movie.vote_average
      }</span>
        </div>
         <div class="overview">
                <h3>Overview:</h3>
                ${movie.overview}
            </div>
    `;
      main.appendChild(movieE1);
     
    });
 }
function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    if (searchTerm) {
        getMovies(searchApi+searchTerm);
        search.value = "";
  }
    else {
      main.innerText="No search results.Type movie name correctly and search again!"
  }
    
});