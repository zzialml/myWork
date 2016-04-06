cordova.define('cordova/plugin_list', function (require, exports, module) {
    module.exports = [

        {
            "file": "js/plugins/JpushPlugin.js",
            "id": "org.apache.cordova.intent",
            "merges": [
            "navigator.intent"
        ]
    }, {
            "file": "js/plugins/PayPluginJava.js",
            "id": "org.apache.cordova.pay",
            "merges": [
            "navigator.pay"
        ]
    }, {
            "file": "js/plugins/AddImageJava.js",
            "id": "org.apache.cordova.image",
            "merges": [
            "navigator.image"
        ]
    },
        {
            "file": "js/plugins/SuggestionJava.js",
            "id": "org.apache.cordova.suggestion",
            "merges": [
            "navigator.suggestion"
        ]
    },
        {
            "file": "js/plugins/PrintPlugin.js",
            "id": "org.apache.cordova.print",
            "merges": [
            "navigator.print"
        ]
    },

];
    module.exports.metadata =
        // TOP OF METADATA
        {
            "org.apache.cordova.camera": "0.2.7",
            "org.apache.cordova.dialogs": "0.2.6",
            "org.apache.cordova.vibration": "0.3.7",
            "org.apache.cordova.intent": "0.0.1",
            "org.apache.cordova.print": "0.0.2",

        }
        // BOTTOM OF METADATA
});