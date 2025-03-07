function showNewsItems(data, page, selectedSource) {
  let newsItems = "";
  if (data.count === 0) {
    newsItems += `<div class="card mb-2 mt-2">`;
    newsItems += `<div class="card-header"><h5>Sorry!</h5></div>`;
    newsItems += `<div class="card-body">No ${page} from ${selectedSource} found.</div>`;
    newsItems += `<div class="card-footer">Try again with another source.</div>`;
    newsItems += `</div>`;
  } else {
    for (let i = 0; i < data.results.length; i++) {
      // Hyppää yli ne uutiset, joissa ei ole tekstiä
      if (data.results[i].summary === "") {
        continue;
      }
      newsItems += `<div class="card mb-2 mt-2">`;
      newsItems += `<div class="card-header"><h5>${data.results[i].title}</h5></div>`;
      newsItems += `<div class="card-header">By ${data.results[i].news_site} on ${dayjs(
        data.results[i].published_at
      ).format("DD.MM.YYYY")}</div>`;
      newsItems += `<div class="card-body"><img src=${data.results[i].image_url} class="img-fluid"></div>`;
      newsItems += `<div class="card-body">${data.results[i].summary}</div>`;
      newsItems += `<div class="card-footer"><a href=${data.results[i].url}>Click here to read the whole ${page.slice(
        0,
        -1
      )}</a></div>`;
      newsItems += `</div>`;
    }
  }

  document.getElementById(`${page}Column`).innerHTML = newsItems;
}

function fetchNewsItems(selectedSource, page) {
  // Aluksi luodaan URL josta pyydetään GET-pyynnöllä data
  let newsSource;
  if (selectedSource === "all") {
    newsSource = "";
  } else {
    newsSource = `news_site=${selectedSource.replace(" ", "")}&`;
  }

  const URL = `https://api.spaceflightnewsapi.net/v4/${page}/?${newsSource}ordering=-published_at`;

  // Haetaan JSON-tietue osoitteesta GET-http-pyynnöllä
  fetch(URL)
    // Parseroi JSON-objektin response bodysta
    .then(function (response) {
      return response.json();
    })
    // JSON-objekti syötetään showNewsItems-funktiolle, joka esittää objektin sisällön
    .then(function (responseJSON) {
      showNewsItems(responseJSON, page, selectedSource);
    })
    // Jos tapahtuu virhe, näytetään virheilmoitus
    .catch(function (error) {
      let fetchError = `<div class="card mb-4">`;
      fetchError += `<div class="card-header"><h5>Sorry!</h5></div>`;
      fetchError += `<div class="card-body">Could not find any ${page}}.</div>`;
      fetchError += `</div>`;
      document.getElementById(`${page}Column`).innerHTML = fetchError;
    });
}
