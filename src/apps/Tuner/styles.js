const TunerDivStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  width: "100%",
};

const TunerCanvasSize = {
  width: "500px",
  height: "75px",
};

const TunerDisplaySettings = {
  minVal: -50,
  maxVal: 50,
  stepSize: 2.5,
  widthPadding: 8,
  font: "Arial",
  fontSize: 12,
  topPadding: 12 + 4,
  strokeColor: "#666666",
  lineWIdth: 2,
};

const TunerPointerSettings = {
  widthPadding: 8,
  topPadding: 0,
  strokeColor: "#00aa00",
  pointerHeight: 15,
  pointerWidth: 15,
};

export { TunerCanvasSize, TunerDisplaySettings, TunerPointerSettings, TunerDivStyle };
