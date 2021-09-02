$(".colores").spectrum({
    color: "#000",
    showPalette: true,
    palette: [
        ["black", "white", "blanchedalmond"],
        ["rgb(255, 128, 0);", "hsv 100 70 50", "lightyellow"]
    ],
    change: function(color) {
        colors = color.toHexString();
    }
});
$(".coloresR").spectrum({
    color: "#000",
    showPalette: true,
    palette: [
        ["black", "white", "blanchedalmond"],
        ["rgb(255, 128, 0);", "hsv 100 70 50", "lightyellow"]
    ],
    change: function(color) {
        colorsFill = color.toHexString();
    }
});

let figura = null;
let relleno = null;
let before1 = 0;
let before2 = 0;
let colors = null;
let colorsFill = null;
let context = null;
let mouseClicked = false;

var grosor = null;
var canvas = null;
var guardar;
var dibujo;
var x = 0;
var y = 0;
var x1 = 0;
var x2 = 0;
var y1 = 0;
var y2 = 0;

function seleccionOpciones() {
    for (x = 0; x < document.forms[0].figura.length; x++) {
        if (document.forms[0].figura[x].checked) {
            figura = document.forms[0].figura[x].value;
            break;
        }
    }
}

function PaintNoPro() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    canvas.addEventListener("mousedown", e => {
        var mousePos = getMousePos(canvas, e);
        x = mousePos.x;
        y = mousePos.y;
        guardar = context.getImageData(
            0,
            0,
            canvas.scrollWidth,
            canvas.scrollHeight
        );
        dibujo = true;
        x1 = x;
        y1 = y;
        if (figura == "2") {
            guardar_coordenada(x1, y1);
        }
        if (figura == "9") {
            guardar_coordenada(x1, y1);
        }
    });

    canvas.addEventListener("mousemove", e => {
        var mousePos = getMousePos(canvas, e);
        grosor = document.getElementById("numero").value;
        lado = document.getElementById("lados").value;
        relleno = document.getElementById("relleno").checked;
        x2 = mousePos.x;
        y2 = mousePos.y;
        if ((figura == "2") & (dibujo == true)) {
            DibujoLibre(context, x2, y2);
        } else if ((figura == "9") & (dibujo == true)) {
            Borrador(x2, y2);
        } else if (dibujo == true) {
            context.putImageData(guardar, 0, 0);
            switch (figura) {
                case "1":
                    LineaBresenham(context, x1, y1, x2, y2);
                    break;
                case "2":
                    break;
                case "3":
                    if (relleno == true) {
                        CirculoRelleno(context, x1, y1, x2, y2);
                    } else {
                        Circulo(context, x1, y1, x2, y2);
                    }
                    break;
                case "4":
                    (context, x1, y1, x2, y2);
                    break;
                case "5":
                    if (relleno == true) {
                        ElipseRelleno(context, x1, y1, x2, y2);
                    } else {
                        Elipse(context, x1, y1, x2, y2);
                    }
                    break;
                case "6":
                    ElipseRelleno(context, x1, y1, x2, y2);
                    break;
                case "7":
                    if (relleno == true) {
                        CuadradoRelleno(context, x1, y1, x2, y2);
                    } else {
                        Cuadrado(context, x1, y1, x2, y2);
                    }
                    break;
                case "8":

                    break;
                case "9":
                    Borrador(x1, y1);
                    break;
                case "11":
                    if (relleno == true) {
                        PoligonosRegularesR(context, x1, y1, x2, y2);
                    } else {
                        PoligonosRegulares(context, x1, y1, x2, y2);
                    }
                    break;
            }
        }
    });
    canvas.addEventListener("mouseup", e => {
        if (dibujo == true) {
            x1 = 0;
            y1 = 0;
            x2 = 0;
            y2 = 0;
            dibujo = false;
        }
    });

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
}

function DibujoLibre(x1, y1, x2, y2) {
    context.beginPath();
    context.lineWidth = 1;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineJoin = context.lineCap = "round";
    context.stroke();
    context.closePath();
}

function LineaBresenham(ctx, x1, y1, x2, y2) {
    var dy = y2 - y1;
    var dx = x2 - x1;
    var incYi, IncXi, IncYr, IncXr, k;

    if (dy >= 0) {
        IncYi = 1;
    } else {
        dy = -dy;
        IncYi = -1;
    }
    if (dx >= 0) {
        IncXi = 1;
    } else {
        dx = -dx;
        IncXi = -1;
    }

    if (dx >= dy) {
        IncYr = 0;
        IncXr = IncXi;
    } else {
        IncXr = 0;
        IncYr = IncYi;
        k = dx;
        dx = dy;
        dy = k;
    }

    x = x1;
    y = y1;

    a = 2 * dy;
    b = a - dx;
    p0 = b - dx;

    while (x != x2) {
        if (b >= 0) {
            x = x + IncXi;
            y = y + IncYi;
            b = b + p0;
        } else {
            x = x + IncXr;
            y = y + IncYr;
            b = b + a;
        }

        DibujarPixel(ctx, x1, y1, x, y);
        x1 = x;
        y1 = y;
    }

    DibujarPixel(ctx, x1, y1, x2, y2);
}

function DibujarPixel(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.lineWidth = grosor;
    ctx.strokeStyle = colors;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineJoin = context.lineCap = "round";
    ctx.stroke();
    ctx.closePath();
}

function Cuadrado(ctx, x1, y1, x2, y2) {

    let l = 0;
    let dX = x2 - x1;
    let dY = y2 - y1;

    l = Math.abs(dX) > Math.abs(dY) ? dX : dY;
    l = Math.abs(l);

    let p1, p2, p3, p4;
    p1 = {
        x: x1,
        y: y1
    };

    p2 = {
        x: dX > 0 ? x1 + l : x1 - l,
        y: y1
    };

    p3 = {
        x: dX > 0 ? x1 + l : x1 - l,
        y: dY > 0 ? y1 + l : y1 - l
    };

    p4 = {
        x: x1,
        y: dY > 0 ? y1 + l : y1 - l
    };

    LineaBresenham(ctx, p1.x, p1.y, p2.x, p2.y);
    LineaBresenham(ctx, p2.x, p2.y, p3.x, p3.y);
    LineaBresenham(ctx, p3.x, p3.y, p4.x, p4.y);
    LineaBresenham(ctx, p4.x, p4.y, p1.x, p1.y);
}

function Circulo(ctx, x1, y1, x2, y2) {
    let punto1 = 0;
    let punto2 = 0;
    let radio = 0;
    let colores = "#ff0";
    if (x2 < x1) {
        radio = Math.abs(x2 - x1);
    } else {
        radio = Math.abs(x1 - x2);
    }
    punto1 = x1;
    punto2 = y1;

    ctx.beginPath();
    ctx.lineWidth = grosor;
    ctx.strokeStyle = colors;
    ctx.arc(punto1, punto2, radio, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
}

function CirculoRelleno(ctx, x1, y1, x2, y2) {
    let punto1 = 0;
    let punto2 = 0;
    let radio = 0;
    let colores = "#ff0";
    if (x2 < x1) {
        radio = Math.abs(x2 - x1);
    } else {
        radio = Math.abs(x1 - x2);
    }
    punto1 = x1;
    punto2 = y1;

    console.log(x2);
    ctx.beginPath();
    ctx.lineWidth = grosor;
    ctx.fillStyle = colorsFill;
    ctx.strokeStyle = colors;
    ctx.arc(punto1, punto2, radio, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function DibujoLibre(ctx, mx, my) {
    ctx.beginPath();
    ctx.lineWidth = grosor;
    ctx.strokeStyle = colors;
    ctx.moveTo(before1, before2);
    ctx.lineTo(mx, my);
    ctx.stroke();
    ctx.closePath();
    guardar_coordenada(mx, my);
}

function guardar_coordenada(mx, my) {
    before1 = mx;
    before2 = my;
}

function Elipse(ctx, x1, y1, x2, y2) {
    let punto1 = 0;
    let punto2 = 0;
    let radio = 0;
    let radio2 = 0;
    let colores = "#ff0";

    radio = Math.abs(x1 - x2);
    radio2 = Math.abs(y1 - y2);
    punto1 = x1;
    punto2 = y1;
    ctx.beginPath();
    ctx.lineWidth = grosor;
    ctx.strokeStyle = colors;
    ctx.ellipse(punto1, punto2, radio, radio2, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.closePath();
}

function ElipseRelleno(ctx, x1, y1, x2, y2) {
    let punto1 = 0;
    let punto2 = 0;
    let radio = 0;
    let radio2 = 0;
    let colores = "#ff0";

    radio = Math.abs(x1 - x2);
    radio2 = Math.abs(y1 - y2);

    punto1 = x1;
    punto2 = y1;

    console.log(x2);
    ctx.beginPath();
    ctx.lineWidth = grosor;
    ctx.strokeStyle = colors;
    ctx.fillStyle = colorsFill;
    ctx.ellipse(punto1, punto2, radio, radio2, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function CuadradoRelleno(ctx, x1, y1, x2, y2) {
    let aux = 0;
    if (x2 < x1) {
        aux = x2 - x1;
    } else {
        aux = Math.abs(x1 - x2);
    }

    ctx.beginPath();
    ctx.lineWidth = grosor;
    ctx.strokeStyle = colors;
    ctx.fillStyle = colorsFill;
    ctx.rect(x1, y1, aux, aux);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function Borrador(ix, iy) {
    context.beginPath();
    context.clearRect(ix, iy, 20, 20);
    context.closePath();
}

function PoligonosRegulares(ctx, x1, y1, x2, y2) {
    var R = x2 - x1;

    var rad = (2 * Math.PI) / lado;
    ctx.beginPath();
    for (var i = 0; i < lado; i++) {
        x = x1 + R * Math.cos(rad * i);
        y = y1 + R * Math.sin(rad * i);
        ctx.strokeStyle = colors;
        ctx.lineWidth = grosor;
        ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
}

function PoligonosRegularesR(ctx, x1, y1, x2, y2) {
    var R = x2 - x1;

    var rad = (2 * Math.PI) / lado;
    ctx.beginPath();
    for (var i = 0; i < lado; i++) {
        x = x1 + R * Math.cos(rad * i);
        y = y1 + R * Math.sin(rad * i);
        ctx.strokeStyle = colors;
        ctx.fillStyle = colorsFill;
        ctx.lineWidth = grosor;
        ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}


canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
var reader = new FileReader();

document.getElementById('save').addEventListener('click', function() {

    var canvasContents = canvas.toDataURL();
    var data = { image: canvasContents, date: Date.now() };
    var string = JSON.stringify(data);

    var file = new Blob([string], {
        type: 'application/json'
    });

    var a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = 'Lienzo.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

document.getElementById('load').addEventListener('change', function() {
    if (this.files[0]) {
        reader.readAsText(this.files[0]);
    }
});

reader.onload = function() {
    var data = JSON.parse(reader.result);
    var image = new Image();
    image.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0);
    }
    image.src = data.image;
};