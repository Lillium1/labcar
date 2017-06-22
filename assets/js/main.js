var menu = document.getElementById("btn-menu");

menu.addEventListener("click",function(){
	var nav = document.getElementById("bs-example-navbar-collapse-1");
	nav.classList.toggle("nav-menu");
})


function initMap(){
   	var map = new google.maps.Map(document.getElementById("mapa"),{
		zoom: 5,
		center: {lat: -33.43778, lng: -70.65028},
		mapTypeControl: false,
		zoomControl: true,
		streetViewControl: true,
	});

	function buscar(){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
		}
	}

	window.addEventListener("load", buscar)
	var latitud, longitud;

	var funcionExito = function(posicion){
		latitud = posicion.coords.latitude;
		longitud = posicion.coords.longitude;

		var miUbicacion = new google.maps.Marker({
			position: {lat:latitud, lng:longitud},
			animation: google.maps.Animation.DROP,
			map: map,
		});

		map.setZoom(17);
		map.setCenter({lat:latitud, lng:longitud});

	}

	var funcionError = function(error){
		alert("Tenemos un problema con encontrar tu ubicación.");
	}

	//Autocompletar//
	var inputInicio = (document.getElementById("inicio"));
	var autocompletar = new google.maps.places.Autocomplete(inputInicio);
        autocompletar.bindTo("bounds", map);

    var inputLlegada = (document.getElementById("destino"));
	var autocompletar = new google.maps.places.Autocomplete(inputLlegada);
        autocompletar.bindTo("bounds", map);

	var directService = new google.maps.DirectionsService;
    var directDisplay = new google.maps.DirectionsRenderer;
    	
	document.getElementById("inicio").addEventListener("change", cambios);
	document.getElementById("destino").addEventListener("change", cambios);


	function trazarRuta(directService, directDisplay) {
        directService.route({
        	origin: document.getElementById("inicio").value,
	        destination: document.getElementById("destino").value,
	        travelMode: "DRIVING"
	        }, 
	    function(response, status) {
	     	if (status === "OK") {
	        	directDisplay.setDirections(response);
	      	} else {
	            window.alert("No se encontró la ruta :( " + status);
	        }
	    });
	}	
	directDisplay.setMap(map);
	
	var cambios = function(){
		trazarRuta(directService, directDisplay);
	};  

	document.getElementById("ruta").addEventListener("click", cambios); 
}