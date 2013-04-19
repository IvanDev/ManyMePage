//
//  i1Noise v1.1
//
//  Created by Ivan Isaev 11Apr13.
//  Copyright (c) 2013 i1labs. All rights reserved.
//

var i1Noise = (function() {
	var canvasDefWidth=256;
	var noiseMaxAlpha=4;
	var noiseMaxValue=128;

	function i1Noise(canvasElementId){
        this.canvas = document.getElementById(canvasElementId);
	    this.canvasWidth  = this.canvas.width;
	    this.canvasHeight = this.canvas.height;
	    this.ctx = this.canvas.getContext('2d');
	    this.imageData = this.ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
	    this.data = this.imageData.data;
	    this.buf = new ArrayBuffer(this.imageData.data.length);
	    this.buf8 = new Uint8ClampedArray(this.buf);
	    this.data32 = new Uint32Array(this.buf);
		
		this.noiseArray=[];
		this.noiseArraOffset=0;
	    for (var i=this.canvasHeight* this.canvasWidth * 1.23 | 0; i--; i>0) {
 			var rVal=(Math.sin(Math.random()*Math.PI)*noiseMaxValue) | 0;
 			var aVal=Math.random()*noiseMaxAlpha;
 			this.noiseArray.push( (aVal << 24) | (rVal << 16) | (rVal <<  8) | rVal );
		}
    };

	i1Noise.prototype.doStep = function () {
		var len=this.noiseArray.length;
		var i=this.canvasHeight * this.canvasWidth;
	    while (--i) {
	        this.data32[i] = this.noiseArray[++this.noiseArraOffset % len];
		}
		this.imageData.data.set(this.buf8);
		this.ctx.putImageData(this.imageData, 0, 0);
	};

	i1Noise.createCanvas = function(ratio, parentElement, canvasElementName, canvasClassName) {
		var h = canvasDefWidth / ratio;
		parentElement.append('<canvas id="'+canvasElementName+'" class="'+canvasClassName+'" width="'+canvasDefWidth+'" height="'+h+'"></canvas>');
	};

    return i1Noise;
})();