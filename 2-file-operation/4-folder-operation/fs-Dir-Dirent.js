const fs = require('fs');

console.log(fs.Dir)
console.log(fs.Dirent)

/*
fs.Dir
● dir.path：目录的只读路径
● dir.read()：不传入 callabck 函数则返回 Promise，读取迭代器下一个目录项，返回一个 Promise，resolve 后得到 fs.Dirent 或 null（如果没有更多的目录项要读取）
● dir.close()：不传入 callabck 函数则返回 Promise，关闭目录的底层资源句柄
fs.Dirent
● dirent.name
● dirent.isDirectory()
● dirent.isFile()
● dirent.isSymbolicLink()
*/
fs.opendir(process.cwd(), async (err, dir) => {
  if (err) throw err;

  for await (const dirent of dir) {
    console.log(
      "dirent: ",
      dirent,
      "isDirectory: ",
      dirent.isDirectory(),
      "isFile: ",
      dirent.isFile(),
      "isSymbolicLink: ",
      dirent.isSymbolicLink()
    );
  }
  console.log("dir: ", dir);

  /*
    该注释内容 不能与上面 for 循环同时打开，因为循环结束后，已经关闭了目录的底层资源句柄，
    无法在对 文件夹执行操作
 */
  // const dirRes = await dir.read();
  // console.log("dirRes: ", dirRes);
})