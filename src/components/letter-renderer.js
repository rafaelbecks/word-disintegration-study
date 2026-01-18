/**
 * Letter Renderer - Draws uppercase letters A-Z in a geometric style
 */

/**
 * Draws a letter on the canvas context
 */
export function drawLetter (ctx, letter, x, y, width, height, color, lineWidth = 2) {
  const letterFunc = letterFunctions[letter.toUpperCase()]
  if (!letterFunc) return

  ctx.save()
  ctx.translate(x, y)
  ctx.scale(width / 100, height / 100)
  ctx.translate(-50, -50)

  ctx.strokeStyle = color
  ctx.fillStyle = color
  ctx.lineWidth = lineWidth
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  letterFunc(ctx)

  ctx.restore()
}

export function drawWord (ctx, text, targetWidth, color, letterSpacing = 0.1, x = null, y = null, spaceWidth = 0.5, lineWidth = 2) {
  // Process text: keep all characters including spaces, convert letters to uppercase
  const chars = text.split('').map(char => char === ' ' ? ' ' : char.toUpperCase())
  const letters = chars.filter(char => /[A-Z]/.test(char))
  if (letters.length === 0) return

  // Default to canvas center if x/y not provided
  if (x === null) x = ctx.canvas.width / 2
  if (y === null) y = ctx.canvas.height / 2

  // Calculate letter dimensions to fit target width
  // Each letter has aspect ratio of ~0.6 (width/height)
  const aspectRatio = 0.6
  
  // Count spaces and letters separately
  const spaceCount = chars.filter(char => char === ' ').length
  const letterCount = letters.length
  
  // Calculate letter width using the formula:
  // targetWidth = letterCount * letterWidth + (letterCount - 1) * letterSpacing * letterWidth + spaceCount * letterWidth * spaceWidth
  // targetWidth = letterWidth * (letterCount + (letterCount - 1) * letterSpacing + spaceCount * spaceWidth)
  const letterWidth = targetWidth / (letterCount + (letterCount - 1) * letterSpacing + spaceCount * spaceWidth)
  const letterHeight = letterWidth / aspectRatio
  
  // Calculate total width for centering
  const totalWidth = letterCount * letterWidth + (letterCount - 1) * letterSpacing * letterWidth + spaceCount * letterWidth * spaceWidth
  const startX = x - totalWidth / 2 + letterWidth / 2
  const startY = y

  // Draw characters, handling spaces
  let currentX = startX
  let letterIndex = 0
  
  chars.forEach((char) => {
    if (char === ' ') {
      // Skip space width
      currentX += letterWidth * spaceWidth
    } else if (/[A-Z]/.test(char)) {
      // Draw letter
      drawLetter(ctx, char, currentX, startY, letterWidth, letterHeight, color, lineWidth)
      // Move to next position (add spacing if not last letter)
      if (letterIndex < letterCount - 1) {
        currentX += letterWidth + letterSpacing * letterWidth
      }
      letterIndex++
    }
  })
}

const letterFunctions = {
  A: (ctx) => {
    ctx.beginPath()
    ctx.moveTo(50, 10)
    ctx.lineTo(20, 90)
    ctx.lineTo(35, 90)
    ctx.lineTo(50, 60)
    ctx.lineTo(65, 90)
    ctx.lineTo(80, 90)
    ctx.lineTo(50, 10)
    ctx.moveTo(42, 50)
    ctx.lineTo(58, 50)
    ctx.stroke()
  },

  B: (ctx) => {
    ctx.beginPath()
    ctx.moveTo(15, 10)
    ctx.lineTo(15, 90)
    ctx.moveTo(15, 10)
    ctx.lineTo(60, 10)
    ctx.lineTo(75, 10)
    ctx.lineTo(75, 25)
    ctx.lineTo(75, 40)
    ctx.lineTo(60, 50)
    ctx.lineTo(15, 50)
    ctx.moveTo(60, 50)
    ctx.lineTo(75, 50)
    ctx.lineTo(75, 65)
    ctx.lineTo(75, 80)
    ctx.lineTo(60, 80)
    ctx.lineTo(15, 80)
    ctx.stroke()
  },

  C: (ctx) => {
    ctx.beginPath()
    ctx.moveTo(70, 20)
    ctx.lineTo(80, 10)
    ctx.lineTo(70, 10)
    ctx.lineTo(30, 10)
    ctx.lineTo(20, 30)
    ctx.lineTo(20, 50)
    ctx.lineTo(20, 70)
    ctx.lineTo(30, 90)
    ctx.lineTo(70, 90)
    ctx.lineTo(80, 90)
    ctx.lineTo(70, 80)
    ctx.stroke()
  },

  D: (ctx) => {
    ctx.beginPath()
    ctx.moveTo(15, 10)
    ctx.lineTo(15, 90)
    ctx.moveTo(15, 10)
    ctx.lineTo(55, 10)
    ctx.lineTo(75, 10)
    ctx.lineTo(85, 30)
    ctx.lineTo(85, 50)
    ctx.lineTo(85, 70)
    ctx.lineTo(75, 90)
    ctx.lineTo(55, 90)
    ctx.lineTo(15, 90)
    ctx.stroke()
  },

  E: (ctx) => {
    ctx.beginPath()
    ctx.moveTo(15, 10)
    ctx.lineTo(15, 90)
    ctx.moveTo(15, 10)
    ctx.lineTo(75, 10)
    ctx.moveTo(15, 50)
    ctx.lineTo(65, 50)
    ctx.moveTo(15, 90)
    ctx.lineTo(75, 90)
    ctx.stroke()
  },

  F: (ctx) => {
    ctx.beginPath()
    ctx.moveTo(15, 10)
    ctx.lineTo(15, 90)
    ctx.moveTo(15, 10)
    ctx.lineTo(75, 10)
    ctx.moveTo(15, 50)
    ctx.lineTo(65, 50)
    ctx.stroke()
  },

  G: (ctx) => {
    ctx.beginPath()
    ctx.moveTo(12.5, 12.5)
    ctx.lineTo(0, 25)
    ctx.lineTo(0, 50)
    ctx.lineTo(0, 75)
    ctx.lineTo(12.5, 87.5)
    ctx.lineTo(25, 100)
    ctx.lineTo(50, 100)
    ctx.lineTo(75, 100)
    ctx.lineTo(87.5, 87.5)
    ctx.lineTo(87.5, 75)
    ctx.lineTo(87.5, 50)
    ctx.lineTo(75, 50)
    ctx.lineTo(62.5, 50)
    ctx.lineTo(62.5, 50)
    ctx.lineTo(75, 12.5)
    ctx.lineTo(50, 12.5)
    ctx.lineTo(25, 12.5)
    ctx.lineTo(12.5, 12.5)
    ctx.stroke()
  },

  H: (ctx) => {
    ctx.beginPath()
    ctx.moveTo(15, 10)
    ctx.lineTo(15, 90)
    ctx.moveTo(85, 10)
    ctx.lineTo(85, 90)
    ctx.moveTo(15, 50)
    ctx.lineTo(85, 50)
    ctx.stroke()
  },

  I: (ctx) => {
    ctx.beginPath()
    ctx.moveTo(50, 10)
    ctx.lineTo(50, 90)
    ctx.moveTo(30, 10)
    ctx.lineTo(70, 10)
    ctx.moveTo(30, 90)
    ctx.lineTo(70, 90)
    ctx.stroke()
  },

  J: (ctx) => {
    ctx.beginPath()
    ctx.moveTo(70, 10)
    ctx.lineTo(70, 70)
    ctx.lineTo(70, 90)
    ctx.lineTo(50, 90)
    ctx.lineTo(30, 90)
    ctx.lineTo(30, 70)
    ctx.moveTo(50, 10)
    ctx.lineTo(70, 10)
    ctx.stroke()
  },

  K: (ctx) => {
    ctx.beginPath()
    ctx.moveTo(15, 10)
    ctx.lineTo(15, 90)
    ctx.moveTo(15, 50)
    ctx.lineTo(75, 10)
    ctx.moveTo(15, 50)
    ctx.lineTo(75, 90)
    ctx.stroke()
  },

  L: (ctx) => {
    ctx.beginPath()
    ctx.moveTo(15, 10)
    ctx.lineTo(15, 90)
    ctx.lineTo(75, 90)
    ctx.stroke()
  },

  M: (ctx) => {
    ctx.beginPath()
    ctx.moveTo(15, 90)
    ctx.lineTo(15, 10)
    ctx.lineTo(50, 50)
    ctx.lineTo(85, 10)
    ctx.lineTo(85, 90)
    ctx.stroke()
  },

  N: (ctx) => {
    ctx.beginPath()
    ctx.moveTo(15, 90)
    ctx.lineTo(15, 10)
    ctx.lineTo(85, 90)
    ctx.lineTo(85, 10)
    ctx.stroke()
  },

  O: (ctx) => {
    ctx.beginPath()
    ctx.moveTo(50, 10)
    ctx.lineTo(20, 10)
    ctx.lineTo(20, 30)
    ctx.lineTo(20, 50)
    ctx.lineTo(20, 70)
    ctx.lineTo(20, 90)
    ctx.lineTo(50, 90)
    ctx.lineTo(80, 90)
    ctx.lineTo(80, 70)
    ctx.lineTo(80, 50)
    ctx.lineTo(80, 30)
    ctx.lineTo(80, 10)
    ctx.lineTo(50, 10)
    ctx.stroke()
  },

  P: (ctx) => {
    ctx.beginPath()
    ctx.moveTo(15, 10)
    ctx.lineTo(15, 90)
    ctx.moveTo(15, 10)
    ctx.lineTo(60, 10)
    ctx.lineTo(75, 10)
    ctx.lineTo(75, 25)
    ctx.lineTo(75, 40)
    ctx.lineTo(60, 50)
    ctx.lineTo(15, 50)
    ctx.stroke()
  },

  Q: (ctx) => {
    ctx.beginPath()
    ctx.moveTo(50, 10)
    ctx.lineTo(20, 10)
    ctx.lineTo(20, 30)
    ctx.lineTo(20, 50)
    ctx.lineTo(20, 70)
    ctx.lineTo(20, 90)
    ctx.lineTo(50, 90)
    ctx.lineTo(80, 90)
    ctx.lineTo(80, 70)
    ctx.lineTo(80, 50)
    ctx.lineTo(80, 30)
    ctx.lineTo(80, 10)
    ctx.lineTo(50, 10)
    ctx.moveTo(60, 70)
    ctx.lineTo(85, 95)
    ctx.stroke()
  },

  R: (ctx) => {
    ctx.beginPath()
    ctx.moveTo(15, 10)
    ctx.lineTo(15, 90)
    ctx.moveTo(15, 10)
    ctx.lineTo(60, 10)
    ctx.lineTo(75, 10)
    ctx.lineTo(75, 25)
    ctx.lineTo(75, 40)
    ctx.lineTo(60, 50)
    ctx.lineTo(15, 50)
    ctx.moveTo(60, 50)
    ctx.lineTo(85, 90)
    ctx.stroke()
  },

  S: (ctx) => {
    ctx.beginPath()
    ctx.moveTo(70, 10)
    ctx.lineTo(30, 10)
    ctx.lineTo(20, 25)
    ctx.lineTo(20, 40)
    ctx.lineTo(50, 50)
    ctx.lineTo(80, 60)
    ctx.lineTo(80, 75)
    ctx.lineTo(80, 90)
    ctx.lineTo(40, 90)
    ctx.lineTo(20, 90)
    ctx.lineTo(20, 80)
    ctx.stroke()
  },

  T: (ctx) => {
    ctx.beginPath()
    ctx.moveTo(50, 10)
    ctx.lineTo(50, 90)
    ctx.moveTo(20, 10)
    ctx.lineTo(80, 10)
    ctx.stroke()
  },

  U: (ctx) => {
    ctx.beginPath()
    ctx.moveTo(20, 10)
    ctx.lineTo(20, 70)
    ctx.lineTo(20, 90)
    ctx.lineTo(50, 90)
    ctx.lineTo(80, 90)
    ctx.lineTo(80, 70)
    ctx.lineTo(80, 10)
    ctx.stroke()
  },

  V: (ctx) => {
    ctx.beginPath()
    ctx.moveTo(20, 10)
    ctx.lineTo(50, 90)
    ctx.lineTo(80, 10)
    ctx.stroke()
  },

  W: (ctx) => {
    ctx.beginPath()
    ctx.moveTo(10, 10)
    ctx.lineTo(25, 90)
    ctx.lineTo(50, 30)
    ctx.lineTo(75, 90)
    ctx.lineTo(90, 10)
    ctx.stroke()
  },

  X: (ctx) => {
    ctx.beginPath()
    ctx.moveTo(20, 10)
    ctx.lineTo(80, 90)
    ctx.moveTo(80, 10)
    ctx.lineTo(20, 90)
    ctx.stroke()
  },

  Y: (ctx) => {
    ctx.beginPath()
    ctx.moveTo(20, 10)
    ctx.lineTo(50, 50)
    ctx.lineTo(80, 10)
    ctx.moveTo(50, 50)
    ctx.lineTo(50, 90)
    ctx.stroke()
  },

  Z: (ctx) => {
    ctx.beginPath()
    ctx.moveTo(20, 10)
    ctx.lineTo(80, 10)
    ctx.lineTo(20, 90)
    ctx.lineTo(80, 90)
    ctx.stroke()
  }
}
