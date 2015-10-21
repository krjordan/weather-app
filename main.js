$(document).ready(function (){
	$('.weather-container').hide();
	$('button').on('click', function(e) {
		e.preventDefault();
		var zipCode = $('#zip').val();
		getWeather(zipCode);
	});
});

var getWeather = function (zipCode){
	var sunny = 'http://icons.wunderground.com/data/wximagenew/l/llpj04/11984-awesome.jpg';
	var storm = 'http://icons.wunderground.com/data/wximagenew/s/smyezek/316-awesome.jpg';
	var rain = 'http://icons.wunderground.com/data/wximagenew/j/Jacmpr/3-awesome.jpg';
	var snow = 'http://icons.wunderground.com/data/wximagenew/k/katy99780/8593-awesome.jpg';
	var fog = 'http://icons.wunderground.com/data/wximagenew/r/RNJoel/1709-awesome.jpg';
	var cloudy = 'http://icons.wunderground.com/data/wximagenew/d/DCMaki/11558.jpg';
	var fallback = 'http://icons.wunderground.com/data/wximagenew/d/Drifter50/655-awesome.jpg';
	var weatherBackground;

	$.ajax({
		url: 'http://api.openweathermap.org/data/2.5/weather?zip=' +
					zipCode + ',us&units=imperial&appid=93a335f77dd18698fb551649da8f8238',
		dataType: 'json',
		success: function (data){
			var temp = data.main.temp;
			var newTemp = Math.round(temp * 10) / 10;
			var windSpeed = Math.floor(data.wind.speed);
			var weatherId = data.weather[0].id;

			if (windSpeed > 12) windSpeed = 12;

			if (weatherId >= 200 && weatherId <= 232){
				// Thunderstorms
				weatherBackground = storm;
			}
			else if (weatherId == 800){
				// Sunny
				weatherBackground = sunny;
			}
			else if (weatherId >= 300 && weatherId <= 531){
				// Rain
				weatherBackground = rain;
			}
			else if (weatherId >= 600 && weatherId <= 622){
				// Snow
				weatherBackground = snow;
			}
			else if (weatherId >= 700 && weatherId <= 741){
				// Fog
				weatherBackground = fog;
			}
			else if (weatherId >= 801 && weatherId <= 804){
				// Cloudy
				weatherBackground = cloudy;
			}
			else if (weatherId == 900 || weatherId == 901 || weatherId == 902 || weatherId == 906 ||
							 weatherId == 960 || weatherId == 960 || weatherId == 961 || weatherId == 962){
				weatherBackground = storm;
			}
			else {
				weatherBackground = fallback;
			}
			console.log(windSpeed);
			$('.weather-container').show();
			$('html').css('background-image', 'url(' + weatherBackground + ')');
			$('#icon').addClass('wi-owm-' + weatherId);
			$('#temp').html(newTemp);
			$('#city').html(data.name);
			$('#description').html(data.weather[0].description);
			$('#wind').addClass('wi-wind-beaufort-' + windSpeed);
			$('#humidity').html(data.main.humidity);
		},
		error: function (xhr, status, error){
			$('.weather-container').show();
			$('#icon').text('Currently, this only support US zip codes. I plan to expand on this project soon.');
		}
	});
};