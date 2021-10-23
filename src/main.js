import chalk from "chalk";
import fs from "fs";
import ncp from "ncp";
import { type } from "os";
import path from "path";
import { promisify } from "util";
import { execute } from "./utils/utils";
const figlet = require("figlet");
const access = promisify(fs.access);
const copy = promisify(ncp);
// const { exec, spawn } = require("child_process");
var Spinner = require("cli-spinner").Spinner;
const spawn = require("cross-spawn");
// const cliSpinners = require("cli-spinners");
// const logUpdate = require("log-update");
// var Spinner = require("cli-spinner").Spinner;
// var depSpin = new Spinner("Installing dependencies.. %s");
// Mostrar un banner con un mensaje formado por caracteres.
const msn = (msn) => {
  console.log(
    chalk.bold.bgGray.red(
      figlet.textSync(`rng cli : ${msn}`, {
        font: "JS Block Letters",
        horizontalLayout: "default",
        verticalLayout: "fitted",
      })
    )
  );
};
async function getAuthor(callback) {
  return await execute("npm root -g", (resp) => {
    resp = resp.trim();
    const root_base = resp + "/react-generator-component/config/config.json";
    let rawdata = fs.readFileSync(root_base);
    let config = JSON.parse(rawdata);
    callback(config.author);
  });
}
async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  });
}
async function copyTemplatePagesFiles(options) {
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
async function renamePagesFiles(dir, name) {
  fs.rename(dir + "/template.js", dir + "/" + name + ".js", (err) => {});
  fs.rename(dir + "/Template.scss", dir + "/" + name + ".scss", (err) => {});
  fs.rename(
    dir + "/TemplateAction.js",
    dir + "/" + name + "Action.js",
    (err) => {}
  );
  fs.rename(
    dir + "/TemplatePage.js",
    dir + "/" + name + "Page.js",
    (err) => {}
  );
  fs.rename(
    dir + "/TemplateReducer.js",
    dir + "/" + name + "Reducer.js",
    (err) => {}
  );
  fs.rename(
    dir + "/TemplateService.js",
    dir + "/" + name + "Service.js",
    (err) => {}
  );
}
async function copyTemplateSeed(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  });
}
async function renameTemplateSeed(dir, name) {}

export async function createComponent(options) {
  const getDirectories = (source) =>
    fs
      .readdirSync(source, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

  msn(options.name);
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  };

  let currentFileUrl = import.meta.url;
  let templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    "../../templates/component"
  );

  templateDir = templateDir.replace("%20", " ");
  options.templateDirectory = templateDir;
  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (error) {
    console.log(`${chalk.red.vold("Error")} Nombre de template Invalido`);
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
  console.log(`${chalk.green.bold("(*)")} with .stories `);
  if (options.stories === "false") {
    console.log("Deleted : ", listFiles[1]);
    const path = listFiles[1];

    fs.unlink(path, (err) => {
      if (err) {
        console.error(err);
        return;
      }

      //file removed
    });
  }
  listFiles.forEach(async (file) => {
    if (options.stories === "false" && file === listFiles[1]) return;

    await fs.readFile(file, "utf8", async function (err, data) {
      if (err) {
        return console.log(`${chalk.red(err)}`);
      }
      const nameCapitalize =
        options.name.substr(0, 1).toUpperCase() +
        options.name.substr(1, options.name.length);
      var result = data
        .replace(/TEMPLATE/g, options.name.toUpperCase())
        .replace(/Template/g, nameCapitalize)
        .replace(/template/g, options.name.toLowerCase());
      // var result = data.replace(/Template/g, options.name);
      fs.writeFile(file, result, "utf8", function (err) {
        if (err) return console.log(`${chalk.red.vold(err)}`);
      });
    });
  });
  console.log(
    `${chalk.green.bold(options.name)} Component was created correctly`
  );
  return;
}

export async function createPage(options) {
  console.log("create page");

  msn(options.name);
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  };
  let currentFileUrl = import.meta.url;
  let templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    "../../templates/page"
  );
  templateDir = templateDir.replace("%20", " ");
  options.templateDirectory = templateDir;
  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (error) {
    console.log(`${chalk.red.vold("Error")} Template name invalid`);
    process.exit(1);
  }
  options.targetDirectory = options.targetDirectory + `/${options.name}`;
  await fs.mkdir(options.targetDirectory, { recursive: true }, (err) => {
    if (err) throw err;
  });
  await copyTemplatePagesFiles(options);
  await renamePagesFiles(options.targetDirectory, options.name);
  const listFiles = [
    `${options.targetDirectory}/index.js`,
    `${options.targetDirectory}/${options.name}.scss`,
    `${options.targetDirectory}/${options.name}Action.js`,
    `${options.targetDirectory}/${options.name}Page.js`,
    `${options.targetDirectory}/${options.name}Reducer.js`,
    `${options.targetDirectory}/${options.name}Service.js`,
  ];

  function validatePackage(pkg, callback) {
    const x = spawn("npm", ["list", pkg, "--json=true"]);
    var exist = false;
    x.stdout.on("data", async (resp) => {
      const json = JSON.parse(resp);
      if (json.dependencies === undefined) {
        console.log("Not install ", pkg);
        exist = false;
        return;
      }
      exist = true;
      // console.log(`stdout: ${resp}`);
      return;
    });

    x.stderr.on("data", (data) => {
      // console.error(`stderr: ${data}`);
    });

    x.on("close", (code) => {
      return callback(exist);
    });
  }
  const removeLines = (data, lines = []) => {
    return data
      .split("\n")
      .filter((val, idx) => lines.indexOf(idx) === -1)
      .join("\n");
  };
  listFiles.forEach(async (file) => {
    //if (options.stories === "false" && file === listFiles[1]) return;
    console.log(file);
    await fs.readFile(file, "utf8", async function (err, data) {
      var dataInFile = data;
      const nameCapitalize =
        options.name.substr(0, 1).toUpperCase() +
        options.name.substr(1, options.name.length);
      if (err) {
        return console.log(`${chalk.red(err)}`);
      }
      if (file.includes("index")) {
        await getAuthor(async (resp) => {
          var data = dataInFile.replace(/AUTHOR/g, resp);
          await fs.writeFile(file, data, "utf8", function (err) {
            if (err) return console.log(`${chalk.red.vold(err)}`);
          });
          return;
        });
        return;
      }
      if (file.substr(file.length - 4, 4) === "scss") {
        var result = data.replace(/template/g, options.name.toLowerCase());
        fs.writeFile(file, result, "utf8", function (err) {
          if (err) return console.log(`${chalk.red.vold(err)}`);
        });
        return;
      }
      if (file.includes("Action")) {
        var data = data
          .replace(/TEMPLATE/g, options.name.toUpperCase())
          .replace(/Template/g, nameCapitalize)
          .replace(/template/g, options.name.toLowerCase());
        await fs.writeFile(file, data, "utf8", function (err) {
          if (err) return console.log(`${chalk.red.vold(err)}`);
        });
        return;
      }
      if (file.includes("Service")) {
        var data = data
          .replace(/TEMPLATE/g, options.name.toUpperCase())
          .replace(/Template/g, nameCapitalize)
          .replace(/template/g, options.name.toLowerCase());
        await fs.writeFile(file, data, "utf8", function (err) {
          if (err) return console.log(`${chalk.red.vold(err)}`);
        });
        return;
      }
      if (file.includes("Page")) {
        var data = data
          .replace(/TEMPLATE/g, options.name.toUpperCase())
          .replace(/Template/g, nameCapitalize)
          .replace(/template/g, options.name.toLowerCase());
        await fs.writeFile(file, data, "utf8", function (err) {
          if (err) return console.log(`${chalk.red.vold(err)}`);
        });
        return;
      }
      if (file.includes("Reducer")) {
        var data = data
          .replace(/TEMPLATE/g, options.name.toUpperCase())
          .replace(/Template/g, nameCapitalize)
          .replace(/template/g, options.name.toLowerCase());
        await fs.writeFile(file, data, "utf8", function (err) {
          if (err) return console.log(`${chalk.red.vold(err)}`);
        });
        return;
      }

      var result = data.replace(/Template/g, options.name);
      fs.writeFile(file, result, "utf8", function (err) {
        if (err) return console.log(`${chalk.red.vold(err)}`);
      });
    });
  });
  console.log(`${chalk.green.bold(options.name)} page was created correctly`);
  return;
}

export async function createSeed(options) {
  console.log("Command out of service ");
  return;
  //validate if folder exist
  console.log(options.targetDirectory);
  var spinner = new Spinner("%s We are creating the project from the seed.");
  spinner.setSpinnerString("|/-\\");
  spinner.start();
  execute("npm root -g", (resp) => {
    resp = resp.trim();
    const root_base = resp + "/react-generator-component/config/config.json";
    let rawdata = fs.readFileSync(root_base);
    let config = JSON.parse(rawdata);
    console.log("path to dir : ", process.cwd() + "/" + options.name);
    if (config.seed === "init") {
      execute(`npx create-react-app ${options.name}`, (resp) => {
        spinner.stop();
        console.log("\nReact App created! ");
      });
    } else {
      console.log("\ngit clone " + config.seed);
      var NodeGit = require("nodegit");
      var cloneURL = config.seed;
      var cloneOptions = {};
      var localPath = process.cwd() + "/" + options.name;

      cloneOptions.fetchOpts = {
        callbacks: {
          certificateCheck: function () {
            return 0;
          },
          credentials: function (url, userName) {
            console.log("url : ", url);
            console.log("userName : ", userName);
            return NodeGit.Cred.sshKeyFromAgent(userName);
          },
        },
      };
      var cloneRepository = NodeGit.Clone(
        cloneURL,
        process.cwd() + "/" + options.name,
        cloneOptions
      );
    }
  });
  // temp-name
  // console.log(options);
  // msn(options.name);
  // options = {
  //   ...options,
  //   targetDirectory: options.targetDirectory || process.cwd(),
  // };
  // let currentFileUrl = import.meta.url;
  // let templateDir = path.resolve(
  //   new URL(currentFileUrl).pathname,
  //   "../../templates/seed"
  // );
  // templateDir = templateDir.replace("%20", " ");
  // options.templateDirectory = templateDir;
  // try {
  //   await access(templateDir, fs.constants.R_OK);
  // } catch (error) {
  //   console.log(' Nombre de template Invalido');
  //   process.exit(1);
  // }
  // options.targetDirectory = options.targetDirectory + `/${options.name}`;
  // console.log(options.targetDirectory);
  // await fs.mkdir(options.targetDirectory, { recursive: true }, (err) => {
  //   if (err) throw err;
  // });
  // await copyTemplateSeed(options);
  // console.log("INSTALANDO DEPENDENCIAS");
  // // spawn(`cd ${options.targetDirectory} && npm i`);
  // var npm = spawn("npm", ["install"], { cwd: options.targetDirectory });
  // npm.stdout.on("close", function () {
  //   console.log("NODE_MODULES: OK");
  // });

  // await renamePagesFiles(options.targetDirectory, options.name);
  // const listFiles = [
  //   `${options.targetDirectory}/index.js`,
  //   `${options.targetDirectory}/${options.name}.scss`,
  //   `${options.targetDirectory}/${options.name}Action.js`,
  //   `${options.targetDirectory}/${options.name}Page.js`,
  //   `${options.targetDirectory}/${options.name}Reducer.js`,
  //   `${options.targetDirectory}/${options.name}Service.js`,
  // ];

  // listFiles.forEach(async (file) => {
  //   //if (options.stories === "false" && file === listFiles[1]) return;

  //   await fs.readFile(file, "utf8", async function (err, data) {
  //     const nameCapitalize = options.name.substr(0,1).toUpperCase() + options.name.substr(1, options.name.length);
  //     if (err) {
  //       return console.log(`${chalk.red(err)}`);
  //     }

  //     if (file.substr(file.length - 4, 4) === "scss") {
  //       var result = data.replace(/template/g, options.name.toLowerCase());
  //       fs.writeFile(file, result, "utf8", function (err) {
  //         if (err) return console.log(`${chalk.red.vold(err)}`);
  //       });
  //       return;
  //     }
  //     if (file.includes("Action")){
  //       var data = data.replace(/TEMPLATE/g, options.name.toUpperCase()).replace(/Template/g, nameCapitalize).replace(/template/g, options.name.toLowerCase();
  //       await fs.writeFile(file, data, "utf8", function (err) {
  //         if (err) return console.log(`${chalk.red.vold(err)}`);
  //       });
  //       return;
  //     }
  //     if(file.includes("Service")){
  //       var data = data.replace(/TEMPLATE/g, options.name.toUpperCase()).replace(/Template/g, nameCapitalize).replace(/template/g, options.name.toLowerCase();
  //       await fs.writeFile(file, data, "utf8", function (err) {
  //         if (err) return console.log(`${chalk.red.vold(err)}`);
  //       });
  //       return;
  //     }
  //     if(file.includes("Page")){
  //       console.log("PAGE")
  //       var data = data.replace(/TEMPLATE/g, options.name.toUpperCase()).replace(/Template/g, nameCapitalize).replace(/template/g, options.name.toLowerCase());
  //       await fs.writeFile(file, data, "utf8", function (err) {
  //         if (err) return console.log(`${chalk.red.vold(err)}`);
  //       });
  //       return;
  //     }
  //     if(file.includes("Reducer")){
  //       var data = data.replace(/TEMPLATE/g, options.name.toUpperCase()).replace(/Template/g, nameCapitalize).replace(/template/g, options.name.toLowerCase());
  //       await fs.writeFile(file, data, "utf8", function (err) {
  //         if (err) return console.log(`${chalk.red.vold(err)}`);
  //       });
  //       return;
  //     }
  //     var result = data.replace(/Template/g, options.name);
  //     fs.writeFile(file, result, "utf8", function (err) {
  //       if (err) return console.log(`${chalk.red.vold(err)}`);
  //     });
  //   });
  // });
}
