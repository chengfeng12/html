const fs = require("fs");
const os = require("os");
const readPath = "./html";
const writePath = "./text";

function readFile(path) {
  return new Promise((reslove, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      text = data.toString();
      console.log('读取成功', path);
      reslove(text);
      // console.log("异步读取: " + data.toString());
    });
  });
}

function writeFile(path, text) {
  console.log("写入文件", path);
  const writeRes = fs.writeFileSync(path, text);
  console.log(writeRes, '写入成功');
}

/**
 * 开始写入文件
 * ${files} 要写入的文件集合
 * ${readPath} 需要读取文件的路径
 * ${writePath} 需要写入文件的路径
 *  */
async function startWrite(files, readPath, writePath) {
  writePath = `${writePath}/index.txt`;
  let text = "",
    temp = "";
  files.forEach(async (file, index) => {
    let readFilePath = `${readPath}/${file}`;
    
    text = await readFile(readFilePath);
    writeText = await readFile(writePath);
    console.log(writeText, 'writeText');
    
    text = text.replaceAll(`<span class='textCont'
    contenteditable="true "></span>`, "____");
    temp = `${writeText}${os.EOL}${text}`;
    writeFile(writePath, temp);
  });
}
function createDir(path) {
  return fs.mkdirSync(path);
}

function createFile(path) {
  const mkdirRes = fs.mkdirSync(path);
  if (mkdirRes) {
    console.log(mkdirRes);
    return false;
  }
  console.log(`${path}   创建成功`);
  return true;
}

function readDir(readPath) {
  return new Promise((reslove, reject) => {
    fs.readdir(readPath, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      reslove(files);
    });
  });
}
/**
 * 删除文件
 * ${path} 目录的路径
 * ${files} 删除的文件 数组
 *  */
function removeFile(path, files) {
  files.forEach((file) => {
    let newPath = `${path}/${file}`;
    // 获取文件信息
    let stat = fs.statSync(newPath);
    // 文件是否为文件夹
    if (stat.isDirectory()) {
      removeDir(newPath);
    } else {
      const res = fs.unlinkSync(newPath);
      if (res) {
        console.log("删除文件失败", res);
      }
      console.log("删除文件成功");
    }
  });
}

/**
 * 删除文件夹
 * ${path} 目录的路径
 *  */
function removeDir(path) {
  return new Promise(async (reslove, reject) => {
    try {
      // 获取当前目录下是否有子文件
      const files = await readDir(path);
      // 判断目录是否为空
      if (files.length) {
        removeFile(path, files);
      }
      // 删除文件夹
      fs.rmdir(path, (err) => {
        if (err) {
          reject(err);
        }
        reslove("删除成功");
      });
    } catch (error) {
      reject(error);
    }
  });
}
async function start(readPath, writePath) {
  if (fs.existsSync(writePath)) {
    const removeRes = await removeDir(writePath);
    if (removeRes) {
      console.log(removeRes);
    }
  }
  // 创建目录
  const createRes = createDir(writePath);

  if (!fs.existsSync()) {
    fs.writeFileSync(`${writePath}/index.txt`, "");
  }
  const files = await readDir(readPath);
  startWrite(files, `${readPath}`, writePath);
}
start(readPath, writePath);
