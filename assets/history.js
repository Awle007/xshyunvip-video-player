document.addEventListener('DOMContentLoaded', function () {
    const historyButton = document.getElementById('historyButton');
    const historyPopup = document.getElementById('historyPopup');
    const historyList = document.getElementById('historyList');
    let isPopupVisible = false;

    function extractTitleFromUrl(url) {
        const urlObj = new URL(url);
        const pathname = urlObj.pathname;
        const segments = pathname.split('/').filter(segment => segment.length > 0);
        const lastSegment = segments[segments.length - 1];
        return lastSegment.replace(/[-_]/g, ' ').replace(/\.\w+$/, '') || url;
    }

    function savePlayHistory(url, playHistoryKey, customTitle = null) {
        let history = JSON.parse(localStorage.getItem('playHistory')) || [];
        const existingIndex = history.findIndex(item => item.url === url);
        const title = playHistoryKey || customTitle || extractTitleFromUrl(url);

        if (!playHistoryKey) {
            return;
        }

        if (existingIndex !== -1) {
            history.splice(existingIndex, 1);
        }
        history.unshift({ url, name: title, t: Date.now() });
        history = history.slice(0, 10);
        localStorage.setItem('playHistory', JSON.stringify(history));
        showPlayHistory();
    }

    function showPlayHistory() {
        const history = JSON.parse(localStorage.getItem('playHistory')) || [];
        historyList.innerHTML = '';
        if (history.length === 0) {
            historyList.innerHTML = '<li>暂无播放历史</li>';
        } else {
            history.forEach((item, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <a href="#" data-url="${item.url}">${item.name}</a>
                    <br><small>${new Date(item.t).toLocaleString()}</small>
                `;
                historyList.appendChild(li);
            });
        }
    }

    historyButton.addEventListener('mouseenter', () => {
        showPlayHistory();
        historyPopup.style.display = 'block';
        historyButton.setAttribute('aria-expanded', 'true');
        isPopupVisible = true;
    });

    document.addEventListener('mousemove', (e) => {
        if (isPopupVisible && !historyButton.contains(e.target) && !historyPopup.contains(e.target)) {
            historyPopup.style.display = 'none';
            historyButton.setAttribute('aria-expanded', 'false');
            isPopupVisible = false;
        }
    });

    historyList.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            document.getElementById('media-url').value = e.target.dataset.url;
            document.querySelector('button[type="submit"].play').click();
            historyPopup.style.display = 'none';
            historyButton.setAttribute('aria-expanded', 'false');
            isPopupVisible = false;
        }
    });

    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let mediaInput = document.querySelector('#media-url');
        let mediaURL = mediaInput.value;
        let api = document.querySelector('.api:checked').value;
        let card = document.querySelector('.card');
        let player = document.querySelector('.player');

        mediaInput.blur();
        card.classList.add('turn-to-back');
        setTimeout(function () {
            player.src = api + mediaURL;
        }, 800);
    });

    function handleInitialLoad() {
        const urlParams = new URLSearchParams(window.location.search);
        const videoUrl = urlParams.get('videoUrl');
        const playHistoryKey = urlParams.get('playHistoryKey');
        if (videoUrl) {
            const mediaInput = document.getElementById('media-url');
            mediaInput.value = decodeURIComponent(videoUrl);

            const playButton = document.querySelector('button[type="submit"].play');
            if (playButton) {
                setTimeout(function () {
                    playButton.click();
                }, 500);
            }
            if (playHistoryKey) {
                savePlayHistory(mediaInput.value, playHistoryKey);
            }
        }
    }

    document.getElementById('historyButton').addEventListener('click', function () {
        var popup = document.getElementById('historyPopup');
        popup.classList.toggle('open');
        this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'false' ? 'true' : 'false');
    });

    handleInitialLoad();
});