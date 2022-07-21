function getRandomData() {
  return "生成的随机数：" + Math.random() + "\n";
}

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

module.exports = {
  getRandomData,
  sleep,
};