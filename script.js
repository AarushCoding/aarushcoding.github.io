

document.addEventListener('DOMContentLoaded', () => {
    const wheel = document.getElementById('title-wheel');
    let rotation = 0;

    function rotateWheel() {
        rotation += 72; // Add 90 degrees each time
        wheel.style.transform = `rotateX(${rotation}deg)`;
    }

    // Interval: 2000 = 2 seconds
    setInterval(rotateWheel, 2000);
});
