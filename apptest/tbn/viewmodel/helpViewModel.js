function HelpViewModel() {

    var self = this;

    self.environment = new Environment();
    self.codeVersion = self.environment.appVersion;

    self.generateExample = function () {
        alert('Starting...');

        console.log("Generating Example Data...");
        var file1 = new TextFileIO("tbn","example-catagory.txt");
        file1.write('[{"CatagoryId":1,"Display":"Catagory One"},{"CatagoryId":2,"Display":"Catagory Two"}]');
        var file2 = new TextFileIO("tbn","example-snippets.txt");
        file2.write('[{"CatagoryId":1,"Display":"Hi my name is {NAME}."},{"CatagoryId":2,"Display":"I called on {DATE} at {TIME}"}]');

        var file3 = new TextFileIO("tbn","example-catagory.txt");
        file3.read(function (data) { console.log('Data read: ' + data); })

        alert('Done');
    };
}

