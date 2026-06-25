// Atur PIN akses di sini (Contoh: 1234)
const CORRECT_PIN = "310526"; 
let currentPin = "";

// Data Konten Foto & Caption Cerita (Babak 1 - 3)
const galleryData = [
    {
        img: "https://via.placeholder.com/400x500", // Ganti dengan URL foto ke-1
        desc: "setiapp pap yang kamuu kasii mungkinn peyy ga selaluu ngomong cantikk, tapiii..."
    },
    {
        img: "https://via.placeholder.com/400x500", // Ganti dengan URL foto ke-2
        desc: "walaupunn peyy ga pernahh billing gituu, kamuu selaluu cantikk tiapp harii"
    },
    {
        img: "https://via.placeholder.com/400x500", // Ganti dengan URL foto ke-3
        desc: "Makasih yaa udah senantiasa ada di samping aku melewati banyak hal manis gila bareng-bareng~"
    }
];

let currentGalleryIndex = 0;

// Fungsi Efek Partikel Kelopak Bunga Berjatuhan
function createParticles() {
    const container = document.getElementById('particles-container');
    const emojis = ['🌸', '✨', '🍃', '💕'];
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Pilih ornamen acak
        particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Atur posisi horizontal & durasi acak agar natural
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's'; // Antara 4-7 detik
        particle.style.fontSize = (Math.random() * 10 + 12) + 'px'; // Ukuran acak
        
        container.appendChild(particle);
        
        // Hapus elemen setelah jatuh agar web tidak lemot
        setTimeout(() => {
            particle.remove();
        }, 7000);
    }, 400); // Muncul setiap 400ms
}

// Jalankan generator partikel saat web pertama kali dibuka
window.onload = function() {
    createParticles();
};

// Fungsi Navigasi Halaman
function nextScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Logika Input PIN
function pressKey(num) {
    if (currentPin.length < 4) {
        currentPin += num;
        updateDots();
    }
    
    if (currentPin.length === 4) {
        setTimeout(() => {
            if (currentPin === CORRECT_PIN) {
                nextScreen('screen-heart');
            } else {
                alert("Kodenya salah, coba ingat-ingat lagi! 🤫");
                clearKey();
            }
        }, 300);
    }
}

function deleteKey() {
    currentPin = currentPin.slice(0, -1);
    updateDots();
}

function clearKey() {
    currentPin = "";
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.pin-dots .dot');
    dots.forEach((dot, index) => {
        if (index < currentPin.length) {
            dot.classList.add('filled');
        } else {
            dot.classList.remove('filled');
        }
    });
}

// Logika Navigasi Slide Galeri / Cerita
function nextGallery() {
    currentGalleryIndex++;
    if (currentGalleryIndex < galleryData.length) {
        document.getElementById('babak-title').innerText = `BABAK ${currentGalleryIndex + 1} / ${galleryData.length}`;
        document.getElementById('gallery-img').src = galleryData[currentGalleryIndex].img;
        document.getElementById('gallery-desc').innerText = galleryData[currentGalleryIndex].desc;
    } else {
        nextScreen('screen-closing');
    }
}

function resetApp() {
    currentGalleryIndex = 0;
    clearKey();
    document.getElementById('babak-title').innerText = `BABAK 1 / ${galleryData.length}`;
    document.getElementById('gallery-img').src = galleryData[0].img;
    document.getElementById('gallery-desc').innerText = galleryData[0].desc;
    nextScreen('screen-lock');
}

/* --- EFFECT OVERLAY TEXT HEART --- */
.heart-animation-container {
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.heart-text-matrix {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
}

.heart-txt {
    position: absolute;
    font-size: 8px;
    font-weight: bold;
    color: rgba(165, 180, 252, 0.35); /* Warna biru muda transparan seperti di video */
    font-family: 'Montserrat', sans-serif;
    transform: translate(-50%, -50%);
    animation: pulseText 2s infinite ease-in-out;
    white-space: nowrap;
}

.heart-center-content {
    position: relative;
    z-index: 10;
    background: radial-gradient(circle, rgba(11,15,25,0.8) 40%, rgba(11,15,25,0) 100%);
    padding: 40px;
    border-radius: 50%;
}

@keyframes pulseText {
    0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.05); color: #fb7185; }
    }
        
