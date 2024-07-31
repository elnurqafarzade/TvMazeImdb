const mazeAPI = "https://api.tvmaze.com/shows";
let movieDiv = document.getElementById("MovieDiv");
let searchInput = document.getElementById("searchInput");
let searchForm = document.getElementById("searchForm");
let genreSelect = document.getElementById("GenreSelect");
let imdbRate = document.getElementById("imdbRate");
let movies = [];
let allGenres =[];
let allImdb =[];

fetch(mazeAPI)
    .then(response => response.json())
    .then(data => {
            movies = data;
            displayMovies(movies);

            movies.forEach(movie => {
                movie.genres.forEach(genre => {
                allGenres.push(genre);
                })
            });
            
                let uniqueGenres = allGenres.filter((value, index,array) => array.indexOf(value) ===index).sort();

                CreateOptions(uniqueGenres);    
                
                movies.forEach(movie => {
                    if (movie.rating.average) {
                        allImdb.push(movie.rating.average);
                    }
                });
                
                let ratings = allImdb.filter((value, index, array) => array.indexOf(value) === index).sort();
                   
                Imdb(ratings);   
                
                 
    });   

    
    function CreateOptions(options){
        options.forEach(uniqueGenre => {
            let option = document.createElement("option");
            option.value = uniqueGenre;
            option.innerText = uniqueGenre;
            genreSelect.appendChild(option);
        })      

    };

    function Imdb(options) {
        options.forEach(ratings => {
            let option = document.createElement("option");
            option.value = ratings;
            option.innerText = ratings;
            imdbRate.appendChild(option);  
        });
    }

    genreSelect.addEventListener("change", function(){
        if(genreSelect.value != "")
            {
                let filteredByGenres = movies.filter(movie => movie.genres.includes(genreSelect.value))
                displayMovies(filteredByGenres);
            }
        else
        {
            displayMovies(movies);
        }

    });

    imdbRate.addEventListener("change", function () {
        if (imdbRate.value != "") {
            let imdbfilter = movies.filter(movie => movie.rating.average == imdbRate.value);
            displayMovies(imdbfilter);
        } else {
            displayMovies(movies);
        }
    });

    searchForm.addEventListener("submit", function(e){
            e.preventDefault();

            let movieName = searchInput.value.toLowerCase();

            let filteredMovies = movies.filter(movie => movie.name.toLowerCase().includes(movieName));

            displayMovies(filteredMovies);



    });


    function displayMovies(movies){
        movieDiv.innerHTML="";
        movies.forEach(movie => {
            movieDiv.innerHTML += `
                <div class="col-md-3 mb-4">
                    <div class="card" style="width: 18rem;">
                        <img src="${movie.image.medium}" class="card-img-top" alt="${movie.name}">
                        <div class="card-body">
                          <h5 class="card-title">${movie.name}</h5>
                          <p class="card-text">Premiere: ${movie.premiered}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item">Language: ${movie.language}</li>
                          <li class="list-group-item">Genres: ${movie.genres}</li>
                          <li class="list-group-item">Rating: ${movie.rating.average}</li>
                        </ul>
                        <div class="card-body">
                            <a href="${movie.officialSite}" class="btn btn-primary" target="_blank">Go to website</a>
                            <button class="btn btn-success" onclick="window.location.href='detail.html?id=${movie.id}'">Go to details</button>
                        </div>
                    </div>
                </div>`;



        });
    };
