const createMyElement = element => {
	return document.createElement(element);
};

const writeText = (text) => {
	return document.createTextNode(text);
};

const getMyElement = (elementId) => {
	return document.getElementById(elementId)
};

const append = (parent, el) => {
	return parent.appendChild(el); // Append the second parameter(element) to the first one
};

const addClass = (parent, myClass) => {
	return parent.classList.add(myClass);
};

const removeClass = (parent, myClass) => {
	return parent.classList.remove(myClass);
};

const changeClasses = (element, classToBeRemoved, classToBeAdded) => {
	removeClass(element, classToBeRemoved);
	addClass(element, classToBeAdded);
}