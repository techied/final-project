var barGraph;
var largest = 0;
var data;
var labels;
var smallest = 9999;

function setup() {
  createCanvas(800, 600);
  stroke(0);
  frameRate(5);
  dropzone = select('#dropzone');
  dropzone.dragOver(highlight);
  dropzone.dragLeave(unhighlight);
  dropzone.drop(gotFile, unhighlight);
  fill(0);
  rectMode(CORNERS);
}

function draw() {
  if (data != null) {
    background(255);
    if (barGraph) {
      push();
      textSize(20);
      translate(0, 600);
      for (var i = 0; i < data.length; i++) {
        fill(0);
        if (data[i] == largest) {
          strokeWeight(4);
          stroke(0, 255, 0);
        } else if (data[i] == smallest) {
          strokeWeight(4);
          stroke(255, 0, 0);
        } else {
          stroke(0);
          strokeWeight(1);
        }
        rect((800 / data.length) * i + 50, data[i] * -(600 / largest), (800 /
            data.length) *
          i +
          100, 999);
        strokeWeight(1);
        fill(255);
        text(labels[i], (800 / data.length) * i + 50, -5);
      }
      pop();
    } else {
      push();
      textSize(20);
      translate(0, 600);
      for (var i = 0; i < data.length - 1; i++) {
        fill(0);
        line((800 / data.length) * i + 50, data[i] * -(600 / largest), ((
            800 / data.length) * (i + 1)) + 50,
          data[i + 1] * -(600 / largest));
        fill(255);
      }
      for (var i = 0; i < data.length; i++) {
        text(labels[i], (800 / data.length) * i + 50, -5);
      }
      pop();
    }
    var index = 6;
    for (var i = 0; i < 6; i++) {
      line(50, i * 100 + 99, 800, i * 100 + 99);
      text(largest / 6 * index, 25, i * 100 + 10);
      index--;
    }
  }
}

function gotFile(file) {
  dropzone.remove();
  if (file.name.split('.')[1] == 'graph') {
    data = window.atob(file.data.split(',')[1]).split('\n');
    barGraph = data[0] == 'Bar';
    data.splice(0, 1);
    createP("Loaded graph: " + file.name + "<br />Size: " + file.size +
      " bytes<br />Data: " + data);
    labels = [];
    for (var i = 0; i < data.length; i++) {
      labels[i] = data[i].split(', ')[0];
      data[i] = +data[i].split(', ')[1];
    }
    data.splice(data.length - 1, 1);
    labels.splice(labels.length - 1, 1);
    for (var i = 0; i < data.length; i++) {
      if (data[i] > largest) {
        largest = data[i];
      }
      if (data[i] < smallest) {
        smallest = data[i];
      }
    }
  } else {
    createP(
      "Unsupported file type!<br />Must be of type: .graph<br />Please refresh"
    );
  }
}

function highlight() {
  dropzone.style('background-color', '#CCC');
  dropzone.style('border-style', 'dotted');
  dropzone.style('border-color', '#00C000');
}

function unhighlight() {
  dropzone.style('background-color', '#FFF');
  dropzone.style('border-style', 'dashed');
  dropzone.style('border-color', '#CC0000')
}
