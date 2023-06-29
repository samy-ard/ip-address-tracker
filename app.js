(function($){
	var ipTracker = function(ip) {
		if(map != undefined || map != null){
    	map.remove();
   		$(".map-wrapper").append("<div id='map' class='map'></div>");
   	}

   	console.log(ip);

		$.ajax({
			url: "https://geo.ipify.org/api/v2/country,city,vpn",
			type: "GET",
			data: {
				apiKey: "at_4bo36ABn0j2jhH7A6WnM2tSvxigH9",
				ipAddress: ip
			},
			dataType: "JSON",
			success: function (res) {
				const ipaddress = res.ip;
				const location = res.location.city + ", " + res.location.region + " " +res.location.country;
				const timezone = res.location.timezone;
				const provider = res.isp;

				$('#ipaddress').text(ipaddress);
				$('#location').text(location);
				$('#timezone').text(timezone);
				$('#provider').text(provider);

				// load moap
				const map = L.map('map').setView([res.location.lat, res.location.lng], 18);
				L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
				  maxZoom: 27,
				  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
				}).addTo(map);
				const marker = L.marker([res.location.lat, res.location.lng], { icon: L.icon({ iconUrl: './images/icon-location.svg' })}).addTo(map);
			},
			error: function(res) {
				var map = L.map('map').setView([res.location.lat, res.location.lng], 18);
				L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			    maxZoom: 27,
			    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
				}).addTo(map);
				var marker = L.marker([res.location.lat, res.location.lng], { icon: L.icon({ iconUrl: './images/icon-location.svg' })}).addTo(map);

			}
		});
	};

	$(document).ready(function() {
		ipTracker();

		$('.form').on('submit', function(e) {
			e.preventDefault();
			ipTracker($('#search').val());
			console.log($('#search').val());
		});
	});
	
})(jQuery);