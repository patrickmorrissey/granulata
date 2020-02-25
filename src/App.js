import React, {useState} from 'react';
import WAAClock from 'waaclock';
// import WaveSurfer from 'wavesurfer.js';
import './App.css';

// for cross browser compatibility
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
const clock = new WAAClock(audioCtx);



function App() {
  const [audioStatus, setAudioStatus] = useState(0);
  setupSample()
    .then((sample) => {
      // playSample(audioCtx, sample);
  });

  return (
    <div className="App">
      <h1>Granulata</h1>
      <h2>A Web Audio-based Audio File Granulator</h2>
      <button id="audio_ctx_button" onClick={toggleAudio}>Click to start audio context</button>
      <h3>AudioContext.state: {audioStatus}</h3>
      <div id="waveform"></div>  
    </div>
  );
}

async function getFile(audioContext, filepath) {
  const response = await fetch(filepath);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return audioBuffer;
}
async function setupSample() {
  const filePath = '/audio_example_files/human-voice.wav';
  const sample = await getFile(audioCtx, filePath);
  return sample;
}

function toggleAudio(){
  if (audioCtx.state === undefined || audioCtx.state === null || audioCtx.state === 'suspended') {   
    audioCtx.resume().then(() => {
      clock.start();
      console.log("Clock started");
    });
  } else if (audioCtx.state === 'running') { 
    audioCtx.suspend().then(() => {
      clock.stop();
      console.log("Clock stopped");
    });
  }
}

// function playSample(audioContext, audioBuffer) {
//   const sampleSource = audioContext.createBufferSource();
//   sampleSource.buffer = audioBuffer;
//   sampleSource.connect(audioContext.destination)
//   sampleSource.start();
//   return sampleSource;
// }

export default App;
