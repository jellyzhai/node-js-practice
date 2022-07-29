const {CustomReadableStream} = require('./customReadableStream');
const {CustomWritableStream} = require('./customWritableStream');

const crs = new CustomReadableStream(5);

const cws = new CustomWritableStream({
    highWaterMark: 1
});

crs.on('data', chunk => {
    const exceedMark = cws.write(chunk);

    if (exceedMark) {
        console.log("超过了 highWaterMark：", highWaterMark);
        crs.pause()
    }
});

cws.on('drain', () => {
    console.log('可写流处理完了积压数据，可继续处理剩余可读数据。')
    crs.resume();
})
