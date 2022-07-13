var backgroundVertexShaderSource = 
`#version 300 es

in vec2 a_position;
uniform float u_time;
uniform float u_scale;

void main() {
  vec2 p = a_position;
  gl_Position = vec4(p,0.0,1.0);
}
`