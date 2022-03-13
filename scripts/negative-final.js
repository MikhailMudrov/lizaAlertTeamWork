import {createSideMenuHandlers} from "./side-menu.js";

createSideMenuHandlers();



const backButton = document.querySelector('#backBtn');

//При клике по кнопке "Назад" взводим флаг 'showLastTestResult' в true и сохраняем его в sessionStorage.
//Это будет означать, что после перехода на страницу "Тест", необходимо отобразить результаты последнего тестирования.
backButton.addEventListener('click', function () {
  sessionStorage.setItem('showLastTestResult', true);
});
