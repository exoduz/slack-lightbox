function display() {
	this.init();
}

display.prototype = {
	init: function() {
		this.user_id = "7436400@N07" //my user id
		this.album_id = "72157628491249937"; //album id
		this.api_key = "9d520a46c1a6edd7a8a769fda4288041";

		window.output = this.output;

		this.callApi();
	},
	callApi: function() {
		//var src = "https://api.flickr.com/services/feeds/photoset.gne?nsid=" + this.user_id + "&set=" + this.album_id + "&format=json&jsoncallback=output";
		var src = "https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=" + this.api_key + "&user_id=" + this.user_id + "&format=json&per_page=20&extras=description,url_sq,url_m&jsoncallback=output";
		var script = document.createElement("script");
		script.src = src;
		document.body.appendChild(script);
	},
	output: function(data) {
		if (data) {
			var html = "<div class='flickr-images text-center gallery'>";

			for (var i = 0; i < data.photos.photo.length; ++i) {
				var photo = data.photos.photo[i];
				
				if (i == 0) { html += "<div class='row'>" } //opening row tags
				if (i % 4 == 0 && i != 0 && i != data.photos.photo.length - 1) { html += "</div><div class='row'>" } //closing row tags

				html += "<div class='col-md-3'>";
				html += "<section class='item'>";
				html += "<a href='#photo" + i +  "'><img src='" + photo.url_sq + "' alt='" + photo.title + "' class='img-circle' data-src= /></a>";
				html += "</section>";
				html += "<div class='lightbox' id='photo" + i + "'><div class='box'><a href='#' class='close'>X</a>";
				html += "<p class='title'>" + photo.title + "</p>";
				html += "<div class='content'>";
        		html += "<img src='" + photo.url_m + "'>";
        		(photo.description.content ? html += "<p class='desc'>" + photo.description.content + "</p>" : ""); //output description if available
        		html += "</div>";
    			(i != 0 ? html += "<a class='prev' href='#photo" + (i - 1) + "'>Previous</a>" : ""); //first item ie no previous value
    			(i != data.photos.photo.length - 1 ? html += "<a class='next' href='#photo" + (i + 1) + "'>Next</a>" : ""); //last item ie no next value
    			html += "<div class='clear'></div></div></div>";
				html += "</div>";
			}
			
			html += "</div></div>";
			
			document.querySelector("#flickr").innerHTML = html;
		} else {
			alert("Seems like there was an error retrieving the photos.")
		}
	}
};

document.addEventListener("DOMContentLoaded", function() {
	//pictures
	var output_to_screen = new display();
});
