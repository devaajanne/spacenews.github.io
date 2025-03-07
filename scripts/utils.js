function setActiveSource(id, page) {
  let element = document.getElementById(id);

  if (element.classList.contains("active")) {
    element.classList.remove("active");
  } else {
    let buttons = document.querySelectorAll(".sourceSelector");
    buttons.forEach(function (button) {
      button.classList.remove("active");
    });

    element.classList.add("active");
  }

  fetchNewsItems(id, page);
}