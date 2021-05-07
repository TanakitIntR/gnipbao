/* MIT-LICENSE */
/*
Copyright (c) 2009 Satoshi Ueyama

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function Vec3(_x, _y, _z)
{
	this.x = _x || 0;
	this.y = _y || 0;
	this.z = _z || 0;
}

Vec3.prototype = {
	zero: function() {
		this.x = this.y = this.z = 0;
	},

	sub: function(v) {
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;

		return this;
	},

	add: function(v) {
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;

		return this;
	},

	copyFrom: function(v) {
		this.x = v.x;
		this.y = v.y;
		this.z = v.z;

		return this;
	},

	norm:function() {
		return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
	},

	normalize: function() {
		var nrm = Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
		if (nrm != 0)
		{
			this.x /= nrm;
			this.y /= nrm;
			this.z /= nrm;
		}
		return this;
	},

	smul: function(k) {
		this.x *= k;
		this.y *= k;
		this.z *= k;

		return this;
	},

	dpWith: function(v)	{
		return this.x*v.x + this.y*v.y + this.z*v.z;
	},

	cp: function(v, w) {
		this.x = (w.y * v.z) - (w.z * v.y);
		this.y = (w.z * v.x) - (w.x * v.z);
		this.z = (w.x * v.y) - (w.y * v.x);

		return this;
	},

	toString: function() {
		return this.x + ", " + this.y + "," + this.z;
	}
}

function M44(cpy)
{
	if (cpy)
		this.copyFrom(cpy);
	else {
		this.ident();
	}
}

M44.fixZero = function(a) {
	var n = a.length;
	for (var i = 0;i < n;i++)
		a[i] = (a[i]<0.00001 && a[i]>-0.00001) ? 0 : a[i];

	return a;
}

M44.prototype = {
	ident: function() {
			  this._12 = this._13 = this._14 = 0;
		this._21 =       this._23 = this._24 = 0;
		this._31 = this._32 =       this._34 = 0;
		this._41 = this._42 = this._43 =       0;

		this._11 = this._22 = this._33 = this._44 = 1;

		return this;
	},

	copyFrom: function(m) {
		this._11 = m._11;
		this._12 = m._12;
		this._13 = m._13;
		this._14 = m._14;

		this._21 = m._21;
		this._22 = m._22;
		this._23 = m._23;
		this._24 = m._24;

		this._31 = m._31;
		this._32 = m._32;
		this._33 = m._33;
		this._34 = m._34;

		this._41 = m._41;
		this._42 = m._42;
		this._43 = m._43;
		this._44 = m._44;

		return this;
	},

	transVec3: function(out, x, y, z) {
		out[0] = x * this._11 + y * this._21 + z * this._31 + this._41;
		out[1] = x * this._12 + y * this._22 + z * this._32 + this._42;
		out[2] = x * this._13 + y * this._23 + z * this._33 + this._43;
		out[3] = x * this._14 + y * this._24 + z * this._34 + this._44;
	},

	transVec3Rot: function(out, x, y, z) {
		out[0] = x * this._11 + y * this._21 + z * this._31;
		out[1] = x * this._12 + y * this._22 + z * this._32;
		out[2] = x * this._13 + y * this._23 + z * this._33;
	},

	perspectiveLH: function(vw, vh, z_near, z_far) {
		this._11 = 2.0*z_near/vw;
		this._12 = 0;
		this._13 = 0;
		this._14 = 0;

		this._21 = 0;
		this._22 = 2*z_near/vh;
		this._23 = 0;
		this._24 = 0;

		this._31 = 0;
		this._32 = 0;
		this._33 = z_far/(z_far-z_near);
		this._34 = 1;

		this._41 = 0;
		this._42 = 0;
		this._43 = z_near*z_far/(z_near-z_far);
		this._44 = 0;

		return this;
	},

	lookAtLH: function(aUp, aFrom, aAt) {
		var aX = new Vec3();
		var aY = new Vec3();
	
		var aZ = new Vec3(aAt.x, aAt.y, aAt.z);
		aZ.sub(aFrom).normalize();
	
		aX.cp(aUp, aZ).normalize();
		aY.cp(aZ, aX);
	
		this._11 = aX.x;  this._12 = aY.x;  this._13 = aZ.x;  this._14 = 0;
		this._21 = aX.y;  this._22 = aY.y;  this._23 = aZ.y;  this._24 = 0;
		this._31 = aX.z;  this._32 = aY.z;  this._33 = aZ.z;  this._34 = 0;
	
		this._41 = -aFrom.dpWith(aX);
		this._42 = -aFrom.dpWith(aY);
		this._43 = -aFrom.dpWith(aZ);
		this._44 = 1;
	
	    return this;
	},

	mul: function(A, B) {
		this._11 = A._11*B._11  +  A._12*B._21  +  A._13*B._31  +  A._14*B._41;
		this._12 = A._11*B._12  +  A._12*B._22  +  A._13*B._32  +  A._14*B._42;
		this._13 = A._11*B._13  +  A._12*B._23  +  A._13*B._33  +  A._14*B._43;
		this._14 = A._11*B._14  +  A._12*B._24  +  A._13*B._34  +  A._14*B._44;

		this._21 = A._21*B._11  +  A._22*B._21  +  A._23*B._31  +  A._24*B._41;
		this._22 = A._21*B._12  +  A._22*B._22  +  A._23*B._32  +  A._24*B._42;
		this._23 = A._21*B._13  +  A._22*B._23  +  A._23*B._33  +  A._24*B._43;
		this._24 = A._21*B._14  +  A._22*B._24  +  A._23*B._34  +  A._24*B._44;

		this._31 = A._31*B._11  +  A._32*B._21  +  A._33*B._31  +  A._34*B._41;
		this._32 = A._31*B._12  +  A._32*B._22  +  A._33*B._32  +  A._34*B._42;
		this._33 = A._31*B._13  +  A._32*B._23  +  A._33*B._33  +  A._34*B._43;
		this._34 = A._31*B._14  +  A._32*B._24  +  A._33*B._34  +  A._34*B._44;

		this._41 = A._41*B._11  +  A._42*B._21  +  A._43*B._31  +  A._44*B._41;
		this._42 = A._41*B._12  +  A._42*B._22  +  A._43*B._32  +  A._44*B._42;
		this._43 = A._41*B._13  +  A._42*B._23  +  A._43*B._33  +  A._44*B._43;
		this._44 = A._41*B._14  +  A._42*B._24  +  A._43*B._34  +  A._44*B._44;

		return this;
	},

	translate: function(x, y, z) {
		this._11 = 1;  this._12 = 0;  this._13 = 0;  this._14 = 0;
		this._21 = 0;  this._22 = 1;  this._23 = 0;  this._24 = 0;
		this._31 = 0;  this._32 = 0;  this._33 = 1;  this._34 = 0;

		this._41 = x;  this._42 = y;  this._43 = z;  this._44 = 1;
		return this;
	},

	transpose33: function() {
		var t;

		t = this._12;
		this._12 = this._21;
		this._21 = t;

		t = this._13;
		this._13 = this._31;
		this._31 = t;

		t = this._23;
		this._23 = this._32;
		this._32 = t;

		return this;
	},

	// OpenGL style rotation
	glRotate: function(angle, x, y, z) {
		var s = Math.sin( angle );
		var c = Math.cos( angle );

		var xx = x * x;
		var yy = y * y;
		var zz = z * z;
		var xy = x * y;
		var yz = y * z;
		var zx = z * x;
		var xs = x * s;
		var ys = y * s;
		var zs = z * s;
		var one_c = 1.0 - c;
/*
		this._11 = (one_c * xx) + c;
		this._21 = (one_c * xy) - zs;
		this._31 = (one_c * zx) + ys;
		this._41 = 0;

		this._12 = (one_c * xy) + zs;
		this._22 = (one_c * yy) + c;
		this._32 = (one_c * yz) - xs;
		this._42 = 0;

		this._13 = (one_c * zx) - ys;
		this._23 = (one_c * yz) + xs;
		this._33 = (one_c * zz) + c;
		this._43 = 0;

		this._14 = 0;
		this._24 = 0;
		this._34 = 0;
		this._44 = 1;
*/

		this._11 = (one_c * xx) + c;
		this._12 = (one_c * xy) - zs;
		this._13 = (one_c * zx) + ys;
		this._14 = 0;

		this._21 = (one_c * xy) + zs;
		this._22 = (one_c * yy) + c;
		this._23 = (one_c * yz) - xs;
		this._24 = 0;

		this._31 = (one_c * zx) - ys;
		this._32 = (one_c * yz) + xs;
		this._33 = (one_c * zz) + c;
		this._34 = 0;

		this._41 = 0;
		this._42 = 0;
		this._43 = 0;
		this._44 = 1;

		return this;
	},

	rotX: function(r) {
		this._22 = Math.cos(r);
		this._23 = Math.sin(r);
		this._32 = -this._23;
		this._33 = this._22;

		this._12=this._13=this._14 = this._21=this._24 = this._31=this._34 = this._41=this._42=this._43 = 0;
		this._11 = this._44 = 1;			

		return this;
	},

	rotY: function(r) {
		this._11 = Math.cos(r);
		this._13 = -Math.sin(r);
		this._31 = -this._13;
		this._33 = this._11;

		this._12=this._14 = this._21=this._23=this._24 = this._32=this._34 = this._41=this._42=this._43 = 0;
		this._22 = this._44 = 1;

		return this;
	},

	rotZ: function(r) {
		this._11 = Math.cos(r);
		this._12 = Math.sin(r);
		this._21 = -this._12;
		this._22 = this._11;

		this._13=this._14 = this._23=this._24 = this._31=this._32=this._34 = this._41=this._42=this._43 = 0;
		this._33 = this._44 = 1;			

		return this;
	}

}

// matrix 2x2
function M22()
{
	this._11 = 1;
	this._12 = 0;
	this._21 = 0;
	this._22 = 1;
}

M22.prototype.getInvert = function()
{
	var out = new M22();
	var det = this._11 * this._22 - this._12 * this._21;
	if (det > -0.0001 && det < 0.0001)
		return null;

	out._11 = this._22 / det;
	out._22 = this._11 / det;

	out._12 = -this._12 / det;
	out._21 = -this._21 / det;

	return out;
}	

var TransformNode = function(localTrans, parent) {
	this.localTrans      = localTrans;
	this.transformParent = parent;
}

TransformNode.prototype.compositeTransform = function(out, desc_trans) {
	if (desc_trans)
		out.mul(desc_trans, this.localTrans);
	else
		out.copyFrom(this.localTrans);

	if (this.transformParent) {
		if (!this._tmpMat_) this._tmpMat_ = new M44();
		this._tmpMat_.copyFrom(out);
		this.transformParent.compositeTransform(out, this._tmpMat_);
	}
}

var CSSCube = function(xLen, zLen, height, tParent) {
	this.localTrans = new M44();
	this.tNode = new TransformNode(this.localTrans, tParent);
	this.height = height;

	this.xLen = xLen;
	this.zLen = zLen;

	this.faces = [
		new CSSFace(this.tNode, xLen, zLen),
		new CSSFace(this.tNode, xLen, zLen),
		new CSSFace(this.tNode, xLen, height),
		new CSSFace(this.tNode, zLen, height),
		new CSSFace(this.tNode, xLen, height),
		new CSSFace(this.tNode, zLen, height)
	];

	this.setBaseTransforms();
}

CSSCube.prototype = {
	setBaseTransforms: function() {
		var PI = Math.PI;
		var HPI = PI*0.5;
		var HX = this.xLen * 0.5;
		var HZ = this.zLen * 0.5;
		var HH = this.height * 0.5;

		// 0: bottom
		this.faces[0].baseTrans.rotX(-HPI);
		this.faces[0].baseTrans._42 = -HH;
		this.faces[0].postTrans._42 = -(HZ-HH);
		this.faces[0].N.y = -1;

		// 1: bottom
		this.faces[1].baseTrans.rotX(HPI);
		this.faces[1].baseTrans._42 = HH;
		this.faces[1].postTrans._42 = -(HZ-HH);
		this.faces[1].N.y = 1;

		// 2: front (seen from screen)
		this.faces[2].baseTrans._43 = -HZ;
		this.faces[2].N.z = -1;

		// 3: left
		this.faces[3].baseTrans.rotY(HPI);
		this.faces[3].baseTrans._41 = -HX;
		this.faces[3].N.x = -1;

		// 4: back
		this.faces[4].baseTrans.rotY(PI);
		this.faces[4].baseTrans._43 = HZ;
		this.faces[4].N.z = 1;

		// 5: right
		this.faces[5].baseTrans.rotY(-HPI);
		this.faces[5].baseTrans._41 = HX;
		this.faces[5].N.x = 1;
	},

	changeHeight: function(h) {
		this.height = h;
		this.setBaseTransforms();

		this.faces[2].setStyleHeight(h);
		this.faces[3].setStyleHeight(h);
		this.faces[4].setStyleHeight(h);
		this.faces[5].setStyleHeight(h);
	},

	getSide: function(i) {
		return this.faces[i+2];
	},

	getBottom: function() {
		return this.faces[1];
	},

	getTop: function() {
		return this.faces[0];
	},

	applyTransform: function() {
		for (var i = 0;i < 6;i++) {
			this.faces[i].applyTransform();
		}
	}
}

var CSSFace = function(tParent, w, h) {
	this.N = new Vec3(0,0,0);
	this.postTrans  = new M44();
	this.preTrans   = new M44();
	this.baseTrans  = new M44();
	this.upperTrans = new M44();

	this.allTrans  = new M44();
	this.allPostTrans  = new M44();
	this.tNode = new TransformNode(this.baseTrans, tParent);
	this.element = null;

	this.width = w;

	this.sN = [0,0,0];
}

CSSFace._tmpM1_ = new M44();
CSSFace.IsWebKit = navigator.userAgent.indexOf('AppleWebKit/') >= 0;
CSSFace.prototype = {
	setStyleHeight: function(h) {
		if (this.element)
			this.element.style.height = h+"px";

		if (this.backElement)
			this.backElement.style.height = h+"px";

		this.setStyleWidth(this.width);
	},

	setStyleWidth: function(w) {
		if (this.element)
			this.element.style.width = w+"px";

		if (this.backElement)
			this.backElement.style.width = w+"px";
	},

	applyTransform: function() {
		if (this.element || this.backElement)
		{
			this.upperTrans.ident();
			if (this.tNode.transformParent) {
				this.tNode.transformParent.compositeTransform(this.upperTrans, null);
			}

			this.allTrans.mul(this.baseTrans, this.upperTrans);

			var M = this.allPostTrans;
			CSSFace._tmpM1_.mul(this.allTrans, this.postTrans);
			M.mul(this.preTrans, CSSFace._tmpM1_);

			this.preTrans.transVec3Rot(this.sN, this.N.x, this.N.y, this.N.z);
			this.upperTrans.transVec3Rot(this.sN, this.sN[0], this.sN[1], this.sN[2]);
			var face_visible = this.sN[2]<0;

			var bs = null, s = null;
			if (this.element) {
				s = this.element.style;
				s.display = face_visible ? "" : "none";
			}

			if (this.backElement) {
				bs = this.backElement.style;
				bs.display = !face_visible ? "" : "none";
			}

			var ts = face_visible ? s : bs;

			if (ts) {
				if (CSSFace.IsWebKit) {
					ts.webkitTransform = "matrix("+ ( M44.fixZero([M._11,M._12,M._21,M._22,M._41,M._42]).join(',') )+")";
				} else {
					ts.MozTransform = "translate("+(M._41>>0)+"px,"+(M._42>>0)+"px) matrix("+ ( M44.fixZero([M._11,M._12,M._21,M._22]).join(',') )+",0,0)";
				}
			}
		}
	}
}
