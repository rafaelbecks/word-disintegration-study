import { Pane } from "https://cdn.jsdelivr.net/npm/tweakpane@4.0.5/dist/tweakpane.min.js"

export function createControls(params, canvasContainer, callbacks) {
  const {
    onUpdateCanvas,
    onDrawBaseWord,
    onClearCanvas,
    onIterate,
    onExportPNG,
    onExportJPEG
  } = callbacks

  const pane = new Pane({ title: "Controls" })

  const canvasFolder = pane.addFolder({ title: "Canvas" })
  const widthBinding = canvasFolder.addBinding(params.canvas, "width", { min: 100, max: 2000, step: 10 })
  const heightBinding = canvasFolder.addBinding(params.canvas, "height", { min: 100, max: 2000, step: 10 })

  widthBinding.on("change", () => updateRelatedValues())
  heightBinding.on("change", () => updateRelatedValues())
  
  canvasFolder.addBinding(params.canvas, "backgroundColor").on("change", (ev) => {
    canvasContainer.style.backgroundColor = ev.value
  })
  canvasFolder.addBinding(params.canvas, "foregroundColor")
  canvasFolder.addButton({ title: "Update Canvas" }).on("click", () => {
    onUpdateCanvas()
    onDrawBaseWord()
  })

  canvasContainer.style.backgroundColor = params.canvas.backgroundColor

  const wordFolder = pane.addFolder({ title: "Word Settings" })
  wordFolder.addBinding(params, "word")
  const wordWidthBinding = wordFolder.addBinding(params, "wordWidth", { min: 100, max: params.canvas.width, step: 10 })
  wordFolder.addBinding(params, "spaceWidth", { min: 0, max: 2, step: 0.1, label: "Space Width" })
  wordFolder.addBinding(params, "lineWidth", { min: 0.5, max: 10, step: 0.5, label: "Line Width" })
  wordFolder.addButton({ title: "Draw Base Word" }).on("click", () => {
    onClearCanvas()
    onDrawBaseWord()
  })

  const modeFolder = pane.addFolder({ title: "Mode Settings" })
  modeFolder.addBinding(params, "mode", {
    options: {
      "Spread Accumulation": "SPREAD_ACCUMULATION",
      "Center Overwrite": "CENTER_OVERWRITE",
    }
  })
  modeFolder.addBinding(params, "spreadCount", { min: 1, max: 100, step: 1 })
  const spreadJitterXBinding = modeFolder.addBinding(params, "spreadJitterX", { min: 0, max: params.canvas.width, step: 10 })
  const spreadJitterYBinding = modeFolder.addBinding(params, "spreadJitterY", { min: 0, max: params.canvas.height, step: 10 })

  function updateRelatedValues() {
    if (wordWidthBinding.controller_) {
      wordWidthBinding.controller_.binding.target.maxValue = params.canvas.width
      if (params.wordWidth > params.canvas.width) {
        params.wordWidth = params.canvas.width
      }
    }
    
    if (spreadJitterXBinding.controller_) {
      spreadJitterXBinding.controller_.binding.target.maxValue = params.canvas.width
      if (params.spreadJitterX > params.canvas.width) {
        params.spreadJitterX = params.canvas.width
      }
    }
    
    if (spreadJitterYBinding.controller_) {
      spreadJitterYBinding.controller_.binding.target.maxValue = params.canvas.height
      if (params.spreadJitterY > params.canvas.height) {
        params.spreadJitterY = params.canvas.height
      }
    }
  }

  const potraceFolder = pane.addFolder({ title: "Potrace Config" })
  potraceFolder.addBinding(params.potrace, "turdsize", { min: 0, max: 10, step: 1 })
  potraceFolder.addBinding(params.potrace, "turnpolicy", {
    options: {
      "Minority": "minority",
      "Majority": "majority",
      "Black": "black",
      "White": "white",
      "Right": "right",
      "Left": "left"
    }
  })
  potraceFolder.addBinding(params.potrace, "alphamax", { min: 0, max: 1.33, step: 0.01 })
  potraceFolder.addBinding(params.potrace, "optcurve")
  potraceFolder.addBinding(params.potrace, "opttolerance", { min: 0, max: 1, step: 0.01 })

  const exportFolder = pane.addFolder({ title: "Export" })
  exportFolder.addButton({ title: "Export as PNG" }).on("click", onExportPNG)
  exportFolder.addButton({ title: "Export as JPEG" }).on("click", onExportJPEG)

  pane.addButton({ title: "Iterate" }).on("click", onIterate)


  return {
    pane,
    updateRelatedValues
  }
}
