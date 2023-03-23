const draggable = document.getElementById('resizable-image');
const parent = document.getElementsByClassName('container')[0];

var parentRect=parent.getBoundingClientRect();
var draggableRect=draggable.getBoundingClientRect();

const imgg=document.getElementById('res-img');
let isDragging = false;



parent.addEventListener('mousedown', dragStart);
parent.addEventListener('mouseup', dragEnd);
parent.addEventListener('mousemove', drag);



function dragStart(e) {

  e.preventDefault();
  isDragging = true;
  
}

function dragEnd(e) {

  e.preventDefault();

isDragging=false;  
}


function drag(e){
  e.preventDefault();

  if(isDragging){

    if( (e.clientX >= parentRect.left && (e.clientX+draggableRect.width <= parentRect.right)) &&
			  	(e.clientY >= parentRect.top && (e.clientY+draggableRect.height <= parentRect.bottom))  
			  ){
        //add draggableRect.width draggableRect.height accoints for
        draggable.style.left = `${e.clientX}px`;
        draggable.style.top = `${e.clientY}px`;
        imgg.style.left=`${-document.getElementById('resizable-image').getBoundingClientRect().left}px`;
        imgg.style.top=`${-document.getElementById('resizable-image').getBoundingClientRect().top}px`;
        

			}
      else{
        //if mouse went out of bounds in Horizontal dir.
        if(e.clientX+draggableRect.width >= parentRect.right){
          draggable.style.left = `${parentRect.right-draggableRect.width}px`;
        }
        //if mouse went out of bounds in Vertical dir.
        if(e.clientY+draggableRect.height >= parentRect.bottom){
          draggable.style.top = `${parentRect.bottom-draggableRect.height}px`;
        }
      }



  }
}