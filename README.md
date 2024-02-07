# equalizer-project


## Overview
This project is a web application that allows users to upload an audio file and visualize its sound waves using a grid of cells. The grid responds to the audio frequency data, changing the color of each cell based on the intensity of the sound waves. Users can play, pause, and upload different audio files to see the visualization.

## Technologies Used
- HTML5
- CSS3
- JavaScript

## Project Setup
1. Clone the repository to your local machine.
2. Open the `index.html` file in a web browser.

## Issues Faced and Solutions

### Issue 1: Grid not displaying
#### Solution:
- Ensured correct CSS styles for the grid container and cells.
- Dynamically created grid cells using JavaScript.

### Issue 2: Audio not playing after upload
#### Solution:
- Added an event listener to the file input for audio upload.
- Decoded the uploaded audio file using the Web Audio API.

### Issue 3: Audio playback not synchronized with grid visualization
#### Solution:
- Used the AudioContext API to create an audio context and connect the audio source to an analyser node.
- Visualized the sound waves in the grid by analyzing the frequency data obtained from the analyser node.

### Issue 4: Double playback of audio
#### Solution:
- Implemented logic to stop previous audio playback before starting a new one.
- Checked the state of the audio context to prevent double playback.

### Issue 5: Grid visualization not working during audio playback
#### Solution:
- Ensured that the `visualizeSound` function was called during audio playback.
- Updated the grid colors based on the intensity of the sound waves obtained from the analyser node.

### Issue 6: Inability to pause/resume audio and grid visualization
#### Solution:
- Added event listeners to the audio player for play and pause actions.
- Suspended and resumed the audio context to pause and resume audio playback and grid visualization.

### Upcoming Fix: Double instances of audio playback
#### Note:
- A fix for the issue of double instances of audio playback will be provided soon.

## Future Enhancements
- Improve the visual representation of sound waves in the grid.
- Add additional features such as volume control and waveform display.
- Optimize performance for large audio files and grid sizes.

