/* Example Code
      The following is just some example code for you to play around with.
      No need to keep this---it's just some code so you don't feel too lonely.
*/

// How can we use require here if it's frontend? We can thank webpack.
const Sort = require("./Sort");
const Snabbt = require("snabbt.js");

// A link to our styles!
require("./index.css");

const inputArrayEle = document.querySelector(".originalArray");
const counterLabelEle = document.querySelector(".counterLabel");
const counterArrayEle = document.querySelector(".counterArray");
const outputArrayEle = document.querySelector(".outputArray");
const originalArrayLabelEle = document.querySelector(".originalArrayLabel");
const outputArrayLabelEle = document.querySelector(".outputArrayLabel");
let inputArray = [];
let sort;
let outputArray;
let inputLabelArray = [];
let counterLength;
let historyOfCounter;
let historyOfResult;
let resultLength;
let step;
let arrayLength = 5;
let maxNumber = 9;

function createInputArray(n) {
  const result = [];
  for (let i = 0; i < n; i++) {
    const randomValue = Math.floor(Math.random() * maxNumber);
    inputArray.push(randomValue);
    inputLabelArray.push(i + 1);
  }
  return result;
}

function visualizeArray(arr, ele) {
  ele.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    const item = document.createElement("div");
    item.innerHTML = `<span>${arr[i]}</span>`;
    ele.appendChild(item);
  }
}
function visualizeArrayInit(counterLength) {
  for (let i = 0; i < counterLength; i++) {
    const LabelItem = document.createElement("div");
    LabelItem.innerHTML = `<span>${i}</span>`;
    counterLabelEle.appendChild(LabelItem);
    const item = document.createElement("div");
    item.innerHTML = `<span>${0}</span>`;
    counterArrayEle.appendChild(item);
  }
}
function proceedToNextStepOfCounter(step) {
  counterArrayEle.querySelectorAll("div").forEach(item => {
    item.classList.remove("active");
    item.classList.remove("ref");
  });
  const counterItem = counterArrayEle.querySelectorAll("div")[
    historyOfCounter[step].index
  ];
  // console.log("test", counterItem);
  counterItem.classList.add("active");
  counterItem.innerHTML = `<span>${historyOfCounter[step].value}</span>`;

  Snabbt(counterItem, "attention", {
    position: [20, 0, 0],
    springConstant: 2.4,
    springDeceleration: 0.9
  });
}
function proceedToNextStepOfResult(step) {
  /**
  Get from position and move to  to position
   */
  console.log("from", historyOfResult[step].from);
  console.log("to", historyOfResult[step].to);
  console.log("value", historyOfResult[step].value);
  inputArrayEle.querySelectorAll("div").forEach(item => {
    item.classList.remove("active");
  });
  counterArrayEle.querySelectorAll("div").forEach(item => {
    item.classList.remove("active");
    item.classList.remove("ref");
  });
  const fromItem = inputArrayEle.querySelectorAll("div")[
    historyOfResult[step].from
  ];

  // console.log("via", counterArrayEle.querySelectorAll("div"));
  const viaItem = counterArrayEle.querySelectorAll("div")[
    historyOfResult[step].value
  ];
  // console.log("via2", viaItem);
  const toItem = outputArrayEle.querySelectorAll("div")[
    historyOfResult[step].to
  ];
  // console.log("fromItem", fromItem);
  // console.log("fromItem", fromItem.offsetTop, fromItem.offsetLeft);
  // console.log("toItem", toItem);
  // console.log("toItem", toItem.offsetTop, toItem.offsetLeft);
  const [positionTop, positionLeft] = [
    toItem.offsetTop - fromItem.offsetTop,
    toItem.offsetLeft - fromItem.offsetLeft
  ];

  fromItem.classList.add("active");
  viaItem.classList.add("ref");
  Snabbt(fromItem, {
    position: [positionLeft, positionTop, 0],
    rotation: [0, 0, 2 * Math.PI],
    easing: "spring",
    springConstant: 0.3,
    springDeceleration: 0.8
  });
}
/*
    An simple example of how you can make your project a bit more
    interactive, if you would like.

    In our `index.html` page, we have a short form.
    Here is the code that talks to it.
  */

function visualizationStepByStep(step) {
  console.log("Counter ", step);
  if (step >= historyOfCounter.length + resultLength) {
    console.log("END!!!");
  } else if (step < historyOfCounter.length) {
    proceedToNextStepOfCounter(step);
  } else {
    proceedToNextStepOfResult(step - historyOfCounter.length);
  }
}

// document.querySelector("#initSetting");
function init() {
  step = 0;
  createInputArray(arrayLength);
  visualizeArray(inputArray, inputArrayEle);
  visualizeArray(inputLabelArray, originalArrayLabelEle);
  visualizeArray(inputLabelArray, outputArrayLabelEle);

  sort = new Sort(inputArray);
  outputArray = sort.sort();
  historyOfCounter = sort.returnCounterHistory();
  historyOfResult = sort.returnResultHistory();
  counterLength = Math.max(...inputArray) + 1;
  resultLength = historyOfResult.length;
  console.log(historyOfCounter);
  console.log(counterLength);
  console.log(historyOfResult);
  visualizeArrayInit(counterLength);
  visualizeArray(outputArray, outputArrayEle);
  console.log(inputArray);
  console.log(outputArray);
  // initChart(inputArray);
}

document.getElementById("resultStartBtn").addEventListener("click", () => {
  visualizationStepByStep(step);
  step++;
});

document.getElementById("resultStartAutoBtn").addEventListener("click", () => {
  setInterval(() => {
    visualizationStepByStep(step);
    step++;
  }, 300);
});
init();
// visualization();
