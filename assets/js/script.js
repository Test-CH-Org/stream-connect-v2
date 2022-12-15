//calling out html elements
var movieContainer = $(".movies-container");
var movieTitle = document.getElementById("movie-title")
var searchInput = document.querySelector("#search_input");
var elems = document.querySelector('.modal');
var historySection = $("#history-container");

//declaring variables, need to be set appropriately for const vs  let, etc etc
var modalInstance;
var searchArray = [];
var searchName = "";
let movies = [];
var actorId = "";
var isActor = 'true';
let page = 1;

const tmdbApiKey = "346f7b7cb4a8eacfd5f60caf07af955f";
const tmdbApiKey2 = "07a0e408a6f100177a7ab70946fb580d";
const rapidApiKey4 = "4de443414emsh4a4ea1571d88c69p17feeajsn6962f58e5c81";
const rapidApiKey2 = "f7d7f2fe88msh572b312c212385cp1f28e8jsn8e41ff9814a4"
const rapidApiKey3 = "0b54f54be9mshd283a791dd6a7cep1ff786jsncc5470d7f2a8"
const rapidApiKey = "286e8fd22cmshfc193cfb03b6790p1afd98jsnea4f9d288275"
const moviePullLimit = 8;
const imageBaseUrl = "https://image.tmdb.org/t/p/original";
const providers = {
  netflix: "/t2yyOv40HZeVlLjYsCsPHnWLk4W.jpg",
  hulu: "/zxrVdFjIjLqkfnwyghnfywTn3Lh.jpg",
  amazon: "/emthp39XA2YScoYL1p0sdbAH2WA.jpg",
  hotstar: "/7Fl8ylPDclt3ZYgNbW2t7rbZE9I.jpg",
  disney: "/7rwgEs15tFwyR9NPQ5vpzxTj19Q.jpg",
  hbo: "/Ajqyt5aNxNGjmF9uOfxArGrdf3X.jpg",
  peacock: "/8VCV78prwd9QzZnEm0ReO6bERDa.jpg",
  paramount: "/xbhHHa1YgtpwhC8lb1NQ3ACVcLd.jpg",
  starz: "/zVJhpmIEgdDVbDt5TB72sZu3qdO.jpg",
  showtime: "/4kL33LoKd99YFIaSOoOPMQOSw1A.jpg",
  apple: "/6uhKBfmtzFqOcLousHwZuzcrScK.jpg",
  mubi: "/bVR4Z1LCHY7gidXAJF5pMa4QrDS.jpg",
  stan: "/rDd7IEBnJB0gPagFvagP1kK3pDu.jpg",
  now: "/cQQYtdaCg7vDo28JPru4v8Ypi8x.jpg",
  crave: "/gJ3yVMWouaVj6iHd59TISJ1TlM5.jpg",
  all_4: "/kJ9GcmYk5zJ9nJtVX8XjDo9geIM.jpg",
  bbc: "/zY5SmHyAy1CoA3AfQpf58QnShnw.jpg",
  britbox: "/aGIS8maihUm60A3moKYD9gfYHYT.jpg",
  zee5: "/ajbCmwvZ8HiePHZaOVEgm9MzyuA.jpg",
  curiosity: "/67Ee4E6qOkQGHeUTArdJ1qRxzR2.jpg",
  findProvider: function (string) {
    
  }
}


  
//---API Functions---//
//Should return an array of movie objects
//String search by Movie Name, function returns and array of movie objects
var getMovie = async function (movieSting) {
  // format the github api Url
  var apiUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + tmdbApiKey + "&language=en-US&query=" + encodeURI(movieSting) + "&page=1&include_adult=false";
// make a request to the url
await fetch(apiUrl).then(function(response){
  response.json().then(function(data){
    //console.log(data,);
    movies = []
    data.results.forEach(function (element, index) {

      var movieObj = {
        title: element.original_title,
        id: element.id,
        poster: element.poster_path,
        overview: element.overview,
        streams: ""
      }
      
      movies.push(movieObj);
      //console.log(movieObj);
      //console.log(movieObj.title, movieObj.id);
    })
    getAllMovieInfo();
  })
});
}

//Search Actor API
//Search actor by name (string), returns the TMDB id of the actor
var searchActorName = async function (name) {
  console.log("Getting Actor Id!")
  //set actorId to blank
  actorId = "";

  var actorName = "https://api.themoviedb.org/3/search/person?api_key=346f7b7cb4a8eacfd5f60caf07af955f&language=en-US&query=" + encodeURI(name) + "&page=1&include_adult=false";
  //console.log(actorName);

  //should return the actorId directly to actorId
 await fetch(actorName).then(function(res) {
        return res.json();
      }).then(function(data) {
        //console.log(data.results[0].id);
        actorId = data.results[0].id;
      })//.then(function(data) {
      .catch (function(err) {
        triggerModal(err);
      })

};

//Search movie by TMDB id, returns a movie object
var getMovieId = function (id) {
  console.log("Getting Ids of movies!");
  const apiUrl = "https://api.themoviedb.org/3/discover/movie?api_key="+tmdbApiKey+"&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_people="+id+"&with_watch_monetization_types=flatrate"
 
  //clear movies in the event of the function being called again
  movies = [];

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      return response.json()
    }
    else {
      //trigger modal
      triggerModal("Something is wrong with the connection. Please try again later");
    }
  }).then(async function (data) {
    //console.log(data);
    //iterate through each element and set data // will need to solve for limits
    data.results.forEach( function (element, index) {

      var movieObj = {
        title: element.original_title,
        id: element.id,
        poster: element.poster_path,
        overview: element.overview,
        streams: ""
      }
      
      movies.push(movieObj);
      
    })

    await getAllMovieInfo();
    console.log(movies);
    return;
  }).then(() => {
    // console.log(movies);
    // var startIndex = page * moviePullLimit - moviePullLimit;
    // var constraint = moviePullLimit * page;
    // //console.log(startIndex, constraint);
    
    // for (var i = startIndex; i < constraint; i++){
    //   console.log("I'm display movies now");
    //   displayMovies(movies[i]);
    // }
  }).catch((err) => triggerModal("We ran into a connectivity issue. Please try again later"))

}

//this has to be replaced with a TMDB equivalent
//retrieves the cast and streaming providers based on movie id and adds that data to the object at the provided index
var getMovieInfo = async function (movieId,index) {
    const options = {
        method: 'GET',
        headers: {
            // 'X-RapidAPI-Key': 'f7d7f2fe88msh572b312c212385cp1f28e8jsn8e41ff9814a4',
            'X-RapidAPI-Key': rapidApiKey,
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    };

    //var movieId = "120";

    var movieInfo = "https://streaming-availability.p.rapidapi.com/get/basic?country=us&tmdb_id=movie%2F" + movieId + "&output_language=en";

    await fetch(movieInfo, options)
        .then(response => response.json())
        .then((data) => {
            //console.log(data.cast);
            //console.log(data.streamingInfo);

            var cast = data.cast;
            var streamingInfo = data.streamingInfo;

          movies[index].overview = cast;
          movies[index].streams = streamingInfo;

          updateStreamInfo(index);
        })
        .catch(err => triggerModal(err));
}


//parameter is the index of the movie in the movies object array
var updateStreamInfo = function (index) {
  //declare empty streams object array
  var streamsObj = []
  //declare array of strings containing the keys of the streaming services
  var streams = Object.keys(movies[index].streams);
  //if length is 0 then set streaming info to null
  if (streams.length === 0) {
    movies[index].streams = null;
    return
  }

  //iterate through each streaming service, setting the name, poster url, and direct link to content
  streams.forEach(function (element) {
    var stream = {
      name: element,
      poster: imageBaseUrl + providers[element],
      link: movies[index].streams[element].us.link
    }
    //push the individual stream info into the streamsObj array
    streamsObj.push(stream);
  })
  
  //replace the streaming info for the current movie
  movies[index].streams = streamsObj;
  return;
  
}

//Handlers and Helper Functions

var submitHandler = async function(event) {
  //console.log($(event.target).attr("data-isActor"));
  //if the target is the search button
 
  if ($(event.target).hasClass("btn")) {
    //get value from input element
  var searchString = $("#search_input").val()
  //check to see if there is input in searcbox, if not pormpt please enter a movie title
  if (!searchString) {
    triggerModal("Please input a valid Actor or Movie in the search field.</p><p>Example inputs are: Tom Cruise, Harry Potter, Bradley Cooper.");
    return;
  }
    
  $("#search_input").val("");
  saveSearch(searchString);
}
  else if ($(event.target).hasClass("history")) { //if the target has the data-isActor attribute
    var temp = isActor;
    isActor = $(event.target).attr("data-isActor");
    var searchString = $(event.target).text();
    console.log("using history");
}
else {
    return;
  }
  
  movieContainer.children().remove();

if (isActor ==='true') { 
  console.log("searching by actor name");
  await searchActorName(searchString);
  console.log("finished searching for actor");
  await getMovieId(actorId);
  console.log("finished getting movie ids");
}
else {
  console.log("getting movie by name!");
  await getMovie(searchString);
  console.log("finished searching by movie name");
}
  // await getAllMovieInfo();
  // console.log("all data is read!");

  // var startIndex = page * moviePullLimit - moviePullLimit;
  // var constraint = moviePullLimit * page;
  // //console.log(startIndex, constraint);
  
  // for (var i = startIndex; i < constraint; i++){
  //   console.log("I'm display movies now");
  //   displayMovies(movies[i]);
  // }
  if (temp) {
    isActor = temp;
  }

  return;

}

//Create a function to accept array of information and movie title parameter
var displayMovies = function (title) {
  
  console.log("Now Displaying ", title.title);
  
  var rowEl = $("<div>")
    .addClass("col s12 l6 white-text row movie")
  
  var moviePosterEl = $("<div>")
    .addClass("movie-poster col s3 l3");
  
  var moviePostImg = $("<img>")
    .attr("src", imageBaseUrl + title.poster)
    .attr("alt", title.title + " Poster");
  moviePosterEl.append(moviePostImg);
  rowEl.append(moviePosterEl);

  var movieTitleEl = $("<div>")
    .addClass("movie-title col s6 l6")
    .text(title.title)
  rowEl.append(movieTitleEl);

  var movieActorsEl = $("<div>")
    .addClass("other-actors col s6 l6")
    .text("Cast: " + title.overview)
  rowEl.append(movieActorsEl);

  var streamServicesEl = $("<div>")
    .addClass("streaming-services col s3 l3")

  var streamsObj = title.streams

  if (streamsObj) {
    //var streamsObj = title.streams
    console.log(streamsObj);

    streamsObj.forEach(function (service) {
      var streamEl = $("<a>")
        .addClass(service.name)
        .attr("href", service.link)
        .attr("target", "_blank");
    
      var streamImgEl = $("<img>")
        .attr("src", service.poster)
        .attr("alt", service.name + " Icon")
    
      streamEl.append(streamImgEl);
      streamServicesEl.append(streamEl);
    })
  }
  
  rowEl.append(streamServicesEl);
  
  movieContainer.append(rowEl);

};

var getAllMovieInfo = async function () {
  console.log("Gathering Streaming Info for all movies");
  var startIndex = page * moviePullLimit - moviePullLimit;
  var constraint = moviePullLimit * page;
  //console.log(startIndex, constraint);
  
  for (var i = startIndex; i < constraint; i++){
    console.log(movies[i].id)
    await getMovieInfo(movies[i].id, i);
    displayMovies(movies[i]);
  }
}

var triggerModal = function (message) {
  message = "<h4>Oops! Something went wrong!</h4><p>" + message;
  $('.modal-content').html(message);
    modalInstance = M.Modal.init(elems, { dismissible: false });
}

//Populate Search History under History Tab- track what the search input was, if actor was true or false (was it an actor or movie search)

//Save Search Values

var saveSearch = function (search) {
  
  var searchObj = {
    search: search,
    isActor: isActor
  };
  console.log(searchObj);
  buttonCreator(searchObj);
  searchArray.push(searchObj);
  if (searchArray.length > 14) {
    searchArray.slice(0, 1);
    $(".history:first-child").remove();
  }
  localStorage.setItem("searchName", JSON.stringify(searchArray));
};

//Load Search Value (color-code button for actor v. movie??)

var loadSearch = function () {
  searchArray = JSON.parse(localStorage.getItem("searchName"));
  historySection.children().remove();
  if (searchArray === null){
    searchArray = [];
    return
  };
  searchArray.forEach(function(element){
    buttonCreator(element);
  });
};

//Storage of History

var buttonCreator = function (saveData) {
  // const element = saveData[0];
  var button = $("<p>")
  .text(saveData.search)
  .addClass("history")
  .attr("data-isActor",saveData.isActor);
  //console.log(button);
  historySection.append(button);
};

//---Window Handling---//

$(".switch").on("change", function (event) {
  
  if (isActor === 'true') {
    isActor = 'false';
  }
  else {
    isActor = 'true';
  }
})

//Handles Tabs - Materialize
document.addEventListener('DOMContentLoaded', function () {
    var options = {
        edge: "left"
    };
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);    
  });
//initialize tabs
$(document).ready(function(){
    $('.tabs').tabs();
}); 

$("nav").on("click", submitHandler);
  
$('#exit-modal').on('click', function () {
  modalInstance.destroy();
})

$(window).ready(function(){
  loadSearch();
})

