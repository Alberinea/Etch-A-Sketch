const container = document.querySelector('.container');
const defSize = 800

function createDiv() {
    for (let index = 0; index < defSize; index++) {
        const newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'grid');
        container.appendChild(newDiv);
    }
}

function black() {
    this.style.backgroundColor = 'black'
}

function draw(e) {
    e.preventDefault(); 
    const grids = document.querySelectorAll('.grid');
    grids.forEach((grid) => grid.addEventListener('mousemove', black));
}

function stopDraw(e) {
    e.preventDefault(); 
    const grids = document.querySelectorAll('.grid');  
    grids.forEach((grid) => grid.removeEventListener('mousemove', black));
}


createDiv();
container.addEventListener('mousedown', draw);
container.addEventListener('mouseup', stopDraw);
