# Word Disintegration Study

A creative coding project that explores word disintegration through iterative SVG tracing. The project uses Potrace (via WebAssembly) to repeatedly trace canvas drawings, creating progressively disintegrated and abstracted visual forms.

## Examples

| ![](output/0.png) | ![](output/1.png) |
|-------------------|-------------------|
| ![](output/2.png) | ![](output/3.png) |
| ![](output/4.png) | ![](output/5.png) |
| ![](output/6.png) | ![](output/7.png) |
| ![](output/8.png) | ![](output/9.png) |




## Inspiration

This project is inspired by Alvin Lucier’s *I Am Sitting in a Room* (1969).  
In the piece, Lucier records his voice and keeps playing and re-recording it in the same room until the room’s resonances blur the speech and the original words disappear.

Here, the same idea is applied visually: a word is drawn, traced to SVG, rendered again, and repeatedly re-traced. With each iteration, small distortions build up and the word slowly loses its original form.

More about the piece:  
https://en.wikipedia.org/wiki/I_Am_Sitting_in_a_Room


## How It Works

The project renders text (default: "IDENTITY") on a canvas and then uses Potrace to convert the raster image to an SVG vector path. This SVG is then rendered back onto the canvas, and the process repeats. Each iteration accumulates visual artifacts and distortions, creating a disintegration effect.

Two modes are available:
- **Center Overwrite**: Draws a single word at the center, then traces it
- **Spread Accumulation**: Draws multiple instances of the word with random jitter, then traces the accumulated result

All parameters are controllable via Tweakpane, including:
- Word text
- Mode selection
- Spread count and jitter (X/Y)
- Potrace configuration (turdsize, turnpolicy, alphamax, optcurve, opttolerance)

## Dependencies

This project requires two external dependencies to be cloned in the parent directory:

### 1. potrace-wasm
The WebAssembly port of Potrace, used for SVG tracing:
```bash
cd ..
git clone <potrace-wasm-repo-url>
```

The `serve.sh` script copies `../potrace-wasm/index.js` into the project directory before serving.

### 2. emsdk (Emscripten SDK)
Required for running `emrun`, which serves the project:
```bash
cd ..
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
./emsdk install latest
./emsdk activate latest
```

The `serve.sh` script sources `../emsdk/emsdk_env.sh` to make `emrun` available.

## Setup

1. Clone the dependencies in the parent directory (see above)

2. Install npm dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   This runs `serve.sh`, which:
   - Sources the emsdk environment
   - Copies `potrace-wasm/index.js` into the project
   - Serves the project using `emrun`

4. Open the URL shown in your terminal (typically `http://localhost:6931`) in your browser
```

Note: `index.js` (from potrace-wasm) is copied into the project root by `serve.sh` and is gitignored.
