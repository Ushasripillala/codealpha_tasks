// Define local or placeholder absolute audio array objects
const trackList = [
    {
        title: "Synthwave Dreams",
        artist: "Neon Horizon",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        title: "Cyberpunk Override",
        artist: "Glitch FX",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        title: "Lo-Fi Coffee Beans",
        artist: "Chill Hop Collective",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    }
];

let trackIndex = 0;
let isPlaying = false;

const audio = document.getElementById('audio-element');
const playBtn = document.getElementById('btn-play');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const progressBar = document.getElementById('progress-bar');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('total-duration');
const volumeSlider = document.getElementById('volume-slider');
const artDisc = document.getElementById('art-placeholder');
const queueList = document.getElementById('playlist-queue');

// Initializes application stack contexts
window.addEventListener('DOMContentLoaded', () => {
    loadTrack(trackIndex);
    buildPlaylistUI();
});

// Structural loader for selected runtime track mapping
function loadTrack(index) {
    trackIndex = index;
    audio.src = trackList[index].src;
    trackTitle.innerText = trackList[index].title;
    trackArtist.innerText = trackList[index].artist;
    
    progressBar.value = 0;
    updateQueueHighlight();
}

// Controls execution state properties
function togglePlayback() {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
}

function playTrack() {
    isPlaying = true;
    audio.play();
    playBtn.innerText = "⏸";
    artDisc.style.animationPlayState = "running";
}

function pauseTrack() {
    isPlaying = false;
    audio.pause();
    playBtn.innerText = "▶";
    artDisc.style.animationPlayState = "paused";
}

function nextTrack() {
    trackIndex = (trackIndex + 1) % trackList.length;
    loadTrack(trackIndex);
    if (isPlaying) playTrack();
}

function previousTrack() {
    trackIndex = (trackIndex - 1 + trackList.length) % trackList.length;
    loadTrack(trackIndex);
    if (isPlaying) playTrack();
}

// Master volume assignment execution
function adjustVolume() {
    audio.volume = volumeSlider.value;
}

// Listens to track real-time position markers
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const currentPercentage = (audio.currentTime / audio.duration) * 100;
        progressBar.value = currentPercentage;
        
        // Render human-readable digital clock outputs
        currentTimeDisplay.innerText = formatTime(audio.currentTime);
        durationDisplay.innerText = formatTime(audio.duration);
    }
});

// Handles timeline scrubbing via target ranges
progressBar.addEventListener('input', () => {
    if (audio.duration) {
        audio.currentTime = (progressBar.value / 100) * audio.duration;
    }
});

// Bonus loop auto-advance validation tracking
audio.addEventListener('ended', () => {
    nextTrack();
});

// Converts total seconds into clean MM:SS presentation templates
function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    if (secs < 10) secs = `0${secs}`;
    return `${mins}:${secs}`;
}

// Generates dynamic side playlist panel indicators
function buildPlaylistUI() {
    queueList.innerHTML = "";
    trackList.forEach((track, index) => {
        const item = document.createElement('li');
        item.innerText = `${track.title} - ${track.artist}`;
        item.setAttribute('onclick', `selectTrack(${index})`);
        queueList.appendChild(item);
    });
    updateQueueHighlight();
}

function selectTrack(index) {
    loadTrack(index);
    playTrack();
}

function updateQueueHighlight() {
    const listItems = queueList.querySelectorAll('li');
    listItems.forEach((li, idx) => {
        if (idx === trackIndex) {
            li.classList.add('active-track');
        } else {
            li.classList.remove('active-track');
        }
    });
}