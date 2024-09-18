function myFunction() {
  var element = document.getElementById("main");
  if (element.classList.contains("dark")) {
    element.classList.remove("dark");
  } else {
    element.classList.add("dark");
  }
}
