const { Readable } = require("stream");

/*
 _read 方法的实现，有几个值得注意的地方
1. Readable 类中默认有 _read 方法的实现，不过什么都没有做，我们做的是覆盖重写
2. _read 方法有一个参数 size，用来向 read 方法指定应该读取多少数据返回，不过只是一个参考数据，
很多实现忽略此参数，我们这里也忽略了，后面会详细提到
3. 通过 this.push 向缓冲区推送数据，缓冲区概念后面会提到，暂时理解为挤到了水管中可消费了
4. push 的内容只能是字符串或者 Buffer，不能是数字
5. push 方法有第二个参数 encoding，用于第一个参数是字符串时指定 encoding
*/
class CustomReadableStream extends Readable {
  #max;
  constructor(max) {
    super();
    this.#max = max;
  }

  _read() {
    const cxt = this;

    setTimeout(() => {
      if (this.#max) {
        const randomNum = Math.random().toString() + "\n";

        // 只能 push 字符串或 Buffer
        cxt.push(randomNum);
        this.#max -= 1;
      } else {
        // 向缓冲区 push 一个 null 就可以停止数据读取
        cxt.push(null);
      }
    }, 1000);
  }
}

module.exports = {
  CustomReadableStream,
};