/*
- 分配一个大小为 size 字节的新 Buffer，allocUnsafe 执行速度比 alloc 快，但方法的名字听起来很不安全，确实也不安全。
Buffer 模块会预分配一个内部的大小为 Buffer.poolSize 的 Buffer 实例，作为快速分配的内存池，用于使用 allocUnsafe()
创建新的 Buffer 实例
- alloc 永远不会使用内部的 Buffer 池，而 allocUnsafe 在 size 小于或等于 Buffer.poolSize 的一半时将会使用内部的
 Buffer池。 当调用 allocUnsafe 时分配的内存段尚未初始化（不归零），这样分配内存速度很块，但分配到的内存片段可能包含旧数据。
 如果在使用的时候不覆盖这些旧数据就可能造成内存泄露，虽然速度快，尽量避免使用。
*/
const buff1 = Buffer.allocUnsafe(10)

console.log(buff1)