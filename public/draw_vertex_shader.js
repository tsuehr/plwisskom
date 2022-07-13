var drawVertexShaderSource = 
`#version 300 es

in vec4 a_info;
uniform float u_time;
uniform float u_size;
uniform float u_scale;

flat out vec2 center;
flat out int type;
flat out float color;

void main() {
  vec2 p = a_info.xy;
  p *= u_scale;
  center = p;
  type = int(a_info.z);
  color = a_info.w;
  gl_Position = vec4(p,0.0,1.0);
  gl_PointSize = u_size;
}
` 