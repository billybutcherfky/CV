// Enabling Menu
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show-menu');
        });
    }
};

showMenu('nav-toggle', 'nav-menu');

// Menu disappears when a link is clicked
const navLink = document.querySelectorAll('.nav-link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}

navLink.forEach(n => n.addEventListener('click', linkAction));

// Changing Active Link while scrolling
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        const link = document.querySelector('.nav-menu a[href*=' + sectionId + ']');

        if (link) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);

// Showing Scroll Top button
function scrollTop() {
    const scrollTopBtn = document.getElementById('scroll-top');

    if (window.scrollY >= 200) {
        scrollTopBtn.classList.add('show-scroll');
    } else {
        scrollTopBtn.classList.remove('show-scroll');
    }
}

window.addEventListener('scroll', scrollTop);

// Changing Theme
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'bx-sun';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () =>
    document.body.classList.contains(darkTheme) ? 'dark' : 'light';

const getCurrentIcon = () =>
    themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun';

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme);
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

// PDF Functions
function scaleCv() {
    document.body.classList.add('scale-cv');
}

function removeScale() {
    document.body.classList.remove('scale-cv');
}

let areaCv = document.getElementById('area-cv');
let resumeButton = document.getElementById('resume-button');

let opt = {
    margin: 0,
    filename: 'myResume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 4 },
    jsPDF: { format: 'a4', orientation: 'portrait' }
};

function generateResume() {
    html2pdf(areaCv, opt);
}

if (resumeButton) {
    resumeButton.addEventListener('click', () => {
        scaleCv();
        generateResume();
        setTimeout(removeScale, 5000);
    });
}

// Certificate Modal Functions
function openCertificate(imagePath) {
    const modal = document.getElementById("certificateModal");
    const image = document.getElementById("certificateImage");

    modal.style.display = "flex";
    image.src = imagePath;
}

function closeCertificate() {
    document.getElementById("certificateModal").style.display = "none";
}

// Close modal when clicking outside image
window.onclick = function (event) {
    const modal = document.getElementById("certificateModal");

    if (event.target === modal) {
        closeCertificate();
    }
};
