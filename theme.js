document.addEventListener('DOMContentLoaded', function() {
    var themeLink = document.getElementById('theme-style');
    var prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var currentTheme = themeLink.href.includes('dark-mode') ? 'dark' : 'light';

    if (prefersDarkScheme) {
        themeLink.href = 'dark-mode.css';
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-theme');
    } else {
        themeLink.href = 'light-theme.css';
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-mode');
    }

    var toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', function() {
            if (currentTheme === 'dark') {
                themeLink.href = 'light-theme.css';
                document.body.classList.add('light-theme');
                document.body.classList.remove('dark-mode');
                currentTheme = 'light';
            } else {
                themeLink.href = 'dark-mode.css';
                document.body.classList.add('dark-mode');
                document.body.classList.remove('light-theme');
                currentTheme = 'dark';
            }
        });
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (e.matches) {
            themeLink.href = 'dark-mode.css';
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-theme');
            currentTheme = 'dark';
        } else {
            themeLink.href = 'light-theme.css';
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-mode');
            currentTheme = 'light';
        }
    });
});

// 手动切换主题
function toggleTheme() {
    var themeLink = document.getElementById('theme-style');
    var prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDarkMode = themeLink.href.includes('dark-mode');

    // 如果当前是深色主题，切换到浅色主题
    if (isDarkMode) {
        themeLink.href = 'light-theme.css';
        document.body.className = 'light-theme';
    } else {
        // 否则，切换到深色主题
        themeLink.href = 'dark-mode.css';
        document.body.className = 'dark-mode';
    }
}