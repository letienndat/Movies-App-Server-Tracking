require("dotenv").config();
const { genresList, ActionWeights, Action } = require("../common/appConstants");
const { getGenreNameById, getWeightAction } = require("../common/common");
const User = require("../models/userModel");
const { successResponse, errorResponse } = require("../utils/response");

exports.trackUserAction = async (req, res) => {
  const { email, movie_id, action, genres = [] } = req.body;

  if (!Object.values(Action).includes(action))
    return errorResponse(res, `Invalid action ${action}`, 400);

  const validGenreIDs = genresList.map((g) => g.id);

  const filteredGenres = genres.filter((g) => validGenreIDs.includes(g));

  if (filteredGenres.length === 0) {
    return errorResponse(res, "No valid genres provided", 400);
  }

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        tracking: [],
      });
    }

    user.tracking.push({
      movie_id,
      action,
      timestamp: new Date(),
      genres: filteredGenres,
    });

    await user.save();
    return successResponse(res, `Action tracked: ${action}`);
  } catch (err) {
    console.error(err);
    return errorResponse(res, "Server error");
  }
};

exports.getRecommendations = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      const defaultGenreScores = [];

      return successResponse(
        res,
        "User not found, returning default recommendations",
        {
          topGenre: 18, // Drama
          topGenreName: getGenreNameById(18),
          genreScores: defaultGenreScores,
        }
      );
    }

    const genreCount = {};

    for (const entry of user.tracking) {
      const { action, genres = [] } = entry;

      let weight = getWeightAction(action);

      for (const genre of genres) {
        genreCount[genre] = (genreCount[genre] || 0) + weight;
      }
    }

    for (const genre in genreCount) {
      if (genreCount[genre] <= 0) delete genreCount[genre];
    }

    const sortedGenres = Object.entries(genreCount)
      .sort((a, b) => b[1] - a[1])
      .map(([genreID, score]) => ({
        genreID: Number(genreID),
        genre: getGenreNameById(Number(genreID)),
        score,
      }));

    const topGenre = sortedGenres.length > 0 ? sortedGenres[0].genreID : 18;
    const topGenreName = getGenreNameById(topGenre);

    return successResponse(res, "Recommendations generated", {
      topGenre,
      topGenreName,
      genreScores: sortedGenres,
    });
  } catch (err) {
    console.error(err);
    return errorResponse(res, "Server error");
  }
};
