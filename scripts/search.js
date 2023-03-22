"use strict";

"use strict";

//10. (Nâng cao) Tìm kiếm bài viết theo từ khóa
const searchInput = document.getElementById("input-query");
const btnSearch = document.getElementById("btn-submit");
const searchResult = document.getElementById("news-container");

const btnNext = document.getElementById("btn-next");
const btnPrevious = document.getElementById("btn-prev");
const pageNum = document.getElementById("page-num");

btnSearch.addEventListener("click", retrieve);
let totalResults = 20;
let curPage = 1;
let pageSize = 5;
const apikey = "2acfbf3450a14a2f90d226c333efeab9";

function retrieve(e) {
  if (searchInput.value.trim().length === 0) {
    alert("Please input for your search keyword!");
    return;
  }
  searchResult.innerHTML = "";

  e.preventDefault();
  let keyword = searchInput.value;
  let url = `https://newsapi.org/v2/everything?q=${keyword}&totalResults=${totalResults}&pageSize=100&apiKey=${apikey}`;

  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.articles && data.articles.length > 0) {
        changePage(1, data.articles);

        btnPrevious.addEventListener("click", function () {
          if (curPage > 1) {
            curPage--;
            changePage(curPage, data.articles);
          }
        });

        btnNext.addEventListener("click", function () {
          if (curPage < numPages()) {
            curPage++;
            changePage(curPage, data.articles);
          }
        });
      } else {
        const message = document.createElement("p");
        message.innerHTML = "No result found :(";
        searchResult.appendChild(message);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// Xử lý cơ chế chuyển trang như ở trang News.
function numPages() {
  return Math.ceil(totalResults / pageSize);
}

function changePage(page, data) {
  // Validate page
  if (page < 1) page = 1;
  if (page > numPages()) page = numPages();

  searchResult.innerHTML = "";
  let temp = page * pageSize > totalResults ? totalResults : page * pageSize;
  for (let i = (page - 1) * pageSize; i < temp; i++) {
    const row = document.createElement("li");
    row.innerHTML = `
      <img src=${data[i].urlToImage} />
      <div><h6> ${data[i].title}</h6>
      <p> ${data[i].description}</p>
      <a href=${data[i].url} type="button" target = '_blank'>View</a></div>`;
    searchResult.appendChild(row);
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
