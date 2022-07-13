const N =  50.0;
var colorized = 0.0;
var thickness = 3.0;
var pointSize = 30;
var scale = 1.0;
var changingLine = false;
var line0 = [-1,-1];
var line1 = [1,-1];

var data = [];
for (i = 0; i<N; i++){
    data.push(Math.random()*2.0-1.0);
    data.push(Math.random()*2.0-1.0);
    data.push(Math.floor(Math.random()*2.0));
    data.push(Math.floor(Math.random()*2.0));
}







function keyboardEventHandler(e) {
  return;
}

function mouseDown(e) {
  line0 = [(e.x-e.target.getBoundingClientRect().left)/canvas.width,1.0-(e.y-e.target.getBoundingClientRect().top)/canvas.height];
  line1 = [line0[0]+0.001,line0[1]];
  changingLine = true;
}

function mouseMove(e) {
  if (changingLine){
  line1 = [(e.x-e.target.getBoundingClientRect().left)/canvas.width,1.0-(e.y-e.target.getBoundingClientRect().top)/canvas.height];
  }
}

function mouseUp(e) {
  changingLine = false;
  calcError();
}

function check() {
  colorized = (colorized+1)%2;
  calcError();
}

function calcError(){
  const asp = canvas.width/canvas.height;
  const d = [asp*(line1[0]-line0[0])*2,(line1[1]-line0[1])*2];
  const l = Math.sqrt(d[0]*d[0]+d[1]*d[1]);
  const n = [d[1]/l,-d[0]/l];
  const ref = n[0]*2*asp*(line0[0]-0.5)+n[1]*2*(line0[1]-0.5);
  var error0 = 0;
  var error1 = 0;
  var error;
  var p;
  for(i=0;i<N;i++){
    p = [data[4*i],data[4*i+1],data[4*i+2],data[4*i+3]];
    error = ((n[0]*asp*p[0]+n[1]*p[1]-ref)<=0 != p[2]);
    if (error){
      if(p[3]==0){
        error0 += 1;
      }
      else{
        error1 += 1;
      }
    }
  }
  console.log(error0,error1);
}

function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

function resizeCanvas() {
  canvas.width = window.innerWidth*0.6;
  canvas.height = window.innerHeight*0.6;
}

function createTexture(data, w,h, form){
  texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  const level = 0;
  const internalFormat = [gl.RGBA32F,gl.RGBA16F,gl.RG32F][form];
  const border = 0;
  const format = [gl.RGBA,gl.RGBA,gl.RG][form];
  const type = gl.FLOAT;
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, w, h, border, format, type, data);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, [gl.NEAREST,gl.LINEAR][form==1]);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, [gl.NEAREST,gl.LINEAR][form==1]);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return texture;
}

function draw(){
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.viewport(0, 0, canvas.width, canvas.height);


  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE);
  gl.disable(gl.DEPTH_TEST);

  gl.clearColor(0,0,0,1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.useProgram(drawProgram);

  var size = 4;
  var type = gl.FLOAT;
  var normalize = false;
  var stride = 0;
  var offset = 0;
  gl.enableVertexAttribArray(verticesPositionAttributeLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, verticesPositionBuffer);
  gl.vertexAttribPointer(verticesPositionAttributeLocation, size, type, normalize, stride, offset);

  gl.uniform2f(drawResolutionUniformLocation, gl.canvas.width, gl.canvas.height);
  gl.uniform1f(drawTimeUniformLocation, time);
  gl.uniform1f(drawColorizedUniformLocation, colorized);
  gl.uniform1f(drawThicknessUniformLocation, thickness/pointSize);
  gl.uniform1f(drawSizeUniformLocation, pointSize);
  gl.uniform1f(drawScaleUniformLocation, scale);
  gl.uniform4f(drawLineUniformLocation, line0[0],line0[1],line1[0],line1[1]);


  gl.drawArrays(gl.POINTS, 0, N);

  gl.useProgram(backgroundProgram);

  size = 2;
  gl.enableVertexAttribArray(backgroundAttributeLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, backgroundBuffer);
  gl.vertexAttribPointer(backgroundAttributeLocation, size, type, normalize, stride, offset);
  gl.uniform2f(backgroundResolutionUniformLocation, gl.canvas.width, gl.canvas.height);
  gl.uniform1f(backgroundTimeUniformLocation, time);
  gl.uniform1f(backgroundThicknessUniformLocation, thickness/canvas.height/2.0);
  gl.uniform1f(backgroundScaleUniformLocation, scale);
  gl.uniform4f(backgroundLineUniformLocation, line0[0],line0[1],line1[0],line1[1]);


  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  window.requestAnimationFrame(draw);
  time += 0.001;
}

var canvas = document.querySelector("#c");
var checkButton = document.querySelector("#checkButton");

var gl = canvas.getContext("webgl2");

if (!gl) {
  console.log("webgl2 not supported!")
}

const ext = gl.getExtension("EXT_color_buffer_float");
if (!ext) {
  console.log("Can't render to floating point stateTextures");
}

window.onresize = resizeCanvas;
window.onkeydown = keyboardEventHandler;
canvas.addEventListener('mousedown',mouseDown);
canvas.addEventListener('mousemove',mouseMove);
canvas.addEventListener('mouseup',mouseUp);
checkButton.addEventListener('mousedown',check);

resizeCanvas();

//draw program setup
const drawVertexShader = createShader(gl, gl.VERTEX_SHADER, drawVertexShaderSource);
const drawFragmentShader = createShader(gl, gl.FRAGMENT_SHADER, drawFragmentShaderSource);
const drawProgram = createProgram(gl, drawVertexShader, drawFragmentShader);
var drawResolutionUniformLocation = gl.getUniformLocation(drawProgram, "u_resolution");
var drawTimeUniformLocation = gl.getUniformLocation(drawProgram, "u_time");
var drawColorizedUniformLocation = gl.getUniformLocation(drawProgram, "u_colorized");
var drawThicknessUniformLocation = gl.getUniformLocation(drawProgram, "u_thickness");
var drawSizeUniformLocation = gl.getUniformLocation(drawProgram, "u_size");
var drawScaleUniformLocation = gl.getUniformLocation(drawProgram, "u_scale");
var drawLineUniformLocation = gl.getUniformLocation(drawProgram, "u_line");


const verticesPositionAttributeLocation = gl.getAttribLocation(drawProgram, "a_info");
const verticesPositionBuffer = gl.createBuffer();

const vertices = new Float32Array(data);

gl.bindBuffer(gl.ARRAY_BUFFER, verticesPositionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// background program setup
const backgroundVertexShader = createShader(gl, gl.VERTEX_SHADER, backgroundVertexShaderSource);
const backgroundFragmentShader = createShader(gl, gl.FRAGMENT_SHADER, backgroundFragmentShaderSource);
const backgroundProgram = createProgram(gl, backgroundVertexShader, backgroundFragmentShader);
var backgroundResolutionUniformLocation = gl.getUniformLocation(backgroundProgram, "u_resolution");
var backgroundTimeUniformLocation = gl.getUniformLocation(backgroundProgram, "u_time");
var backgroundThicknessUniformLocation = gl.getUniformLocation(backgroundProgram, "u_thickness");
var backgroundScaleUniformLocation = gl.getUniformLocation(backgroundProgram, "u_scale");
var backgroundLineUniformLocation = gl.getUniformLocation(backgroundProgram, "u_line");

const backgroundAttributeLocation = gl.getAttribLocation(backgroundProgram, "a_position");
const backgroundBuffer = gl.createBuffer();

const backgroundPoints = new Float32Array([-1,-1,1,-1,-1,1,1,1]);

gl.bindBuffer(gl.ARRAY_BUFFER, backgroundBuffer);
gl.bufferData(gl.ARRAY_BUFFER, backgroundPoints, gl.STATIC_DRAW);

var time = 0.0;

window.requestAnimationFrame(draw);



