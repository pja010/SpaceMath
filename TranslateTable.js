/*
A cache for storing all the alternative names and their corresponding standard forms
cache = [[alt, standard][alt, standard]]

10.14.2022 Created
10.21.2022 Updated to cache
11.14.2022 Add feature to support inline preprocessing in M2L
 */

class TranslateTable {
    constructor() {
        this.cache = []; // a cache that contains alternative names and standard forms
        this.cacheSize = 500; // length of the cache
        this.nonCache = [];
        this.nonCacheSize = 500; // length of the cache
        this.multilineList = [];
    }

    getAllMultiLine() {
        if (this.multilineList.length == 0){
            for (let key of Object.keys(dictionary)) { // iterate through dictionary
                if (dictionary[key]["type"] == "multiline"){
                    this.multilineList.push(key);
                }
            }
        }
        return this.multilineList;
    }

    getItem(item) {
        if (item == " " || item == ""){
            return -1;
        }
        for (let i = this.cache.length-1; i >= 0; i--) { // search through the cache
            if (this.cache[i][0] === item) {
                return this.cache[i][1]; // return the standard form if found
            }
        }

        if (this.nonCache.includes(item)){
            return -1;
        }

        // if the item is not in cache already
        for (let key of Object.keys(dictionary)) { // iterate through dictionary
            let altNames = dictionary[key]["alternative"];
            if (!altNames){
                continue;
            }
            for (let name of altNames){
                if (name == item) {
                    this.cache.push([item, key]); // if alternative name found, add [alternative, standard] to cache
                    if (this.cache.length > this.cacheSize) {
                        this.cache.shift(); // if the cache exceeds cacheSize, dequeue
                    }
                    return key; // return the standard form
                }
            }
        }

        // if item cannot be found anywhere
        this.nonCache.push(item); // if alternative name found, add [alternative, standard] to cache
        if (this.nonCache.length > this.nonCacheSize) {
            this.nonCache.shift(); // if the cache exceeds cacheSize, dequeue
        }
        return -1;
    }

    getLength() {
        return this.cache.length;
    }

    getSize() {
        return this.cacheSize;
    }
}
