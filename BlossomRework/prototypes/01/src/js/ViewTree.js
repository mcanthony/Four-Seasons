// ViewTree.js

var GL = bongiovi.GL;
var gl;
var ObjLoader = require("./ObjLoader");

function ViewTree() {
	// bongiovi.View.call(this, bongiovi.ShaderLibs.get("generalVert"), bongiovi.ShaderLibs.get("simpleColorFrag"));
	bongiovi.View.call(this, bongiovi.ShaderLibs.get("generalVert"));
}

var p = ViewTree.prototype = new bongiovi.View();
p.constructor = ViewTree;


p._init = function() {
	ObjLoader.load("assets/DeadTree21.obj", this._onObjMesh.bind(this));
	// ObjLoader.load("assets/DeadTree21_LOD.obj", this._onObjMesh.bind(this));
};

p._onObjMesh = function(mesh) {
	this.mesh = mesh;
};

p._onObjLoaded = function(e) {
	var o = this._parseObj(e.response);

	gl = GL.gl;

	this.mesh = new bongiovi.Mesh(o.positions.length, o.indices.length, GL.gl.TRIANGLES);
	this.mesh.bufferVertex(o.positions);
	this.mesh.bufferTexCoords(o.coords);
	this.mesh.bufferIndices(o.indices);
};


p.render = function(texture) {
	if(!this.shader.isReady() ) return;
	if(!this.mesh) return;

	this.shader.bind();
	this.shader.uniform("texture", "uniform1i", 0);
	texture.bind(0);
	this.shader.uniform("color", "uniform3fv", [1, 1, 1]);
	this.shader.uniform("opacity", "uniform1f", 1);
	this.shader.uniform("position", "uniform3fv", [0, -4, 0]);
	var scale = .05;
	this.shader.uniform("scale", "uniform3fv", [scale, scale, scale]);
	
	
	GL.draw(this.mesh);
};

module.exports = ViewTree;