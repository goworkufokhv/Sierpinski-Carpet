'use strict';

var canvas;
var gl;
var bufferId;

var points = [];

var NumTimesToSubdivide = 5;

window.onload = function init() {
  canvas = document.getElementById('gl-canvas');

  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
  }

  divideSquare(-1, -1, 2, NumTimesToSubdivide);

  //
  //  Configure WebGL
  //
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  //  Load shaders and initialize attribute buffers

  var program = initShaders(gl, 'vertex-shader', 'fragment-shader');
  gl.useProgram(program);

  var colorLoc = gl.getUniformLocation(program, 'uColor');

  gl.uniform4f(colorLoc, 1.0, 0.0, 0.0, 1.0); //기본 값을 빨간색으로 지정

  // Load the data into the GPU

  bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

  // Associate out shader variables with our data buffer

  var vPosition = gl.getAttribLocation(program, 'vPosition');
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  render();
  var subdivision = document.getElementById('subdivision');
  var color = document.getElementById('color');

  document.getElementById('DrawButton').onclick = function () {
    var value = subdivision.value;
    var selectedColor = color.value;

    // 선택한 값을 분할 횟수로 변경
    NumTimesToSubdivide = Number(value);

    // 기존 정점 제거
    points = [];

    // 새로운 분할 횟수로 Carpet 생성
    divideSquare(-1, -1, 2, NumTimesToSubdivide);

    // 새 정점 데이터를 GPU Buffer에 저장
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

    // 선택한 색상을 Fragment Shader의 uColor에 전달
    if (selectedColor === 'red') {
      gl.uniform4f(colorLoc, 1.0, 0.0, 0.0, 1.0);
    } else if (selectedColor === 'green') {
      gl.uniform4f(colorLoc, 0.0, 1.0, 0.0, 1.0);
    } else if (selectedColor === 'blue') {
      gl.uniform4f(colorLoc, 0.0, 0.0, 1.0, 1.0);
    }

    // 다시 그리기
    render();
  };
};

function square(a, b, c, d) {
  points.push(a, b, c);

  points.push(a, c, d);
}

function divideSquare(x, y, size, count) {
  if (count === 0) {
    var a = vec2(x, y);
    var b = vec2(x, y + size);
    var c = vec2(x + size, y + size);
    var d = vec2(x + size, y);

    square(a, b, c, d);
  } else {
    var newSize = size / 3;

    for (var row = 0; row < 3; row++) {
      for (var col = 0; col < 3; col++) {
        // 가운데 정사각형은 제외
        if (row === 1 && col === 1) {
          continue;
        }

        var newX = x + col * newSize;
        var newY = y + row * newSize;

        divideSquare(newX, newY, newSize, count - 1);
      }
    }
  }
}

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, points.length);
}
