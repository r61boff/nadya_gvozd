'use strict';
document.addEventListener("DOMContentLoaded", function() {

	// Custom JS
//Загрузка карты, отложенная до полной загрузки ресурсов
	window.onload = function() {
		console.log (document.querySelector('.map'));
		let ya_map = document.createElement('script');
		ya_map.setAttribute('type', 'text/javascript');
		ya_map.setAttribute('charset', 'utf-8');
		ya_map.setAttribute('src', 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Ae58f74a26bf3cdc29afb827d8c6d3dd8842c51f90ffb659bf945e55715da694c&amp;width=100%25&amp;height=400&amp;lang=ru_RU&amp;scroll=false');
		document.querySelector('#map').appendChild(ya_map);
	}

	document.querySelector('.mall__ul').addEventListener('click', mall_active);
	function mall_active (e) {
		let target = e.target.closest('.mall__ul_li'), li = this.querySelectorAll('.mall__ul_li'), tab = document.querySelectorAll('.mall__tab'), mall_map = document.querySelector('#mall_map').contentDocument, targetid = target.id;
		console.log (mall_map);
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
	if (window.innerWidth < 681) {
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

	    var mall_slider = multiItemSlider('.slider.mall__tab_gallery'), gallery_slider =multiItemSlider('.gallery .slider'); 
	}
});