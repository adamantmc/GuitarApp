import { scale } from "../../logic/utils";

function setSoundLevel(soundLevel) {
  const canvas = document.getElementById("volumeLevel");
  if (canvas === null) {
    return;
  }
  const { width } = canvas;
  const canvasContext = canvas.getContext("2d");
  const boxWidth = scale(soundLevel, 0, 1, 0, width);
  canvasContext.fillStyle = "#be4bdb";
  canvasContext.beginPath();
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  canvasContext.fillRect(0, 0, boxWidth, canvas.height);
  canvasContext.stroke();
}

function drawThresholdBar(threshold) {
  const canvas = document.getElementById("volumeLevel");
  if (canvas === null) {
    return;
  }
  const boxWidth = 4;
  const { width } = canvas;
  const canvasContext = canvas.getContext("2d");
  const thresholdPoint = threshold * width;

  canvasContext.fillStyle = "#00aa00";
  canvasContext.beginPath();
  canvasContext.fillRect(thresholdPoint - boxWidth / 2, 0, boxWidth, canvas.height);
  canvasContext.stroke();
}

export { setSoundLevel, drawThresholdBar };
