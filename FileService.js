import * as uuid from "uuid";
import * as path from "path";
import fs from "fs";

class FileService {
  saveFiles(file) {
    try {
      const fileName = uuid.v4() + file.name;
      const staticDir = path.resolve("static");
      if (!fs.existsSync(staticDir)) {
        fs.mkdirSync(staticDir);
      }
      const filePath = path.resolve("static", fileName);
      file.mv(filePath);
      return fileName;
    } catch (e) {
      console.log(e);
    }
  }
}

export default new FileService();
