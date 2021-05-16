/**
 * Created by Administrator on 2016/3/23.
 */


vec4 permute( vec4 x ) {

  return mod( ( ( x * 34.0 ) + 1.0 ) * x, 289.0 );
}

vec4 taylorInvSqrt( vec4 r ) {

  return 1.79284291400159 - 0.85373472095314 * r;

}

uniform vec3 ambientLightColor;

#if MAX_DIR_LIGHTS > 0

  uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];
uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];

#endif

//env map

uniform float uIrisNoise;
uniform float uIrisMuscels;
uniform float audio;
uniform float audio2;
uniform float audio3;

varying vec3 vReflect;
uniform float reflectivity;
uniform samplerCube envMap;
uniform float flipEnvMap;
uniform int combine;

//phong
varying vec4 mPosition;
varying vec3 vViewPosition;
varying vec3 vNormal;
varying vec3 mNormal;
varying vec2 vUv;

uniform float shininess;
uniform vec3 specular;
uniform vec3 diffuse;
uniform vec3 ambient;

uniform vec3 DiffuseColour1;
uniform vec3 DiffuseColour2;


float snoise( vec3 v ) {

  const vec2 C = vec2( 1.0 / 6.0, 1.0 / 3.0 );
  const vec4 D = vec4( 0.0, 0.5, 1.0, 2.0 );

  // First corner

  vec3 i  = floor( v + dot( v, C.yyy ) );
  vec3 x0 = v - i + dot( i, C.xxx );

  // Other corners

  vec3 g = step( x0.yzx, x0.xyz );
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1. + 3.0 * C.xxx;

  // Permutations

  i = mod( i, 289.0 );
  vec4 p = permute( permute( permute(
              i.z + vec4( 0.0, i1.z, i2.z, 1.0 ) )
          + i.y + vec4( 0.0, i1.y, i2.y, 1.0 ) )
      + i.x + vec4( 0.0, i1.x, i2.x, 1.0 ) );

  // Gradients
  // ( N*N points uniformly over a square, mapped onto an octahedron.)

  float n_ = 1.0 / 7.0; // N=7

  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor( p * ns.z *ns.z );  //  mod(p,N*N)

  vec4 x_ = floor( j * ns.z );
  vec4 y_ = floor( j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs( x ) - abs( y );

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );


  vec4 s0 = floor( b0 ) * 2.0 + 1.0;
  vec4 s1 = floor( b1 ) * 2.0 + 1.0;
  vec4 sh = -step( h, vec4( 0.0 ) );

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3( a0.xy, h.x );
  vec3 p1 = vec3( a0.zw, h.y );
  vec3 p2 = vec3( a1.xy, h.z );
  vec3 p3 = vec3( a1.zw, h.w );

  // Normalise gradients

  vec4 norm = taylorInvSqrt( vec4( dot( p0, p0 ), dot( p1, p1 ), dot( p2, p2 ), dot( p3, p3 ) ) );
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  // Mix final noise value

  vec4 m = max( 0.6 - vec4( dot( x0, x0 ), dot( x1, x1 ), dot( x2, x2 ), dot( x3, x3 ) ), 0.0 );
  m = m * m;
  return 22.0 * dot( m*m, vec4( dot( p0, x0 ), dot( p1, x1 ),  dot( p2, x2 ), dot( p3, x3 ) ) );

}

float surface( vec3 coord ) {

  float n = 0.0;

  n += 0.7    * abs( snoise( coord ) );
  n += 0.25   * abs( snoise( coord * 2.0 ) );
  n += 0.125  * abs( snoise( coord * 4.0 ) );
  n += 0.0625 * abs( snoise( coord * 8.0 ) );
  return n;

}

float surfaceVeins( vec3 coord ) {

  float n = 0.0;

  n += 0.7    * abs( snoise( coord ) );

  return n;

}

void main()
{

  vec3 normal = normalize( vNormal );
  vec3 viewPosition = normalize( vViewPosition );

  vec3 transformedColor = mix(DiffuseColour1,DiffuseColour2, 1.0-audio2);

    #if MAX_DIR_LIGHTS > 0

  vec3 dirDiffuse  = vec3( 0.0 );
  vec3 dirSpecular = vec3( 0.0 );

  for( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {

  vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );

  vec3 dirVector = normalize( lDirection.xyz );
  float dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );

  dirDiffuse  += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;

  // specular
  vec3 dirHalfVector = normalize( dirVector + viewPosition );
  float dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );
  float dirSpecularWeight = max( pow( dirDotNormalHalf, shininess ), 0.0 );

  dirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight;

}

    #endif


  vec3 totalDiffuse = vec3( 0.0 );
  vec3 totalSpecular = vec3( 0.0 );

    #if MAX_DIR_LIGHTS > 0
  totalDiffuse += dirDiffuse;
  totalSpecular += dirSpecular;
    #endif


  float d = (1.0-vUv.y)*1.04;

  float irisNoise = surface(mPosition.xyz*uIrisNoise*(1.0-audio)  )*vUv.y;

  vec3 whiteColor = mix(vec3(1.0,0.0,0.0)+clamp(surfaceVeins(mPosition.yxz*0.01*audio*1.2),0.0,0.1),vec3(1.0), d );

  //stripes in iris
  float Fuzz =10.0;
  float Width = 4.0;
  float scaledT	=	fract( vUv.x*uIrisMuscels+surface(mPosition.xyz*0.05*(audio3+0.4) )*(1.0-audio)) * irisNoise*50.3;

  float	frac1	=	clamp(scaledT / Fuzz, 0.0, 1.0);
  float	frac2	=	clamp((scaledT - Width) / Fuzz, 0.0, 1.0);
  frac1 = frac1 * (1.0 - frac2);

  vec3 iris = mix(transformedColor+irisNoise*6.0,vec3(1.0)+irisNoise*6.0,frac1);
  float irisEdge = smoothstep(.9,.91,d );

  float irisBevelEdge = smoothstep(.9,.98,d);
  vec3 irisBevel = mix(iris,transformedColor* smoothstep(.9,1.0,d)*vec3(1.0),irisBevelEdge);

  vec3 irisSum = mix(whiteColor,irisBevel,irisEdge);

  float holeEdge = smoothstep(.90+0.08*(1.0-audio),.94 + 0.05*(1.0-audio),(d+irisNoise*(audio*0.4)));

  vec3 DiffuseColour = mix(irisSum,vec3(0.0),holeEdge);

  gl_FragColor = vec4(DiffuseColour * ( totalDiffuse * DiffuseColour) + totalSpecular + ambientLightColor * ambient,1.0);


  /* vec4 cubeColor = textureCube( envMap, vec3( flipEnvMap * vReflect.x, vReflect.yz ) );

   if ( combine == 1 ) {

   gl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, reflectivity );

   } else {

   gl_FragColor.xyz = gl_FragColor.xyz * cubeColor.xyz ;
   }
   */
  /* float fogFactor = smoothstep( 1200.0, 1300.0, gl_FragCoord.z / gl_FragCoord.w );

   gl_FragColor = mix( gl_FragColor, vec4( vec3(0.0), gl_FragColor.w ), fogFactor );*/


}