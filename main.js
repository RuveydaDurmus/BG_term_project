function startWebGL() {
    const canvas = document.getElementById('glCanvas');
    const gl = canvas.getContext('webgl');

    if (!gl) {
        console.log('WebGL not supported, falling back on experimental-webgl');
        gl = canvas.getContext('experimental-webgl');
    }

    if (!gl) {
        alert('Your browser does not support WebGL');
    }

    return gl;
}

function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

function setLetterPosition(gl, program, positions, translation) {
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    const translationLocation = gl.getUniformLocation(program, "u_translation");
    gl.uniform2fv(translationLocation, translation);
}

function drawLetter(gl, program, positions, translation, color) {
    setLetterPosition(gl, program, positions, translation);
    const colorLocation = gl.getUniformLocation(program, "u_color");
    gl.uniform4fv(colorLocation, color);
    gl.drawArrays(gl.LINES, 0, positions.length / 2);
}

function drawDots(gl, program, positions, translation, color) {
    setLetterPosition(gl, program, positions, translation);
    const colorLocation = gl.getUniformLocation(program, "u_color");
    gl.uniform4fv(colorLocation, color);
    gl.drawArrays(gl.POINTS, 0, positions.length / 2);
}

function main() {
    const gl = startWebGL();

    if (!gl) {
        return;
    }

    const vertexShaderSource = `
        attribute vec4 a_position;
        uniform vec2 u_translation;
        void main() {
            gl_Position = a_position + vec4(u_translation, 0, 0);
            gl_PointSize = 10.0;
        }
    `;

    const fragmentShaderSource = `
        precision mediump float;
        uniform vec4 u_color;
        void main() {
            gl_FragColor = u_color;
        }
    `;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = createProgram(gl, vertexShader, fragmentShader);

    gl.useProgram(program);

    const rPositions = [
        -0.05,  0.1,  -0.05, -0.1,  -0.05,  0.1,   0.0,  0.1,
        0.0,  0.1,   0.0,  0.0,   0.0,  0.0,  -0.05,  0.0,
        0.0,  0.0,   0.05, -0.1
    ];

    const uPositions = [
        -0.05,  0.1,  -0.05, -0.05,  -0.05, -0.05,   0.05, -0.05,
        0.05, -0.05,  0.05,  0.1
    ];

    const uDotsPositions = [
        -0.025, 0.15,  0.025, 0.15
    ];

    const vPositions = [
        -0.05,  0.1,   0.0, -0.1,   0.0, -0.1,  0.05,  0.1
    ];

    const ePositions = [
        0.05,  0.1,  -0.05,  0.1,  -0.05,  0.1,  -0.05,  0.0,
        -0.05,  0.0,   0.05,  0.0,  -0.05,  0.0,  -0.05, -0.1,
        -0.05, -0.1,   0.05, -0.1
    ];

    const yPositions = [
        -0.05,  0.1,   0.0,  0.0,   0.0,  0.0,   0.05,  0.1,
        0.0,  0.0,   0.0, -0.1
    ];

    const dPositions = [
        -0.05,  0.1,  -0.05, -0.1,  -0.05,  0.1,   0.05,  0.1,
        0.05,  0.1,   0.05, -0.1,  0.05, -0.1,  -0.05, -0.1
    ];

    const aPositions = [
        -0.05, -0.1,   0.0,  0.1,   0.0,  0.1,   0.05, -0.1,
        -0.025, 0.0,   0.025, 0.0
    ];

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const translations = [
        [-0.6, 0], [-0.4, 0], [-0.2, 0], [0, 0], [0.2, 0], [0.4, 0], [0.6, 0]
    ];

    const colors = [
        [1.0, 0.0, 0.0, 1.0], // Kırmızı
        [0.0, 1.0, 0.0, 1.0], // Yeşil
        [0.0, 0.0, 1.0, 1.0], // Mavi
        [1.0, 1.0, 0.0, 1.0], // Sarı
        [1.0, 0.0, 1.0, 1.0], // Mor
        [0.0, 1.0, 1.0, 1.0], // Camgöbeği
        [0.5, 0.0, 0.5, 1.0]  // Mor (Farklı Ton)
    ];

    drawLetter(gl, program, rPositions, translations[0], colors[0]);
    drawLetter(gl, program, uPositions, translations[1], colors[1]);
    drawDots(gl, program, uDotsPositions, translations[1], colors[1]); // Ü harfi için noktalar
    drawLetter(gl, program, vPositions, translations[2], colors[2]);
    drawLetter(gl, program, ePositions, translations[3], colors[3]);
    drawLetter(gl, program, yPositions, translations[4], colors[4]);
    drawLetter(gl, program, dPositions, translations[5], colors[5]);
    drawLetter(gl, program, aPositions, translations[6], colors[6]);
}

main();
