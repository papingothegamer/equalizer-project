const gridContainer = document.getElementById('gridContainer');
const audioInput = document.getElementById('audioInput');
const audioPlayer = document.getElementById('audioPlayer');
const numRows = 10;
const numCols = 20;
let audioContext;
let audioSource;
let analyser;
let dataArray;
let animationFrameId;

// Function to create grid cells
function createGrid() {
    for (let i = 0; i < numRows * numCols; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        gridContainer.appendChild(cell);
    }
}

// Function to visualize sound waves in the grid
function visualizeSound() {
    analyser.getByteFrequencyData(dataArray);

    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        const intensity = dataArray[Math.floor(index / cells.length * dataArray.length)];
        const color = `rgb(${intensity}, ${intensity}, ${intensity})`;
        cell.style.backgroundColor = color;
    });

    animationFrameId = requestAnimationFrame(visualizeSound);
}

// Function to start audio playback
function startPlayback(audioBuffer) {
  // Stop and disconnect previous playback
  stopPlayback();

  // Create new audio context and source
  audioContext = new AudioContext();
  audioSource = audioContext.createBufferSource();
  audioSource.buffer = audioBuffer;

  // Connect audio source to analyser and destination
  analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;
  const bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);

  audioSource.connect(analyser);
  analyser.connect(audioContext.destination);

  // Start visualization and audio playback
  visualizeSound();
  audioSource.start(0);
}

// Function to stop audio playback
function stopPlayback() {
    if (audioSource) {
        audioSource.stop();
        audioSource.disconnect();
        analyser.disconnect();
        cancelAnimationFrame(animationFrameId);
    }
}

// Event listener for file upload
audioInput.addEventListener('change', function() {
    const file = this.files[0];
    const fileReader = new FileReader();

    fileReader.onload = function() {
        audioContext = new AudioContext();
        audioContext.decodeAudioData(fileReader.result)
            .then((audioBuffer) => {
                audioPlayer.src = URL.createObjectURL(file);
                audioPlayer.onplay = function() {
                    startPlayback(audioBuffer);
                };
                audioPlayer.onpause = function() {
                    stopPlayback();
                };
            })
            .catch((error) => {
                console.error('Error decoding audio file:', error);
            });
    };

    if (file) {
        fileReader.readAsArrayBuffer(file);
    }
});

// Initialize grid when the page loads
createGrid();
