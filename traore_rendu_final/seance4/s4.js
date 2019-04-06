function envoyerRequete() {
	var queryURL = "https://gist.githubusercontent.com/heiswayi/7fde241975ed8a80535a/raw/ff1caaeaf62bd6740ab7cafcd61f1215de173379/datatables-data.json";

	fetch(queryURL)
		.then(function (response) {
			// response.json() returns a json string,
			// returning it will convert it 
			// to a pure JavaScript 
			// object for the next then's callback
			return response.json();
		})
		.then(function (data) {
			// data is a JavaScript object here
			data = data["data"];
			//console.log(data);
			displayDataAsATable(data);
		})
		.catch(function (error) {
			console.log('Error during fetch: ' + error.message);
		});
}

function displayDataAsATable(data) {
	// data is a JavaScript object

	// empty the div that contains the results
	var dataDiv = document.querySelector("#d");
	dataDiv.innerHTML = "";

	// creates and populate the table with data
	var table = document.createElement("table");

	// iterate on the array of data
	data.forEach(function (currentArray) {
		// creates a row
		var row = table.insertRow();
		// insert cells in the row
		currentArray.forEach(function (currentStr) {
			var cel = row.insertCell();
			cel.innerHTML = currentStr;
		});
	});

	// adds the table to the div
	dataDiv.appendChild(table);
}

window.onload = start;
function start() {
	//creer un ecouteur d'evenement 'click' pour le bouton
	document.querySelector("#bq").addEventListener('click', envoyerRequete);
}
