import { createSideMenuHandlers } from "./side-menu.js";

createSideMenuHandlers();

let numberOfAttemts = 0;

const checkboxInputs = document.querySelectorAll('.test__answer-checkbox');
const radioInputs = document.querySelectorAll('.test__answer-radio');

const showResultButton = document.querySelector('#showResultBtn');
const retakeButton = document.querySelector('#retakeBtn');
const forwardButton = document.querySelector('#forwardBtn');

const resultTestPositive = document.querySelector('.result-test_type_positive');
const resultTestNegative = document.querySelector('.result-test_type_negative');

const correctAnswers = {
  1: [true, true, true],
  2: [false, true, false]
};

function changeShowResultButtonState() {
  //Если выбрано хотя бы по одному ответу каждом вопросе - кнопка становится активной.
  const checkboxChosen = document.querySelectorAll('.test__option_checkbox_active');
  const radioChosen = document.querySelectorAll('.test__option_radio_active');

 if (checkboxChosen.length && radioChosen.length) {
    showResultButton.classList.remove('button_state_disabled');
    showResultButton.classList.add('button_state_active');
  } else {
    showResultButton.classList.add('button_state_disabled');
    showResultButton.classList.remove('button_state_active');
  }
}

//Функция сравнивает выбор пользователя с условиями успешной сдачи
//и возвращает результат теста в формате "Успех"/"Провал" (True/False).
//Результат отрицательный, когда в первом вопросе выбрано 2 или 3 варианта ответа,
//а во втором вопросе выбран неправильный вариант (первый или третий).
//Результат положительный, когда в первом вопросе выбрано 2 или 3 варианта ответа,
//а во втором вопросе выбран второй вариант.
function getTestResult() {
  const firstQuestionResult = document.querySelectorAll('.test__option_checkbox_active').length > 1;
  const secondQuestionResult = document.querySelectorAll('.test__radio').item(1).classList.contains('test__option_radio_active');

  return firstQuestionResult && secondQuestionResult;
}

//Функция
function styleTestAnswers() {

}


checkboxInputs.forEach(function (checkBox) {
  checkBox.addEventListener('click', function () {
    if (checkBox.parentNode.classList.contains("test__option_checkbox_notactive")) {
      this.parentNode.classList.remove('test__option_checkbox_notactive');
      this.parentNode.classList.add('test__option_checkbox_active');
    } else {
      this.parentNode.classList.remove('test__option_checkbox_active');
      this.parentNode.classList.add('test__option_checkbox_notactive');
    }

    //Активация кнопки "Показать результат".
    changeShowResultButtonState();
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
    });
  });
  
    //Активация кнопки "Показать результат".
    changeShowResultButtonState();
});

//Отображение результата теста.
showResultButton.addEventListener('click', function () {
  //Увеличиваем счетчик количества попыток сдачи.
  numberOfAttemts++;

  //Получаем результат теста.
  const testResult = getTestResult();

  //Стилизуем ответы на вопросы теста с учетом корректных данных и выбора пользователя.
  styleTestAnswers();

  //Меняем отображение кнопок "Показать результат" и "Пересдать".
  showResultButton.classList.add('button_hidden');
  retakeButton.classList.remove('button_hidden');

  if (testResult) {
    //Отображаем карточку с позитивным результатом теста.
    resultTestPositive.classList.remove('result-test_hidden');

    //Активизируем кнопку "Далее".
    forwardButton.classList.remove('button_state_disabled');
    forwardButton.classList.add('button_state_active');
    forwardButton.querySelector('img').setAttribute('src', './images/forward-arrow-active.svg');
  } else {
    //Отображаем карточку с негативным результатом теста.
    resultTestNegative.classList.remove('result-test_hidden');

    //Активизируем кнопку "Пересдать".
    retakeButton.classList.remove('button_state_inactive');
    retakeButton.classList.add('button_state_active');
    retakeButton.querySelector('img').setAttribute('src', './images/retake-active.svg');

    //Если пользователь трижды провалил тест - активизируем кнопку "Далее".
    if (numberOfAttemts >= 3) {
      forwardButton.classList.remove('button_state_disabled');
      forwardButton.classList.add('button_state_active');
      forwardButton.querySelector('img').setAttribute('src', './images/forward-arrow-active.svg');
    }
  }
});

