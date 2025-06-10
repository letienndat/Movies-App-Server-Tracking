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

const Action = Object.freeze({
    TAP_DETAIL_MOVIE: "tap_detail_movie",
    WATCH_MOVIE: "watch_movie",
    ADD_TO_WATCHLIST: "add_to_watchlist",
    REMOVE_FROM_WATCHLIST: "remove_from_watchlist",
    TAP_TAB_ABOUT_MOVIE: "tap_tab_about_movie",
    TAP_TAB_REVIEWS_MOVIE: "tap_tab_reviews_movie",
    TAP_TAB_CAST_MOVIE: "tap_tab_cast_movie"
});

const ActionWeights = Object.freeze({
    [Action.TAP_DETAIL_MOVIE]: 1,
    [Action.WATCH_MOVIE]: 3,
    [Action.ADD_TO_WATCHLIST]: 2,
    [Action.REMOVE_FROM_WATCHLIST]: -2,
    [Action.TAP_TAB_ABOUT_MOVIE]: 2,
    [Action.TAP_TAB_REVIEWS_MOVIE]: 2,
    [Action.TAP_TAB_CAST_MOVIE]: 2
});

module.exports = { genresList, Action, ActionWeights };
