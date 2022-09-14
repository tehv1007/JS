"use strict";

const btnNext = document.getElementById("btn-next");
const btnPrevious = document.getElementById("btn-prev");
const pageNum = document.getElementById("page-num");
const newsList = document.getElementById("news-container");

//6. Hiển thị các bài viết
const apikey = "2acfbf3450a14a2f90d226c333efeab9";
let category = localStorage.getItem("category")
  ? JSON.parse(localStorage.getItem("category"))
  : "business";
let pageSize = localStorage.getItem("newsNum")
  ? JSON.parse(localStorage.getItem("newsNum"))
  : 5;

let news_data = null;
let curPage = 1;
let totalResults = 20;
let url = `https://newsapi.org/v2/top-headlines?category=${category}&pageSize=100&totalResults=${totalResults}&apiKey=${apikey}`;

async function getNewsData() {
  const res = await fetch(url);
  const get = await res.json();
  const news_data = await get.articles;
  // await fetch(url)
  //   .then((res) => res.json())
  //   .then((res) => {
  //     news_data = res.articles;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  return news_data;
}

async function fetchNews() {
  const data = await getNewsData();
  //console.log(data);
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
fetchNews();

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
