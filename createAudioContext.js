module.exports = function createAudioContext(audioSource) {

  if (!window.audioSources) {
    window.audioContext = new (window.AudioContext || window.webkitAudioContext);
    window.audioSources = {};
  }

  if (!window.audioSources[audioSource.src]) {
    window.audioSources[audioSource.src] = Object.assign(window.audioContext.createMediaElementSource(audioSource));
  }

  var audioSource = window.audioSources[audioSource.src];

  var processor;

  try {
    processor = audioSource.context.createScriptProcessor();
  } catch(error) {
    processor = audioSource.context.createScriptProcessor(4096);
  }

  var analyser = audioSource.context.createAnalyser();


  analyser.fftSize = 32;


  return {audioContext, audioSource: audioSource, processor, analyser}
}
