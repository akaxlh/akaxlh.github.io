document.addEventListener('click', function(e) {
  var container = e.target.closest('.video-container');
  if (!container) return;
  
  var video = container.querySelector('video');
  var allContainers = document.querySelectorAll('.video-container');
  
  // Pause all other videos first
  for (var i = 0; i < allContainers.length; i++) {
    var c = allContainers[i];
    if (c !== container) {
      var v = c.querySelector('video');
      v.pause();
      v.controls = false;
      c.classList.remove('playing');
      c.classList.remove('loading');
    }
  }
  
  // Toggle play/pause for clicked video
  if (video.paused) {
    container.classList.add('loading');
    container.classList.add('playing');
    video.controls = true;
    
    var playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then(function() {
        container.classList.remove('loading');
      }).catch(function(err) {
        console.error('Video play error:', err);
        container.classList.remove('loading');
        container.classList.remove('playing');
        video.controls = false;
      });
    }
  } else {
    video.pause();
  }
  
  // Show poster again when video ends
  video.onended = function() {
    container.classList.remove('playing');
    video.controls = false;
  };
});

