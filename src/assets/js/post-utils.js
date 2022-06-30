var fs = require('fs');
this.fs = fs;

function writeToNotes(jsonData) {
    fs.readFile('./src/notes.json', 'utf8', function readFileCallback(err, data) {
        if (err) {throw err;}
        console.log("Data served");
        var obj = JSON.parse(data);
        obj.table.push(jsonData);
        fs.writeFile('./src/notes.json', JSON.stringify(obj, null, 2), 'utf8', (err) => {if(err) {throw(err);}});
    });
}
this.writeToNotes = writeToNotes;

function updateValueInPost(id, key, value) {
    fs.readFile('./src/notes.json', 'utf8', function readFileCallback(err, data) {
        if (err) {throw err;}
        console.log("Data served");
        var obj = JSON.parse(data);
        Object.values(obj.table)[id][key] = value;
        fs.writeFile('./src/notes.json', JSON.stringify(obj, null, 2), 'utf8', (err) => {if(err) {throw(err);}});
    });
}
this.updateValueInPost = updateValueInPost;

function deletePost(id) {
    fs.readFile('./src/notes.json', 'utf8', function readFileCallback(err, data) {
        if (err) {throw err;}
        console.log("Data served");
        var objS = JSON.parse(data).table;
        objS.splice(id, id+1);
        var obj = JSON.parse(data);
        obj.table = objS;
        
        fs.writeFile('./src/notes.json', JSON.stringify(obj, null, 2), 'utf8', (err) => {if(err) {throw(err);}});
    });
}
this.deletePost = deletePost;