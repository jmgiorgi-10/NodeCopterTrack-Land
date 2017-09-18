var arDrone = require('ar-drone');
var client = arDrone.createClient();
var fs = require('fs');
var cv = require('opencv');
var track = require('./Tracking1');

var pngStream = client.getPngStream();
var frameCounter = 0;
var period = 30; // Save a frame every 5000 ms.
var lastFrameTime = 0;

//Threshold RGB image for color white
var thres_low = [200, 200, 200];
var thres_high = [255, 255, 255];

var Window = new cv.NamedWindow('window', '400x400');

var current_im;

pngStream
  .on('error', console.log)
  .on('data', function(pngBuffer) {
    var now = (new Date()).getTime();
    if (now - lastFrameTime > period) {
      frameCounter++;
      lastFrameTime = now;
      console.log('Saving frame');

      current_im = 'frame' + frameCounter + '.png';

      //Write file to current directory
      fs.writeFile(current_im, pngBuffer, function(err) {
        if (err) {
          console.log('Error saving PNG: ' + err);
        }

      //Delete image from two frames ago
      var deletedFrame = frameCounter - 2;

      if (frameCounter > 2){
        fs.unlink('frame' + deletedFrame + '.png', function(err) {
          if (err) {
            console.log(err)
          }
        })
      }

      });
      //Display the current imag
  
    }
  });

setInterval(readImage,60);


function readImage() {
  cv.readImage(current_im, function (err, im) {

    if (err) {
      throw err;
    }

    console.log(im.size()[0]);

    if (im.size()[0] > 0 && im.size()[1] > 0){

      console.log('good to go')

      

      var contour = track.circle_color_track(im, thres_low, thres_high);

      Window.show(contour);
      Window.blockingWaitKey(0, 30);

    }

  });
}





