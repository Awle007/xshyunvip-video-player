document.addEventListener('DOMContentLoaded', function () {
    var themeLink = document.getElementById('theme-style');
    var prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var currentTheme = themeLink.href.includes('dark-mode') ? 'dark' : 'light';

    if (prefersDarkScheme) {
        themeLink.href = 'assets/dark-mode.css?v=1.9.5';
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-theme');
    } else {
        themeLink.href = 'assets/light-theme.css?v=1.9.5';
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-mode');
    }

    var toggleSwitch = document.getElementById('theme-toggle');
    var toggleInput = toggleSwitch.querySelector('input[type="checkbox"]');

    if (prefersDarkScheme) {
        toggleInput.checked = true;
    }

    toggleInput.addEventListener('change', function () {
        var isDarkMode = this.checked;
        if (isDarkMode) {
            themeLink.href = 'assets/dark-mode.css?v=1.9.5';
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-theme');
            currentTheme = 'dark';
        } else {
            themeLink.href = 'assets/light-theme.css?v=1.9.5';
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-mode');
            currentTheme = 'light';
        }
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        if (e.matches) {
            themeLink.href = 'assets/dark-mode.css?v=1.9.5';
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-theme');
            currentTheme = 'dark';
            toggleInput.checked = true;
        } else {
            themeLink.href = 'assets/light-theme.css?v=1.9.5';
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-mode');
            currentTheme = 'light';
            toggleInput.checked = false;
        }
    });
});
