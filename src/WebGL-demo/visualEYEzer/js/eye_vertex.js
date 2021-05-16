varying vec4 mPosition;
varying vec3 mNormal;
varying vec3 vViewPosition;
varying vec3 vNormal;
varying vec2 vUv;

//env map
varying vec3 vReflect;
uniform float refractionRatio;
uniform bool useRefract;

void main()
{


  //mPosition = objectMatrix * vec4( position.xyz, 1.0 );
  mPosition = vec4( position.xyz, 1.0 );
  vec4 mvPosition = modelViewMatrix * mPosition;

  vViewPosition = -mvPosition.xyz;

  vec3 transformedNormal = normalMatrix * normal;
  vNormal = transformedNormal;
  mNormal = normal;

  vUv = uv;

  //mPosition = position.xyz;

  gl_Position = projectionMatrix * mvPosition;

  vec3 nWorld = mat3( objectMatrix[ 0 ].xyz, objectMatrix[ 1 ].xyz, objectMatrix[ 2 ].xyz ) * normal;

  if ( useRefract ) {
    vReflect = refract( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ), refractionRatio );
  } else {
    vReflect = reflect( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ) );
  }


}