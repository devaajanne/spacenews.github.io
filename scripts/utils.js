function setActiveSource(id, page) {
  let element = document.getElementById(id);

  if (element.classList.contains("btn-primary")) {
    element.classList.remove("btn-primary");
  } else {
    let buttons = document.querySelectorAll(".sourceSelector");
    buttons.forEach(function (button) {
      button.classList.remove("btn-primary");
    });

    element.classList.add("btn-primary");
  }

  fetchNewsItems(id, page);
}
