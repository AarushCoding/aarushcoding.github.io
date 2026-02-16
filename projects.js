async function loadProjects() {
    const container = document.querySelector('.project-container');
    const pills = document.querySelectorAll('.pill');

    try {
        const response = await fetch('projects.csv');
        const data = await response.text();
        const rows = data.split('\n').slice(1);
        container.innerHTML = '';

        rows.forEach(row => {
            if (!row.trim()) return;
            const [title, desc, link, image, category] = row.split(';');
            
            // Clean up tags for display
            const tags = category ? category.split(',').map(tag => tag.trim()) : [];
            const tagsHTML = tags.map(tag => `<span class="featured-tag">#${tag}</span>`).join(' ');

            const projectHTML = `
                <div class="cert-row" data-categories='${JSON.stringify(tags.map(t => t.toLowerCase()))}'>
                    <div class="cert-info">
                        <h3>${title}</h3>
                        <p>${desc}</p>
                        <div class="project-tags-list">${tagsHTML}</div>
                        <a href="${link}" class="verify-link" target="_blank">View Project</a>
                    </div>
                    <div class="cert-visual">
                        <img src="projects/${image}" alt="${title}">
                    </div>
                </div>
            `;
            container.innerHTML += projectHTML;
        });

        // Re-apply filter logic for multi-tag support
        setupFilters(pills);

    } catch (error) {
        console.error("Error loading projects:", error);
    }
}

function setupFilters(pills) {
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            
            const filter = pill.getAttribute('data-filter').toLowerCase();
            
            document.querySelectorAll('.cert-row').forEach(row => {
                const rowCategories = JSON.parse(row.getAttribute('data-categories'));
                const isMatch = filter === 'all' || rowCategories.includes(filter);
                
                row.style.display = isMatch ? (window.innerWidth <= 900 ? 'flex' : 'grid') : 'none';
            });
        });
    });
}

window.addEventListener('DOMContentLoaded', loadProjects);
