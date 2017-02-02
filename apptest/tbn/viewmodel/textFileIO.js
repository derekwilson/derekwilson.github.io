function TextFileIO(filepath, filename) {
    var self = this;

    self.filepath = filepath;
    self.filename = filename;
    self.fileentry = null;
    self.dataCB = null;
    self.parseJSON = false;

    self.gotFS = function (fileSystem) {
        console.log("got fs");
        self.createDirectory(fileSystem, self.filepath, self.directoryCreated);
    }

    self.createDirectory = function (fileSystem, path, success){
        var dirs = path.split("/").reverse();
        var root = fileSystem.root;

        var createDir = function(dir){
            console.log("create dir " + dir);
            root.getDirectory(dir, {
                create : true,
                exclusive : false
            }, successCB, failCB);
        };

        var successCB = function(entry){
            console.log("dir created " + entry.fullPath);
            root = entry;
            if(dirs.length > 0){
                createDir(dirs.pop());
            }else{
                console.log("all dir created");
                success(entry);
            }
        };

        var failCB = function(){
            console.log("failed to create dir " + dir);
        };

        createDir(dirs.pop());
    };

    self.directoryCreated = function (entry) {
        console.log("Dir path - " + entry.fullPath);
        entry.getFile(self.filename, {create: true, exclusive: false}, self.gotFileEntry, self.fail);
    }

    self.gotFileEntry = function (fileEntry) {
        self.fileEntry = fileEntry;
    };

    self.write = function (text) {
        self.text = text;
        self.fileEntry.createWriter(self.gotFileWriter,self.fail);
    };

    self.gotFileWriter = function (writer) {
        writer.write(self.text);
    };

    self.read = function (dataCB) {
        self.dataCB = dataCB;
        self.parseJSON = false;
        self.fileEntry.file(self.gotFile,self.fail);
    };

    self.readJSON = function (dataCB) {
        self.dataCB = dataCB;
        self.parseJSON = true;
        self.fileEntry.file(self.gotFile,self.fail);
    };

    self.gotFile = function (file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            console.log("Read as text");
            console.log(evt.target.result);
            self.text = evt.target.result;
            if (!self.parseJSON) {
                self.dataCB(self.text);
            }
            else {
                var object = null;
                try {
                    object = eval('(' + self.text + ')');
                } catch (e) {
                    console.log('JSON parse error: ' + e.message);
                    object = null;
                }

                self.dataCB(object);
            }
        };
        reader.readAsText(file);
    };

    self.fail = function (error) {
        console.log("File " + self.filepath + "/" + self.filename + " Error " + error.code);
    };

    console.log("requesting file system...");
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, self.gotFS, self.fail);
}
