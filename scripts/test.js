import {createSideMenuHandlers} from "./side-menu.js";

createSideMenuHandlers();

const checkbox = document.querySelectorAll('test__option_checkbox_notactive')
const container = document.querySelector('.test__option');


checkbox.forEach(el => {
el.addEventListener('click', () => {
    container.classList.remove('test__option_checkbox_notactive');
    container.classList.add('test__option_checkbox_active');
});

});
