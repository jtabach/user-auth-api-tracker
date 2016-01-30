// ddb1730843a0168c7d771db9a99a1499

// 3d08dd81101ddeded33c328809f4d09f6392f601

$(function() {

  $('button').on('click', getCharacter);

});

// http://gateway.marvel.com/v1/comics?ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150

function getCharacter() {

	$.get('/marvel/character')
	.success(function(char){
		var data = char.data.results["0"];
		var comiclink = data.urls[2].url;
		var thumbnail = data.thumbnail.path+".jpg";
		$('img').attr('src', thumbnail);
		$('.descr').text(data.description);
		$('.comic').attr('href', comiclink).text('See Comics');
		console.log(comiclink);
		console.log(data);
	})
	.fail(function(err) {
		console.log("err:", err);
	});
}