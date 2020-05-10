
//Here we select the input whose value will be the name of new create list whithin list container.
var addItemBtn=document.querySelector('input[type="submit"]');

//A state variable which keeps track for the editable content of the list
let editable=true;

//Here we select the add button that adds the the value of above input to list container.
var inputItemName=document.querySelector('.inputName');

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
        
        if(inputItemName.value=="" || inputItemName.value==" "  )
        {
            //Display an error message on the webpage.
            document.getElementById('errorMessage').innerHTML='<h4 style="background:#0009; color:#00f260; border:1px solid #c31432;">Please Enter Some Value In The Text-Box.</h4>';
        }
        else
        {
            
            //Remove the error message from the page.
            document.getElementById('errorMessage').innerHTML='';

            //Add the list item in the list container here by using innerHTML property.
            listContainer.innerHTML+=
            `
            <li class='listItem'>
                <p class='listContent'>${inputItemName.value}</p>
                 <button class='closeBtn'> X</button>
                 <button class="editBtn" onclick='editTask(this)'>
                     <img src="pencil.png" alt='@'/>
                 </button>
             </li>
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

    function editTask(e){
        if(editable){
            e.parentNode.children[0].setAttribute('contenteditable','true');
            console.log(e.children[0].src);
            e.children[0].src='done.png';
            editable=false;
        }
        else{
            e.parentNode.children[0].setAttribute('contenteditable','false');
            e.children[0].src='pencil.png';
            editable=true;
            if(e.parentNode.children[0].textContent.length>0){
                localStorage.setItem('localListItems',JSON.stringify(listContainer.innerHTML));
            }
            else{
                alert('Since You Have Not Entered Anything \n So The Previous Value Will Be Displayed on Page Reload.');
            }
           
        }
    }
    
   //WHen the body loads then fetch the list items from the local storage and append them in the list container.
   const fetchDataFromLocalStorage=()=>{
       listContainer.innerHTML=JSON.parse(localStorage.getItem('localListItems'));
       let listItemName=document.getElementsByTagName('li');
        console.log("The number of list items are : "+listItemName.length);
       inputItemName.focus();
       
    };

    //Background image displays on complete loading

    const backImg=new Image();
    backImg.src='/bg-body.jpg';
    backImg.addEventListener('load',()=>{

         document.body.style.cssText="background-image:url('/bg-body.jpg');"
    });

    //When window loads then the list box appears
    window.addEventListener('load',()=>{
        setTimeout(fetchDataFromLocalStorage,1500);
    });

    window.addEventListener('DOMContentLoaded',()=>{
        document.getElementById('mainList').style.cssText='transform:translateY(0px);';
        document.querySelector('.addItemHeading').style.cssText='transform:translateX(0px);';
    });