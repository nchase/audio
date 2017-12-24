module.exports = async function createAudioContext(audioEl) {

  if (!window.audioSources) {
    window.audioContext = new (window.AudioContext || window.webkitAudioContext);
    window.audioSources = {};
  }

  let source = audioEl;

  if (!document.body.contains(audioEl)) {
    source = await navigator.mediaDevices.getUserMedia({audio: true})
    window.audioSources[audioEl.src] = Object.assign(window.audioContext.createMediaStreamSource(source));
  } else {
    if (!window.audioSources[audioEl.src]) {
      window.audioSources[audioEl.src] = Object.assign(window.audioContext.createMediaElementSource(source))
    }
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
