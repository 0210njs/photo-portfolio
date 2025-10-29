// --- SMOOTH SCROLL FOR INTERNAL LINKS ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// --- LIGHTBOX GALLERY ---
const galleryImages = document.querySelectorAll('.gallery img');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
const closeBtn = lightbox ? lightbox.querySelector('.close') : null;
const nextBtn = lightbox ? lightbox.querySelector('.next') : null;
const prevBtn = lightbox ? lightbox.querySelector('.prev') : null;
let currentIndex = 0;

if (lightbox && galleryImages.length > 0) {
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

  // Close when clicking outside the image
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
}

// --- PROFILE PIC FADE-IN FIX ---
window.addEventListener('load', () => {
  const profilePic = document.querySelector('.profile-pic');
  if (profilePic) {
    profilePic.classList.add('loaded');
  }
});

// --- GALLERY CATEGORY FILTER ---
const filterButtons = document.querySelectorAll('.filter-btn');
const allImages = document.querySelectorAll('.gallery img');

if (filterButtons.length > 0) {
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-category');

      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Filter images by category
      allImages.forEach(img => {
        if (category === 'all' || img.dataset.category === category) {
          img.style.display = 'block';
          setTimeout(() => img.classList.add('fade-in'), 50);
        } else {
          img.classList.remove('fade-in');
          setTimeout(() => img.style.display = 'none', 200);
        }
      });
    });
  });
}
