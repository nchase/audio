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
    processor = window.audioSources[audioEl.src].context.createScriptProcessor(4096);
  }

  var analyser = window.audioSources[audioEl.src].context.createAnalyser();


  analyser.fftSize = 32;


  return {audioContext, audioSource: window.audioSources[audioEl.src], processor, analyser}
}
