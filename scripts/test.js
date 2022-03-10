import { createSideMenuHandlers } from "./side-menu.js";

createSideMenuHandlers();

const checkboxChecked = document.querySelectorAll('.test__option_checkbox_notactive');
const radioChecked = document.querySelectorAll('.test__answer-radio');


checkboxChecked.forEach(function (checkBox) {

  checkBox.addEventListener('click', function () {
    if (checkBox.classList.contains("test__option_checkbox_notactive")) {
      this.classList.remove('test__option_checkbox_notactive');
      this.classList.add('test__option_checkbox_active');
    } else {
      this.classList.remove('test__option_checkbox_active');
      this.classList.add('test__option_checkbox_notactive');
    }
  });
});


radioChecked.forEach(function (radio) {
  radio.addEventListener('click', function () {
    if (radio.checked) {
      radioChecked.forEach(element => {
        element.parentNode.style.color = '#000';
        radio.parentNode.style.color = '#f06000';
      });
    };
  });
});
