const glob = require('glob');

module.exports = async (text) => {
    const pluginResults = {};
    const regex = /\{\{(\w+(?: .+?)?)?\}\}/g;
    let result;

    // Collect which plugins to execute.
    while (result = regex.exec(text)) {
        pluginResults[result[1]] = true;
    }

    // Execute the plugins asynchronously.
    await Promise.all(Object.keys(pluginResults).map(async (command) => {
        const [, plugin, params] = /(\w+)(?: (.+))?/g.exec(command);
        pluginResults[command] = await require(`./${plugin}`)(params, text);
    }));

    // Replace the text with the results.
    return text.replace(regex, (match, command) => pluginResults[command]);
};
