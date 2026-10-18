//dark mode on all pages
function initThemeToggle() {
    const toggleInput = document.getElementById('dmToggle');
    const currentTheme = clocalStorage.getItem('theme');

    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('datatheme', 'dark');
        if (toggleInput) toggleInput.checked = true;
    }

    if (toggleInput) {
        toggleInput.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', initThemeToggle);