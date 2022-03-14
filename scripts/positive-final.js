import {createSideMenuHandlers} from "./side-menu.js";

createSideMenuHandlers();



const backButton = document.querySelector('#backBtn');
const goToCousresButton = document.querySelector('#goToCourses');

//При клике по кнопке "Назад" взводим флаг 'showLastTestResult' в true и сохраняем его в sessionStorage.
//Это будет означать, что после перехода на страницу "Тест", необходимо отобразить результаты последнего тестирования.
backButton.addEventListener('click', function () {
  document.location.href = './test.html';
  sessionStorage.setItem('showLastTestResult', true);
});

goToCousresButton.addEventListener('click', function () {
  document.location.href = 'https://mikhailmudrov.github.io/liza-project/index.html';
});
