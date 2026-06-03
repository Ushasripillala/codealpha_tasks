const images = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

let currentIndex = 0;

// Open Lightbox
images.forEach((img, index) => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
    currentIndex = index;
  });
});

// Close Lightbox
function closeLightbox() {
  lightbox.style.display = 'none';
}

// Next / Prev Navigation
function changeImage(direction) {
  currentIndex += direction;

  if (currentIndex < 0) currentIndex = images.length - 1;
  if (currentIndex >= images.length) currentIndex = 0;

  lightboxImg.src = images[currentIndex].src;
}

// Filter Images
function filterImages(category) {
  images.forEach(img => {
    if (category === 'all' || img.classList.contains(category)) {
      img.style.display = 'block';
    } else {
      img.style.display = 'none';
    }
  });
}