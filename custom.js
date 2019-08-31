/* bling.js */

window.$ = document.querySelectorAll.bind(document);

Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn);
}

NodeList.prototype.__proto__ = Array.prototype;

NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
  this.forEach(function (elem, i) {
    elem.on(name, fn);
  });
}

/////////


const randomIntFromRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const getRandomPlacement = () => {
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    
    const position = {
        left: randomIntFromRange(0, winWidth),
        top: randomIntFromRange(0, winHeight)
    }
    return position;
}

const ericConfig = {
    name: "Eric",
    path: "img/hipwood/",
    numImages: 10,
    min: 75,
    max: 100
}

const giraffeConfig = {
    name: "Giraffe",
    path: "img/giraffe/",
    numImages: 10,
    min: 50,
    max: 75
}

const generatePics = (arrayOfConfigs) => {
    arrayOfConfigs.forEach(pictureSet => {
        const { min, max, numImages, path } = pictureSet;
        const totalNumImages = randomIntFromRange(min, max);
        console.log("Printing out " + totalNumImages + " of " + pictureSet.name);
        for(let i = 0; i < totalNumImages; i++){
            const imageNumber = randomIntFromRange(1, numImages);
            const { left, top } = getRandomPlacement();
            const imgTag = document.createElement("IMG");
            imgTag.src = `${path}${imageNumber}.png`;
            imgTag.style.position = "absolute";
            imgTag.style.left = left + "px";
            imgTag.style.top = top + "px";
            imgTag.style.zIndex = randomIntFromRange(2, 500);
            $("#hipwoodGiraffeContainer")[0].appendChild(imgTag);  
        }
    })
}

const musicButton = $("#playMusic")[0];
const lionsMusic = new Audio('la_marseilleise.mp3');

document.addEventListener('DOMContentLoaded', function(){ 
    generatePics([ericConfig, giraffeConfig]);
    musicButton.on("click", () => {
        if(lionsMusic.duration > 0 && !lionsMusic.paused) {
            lionsMusic.pause()
        } else {
            lionsMusic.play()
        }
    })
}, false);
