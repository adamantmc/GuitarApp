import React from "react";
import { scale } from "../../../logic/utils";

function drawTunerPointer(canvas, point, settings) {
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);

  const { width } = canvas;
  const { widthPadding, strokeColor, topPadding, pointerHeight, pointerWidth } = settings;

  const tunerLineX = scale(point, -50, 50, 0 + widthPadding, width - widthPadding);
  const triangleHalfSide = pointerWidth / 2;

  context.strokeStyle = strokeColor;
  context.fillStyle = strokeColor;

  context.beginPath();
  context.moveTo(tunerLineX + 0.5, topPadding);
  context.lineTo(tunerLineX + 0.5, pointerHeight);

  context.lineTo(tunerLineX + 0.5 - triangleHalfSide, pointerHeight);
  context.lineTo(tunerLineX + 0.5, topPadding);

  context.moveTo(tunerLineX + 0.5, topPadding + pointerHeight);

  context.lineTo(tunerLineX + 0.5 + triangleHalfSide, pointerHeight);
  context.lineTo(tunerLineX + 0.5, topPadding);

  context.fill();

  context.closePath();
  context.stroke();
}

const TunerPointerCanvas = props => (
  <canvas id="tunerPointer" width={props.width} height={props.height} />
);

export { TunerPointerCanvas, drawTunerPointer };
