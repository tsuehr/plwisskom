const N =  100.0;
var colorized = 0.0;
var thickness = 3.0;
var pointSize = 30;
var scale = 1.0;
var changingLine = false;
var line0 = [-1,-1];
var line1 = [1,-1];

var data = [
0.8166093,  -0.816267,  0,  0,
-0.32101983,  0.83348316, 1,  1,
0.09021718, 0.45793033, 1,  1,
-0.28257972,  0.6942874,  1,  1,
0.63902676, -0.7600312, 0,  0,
0.628985, 0.3393937,  0,  1,
0.628968, -0.75148034,  0,  0,
-0.5372532, -0.56542474,  0,  0,
0.7622007,  0.16985773, 1,  1,
0.8747621,  0.31728256, 1,  1,
0.3028696,  0.19787468, 1,  1,
0.94624275, -0.70553136,  0,  0,
-0.2872464, 0.28382668, 1,  1,
0.35296124, -0.03419605,  0,  1,
-0.105850846, 0.19059165, 1,  1,
0.43283576, 0.22675143, 0,  1,
0.58355486, -0.0028802573,  1,  1,
0.052746885,  -0.464923,  0,  0,
-0.33691043,  -0.6198109, 0,  0,
0.73237777, 0.8129596,  1,  1,
-0.123397954, -0.15745023,  0,  1,
0.45667055, -0.36221737,  0,  1,
0.5613878,  -0.2340108, 0,  1,
0.84314066, 0.38483897, 1,  1,
-0.086826794, -0.59283817,  0,  0,
-0.6079382, 0.13185142, 0,  1,
0.13268232, -0.12758414,  1,  1,
-0.34288046,  0.21775699, 0,  1,
0.51745504, 0.2767576,  0,  1,
-0.302302,  0.545848, 0,  1,
-0.6295776, 0.49177656, 1,  1,
0.33288586, -0.66249067,  0,  0,
-0.5432154, -0.20938416,  0,  0,
-0.24573274,  -0.08304117,  1,  1,
-0.011659816, -0.6459469, 0,  0,
0.8366789,  -0.08566571,  1,  1,
0.2679824,  0.024057334,  1,  1,
0.0907105,  -0.68602705,  0,  0,
0.5721658,  0.046565536,  1,  1,
-0.60298246,  -0.5817415, 0,  0,
-0.36296153,  -0.23409618,  0,  0,
-0.6027022, -0.056837488, 0,  0,
0.66560274, -0.47865957,  0,  0,
-0.69572884,  -0.7491685, 0,  0,
0.34078574, -0.28409526,  0,  0,
0.03745365, 0.501892, 0,  1,
-0.92587256,  -0.65459687,  0,  0,
0.45343313, 0.9388553,  1,  1,
0.86663586, -0.57317257,  0,  0,
-0.85861665,  -0.8645183, 0,  0,
-0.83453506,  0.9177992,  1,  1,
-0.0501818, 0.59252304, 1,  1,
-0.31499678,  -0.5346818, 0,  0,
-0.2924305, -0.66967016,  0,  0,
-0.31115913,  0.24449503, 1,  1,
-0.13499402,  -0.9396484, 0,  0,
-0.22430554,  0.25236085, 0,  1,
0.11682941, 0.40430975, 1,  1,
0.9476858,  0.07014179, 0,  1,
0.49799165, -0.33957598,  0,  0,
-0.51651275,  -0.2712821, 0,  0,
0.32704753, 0.14701588, 1,  1,
0.8016114,  0.15210506, 1,  1,
0.21041292, -0.27834523,  0,  0,
-0.71209526,  -0.9264543, 0,  0,
-0.16035332,  -0.20463468,  0,  1,
0.7845882,  0.8601573,  1,  1,
0.3972285,  -0.4331037, 0,  0,
-0.31574655,  0.6297533,  1,  1,
-0.08559323,  -0.579742,  0,  0,
-0.8407244, 0.61535144, 0,  1,
-0.09252276,  -0.46038926,  0,  0,
0.45640612, -0.57063955,  0,  0,
-0.64705247,  0.38621348, 0,  1,
0.08149238, 0.34204563, 0,  1,
-0.025297748, -0.38961548,  0,  0,
-0.09854369,  -0.1735229, 0,  0,
0.2684595,  0.31628618, 1,  1,
-0.1731673, 0.45381,  1,  1,
0.77252674, -0.1755325, 0,  1,
0.712449, -0.23341471,  1,  0,
-0.14588906,  -0.833861,  0,  0,
0.28886116, 0.8628062,  1,  1,
0.8691613,  -0.7003195, 0,  0,
-0.513556,  -0.36184216,  0,  1,
0.8931258,  0.005517709,  1,  1,
-0.4001646, 0.27734047, 0,  1,
0.050664578,  0.6520226,  1,  1,
0.31930992, -0.26811904,  0,  1,
-0.8413591, 0.34476125, 1,  1,
-0.6141206, -0.6483284, 0,  0,
0.093855076,  -0.17863722,  0,  1,
-0.47951788,  0.9224864,  1,  1,
-0.7647309, 0.9394846,  1,  1,
-0.8704737, 0.076208755,  0,  1,
0.43014202, 0.40364733, 1,  1,
-0.35455358,  -0.04302736,  1,  1,
-0.7433732, 0.14610435, 0,  1,
-0.22303025,  -0.22612523,  0,  1,
-0.63664114,  0.21170928, 1,  1,
];






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
  res = document.getElementById("results");
  if(colorized){
    res.textContent = `Fehler:__${error0+error1}`+"____"+ `davon gelb|blau:____${error0}|${error1}`;
  }
  else{
    res.textContent = `Fehler:__${error0+error1}`;
  }
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
  cont = document.getElementById("w3-content");
  canvas.width = canvas.parentElement.clientWidth-32;
  canvas.height = canvas.parentElement.clientWidth*0.6;
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



