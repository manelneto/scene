#ifdef GL_ES
precision highp float;
#endif

varying vec4 vertexPosition;

void main() {
    if(vertexPosition.y > 0.5) {
        gl_FragColor = vec4(0.9, 0.9, 0, 1);
    }
    else {
        gl_FragColor = vec4(0.54, 0.54, 0.9, 1);
    }
}