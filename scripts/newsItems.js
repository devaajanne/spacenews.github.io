function showNewsItems(data, page, selectedSource) {
  // Muutetaan sivusta (esim. "articles") yksikkömuotoinen merkkijono ("article")
  let pageItem = page.slice(0, -1);

  // Aletaan koota elementtiä, joka näyttää valitut uutiset valitusta lähteestä
  let newsItems = "";

  // Jos yhtään uutista ei löydy, näytetään virheilmoitus
  if (data.count === 0) {
    newsItems += `<div class="card mb-2 mt-2" role="alert">`;
    newsItems += `<div class="card-header"><h5>Sorry!</h5></div>`;
    newsItems += `<div class="card-body">No ${page} from ${selectedSource} found.</div>`;
    newsItems += `<div class="card-footer">Try again with another source.</div>`;
    newsItems += `</div>`;
  } else {
    // Aletaan käydä uutisia läpi
    for (let i = 0; i < data.results.length; i++) {
      // Hyppää yli ne uutiset, joissa ei ole tekstiä
      if (data.results[i].summary === "") {
        continue;
      }

      // Tehdään JSON-datasta kortti
      newsItems += `<div class="card mb-2 mt-2" role="article">`;
      newsItems += `<div class="card-header"><h5>${data.results[i].title}</h5></div>`;
      newsItems += `<div class="card-header">By ${data.results[i].news_site} on ${dayjs(
        data.results[i].published_at
      ).format("DD.MM.YYYY")}</div>`;
      newsItems += `<div class="card-body"><img src=${data.results[i].image_url} class="img-fluid" alt="${pageItem} image"></div>`;
      newsItems += `<div class="card-body">${data.results[i].summary}</div>`;
      newsItems += `<div class="card-footer"><a href=${data.results[i].url} aria-label="Read the full ${pageItem}">Click here to read the whole ${pageItem}</a></div>`;
      newsItems += `</div>`;
    }
  }

  // Lopuksi näytetään kaikki kootut kortit html-sivulla
  document.getElementById(`${page}Column`).innerHTML = newsItems;
}

function fetchNewsItems(selectedSource, page) {
  // Aluksi luodaan URL josta pyydetään GET-pyynnöllä data
  // Määritetään oikea uutislähde
  let newsSource;
  if (selectedSource === "all") {
    newsSource = "";
  } else {
    newsSource = `news_site=${selectedSource.replace(" ", "")}&`; // esim. nasa&
  }

  const URL = `https://api.spaceflightnewsapi.net/v4/${page}/?${newsSource}ordering=-published_at&limit=100`;

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
