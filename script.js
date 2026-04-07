const filters = document.querySelectorAll("#filters .btn");
const items = document.querySelectorAll("#gridProjects .card-container");

let qtPerPage = perPage.value;
let totalPages = 0;
let currentFilter = "all";
let currentPage = 1;

document.addEventListener("DOMContentLoaded", function (event) {
  console.log("DOM loaded!");

  showPage(currentPage);
  prevPage.classList.toggle("disabled", prevPage.disabled);
  perPage.dispatchEvent(new Event("change"));

  nextPage.addEventListener("click", () => changePage("next"));
  prevPage.addEventListener("click", () => changePage("prev"));
  perPage.addEventListener("change", (event) => {
    qtPerPage = perPage.value;
    showPage(currentPage);
  });
});

function showPage(currentPage) {
  const filteredItems = getFilteredItems();
  const totalItens = filteredItems.length;
  totalPages = Math.ceil(totalItens / qtPerPage);

  nextPage.disabled = currentPage >= totalPages;
  nextPage.classList.toggle("disabled", nextPage.disabled);
  prevPage.disabled = currentPage <= 1;
  prevPage.classList.toggle("disabled", prevPage.disabled);

  items.forEach((item) => (item.style.display = "none"));

  filteredItems.forEach((item, index) => {
    item.style.display =
      index >= (currentPage - 1) * qtPerPage && index < currentPage * qtPerPage
        ? "flex"
        : "none";
  });
}

function changePage(type) {
  if (type === "next") {
    currentPage++;
  } else {
    currentPage--;
  }

  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  showPage(currentPage);
}

function getFilteredItems() {
  if (currentFilter === "all") return [...items];

  return [...items].filter((item) => item.classList.contains(currentFilter));
}

function setFilter(filter) {
  const element = document.getElementById(filter);
  currentPage = 1;
  currentFilter = filter;

  filters.forEach((filter) => {
    filter.classList.remove("selected");
  });
  element.classList.add("selected");

  showPage(currentPage);
}
