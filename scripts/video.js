
import {createSideMenuHandlers} from "./side-menu.js";

createSideMenuHandlers();

const goToTestButton = document.querySelector('#goToTest');
function goToTestButtonHandler() {
  document.location.href = './test.html';
}
goToTestButton.addEventListener('click', goToTestButtonHandler);
