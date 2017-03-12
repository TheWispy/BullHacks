var camera;
var scene;
var renderer;
//var controls;
var stations = [
	[10, 2, "Darlington"],
	[10, 4, "York"],
	[2, 6, "Skipton"],
	[4, 6, "Keighley"],
	[6, 6, "Bingley"],
	[8, 6, "Shipley"],
	[10, 6, "Leeds"],
	[8, 8, "Wakefield Westgate"],
	[10, 8, "Wakefield Kirkgate"],
	[14, 10, "Goole"],
	[16, 10, "Gilberdyke"],
	[18, 10, "Brough"],
	[20, 10, "Hull"],
	[10, 12, "Barnsley"],
	[10, 16, "Meadowhall"],
	[10, 18, "Sheffield"],
	[10, 20, "Dronfield"],
	[6, 22, "Cheltenham Spa"],
	[8, 22, "Birmingham New Street"],
	[10, 22, "Chesterfield"],
	[10, 24, "Derby"],
	[12, 24, "Nottingham"],
	[10, 26, "East Midlands Parkway"],
	[10, 28, "Loughborough"],
	[10, 30, "Leicester"],
	[10, 32, "London St Pancras"]
]

for(var i=0; i<stations.length; i++){
	stations[i][0] = stations[i][0]*2 - 20;
	stations[i][1] = stations[i][1]*2 - 35;
}

var train;
var textureLoader = new THREE.TextureLoader();
var fontLoader = new THREE.FontLoader();

var complete = true;

init();
animate();

setTimeout(function(){
	beginTrain(1,0, 20000);
	beginTrain(7,6, 20000);
	beginTrain(25,24, 10000);
	beginTrain(9,10, 20000);
}, 20000);

setTimeout(function(){
	beginTrain(13,14, 10000);
	beginTrain(6,5, 20000);
	beginTrain(1,0, 10000);
	beginTrain(7,8, 10000);
}, 40000);

setTimeout(function(){
	beginTrain(22,21, 10000);
	beginTrain(15,14, 10000);
	beginTrain(3,4, 20000);
	beginTrain(16,17, 10000);
}, 60000);

setTimeout(function(){
	beginTrain(10,11, 10000);
	beginTrain(2,3, 10000);
	beginTrain(7,8, 20000);
	beginTrain(1,2, 10000);
	beginTrain(12,13, 20000);
	beginTrain(18,19, 10000);
}, 80000);

setTimeout(function(){
	beginTrain(1,0, 10000);
	beginTrain(7,2, 20000);
	beginTrain(12,13, 20000);
	beginTrain(17,18, 10000);
}, 100000);

setTimeout(function(){
	beginTrain(2,0, 10000);
	beginTrain(7,2, 20000);
}, 120000);

var data = [{"uid":"Y60968","origin":"Sheffield","destination":"Armathwaite","stations":[{"name":"Sheffield","arrival_time":null},{"name":"Meadowhall","arrival_time":"10:22"},{"name":"Barnsley","arrival_time":"10:37"},{"name":"Wakefield Kirkgate","arrival_time":"10:55"},{"name":"Shipley","arrival_time":"11:31"},{"name":"Bingley","arrival_time":"11:37"},{"name":"Keighley","arrival_time":"11:41"},{"name":"Skipton","arrival_time":"11:53"}]},{"uid":"P30877","origin":"Birmingham New Street","destination":"Edinburgh Waverley","stations":[{"name":"Sheffield","arrival_time":"10:16"},{"name":"Wakefield Westgate","arrival_time":"10:44"},{"name":"Leeds","arrival_time":"10:59"},{"name":"York","arrival_time":"11:27"},{"name":"Darlington","arrival_time":"12:03"},{"name":"Sheffield","arrival_time":"10:16"},{"name":"Wakefield Westgate","arrival_time":"10:44"},{"name":"Leeds","arrival_time":"10:59"},{"name":"York","arrival_time":"11:27"},{"name":"Darlington","arrival_time":"12:03"},{"name":"Sheffield","arrival_time":"10:16"},{"name":"Wakefield Westgate","arrival_time":"10:44"},{"name":"Leeds","arrival_time":"10:59"},{"name":"York","arrival_time":"11:27"},{"name":"Darlington","arrival_time":"12:03"},{"name":"Sheffield","arrival_time":"10:16"},{"name":"Wakefield Westgate","arrival_time":"10:44"},{"name":"Leeds","arrival_time":"10:59"},{"name":"York","arrival_time":"11:27"},{"name":"Darlington","arrival_time":"12:03"},{"name":"Sheffield","arrival_time":"10:16"},{"name":"Wakefield Westgate","arrival_time":"10:44"},{"name":"Leeds","arrival_time":"10:59"},{"name":"York","arrival_time":"11:27"},{"name":"Darlington","arrival_time":"12:03"},{"name":"Sheffield","arrival_time":"10:16"},{"name":"Wakefield Westgate","arrival_time":"10:44"},{"name":"Leeds","arrival_time":"10:59"},{"name":"York","arrival_time":"11:27"},{"name":"Darlington","arrival_time":"12:03"},{"name":"Sheffield","arrival_time":"10:16"},{"name":"Wakefield Westgate","arrival_time":"10:44"},{"name":"Leeds","arrival_time":"10:59"},{"name":"York","arrival_time":"11:27"},{"name":"Darlington","arrival_time":"12:03"},{"name":"Sheffield","arrival_time":"10:16"},{"name":"Wakefield Westgate","arrival_time":"10:44"},{"name":"Leeds","arrival_time":"10:59"},{"name":"York","arrival_time":"11:27"},{"name":"Darlington","arrival_time":"12:03"},{"name":"Sheffield","arrival_time":"10:16"},{"name":"Wakefield Westgate","arrival_time":"10:44"},{"name":"Leeds","arrival_time":"10:59"},{"name":"York","arrival_time":"11:27"},{"name":"Darlington","arrival_time":"12:03"},{"name":"Sheffield","arrival_time":"10:16"},{"name":"Wakefield Westgate","arrival_time":"10:44"},{"name":"Leeds","arrival_time":"10:59"},{"name":"York","arrival_time":"11:27"},{"name":"Darlington","arrival_time":"12:03"},{"name":"Sheffield","arrival_time":"10:16"},{"name":"Leeds","arrival_time":"10:59"},{"name":"York","arrival_time":"11:27"},{"name":"Darlington","arrival_time":"12:03"},{"name":"Sheffield","arrival_time":"10:16"},{"name":"Wakefield Westgate","arrival_time":"10:44"},{"name":"Leeds","arrival_time":"10:59"},{"name":"York","arrival_time":"11:27"},{"name":"Darlington","arrival_time":"12:03"}]},{"uid":"C80031","origin":"Leeds","destination":"London St Pancras","stations":[{"name":"Sheffield","arrival_time":"10:23"},{"name":"Chesterfield","arrival_time":"10:37"},{"name":"Nottingham","arrival_time":"11:10"},{"name":"East Midlands Parkway","arrival_time":"11:27"},{"name":"Loughborough","arrival_time":"11:35"},{"name":"Leicester","arrival_time":"11:48"},{"name":"Sheffield","arrival_time":"10:23"},{"name":"Chesterfield","arrival_time":"10:37"},{"name":"Nottingham","arrival_time":"11:10"},{"name":"East Midlands Parkway","arrival_time":"11:27"},{"name":"Loughborough","arrival_time":"11:35"},{"name":"Leicester","arrival_time":"11:48"},{"name":"Sheffield","arrival_time":"10:23"},{"name":"Chesterfield","arrival_time":"10:37"},{"name":"Nottingham","arrival_time":"11:10"},{"name":"East Midlands Parkway","arrival_time":"11:27"},{"name":"Loughborough","arrival_time":"11:35"},{"name":"Leicester","arrival_time":"11:48"},{"name":"Sheffield","arrival_time":"10:23"},{"name":"Chesterfield","arrival_time":"10:37"},{"name":"Nottingham","arrival_time":"11:10"},{"name":"East Midlands Parkway","arrival_time":"11:27"},{"name":"Loughborough","arrival_time":"11:35"},{"name":"Leicester","arrival_time":"11:48"},{"name":"Sheffield","arrival_time":"10:23"},{"name":"Chesterfield","arrival_time":"10:37"},{"name":"Nottingham","arrival_time":"11:10"},{"name":"East Midlands Parkway","arrival_time":"11:27"},{"name":"Loughborough","arrival_time":"11:35"},{"name":"Leicester","arrival_time":"11:48"},{"name":"Sheffield","arrival_time":"10:23"},{"name":"Chesterfield","arrival_time":"10:37"},{"name":"Nottingham","arrival_time":"11:10"},{"name":"East Midlands Parkway","arrival_time":"11:27"},{"name":"Loughborough","arrival_time":"11:35"},{"name":"Leicester","arrival_time":"11:48"},{"name":"Sheffield","arrival_time":"10:23"},{"name":"Chesterfield","arrival_time":"10:37"},{"name":"Nottingham","arrival_time":"11:10"},{"name":"East Midlands Parkway","arrival_time":"11:27"},{"name":"Loughborough","arrival_time":"11:35"},{"name":"Leicester","arrival_time":"11:48"},{"name":"Sheffield","arrival_time":"10:23"},{"name":"Chesterfield","arrival_time":"10:37"},{"name":"Nottingham","arrival_time":"11:10"},{"name":"East Midlands Parkway","arrival_time":"11:27"},{"name":"Loughborough","arrival_time":"11:35"},{"name":"Leicester","arrival_time":"11:48"},{"name":"Sheffield","arrival_time":"10:23"},{"name":"Chesterfield","arrival_time":"10:37"},{"name":"Nottingham","arrival_time":"11:10"},{"name":"East Midlands Parkway","arrival_time":"11:27"},{"name":"Loughborough","arrival_time":"11:35"},{"name":"Leicester","arrival_time":"11:48"},{"name":"Sheffield","arrival_time":"10:23"},{"name":"Chesterfield","arrival_time":"10:37"},{"name":"Nottingham","arrival_time":"11:10"},{"name":"East Midlands Parkway","arrival_time":"11:27"},{"name":"Loughborough","arrival_time":"11:35"},{"name":"Leicester","arrival_time":"11:48"}]},{"uid":"Y61034","origin":"Sheffield","destination":"Scarborough","stations":[{"name":"Sheffield","arrival_time":null},{"name":"Meadowhall","arrival_time":"10:31"},{"name":"Doncaster","arrival_time":"10:51"},{"name":"Goole","arrival_time":"11:16"},{"name":"Gilberdyke","arrival_time":"11:25"},{"name":"Brough","arrival_time":"11:33"},{"name":"Hull","arrival_time":"11:50"},{"name":"Cottingham","arrival_time":"12:12"},{"name":"Sheffield","arrival_time":null},{"name":"Meadowhall","arrival_time":"10:31"},{"name":"Doncaster","arrival_time":"10:51"},{"name":"Goole","arrival_time":"11:16"},{"name":"Gilberdyke","arrival_time":"11:25"},{"name":"Brough","arrival_time":"11:33"},{"name":"Hull","arrival_time":"11:50"},{"name":"Cottingham","arrival_time":"12:12"}]}];

var route = data[3].stations;

function plotTrains(){
	doRoute(route);
}

function makeRequest()
{
	console.log("request");
	var url = "http://54.175.175.13/trains.json";
	$.getJSON(url, function(response) {
		console.log(response);
	})
}

//Scene initialisation
function init(){
	//Create scene
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xffa0a0 );
	//Create camera
	var aspectRatio = window.innerWidth/window.innerHeight;
	camera = new THREE.PerspectiveCamera( 75, aspectRatio, 0.5, 500 );
	camera.position.set(0, 40, 15);
	camera.rotation.x = -1.2;

	//renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio);
	renderer.setSize( window.innerWidth, window.innerHeight);
	renderer.shadowMapEnabled = true;
	renderer.shadowMapSoft = true;
	renderer.shadowMapType = THREE.PCFSoftShadowMap;
	document.body.appendChild( renderer.domElement );

	//Add scene elements
	addSceneElements();

	//Add lights
	addLights();

	//Add controls
	//controls = new THREE.OrbitControls(camera);
	setTimeout(function(){beginTrain(1, 2, 20000)}, 3000);
}

function addLights(){
	var pointI = new THREE.PointLight(0xffffff, 3, 50);
	pointI.position.set(20, 30, 10);
	pointI.castShadow = true;
	pointI.shadowCameraVisible = true;
	pointI.shadow.camera.far = 500;
	pointI.shadow.camera.left = -300;
	pointI.shadow.camera.right = -300;
	pointI.shadow.camera.top = -300;
	pointI.shadow.camera.bottom = -300;
	scene.add( pointI );

	var pointJ = new THREE.PointLight(0xffffff, 2, 50);
	pointJ.position.set(-30, 20, -10);
	pointJ.castShadow = true;
	pointJ.shadowCameraVisible = true;
	scene.add( pointJ );

	var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.25);
	directionalLight.position.set(2, 15, 0);
	directionalLight.rotation.x = 0.2;
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

function beginTrain(i, j, time){
    var trainMat = new THREE.MeshPhongMaterial({ color: 0xd4d525});
    train = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), trainMat);
    scene.add(train);
	train.castShadow = true;
    train.position.set(stations[i][0], 1, stations[j][1]);

    var dx = stations[i][0] - train.position.x;
    var dz = stations[i][1] - train.position.z;
	train.rotation.y = Math.atan(dx/dz);
	var position = train.position;
	var target = { x: train.position.x+dx, y: train.position.y, z: train.position.z+dz };
	var tween = new TWEEN.Tween(position).to(target, time);
	tween.onUpdate(function(){
		if (train.position.x == stations[j][0] && train.position.z == stations[j][1]){
			scene.remove(train);
			console.log("Train nuked");
		}
    	train.position.x = position.x;
    	train.position.z = position.z;});

	tween.onComplete(function() {
	  console.log('done!')
	  complete = true;
	  scene.remove(train);
		});
	tween.start();



}

function doRoute(list){
	var routeOrder = [];
	for(i = 0; i<route.length; i++){
		for(j = 0; j<stations.length; j++){
			if(route[i].name == stations[j][2]){
				routeOrder.push(j);
			}
		}

	}
	for(i = 1; i<routeOrder.length; i++){
		if(route[i].arrival_time == null){
			continue;
		}
		var dt = (getTime() - (parseInt(route[i-1].arrival_time.substring(0, 1))*60000 + parseInt(route[i-1].arrival_time.substring(3, 4))*1000));
			beginTrain(routeOrder[i-1], routeOrder[i], dt);
		}
	}


function toXYCoords (pos) {
    var vector = projector.projectVector(pos.clone(), camera);
    vector.x = (vector.x + 1)/2 * window.innerWidth;
    vector.y = -(vector.y - 1)/2 * window.innerHeight;
    return vector;
}

function addSceneElements(){

	var stationMat = new THREE.MeshPhongMaterial({ color: 0xcc3a3a});
	var floorMat = new THREE.MeshPhongMaterial({ color: 0xaaaaaa});


	var floor = new THREE.Mesh( new THREE.BoxGeometry(70, 1, 70), floorMat);

	for(var i=0; i<stations.length; i++){
		var stationMesh = new THREE.Mesh( new THREE.BoxGeometry(1,1,1), stationMat);
		stationMesh.castShadow = true;
		scene.add(stationMesh);
		stationMesh.position.set(stations[i][0], 1, stations[i][1]);
	}
	floor.recieveShadow = true;
	scene.add(floor);
	for(var i = 0; i<stations.length; i++){
		for(var j = 0; j<stations.length; j++){
			lineBetween(stations, i, j);
		}

		var text2 = document.createElement('div');
		text2.style.position = 'absolute';
		//text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
		text2.style.width = 100;
		text2.style.height = 100;
		text2.innerHTML = stations[i][2];
		text2.style.top = i*20 + 200 + 'px';
		text2.style.left =100 + 'px';
		document.body.appendChild(text2);
	}
	/*	fontLoader.load("font.js", function(font){
			var textGeo = new THREE.TextGeometry( "My Text", {

		   font: font,

		   size: 200,
		   height: 50,
		   curveSegments: 12,

		   bevelThickness: 2,
		   bevelSize: 5,
		   bevelEnabled: true
	   });
		var textMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000});
		var textMesh = new THREE.Mesh( textGeo, textMaterial );
		textMesh.position.set(stations[i][0], 2, stations[i][1]);
	} );*/

}

function animate() {
    renderer.render( scene, camera );
    requestAnimationFrame( animate );
	TWEEN.update();
	setTimeout(function(){
}, 3000);
    //controls.update();
	//		$.getJSON(url, beginTrain(Math.floor(Math.random()*stations.length), Math.floor(Math.random()*stations.length) + 1, 1));
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
