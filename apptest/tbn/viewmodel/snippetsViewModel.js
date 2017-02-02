function SnippetsViewModel() {

    var self = this;

    self.environment = new Environment();
    self.codeVersion = self.environment.appVersion;

    // this needs to be observable or the status bar will not update
    self.dataLoaded = ko.observable(false);

    self.catagoryDataSource = new JsonDataSource('data/catagory-json.txt');
    self.snippetDataSource = new JsonDataSource('data/snippets-json.txt');
    self.catagoryFile = null;
    self.snippetsFile = null;
    self.failedLocalStorage = false;

    self.selectedSnippets = new SelectedSnippetStorage();

    self.catagories = ko.observableArray();

    self.selectedSnippet = ko.observable(new SelectedSnippet('not set'));
    self.selectedSnippetText = ko.computed(function() {
        if (self.selectedSnippet == null) {
            return "not set";
        }
        return self.selectedSnippet().display();
    }, this);
    self.status = ko.computed(function() {
        if (!self.dataLoaded()) {
            return "loading...";
        }

        var snippetCount = 0;
        for (var catagoryIndex = 0; catagoryIndex < self.catagories().length; catagoryIndex++) {
            snippetCount = snippetCount + self.catagories()[catagoryIndex].snippets().length;
        }
        return self.catagories().length + " catagories " + snippetCount + " snippets loaded";
    }, this);

    self.loadCatagories = function (catagories, fromCache, reloadFromServer) {
        if (catagories == null) {
            if (self.failedLocalStorage) {
                return 0;
            }
            if (self.environment.shouldUsePhoneGap()) {
                // we failed to load from local storage - get from our own assets
                console.log('loadCatagories failed reverting to builtin assets');
                self.failedLocalStorage = true;
                self.catagoryDataSource.getData(false, self.loadCatagories);
            }
        }

        for (var i = 0; i < catagories.length; i++) {
            self.catagories.push(new Catagory(catagories[i].CatagoryId,catagories[i].Display));
        }
        if (!self.failedLocalStorage && self.environment.isPhoneGap()) {
            self.snippetsFile.readJSON(self.loadSnippets);
        }
        else {
            self.snippetDataSource.getData(reloadFromServer, self.loadSnippets);
        }
        return i;
    };

    self.loadSnippets = function (snippets, fromCache, reloadFromServer) {
        if (snippets == null) {
            if (self.failedLocalStorage) {
                return 0;
            }
            if (self.environment.shouldUsePhoneGap()) {
                // we failed to load from local storage - get from our own assets
                console.log('loadSnippets failed reverting to builtin assets');
                self.failedLocalStorage = true;
                self.catagoryDataSource.getData(false, self.loadCatagories);
            }
        }


        var lodadedCount = 0;
        for (var i = 0; i < snippets.length; i++) {
            var snippet = new Snippet(snippets[i].CatagoryId,snippets[i].Display);
            for (var catagoryIndex = 0; catagoryIndex < self.catagories().length; catagoryIndex++) {
                if (self.catagories()[catagoryIndex].id == snippet.catagoryId) {
                    self.catagories()[catagoryIndex].snippets.push(snippet);
                    lodadedCount = lodadedCount + 1;
                }
            }
        }
        self.dataLoaded(true);
        self.snippetsUpdated();
        return lodadedCount;
    };

    self.snippetsUpdated = function () {
        // need to refresh the UI after the data has been bound
        var list = $('.catagorylist');
        self.refreshListview(list)

        // for some reason text binding to the bubble counter does not work
        var catagoryBubbles = $('.catagorybubble');
        catagoryBubbles.each(function (index) {
            var snippetCount = self.catagories()[index].numberOfSnippets();
            $(this).text(snippetCount);
        })
    };

    self.refreshListview = function(listview) {
        if (listview) {
            try {
                $(listview).listview('refresh');
            } catch (e) {
                try { $(listview).listview(); } catch (e) { };
            }
        }
        if ($.mobile.activePage) {
            $.mobile.activePage.trigger('pagecreate');
        }
    }

    self.setSelected = function (snippet, event) {
        self.selectedSnippet(new SelectedSnippet(snippet.display()));
        $.mobile.changePage('#confirmAdd', 'pop', true, true);        
    };

    self.addSelected = function (snippet, event) {
        self.selectedSnippets.store.addItem(self.selectedSnippet());
        console.log("snippet added");
    };

    self.onDeviceReady = function () {
        // Now safe to use the PhoneGap API
        console.log("Device Ready...");
        self.catagoryFile = new TextFileIO("tbn","catagory.txt");
        self.snippetsFile = new TextFileIO("tbn","snippets.txt");
        self.catagoryFile.readJSON(self.loadCatagories);
    };

    // code
    $( '#home' ).live( 'pageinit',function(event){
        // need to do this here as we do not store the snippets in persistant storage
        // only do it on the page init as the page show event fires when backing out of the list view
        if (!self.environment.isPhoneGap()) {
            self.catagoryDataSource.getData(false, self.loadCatagories);
        }
    });

    if (self.environment.shouldUsePhoneGap()) {
        document.addEventListener("deviceready", self.onDeviceReady, false);
    }

    // screwy javascript from
    // http://stackoverflow.com/questions/6522106/jquery-mobile-nested-list-back-button-gone
    $(':jqmData(url^="home")').live('pagebeforecreate', 
        function(event) {
        $(this).filter(':jqmData(url*=ui-page)').find(':jqmData(role=header)')
            .prepend('<a href="#" data-rel="back" data-icon="back">Back</a><a href="message.html" rel="external" data-icon="gear">Message</a>')
    });
}

