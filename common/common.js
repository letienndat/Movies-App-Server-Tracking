const { genresList } = require("../common/appConstants");

function getGenreNameById(id) {
  const genre = genresList.find((g) => g.id === id);
  return genre ? genre.name : "Drama";
}

module.exports = { getGenreNameById };