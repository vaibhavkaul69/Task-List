/** @format */

//Here we select the input whose value will be the name of new create list whithin list container.
var addItemBtn = document.querySelector('input[type="submit"]');

//A state variable which keeps track for the editable content of the list
let editable = true;

//Here we select the add button that adds the the value of above input to list container.
var inputItemName = document.querySelector('.inputName');

//Trigger an click event when we click the add buttton and call addListItem() function.
addItemBtn.addEventListener('click', addListItem);

//Here we select the list container.
const listContainer = document.getElementById('listContainer');

//Add an event listener on the list container.
listContainer.addEventListener('click', deleteListItem);

//Function is called when add button is clicked.
function addListItem(ev) {
	//This prevents the data of list from deleting when the function finishes its work.
	ev.preventDefault();

	if (inputItemName.value == '' || !/[a-zA-Z0-9]+/.test(inputItemName.value)) {
		console.log(inputItemName.value);
		//Display an error message on the webpage.
		inputItemName.classList.add('errorMessage');
	} else {
		inputItemName.classList.remove('errorMessage');
		//Remove the error message from the page.
		//document.getElementById("errorMessage").innerHTML = "";

		//Add the list item in the list container here by using innerHTML property.
		if (
			inputItemName.value.indexOf('https') == -1 ||
			inputItemName.value.indexOf('http') == -1
		) {
			listContainer.innerHTML += `
            <li class='listItem'>
                <p class='listContent'>${inputItemName.value}</p>
                 <button class='closeBtn'> X</button>
                 <button class="editBtn" onclick='editTask(this)'>
                     <img src="pencil.png" alt='Edit'/>
                 </button>
             </li>
            `;
		} else {
			listContainer.innerHTML += `
            <li class='listItem'>
                <a href='${inputItemName.value}' onclick='openLink(this.href);' target='_blank' class='listContentLink'>${inputItemName.value}</a>
                 <button class='closeBtn'> X</button>
                 <button class="editBtn" onclick='editTask(this)'>
                     <img src="pencil.png" alt='Edit'/>
                 </button>
             </li>
            `;
		}

		//Add the list container into local storage by stringifying it.
		localStorage.setItem(
			'localListItems',
			JSON.stringify(listContainer.innerHTML),
		);

		//Once a list item is added clear/reset the input.
		inputItemName.value = '';
	}
}

//Function gets called when the delete cross button is clicked on a list item.
function deleteListItem(e) {
	e.preventDefault();

	//Check which child of list container contains class=closeBtn and point to that child.
	if (e.target.classList.contains('closeBtn')) {
		if (confirm('Are You Sure About That??')) {
			//Once the child having closeBtn class is found then removes its parent from the DOM.
			e.target.parentNode.remove();
		}

		//Update the list container to local storage.
		localStorage.setItem(
			'localListItems',
			JSON.stringify(listContainer.innerHTML),
		);
	}
}

function openLink(link) {
	console.log(link);
	window.open(link, '_blank');
}
function editTask(e) {
	if (editable) {
		//Add a border of 1px to the editable true field
		e.parentNode.style.cssText = 'border:1px solid #fff;';
		e.parentNode.children[0].setAttribute('contenteditable', 'true');
		console.log(e.children[0].src);
		e.children[0].src = 'done.png';
		editable = false;
	} else {
		e.parentNode.style.cssText = 'border:none;';
		e.parentNode.children[0].setAttribute('contenteditable', 'false');
		e.children[0].src = 'pencil.png';
		editable = true;
		if (e.parentNode.children[0].textContent.length > 0) {
			localStorage.setItem(
				'localListItems',
				JSON.stringify(listContainer.innerHTML),
			);
		} else {
			alert(
				'Since You Have Not Entered Anything \n So The Previous Value Will Be Displayed on Page Reload.',
			);
		}
	}
}

//WHen the body loads then fetch the list items from the local storage and append them in the list container.
const fetchDataFromLocalStorage = () => {
	listContainer.innerHTML = JSON.parse(localStorage.getItem('localListItems'));
	let listItemName = document.getElementsByTagName('li');
	console.log('The number of list items are : ' + listItemName.length);
	inputItemName.focus();
};

//When window loads then the list box appears

window.addEventListener('DOMContentLoaded', () => {
	document.getElementById('mainList').style.cssText = 'opacity:1;';
	fetchDataFromLocalStorage();
	listContainer.style.cssText = 'opacity:1;';
});

/**
 * checks if Push notification and service workers are supported by your browser
 */

/**
 * shows a notification
 */
/*
function sendNotification() {
	const img = './bg-body.jpg';
	const text = 'Take a look at this brand new t-shirt!';
	const title = 'New Product Available';
	const options = {
		body: text,
		icon: './app-icon.png',
		vibrate: [200, 100, 200],
		tag: 'new-product',
		image: img,
		badge: 'https://spyna.it/icons/android-icon-192x192.png',
		actions: [
			{
				action: 'Detail',
				title: 'View',
				icon: 'https://via.placeholder.com/128/ff0000',
			},
		],
	};
	navigator.serviceWorker.ready.then(function (serviceWorker) {
		serviceWorker.showNotification(title, options);
	});
}
sendNotification();
*/
