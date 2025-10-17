function waitlist() {
    const direction = document.getElementById('join-waitlist');
    direction.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function togglefaq() {
    const direction = document.getElementById('faq-section');
    direction.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function howitworks() {
    const direction = document.getElementById('howitworks');
    direction.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function reload() {
    location.reload(true);
}

function showterms() {
    document.getElementById("termsconditionsinfo").style.display = "block";
}

function closeterms() {
    document.getElementById("termsconditionsinfo").style.display = "none";
}

function showprivacy() {
    document.getElementById("privacypoliciesinfo").style.display = "block";
}

function closeprivacy() {
    document.getElementById("privacypoliciesinfo").style.display = "none";
}

// Button click effects
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function (e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    button {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Add smooth reveal animations for feature cards
const cards = document.querySelectorAll('.feature-card');

cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
});

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

cards.forEach(card => observer.observe(card));

// Header hide/show on scroll
let lastScrollTop = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;

    if (scrollTop > lastScrollTop) {
        // Scrolling down → hide header
        header.style.display = 'none';
    } else {
        // Scrolling up → show header
        header.style.display = 'flex';
    }

    lastScrollTop = scrollTop;
});

/* FAQ JS */
const openItems = new Set();

function toggleFAQ(id) {
    const answer = document.getElementById(`answer-${id}`);
    const chevron = document.getElementById(`chevron-${id}`);

    if (openItems.has(id)) {
        // Close the item
        answer.classList.remove('open');
        chevron.classList.remove('open');
        openItems.delete(id);
    } else {
        // Open the item
        answer.classList.add('open');
        chevron.classList.add('open');
        openItems.add(id);
    }
}

/* Continuous, this will display the following emojis when tapping */
document.addEventListener("click", function (e) {
    const emojis = ["✨", "🔥", "💸", "🎉", "💖", "🌟", "😂", "🍕", "🚀", "🅂", "🄸", "🄳"];
    const emoji = document.createElement("div");

    // pick random emoji
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    // position at tap
    emoji.style.position = "absolute";
    emoji.style.left = e.pageX + "px";
    emoji.style.top = e.pageY + "px";
    emoji.style.fontSize = "26px";
    emoji.style.pointerEvents = "none";
    emoji.style.zIndex = 9999;

    // animation
    emoji.style.animation = "floatUp 1s ease-out forwards"; /* floatUp css found in main.css */

    document.body.appendChild(emoji);

    // remove after animation
    setTimeout(() => emoji.remove(), 1000);
});

const form = document.getElementById('email-form');
const thankYou = document.getElementById('thankyou-message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value.trim();

    const iosChecked = form.querySelector('input[name="iOS operating system"]').checked;
    const androidChecked = form.querySelector('input[name="Android operating system"]').checked;

    // Validate
    if (!email) {
        alert('Please enter your email.');
        return;
    }
    if (!iosChecked && !androidChecked) {
        alert('Please select at least one platform.');
        return;
    }

    // Prepare Formspree data
    const data = new FormData();
    data.append('email', email);
    data.append('iOS operating system', iosChecked ? 'iOS' : '');
    data.append('Android operating system', androidChecked ? 'Android' : '');

    try {
        const response = await fetch('https://formspree.io/f/movnyaqd', {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            form.reset(); // clear form
            thankYou.style.display = 'block'; // show thank you message
        } else {
            alert('Oops! Something went wrong. Please try again.');
        }
    } catch (error) {
        console.error(error);
        alert('Oops! Something went wrong. Please try again.');
    }
});