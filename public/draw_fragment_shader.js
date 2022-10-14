var drawFragmentShaderSource = 
`#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform float u_colorized;
uniform float u_thickness;
uniform float u_size;
uniform vec4 u_line;
uniform float u_scale;

out vec3 col;

flat in vec2 center;
flat in int type;
flat in float color;

#define ASP vec2(u_resolution.x/u_resolution.y,1.0)

void main() {
  vec2 c = center*ASP;
  vec2 p = 2.0*(gl_FragCoord.xy/u_resolution.xy-0.5)*ASP;
  vec2 line0 = 2.0*(u_line.xy-0.5)*ASP;
  vec2 line1 = 2.0*(u_line.zw-0.5)*ASP;

  vec2 n = normalize(line1-line0).yx*vec2(1.0,-1.0);

  float side = step(dot(c-line0,n),0.0);

  float l = 0.0;
  vec2 uv = (p-c)*u_resolution.y/u_size;
  if (type==1){
    l = clamp(1.0-abs(length(uv)-0.5)/u_thickness,0.0,1.0);
  }
  if (type==0){
    l = clamp(1.0-(length(uv)-0.45)/u_thickness,0.0,1.0)*clamp(1.0-min(abs(dot(uv,normalize(vec2(1,1)))),abs(dot(uv,normalize(vec2(-1,1)))))/u_thickness,0.0,1.0);
  }
  col = mix(vec3(1.0),mix(vec3(1.0,0.9,0.1),vec3(0.3,0.9,1.0),color),u_colorized)*l;
  if (float(type)!=side){
    col += vec3(1.0,0.1,0.1)*clamp(1.0-abs(length(uv)-0.9)/u_thickness,0.0,1.0);
  }
}
`
