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

const rightAnswers = {
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

//Функция меняет стили для пунктов теста при отображении результата.
function styleTestOption(numberOfOption, collection, optionActiveClassName, optionNotActiveClassName) {
  collection.forEach((item, index) => {
    const rightAnswer = rightAnswers[numberOfOption][index];

    //Пункт выбран пользователем...
    if (item.classList.contains(optionActiveClassName)) {
      item.classList.remove(optionActiveClassName);

      if (rightAnswer) { //...и это верный ответ.
        item.classList.add('test__option_answer_right');
      } else { //...и это неверный ответ.
        item.classList.add('test__option_answer_wrong');
      }
    } else {
      //Пункт не выбран пользователем...
      item.classList.remove(optionNotActiveClassName);

      if (rightAnswer) { //...и это верный ответ.
        item.classList.add('test__option_answer_notchecked-right');
      } else { //...и это неверный ответ.
        item.classList.add('test__option_answer_notchecked-wrong');
      }
    }
  });
}

//Функция применяет соответствующие стили к ответам на вопросы теста с учетом корректных данных и выбора пользователя.
function styleTestAnswers() {
  const checkboxInputsCollection = document.querySelectorAll('.test__checkbox');
  const radioInputsCollection = document.querySelectorAll('.test__radio');

  //Ответы на 1-й вопрос.
  styleTestOption(1, checkboxInputsCollection, 'test__option_checkbox_active', 'test__option_checkbox_notactive');

  //Ответы на 2-й вопрос.
  styleTestOption(2, radioInputsCollection, 'test__option_radio_active', 'test__option_radio_notactive');
}


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

    //Активация кнопки "Показать результат".
    changeShowResultButtonState();
  });
});


radioInputs.forEach(function (radio) {
  radio.addEventListener('click', function () {
    radioInputs.forEach((element) => {
      if (element == radio) {
        element.parentNode.classList.remove('test__option_radio_notactive');
        element.parentNode.classList.add('test__option_radio_active');
      }
      else {
        element.parentNode.classList.remove('test__option_radio_active');
        element.parentNode.classList.add('test__option_radio_notactive');
      }
    });

    //Активация кнопки "Показать результат".
    changeShowResultButtonState();
  });
});

//Отображение результата теста.
showResultButton.addEventListener('click', function () {
  if (this.classList.contains('button_state_disabled')) return;

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

    //Делаем неактивной (но доступной) кнопку "Пересдать".
    retakeButton.classList.remove('button_state_active');
    retakeButton.classList.add('button_state_inactive');
    retakeButton.querySelector('img').setAttribute('src', './images/retake-inactive.svg');
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

//Функция удаляет из всех элементов вопроса теста все классы, отвечающие за стили, примененные при отображении
//результатов прохождения теста.
function removeClassesFromTestOption(collection, classToInactivate) {
  const classesToRemove = ['test__option_answer_notchecked-right', 'test__option_answer_notchecked-wrong',
    'test__option_answer_right', 'test__option_answer_wrong'];

  collection.forEach((item) => {
    classesToRemove.forEach((classItem) => {
      if (item.classList.contains(classItem)) {
        item.classList.remove(classItem);
      }
    });

    item.classList.add(classToInactivate);
  });
}


//Пересдача теста. Очищаем поля формы и настраиваем видимость элементов.
retakeButton.addEventListener('click', function () {
  //Очищаем поля формы.
  const checkboxInputsCollection = document.querySelectorAll('.test__checkbox');
  const radioInputsCollection = document.querySelectorAll('.test__radio');

  removeClassesFromTestOption(checkboxInputsCollection, 'test__option_checkbox_notactive');
  removeClassesFromTestOption(radioInputsCollection, 'test__option_radio_notactive');

  //Скрываем видимость карточек с результатом теста.
  if (!resultTestPositive.classList.contains('result-test_hidden')) {
    resultTestPositive.classList.add('result-test_hidden');
  }

  if (!resultTestNegative.classList.contains('result-test_hidden')) {
    resultTestNegative.classList.add('result-test_hidden');
  }

  //Скрываем кнопку "Пересдать" и отображаем кнопку "Показать результат".
  retakeButton.classList.add('button_hidden');

  showResultButton.classList.remove('button_hidden');
  showResultButton.classList.remove('button_state_active');
  showResultButton.classList.add('button_state_disabled');
});

//константы для показа/скрытия карточки
const previewBlock = document.querySelector('#preview')
const testBlock = document.querySelector('#test');
const aboutBlock = document.querySelector('#about');
const startTestButton = document.querySelector('#startTestBtn')
const aboutButton = document.querySelector('#aboutBtn');
const backToPreviewButton = document.querySelector('#backToPreviewBtn')
const returnButton = document.querySelector('#returnBtn');
const returnBottomButton = document.querySelector('#returnBottomBtn')

//функция скрытия блока
function showBlock(blockId) {
  blockId.classList.remove('card_hide');
};

//Функция добавления блока
function hideBlock(blockId) {
  blockId.classList.add('card_hide');
};

// поменять карточку превью на карточку теста
startTestButton.addEventListener('click', function () {
  showBlock(testBlock);
  hideBlock(previewBlock);
});
//вернуть карточку превью
backToPreviewButton.addEventListener('click', function () {
  showBlock(previewBlock);
  hideBlock(testBlock);
});
//поменять карточку теста на катрочку о тесте
aboutButton.addEventListener('click', function () {
  showBlock(aboutBlock);
  hideBlock(testBlock);
});
//вернуть карточку теста
returnButton.addEventListener('click', function () {
  showBlock(testBlock);
  hideBlock(aboutBlock);
});

returnBottomButton.addEventListener('click', function () {
  showBlock(testBlock);
  hideBlock(aboutBlock);
});
