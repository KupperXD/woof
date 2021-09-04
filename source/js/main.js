(function ($) {
    'use strict';

    const html = document.querySelector('html');
    const header = document.querySelector('.js-header');
    const catalogOpened = header.querySelector('.js-catalog-open');

    catalogOpened.addEventListener('click', () => {
       catalogOpened.classList.toggle('opened');
        header.classList.toggle('catalog-open');
    });


    const burgerMenuToggler = header.querySelector('.js-burger-open');

    burgerMenuToggler.addEventListener('click', () => {
       header.classList.toggle('burger-menu-open');

       if (header.classList.contains('burger-menu-open')) {
            html.classList.add('fixed');
       } else {
           html.classList.remove('fixed');
       }

    });

    document.addEventListener('click', (evt) => {
        const target = evt.target;

        if (target.closest('.js-burger-menu') || target.closest('.js-burger-open')) {
            return;
        }

        header.classList.remove('burger-menu-open');
        html.classList.remove('fixed');
    })

    const burgerFilterPanel = header.querySelector('.js-filter-panel');
    const burgerFilterPanelSection = burgerFilterPanel.querySelectorAll('.js-filter-panel-section');

    const filterPanelSectionOpenHandler = (evt) => {
        const element = evt.target.closest('.js-filter-panel-section-open');
        if (!element) {
            return;
        }

        const wrapper = element.closest('.js-filter-panel-section');

        handleFilterOpen(wrapper);
    }

    const filterPanelCloseHandler = (evt) => {
        const isClose = evt.target.closest('.js-filter-panel-section-close');
        if (!isClose) {
            return;
        }
        closeBurgerFilterPanel();
    }

    burgerFilterPanel.addEventListener('click', filterPanelSectionOpenHandler);
    burgerFilterPanel.addEventListener('click', filterPanelCloseHandler);

    const handleFilterOpen = (wrapper) => {
            wrapper.classList.add('active');
            burgerFilterPanel.classList.add('has-open-section');
    }

    const closeBurgerFilterPanel = () => {
        burgerFilterPanel.classList.remove('has-open-section');
        burgerFilterPanelSection.forEach((section) => {
           section.classList.remove('active');
        });
    }

    const searchOpen = header.querySelector('.js-search-open');

    searchOpen.addEventListener('click', () => {
        header.classList.toggle('open-search-panel');
    });

    document.addEventListener('click', (evt) => {
        const target = evt.target;

        if (target.closest('.js-search-open') || target.closest('.js-search-header-panel')) {
            return;
        }
        header.classList.remove('open-search-panel');
    });


    const pageWrapper = document.querySelector('.page-wrapper');

    window.addEventListener('scroll', function (evt) {
        const offsetY = evt.target.scrollingElement.scrollTop;

        if (offsetY > 80) {
            pageWrapper.classList.add('header-fixed');
            header.classList.add('fixed')
            return;
        }

        pageWrapper.classList.remove('header-fixed');
        header.classList.remove('fixed');
    });

    const $bigSliderHolder = $('.js-big-slider');

    $bigSliderHolder.each((index, item) => {
        window.console.log(item);
        const navigation = $(item).find('.js-swiper-pagination').get(0);
        const $prev = $(item).find('.js-swiper-prev').get(0);
        const $next = $(item).find('.js-swiper-next').get(0);
        new Swiper($(item).find('.js-swiper-container').get(0), {
            slidesPerView: 1,
            pagination: {
                clickable: true,
                el: navigation,
            },
            navigation: {
                prevEl: $prev,
                nextEl: $next,
            },
        });
    });

})(jQuery);