document.addEventListener('DOMContentLoaded', () => {
  const heroes = document.querySelectorAll('.hero-animated');
  const tiltCards = document.querySelectorAll('.tilt-card');
  let animationFrame;

  if (heroes.length) {
    const handleHeroMove = (event) => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        heroes.forEach((hero) => {
          const rect = hero.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          ) {
            return;
          }

          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;

          hero.style.setProperty('--hero-tilt-x', `${y * 10}deg`);
          hero.style.setProperty('--hero-tilt-y', `${-x * 10}deg`);
        });
      });
    };

    const resetHeroTilt = () => {
      heroes.forEach((hero) => {
        hero.style.setProperty('--hero-tilt-x', '0deg');
        hero.style.setProperty('--hero-tilt-y', '0deg');
      });
    };

    window.addEventListener('mousemove', handleHeroMove, { passive: true });
    window.addEventListener('mouseleave', resetHeroTilt);
  }

  if (tiltCards.length) {
    const dampen = 10;

    tiltCards.forEach((card) => {
      const setTilt = (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        card.style.transform = `perspective(900px) rotateX(${y * dampen}deg) rotateY(${ -x * dampen }deg) translateZ(8px)`;
        card.classList.add('tilt-active');
      };

      const resetTilt = () => {
        card.style.transform = '';
        card.classList.remove('tilt-active');
      };

      card.addEventListener('mousemove', setTilt);
      card.addEventListener('mouseleave', resetTilt);
      card.addEventListener('touchmove', (event) => {
        if (!event.touches.length) return;
        const touch = event.touches[0];
        setTilt(touch);
      }, { passive: true });
      card.addEventListener('touchend', resetTilt);
    });
  }
});
