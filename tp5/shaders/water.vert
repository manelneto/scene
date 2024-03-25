attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform sampler2D waterMap;
uniform float timeFactor;

void main() {
	vTextureCoord = aTextureCoord;
    
    vec2 factor = 0.01 * vec2(timeFactor) + vTextureCoord;

    vec3 offset = vec3(0, 0, texture2D(waterMap, factor).b * 0.1);
    
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}

