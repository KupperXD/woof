(function () {
    'use strict';

    const header = document.querySelector('.js-header');
    const catalogOpened = header.querySelector('.js-catalog-open');

    catalogOpened.addEventListener('click', () => {
       catalogOpened.classList.toggle('opened');
        header.classList.toggle('catalog-open');
    });
})();