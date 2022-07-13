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
  //float axis = clamp(1.0-abs((p.x+0.5*ASP.x)/u_thickness),0.0,1.0);
  //axis = max(axis,clamp(1.0-abs((p.y+0.5)/u_thickness),0.0,1.0));

  //vec2 rect = step(abs(p),ASP*0.53);

  //axis *= min(rect.x,rect.y);

  vec2 line0 = (u_line.xy-0.5)/u_scale*ASP;
  vec2 line1 = (u_line.zw-0.5)/u_scale*ASP;

  vec2 n = normalize(line1-line0).yx*vec2(1.0,-1.0);

  float in_line = clamp(1.0-abs(dot(p-line0,n)/u_thickness),0.0,1.0);

  color = vec3(0.0);

  //color = mix(color,vec3(1.0),axis);

  color = mix(color,lineColor,in_line);

  color += lineColor*max(clamp(1.0-length(p-line0)/(4.0*u_thickness),0.0,1.0),clamp(1.0-length(p-line1)/(4.0*u_thickness),0.0,1.0));
}
`