var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
ctx.translate(canvas.width / 2, canvas.height / 2);

class Generate_info {
  static input(arr) {
    var txt = "\tX \t Y\n";
    for (var i = 0; i < arr.length; i++) {
      var sub_txt = "";
      for (var j = 0; j < 2; j++) {
        if (j == 0) sub_txt += "\t" + (arr[i][j]).toString().replace(/\./g,',') + " \t";
        if (j == 1) sub_txt += "" + (Number(arr[i][j])*-(1)).toString().replace(/\./g,',');
      }
      txt += sub_txt + "\n ";
    }

    document.forms.form1.text.value = txt;

  }
}

class TextDownload_ {
  static download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}

class Graphic {
  static show_graph() {
    Clear_.clear_graph();
    var pol = document.getElementById("poli").value.toLowerCase();
    var xmin = -500;
    var xmax = 500;
    var dx = 1;
    var arr = [];
    var x;
    var y;
    for (x = xmin; x <= xmax; x += dx) {
      var sub_arr = [];
      y = Solver.solvePolynomial("-(" + pol + ")", x);
      sub_arr = [x, y];
      arr.push(sub_arr);
    }
    for (var i = 0; i < arr.length - 1; i++) {
      var line_ = new DrawLine(arr[i][0], arr[i][1], arr[i + 1][0], arr[i + 1][1], "red", 3);
      line_.draw_line();
    }
    Generate_info.input(arr);
  }
}

class DrawLine {
  constructor(x1, y1, x2, y2, color, lineWidth) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.color = color;
    this.lineWidth = lineWidth;
  }
  draw_line() {
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.closePath();
  }
}

class Coordinates {
  static coordinates_d() {
    var x_cor = new DrawLine(-canvas.width/2, 0, canvas.width/2, 0, "white", 1);
    var y_cor = new DrawLine(0, -canvas.height/2, 0, canvas.height/2, "white", 1);
    x_cor.draw_line();
    y_cor.draw_line();
  }

  static arrow() {
    ctx.fillStyle = "rgb(180, 181, 182)";
    ctx.font = "20px Arial";
    ctx.fillText("˃", canvas.width / 2 - 11, 7);
    ctx.fillText("x", canvas.width / 2 - 11, 20);
    ctx.fillText("˄", -5.5, -311);
    ctx.fillText("y", 8, -308);
  }

  static grid() {
    var dist = 0;
    var x_;
    var y_;
    for (var i = 1; i < 42; i++) {
      dist += 10 * 2;
      x_ = new DrawLine(-canvas.width/2, canvas.height/2+16 - dist, canvas.width/2, canvas.height/2+16 - dist, "#264c66", 1);
      x_.draw_line();
      y_ = new DrawLine(-canvas.width/2-20 + dist, -canvas.height/2, -canvas.width/2-20 + dist, canvas.height/2, "#264c66", 1);
      y_.draw_line();
    }
  }
}

class Solver {
  static solvePolynomial(p, r) {
    var x = (p.match(/[a-z]/) || ['x'])[0];
    p = p.replace(new RegExp(x, 'g'), 'x')
      .replace(/\s/g, '')
      .replace(/(x)\d+/g, '$1')
      .replace(/(\d)x/g, '$1*x')
      .replace(/x\^(\d+)/g, 'Math.pow(x,$1)')
      .replace(/x/g, r)
      .replace(/--/g, '');
    return (p = eval(p).toFixed(2)) == '-0.00' ? '0.00' : p;
  }
}

class Clear_{
  static clear_graph(){
     ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
     Coordinates.coordinates_d();
     Coordinates.grid();
     Coordinates.arrow();
  }

  static delete_input(){
    document.getElementById("poli").value == '';
  }
}

Clear_.clear_graph();
