
let numberOfAttempts = 0;
let successfulAttemptFixed = false;

const attemptsLimitCount = 3;

const checkboxInputs = document.querySelector('#test-item_1').querySelectorAll('.icon');
const radioInputs = document.querySelector('#test-item_2').querySelectorAll('.icon');

const showResultButton = document.querySelector('#showResultBtn');
const retakeButton = document.querySelector('#retakeBtn');
const forwardButton = document.querySelector('#forwardBtn');
const goToVideoButton = document.querySelector('#goToVideo');

const resultTestPositive = document.querySelector('#resultContainerPositive');
const resultTestNegative = document.querySelector('#resultContainerNegative');

const rightAnswers = {
  1: [true, true, true],
  2: [false, true, false]
};


function goToVideoButtonHandler() {
  document.location.href = './video.html';
}

goToVideoButton.addEventListener('click', goToVideoButtonHandler);


function changeShowResultButtonState() {
  //Если выбрано хотя бы по одному ответу каждом вопросе - кнопка становится активной.
  const checkboxChosen = document.querySelector('#test-item_1').querySelectorAll('.icon__checkbox_active');
  const radioChosen = document.querySelector('#test-item_2').querySelectorAll('.icon__radio_active');

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
  const firstQuestionResult = document.querySelector('#test-item_1').querySelectorAll('.icon__checkbox_active').length > 1;
  const secondQuestionResult = document.querySelector('#test-item_2').querySelectorAll('.icon__radio').item(1).classList.contains('icon__radio_active');

  return firstQuestionResult && secondQuestionResult;
}

//Функция меняет стили для пунктов теста при отображении результата.
function styleTestOption(numberOfOption, userAnswersCollection, testOptionsCollection, optionActiveClassName,
  optionNotActiveClassName, renderByDataFromSessionStorage, needToReplaceAnswersInStorage) {
  const arrForSaveToStorage = [];

  testOptionsCollection.forEach((item, index) => {
    //Получаем ответ пользователя для данного пункта теста.
    const userAnswer = renderByDataFromSessionStorage ? userAnswersCollection[index] : item.classList.contains(optionActiveClassName);

    //Определяем - верный ли это ответ.
    const rightAnswer = rightAnswers[numberOfOption][index];

    //Пункт выбран пользователем...
    if (userAnswer) {
      item.classList.remove(optionActiveClassName);
      item.nextElementSibling.classList.remove('test__text_theme_orange');

      if (rightAnswer) { //...и это верный ответ.
        item.classList.add('icon__check-mark_active');
        item.nextElementSibling.classList.add('test__result-text_theme_green');
      } else { //...и это неверный ответ.
        item.classList.add('icon__cross_failure');
        item.nextElementSibling.classList.add('test__result-text_theme_red');
      }

      arrForSaveToStorage.push('v');
    } else {
      //Пункт не выбран пользователем...
      //item.classList.remove(optionNotActiveClassName);

      if (rightAnswer) { //...и это верный ответ.
        item.classList.add('icon__check-mark');
      } else { //...и это неверный ответ.
        item.classList.add('icon__cross');
      }

      arrForSaveToStorage.push('');
    }
  });

  //Если мы стилизуем не на основании данных из хранилища, - тогда надо перезаписать эти данные текущим выбором пользователя.
  if (!renderByDataFromSessionStorage) {
    if (!successfulAttemptFixed || (successfulAttemptFixed && needToReplaceAnswersInStorage)) {
      sessionStorage.setItem(numberOfOption, arrForSaveToStorage);
    }
  }
}

//Функция применяет соответствующие стили к ответам на вопросы теста с учетом корректных данных и выбора пользователя.
function styleTestAnswers(renderByDataFromSessionStorage, needToReplaceAnswersInStorage) {
  const checkboxInputsCollection = document.querySelector('#test-item_1').querySelectorAll('.icon');
  const radioInputsCollection = document.querySelector('#test-item_2').querySelectorAll('.icon');

  let userAnswersCollection1 = [];
  let userAnswersCollection2 = [];

  if (Boolean(sessionStorage.getItem('1'))) userAnswersCollection1 = sessionStorage.getItem('1').split(',');
  if (Boolean(sessionStorage.getItem('2'))) userAnswersCollection2 = sessionStorage.getItem('2').split(',');

  //Ответы на 1-й вопрос.
  styleTestOption(1, userAnswersCollection1, checkboxInputsCollection, 'icon__checkbox_active',
    'icon__checkbox', renderByDataFromSessionStorage, needToReplaceAnswersInStorage);

  //Ответы на 2-й вопрос.
  styleTestOption(2, userAnswersCollection2, radioInputsCollection, 'icon__radio_active',
    'icon__radio', renderByDataFromSessionStorage, needToReplaceAnswersInStorage);
}


checkboxInputs.forEach(function (checkBox) {
  checkBox.addEventListener('click', function () {
    checkBox.classList.toggle('icon__checkbox_active');
    checkBox.nextElementSibling.classList.toggle('test__text_theme_orange');

    //Активация кнопки "Показать результат".
    changeShowResultButtonState();
  });
});


radioInputs.forEach(function (radio) {
  radio.addEventListener('click', function () {
    radioInputs.forEach((element) => {
      if (element == radio) {
        element.classList.add('icon__radio_active');
        element.nextElementSibling.classList.add('test__text_theme_orange');
      }
      else {
        element.classList.remove('icon__radio_active');
        element.nextElementSibling.classList.remove('test__text_theme_orange');
      }
    });

    //Активация кнопки "Показать результат".
    changeShowResultButtonState();
  });
});



//Функция удаляет из всех элементов вопроса теста все классы, отвечающие за стили, примененные при отображении
//результатов прохождения теста.
function removeClassesFromTestOption(collection, classToInactivate) {
  const classesToRemove = ['icon__checkbox_active', 'icon__radio_active', 'icon__check-mark_active', 'icon__cross_failure',
    'icon__check-mark', 'icon__cross'];

  collection.forEach((item) => {
    classesToRemove.forEach((classItem) => {
      if (item.classList.contains(classItem)) {
        item.classList.remove(classItem);
        item.nextElementSibling.classList.remove('test__result-text_theme_green');
        item.nextElementSibling.classList.remove('test__result-text_theme_red');
      }
    });

    item.classList.add(classToInactivate);
  });
}

//Функция производит начальную инициацию страницы теста - очистка полей, настройка видимости элементов.
function initializeTestState() {
  //Очищаем поля формы.
  const checkboxInputsCollection = document.querySelector('#test-item_1').querySelectorAll('.icon');
  const radioInputsCollection = document.querySelector('#test-item_2').querySelectorAll('.icon');

  removeClassesFromTestOption(checkboxInputsCollection, 'icon__checkbox');
  removeClassesFromTestOption(radioInputsCollection, 'icon__radio');

  //Скрываем видимость карточек с результатом теста.
  if (!resultTestPositive.classList.contains('hide')) {
    resultTestPositive.classList.add('hide');
  }

  if (!resultTestNegative.classList.contains('hide')) {
    resultTestNegative.classList.add('hide');
  }

  //Скрываем кнопку "Пересдать" и отображаем кнопку "Показать результат".
  retakeButton.classList.add('hide');

  showResultButton.classList.remove('hide');
  showResultButton.classList.remove('button_state_active');
  showResultButton.classList.add('button_state_disabled');

  //Удаляем обработчик с кнопки "Далее".

}


//Пересдача теста. Очищаем поля формы и настраиваем видимость элементов.
function retakeButtonInitialHandler() {
  initializeTestState();
}

retakeButton.addEventListener('click', retakeButtonInitialHandler);




//константы для показа/скрытия карточки
const previewBlock = document.querySelector('#preview');
const testBlock = document.querySelector('#test');
const aboutBlock = document.querySelector('#about');
const startTestButton = document.querySelector('#startTestBtn');
const aboutButton = document.querySelector('#aboutBtn');
const backToPreviewButton = document.querySelector('#backToPreviewBtn');
const returnButton = document.querySelector('#returnBtn');
const returnBottomButton = document.querySelector('#returnBottomBtn');

//Обработчики для кнопки "Далее".
function forwardButtonGoToPositiveHandler() {
  document.location.href = './positive-final.html';
}

function forwardButtonGoToNegativeHandler() {
  document.location.href = './negative-final.html';
}


//функция скрытия блока
function showBlock(blockId) {
  blockId.classList.remove('hide');
};

//Функция добавления блока
function hideBlock(blockId) {
  blockId.classList.add('hide');
};

// поменять карточку превью на карточку теста и инициализировать состояние теста.
startTestButton.addEventListener('click', function () {
  showBlock(testBlock);
  hideBlock(previewBlock);
  initializeTestState();
});

//вернуть карточку превью
function backToPreviewButtonHandler() {
  showBlock(previewBlock);
  hideBlock(testBlock);
}

function backToVideoButtonHandler() {
  document.location.href = './video.html';
}

backToPreviewButton.addEventListener('click', backToPreviewButtonHandler);

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

//Функция анализирует данные локального хранилища sessionStorage и отрисовывает элементы страницы
//в соответствии с сохраненными данными, либо в соответствии с текущим выбором пользователя.
function renderTestResult(renderByDataFromSessionStorage, numberOfAttempts) {
  //Получаем результат теста - из хранилища, либо из ввода пользователя.
  let testResult;

  if (renderByDataFromSessionStorage) {
    testResult = Boolean(sessionStorage.getItem('testResult'));
  } else {
    testResult = getTestResult();

    if (!successfulAttemptFixed) {
      sessionStorage.setItem('testResult', (testResult ? 'v' : ''));
    }
  };

  if (!successfulAttemptFixed && testResult) successfulAttemptFixed = true;

  //Рассчитываем процент верных ответов и определим необходсимость в перезапии данных о выборе пользователя в хранилище.
  const needToReplaceAnswersInStorage = renderPercentageCorrectAnswers(renderByDataFromSessionStorage, testResult);

  //Стилизуем ответы на вопросы теста с учетом корректных данных и выбора пользователя.
  styleTestAnswers(renderByDataFromSessionStorage, needToReplaceAnswersInStorage);

  //Меняем отображение кнопок "Показать результат" и "Пересдать".
  showResultButton.classList.add('hide');
  retakeButton.classList.remove('hide');

  //Перенастраиваем кнопку "Назад".
  backToPreviewButton.removeEventListener('click', backToPreviewButtonHandler);
  backToPreviewButton.addEventListener('click', backToVideoButtonHandler);

  if (testResult) {
    //Отображаем карточку с позитивным результатом теста.
    resultTestPositive.classList.remove('hide');

    //Активизируем кнопку "Далее" и настраиваем обработчик для перехода на другую страницу.
    forwardButton.classList.remove('button_state_disabled');
    forwardButton.classList.add('button_state_active');
    forwardButton.querySelector('img').setAttribute('src', './images/forward-arrow-active.svg');
    forwardButton.addEventListener('click', forwardButtonGoToPositiveHandler);

    //Делаем неактивной (но доступной) кнопку "Пересдать".
    retakeButton.classList.remove('button_state_active');
    retakeButton.classList.add('button_state_inactive');
    retakeButton.querySelector('img').setAttribute('src', './images/retake-inactive.svg');
  } else {
    //Отображаем карточку с негативным результатом теста.
    resultTestNegative.classList.remove('hide');

    //Активизируем кнопку "Пересдать".
    retakeButton.classList.remove('button_state_inactive');
    retakeButton.classList.add('button_state_active');
    retakeButton.querySelector('img').setAttribute('src', './images/retake-active.svg');

    //Если пользователь трижды провалил тест (или мы отображаем данные из хранилища) - активизируем кнопку "Далее"
    //и настраиваем обработчик для перехода на другую страницу.
    //Также - деактивируем кнопку "Пересдать".
    if (numberOfAttempts === attemptsLimitCount) {
      forwardButton.classList.remove('button_state_disabled');
      forwardButton.classList.add('button_state_active');
      forwardButton.querySelector('img').setAttribute('src', './images/forward-arrow-active.svg');

      //Если была хотя бы одна успешная попытка сдачи - кнопка должна вести на страницу "positive-final.html",
      //иначе - на страницу "negative-final.html".
      forwardButton.addEventListener('click', successfulAttemptFixed ? forwardButtonGoToPositiveHandler : forwardButtonGoToNegativeHandler);
    }
  }

  //Количество попыток ограничено. Деактивизируем кнопку "Пересдать".
  if (numberOfAttempts === attemptsLimitCount) {
    retakeButton.classList.remove('button_state_inactive');
    retakeButton.classList.remove('button_state_active');
    retakeButton.classList.add('button_state_disabled');
    retakeButton.querySelector('img').setAttribute('src', './images/retake-disabled.svg');
    retakeButton.removeEventListener('click', retakeButtonInitialHandler);
  }


  //После отображения результата - сбрасываем в false флаг 'showLastTestResult'.
  sessionStorage.setItem('showLastTestResult', '');
}

//Отображение результата теста - кнопка "Показать результат".
showResultButton.addEventListener('click', function () {
  //Защита от срабатывания клика по недоступной кнопке.
  if (this.classList.contains('button_state_disabled')) return;

  //Увеличиваем счетчик количества попыток сдачи.
  numberOfAttempts++;

  renderTestResult(false, numberOfAttempts);
});



//функция посчета % правильных ответов.
function calculatePercentageCorrectAnswers() {
  let result = [];
  let checkboxes = document.getElementsByName('test_checkbox');

  for (let checkbox of checkboxes) {
    if (checkbox.checked) {
      result.push(checkbox.value);
    }
  }

  let radios = document.getElementsByName('test_radio');

  for (let radio of radios) {
    if (radio.checked) {
      result.push(radio.value);
    }
  }

  //считаему сумму %
  const sumWithInitial = result.reduce(
    (previousValue, currentValue) => +previousValue + +currentValue,
    0);

  return Math.round(sumWithInitial);
}

//по клику на кнопу посмотреть результат проверяем чекбоксы и радио
//создаем массив из value true ответов
function renderPercentageCorrectAnswers(renderByDataFromSessionStorage, testResult) {
  //Флаг, показывающий необходимость в дальнейшем (в другой функции) перезаписать данные
  //выбора пользователя в хранилище.
  let needToReplaceAnswersInStorage = false;

  const resaultTitlePositive = document.querySelector('#resultTitlePositive');
  const resaultTitleNegative = document.querySelector('#resultTitleNegative');

  if (renderByDataFromSessionStorage) { //взять данные из хранилища.
    const percentageCorrectAnswers = sessionStorage.getItem('percentageCorrectAnswers');

    if (testResult) {
      resaultTitlePositive.textContent = sessionStorage.getItem('percentageCorrectAnswers') + '%';
    } else {
      resaultTitleNegative.textContent = sessionStorage.getItem('percentageCorrectAnswers') + '%';
    }
  } else { //вычислить проценты по вводу пользователя.
    //считаем сумму.
    const sum = calculatePercentageCorrectAnswers();

    if (testResult) {
      resaultTitlePositive.textContent = sum + '%';

      //В случае положительного результата теста - перезаписываем данные в хранилище только в случае,
      //если пользователь набрал не меньше процентов, чем в прошлый раз.
      const lastPercentage = sessionStorage.getItem('percentageCorrectAnswers');

      if (lastPercentage === null || Number(lastPercentage) <= sum) {
        sessionStorage.setItem('percentageCorrectAnswers', sum);
        needToReplaceAnswersInStorage = true;
      }

    } else {
      resaultTitleNegative.textContent = sum + '%';

      if (!successfulAttemptFixed) {
        sessionStorage.setItem('percentageCorrectAnswers', sum);
      }
    }
  }

  return needToReplaceAnswersInStorage;
}



//Отображаем на странице результат поледнего теста, если в локальном хранилище взведен соотв. флаг.
if (Boolean(sessionStorage.getItem('showLastTestResult'))) {
  renderTestResult(true, attemptsLimitCount);

  showBlock(testBlock);
  hideBlock(previewBlock);
}


const menuItemList = document.querySelectorAll(".sidebar-menu__item-list");

menuItemList.forEach(item => {
  item.parentNode.addEventListener("click", function (evt) {
    evt.stopPropagation();
    item.classList.toggle("sidebar-menu__item-list_open");
  });
});

const menuIcon = document.querySelectorAll(".icon__sidebar-menu");

menuIcon.forEach(item => {
  item.parentNode.addEventListener("click", function (evt) {
    evt.stopPropagation();
    item.classList.toggle("icon__sidebar-menu_rotated");
  });
});
