function init() {
  let canvas = document.getElementById("puzzle8");
  // задаём размеры холста
  canvas.width = 360;
  canvas.height = 360;

  let cellSize = canvas.width / 3;

  let field = new game(); // создаём объект
  field.mix(35); // перемешиваем содердимое коробки

  let context = canvas.getContext("2d");
  context.fillStyle = "#222"; // цвет "заливки"
  context.fillRect(0, 0, canvas.width, canvas.height); // закрашиваем холст
}

function game() {
  let cellView = null;
  let numView = null;
  let arr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]
  ];

  let clicks = 0;


  function getNull() { // Координаты пустой клетки
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (arr[j][i] === 0) {
          return {
            "x": i,
            "y": j
          };
        }
      }
    }
  };

  // Произвольное логическое значение
  function getRandomBool() {
    if (Math.floor(Math.random() * 2) === 0) {
      return true;
    }
  }


  // Функция перемешивания
  this.mix = function (stepCount) {
    let x, y;
    for (let i = 0; i < stepCount; i++) {
      let nullX = getNull().x;
      let nullY = getNull().y;
      let hMove = getRandomBool();
      let upLeft = getRandomBool();

      console.log("nullX = " + nullX);
      console.log("nullY = " + nullY);
      console.log("hMove = " + hMove);
      console.log("upLeft = " + upLeft);
    }

    clicks = 0;
  };

  // внешний вид
  this.setCellView = function (func) {
    cellView = func;
  };

  // параметры шрифта цифр
  this.setNumView = function (func) {
    numView = func;
  };

  // число касаний
  this.getClicks = function () {
    return clicks;
  };



}
