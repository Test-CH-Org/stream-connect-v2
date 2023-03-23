const router = require("express").Router();
const { SearchLog } = require("../../models");
require('dotenv').config();

//
router.get("/byActor", async (req, res) => {

    var actorId = await getActorId(req.body.actorName);

    if (isNaN(actorId)) {
        res.status(500).json(actorId);
        return
    }

  const url = `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${process.env.TMDB_KEY}`
  
  const movieData = fetch(url).then(res => {
    return res.json();
  }).then(data => {
    return data.cast;
  })

  movieData.forEach(movie => {
    
  })
    
})

function getActorId(actorName) {
    const url = `https://api.themoviedb.org/3/search/person?api_key=${process.env.TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${encodeURI(actorName)}`;

    return fetch(url).then(function(res) {
        return res.json();
      }).then(function(data) {
        //console.log(data.results[0].id);
        return data.results[0].id;
      })//.then(function(data) {
      .catch (err => {
        return err
      })
}

module.exports = router;