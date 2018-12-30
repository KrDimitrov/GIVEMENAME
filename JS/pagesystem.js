/* handles page management */

function switchToPage(pageID){
  var currentPage = document.getElementsByClassName("current")[0];
  currentPage.classList.remove("current");
  currentPage.classList.add("hidden");

  var newPage = document.getElementById(pageID);
  newPage.classList.remove("hidden");
  newPage.classList.add("current");
}

module.exports = {
  switchToPage
}
