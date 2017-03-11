var object;

var loader = new THREE.OBJLoader();
loader.load( "FILE_PATH", function( geometry) {
  object = new THREE.Mesh(
    geometry,
    new THREE.MeshNormalMaterial() } )
  );
  scene.add(object);
}
