async function loadCertificates() {
    const container = document.getElementsByClassName('cert-container')[0];

    try {
        const response = await fetch('certificates.csv');
        const data = await response.text();

        // Split by lines and skip the header row
        const rows = data.split('\n').slice(1);

        rows.forEach(row => {
            if (row.trim() === "") return; // Skip empty lines

            const [title, desc, link, image] = row.split(';');

            // Check if link exists to show/hide the button
            const linkHTML = link && link.trim() !== ""
                ? `<a href="${link}" class="verify-link">Verify Credentials</a>`
                : "";

            const certHTML = `
                <div class="cert-row">
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
    } catch (error) {
        console.error("Error loading CSV:", error);
    }
}

window.addEventListener('DOMContentLoaded', loadCertificates);
