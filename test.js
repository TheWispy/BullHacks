var renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Scene initialisation
var scene = new THREE.Scene();
var aspectRatio = window.innerWidth/window.innerHeight
var camera = new THREE.PerspectiveCamera( 75, aspectRatio, 0.1, 1000 );
var controls = new THREE.OrbitControls( camera );

var light = new THREE.AmbientLight( 0x404040 );
scene.add(light);

var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5);
directionalLight.position.set(0, 15, 0);
scene.add( directionalLight );

var boxMaterial = new THREE.MeshPhongMaterial({ color: 0x880044});
var floorMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff});
var floor = new THREE.Mesh( new THREE.BoxGeometry(50, 1, 50), floorMaterial)
var cube = new THREE.Mesh( new THREE.BoxGeometry(10,10,10), boxMaterial );
scene.add( cube );
scene.add( floor );

camera.position.z = 20;
camera.rotation.x = -0.2;
camera.position.y = 10;

function render() {
	requestAnimationFrame( render );
	controls.update();
	renderer.render(scene, camera);
};

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
};

render();
