import arg from "arg";
const spawn = require("child_process").spawn;
import inquirer from "inquirer";
import { createComponent, createPage, createSeed } from "./main.js";
const fs = require("fs");
import chalk from "chalk";
import { msn } from "./utils/utils.js";
var exec = require("child_process").exec;

function execute(command, callback) {
  exec(command, function (error, stdout, stderr) {
    callback(stdout);
  });
}

const helpers = [
  "(WIP) To register a seed from github, enter by console : rng --add urlgithub",
  "(WIP) To create a project seed, enter by console : rng-cli --n 'nameproyect' --type 'seed'",
  "(WIP) To register author, enter the console : rng-cli --author 'mross",
  "(OK) To create a page, enter the console : rng-cli --n 'pagename' --type 'indexPage'",
  "(OK) To create a component, enter the console : rng-cli --n 'componentname' --type 'button'",
  "(OK) To create a component with stories for storybook, enter the console : rng-cli --n 'componentname' --type 'button' --stories true",
];
function parseArgumentIntoOptions(rawArgs) {
  const args = arg(
    {
      "--n": String,
      "--stories": String,
      "--type": String,
      "--h": String,
      "--author": String,
      "--seed": String,
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    name: args["--n"],
    stories: args["--stories"] || "false",
    type: args["--type"] || "none",
    help: args["--h"] || "none",
    author: args["--author"] || "none",
    seed: args["--seed"] || "none",
  };
}
async function promptForMissingOptions(options) {
  const questions = [];
  if (!options.name) {
    questions.push({
      type: "input",
      name: "name",
      message: "Ingresa nombre para este componente",
    });
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    name: options.name || answers.name,
    stories: options.stories || "false",
    type: options.type || "none",
    help: options.help || "none",
    author: options.author || "none",
    seed: options.seed || "none",
  };
}
export async function cli(args) {
  if (args[2] === "--h") {
    msn('by mross');
    console.log("We leave you these tips!!");
    console.log(helpers);
    return;
  }
  if (args[2] === "--author") {
    execute("npm root -g", (resp) => {
      resp = resp.trim();
      const root_base = resp + "/react-generator-component/config/config.json";
      let rawdata = fs.readFileSync(root_base);
      let config = JSON.parse(rawdata);
      let options = parseArgumentIntoOptions(args);
      config.author = options.author;
      var json = JSON.stringify(config, null, 4);
      fs.writeFile(root_base, json, "utf8", (resp) =>
        console.log("The author of the files is " + config.author)
      );
    });
    return;
  }
  if (args[2] === "--seed") {
    execute("npm root -g", (resp) => {
      resp = resp.trim();
      const root_base = resp + "/react-generator-component/config/config.json";
      let rawdata = fs.readFileSync(root_base);
      let config = JSON.parse(rawdata);
      let options = parseArgumentIntoOptions(args);
      
      config.seed = options.seed;
      var json = JSON.stringify(config, null, 4);
      if(options.seed === "init"){
        fs.writeFile(root_base, json, "utf8", (resp) =>
        console.log(
          "The seed is " + config.seed + "(npx create-react-app my-react-app)"
        )
      );
      }else{
        fs.writeFile(root_base, json, "utf8", (resp) =>
        console.log(
          `The seed is ${config.seed} (git clone ${options.seed})`
        )
      );
      }
      
    });
    return;
  }
  let options = parseArgumentIntoOptions(args);
  options = await promptForMissingOptions(options);

  if (options.type === "page") {
    if (fs.existsSync("./" + options.name)) {
      console.log("Directory not enabled");
      return;
    } else {
      console.log("Directory enabled");
      await createPage(options);
    }
   
  } else if (options.type === "seed") {
    if (fs.existsSync("./" + options.name)) {
      console.log("Directory not enabled");
      return;
    } else {
      console.log("Directory enabled");
      await createSeed(options);
    }
    
  } else {
    if (fs.existsSync("./" + options.name)) {
      console.log("Directory not enabled");
      return;
    } else {
      console.log("Directory enabled");
      await createComponent(options);
    }
    
  }
}
