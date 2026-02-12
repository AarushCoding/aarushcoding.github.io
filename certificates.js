async function loadCertificates() {
    const container = document.querySelector('.cert-container');
    const pills = document.querySelectorAll('.pill');

    try {
        const response = await fetch('certificates.csv');
        const data = await response.text();
        const rows = data.split('\n').slice(1);

        container.innerHTML = ''; // Clear container

        rows.forEach(row => {
            if (row.trim() === "") return;

            // Updated to destructure 5 columns
            const [title, desc, link, image, category] = row.split(';');

            const linkHTML = link && link.trim() !== ""
                ? `<a href="${link}" class="verify-link">Verify Credentials</a>`
                : "";

            // Added data-category to the cert-row div
            const certHTML = `
                <div class="cert-row" data-category="${category ? category.trim().toLowerCase() : 'all'}">
                    <div class="cert-info">
                        <h3>${title}</h3>
                        <p>${desc}</p>
                        ${linkHTML}
                    </div>
                    <div class="cert-visual">
                        <img src="certificates/${image}" alt="${title} Certificate">
                    </div>
                </div>
            `;
            container.innerHTML += certHTML;
        });

        // Pill Filtering Logic
        pills.forEach(pill => {
            pill.addEventListener('click', () => {
                // Update active state
                pills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');

                const filter = pill.getAttribute('data-filter');
                const certRows = document.querySelectorAll('.cert-row');

                certRows.forEach(row => {
                    if (filter === 'all' || row.getAttribute('data-category') === filter) {
                        row.style.display = 'grid'; // Show
                        row.style.opacity = '1';
                    } else {
                        row.style.display = 'none'; // Hide
                    }
                });
            });
        });

    } catch (error) {
        console.error("Error loading CSV:", error);
    }
}


const modal = document.createElement('div');
modal.className = 'modal';
document.body.appendChild(modal);

modal.addEventListener('click', () => modal.style.display = 'none');

document.addEventListener('click', (e) => {
    if (e.target.closest('.cert-visual img')) {
        modal.innerHTML = `<img src="${e.target.src}">`;
        modal.style.display = 'flex';
    }
});

window.addEventListener('DOMContentLoaded', loadCertificates);