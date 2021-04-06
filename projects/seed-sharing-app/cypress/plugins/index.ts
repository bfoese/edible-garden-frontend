const cypressTypeScriptPreprocessor = require("./cy-ts-preprocessor");
import * as cyMxReport from '@bfoese/cypress-mx-report/dist/plugin';

// This code is part of the plugin file and thus executes in the Node
// environment. You cannot call Cypress or cy commands in this file, but you do
// have the direct access to the file system and the rest of the operating
// system.
module.exports = (on: any, config: unknown) => {
  const modifiedConfig = cyMxReport.CypressMxReportPlugin.register(config);
  on("file:preprocessor", cypressTypeScriptPreprocessor);

  on('task', {
    log (message: any) {
      console.log(message);
      return null;
    }
  });
  return modifiedConfig;
};
