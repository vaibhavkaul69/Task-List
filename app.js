//Here we select the input whose value will be the name of new create list whithin list container.
var addItemBtn=document.querySelector('input[type="submit"]');

//Here we select the add button that adds the the value of above input to list container.
var inputItemName=document.querySelector('input[type="text"]');

//Trigger an click event when we click the add buttton and call addListItem() function.
addItemBtn.addEventListener('click',addListItem);

//Here we select the list container.
const listContainer=document.getElementById('listContainer');

//Add an event listener on the list container.
listContainer.addEventListener('click',deleteListItem);

    //Function is called when add button is clicked.
    function addListItem(ev)
    {
        //This prevents the data of list from deleting when the function finishes its work.
        ev.preventDefault();
        
        if(inputItemName.value=="" || inputItemName.value==" ")
        {
            //Display an error message on the webpage.
            document.getElementById('errorMessage').innerHTML='<img src="error-image.jpg" class="error-img" alt="Hindustani Bhau"/>'+'<h4>Please Enter Some Value In The Text-Box.</h4>';
        }
        else
        {
            
            //Remove the error message from the page.
            document.getElementById('errorMessage').innerHTML='';

            //Add the list item in the list container here by using innerHTML property.
            listContainer.innerHTML+=
            `
            <li class='listItem'>
            ${inputItemName.value}
                <button class='closeBtn'>X</button>
            `;

            //Add the list container into local storage by stringifying it.
            localStorage.setItem('localListItems',JSON.stringify(listContainer.innerHTML));

            //Once a list item is added clear/reset the input.
            inputItemName.value='';
        }
        
}

    //Function gets called when the delete cross button is clicked on a list item.
    function deleteListItem(e)
    {
        e.preventDefault();

        //Check which child of list container contains class=closeBtn and point to that child.
        if(e.target.classList.contains('closeBtn'))
        {
            if(confirm('Are You Sure About That??'))
            {
                //Once the child having closeBtn class is found then removes its parent from the DOM.
                e.target.parentNode.remove();
            }

            //Update the list container to local storage.
            localStorage.setItem('localListItems',JSON.stringify(listContainer.innerHTML));
        }
        
        
    }
    
   //WHen the body loads then fetch the list items from the local storage and append them in the list container.
    document.body.onload=()=>{
       listContainer.innerHTML=JSON.parse(localStorage.getItem('localListItems'));
    }