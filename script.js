const images = document.querySelectorAll(".slide");
const arrowLeft = document.getElementById("arrow-left");
const arrowRight = document.getElementById("arrow-right");
let index = 0;

console.log(images);

//Hide images
function reset() {
  images.forEach((item) => {
    item.style.display = "none";
  });
}

// Start slide
function startSlide() {
  reset();
  images[0].style.display = "block";
}

// Show right image
function showRightImage() {
  reset();
  if (index < images.length) {
    images[index + 1].style.display = "block";
    index += 1;
    console.log(index);
  }
}

// Show left image
function showLeftImage() {
  reset();
  if (0 < index) {
    index = index - 1;
    console.log(index);
    images[index].style.display = "block";
  }
}

// Event
arrowRight.addEventListener("click", clickRight);
function clickRight() {
  if (index + 1 === images.length) {
    index = -1;
  }
  showRightImage();
}

arrowLeft.addEventListener("click", clickLeft);
function clickLeft() {
  if (index === 0) {
    index = images.length;
  }
  showLeftImage();
}

startSlide();
