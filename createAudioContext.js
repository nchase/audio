module.exports = function createAudioContext(audioEl) {

  if (!window.audioSources) {
    window.audioContext = new (window.AudioContext || window.webkitAudioContext);
    window.audioSources = {};
  }

  if (!window.audioSources[audioEl.src]) {
    window.audioSources[audioEl.src] = Object.assign(window.audioContext.createMediaElementSource(audioEl));
  }

  var processor;

  try {
    processor = window.audioSources[audioEl.src].context.createScriptProcessor();
  } catch(error) {
    processor = window.audioSources[audioEl.src].context.createScriptProcessor(Math.pow(2, 11));
  }

  var analyser = window.audioSources[audioEl.src].context.createAnalyser();


  analyser.fftSize = Math.pow(2, 11);


  audioContext.gainNode = audioContext.createGain();
  audioContext.gainNode.gain.value = audioEl.dataset.defaultGain || 0.5
  window.audioSources[audioEl.src].connect(audioContext.gainNode)
  audioContext.gainNode.connect(audioContext.destination);

  return {audioContext, audioSource: window.audioSources[audioEl.src], processor, analyser}
}
