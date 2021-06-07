const container = document.querySelector('.container');
const clearButton = document.querySelector('#clear');
const eraserButton = document.querySelector('#eraser');
const rainbowButton = document.querySelector('#rainbow');
const defColorButton = document.querySelector('#black');
let usingEraser = false;
const defSize = 800;

function createDiv() {
    for (let i = 0; i < defSize; i++) {
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

function rainbow() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    this.style.backgroundColor = `${color}`;
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

function eraser(e) {
    if (usingEraser) {
        e.preventDefault();
        const grids = document.querySelectorAll('.grid');
        grids.forEach((grid) => grid.addEventListener('mousemove', white));
    }
}

function stopEraser(e) {
    if (usingEraser) {
        e.preventDefault();
        const grids = document.querySelectorAll('.grid');
        grids.forEach((grid) => grid.removeEventListener('mousemove', white));
    }
}

function drawRainbow(e) {
    if (!usingEraser) {
        e.preventDefault();
        const grids = document.querySelectorAll('.grid');
        grids.forEach((grid) => grid.addEventListener('mousemove', rainbow));
    }
}

function stopRainbow(e) {
    if (!usingEraser) {
        e.preventDefault();
        const grids = document.querySelectorAll('.grid');
        grids.forEach((grid) => grid.removeEventListener('mousemove', rainbow));
    }
}

function eraserFlag() {
    container.addEventListener('mousedown', eraser);
    container.addEventListener('mouseup', stopEraser);
    if (!usingEraser) {
        usingEraser = true;
    } else if (usingEraser) {
        usingEraser = false;
        container.removeEventListener('mousedown', eraser);
        container.removeEventListener('mouseup', stopEraser);
    }
}

function defFlag() {
    container.removeEventListener('mousedown', drawRainbow);
    container.removeEventListener('mouseup', stopRainbow);
    container.addEventListener('mousedown', draw);
    container.addEventListener('mouseup', stopDraw);
}

function rainbowFlag() {
    container.removeEventListener('mousedown', draw);
    container.removeEventListener('mouseup', stopDraw);
    container.addEventListener('mousedown', drawRainbow);
    container.addEventListener('mouseup', stopRainbow);
}

createDiv();
container.addEventListener('mousedown', draw);
container.addEventListener('mouseup', stopDraw);
clearButton.addEventListener('click', reset);
eraserButton.addEventListener('click', eraserFlag);
rainbowButton.addEventListener('click', rainbowFlag);
defColorButton.addEventListener('click', defFlag);
