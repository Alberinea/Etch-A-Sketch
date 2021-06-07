const container = document.querySelector('.container');
const clearButton = document.querySelector('#clear');
const eraserButton = document.querySelector('#eraser');
const rainbowButton = document.querySelector('#rainbow');
const defColorButton = document.querySelector('#black');
let usingEraser = false;
let usingRainbow = false;
let usingDefColor = true;
const defSize = 800;
defColorButton.style.backgroundColor = '#0b75d8';
defColorButton.style.color = 'white'
defColorButton.style.opacity = '1'

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
    window.addEventListener('mouseup', stopEraser);
    console.log('a');
    if (!usingEraser) {
        usingEraser = true;
    } else if (usingEraser) {
        usingEraser = false;
        container.removeEventListener('mousedown', eraser);
        window.removeEventListener('mouseup', stopEraser);
    }
}

function defFlag() {
    usingRainbow = false;
    usingDefColor = true;
    if (usingDefColor) {
        defColorButton.style.backgroundColor = '#0b75d8';
        defColorButton.style.color = 'white';
        defColorButton.style.opacity = '1';
        container.removeEventListener('mousedown', drawRainbow);
        window.removeEventListener('mouseup', stopRainbow);
        container.addEventListener('mousedown', draw);
        window.addEventListener('mouseup', stopDraw);
    }
}

function rainbowFlag() {
    usingDefColor = false;
    usingRainbow = true;
    if (usingRainbow) {
        rainbowButton.style.backgroundColor = '#0b75d8';
        rainbowButton.style.color = 'white';
        rainbowButton.style.opacity = '1';
        container.removeEventListener('mousedown', draw);
        window.removeEventListener('mouseup', stopDraw);
        container.addEventListener('mousedown', drawRainbow);
        window.addEventListener('mouseup', stopRainbow);
    }
}

function colorOff() {
    if (!usingRainbow) {
        rainbowButton.style.cssText = 'opacity: 0.7 ;';
    }
    if (!usingDefColor) {
        defColorButton.style.cssText = 'opacity: 0.7;';
    }
}

createDiv();
window.addEventListener('click', colorOff);
container.addEventListener('mousedown', draw);
window.addEventListener('mouseup', stopDraw);
clearButton.addEventListener('click', reset);
eraserButton.addEventListener('click', eraserFlag);
rainbowButton.addEventListener('click', rainbowFlag);
defColorButton.addEventListener('click', defFlag);
