const isVerbose = true; // Using this each module importing it globally will be verbose or not verbose

/**
 * Alternative to console.log since one of the people who reviewed the code complained about console.log being left everywhere.
 */
function verbose(...args) {
    if (!isVerbose) {return}
    console.log(...args)
}
this.log = {verbose};

module.exports = {verbose};