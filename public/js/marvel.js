// ddb1730843a0168c7d771db9a99a1499

// 3d08dd81101ddeded33c328809f4d09f6392f601

$(function() {

  $('button').on('click', getCharacter);

});

// http://gateway.marvel.com/v1/comics?ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150

function getCharacter() {

	$.get('/marvel/character')
	.success(function(char){
		console.log(char);
		char.forEach(function(avenger, index) {
			var name = avenger.name;
			var image = avenger.image;
			var description = avenger.description;
			var moreinfo = avenger.moreinfo;
			var $name = $('<h2>').text(name);
			var $img = $('<img>').attr('src', image);
			var $descr = $('<p>').text(description);
			var $more = $('<a>').attr('href', moreinfo).text('See Comics');
			$('.chars').append($name).append($img).append($descr).append($more);
		});
		

		
		// console.log(comiclink);
		// console.log(data);
		// console.log(name);
	})
	.fail(function(err) {
		console.log("err:", err);
	});
}