
const sideMenu = document.querySelector('.sidebar-menu');
const progressBlockHeaders = sideMenu.querySelectorAll('.sidebar-menu__progress-block-head');

progressBlockHeaders.forEach(item => {
  item.addEventListener('click', function (evt){
    evt.preventDefault();
    item.parentNode.classList.toggle('sidebar-menu__progress-block_active');
  })
})
