document.querySelectorAll('.toggle-headline').forEach(function(headline) {
  headline.addEventListener('click', function() {
    // Remove active class from all headlines
    document.querySelectorAll('.toggle-headline').forEach(h => h.classList.remove('active'));
    // Hide all sections
    document.querySelectorAll('.section-content').forEach(sec => sec.style.display = 'none');
    // Add active class to clicked headline
    this.classList.add('active');
    // Show the corresponding section
    const sectionClass = this.textContent.trim().toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-');
    const section = document.querySelector('section.' + sectionClass);
    if (section) {
      section.style.display = 'block';
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Show "About Me" by default on page load
window.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.section-content').forEach(sec => sec.style.display = 'none');
  document.querySelector('.about.section-content').style.display = 'block';
  document.querySelectorAll('.toggle-headline').forEach(h => h.classList.remove('active'));
  document.querySelector('.toggle-headline').classList.add('active');
});

<!-- Example for all sections -->
<section class="about section-content">...</section>
<section class="contact section-content">...</section>
<section class="education section-content">...</section>
<section class="technical-skills section-content">...</section>
<section class="projects-training section-content">...</section>
<section class="certifications section-content">...</section>