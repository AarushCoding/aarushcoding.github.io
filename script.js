document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.cert-card');
    cards.forEach(card => observer.observe(card));
});
