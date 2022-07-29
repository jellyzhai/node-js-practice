/*
- 以这种方式创建的 `Buffer` 实例的底层内存是_not_ _initialized_。新创建的 `Buffer` 的内容是未知的并且_可能包含敏感数据_。
使用 `buf.fill(0)` 将此类 `Buffer` 实例初始化为零。
- 当使用 `Buffer.allocUnsafe()` 分配新的 `Buffer` 实例时，小于 4 KB 的分配会从单个预分配的 `Buffer` 中切片。
这允许应用程序避免创建许多单独分配的 `Buffer` 实例的垃圾收集开销。这种方法通过消除跟踪和清理尽可能多的单个
 `ArrayBuffer` 对象的需要来提高性能和内存使用率。
- 但是，在开发人员可能需要在不确定的时间内从池中保留一小块内存的情况下，使用 `Buffer.allocUnsafeSlow()` 和然后复制出相关位。
*/
const buff1 = Buffer.allocUnsafeSlow(5);

console.log(Buffer.poolSize)