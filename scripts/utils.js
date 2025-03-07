// Tämä funktion asettaa sivulla aktiivisen uutislähteen ja hakee uutiset valitusta lähteestä
// selectedSource = ABC Newsm AmericaSpace, NASA, ESA, Spacex -> mistä uutisia haetaan
// page = articles, blogs tai reports-> sivu jolle uutiset haetaan ja uutistyyppi
function setActiveSource(selectedSource, page) {
  // Asetetaan aktiiviseksi se elementti, jossa valittu lähde on (alasvetovalikosta)
  // Poistetaan samalla muiden elementtien aktiivisuus
  let element = document.getElementById(selectedSource);

  if (element.classList.contains("active")) {
    element.classList.remove("active");
  } else {
    let buttons = document.querySelectorAll(".sourceSelector");
    buttons.forEach(function (button) {
      button.classList.remove("active");
    });

    element.classList.add("active");
  }

  // Haetaan valitusta lähteestä valitut uutiset (artikkelit, blogit tai raportit)
  fetchNewsItems(selectedSource, page);
}
