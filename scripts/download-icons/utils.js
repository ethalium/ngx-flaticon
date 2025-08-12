const { existsSync, mkdirSync, rmSync, copyFileSync } = require('fs');
const { execSync } = require('child_process');

module.exports = {

  /**
   * Creates a directory at the specified path if it does not already exist.
   *
   * @param {string} path - The path where the directory will be created.
   * @returns {string}/**
   * Creates a directory at the specified path if The path of the created directory.
   */
  createDirectory: (path) => {
    if(!existsSync(path)){
      mkdirSync(path, {
        recursive: true
      });
    }
    return path;
  },

  /**
   * Deletes a directory and its contents.
   *
   * This method checks if the specified directory exists, and if it does,
   * removes the directory and all of its contents recursively.
   *
   * @param {string} path - The path to the directory to be deleted.
   */
  deleteDirectory: (path) => {
    if(existsSync(path)){
      rmSync(path, {
        recursive: true,
        force: true
      });
    }
  },

  /**
   * Executes the npx command with the specified package and arguments.
   *
   * @function
   * @param {string} pkg - The name of the package to be executed with npx.
   * @param {...string[]} args - Additional arguments to be passed to the command.
   * @returns {string[]} - The stdout content resulting from the execution of the npx command.
   * @throws {Error} - Throws an error if the npx command fails to execute.
   */
  npx: (pkg, ...args) => {
    return execSync(`npx --yes ${pkg} ${args.join(' ')}`, {}).toString('utf-8').trim().split('\n');
  },

};
