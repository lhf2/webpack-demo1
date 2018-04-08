import '../styles/addImage.css'
let smallImg = document.createElement('img');
//必须require进来
smallImg.src = require('../images/small.jpg');
document.body.appendChild(smallImg);

let bigImg = document.createElement('img');
//必须require进来
bigImg.src = require('../images/big.jpg');
document.body.appendChild(bigImg);
