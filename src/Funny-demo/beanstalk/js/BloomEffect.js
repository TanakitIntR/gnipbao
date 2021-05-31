var BloomEffect = function ( renderer,renderTarget,baseWidth,baseHeight, strength ) {

        var camera, scene, materialScreen, shader, 
        screenUniforms, convolutionUniforms,
        materialScreen, materialConvolution,
        renderTarget2, renderTarget3,
        quad,
        blurx, blury
        
        this.init = function () {

                camera = new THREE.Camera();
                camera.projectionMatrix = THREE.Matrix4.makeOrtho( baseWidth / - 2, baseWidth / 2, baseHeight / 2, baseHeight / - 2, - 10000, 10000 );
                camera.position.z = 100;

                scene = new THREE.Scene();

                var pars = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter };
                renderTarget2 = new THREE.WebGLRenderTarget( 512, 512, pars );
                renderTarget3 = new THREE.WebGLRenderTarget( 512, 512, pars );

                var screenShader = ShaderUtils.lib[ "screen" ];
                screenUniforms = THREE.UniformsUtils.clone( screenShader.uniforms );

                screenUniforms[ "tDiffuse" ].texture = renderTarget;
                screenUniforms[ "opacity" ].value = ( strength !== undefined ) ? strength : 1;

                materialScreen = new THREE.MeshShaderMaterial( {

                        uniforms: screenUniforms,
                        vertexShader: screenShader.vertexShader,
                        fragmentShader: screenShader.fragmentShader,
                        blending: THREE.AdditiveBlending,
                        transparent: true

                } );

                var convolutionShader = ShaderUtils.lib[ "convolution" ];
                convolutionUniforms = THREE.UniformsUtils.clone( convolutionShader.uniforms );

                blurx = new THREE.Vector2( 0.001953125, 0.0 ),
                blury = new THREE.Vector2( 0.0, 0.001953125 );

                convolutionUniforms[ "tDiffuse" ].texture = renderTarget;
                convolutionUniforms[ "uImageIncrement" ].value = blurx;
                convolutionUniforms[ "cKernel" ].value = ShaderUtils.buildKernel( 4.0 );

                materialConvolution = new THREE.MeshShaderMaterial( {

                        uniforms: convolutionUniforms,
                        vertexShader:   "#define KERNEL_SIZE 25.0\n" + convolutionShader.vertexShader,
                        fragmentShader: "#define KERNEL_SIZE 25\n"   + convolutionShader.fragmentShader

                } );

                quad = new THREE.Mesh( new Plane( baseWidth, baseHeight ), materialConvolution );
                quad.position.z = -500;
                scene.addObject( quad );


        };

        this.update = function () {

                // Render quad with blured scene into texture (convolution pass 1)
					
                quad.materials[ 0 ] = materialConvolution;

                convolutionUniforms.tDiffuse.texture = renderTarget;
                convolutionUniforms.uImageIncrement.value = blurx;

                renderer.render( scene, camera, renderTarget2, true );

                // Render quad with blured scene into texture (convolution pass 2)

                convolutionUniforms.tDiffuse.texture = renderTarget2;
                convolutionUniforms.uImageIncrement.value = blury;

                renderer.render( scene, camera, renderTarget3, true );

                // Render original scene with superimposed blur to texture

                quad.materials[ 0 ] = materialScreen;

                materialScreen.blending = THREE.AdditiveBlending;
                screenUniforms.tDiffuse.texture = renderTarget3;
					 materialScreen.uniforms.opacity.value = 0.6;
                renderer.render( scene, camera,renderTarget,false);
					 
					 renderer.render( scene, camera );

        };

}

BloomEffect.prototype.constructor = BloomEffect;