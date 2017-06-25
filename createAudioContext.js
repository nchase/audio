module.exports = function createAudioContext(audioSource) {
  var audioContext = new (window.AudioContext || window.webkitAudioContext);

  if (!window.audioSource) {
    var audioSource = window.audioSource = Object.assign(audioContext.createMediaElementSource(audioSource));
  }

  var processor;

  try {
    processor = audioContext.createScriptProcessor();
  } catch(error) {
    processor = audioContext.createScriptProcessor(4096);
  }

  var analyser = audioContext.createAnalyser();


  analyser.fftSize = 32;


  return {audioContext, audioSource: window.audioSource, processor, analyser}
}
