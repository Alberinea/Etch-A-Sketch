const container = document.querySelector('.container');
const clearButton = document.querySelector('#clear');
const eraserButton = document.querySelector('#eraser');
const rainbowButton = document.querySelector('#rainbow');
const defColorButton = document.querySelector('#black');
const slideBar = document.querySelector('.size-slider');
let usingEraser = false;
let usingRainbow = false;
let usingDefColor = true;
defColorButton.style.backgroundColor = '#0b75d8';
defColorButton.style.color = 'white';
defColorButton.style.opacity = '1';

function createGrid() {
    let defSize = parseInt(slideBar.value);
    let gridSize = defSize * (defSize / 2);
    if (defSize % 2 != 0) {
        gridSize += defSize;
    }
    for (let i = 0; i < gridSize; i++) {
        const newGrid = document.createElement('div');
        newGrid.setAttribute('class', 'grid');
        container.appendChild(newGrid);
    }
}

function removeGrid() {
    const newGrids = document.querySelectorAll('.grid');
    newGrids.forEach((newGrid) => container.removeChild(newGrid));
}

function changePixel() {
    let defSize = slideBar.value;
    container.style.cssText = `grid-template: repeat(${Math.round(defSize / 2)}, 1fr) / repeat(${defSize}, 1fr)`;
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

function changePixelValue() {
    slideBar.innerHTML = this.value;
    removeGrid();
    changePixel();
    createGrid();
}

createGrid();
slideBar.addEventListener('click', changePixelValue);
window.addEventListener('click', colorOff);
container.addEventListener('mousedown', draw);
window.addEventListener('mouseup', stopDraw);
clearButton.addEventListener('click', reset);
eraserButton.addEventListener('click', eraserFlag);
rainbowButton.addEventListener('click', rainbowFlag);
defColorButton.addEventListener('click', defFlag);
