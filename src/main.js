import { drawWord } from "./components/letter-renderer.js"
import { createControls } from "./ui/controls.js"

const params = {
  canvas: {
    width: 800,
    height: 800,
    backgroundColor: "#000",
    foregroundColor: "#fff"
  },
  word: "IDENTITY",
  wordWidth: 400,
  spaceWidth: 0.5,
  lineWidth: 2,
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

const canvas = document.getElementById("canvas")
const canvasContainer = document.getElementById("canvas-container")
const ctx = canvas.getContext("2d")

function clearCanvas () {
  ctx.clearRect(0, 0, params.canvas.width, params.canvas.height)
}

function drawBaseWord () {
  drawWord(ctx, params.word, params.wordWidth, params.canvas.foregroundColor, 0.1, null, null, params.spaceWidth, params.lineWidth)
}

function drawSpreadWords () {
  for (let i = 0; i < params.spreadCount; i++) {
    const x = params.canvas.width / 2 + (Math.random() * 2 - 1) * params.spreadJitterX
    const y = params.canvas.height / 2 + (Math.random() * 2 - 1) * params.spreadJitterY
    drawWord(ctx, params.word, params.canvas.width / 2, params.canvas.foregroundColor, 0.1, x, y, params.spaceWidth, params.lineWidth)
  }
}

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

function renderSVG (svgString) {
  return new Promise(resolve => {
    const img = new Image()
    const blob = new Blob([svgString], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)

    img.onload = () => {
      ctx.drawImage(img, 0, 0)
      URL.revokeObjectURL(url)
      resolve()
    }

    img.src = url
  })
}

function exportWithBackground(format, quality = 1.0) {
  const currentImageData = canvas.toDataURL("image/png")
  const img = new Image()
  
  img.onload = () => {
    ctx.fillStyle = params.canvas.backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0)
    
    const link = document.createElement("a")
    const timestamp = Date.now()
    link.download = `canvas-export-${timestamp}.${format === "image/png" ? "png" : "jpg"}`
    link.href = canvas.toDataURL(format, quality)
    link.click()
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0)
  }
  
  img.src = currentImageData
}

function exportAsPNG() {
  exportWithBackground("image/png")
}

function exportAsJPEG() {
  exportWithBackground("image/jpeg", 0.95)
}

function updateCanvasSize() {
  canvas.width = params.canvas.width
  canvas.height = params.canvas.height
  controls.updateRelatedValues()
  clearCanvas()
}

const controls = createControls(params, canvasContainer, {
  onUpdateCanvas: updateCanvasSize,
  onDrawBaseWord: drawBaseWord,
  onClearCanvas: clearCanvas,
  onIterate: runIteration,
  onExportPNG: exportAsPNG,
  onExportJPEG: exportAsJPEG
})

updateCanvasSize()

clearCanvas()
drawBaseWord()
