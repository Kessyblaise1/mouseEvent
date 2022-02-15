// to determine the position of the cursor at any point, I listenned for the mousemove event on the window using {window.addEventListenner('mousemove', () => {})}, then i passed in a parameter {e} which holds the current 'x' and 'y' position of the cursor

//  Next i converted the total width of the page to a floating point number between 0 - 1 by deviding the current mouse position by the total width of the page, this way it is easier to calculate the page width in terms of percentage

//  Now the left side of the page has a percentage value of 0 and the far right has a value of 1

// =================== BACKGROUND COLOR CHANGE
// to change the background color; First I initialize the rgb values of the backgroundColor of the navBar background with the color it's supposed to be when mouseover(hover).
//This way if the cursor is not on the page by the time the page loads, the navBar will still remain visible
// then on mousemove the navBackground rgb values change to the startColor + 1.9 depending on the position of the mouse
//  if the mouse moves to the right, the color slowly returns to the start color
// if the mouse moves to the right, the color slowly increases until it reaches the specified color

// =================== OPACITY CHANGE
// to change the opacity of the nav contents ; first I create a lastScrollLeft variable and set it's value to 1
// this is used to determine the opacity of the nav contents depending on the value of the percent variable(the value of the current positon of the mouse, which is a float between 0 and 1, the further it is from the left-side of the screen the higher the number)
// the way i did this is I subtracted the value of the percent variable from the lastScrollLeft variable, this gave me an opacity value relative to the postion of the mouse on the document
// e.g if percent is = 0.8, then that will be 1 - 0.8 which is 0.2, the result then becomes the current opacity of the nav content
// since we need the opacity to be high to have a good looking blur effect, i targeted a particular point on the screen to start applying the opacity

// ===================  ADDING THE FILTER EFFECT
// for the backdrop filter I targeted a particular point on the screen and added double the value of the percent varaible

let lastScrollLeft = 1; //  this variable helps to calculate a value for

document.querySelector(
  ".nav_background"
).style.backgroundColor = `rgb(255, 255, 255)`;

let startColor = 242; //start color is the initial rgb value of the navBar background;

window.addEventListener("mousemove", (e) => {
  const totalwidth = document.body.offsetWidth;
  const coordinate = totalwidth < 767 ? e.y : e.x;

  let percent = coordinate / totalwidth; //  e.x represents the mouse position on the x axis  || document.body.offsetWidth gets the total width of the document
  let navBg = document.querySelector(".nav_background");
  let navContent = document.querySelector(".nav_content");
  let currentPos = lastScrollLeft - percent;

  navBg.style.opacity = currentPos;

  if (percent < 0.47) {
    startColor += 1.9;
  }

  newPercent = percent * 2;

  navContent.style.filter = "blur(0)";

  if (currentPos < 0.7) {
    navContent.style.filter = "blur(" + newPercent + "px)";
  }

  if (percent > 0.85) {
    navContent.style.opacity = currentPos;
  } else {
    navContent.style.opacity = 1;
  }
  navBg.style.backgroundColor = `rgb(${startColor}, ${startColor}, ${startColor})`;

  //   The section below is to display the different variables on the screen
  document.querySelector(
    ".percent"
  ).textContent = `CP: ${currentPos} ||  Percent: ${percent}`;
});

function logWidth() {
  console.log(document.body.offsetWidth);
}

logWidth();
