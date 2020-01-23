varying vec3 vUv;
varying vec4 modelViewPosition;
varying vec3 vecNormal;

void main(){
  vUv=position;
  vec4 modelViewPosition=modelViewMatrix*vec4(position,1.);
  vecNormal=(modelViewMatrix*vec4(normal,0.)).xyz;//????????
  gl_Position=projectionMatrix*modelViewPosition;
}