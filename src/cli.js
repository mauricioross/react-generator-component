import arg from "arg";
import inquirer from "inquirer";
import {createComponent} from './main.js';
function parseArgumentIntoOptions(rawArgs) {
  const args = arg(
    {
      "--n": String,
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
      name:args['--n'] 
  };
}
async function promptForMissingOptions(options){
    
    const questions = [];
    if(!options.name){
        questions.push({
            type:'input',
            name:'name',
            message:'Ingresa nombre para este componente',

        })
    }

    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        name:options.name || answers.name
    }
}
export async function cli(args) {
    let options = parseArgumentIntoOptions(args);
    options = await promptForMissingOptions(options);
    await createComponent(options);
}
