import Geocoder from 'react-native-geocoding';

// Initialize the module (needs to be done only once)
Geocoder.init("AIzaSyDFZlvMAtiN5FKA1dhJ7K5xG7Yy9MhZOhA"); // use a valid API key
// With more options
// Geocoder.init("xxxxxxxxxxxxxxxxxxxxxxxxx", {language : "en"}); // set the language

Geocoder.from("Colosseum")
		.then(json => {
			var location = json.results[0].geometry.location;
			console.log(location);
		})
		.catch(error => console.warn(error));

Geocoder.from(41.89, 12.49)
		.then(json => {
        		var addressComponent = json.results[0].address_components[0];
			console.log(addressComponent);
		})
		.catch(error => console.warn(error));

// Works as well :
// ------------

// location object
Geocoder.from({
	latitude : 41.89,
	longitude : 12.49
});

// latlng object
Geocoder.from({
	lat : 41.89,
	lng : 12.49
});

// array
Geocoder.from([41.89, 12.49]);