const { genresList, ActionWeights } = require("../common/appConstants");

function getGenreNameById(id) {
  const genre = genresList.find((g) => g.id === id);
  return genre ? genre.name : "Drama";
}

function getWeightAction(action) {
  return ActionWeights[action] ?? 0;
}

module.exports = { getGenreNameById, getWeightAction };
