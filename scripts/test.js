import { createSideMenuHandlers } from "./side-menu.js";

createSideMenuHandlers();

const checkboxInputs = document.querySelectorAll('.test__answer-checkbox');
const radioInputs = document.querySelectorAll('.test__answer-radio');


checkboxInputs.forEach(function (checkBox) {
  checkBox.addEventListener('click', function () {
    if (checkBox.parentNode.classList.contains("test__option_checkbox_notactive")) {
      this.parentNode.classList.remove('test__option_checkbox_notactive');
      this.parentNode.classList.add('test__option_checkbox_active');
    } else {
      this.parentNode.classList.remove('test__option_checkbox_active');
      this.parentNode.classList.add('test__option_checkbox_notactive');
      console.log(this);
    }
  });
});


radioInputs.forEach(function (radio) {
  radio.addEventListener('click', function () {
    radioInputs.forEach( (element) => {
      if (element == radio) {
        element.parentNode.classList.remove('test__option_radio_notactive');
        element.parentNode.classList.add('test__option_radio_active');
      }
      else {
        element.parentNode.classList.remove('test__option_radio_active');
        element.parentNode.classList.add('test__option_radio_notactive');
      }
    } );
});
});
