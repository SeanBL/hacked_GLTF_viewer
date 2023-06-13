import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module';

const loader = new GLTFLoader();

// const dracoLoader = new dracoLoader();
// dracoLoader.setDecoderPath('/examples/jsm/libs/draco/');
// loader.setDRACOLoader( dracoLoader );

loader.load( './public/gltfDemo/woolly-mammoth-100k-4096.gltf', function( gltf ) {

    scene.add( gltf.scene );

    gltf.animations;
    gltf.scene;
    gltf.scenes;
    gltf.cameras;
    gltf.asset;

}, 

function ( xhr ) {

    console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );

},

function (error) { 

    console.error(error);

});



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
ambientLight.castShadow = true;
scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.castShadow = true;
spotLight.position.set(0, 64, 32);
scene.add(spotLight);

// const geometry = new THREE.BoxGeometry( 3, 3, 3 );
// const material = new THREE.MeshNormalMaterial();
// const cube = new THREE.Mesh( geometry, material);
// scene.add( cube );

camera.position.z = 5;

//control the view
const controls = new OrbitControls(camera, renderer.domElement);

const stats = Stats();
document.body.appendChild(stats.dom)

function animate() {
    requestAnimationFrame( animate );

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    stats.update();
    controls.update();

    renderer.render( scene, camera );
}

if ( WebGL.isWebGLAvailable() ) {
    animate();
} else {
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById( 'container' ).appendChild( warning );
}