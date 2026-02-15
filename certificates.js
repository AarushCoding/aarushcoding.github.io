async function loadCertificates() {
    const container = document.querySelector('.cert-container');
    const pills = document.querySelectorAll('.pill');
    const modal = document.getElementById('certModal');
    const modalContent = modal.querySelector('.modal-content');
    const modalClose = modal.querySelector('.modal-close');

    try {
        const response = await fetch('certificates.csv');
        const data = await response.text();
        const rows = data.split('\n').slice(1);
        container.innerHTML = '';

        rows.forEach(row => {
            if (!row.trim()) return;
            const [title, desc, link, image, category, featured] = row.split(';');
            
            // Logic for Featured Tag
            const isFeatured = featured && featured.toLowerCase().includes('yes');
            const featuredHTML = isFeatured ? `<span class="featured-tag">Featured</span>` : "";
            
            const linkHTML = link && link.trim() !== "" ? `<a href="${link}" class="verify-link" target="_blank">Verify Credentials</a>` : "";
            
            const certHTML = `
                <div class="cert-row" data-category="${category ? category.trim().toLowerCase() : 'all'}">
                    <div class="cert-info">
                        <h3>${title}</h3>
                        ${featuredHTML}
                        <p>${desc}</p>
                        ${linkHTML}
                    </div>
                    <div class="cert-visual">
                        <img src="certificates/${image}" alt="${title}">
                    </div>
                </div>
            `;
            container.innerHTML += certHTML;
        });

        // Modal Logic
        document.querySelectorAll('.cert-visual img').forEach(img => {
            img.addEventListener('click', () => {
                modalContent.innerHTML = `<img src="${img.src}">`;
                modal.style.display = 'flex';
                setTimeout(() => modal.classList.add('show'), 10);
            });
        });

    } catch (error) {
        console.error("Error loading certificates:", error);
    }

    // Modal Close Events
    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300);
    };

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    // Filter Logic (supports comma-separated categories)
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            const filter = pill.getAttribute('data-filter').toLowerCase();
            
            document.querySelectorAll('.cert-row').forEach(row => {
                const rowCats = row.getAttribute('data-category').split(',').map(c => c.trim());
                const isMatch = filter === 'all' || rowCats.includes(filter);
                row.style.display = isMatch ? (window.innerWidth <= 900 ? 'flex' : 'grid') : 'none';
            });
        });
    });
}

window.addEventListener('DOMContentLoaded', loadCertificates);
