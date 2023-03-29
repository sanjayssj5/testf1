//Select the Main background picture div as _parent_ and x ray view item as draggable
const draggable = document.getElementsByClassName('resizable')[0];
const _parent_ = document.getElementsByClassName('container')[0];
const imgg = document.getElementById('res-img');


//Get the bounding clien details of both
var _parent_Rect=_parent_.getBoundingClientRect();
var draggableRect=draggable.getBoundingClientRect();


//Correction value for minute overlay differences 
const correction =5;

//set initial values for overlay
imgg.style.left=`${-document.getElementsByClassName('resizable')[0].getBoundingClientRect().left+correction}px`;
imgg.style.top=`${-document.getElementsByClassName('resizable')[0].getBoundingClientRect().top+correction}px`;

// Drag of x ray view
let isDragging = false;

_parent_.addEventListener('mousedown', dragStart);
_parent_.addEventListener('mouseup', dragEnd);
_parent_.addEventListener('mousemove', drag);

let iniX=0;
let iniY=0;
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

    if( (e.clientX >= _parent_Rect.left && (e.clientX+draggableRect.width <= _parent_Rect.right+200)) &&
			  	(e.clientY >= _parent_Rect.top && (e.clientY+draggableRect.height <= _parent_Rect.bottom+200))  
			  ){
        //add draggableRect.width draggableRect.height accoints for
        draggable.style.left = `${e.clientX-document.getElementsByClassName('resizable')[0].getBoundingClientRect().width/2  }px` ;
        draggable.style.top = `${e.clientY-document.getElementsByClassName('resizable')[0].getBoundingClientRect().height/2  }px`;
        imgg.style.left=`${-document.getElementsByClassName('resizable')[0].getBoundingClientRect().left+correction}px`;
        imgg.style.top=`${-document.getElementsByClassName('resizable')[0].getBoundingClientRect().top+correction}px`;
        

			}
      /* else{
        //if mouse went out of bounds in Horizontal dir.
       if(e.clientX+draggableRect.width >= _parent_Rect.right  ){
          draggable.style.left = `${_parent_Rect.right-draggableRect.width}px`;
          imgg.style.left=`${-document.getElementsByClassName('resizable')[0].getBoundingClientRect().left+correction}px`;

        }
        //if mouse went out of bounds in Vertical dir.
        if(e.clientY+draggableRect.height >= _parent_Rect.bottom){
          draggable.style.top = `${_parent_Rect.bottom-draggableRect.height}px`;
          imgg.style.top=`${-document.getElementsByClassName('resizable')[0].getBoundingClientRect().top+correction}px`;



      }*/



  }
}


//Resize of X ray image

function makeResizableDiv(div) {
  const element = document.querySelector(div);
  const resizers = document.querySelectorAll(div + ' .resizer')
  const minimum_size = 80;
  const maximum_size_width =_parent_Rect.width;
  const maximum_size_height =_parent_Rect.height;

  let original_width = 0;
  let original_height = 0;
  let original_x = 0;
  let original_y = 0;
  let original_mouse_x = 0;
  let original_mouse_y = 0;
  for (let i = 0;i < resizers.length; i++) {
    const currentResizer = resizers[i];
    currentResizer.addEventListener('mousedown', function(e) {
      isDragging = false;
      e.preventDefault()
      e.stopImmediatePropagation();
      e.stopPropagation();
      original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
      original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
      original_x = element.getBoundingClientRect().left;
      original_y = element.getBoundingClientRect().top;
      original_mouse_x = e.clientX;
      original_mouse_y = e.clientY;
      window.addEventListener('mousemove', resize)
      window.addEventListener('mouseup', stopResize)
    })
    
    function resize(e) {
      if (currentResizer.classList.contains('bottom-right')) {
        const width = original_width + (e.clientX - original_mouse_x);
        const height = original_height + (e.clientY - original_mouse_y)
        if (width > minimum_size && width<maximum_size_width) {
          element.style.width = width + 'px'
        }
        if (height > minimum_size && height<maximum_size_height) {
          element.style.height = height + 'px'
        }
      }
      else if (currentResizer.classList.contains('bottom-left')) {
        const height = original_height + (e.clientY - original_mouse_y)
        const width = original_width - (e.clientX - original_mouse_x)
        if (height > minimum_size && height<maximum_size_height ) {
          element.style.height = height + 'px'
        }
        if (width > minimum_size && width<maximum_size_width) {
          element.style.width = width + 'px'
          element.style.left = original_x + (e.clientX - original_mouse_x) + 'px'
          imgg.style.left=`${-document.getElementsByClassName('resizable')[0].getBoundingClientRect().left}px`;

        }
      }
      else if (currentResizer.classList.contains('top-right')) {
        const width = original_width + (e.clientX - original_mouse_x)
        const height = original_height - (e.clientY - original_mouse_y)
        if (width > minimum_size && width<maximum_size_width) {
          element.style.width = width + 'px'
        }
        if (height > minimum_size && height<maximum_size_height ) {
          element.style.height = height + 'px'
          element.style.top = original_y + (e.clientY - original_mouse_y) + 'px'
          imgg.style.top=`${-document.getElementsByClassName('resizable')[0].getBoundingClientRect().top}px`;

        }
      }
      else {
        const width = original_width - (e.clientX - original_mouse_x)
        const height = original_height - (e.clientY - original_mouse_y)
        if (width > minimum_size && width<maximum_size_width) {
          element.style.width = width + 'px'
          element.style.left = original_x + (e.clientX - original_mouse_x) + 'px'
          imgg.style.left=`${-document.getElementsByClassName('resizable')[0].getBoundingClientRect().left}px`;

        }
        if (height > minimum_size && height<maximum_size_height) {
          element.style.height = height + 'px'
          element.style.top = original_y + (e.clientY - original_mouse_y) + 'px'
          imgg.style.top=`${-document.getElementsByClassName('resizable')[0].getBoundingClientRect().top}px`;

        }
      }
    }
    
    function stopResize() {
      window.removeEventListener('mousemove', resize)
    }
  }
}

makeResizableDiv('.resizable') 

