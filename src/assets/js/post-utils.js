function writeToNotes(jsonData) {
    fs.readFile(dataPath+"/posts.fpf", 'utf8', function readFileCallback(err, data) {
        if (err) {throw err;}
        console.log("Data served");
        let obj = JSON.parse(data);
        obj.table.push(jsonData);
        fs.writeFile(dataPath+"/posts.fpf", JSON.stringify(obj, null, 2), 'utf8', (err) => {if(err) {throw(err);}});
    });
}
this.writeToNotes = writeToNotes;

function getValueInPost(id, key, callback) {
    fs.readFile(dataPath+"/posts.fpf", 'utf8', function readFileCallback(err, data) {
        if (err) {throw err;}
        console.log("Data served");
        var obj = JSON.parse(data);
        callback(Object.values(obj.table)[id][key]);
    });
}
this.updateValueInPost = updateValueInPost;

function updateValueInPost(id, key, value) {
    fs.readFile(dataPath+"/posts.fpf", 'utf8', function readFileCallback(err, data) {
        if (err) {throw err;}
        console.log("Data served");
        let obj = JSON.parse(data);
        Object.values(obj.table)[id][key] = value;
        fs.writeFile(dataPath+"/posts.fpf", JSON.stringify(obj, null, 2), 'utf8', (err) => {if(err) {throw(err);}});
    });
}
this.updateValueInPost = updateValueInPost;

function updateTodoValueInPost(pid, cid, key, value) {
    fs.readFile(dataPath+"/posts.fpf", 'utf8', function readFileCallback(err, data) {
        if (err) {throw err;}
        console.log("Data served");
        let obj = JSON.parse(data);
        console.log(Object.values(obj.table));
        console.log(Object.values(obj.table)[pid]);
        console.log(Object.values(Object.values(obj.table)[pid]));
        console.log(Object.values(Object.values(obj.table)[pid])[3]);
        console.log(Object.values(Object.values(obj.table)[pid])[3][cid]);
        console.log(Object.values(Object.values(obj.table)[pid])[3][cid][key]);

        Object.values(Object.values(obj.table)[pid])[3][cid][key] = value;
        fs.writeFile(dataPath+"/posts.fpf", JSON.stringify(obj, null, 2), 'utf8', (err) => {if(err) {throw(err);}});
    });
}
this.updateTodoValueInPost = updateTodoValueInPost;

function deletePost(id) {
    fs.readFile(dataPath+"/posts.fpf", 'utf8', function readFileCallback(err, data) {
        if (err) {throw err;}
        console.log("Data served");
        let objS = JSON.parse(data).table;
        objS.splice(id, 1);
        let obj = JSON.parse(data);
        obj.table = objS;
        
        fs.writeFile(dataPath+"/posts.fpf", JSON.stringify(obj, null, 2), 'utf8', (err) => {if(err) {throw(err);}});
    });
}
this.deletePost = deletePost;