var parameters = {
	target: '#myGraph',
	data: [{
		fn: '',
		color: 'blue'
	}
	],
	grid: true,
	yAxis: { domain: [-20, 20] },
	xAxis: { domain: [-20, 20] }
};

window.onload = start;
function start() {
	var a = 1, b = 3, c = -10;
	var f = a + "*x^2+" + b + "*x+" + c;
	parameters.data[0].fn = f;
	functionPlot(parameters);
	delta = (b ** 2) - 4 * a * c;
	console.log(delta);
	var d = document.getElementById("myFunction");
	d.innerHTML = "f=" + f + "<br/>delta= " + delta + "<br/>";
	switch (delta) {
		case 0:
			var r0 = -b / (2 * a);
			console.log(r0);
			d.innerHTML += "r0= " + r0;
			break;
		default:
			if (delta > 0) {
				var r1 = (-b - Math.sqrt(delta)) / (2 * a);
				var r2 = (-b + Math.sqrt(delta)) / (2 * a);
				console.log(r1, r2);
				d.innerHTML += "r1= " + r1 + "; r2= " + r2;
			} else {
				console.log("delta < 0: racine non réelles");
				d.innerHTML += "racines non réelles";
			}
			break;
	}
}
