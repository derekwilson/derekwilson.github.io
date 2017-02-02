function HelpViewModel() {

    var self = this;

    self.environment = new Environment();
    self.codeVersion = self.environment.appVersion;
    self.generationResult = ko.observable("Result Unknown");

    self.generateExample = function () {
        try {
            console.log("Generating Example Data...");
            var file1 = new TextFileIO("tbn","example-category.txt");
            file1.write('[{"CategoryId":1,"Display":"Category One"},{"CategoryId":2,"Display":"Category Two"}]');
            var file2 = new TextFileIO("tbn","example-snippets.txt");
            file2.write('[{"CategoryId":1,"Display":"Hi my name is {NAME}."},{"CategoryId":2,"Display":"I called on {DATE} at {TIME}"}]');

            var file3 = new TextFileIO("tbn","example-category.txt");
            file3.read(function (data) { console.log('Data read: ' + data); })

            self.generationResult("Files generated to tbn/example-category.txt and tbn/example-snippets.txt");
        } catch (e) {
            self.generationResult("Error: " + e.message);
        }

        $.mobile.changePage('#confirmGenerate', 'pop', true, true);        
    };
}

