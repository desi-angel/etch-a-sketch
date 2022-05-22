/*Create grid using a function that takes the input size and 
runs a loop variable, each time appending a new div to the container*/
function createGrid(size){    
    clear();                          
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    const loopVar = size * size;
    for (let i =0; i<loopVar; i++){
        const box = document.createElement('div'); //create grid elements
        box.classList.add('box');
        container.appendChild(box);
        box.style.backgroundColor = `rgba(0,0,0,0)`;
        box.addEventListener('click',colorSquare); //add event listener to each box
    }
}
function colorSquare(e){
    if (currentMode === 'rainbow'){
        this.style.backgroundColor = randomColor();
    }

    else if(currentMode === 'shade'){
        const currentColor = this.style.backgroundColor;
        let match = /[^,]+(?=\))/.exec(currentColor);
        let newOpacity = +(match[0]);
        if(newOpacity < 0.9){
            newOpacity = newOpacity+0.1;
            this.style.backgroundColor = `rgba(0,0,0,${newOpacity})`;
        }  
    }

    else{
        this.style.backgroundColor = currentMode;
    }
    
}
function updateSize(newSize){
    currentSize = newSize;
    createGrid(currentSize);
}
function clear(){
    container.innerHTML = '';
}
function randomColor(){
    let colors, symbols;
    symbols = '0123456789ABCDEF';
    colors = '#';
    for(let i = 0; i<6; i++){
        colors = colors + symbols[Math.floor(Math.random()*16)];
    }
    return colors;
}
function resetGrid(){
    boxes.forEach(box => {
        box.style.backgroundColor = 'rgba(0,0,0,0)';
        
    });
}
let shadeNum = 0;
const container = document.querySelector('#grid'); //Select the grid area
const val = document.querySelector('#value'); //Select the element to show the size
let currentSize = 16;
createGrid(currentSize);
val.textContent = `${(currentSize)} x ${(currentSize)}`;
let currentMode = '';

const boxes = document.querySelectorAll('.box'); //Select the grid elements
const buttons = document.querySelectorAll('button'); //Select the buttons and add event listener
buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        //console.log(e.currentTarget.id);
        if(e.currentTarget.id === 'clear') {
            resetGrid();} //clear the drawing board
        else {
            currentMode = e.currentTarget.id; //sets the selected mode
        }

    });
});
const boardSize = document.querySelector('input[type=range]');
boardSize.addEventListener('change', (e) =>{
    updateSize(parseInt(e.target.value))
    val.textContent = `${e.target.value} x ${e.target.value}`;
    
});
