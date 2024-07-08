import fs from "fs"; // inbuilt

const createFile = () => {
  
  try {
    if (!fs.existsSync("files")) {
      fs.mkdirSync("files");
    }
    
    const date = new Date().toString();
    const textDate = date.toString();
    const txt = textDate.split(":").join("-");
    
    fs.writeFileSync(`./files/${txt}.txt`, `TimeStamp: ${Date.now()}`);
  } catch (e) {
    console.log(`Error writing file: ${e.message}`);
  }
};

// readdir - for rading the files in a folder
const readFolder = (folderName) => {
  try {
    const files = fs.readdirSync(folderName);
    return files;
  } catch (e) {
    console.log(`Error writing file: ${e.message}`);
  }
};

export { createFile, readFolder };