const isVerbose = true;

function verbose(...args) {
    if (!isVerbose) {return}
    console.log(...args)
}
this.log = {verbose};

module.exports = {verbose};