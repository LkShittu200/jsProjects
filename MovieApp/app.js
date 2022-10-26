const api =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=097e170ff614ce365b11e31ad95a2a71&page=1";

async function fectMovies() {
  const resp = await fetch(api);
  const respData = await resp.json();

  console.log(respData);
}
fectMovies();
