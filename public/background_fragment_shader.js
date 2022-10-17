var backgroundFragmentShaderSource = 
`#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform float u_thickness;
uniform float u_scale;
uniform vec4 u_line;

out vec3 color;

#define ASP vec2(u_resolution.x/u_resolution.y,1.0)
#define lineColor vec3(1.0)

void main() {
  vec2 p = (gl_FragCoord.xy/u_resolution-0.5)/u_scale*ASP;

  vec2 line0 = (u_line.xy-0.5)/u_scale*ASP;
  vec2 line1 = (u_line.zw-0.5)/u_scale*ASP;
  vec2 d = normalize(line1-line0);

  vec2 n = d.yx*vec2(1.0,-1.0);

  float in_line = clamp(1.0-abs(dot(p-line0,n)/u_thickness),0.0,1.0);


  color = mix(vec3(0.0,0.1,0.05),vec3(0.15,0.0,0.0),step(0.0,dot(p-line0,n)));

  color = mix(color,lineColor,in_line);

  color += lineColor*max(clamp(1.0-length(p-line0)/(4.0*u_thickness),0.0,1.0),clamp(1.0-length(p-line1)/(4.0*u_thickness),0.0,1.0));
}
`
