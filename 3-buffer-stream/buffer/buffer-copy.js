const buff1 = Buffer.from("abc 你好");
const buff2 = Buffer.alloc(3)
// const buff2 = Buffer.allocUnsafe(3)


/*
Buffer.copy(target: Uint8Array, targetStart?: number | undefined, sourceStart?: number | undefined, sourceEnd?: number | undefined): number
 */
buff1.copy(buff2)
// buff1.copy(buff2, 0, 0, 3)

console.log(buff2.toString());