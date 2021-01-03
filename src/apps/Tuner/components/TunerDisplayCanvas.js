import React from "react";
import { scale } from "../../../logic/utils";

function drawTunerDisplay(canvas, settings) {
  const {
    minVal,
    maxVal,
    stepSize,
    widthPadding,
    topPadding,
    fontSize,
    font,
    strokeColor,
    lineWidth,
  } = settings;

  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);

  const { width, height } = canvas;

  context.strokeStyle = strokeColor;
  context.lineWidth = lineWidth;
  context.textAlign = "center";
  context.font = `${fontSize}px ${font}`;

  context.beginPath();
  for (let i = minVal; i <= maxVal; i += stepSize) {
    const startingPoint = scale(i, -50, 50, 0 + widthPadding, width - widthPadding);
    if (i % 10 === 0) {
      context.moveTo(startingPoint + 0.5, topPadding);
      context.lineTo(startingPoint + 0.5, height);
      context.fillText(i, startingPoint + 0.5, fontSize);
    } else {
      context.moveTo(startingPoint + 0.5, topPadding + (height - topPadding) / 4);
      context.lineTo(startingPoint + 0.5, topPadding + (3 * (height - topPadding)) / 4);
    }
  }
  context.closePath();
  context.stroke();
}

const TunerDisplayCanvas = props => (
  <canvas id="tunerDisplay" width={props.width} height={props.height} />
);

export { TunerDisplayCanvas, drawTunerDisplay };
