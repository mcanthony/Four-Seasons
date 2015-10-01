// terrain.frag

precision highp float;

varying vec2 vTextureCoord;
uniform sampler2D textureNormal;
uniform sampler2D textureNoise;
uniform vec3 lightColor;
uniform vec3 lightDir;

const float ambient_color = .35; 
const vec3 ambient = vec3(ambient_color);
const float lightWeight = 1.0 - ambient_color;

const vec3 FOG_COLOR = vec3(243.0, 230.0, 214.0)/255.0;
const vec3 FLOOR_COLOR = vec3(230.0, 227.0, 222.0)/255.0;
 

void main(void) {
	gl_FragColor = vec4(FLOOR_COLOR, 1.0);
	vec3 N = texture2D(textureNormal, vTextureCoord).rgb * 2.0 - 1.0;
	N += texture2D(textureNoise, vTextureCoord*10.0).rgb * .1;
	N = normalize(N);
	float lambert = max(0.0, dot(N, normalize(lightDir)));
	gl_FragColor.rgb *= ambient + lightColor/255.0 * lambert * lightWeight;
}