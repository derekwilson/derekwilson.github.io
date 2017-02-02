function UserToken(name,value) {
    var self = this;
    self.name = ko.observable(name);
    self.value = ko.observable(value);
}

function UserTokenStorage(key) {
    var self = this;
    if (key == null) {
        self.storageKey = "AAD.tbn.userToken";
    }
    else {
        self.storageKey = key;
    }

    self.getStorageContainer = function() {
        var storage = new ArrayStorageContainer(self.storageKey,'[{"name":"Local storage not available"}]',self.mapData);
        storage.getArrayFromStorage();
        return storage;
    };

    // this is used to transalte the array object that is stored in local storage into an observable object
    self.mapData = function(item) {
        return new UserToken(item.name,item.value);
    };

    self.findToken = function(name) {
        return self.store.findByValue(function(item) {return item.name() == name});
    };

    // code
    self.store = self.getStorageContainer();
}
