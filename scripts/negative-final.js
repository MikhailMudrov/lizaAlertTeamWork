const backButton = document.querySelector('#backBtn');
const goToCousresButton = document.querySelector('#goToCousres');

//При клике по кнопке "Назад" взводим флаг 'showLastTestResult' в true и сохраняем его в sessionStorage.
//Это будет означать, что после перехода на страницу "Тест", необходимо отобразить результаты последнего тестирования.
backButton.addEventListener('click', function () {
  document.location.href = './test.html';
  sessionStorage.setItem('showLastTestResult', true);
});

goToCousresButton.addEventListener('click', function () {
  document.location.href = 'https://mikhailmudrov.github.io/liza-project/index.html';
});

const menuItemList = document.querySelectorAll(".sidebar-menu__item-list");

menuItemList.forEach(item => {
  item.parentNode.addEventListener("click", function (evt) {
    evt.stopPropagation();
    item.classList.toggle("sidebar-menu__item-list_open");
  });
});

const menuIcon = document.querySelectorAll(".icon_picture_sidebar-menu");

menuIcon.forEach(item => {
  item.parentNode.addEventListener("click", function (evt) {
    evt.stopPropagation();
    item.classList.toggle("icon_rotated");
  });
});
