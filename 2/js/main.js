//Получаем случайное целое число из выбранного диапазона
function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (min < 0 || max < 0) {
    return null;
  }

  if (min === max) {
    return max;
  }

  if (min > max) {
    return Math.floor(Math.random() * (min - max + 1)) + max;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//https://developer.mozilla.org

getRandomNumber(1.5, 2.1);


//Получаем случайное число с плавающей точкой из выбранного диапазона
function generateСoordinate(min, max, float) {
  let coordinate;

  if (min < 0 || max < 0) {
    return null;
  }

  if (min.toFixed() || max.toFixed()) {
    coordinate = Math.random() * (min - max) + max;
    return coordinate.toFixed(float);
  }

  if (min > max) {
    coordinate = Math.random() * (min - max + 1) + max;
    return coordinate.toFixed(float);
  }

  coordinate = Math.random() * (max - min + 1) + min;
  return coordinate.toFixed(float);
}

generateСoordinate(1.1, 1.2, 3);

