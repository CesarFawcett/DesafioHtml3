class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }
    init() {
        this.setTheme(this.currentTheme);
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        const icon = this.themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    }
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(this.currentTheme);
    }
}

// barras de habilidades 
class SkillAnimator {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-level');
        this.init();
    }
    init() {
        // Animacion cuando sea visibles
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const level = entry.target.getAttribute('data-level');
                    entry.target.style.width = `${level}%`;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        this.skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }
}

class PhotoGame {
    constructor() {
        this.photo = document.getElementById('profile-photo');
        this.isRolling = false;
        this.directions = ['left', 'right'];
        this.init();
    }
    init() {
        this.photo.addEventListener('click', (e) => this.handleClick(e));
    }
    handleClick(e) {
        if (this.isRolling) return;

        // Determinar dirección 
        const rect = this.photo.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const photoCenter = rect.width / 2;
        const direction = clickX < photoCenter ? 'left' : 'right';
        this.rollPhoto(direction);
    }
    //resetear
    rollPhoto(direction) {
        this.isRolling = true;
        this.photo.classList.remove('rolling-left', 'rolling-right');
        void this.photo.offsetWidth;
        this.photo.classList.add(`rolling-${direction}`);
        setTimeout(() => {
            this.photo.classList.remove(`rolling-${direction}`);
            this.isRolling = false;
        }, 1500);
    }
}

// Clase principal 
class App {
    constructor() {
        this.themeManager = new ThemeManager();
        this.skillAnimator = new SkillAnimator();
        this.photoGame = new PhotoGame();
    }
}

// Inicializador
document.addEventListener('DOMContentLoaded', () => {
    new App();
});