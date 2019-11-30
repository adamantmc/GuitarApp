function autocorrelation(signal, start = undefined, end = undefined) {
  let startIndex = start;
  let endIndex = end;

  if (startIndex === undefined) startIndex = 0;
  if (endIndex === undefined) endIndex = signal.length;

  const autocorr = [];

  for (let lag = startIndex; lag < endIndex; lag += 1) {
    let sum = 0;
    for (let i = startIndex; i < endIndex; i += 1) {
      sum += signal[i] * (i + lag < endIndex ? signal[i + lag] : 0);
    }
    autocorr.push(sum);
  }

  return autocorr;
}

function findWavelength(signal, start = undefined, end = undefined) {
  let startIndex = start;
  let endIndex = end;

  if (startIndex === undefined) startIndex = 0;
  if (endIndex === undefined) endIndex = signal.length;

  const autocorr = autocorrelation(signal, startIndex, endIndex);

  let valleyLag = 1;
  for (let i = 1; i < autocorr.length; i += 1) {
    if (autocorr[i] - autocorr[i - 1] < 0) valleyLag = i;
    else break;
  }

  let maxIndex = valleyLag;
  let maxValue = autocorr[valleyLag];
  if (valleyLag === undefined) valleyLag = 1;

  for (let i = valleyLag; i < autocorr.length; i += 1) {
    if (autocorr[i] > maxValue) {
      maxValue = autocorr[i];
      maxIndex = i;
    }
  }

  return maxIndex;
}

function detectFrequency(audio, samplingRate, msStepSize = undefined) {
  const frequencies = [];

  const stepSizeInSamples =
    msStepSize === undefined ? audio.length : Math.round((msStepSize * samplingRate) / 1000);

  let processedSamples = 0;

  while (processedSamples < audio.length) {
    const a = [];

    for (let i = 0; i < stepSizeInSamples; i += 1) {
      a[i] = audio[processedSamples + i];
    }

    const maxIndex = findWavelength(a);

    const frequency = samplingRate / maxIndex;
    // const time = processedSamples / samplingRate;

    frequencies.push(frequency);
    processedSamples += stepSizeInSamples;
  }

  return frequencies;
}

export default detectFrequency;

// const getFileBlob = function(url, cb) {
//   const xhr = new XMLHttpRequest();
//   xhr.open("GET", url);
//   xhr.responseType = "blob";
//   xhr.addEventListener("load", function() {
//     cb(xhr.response);
//   });
//   xhr.send();
// };

// getFileBlob("A_major_scale.wav", r => {
//   const reader = new FileReader();
//   reader.onloadend = function(e) {
//     const context = new (window.AudioContext || window.webkitAudioContext)();
//     context.decodeAudioData(reader.result, buffer => {
//       const pitchDetector = new AutoCorrelation();
//       pitchDetector.detect(buffer.getChannelData(0), buffer.sampleRate, 10);
//     });
//   };
//   reader.readAsArrayBuffer(r);
// });
