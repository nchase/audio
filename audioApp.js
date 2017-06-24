var createAudioContext = require('./createAudioContext');

module.exports.setupAudio = function setupAudio(drawUpdate) {
  var audio = createAudioContext();
  wireGraph(audio.audioSource, audio.processor, audio.analyser);


  audio.processor.onaudioprocess = drawUpdate.bind(null, audio.analyser);

  return Promise.resolve(audio.audioSource);
}

function wireGraph(audioSource, processor, analyser) {
  audioSource.connect(analyser);
  audioSource.connect(audioSource.context.destination);

  processor.connect(audioSource.context.destination);
}
