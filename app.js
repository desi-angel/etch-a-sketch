/*Create grid using a function that takes the input size and 
runs a loop variable, each time appending a new div to the container*/
function createGrid(size){    
    clear();                          
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    const loopVar = size * size;
    for (let i =0; i<loopVar; i++){
        const box = document.createElement('div');
        box.classList.add('box');
        container.appendChild(box);
    }
}
function draw(e){
    const boxes = document.querySelectorAll('.box');
    if(e.currentTarget.id === 'clear'){
        boxes.forEach(box => {
            box.style.backgroundColor = 'white';
        });
    }
    else if(e.currentTarget.id === 'black'){
        boxes.forEach(box => {
            box.addEventListener('mouseenter', () =>{
                box.style.backgroundColor = 'black'
            });
        });
    }
    else{
       boxes.forEach(box => {
           box.addEventListener('mouseenter', () => {
            box.style.backgroundColor = randomColor();
           });
       }); 
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
const container = document.querySelector('#grid'); //Select the grid 
let currentSize = 16;
createGrid(currentSize);

const buttons = document.querySelectorAll('button'); //Select the buttons and add event listener
buttons.forEach(btn => {
    btn.addEventListener('click',draw);
});

const boardSize = document.querySelector('input[type=range]');
boardSize.addEventListener('change', (e) =>{
    updateSize(parseInt(e.target.value))
});

