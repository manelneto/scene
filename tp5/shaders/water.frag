#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {
    vec2 factor = 0.01 * vec2(timeFactor) + vTextureCoord;

	vec4 color = texture2D(uSampler, factor + vTextureCoord);
	
    float waterMapColor = texture2D(uSampler2, factor).b * 0.2;

    color += vec4(waterMapColor, waterMapColor, waterMapColor, 1.0);

	gl_FragColor = color;
}