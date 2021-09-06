var exec = require("child_process").exec;
import chalk from "chalk";
const figlet = require("figlet");

export function execute(command, callback) {
  exec(command, function (error, stdout, stderr) {
    callback(stdout);
  });
}

export function msn(msn) {
  console.log(
    chalk.bold.bgGray.red(
      figlet.textSync(`rng cli ${msn}`, {
        font: "JS Block Letters",
        horizontalLayout: "default",
        verticalLayout: "fitted",
      })
    )
  );
};
