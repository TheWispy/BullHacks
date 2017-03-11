var camera;
var scene;
var renderer;
var controls;
var stations = [[10, 20], [0, 5], [-15, 15], [10, -10]];
var train;

init();
animate();
//Scene initialisation
function init(){
	//Create scene
	scene = new THREE.Scene();

	//Create camera
	var aspectRatio = window.innerWidth/window.innerHeight
	camera = new THREE.PerspectiveCamera( 75, aspectRatio, 0.1, 1000 );
	camera.position.set(0, 10, 20);
	camera.rotation.x = -0.2;

	//Add scene elements
	addSceneElements();

	//Add lights
	addLights();

	//renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio);
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	//Add controls
	controls = new THREE.OrbitControls(camera);
}

function addLights(){
	var light = new THREE.AmbientLight( 0x404040 );
	scene.add(light);

	var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5);
	directionalLight.position.set(2, 15, 0);
	scene.add( directionalLight );
}

function lineBetween(array, i, j){
	geometry = new THREE.Geometry(100, 10);
	geometry.vertices.push(new THREE.Vector3(array[i][0], 3, array[i][1]));
	geometry.vertices.push(new THREE.Vector3(array[j][0], 3, array[j][1]));
	material = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 20 } );
	line = new THREE.Line(geometry, material);
	scene.add(line);
}

function train(to, from, factor){
	this.to = to;
	this.from = from;
	this.factor = 0;
}

function beginTrain(i, j, factor){
    var trainMat = new THREE.MeshPhongMaterial({ color: 0xd42525});
    train = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 4));
    scene.add(train);
    train.position.set(stations[i][0], 1, stations[i][1]);

    var dx = stations[j][0] - train.position.x;
    var dz = stations[j][1] - train.position.z;
	var tween = new TWEEN.Tween(train.position).to({ x: train.position.x+dx*factor, y: mesh.position.y, z: train.position.z+dz*factor }, time).start();
}

function addSceneElements(){

	var stationMat = new THREE.MeshPhongMaterial({ color: 0xcc3a3a});
	var floorMat = new THREE.MeshPhongMaterial({ color: 0xffffff});


	var floor = new THREE.Mesh( new THREE.BoxGeometry(50, 1, 50), floorMat);

	for(var i=0; i<stations.length; i++){
		var stationMesh = new THREE.Mesh( new THREE.BoxGeometry(5,5,5), stationMat);
		scene.add(stationMesh);
		stationMesh.position.set(stations[i][0], 1, stations[i][1]);
	}
	scene.add(floor);
	for(var i = 1; i<stations.length; i++){
		lineBetween(stations, i-1, i)
	}
}

function animate() {
    renderer.render( scene, camera );
    requestAnimationFrame( animate );
	TWEEN.update();
    controls.update();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
