document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.href === window.location.href) {
        link.style.color = "#007bff";
        link.style.borderBottom = "2px solid #007bff";
    }
});
