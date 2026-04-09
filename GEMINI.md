# GEMINI.md - CPU-GPU Educational Simulation Platform

## Project Overview
The **CPU-GPU Educational Simulation Platform** (CPU-GPU 教育模擬平台) is an interactive web-based educational tool designed to help students and developers understand computer architecture. It provides a step-by-step visualization of hardware logic, starting from fundamental logic gates and progressing to a fully integrated 4-bit CPU.

The project leverages **DigitalJS** for circuit simulation and **JointJS** for interactive visualization.

### Main Technologies
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES Modules).
- **Simulation Engine**: [DigitalJS](https://github.com/tilk/digitaljs) - A digital circuit simulator for the browser.
- **Visualization**: [JointJS](https://www.jointjs.com/) - A diagramming library for building interactive tools.
- **Utilities**: jQuery, Lodash, Backbone.js, ELK (Eclipse Layout Kernel) for automatic circuit layout.

### Architecture
- **`index.html`**: Entry point, defines the UI layout (Explorer, Stage, Control Panel) and loads dependencies.
- **`js/main.js`**: Core application logic. Manages the simulation lifecycle, UI event handling, and circuit rendering.
- **`js/generator.js`**: Contains the circuit "recipes" for each educational step. It generates the JSON format required by DigitalJS.
- **`js/cpu_logic.js` & `js/turing_logic.js`**: Define complex subcircuits (ALU, GPU Core, Turing Tape) used in higher-level simulation steps.
- **`js/blocks.js`**: A factory for standard DigitalJS component JSON structures (Gates, Registers, Adders, etc.).
- **`js/config.js`**: Central configuration for the 4-bit ISA (Instruction Set Architecture), timing, and layout constants.

## Simulation Steps
The project is structured as a series of progressive tutorials:
1.  **Step 0**: Basic Gates (AND, OR, XOR, NOT)
2.  **Step 1-2**: Half-Adder & Full-Adder
3.  **Step 3-4**: D-Latch & D-Flip-Flop (Memory basics)
4.  **Step 5-6**: Registers (Manual and Primitive with Load signals)
5.  **Step 7**: 4-bit Adder
6.  **Step 8**: 4-to-1 Multiplexer (MUX)
7.  **Step 9**: 4-bit ALU (Arithmetic Logic Unit)
8.  **Step 10**: Instruction Decoder
9.  **Step 11**: Program Counter (PC)
10. **Step 12**: Instruction ROM
11. **Step 13**: Full CPU Integration

## Building and Running
This is a static web application. No complex build step or transpilation is required as it uses native ES Modules.

### Key Commands
- **Run**: Serve the project root directory using any static web server.
  - *Example*: `npx serve .` or `python -m http.server 8000`
- **Access**: Open `index.html` in a modern web browser.
- **Tests**: Currently, there is no automated testing framework integrated. Testing is performed manually via the simulation interface.

## Development Conventions
- **Modular JavaScript**: Logic is split into ES modules. Use `import/export` and keep modules focused on specific hardware categories.
- **DigitalJS JSON**: Circuits are defined using a specific JSON schema. Refer to `js/generator.js` and `js/blocks.js` for examples of how to define devices and connectors.
- **Variable Naming**: Follow standard camelCase for variables and functions. Constants should be UPPER_SNAKE_CASE (as seen in `js/config.js`).
- **Interactive Mode**: By default, elements are not draggable in the simulator. Use the "Edit Mode" toggle in the UI to enable interactivity for debugging or layout adjustments.

## TODOs / Future Work
- [ ] Complete the "Assembler" functionality to allow users to write and compile custom machine code into the ROM.
- [ ] Add more comprehensive descriptions for the GPU components.
- [ ] Implement automated validation for circuit correctness.
