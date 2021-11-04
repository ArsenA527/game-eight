function init() {
  let canvas = document.getElementById("puzzle8");
  canvas.width = 600;
  canvas.height = 600;
  let cellSize = canvas.width / 3;
  let context = canvas.getContext("2d");
  let field = new game(); // создаём объект


  field.mix(30); // перемешиваем содердимое коробки
  field.setCellView(function (x, y) { // задаём внешний вид
    context.fillStyle = "blue";
    context.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
  });


  field.setNumView(function () { // параметры шрифта для цифр
    context.font = "bold " + (cellSize / 2) + "px sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "#ececec";
  });


  context.fillStyle = "#ececec";
  context.fillRect(0, 0, canvas.width, canvas.height);
  field.draw(context, cellSize);

  function event(x, y) {
    field.move(x, y);
    context.fillStyle = "#ececec";
    context.fillRect(0, 0, canvas.width, canvas.height);
    field.draw(context, cellSize);
    if (field.victory()) { // если игра пройдена, то вызываем функцию перемешиваются
      field.mix(30);
      context.fillStyle = "#ececec";
      context.fillRect(0, 0, canvas.width, canvas.height);
      field.draw(context, cellSize);
    }
  }

  canvas.onclick = function (e) { // обрабатываем клики мышью
    let x = (e.pageX - canvas.offsetLeft) / cellSize | 0;
    let y = (e.pageY - canvas.offsetTop) / cellSize | 0;
    event(x, y); // выхов функции действия
  };

}

function game() {
  const n = 3;
  let cellView = null;
  let numView = null;
  let arr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]
  ];


  function getNull() { // координаты пустой клетки
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (arr[j][i] === 0) {
          return {
            "x": i,
            "y": j
          };
        }
      }
    }
  };


  // произвольное логическое значение
  function getRandomBool() {
    if (Math.floor(Math.random() * 2) === 0) {
      return true;
    }
  }


  // Перемещение к пустой клутку
  this.move = function (x, y) {
    let nullX = getNull().x;
    let nullY = getNull().y;
    if (((x - 1 == nullX || x + 1 == nullX) && y == nullY) || ((y - 1 == nullY || y + 1 == nullY) && x == nullX)) {
      arr[nullY][nullX] = arr[y][x];
      arr[y][x] = 0;
    }
  };


  // условие победы
  this.victory = function () {
    let e = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 0]
    ];
    let res = true;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (e[i][j] != arr[i][j]) {
          res = false;
        }
      }
    }
    return res;
  };


  // метод перемешивания
  this.mix = function (stepCount) {
    let x, y;
    for (let i = 0; i < stepCount; i++) {
      let nullX = getNull().x;
      let nullY = getNull().y;
      let hMove = getRandomBool();
      let upLeft = getRandomBool();
      if (!hMove && !upLeft) {
        y = nullY;
        x = nullX - 1;
      }
      if (hMove && !upLeft) {
        x = nullX;
        y = nullY + 1;
      }
      if (!hMove && upLeft) {
        y = nullY;
        x = nullX + 1;
      }
      if (hMove && upLeft) {
        x = nullX;
        y = nullY - 1;
      }
      if (0 <= x && x <= 2 && 0 <= y && y <= 2) {
        this.move(x, y);
      }
    }
  };

  // внешний вид
  this.setCellView = function (func) {
    cellView = func;
  };

  // параметры шрифта цифр
  this.setNumView = function (func) {
    numView = func;
  };

  // Метод обрисовки
  this.draw = function (context, size) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (arr[i][j] > 0) {
          if (cellView !== null) {
            cellView(j * size, i * size);
          }
          if (numView !== null) {
            numView();
            context.fillText(arr[i][j], j * size + size / 2, i * size + size / 2);
          }
        }
      }
    }
  };
}
