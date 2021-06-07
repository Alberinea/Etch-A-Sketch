const container = document.querySelector('.container');
const clearButton = document.querySelector('#clear');
const eraserButton = document.querySelector('#eraser');
const pencilButton = document.querySelector('#pencil');
let usingEraser = false;
const defSize = 800;

function createDiv() {
    for (let index = 0; index < defSize; index++) {
        const newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'grid');
        container.appendChild(newDiv);
    }
}

function black() {
    this.style.backgroundColor = 'black';
}

function white() {
    this.style.backgroundColor = 'white';
}

function draw(e) {
    if (!usingEraser) {
        e.preventDefault();
        const grids = document.querySelectorAll('.grid');
        grids.forEach((grid) => grid.addEventListener('mousemove', black));
    }
}

function stopDraw(e) {
    if (!usingEraser) {
        e.preventDefault();
        const grids = document.querySelectorAll('.grid');
        grids.forEach((grid) => grid.removeEventListener('mousemove', black));
    }
}

function reset() {
    const grids = document.querySelectorAll('.grid');
    grids.forEach((grid) => (grid.style.backgroundColor = 'white'));
}

function eraserFlag() {
    usingEraser = true;
}

function eraser(e) {
    if (usingEraser) {
        e.preventDefault();
        const grids = document.querySelectorAll('.grid');
        grids.forEach((grid) => grid.addEventListener('mousemove', white));
    }
}

function stopEraser(e) {
    console.log('a');
    if (usingEraser) {
        e.preventDefault();
        const grids = document.querySelectorAll('.grid');
        grids.forEach((grid) => grid.removeEventListener('mousemove', white));
    }
}


function pencil() {
    usingEraser = false;
}

createDiv();
container.addEventListener('mousedown', draw);
container.addEventListener('mouseup', stopDraw);
container.addEventListener('mousedown', eraser);
container.addEventListener('mouseup', stopEraser);
pencilButton.addEventListener('click', pencil);
clearButton.addEventListener('click', reset);
eraserButton.addEventListener('click', eraserFlag);
