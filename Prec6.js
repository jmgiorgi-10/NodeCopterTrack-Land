var arDrone = require('ar-drone');
var client = arDrone.createClient();
var fs = require('fs');
var cv = require('opencv');

var pngStream = client.getPngStream();
var frameCounter = 0;
var period = 10; // Save a frame every 30 ms.
var lastFrameTime = 0;

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
      //Display the current image

      readImage();
  
    }
  });

setInterval(readImage, 12);

function readImage() {
  cv.readImage(current_im, function (err, im) {

    if (err) {
      throw err;
    }

    console.log(im.size()[0]);

    if (im.size()[0] > 0 && im.size()[1] > 0){

      console.log('good to go')

      Window.show(im);
      Window.blockingWaitKey(0, 10);

    }

  });
}





