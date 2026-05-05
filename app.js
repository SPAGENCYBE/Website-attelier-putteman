if (location.hostname === "atelier-putteman.be") {
      location.replace("https://www.atelier-putteman.be" + location.pathname + location.search + location.hash);
    }

function runWebsiteChecks() {
      console.assert(document.querySelectorAll('.portfolio-card').length === 3, 'Portfolio moet exact 3 kaarten bevatten.');
      console.assert(document.querySelectorAll('.filter-btn').length === 5, 'Portfolio moet 5 filterknoppen bevatten.');
      console.assert(document.getElementById('lightbox'), 'Lightbox moet bestaan.');
      console.assert(document.getElementById('ambientOrb'), 'Ambient orb moet bestaan.');
    }

    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.16 });
    reveals.forEach((el) => observer.observe(el));

    const ambientOrb = document.getElementById('ambientOrb');
    if (ambientOrb) {
      window.addEventListener('mousemove', (event) => {
        ambientOrb.style.setProperty('--x', `${event.clientX - 260}px`);
        ambientOrb.style.setProperty('--y', `${event.clientY - 260}px`);
      });
    }

    document.querySelectorAll('.portfolio-card').forEach((card) => {
      card.addEventListener('mousemove', (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        card.style.setProperty('--my', `${event.clientY - rect.top}px`);
      });
    });

    document.querySelectorAll('.magnetic').forEach((button) => {
      button.addEventListener('mousemove', (event) => {
        const rect = button.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * 0.18;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.18;
        button.style.transform = `translate(${x}px, ${y}px)`;
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0,0)';
      });
    });

    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        filterButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.dataset.filter;
        portfolioCards.forEach((card) => {
          const categories = card.dataset.category || '';
          const shouldShow = filter === 'all' || categories.split(' ').includes(filter);
          card.classList.toggle('is-hidden', !shouldShow);
        });
      });
    });

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    function openLightbox(imageElement) {
      const card = imageElement.closest('.portfolio-card');
      const title = card?.querySelector('h3')?.textContent || 'Project';
      lightboxImg.src = imageElement.src;
      lightboxCaption.textContent = title;
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
      lightboxImg.src = '';
    }

    document.querySelectorAll('.portfolio-img').forEach((image) => {
      image.addEventListener('click', () => openLightbox(image));
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
    });

    runWebsiteChecks();