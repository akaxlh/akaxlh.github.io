document.addEventListener('click', function(e) {
  var container = e.target.closest('.video-container');
  if (!container) return;
  
  // If clicking on video element itself (after it started playing), let native controls handle it
  if (e.target.tagName === 'VIDEO') return;
  
  var video = container.querySelector('video');
  var allContainers = document.querySelectorAll('.video-container');
  
  // Pause and unload all other videos to free memory
  for (var i = 0; i < allContainers.length; i++) {
    var c = allContainers[i];
    if (c !== container) {
      var v = c.querySelector('video');
      v.pause();
      v.removeAttribute('src');
      v.load(); // Reset video element to free memory
      v.controls = false;
      c.classList.remove('playing');
      c.classList.remove('loading');
    }
  }
  
  // Restore source if it was removed
  var source = video.querySelector('source');
  if (source && !video.src) {
    video.src = source.getAttribute('src');
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
  }
  
  // Show poster again when video ends
  video.onended = function() {
    container.classList.remove('playing');
    video.controls = false;
  };
});

