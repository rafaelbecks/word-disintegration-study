import { drawWord } from "./components/letter-renderer.js"
import { Pane } from "https://cdn.jsdelivr.net/npm/tweakpane@4.0.5/dist/tweakpane.min.js"

const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600
const BACKGROUND_COLOR = "#000"
const FOREGROUND_COLOR = "#fff"

const params = {
  word: "IDENTITY",
  mode: "SPREAD_ACCUMULATION",
  spreadCount: 10,
  spreadJitterX: 120,
  spreadJitterY: 120,
  potrace: {
    turdsize: 2,
    turnpolicy: "minority",
    alphamax: 1,
    optcurve: true,
    opttolerance: 0.2
  }
}

// ===== SETUP =====

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT

const pane = new Pane({ title: "Controls" })

pane.addBinding(params, "word")
pane.addBinding(params, "mode", {
  options: {
    "Spread Accumulation": "SPREAD_ACCUMULATION",
    "Center Overwrite": "CENTER_OVERWRITE",
  }
})
pane.addBinding(params, "spreadCount", { min: 1, max: 100, step: 1 })
pane.addBinding(params, "spreadJitterX", { min: 0, max: CANVAS_WIDTH / 2, step: 10 })
pane.addBinding(params, "spreadJitterY", { min: 0, max: CANVAS_HEIGHT / 2, step: 10 })

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
pane.addButton({ title: "Clear Canvas" }).on("click", clearCanvas)
pane.addButton({ title: "Iterate" }).on("click", runIteration)

function clearCanvas () {
  ctx.fillStyle = BACKGROUND_COLOR
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
}

function drawBaseWord () {
  drawWord(ctx, params.word, CANVAS_WIDTH / 2, FOREGROUND_COLOR, 0.1)
}

function drawSpreadWords () {
  for (let i = 0; i < params.spreadCount; i++) {
    const x = CANVAS_WIDTH / 2 + (Math.random() * 2 - 1) * params.spreadJitterX
    const y = CANVAS_HEIGHT / 2 + (Math.random() * 2 - 1) * params.spreadJitterY
    drawWord(ctx, params.word, CANVAS_WIDTH / 2, FOREGROUND_COLOR, 0.1, x, y)
  }
}

// ===== ITERATION =====

async function runIteration () {
  if (params.mode === "CENTER_OVERWRITE") drawBaseWord()
  if (params.mode === "SPREAD_ACCUMULATION") drawSpreadWords()

  try {
    loadFromCanvas(canvas, params.potrace)
      .then(svg => renderSVG(svg))
      .catch(err => console.error("Potrace error:", err))
  } catch (err) {
    console.error("Potrace error:", err)
  }
}

// SVG → Canvas
function renderSVG (svgString) {
  return new Promise(resolve => {
    const img = new Image()
    const blob = new Blob([svgString], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)

    img.onload = () => {
      // clearCanvas()
      ctx.drawImage(img, 0, 0)
      URL.revokeObjectURL(url)
      // console.log('svgString:', svgString)
      resolve()
    }

    img.src = url
  })
}

clearCanvas()
drawBaseWord()
