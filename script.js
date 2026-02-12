

document.addEventListener('DOMContentLoaded', () => {
    const wheel = document.getElementById('title-wheel');
    let rotation = 0;

    function rotateWheel() {
        rotation += 90; // Add 90 degrees each time
        wheel.style.transform = `rotateX(${rotation}deg)`;
    }

    // Interval: 3000ms = 3 seconds
    setInterval(rotateWheel, 3000);
});
