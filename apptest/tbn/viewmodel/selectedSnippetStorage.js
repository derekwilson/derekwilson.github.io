function SelectedSnippet(display) {
    var self = this;
    self.display = ko.observable(display);
}

function SelectedSnippetStorage(key) {
    var self = this;
    if (key == null) {
        self.storageKey = "AAD.tbn.selectedSnippet";
    }
    else {
        self.storageKey = key;
    }

    self.getStorageContainer = function() {
        var storage = new ArrayStorageContainer(self.storageKey,'[{"display":"Local storage not available"}]',self.mapData);
        storage.getArrayFromStorage();
        return storage;
    };

    // this is used to transalte the array object that is stored in local storage into an observable object
    self.mapData = function(item) {
        return new SelectedSnippet(item.display);
    }

    // code
    self.store = self.getStorageContainer();
}

