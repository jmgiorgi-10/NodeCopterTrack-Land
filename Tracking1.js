//Tracking function exports//


cv = require('opencv');


module.exports = {


	color_track: function (im, low_thresh, high_thresh) {

		var contours_draw = new cv.Matrix(im.width(), im.height());

		//Filter RGB colors for White
		im.inRange(low_thresh, high_thresh);

		//Dilation & Erosion of Image
		im.dilate(3);
		im.erode(3);

		//Edge detector
		var lowThresh = 0;
		var highThresh = 150;
		im.canny(lowThresh, highThresh);

		//Find all contours + draw and save
		var contours = im.findContours();


		//Select preferred contour
		var area_max = 0;
		var index = 0

		for (i = 0; i < contours.size(); i++) {

		//Find minimum bounding rectangle for countour
		var boundingRect = contours.boundingRect(i);
		//Use to find Width and Height
		var width = boundingRect['width'];
		var height = boundingRect['height']
		var bound_area = width * height;

		if (bound_area > area_max) {
			area_max = bound_area
			index = i;
		}
		//console.log(width);

		
		//Display result in test window
		

	}

		contours_draw.drawContour(contours,index, [0, 255, 0]);

		return(contours_draw);

	}


	//Output: YES or NO - approximation of whether selected contour is a circle
	circle_check: function (boundingRect) {

		//Use to find Width and Height
		var width = boundingRect['width'];
		var height = boundingRect['height']
		var bound_area = width * height;
		//console.log(width);

		//Check Aspect Ratio - width/height
		var ar = width / height

		//Check extension - Area of Contour / Area of Bonding Box
		var ex = contours.area(i) / bound_area;

		//Check solidity - Area of Contour / Area of Convex Hull
		var sl = contours.area(i)


	}









}