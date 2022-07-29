const buff1 = Buffer.from('abc')
const buff2 = Buffer.from('你好')

// BufferConstructor.concat(list: readonly Uint8Array[], totalLength?: number | undefined): Buffer
const mergerBuffer = Buffer.concat([buff1, buff2])

console.log(mergerBuffer.toString());