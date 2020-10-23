/* Magic Mirror
 *
 * MIT Licensed.
 *
 * Redesigned by Răzvan Cristea
 * for iPad 3 & HD display
 * https://github.com/hangorazvan
 */
Module.register("simpletext",{

	defaults: {
		text: "", 	// text with or without HTML tag
		cssClass: "",	// css style for text or HTML tag
	},

	getScripts: function() {
	    return false;
	},
	
	getStyles: function() {
	    return ["font-awesome.css"];
	},

	start: function() {
		Log.info("Starting module: " + this.name); 
	},

	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.className = this.config.cssClass;
		wrapper.innerHTML = this.config.text;
		return wrapper;
	},

	getHeader: function () {
		return this.data.header;
	},
});
