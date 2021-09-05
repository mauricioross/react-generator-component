import arg from "arg";
import inquirer from "inquirer";
import { createComponent, createPage } from "./main.js";
function parseArgumentIntoOptions(rawArgs) {
  const args = arg(
    {
      "--n": String,
      "--stories": String,
      "--type":String
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    name: args["--n"],
    stories: args["--stories"] || 'false',
    type:args["--type"]||'none'
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
    stories: options.stories || 'false',
    type:options.type || 'none'
  };
}
export async function cli(args) {
  console.log("args: ",args)
  let options = parseArgumentIntoOptions(args);
  console.log("options: ",options);
  options = await promptForMissingOptions(options);
  if(options.type === "page"){
    await createPage(options);
  }else{
    await createComponent(options);

  }
}
