// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// --- LIGHTBOX GALLERY ---
const galleryImages = document.querySelectorAll('.gallery img');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox.querySelector('img');
const closeBtn = lightbox.querySelector('.close');
const nextBtn = lightbox.querySelector('.next');
const prevBtn = lightbox.querySelector('.prev');
let currentIndex = 0;

// Open lightbox
galleryImages.forEach((img, index) => {
  img.addEventListener('click', () => {
    lightbox.classList.add('active');
    lightboxImg.src = img.src;
    currentIndex = index;
  });

  // Fade-in once loaded
  if (img.complete) img.classList.add('loaded');
  else img.addEventListener('load', () => img.classList.add('loaded'));
});

// Close lightbox
closeBtn.addEventListener('click', () => lightbox.classList.remove('active'));

// Next/Previous buttons
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex].src;
});
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex].src;
});

// Close when clicking outside image
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) lightbox.classList.remove('active');
});

// Keyboard navigation
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'ArrowRight') nextBtn.click();
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'Escape') closeBtn.click();
});

// --- PROFILE PIC FADE-IN FIX ---
const profilePic = document.querySelector('.profile-pic');
if (profilePic) {
  if (profilePic.complete) profilePic.classList.add('loaded');
  else profilePic.addEventListener('load', () => profilePic.classList.add('loaded'));
}
