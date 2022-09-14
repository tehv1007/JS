"use strict";

// 9. Thay đổi thiết lập
const newsNum = document.getElementById("input-page-size");
const newsCategory = document.getElementById("input-category");
const btnSetting = document.getElementById("btn-submit");

btnSetting.addEventListener("click", function () {
  if (newsNum.value.trim().length === 0) {
    alert("Please input for the news number per page!");
    return;
  } else if (newsNum.value <= 0) {
    alert("Please add a number between 1 and 20!");
    return;
  } else localStorage.setItem("category", JSON.stringify(newsCategory.value));

  if (newsCategory.selectedIndex === 0) {
    alert("Please select one category!");
    return;
  } else localStorage.setItem("newsNum", JSON.stringify(newsNum.value));
});
