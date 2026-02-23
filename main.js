// Typing effect with reveal
const text = "Sustaining Growth, Securing Futures.";
const typingSpeed = 50; 
const typingElement = document.getElementById("typing-effect");

function typeWriter(text, element, speed) {
    let i = 0;
    element.textContent = ""; // Clear existing
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

window.addEventListener("DOMContentLoaded", () => {
    // Start typing after header slide-in
    setTimeout(() => {
        typeWriter(text, typingElement, typingSpeed);
    }, 1200);
});

// Added mouse move parallax effect for background
document.addEventListener("mousemove", (e) => {
    const moveX = (e.clientX * -0.01);
    const moveY = (e.clientY * -0.01);
    document.body.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
});