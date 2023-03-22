"use strict";

const API_KEY = "2acfbf3450a14a2f90d226c333efeab9";
const newsList = document.getElementById("news-container");
const btnNext = document.getElementById("btn-next");
const btnPrevious = document.getElementById("btn-prev");
const pageNum = document.getElementById("page-num");

let category = localStorage.getItem("category")
  ? JSON.parse(localStorage.getItem("category"))
  : "business";
let pageSize = localStorage.getItem("newsNum")
  ? JSON.parse(localStorage.getItem("newsNum"))
  : 5;

let curPage = 1;
let totalResults = 20;
const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=100&totalResults=${totalResults}&apiKey=${API_KEY}`;

async function getNews() {
  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.articles);
      showResults(data.articles);
    });
}
getNews();
function showResults(data) {
  if (data && data.length > 0) {
    changePage(1, data);

    btnPrevious.addEventListener("click", function () {
      if (curPage > 1) {
        curPage--;
        changePage(curPage, data);
      }
    });

    btnNext.addEventListener("click", function () {
      if (curPage < numPages()) {
        curPage++;
        changePage(curPage, data);
      }
    });
  } else {
    const message = document.createElement("p");
    message.innerHTML = "Something went wrong :(";
    newsList.appendChild(message);
  }
}

//7. Chuyển trang cho các bài viết
function numPages() {
  return Math.ceil(totalResults / pageSize);
}

function changePage(page, data) {
  // Validate page
  if (page < 1) page = 1;
  if (page > numPages()) page = numPages();

  newsList.innerHTML = "";
  let temp = page * pageSize > totalResults ? totalResults : page * pageSize;
  for (let i = (page - 1) * pageSize; i < temp; i++) {
    const row = document.createElement("li");
    row.innerHTML = `
      <img src=${data[i].urlToImage} />
      <div><h6> ${data[i].title}</h6>
      <p> ${data[i].description}</p>
      <a href=${data[i].url} type="button" target = '_blank'>View</a></div>`;
    newsList.appendChild(row);
  }
  pageNum.innerHTML = page;

  if (page == 1) {
    btnPrevious.style.visibility = "hidden";
  } else {
    btnPrevious.style.visibility = "visible";
  }

  if (page == numPages()) {
    btnNext.style.visibility = "hidden";
  } else {
    btnNext.style.visibility = "visible";
  }
}
