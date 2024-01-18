const container = document.querySelector(".container");


//Save "Notes" object e.g. boxes objects inside elements
var elements = document.querySelectorAll('.test-element');


//Add new notes ba appending new box object into boxContainer where all created notes land intially
  function addBox() {
    var boxContainer = document.getElementById("boxContainer");
    var newBox = document.createElement("div");
    newBox.className = "test-element";
    newBox.textContent = "newTask"; // Add text or other content as needed
    boxContainer.appendChild(newBox);
    makeDraggable(newBox); // Make the new box draggable
  }


//Allows for moving notes
  function makeDraggable(element) {
    element.ontouchstart = element.onmspointerdown = startDrag;
  }


 var elements = document.querySelectorAll('.test-element');
 elements.forEach(makeDraggable);

 // Add new box on button click event. Is being called on pressing the add box button. (Box = Note)
 document.getElementById("addBoxBtn").addEventListener("click", addBox);


// All the code below is being provided by WhatWebCanDo
function startDrag(e) {
  this.ontouchmove = this.onmspointermove = moveDrag;

  this.ontouchend = this.onmspointerup = function () {
    this.ontouchmove = this.onmspointermove = null;
    this.ontouchend = this.onmspointerup = null;
  }

  var pos = [this.offsetLeft, this.offsetTop];
  var that = this;
  var origin = getCoors(e);

  function moveDrag(e) {
    var currentPos = getCoors(e);
    var deltaX = currentPos[0] - origin[0];
    var deltaY = currentPos[1] - origin[1];
    this.style.left = (pos[0] + deltaX) + 'px';
    this.style.top = (pos[1] + deltaY) + 'px';
    return false; // cancels scrolling
  }


  // Return coordinate values for maintaining pos inside document. However breaks when adding more then 3 lanes because horizontal scrolling comes into play.
  // Solution: disable scrolling or create fixed sized document site.
  // Problem: Not enough time for the exercise ...

  function getCoors(e) {
    var coors = [];
      if (e.targetTouches && e.targetTouches.length) {
        var thisTouch = e.targetTouches[0];
        coors[0] = thisTouch.clientX;
        coors[1] = thisTouch.clientY;
      } else {
        coors[0] = e.clientX;
        coors[1] = e.clientY;
      }
    return coors;
  }
}

  var elements = document.querySelectorAll('.test-element');
  [].forEach.call(elements, function (element) {
  element.ontouchstart = element.onmspointerdown = startDrag;
  });


  document.ongesturechange = function () {
    return false;
  }
//______________________________________________________________


document.getElementById("addLaneBtn").addEventListener("click", addLane);

//Add new lanes by pushing new lanes inside kanbanBoard object
function addLane() {
  var kanbanBoard = document.getElementById("kanbanBoard");
  var lane = document.createElement("div");
  lane.className = "lane"; // Assign the 'lane' class
  var laneHeader = document.createElement("div");
  laneHeader.className = "lane-header";
  laneHeader.textContent = "New Lane";
  laneHeader.onclick = function() { editLaneHeader(this); };
  lane.appendChild(laneHeader);
  kanbanBoard.appendChild(lane);
}

//Allow for editing the lane header 
function editLaneHeader(header) {
  var input = document.createElement("input");
  input.type = "text";
  input.value = header.textContent;
  input.className = "lane-header-input"; // Add a class for styling
  input.onblur = function() { updateLaneHeader(header, this); };
  header.innerHTML = ''; // Clear the header
  header.appendChild(input); // Add the input field to the header
  input.focus(); // Automatically focus the input field
}

//Called by function editLaneHeader above for updating the new Text inside the div element of the respective lane.
function updateLaneHeader(header, input) {
  header.textContent = input.value;
}




if ("serviceWorker" in navigator) {
  let version = 3;
  window.addEventListener("load", function() {
    navigator.serviceWorker
     .register("./serviceWorker.js",{ scope: "./" })
      .then(res => console.log("Service worker registered !" + "version:" + version))
      .catch(err => console.log("Service worker not registered !" + "version:" + version, err));
  });
}
