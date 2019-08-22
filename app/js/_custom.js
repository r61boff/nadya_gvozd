'use strict';
document.addEventListener("DOMContentLoaded", function() {

	// Custom JS
//Загрузка карты, отложенная до полной загрузки ресурсов
	window.onload = function() {
		if (document.querySelector('#map')) {
			function add_map() {
				let ya_map = document.createElement('script');
				ya_map.setAttribute('type', 'text/javascript');
				ya_map.setAttribute('charset', 'utf-8');
				ya_map.setAttribute('src', map.map_script);
				document.querySelector('#map').appendChild(ya_map);
			}	
			setTimeout(add_map, 5000);
		}
	}

	document.querySelector('.mall__ul').addEventListener('click', mall_active);
	function mall_active (e) {
		let target = e.target.closest('.mall__ul_li'), li = this.querySelectorAll('.mall__ul_li'), tab = document.querySelectorAll('.mall__tab'), mall_map = document.querySelector('#mall_map').contentDocument, targetid = target.id;
		if (window.innerWidth < 769) {
			if (target.classList.contains('mall__ul_li--shown')) {
				for (let i = 0, len = li.length; i < len; i++) {
					li[i].classList.remove('mall__ul_li--shown', 'mall__ul_li--active');
					tab[i].classList.remove('mall__tab--active');
					if (target == li[i]) {tab[i].classList.add('mall__tab--active')}
				}
				mall_map.querySelector('.active').classList.remove('active');
				mall_map.querySelector('#' + targetid).classList.add('active');
				target.classList.add('mall__ul_li--active');
			} else 
			if (target.classList.contains('mall__ul_li--active')) {
				for (let i = 0, len = li.length; i < len; i++) {
					li[i].classList.add('mall__ul_li--shown');
				}
			}
		} else {
			for (let i = 0, len = li.length; i < len; i++) {
				li[i].classList.remove('mall__ul_li--shown', 'mall__ul_li--active');
				tab[i].classList.remove('mall__tab--active');
				if (target ==li[i]) {tab[i].classList.add('mall__tab--active')}
			} 
			mall_map.querySelector('.active').classList.remove('active');
			mall_map.querySelector('#' + targetid).classList.add('active');
			target.classList.add('mall__ul_li--active');
		}
	}
//Слайдер
	var multiItemSlider = (function () {
	      return function (selector, config) {
	        var
	          _mainElement = document.querySelector(selector), // основный элемент блока
	          _sliderWrapper = _mainElement.querySelector('.slider__wrapper'), // обертка для .slider-item
	          _sliderItems = _mainElement.querySelectorAll('.slider__item'), // элементы (.slider-item)
	          _sliderControls = _mainElement.querySelectorAll('.slider__control'), // элементы управления
	          _sliderControlLeft = _mainElement.querySelector('.slider__control_left'), // кнопка "LEFT"
	          _sliderControlRight = _mainElement.querySelector('.slider__control_right'), // кнопка "RIGHT"
	          _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина обёртки
	          _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // ширина одного элемента    
	          _positionLeftItem = 0, // позиция левого активного элемента
	          _transform = 0, // значение транфсофрмации .slider_wrapper
	          _step = _itemWidth / _wrapperWidth * 100, // величина шага (для трансформации)
	          _items = []; // массив элементов
	        // наполнение массива _items
	        _sliderItems.forEach(function (item, index) {
	          _items.push({ item: item, position: index, transform: 0 });
	        });

	        var position = {
	          getMin: 0,
	          getMax: _items.length - 1,
	        }

	        var _transformItem = function (direction) {
	          if (direction === 'right') {
	            if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) >= position.getMax) {
	              return;
	            }
	            if (!_sliderControlLeft.classList.contains('slider__control_show')) {
	              _sliderControlLeft.classList.add('slider__control_show');
	            }
	            if (_sliderControlRight.classList.contains('slider__control_show') && (_positionLeftItem + _wrapperWidth / _itemWidth) >= position.getMax) {
	              _sliderControlRight.classList.remove('slider__control_show');
	            }
	            _positionLeftItem++;
	            _transform -= _step;
	          }
	          if (direction === 'left') {
	            if (_positionLeftItem <= position.getMin) {
	              return;
	            }
	            if (!_sliderControlRight.classList.contains('slider__control_show')) {
	              _sliderControlRight.classList.add('slider__control_show');
	            }
	            if (_sliderControlLeft.classList.contains('slider__control_show') && _positionLeftItem - 1 <= position.getMin) {
	              _sliderControlLeft.classList.remove('slider__control_show');
	            }
	            _positionLeftItem--;
	            _transform += _step;
	          }
	          _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
	        }

	        // обработчик события click для кнопок "назад" и "вперед"
	        var _controlClick = function (e) {
	          var direction = this.classList.contains('slider__control_right') ? 'right' : 'left';
	          e.preventDefault();
	          _transformItem(direction);
	        };

	        var _setUpListeners = function () {
	          // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
	          _sliderControls.forEach(function (item) {
	            item.addEventListener('click', _controlClick);
	          });
	        }

	        // инициализация
	        _setUpListeners();

	        return {
	          right: function () { // метод right
	            _transformItem('right');
	          },
	          left: function () { // метод left
	            _transformItem('left');
	          }
	        }

	      }
	    }());
	    var gallery_slider = multiItemSlider('.gallery .slider');
	    for (let i = 0, mall = document.querySelectorAll('.mall__tab'), len = mall.length; i < len; i++) {
	    	if (document.querySelector('#' + mall[i].id + ' .slider')) {
	    		let mall_slider = multiItemSlider('#' + mall[i].id + ' .slider')
	    	}
	    } 

//Форма: отключение кнопки отправить для незаполненной формы
	function phone_mask(event) {
		if (!this.value) {
			this.value = '+7 ';}
		else if (this.value === '+7 ') {
			this.value = '';
		}
	}
	function stop_non_digit() {
		if (((event.keyCode>45)&&(event.keyCode<58))||(event.keyCode==8)) {return} 
		else {event.preventDefault();} 
	}
	function stop_enter_send(event) {
		if (event.keyCode == 13) {
			event.preventDefault();
		} return;
	}
	function send_formData(event) {
		event.preventDefault();
		let formData = new FormData(this);
		formData.append('action', 'send_formData');
		console.log(formData.get('action'));
		//Настройка запроса
		let request = new XMLHttpRequest();
	    request.open('POST', map.ajaxurl, true);
	    request.setRequestHeader('accept', 'application/json');
	    console.log(request);
	    //отправка запроса
	    request.send(formData);
	    // Функция для наблюдения изменения состояния request.readyState обновления statusMessage соответственно
        request.onreadystatechange = function () {
            // <4 =  ожидаем ответ от сервера
            let btn_mess = document.querySelector('.fos__input--submit');
            btn_mess.setAttribute('disabled', 'disabled');
            if (request.readyState < 4) {
                btn_mess.innerText = 'Отправляется...';
                btn_mess.style.color = 'yellow';
            }
            // 4 = Ответ от сервера полностью загружен
            else if (request.readyState === 4) {
                // 200 - 299 = успешная отправка данных!
                if (request.status == 200 && request.status < 300) {
                    	btn_mess.innerText = 'Отправлено';
                		btn_mess.style.color = 'green';
                		console.log( request.responseText );
                }

                else {

	                    btn_mess.innerText = 'Ошибка';
	                	btn_mess.style.color = 'red';
            	}
            }
        }
	}
	document.querySelector('.fos__input--phone').addEventListener('focus', phone_mask);
	document.querySelector('.fos__input--phone').addEventListener('blur', phone_mask);
	document.querySelector('.fos__input--phone').addEventListener('keypress', stop_non_digit);
	document.querySelectorAll('.fos__input').forEach(function(el){
		el.addEventListener('keypress', stop_enter_send);
	});
	document.querySelector('.fos__form').addEventListener('submit', send_formData);
});