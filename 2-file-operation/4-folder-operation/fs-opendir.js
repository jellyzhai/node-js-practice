const fs = require("fs/promises");

const dirPath = process.cwd();

async function openDir(path) {
  const dir = await fs.opendir(path);

  console.log('dir: ', dir);

  let dirent = await dir.read();

  while (dirent) {
    console.log("dirent: ", dirent);
    dirent = await dir.read();
  }
}
openDir(dirPath).catch(console.error);
