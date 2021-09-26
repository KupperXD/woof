(function ($) {
    'use strict';
    $(document).ready(function () {
        const windowWidth = $(window).innerWidth();

        const sweetAlertCssClass = {
            container: 'custom-popup__container',
            popup: 'custom-popup',
            htmlContainer: 'custom-popup__wrapper',
            closeButton: 'custom-popup__close',
        }
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

        const $productSlider = $('.js-product-slider');

        $productSlider.each((index, item) => {
            const prevButton = $(item).find('.js-product-slider-prev').get(0);
            const nextButton = $(item).find('.js-product-slider-next').get(0);
            const pagination = $(item).find('.js-product-slider-pagination').get(0)

            new Swiper($(item).find('.js-swiper-container').get(0), {
                slidesPerView: 4,
                spaceBetween: 30,
                breakpoints: {
                    320: {
                        spaceBetween: 10,
                        slidesPerView: 'auto',
                    },
                    768: {
                        slidesPerView: 'auto',
                    },
                    1280: {
                        centeredSlides: false,
                        slidesPerView: 4,
                    },
                },
                navigation: {
                    prevEl: prevButton,
                    nextEl: nextButton,
                },
                pagination: {
                    clickable: true,
                    el: pagination,
                },
            });
        });

        $(document).on('click', '.js-brands-open-popup', (evt) => {
            const $target = $(evt.target);
            const $holder = $target.closest('.js-brands-item');
            const popupTemplate = $holder.find('.js-brands-popup').get(0);

            if (typeof popupTemplate === 'undefined' || !popupTemplate) {
                return;
            }

            const cloneTemplate = popupTemplate.cloneNode(true);

            Swal.fire({
                backdrop: true,
                html: cloneTemplate,
                customClass: sweetAlertCssClass,
                padding: 0,
                showConfirmButton: false,
                showCloseButton: true,
            })
        });

        $('.js-select2').each((index, item) => {
            $(item).select2({
                placeholder: 'Выбери меня',
                width: 'style',
                dropdownParent: $(item).parent(),
            });
        });

        $(document).on('click', '.js-donation-success-open', (evt) => {
            evt.preventDefault();
            const popup = $('.js-donation-success-popup').get(0);

            if (typeof popup === 'undefined') {
                return;
            }

            const cloneTemplate = popup.cloneNode(true);

            Swal.fire({
                backdrop: true,
                html: cloneTemplate,
                customClass: {
                    ...sweetAlertCssClass,
                    popup: 'custom-popup custom-popup--donation'
                },
                padding: 0,
                showConfirmButton: false,
                showCloseButton: true,
            })
        });

        $(document).on('click', '.js-catalog-filters-toggle', () => {
           $('.js-catalog-filter').toggleClass('open');
        });

        $(document).on('click', '.js-catalog-filter-close', () => {
            $('.js-catalog-filter').removeClass('open');
        });

        $(document).on('click', (evt) => {
            const $target = $(evt.target);
            const isToggler = !!($target.closest('.js-catalog-filters-toggle').length);
            const isFilters = !!($target.closest('.js-catalog-filter').length);

            if (isFilters || isToggler) {
                return;
            }

            $('.js-catalog-filter').removeClass('open');
        });

        $(document).on('click', '.js-open-shelter-donation-popup', (evt) => {
            const $target = $(evt.target);
            const $cartItem = $target.closest('.js-cart-item-main');
            const popupTemplate = $cartItem.find('.js-gift-shelter-popup').get(0);

            if (typeof popupTemplate === 'undefined') {
                return;
            }

            const cloneTemplate = popupTemplate.cloneNode(true);

            const $select = $(cloneTemplate).find('.js-select2-popup');

            if ($select.length) {
                $select.select2({
                    placeholder: 'Выберете из списка',
                    width: 'style',
                    dropdownParent: $select.parent(),
                });
            }

            Swal.fire({
                backdrop: true,
                html: cloneTemplate,
                customClass: {
                    ...sweetAlertCssClass,
                    popup: 'custom-popup custom-popup--donation-shelter'
                },
                padding: 0,
                showConfirmButton: false,
                showCloseButton: true,
            })
        });

        const isDesktop = windowWidth > 1024;
        const shelterNeedTemplate = $('.js-shelter-need-product').get(0);
        if (isDesktop && typeof shelterNeedTemplate !== 'undefined') {
            let isShowShelterNeedPopup = false;
            let shelterNeedPopupTimeoutId = null;
            const cloneShelterNeedTemplate = shelterNeedTemplate.cloneNode(true);

            const initShelterNeedPopup = () => {
                shelterNeedPopupTimeoutId = setTimeout(() => {
                    Swal.fire({
                        backdrop: true,
                        html: cloneShelterNeedTemplate,
                        customClass: {
                            ...sweetAlertCssClass,
                            popup: 'custom-popup custom-popup--need-shelter'
                        },
                        padding: 0,
                        showConfirmButton: false,
                        showCloseButton: true,
                    });
                    isShowShelterNeedPopup = true;
                }, 8000);
            };

            $(document).on('click mousemove scroll keydown', () => {
                if (isShowShelterNeedPopup) {
                    return;
                }

                if (shelterNeedPopupTimeoutId) {
                    clearTimeout(shelterNeedPopupTimeoutId);
                }

                initShelterNeedPopup();
            });

            $(document).on('click', '.js-not-to-day' , () => {
                Swal.close();
            });

            initShelterNeedPopup();
        }

        //Инициализация слайдеров на детальной продукта
        $('.js-sliders-with-thumbs-container').each((index, item) => {
            const thumbsContainer = $(item).find('.js-thumbs-container .swiper').get(0);
            const mainSliderContainer = $(item).find('.js-product-detail-slider-container .swiper').get(0);
            const thumbsNext = $(item).find('.js-product-detail-nav-next').get(0);
            const mainPagination = $(item).find('.js-product-detail-slider-container .swiper-pagination').get(0);
            console.log(thumbsContainer);
            console.log(mainSliderContainer);
            const thumbs = new Swiper(thumbsContainer, {
                spaceBetween: 24,
                slidesPerView: 'auto',
                direction: 'vertical',
                touchRatio: 0.2,
                slideToClickedSlide: true,
                navigation: {
                    nextEl: thumbsNext,
                },
            });

            const mainSlider = new Swiper(mainSliderContainer, {
                slidesPerView: 1,
                spaceBetween: 40,
                thumbs: {
                    swiper: thumbs,
                },
                pagination: {
                    el: mainPagination,
                    clickable: true,
                }
            });
        });

        const tabsFabric = ($tabsHolder) => {
            const $self = $($tabsHolder);
            const $headers = $self.find('.js-tab-header');
            const $contents = $self.find('.js-tab-content');

            /**
             * Выбор таба с указанным индексом
             * @param {Number} index - индекс таба
             */
            const selectTab = function (index) {
                $headers.removeClass('active').eq(index).addClass('active');
                $contents.removeClass('active').eq(index).addClass('active');

                // событие при переключении таба
                $self.trigger('tabchange', {
                    index: index,
                    tabElement: $headers.eq(index),
                    contentElement: $contents.eq(index)
                });
            };

            /**
             * Инициализация
             */
            const init = function () {
                selectTab(0);

                // обработка событий
                $headers.on('click', function() {
                    selectTab($(this).index());
                });
            };

            init();
        };

        const $tabsHolder = $('.js-tabs-holder');

        $tabsHolder.each((index, item) => {
            tabsFabric($(item));
        });

        $('.js-product-reviews-holder').on('click', '.js-show-more-reviews', (evt) => {
            const $target = $(evt.target);
            const $holder = $target.closest('.js-product-reviews-holder');

            $holder.toggleClass('show-full-reviews');
        });

        $(document).on('click', '.js-product-detail-buy-one-click', () => {
            const popupTemplate = $('.js-buy-one-click-popup').get(0);

            if (typeof popupTemplate === 'undefined') {
                return;
            }

            const cloneTemplate = popupTemplate.cloneNode(true);

            Swal.fire({
                backdrop: true,
                html: cloneTemplate,
                customClass: {
                    ...sweetAlertCssClass,
                    popup: 'custom-popup custom-popup--with-form'
                },
                padding: 0,
                showConfirmButton: false,
                showCloseButton: true,
            })
        });
        $(document).on('click', '.js-product-detail-notify', () => {
            const popupTemplate = $('.js-notify-popup').get(0);

            if (typeof popupTemplate === 'undefined') {
                return;
            }

            const cloneTemplate = popupTemplate.cloneNode(true);

            Swal.fire({
                backdrop: true,
                html: cloneTemplate,
                customClass: {
                    ...sweetAlertCssClass,
                    popup: 'custom-popup custom-popup--with-form'
                },
                padding: 0,
                showConfirmButton: false,
                showCloseButton: true,
            })
        });

        $(document).on('click', '.js-open-auth-popup', () => {
            const popupTemplate = $('.js-popup-auth').get(0);

            if (typeof popupTemplate === 'undefined') {
                console.log('Попап авторизации не был найден');
                return;
            }

            const cloneTemplate = popupTemplate.cloneNode(true);
            Swal.fire({
                backdrop: true,
                html: cloneTemplate,
                customClass: {
                    ...sweetAlertCssClass,
                    popup: 'custom-popup custom-popup--with-form'
                },
                padding: 0,
                showConfirmButton: false,
                showCloseButton: true,
            })
        });
        $(document).on('click', '.js-open-recovery-popup', () => {
            const popupTemplate = $('.js-popup-recovery-password').get(0);

            if (typeof popupTemplate === 'undefined') {
                console.log('Попап восстановления не был найден');
                return;
            }

            const cloneTemplate = popupTemplate.cloneNode(true);
            Swal.fire({
                backdrop: true,
                html: cloneTemplate,
                customClass: {
                    ...sweetAlertCssClass,
                    popup: 'custom-popup custom-popup--with-form'
                },
                padding: 0,
                showConfirmButton: false,
                showCloseButton: true,
            });
        });

        $(document).on('click', '.js-open-call-popup', () => {
            const popupTemplate = $('.js-popup-call-back').get(0);

            if (typeof popupTemplate === 'undefined') {
                console.log('Попап звонка');
                return;
            }

            const cloneTemplate = popupTemplate.cloneNode(true);
            Swal.fire({
                backdrop: true,
                html: cloneTemplate,
                customClass: {
                    ...sweetAlertCssClass,
                    popup: 'custom-popup custom-popup--with-form'
                },
                padding: 0,
                showConfirmButton: false,
                showCloseButton: true,
            });
        });

        $(window).on('scroll', function (evt) {
            const offsetY = evt.target.scrollingElement.scrollTop;
            const $scrollUpButton = $('.js-scroll-up-inner');

            if (offsetY > 80) {
                $scrollUpButton.addClass('visible');
                return;
            }

            $scrollUpButton.removeClass('visible');
        });

        $(document).on('click', '.js-scroll-up-button', function () {
            $(window).scrollTop(0);
        });

        $(document).on('click', '.js-open-profile-edit-popup', () => {
            const popupTemplate = $('.js-popup-edit-profile').get(0);

            if (typeof popupTemplate === 'undefined') {
                console.log('Попап изменения данных не найден');
                return;
            }

            const cloneTemplate = popupTemplate.cloneNode(true);
            Swal.fire({
                backdrop: true,
                html: cloneTemplate,
                customClass: {
                    ...sweetAlertCssClass,
                    popup: 'custom-popup custom-popup--with-form'
                },
                padding: 0,
                showConfirmButton: false,
                showCloseButton: true,
            });
        });

        const $profileOrdersHolder = $('.js-profile-orders-holder');

        $profileOrdersHolder.on('click', '.js-profile-order-open', (evt) => {
            const $order = $(evt.target).closest('.js-profile-order');
            const $orderWrapper = $order.find('.js-profile-order-wrapper');

            if ($order.hasClass('open')) {
                const maxHeight = $order.css('maxHeight');
                $order.removeClass('open');
                $order.css('minHeight', maxHeight || '0px');
                return;
            }

            const heightContent = $($orderWrapper).innerHeight();
            $order.addClass('open');
            $order.css('minHeight', `${heightContent}px`);
        });

        $(document).on('click', '.js-open-review-popup', (evt) => {
            const $target = $(evt.target);
            const popupTemplate = $('.js-popup-reviews-add').get(0);

            if (typeof popupTemplate === 'undefined') {
                return;
            }

            const $itemHolder = $target.closest('.profile-cart-item');

            const originalDesc = $itemHolder.find('.profile-cart-item__title').text();
            const originalImg = $itemHolder.find('.profile-cart-item__image img');
            const cloneTemplate = popupTemplate.cloneNode(true);
            const $starInputs = $(cloneTemplate).find('input[type="radio"]');
            const $labels = $(cloneTemplate).find('.popup-reviews__rating-label');
            const image = $(cloneTemplate).find('.popup-reviews__image img');
            const desc = $(cloneTemplate).find('.popup-reviews__desc');

            //Нужны к id input добавить слово что бы они были уникальными
            $starInputs.each((index, item) => {
                const originalId = $(item).attr('id');
                $(item).attr('id', `clone_${originalId}`);
            });

            $labels.each((index, item) => {
                const originalId = $(item).attr('for');
                $(item).attr('for', `clone_${originalId}`);
            });

            /**
             * заполняем контейнеры попапа данными
             */
            desc.text(originalDesc);
            image.attr('src', originalImg.attr('src'));

            Swal.fire({
                backdrop: true,
                html: cloneTemplate,
                customClass: {
                    ...sweetAlertCssClass,
                    popup: 'custom-popup custom-popup--reviews'
                },
                padding: 0,
                showConfirmButton: false,
                showCloseButton: true,
            });
        });

        $(document).on('click', '.js-add-subscribe-order', () => {
            const popupTemplate = $('.js-popup-subscribe-order').get(0);

            if (typeof popupTemplate === 'undefined') {
                return;
            }

            const cloneTemplate = popupTemplate.cloneNode(true);
            $(cloneTemplate).find('.js-select2-order-subscribe').each((index, item) => {
                $(item).select2({
                    placeholder: 'Выберете из списка',
                    width: 'style',
                    dropdownParent: $(item).parent(),
                });
            });

            Swal.fire({
                backdrop: true,
                html: cloneTemplate,
                customClass: {
                    ...sweetAlertCssClass,
                    popup: 'custom-popup custom-popup--add-order-subscribe'
                },
                padding: 0,
                showConfirmButton: false,
                showCloseButton: true,
            });
        });

        $(document).on('click', '.js-open-subscribe-order-success', () => {
            const popupTemplate = $('.js-popup-order-subscribe-success').get(0);

            if (typeof popupTemplate === 'undefined') {
                return;
            }

            const cloneTemplate = popupTemplate.cloneNode(true);

            Swal.fire({
                backdrop: true,
                html: cloneTemplate,
                customClass: {
                    ...sweetAlertCssClass,
                    popup: 'custom-popup custom-popup--donation'
                },
                padding: 0,
                showConfirmButton: false,
                showCloseButton: true,
            });

        });

    });
})(jQuery);
