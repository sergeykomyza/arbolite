
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ПРОКРУТКА, ШАПКА
const headerLogic = () => {
    const menu = document.querySelector('.menu')
    const gamburger = document.querySelector('.header__burger')

    $('.js-scroll').click(function () {
        var scroll_elem = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(scroll_elem).offset().top
        }, 1000);
        if(document.documentElement.clientWidth < 992){
            gamburger.classList.toggle('is-open')
            menu.classList.toggle('is-active')
        }
    });

    const header = document.querySelector('.header')
    const scrollSize = window.pageYOffset
    function headerActiveToggle() {
        const scrollSize = window.pageYOffset
        scrollSize > 1 ? header.classList.add('active') : header.classList.remove('active')
    }
    window.addEventListener('load', headerActiveToggle)
    window.addEventListener('scroll', headerActiveToggle)

    gamburger.addEventListener('click', function () {
        this.classList.toggle('is-open')
        menu.classList.toggle('is-active')
    });

}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ МАСКА ДЛЯ ИНПУТОВ (https://github.com/RobinHerbots/Inputmask)
const inputMask = () => {
    $(".js-maskPhone").inputmask({
        mask: "+7 (999) 999-99-99",
        clearIncomplete: true
    });
    $('.email').inputmask({
        mask: "*{1,20}[.*{1,20}]@*{1,20}.*{2,4}",
        clearIncomplete: true
        //     greedy: false,
        //     onBeforePaste: function (pastedValue, opts) {
        //         pastedValue = pastedValue.toLowerCase();
        //         return pastedValue.replace("mailto:", "");
        //     },
        //     definitions: {
        //         '*': {
        //             validator: "[0-9A-Za-z-а-я-]",
        //             casing: "lower"
        //         }
        //     }
    });
    $(".js-maskDate").inputmask({
        mask: "99/99/9999",
        clearIncomplete: true,
        'placeholder': 'dd/mm/yyyy'
    });
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ СЛАЙДЕР SWIPER (https://swiperjs.com/get-started) 
const sliders = () => {
    const swiper = new Swiper('.js-sliderText', {
        autoplay: true,
        direction: 'vertical',
        effect: 'slide',
        pagination: {
            el: '.home__textslider .swiper-pagination',
            clickable: true
        }
    })
    const swiper2 = new Swiper('.js-sliderProducts', {
        autoplay: false,
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: '.js-sliderProducts .swiper-pagination',
            clickable: true
        },
        breakpoints: {
            992: {
                slidesPerView: 4
            },
            768: {
                slidesPerView: 3
            },
            565: {
                slidesPerView: 2
            }
        }
    })
    const swiper3 = new Swiper('.js-sliderReviews', {
        autoplay: false,
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: '.js-sliderReviews .swiper-pagination',
            clickable: true
        },
        breakpoints: {
            992: {
                slidesPerView: 3
            },
            768: {
                slidesPerView: 2
            }
        }
    })
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TABS
const tabs = () => {
    const runner = document.querySelector('.runner')
    const tabsHeaderBox = document.querySelector('.tabs__headerbox')
    const tabsHeader = document.querySelector('.tabs__header')
    const tabs = document.querySelectorAll('.js-tabBtn')
    const contents = document.querySelectorAll('.tabs__content')
    runner.style.width = tabs[0].offsetWidth + "px"
    runner.style.left = tabs[0].offsetLeft + "px"
    if (document.documentElement.clientWidth < 992) {
        runner.style.width = tabs[0].offsetWidth + "px"
        runner.style.height = tabs[0].offsetHeight + "px"
        runner.style.top = tabs[0].offsetTop + "px"

        tabsHeader.style.height = tabsHeaderBox.clientHeight + 'px'
    }
    tabs[0].classList.add('is-active')
    if (document.documentElement.clientWidth < 992) {
        runner.innerHTML = tabs[0].innerHTML
    }
    contents.forEach(item => {
        item.classList.remove('is-active')
    })
    contents[0].classList.add('is-active')

    tabs.forEach((item, i) => {

        item.addEventListener('click', function (e) {

            if (document.documentElement.clientWidth < 992) {
                let temp = tabs[i]
                tabsHeader.prepend(temp)
                tabsHeader.style.height = '60px'
                runner.innerHTML = temp.innerHTML
            }

            tabs.forEach(elem => {
                elem.classList.remove('is-active')
            })
            this.classList.add('is-active')
            contents.forEach(item => {
                item.classList.remove('is-active')
            })
            contents[i].classList.add('is-active')
        })
        if (document.documentElement.clientWidth > 992) {
            item.addEventListener('mouseover', function () {
                let itemWidth = this.offsetWidth
                let itemHeight = this.offsetHeight
                let itemLeft = this.offsetLeft
                let itemTop = this.offsetTop
                if (!item.classList.contains('is-active')) {
                    item.querySelector('.tabs__name').style.color = "#FFF"
                    tabs.forEach(elem => {
                        if (elem.classList.contains('is-active')) {
                            elem.querySelector('.tabs__name').style.color = "#000"
                        }
                    })
                }
                runner.style.width = itemWidth + "px"
                runner.style.left = itemLeft + "px"
                if (document.documentElement.clientWidth < 992) {
                    runner.style.width = itemWidth + "px"
                    runner.style.height = itemHeight + "px"
                    runner.style.top = itemTop + "px"
                }
            })
            item.addEventListener('mouseout', function () {
                if (!item.classList.contains('is-active')) {
                    item.querySelector('.tabs__name').style.color = "#000"
                    tabs.forEach(elem => {
                        if (elem.classList.contains('is-active')) {
                            elem.querySelector('.tabs__name').style.color = "#FFF"
                        }
                    })
                }
                runner.style.width = document.querySelector('.tabs__button.is-active').offsetWidth + "px"
                runner.style.left = document.querySelector('.tabs__button.is-active').offsetLeft + "px"

            })
        }

    })

    if (document.documentElement.clientWidth < 992) {
        runner.addEventListener('click', function (e) {
            tabsHeader.style.height = '180px'
        })
    }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ACCORDEON
const accordeons = (box, item, header, content, openedClass, closedClass) => {
    const accordeon = document.querySelector(box)

    const accItem = accordeon.querySelectorAll(item)

    accItem.forEach(item => { // перебираем все блоки аккордеона
        const accContent = item.querySelector(content)
        accContent.style.cssText = `
        overflow: hidden;
        transition: all .3s;
      `
        item.className = closedClass
        accContent.style.maxHeight = 0
        item.addEventListener('click', toggle)
    });

    // accItem[0].className = openedClass
    // accItem[0].querySelector(content).style.maxHeight = accItem[0].querySelector(content).scrollHeight + 'px'

    function toggle(e) {
        let target = e.target
        e.preventDefault()
        const thisClass = this.className
        const itsAccHeader = target == this.querySelector(header) || this.querySelector(header).contains(target)
        const accHeader = this.querySelector(header)
        const accContent = this.querySelector(content)

        accItem.forEach(item => {
            const accHeader = item.querySelector(header)
            const accContent = item.querySelector(content)
            if (itsAccHeader) {
                item.className = closedClass
                accContent.style.maxHeight = 0
            }
        });

        if (thisClass == closedClass) {
            this.className = openedClass
            this.querySelector(content).style.maxHeight = this.querySelector(content).scrollHeight + 'px'
        }

    }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Timer in quiz
const timer = ()=> {
    // let endTime = Date.now() + 172800000; /*1 час*/
    let endTime = Date.now() + 119880;
    let timer = setInterval(function() {
        let t = endTime >= Date.now() ? Math.round((endTime - Date.now()) / 1000) * 1000 : 0;
        let minutes = Math.floor((t/1000/60) % 60);
        let seconds = Math.floor((t/1000) % 60);
        if(seconds < 10){
            seconds = `0${seconds}`
        }
        if(minutes < 10){
            minutes = `0${minutes}`
        }
        document.querySelector(".timer__count").innerHTML = minutes + " : " + seconds;
        if(seconds == 0 && minutes == 0){
            document.querySelector(".timer__count").innerHTML = "Истекло"
        }
    }, 1000);
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ QUIZ
const quiz = ()=> {
    const progress = document.querySelector('.progress')
    const progressLine = document.querySelector('.progress__line')
    const progressCount = document.querySelector('.progress__count')
    const steps = document.querySelectorAll('.step')
    function progressBar(){
        document.querySelectorAll('.step.is-deactive').forEach((item, i) => {
            let count = i+1
            let step = i+1
            progressLine.style.width = step*20 + '%'
            if(count >= 5){
                progressCount.innerHTML = 5
            } else {
                progressCount.innerHTML = +(count+1)
            }
        })
    }
    document.querySelector('.quiz__steps').addEventListener('input', function(e){
        const input = e.target.closest('.step-lable__input')
        const inputText = e.target.closest('.step__entry')
        const nextBtn = e.target.closest('.step').querySelector('.step__button--next')
        const prevBtn = e.target.closest('.step').querySelector('.step__button--prev')
        if(input){
            input.closest('.step').classList.add('is-deactive')
            nextBtn.removeAttribute('disabled')
        }
        if(inputText){
            nextBtn.removeAttribute('disabled')
        }
        progressBar()
    })
    document.querySelector('.quiz__steps').addEventListener('click', function(e){
        const prevBtn = e.target.closest('.step__button--prev')
        const nextBtn = e.target.closest('.step__button--next')
        const prevStep = e.target.closest('.step').previousElementSibling
        const nextStep = e.target.closest('.step').nextElementSibling
        const thisStep = e.target.closest('.step')
        if(prevBtn){
            e.preventDefault()
            nextStep.classList.remove('is-deactive')
        }
        if(nextBtn){
            e.preventDefault()
            thisStep.classList.add('is-deactive')
            if(steps[0].classList.contains('is-deactive')){
                document.querySelector('.afterquiz').classList.add('is-active')
                timer()
            }
        }
        progressBar()
    })
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ КАРТА, ОТЛОЖЕННАЯ ЗАГРУЗКА (ЧТОБЫ УЛУЧШИТЬ ПОКАЗАТЕЛИ - PageSpeed Insights)
const map = () => {

    setTimeout(function () {
        var headID = document.getElementsByTagName("body")[0];
        var newScript = document.createElement('script');
        newScript.type = 'text/javascript';
        newScript.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
        headID.appendChild(newScript);
    }, 1000);
    setTimeout(function () {
        var myMap = new ymaps.Map("map", {
            center: [55.427882, 37.550109],
            zoom: 15,
            controls: ['smallMapDefaultSet']
        }, {
            searchControlProvider: 'yandex#search'
        });

        myGeoObject = new ymaps.GeoObject({
            geometry: {
                type: "Point"
            },
        });
        myMap.geoObjects
            .add(myGeoObject)
            .add(new ymaps.Placemark([55.427882, 37.550109], {
                balloonContent: '<strong>Комсомольская улица, 1, Подольск, Московская область, 142100</strong>',
                iconCaption: 'Комсомольская улица, 1'
            }, {
                preset: 'islands#blueCircleDotIconWithCaption',
                iconCaptionMaxWidth: '200'
            }));

        myMap.setType('yandex#publicMap');

        myMap.behaviors.disable('scrollZoom');
        //на мобильных устройствах... (проверяем по userAgent браузера)
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            //... отключаем перетаскивание карты
            myMap.behaviors.disable('drag');
        }
    }, 2000);

}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ INIT
headerLogic()
inputMask()
sliders()
tabs()
window.addEventListener('scroll', tabs)
accordeons('.accordeon', '.accordeon__item', '.accordeon__header', '.accordeon__content', 'accordeon__item opened', 'accordeon__item closed')
quiz()
map()