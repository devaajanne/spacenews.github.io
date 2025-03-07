function generateSourceList(data, page) {
    let sourceList = `<div>`
    sourceList += `<div class="btn-group-vertical" role="group" aria-label="Source selection">`
    sourceList += `<button type="button" id="all" class="btn mt-2 sourceSelector" onClick="setActiveSource('all', '${page}')" aria-label="Select all sources">All</button>`

    for (let i = 0; i< data.news_sites.length; i++) {
        let newsSite = `${data.news_sites[i]}`
        sourceList += `<button type="button" id='${newsSite}' class="btn sourceSelector" onClick="setActiveSource('${newsSite}', '${page}')" aria-label="Select ${data.news_sites[i]} as source">${data.news_sites[i]}</button>`
    }
    sourceList += `</div>`
    document.getElementById("sourceListDropdown").innerHTML = sourceList;
}

function fetchSources(page) {
    // Aluksi luodaan URL josta pyydetään GET-pyynnöllä data
  
    const URL = `https://api.spaceflightnewsapi.net/v4/info/`;
  
    // Haetaan JSON-tietue osoitteesta GET-http-pyynnöllä
    fetch(URL)
      // Parseroi JSON-objektin response bodysta
      .then(function (response) {
        return response.json();
      })
      // JSON-objekti syötetään generateSourceList-funktiolle, joka luo lähdelistauksen
      .then(function (responseJSON) {
        generateSourceList(responseJSON, page);
      })
      // Jos tapahtuu virhe, näytetään virheilmoitus
      .catch(function (error) {
        let fetchError = `<div class="card mb-4">`;
        fetchError += `<div class="card-header"><h5>Sorry!</h5></div>`;
        fetchError += `<div class="card-body">Could not find any sources.</div>`;
        fetchError += `</div>`;
        document.getElementById("sourceListDropDown").innerHTML = fetchError;
      });
  }
  