var tooltip = document.querySelectorAll('.coupontooltip');
var pause = document.querySelectorAll('.pause');
document.addEventListener('mousemove', fn, false);
function fn(e) {
  for (var i=tooltip.length; i--;) {
    tooltip[i].style.left = e.pageX + 'px';
    tooltip[i].style.top = e.pageY + 'px';
  }
}

console.clear();
var videoEl = document.querySelector('video');
document.querySelector('.video-button').addEventListener('click', function() {
  if(this.dataset.aperture === 'open') {
    this.dataset.aperture = 'closed';
    videoEl.pause();
    videoEl.progress = 0;
  } else {
    this.dataset.aperture = 'open';
    videoEl.play();
  }
});
