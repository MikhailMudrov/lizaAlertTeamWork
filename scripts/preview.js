import {createSideMenuHandlers} from "./side-menu.js";

createSideMenuHandlers();

const goToTestButton = document.querySelector('#goToTest');
const goToVideoButton = document.querySelector('#goToVideo');

function goToTestButtonHandler() {
  document.location.href = './test.html';
}
goToTestButton.addEventListener('click', goToTestButtonHandler);

function goToVideoButtonHandler() {
  document.location.href = './video.html';
}
goToVideoButton.addEventListener('click', goToVideoButtonHandler);
