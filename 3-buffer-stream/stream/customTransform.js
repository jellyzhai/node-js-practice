const { createReadStream } = require("fs");
const path = require("path");
const readableFilePath = path.resolve(process.cwd(), "README.md");
const { Transform, pipeline } = require("stream");

class CustomTransform extends Transform {
  constructor() {
    super();
  }

  _transform(chunk, encoding, callback) {
    const data = chunk.toString();

    const transformedData = data.replaceAll(/[a-z]/g, (str) =>
      str.toUpperCase()
    );

    this.push(transformedData);
    callback();
  }

  _flush(callback) {
    callback();
  }
}

const customTransformInstance = new CustomTransform();

// 处理数据流 pipe 方式
createReadStream(readableFilePath)
  .pipe(customTransformInstance)
  .pipe(process.stdout);


// 处理数据流 pipeline 方式
// pipeline(
//   createReadStream(readableFilePath),
//   customTransformInstance,
//   process.stdout,
//   err => {
//     console.log("报错了： ", err);
//   }
// );