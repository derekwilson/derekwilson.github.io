function ArrayStorageContainer(key,notAvailableItem,mapperCallback) {
    var self = this;
    self.storageKey = key;
    self.persistentArray = ko.observableArray();      // observable

    self.getArrayFromStorage = function() {
        try {
            self.persistentArray.removeAll();
            var array = ko.utils.parseJson(self.getUserData());
            if (array != null) {
                var mappedArray = ko.utils.arrayMap(array, mapperCallback);
                for (var snippetIndex = 0; snippetIndex < mappedArray.length; snippetIndex++) {
                        self.persistentArray().push(mappedArray[snippetIndex]);
                }
            }
        }
        catch (e) {
            alert('Error loading array: ' + e.message);
            self.persistentArray = ko.observableArray();
        }
    };

    self.addItem = function(item) {
        self.persistentArray.push(item);
        self.storeUserData();
    };

    self.removeItem = function(item) {
        self.persistentArray.remove(item);
        self.storeUserData();
    };

    self.removeAll = function() {
        self.persistentArray.removeAll();
        self.storeUserData();
    };

    self.moveUp = function(item) {
        var index = ko.utils.arrayIndexOf(self.persistentArray(), item);
        //alert('position = ' + index);

        if (index == -1 || index == 0) //Isn't in array or is already first
            return;
        
        self.persistentArray.remove(item);
        self.persistentArray.splice(index - 1, 0, item);

        self.storeUserData();
    };

    self.moveDown = function(item) {
        var index = ko.utils.arrayIndexOf(self.persistentArray(), item);
        //alert('position = ' + index);

        if (index == -1 || index + 1 == self.persistentArray().length) //Isn't in array or is already last
            return;
            
        self.persistentArray.remove(item);
        self.persistentArray.splice(index + 1, 0, item);

        self.storeUserData();
    };

    self.findByValue = function(comparitoCallback) {
        var match = ko.utils.arrayFirst(self.persistentArray(), comparitoCallback);
        return match;
    };

    self.storeUserData = function () {
        if (!Modernizr.localstorage) {
             //alert('Local storage not available');
             return;
        }
        localStorage[self.storageKey] = ko.toJSON(self.persistentArray());
    };

    self.getUserData = function () {
        if (!Modernizr.localstorage) {
             return notAvailableItem;
        }
        return localStorage[self.storageKey];
    };
}

