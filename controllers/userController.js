require("dotenv").config();
const User = require("../models/userModel");
const { successResponse, errorResponse } = require("../utils/response");

exports.trackUserAction = async (req, res) => {
  const { email, movie_id, action, genres = [] } = req.body;

  const validActions = [
    "click",
    "watch",
    "add_to_watchlist",
    "remove_from_watchlist",
  ];
  if (!validActions.includes(action))
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
          genreScores: defaultGenreScores,
        }
      );
    }

    const genreCount = {};

    for (const entry of user.tracking) {
      const { action, genres = [] } = entry;

      let weight = 0;
      if (action === "watch") weight = 3;
      else if (action === "add_to_watchlist") weight = 2;
      else if (action === "remove_from_watchlist") weight = -2;
      else if (action === "click") weight = 1;
      else continue;

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

    return successResponse(res, "Recommendations generated", {
      topGenre,
      genreScores: sortedGenres,
    });
  } catch (err) {
    console.error(err);
    return errorResponse(res, "Server error");
  }
};

let genresList = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

function getGenreNameById(id) {
  const genre = genresList.find((g) => g.id === id);
  return genre ? genre.name : "Drama";
}
