import chalk from "chalk";
import fs from "fs";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";
const figlet = require("figlet");
const access = promisify(fs.access);
const copy = promisify(ncp);

// Mostrar un banner con un mensaje formado por caracteres.
const msn = (msn) => {
  console.log(
    chalk.bold.bgGray.red(
      figlet.textSync(msn, {
        font: "ANSI Shadow",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );
};

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  });
}
async function renameFiles(dir, name) {
  fs.rename(dir + "/template.js", dir + "/" + name + ".js", (err) => {});
  fs.rename(
    dir + "/Template.stories.js",
    dir + "/" + name + ".stories.js",
    (err) => {}
  );
  fs.rename(dir + "/template.scss", dir + "/" + name + ".scss", (err) => {});
  fs.rename(
    dir + "/template.test.js",
    dir + "/" + name + ".test.js",
    (err) => {}
  );
}
export async function createComponent(options) {
  msn(options.name);
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  };

  let currentFileUrl = import.meta.url;
  // currentFileUrl = currentFileUrl.replace("file:///", "");
  // console.log('currentFileUrl',currentFileUrl)

  let templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    "../../templates/component"
  );

  templateDir = templateDir.replace("%20", " ");
  options.templateDirectory = templateDir;
  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (error) {
    onsole.log(`${chalk.red.vold("Error")} Nombre de template Invalido`);
    process.exit(1);
  }
  options.targetDirectory = options.targetDirectory + `/${options.name}`;
  await fs.mkdir(options.targetDirectory, { recursive: true }, (err) => {
    if (err) throw err;
  });
  await copyTemplateFiles(options);
  await renameFiles(options.targetDirectory, options.name);
  const listFiles = [
    `${options.targetDirectory}/${options.name}.js`,
    `${options.targetDirectory}/${options.name}.stories.js`,
    `${options.targetDirectory}/${options.name}.scss`,
    `${options.targetDirectory}/${options.name}.test.js`,
  ];
  console.log(options.stories)
  if (options.stories === 'false') {
    console.log("Eliminando : ",listFiles[1]);
    const path = listFiles[1];

    fs.unlink(path, (err) => {
      if (err) {
        console.error(err);
        return;
      }

      //file removed
    });
    //console.log(listFiles[1]);
  }
  listFiles.forEach(async (file) => {
     if(options.stories === 'false' && file === listFiles[1]) return; 
    
    await fs.readFile(file, "utf8", async function (err, data) {
      if (err) {
        return console.log(`${chalk.red(err)}`);
      }
      var result = data.replace(/Template/g, options.name);
      fs.writeFile(file, result, "utf8", function (err) {
        if (err) return console.log(`${chalk.red.vold(err)}`);
      });
    });
  });
  console.log(`Se creo ${chalk.green.bold(options.name)} de forma correcta `);
  // console.log("%s Template Ready", chalk.green.bold());
  return true;
}
