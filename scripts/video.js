const goToTestButton = document.querySelector('#goToTest');
function goToTestButtonHandler() {
  document.location.href = './test.html';
}
goToTestButton.addEventListener('click', goToTestButtonHandler);

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
