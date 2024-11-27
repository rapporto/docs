// name`s options

const FN_ADD = 'add';
const FN_CLR = 'clr';
const FN_ON = 'on';
const FN_OFF = 'off';
const FN_$ = '$';

// main works

createAdd();
createClr();
createOn();
createOff();
create$();

// main function

function createAdd() {

	if (checkName(FN_ADD)) return false;

	/**
	 * добавляет дочерний элемент(ы) с заданными аттрибутами
	 * 		 
	 * если аргументов нет, добавляем пустой div
	 * если первый аргумент - строка, до это тип элемента
	 * если первый аргумент - строка, а второй аргумент - объект, то это тип и атрибуты элемента
	 * если первый аргумент - объект, то это атрибуты объекта
	 * 		- если в объекте есть свойство etype, то берем этот тип
	 * 		- иначе тип по умолчанию
	 * если первый аргумент - массив, то в нем должны быть объекты с атрибутами добавляемых элементов
	 * в каждом объекте может быть массив childs, который содержит дочерние элементы
	 * 
	 * возвращает добавленный элемент, или массив добавленных элементов в порядке добавления
	 * 
	 * @param {string|object|array} type       тип элемента или объект с атрибутами элемента или массив объектов с атрибутами элементов
	 * @param {object} attributes атрибуты объекта
	 * @param {element} parent родитель элемента, по умолчанию - текущий элемент
	 * @return {element|array} добавленный элемент или массив элементов
	 * 
	 */
	Element.prototype[FN_ADD] = function(type, attributes, parent = this) {

		// добавление массива элементов
		if (Array.isArray(type)) return convertResults(addElements(type, parent));

		//
		//  проверка переданных параметров
		//  

		attributes = typeof(type) == 'object' ? type :
			attributes || {};

		type = typeof(type) == 'string' ? type :
			typeof(type) == 'object' && typeof(type.etype) == 'string' ? type.etype :
			'div';

		/////

		// добавляем элемент
		let results = [addElement(parent, type, attributes)];

		// добавляем все дочерние элементы, если они есть
		if (Array.isArray(attributes.childs)) results = results.concat(addElements(attributes.childs, results[0]));

		// возвращаем результат в удобной форме
		return convertResults(results);

	};

}

function createClr() {

	if (checkName(FN_CLR)) return false;

	/**
	 * удаляет все дочерние элементы, возвращает текущий элемент
	 * @return {element} текущий элемент
	 */
	Element.prototype[FN_CLR] = function() {

		while (this.lastChild) this.removeChild(this.lastChild);

		return this;

	};

}

function createOn() {

	if (checkName(FN_ON)) return false;

	/**
	 * псевдоним для addEventListener
	 * @param  {string} eventType   тип события
	 * @param  {function} func    функция для выполнения
	 */
	Element.prototype[FN_ON] = function(eventType, func) {

		this.addEventListener(eventType, func);

	}

}

function createOff() {

	if (checkName(FN_OFF)) return false;

	/**
	 * псевдоним для removeEventListener
	 * @param  {string} eventType   тип события
	 * @param  {function} func    функция для выполнения
	 */
	Element.prototype[FN_OFF] = function(eventType, func) {

		this.removeEventListener(eventType, func);

	}

}

function create$() {

	if (checkName(FN_$, window)) return false;

	/**
	 * поиск элементов на странице
	 * @param  {string} p    строка для поиска
	 * @param  {element}  element [description]
	 * @return {element|array|false}       элемент или массив элементов или ничего не найдено
	 */
	window.$ = function(p, element = document) {

		if (typeof(p) !== "string") return false;
		if (p == '') return false;

		// первый символ - определяет тип поиска
		let f = p.substr(0, 1),

			// текст для поиска
			t = p.substr(1),

			// результат поиска
			r = false;

		switch (f) {

			case "#":

				r = document.getElementById(t);
				break;

			case "!":

				r = document.getElementsByName(t);
				break;

			case ".":

				r = element.getElementsByClassName(t);
				break;

			default:

				r = element.getElementsByTagName(p);
				break;

		} // switch

		return r;

	};

}

// вспомогательные функции

/**
 * проверка функции на существование
 * @param  {string} func_name имя функции
 * @param  {element} parent родительский элемент
 * @return {boolean} существует ли подобная функция в элементе
 */
function checkName(func_name, parent = Element) {

	let result = parent[func_name];
	if (result) console.warn(`func ${func_name} already exists, not created!`);
	return result;

}

/**
 * добавляет единичный элемент на страницу
 * @param {element} parent     родительский элемент
 * @param {string} type       тип добавляемого элемента
 * @param {object} attributes атрибуты добавляемого элемента
 * @return {element} добавленный элемент
 */
function addElement(parent, type, attributes) {

	let element = createNewElement(parent, type);
	setElementAttributes(element, attributes);
	return element;

}

/**
 * добавляет все элементы из списка
 * @param {array} arrayOfObjects массив объектов с описанием элементов
 * @param {element} parent         родительский элемент
 * @return {array} массив добавленных элементов
 */
function addElements(arrayOfObjects, parent) {

	let results = [];
	arrayOfObjects.forEach(obj => results = results.concat(parent.add(obj, {}, parent)));
	return results;

}

/**
 * создает новый элемент на странице
 * @param  {element} parent родительский элемент
 * @param  {string} type   тип создаваемого элемента
 * @return {element}        созданный элемент
 */
function createNewElement(parent, type) {

	let element = document.createElement(type);
	parent.appendChild(element);
	return element;

}

/**
 * добавляет элементу атрибуты из объекта
 * @param {element} element    редактируемый элемент
 * @param {object} attributes атрибуты элемента
 * @return {element} редактируемый элемент
 */
function setElementAttributes(element, attributes) {

	for (let key in attributes)
		if (key in element) element[key] = attributes[key];

	return element;

}

/**
 * возвращает массив, либо одно значение, если длина массива равна 1
 * @param  {array} results проверяемый массив
 * @return {array|any}         массив или значение первого элемента
 */
function convertResults(results) {

	results = results.length > 1 ? results :
		results.length == 1 ? results[0] :
		false;

	return results;

}