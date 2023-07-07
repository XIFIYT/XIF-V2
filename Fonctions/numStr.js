function numStr(num) {
	let nombre

	if (Math.abs(num) < 1000) {
		nombre = num;
	} else if (Math.abs(num) >= 1000 && Math.abs(num) <= 999999) {
		nombre = Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'K';
	} else if (Math.abs(num) >= 1000000 && Math.abs(num) <= 999999999) {
		nombre = Math.sign(num) * ((Math.abs(num) / 1000000).toFixed(1)) + 'M';
	} else if (Math.abs(num) >= 1000000000 && Math.abs(num) <= 999999999999) {
		nombre = Math.sign(num) * ((Math.abs(num) / 1000000000).toFixed(1)) + 'B';
	} else if (Math.abs(num) >= 1000000000000 && Math.abs(num) <= 999999999999999) {
		nombre = Math.sign(num) * ((Math.abs(num) / 1000000000000).toFixed(1)) + 'T';
	} else { nombre = Math.sign(num) * ((Math.abs(num) / 1000000000000000).toFixed(1)) + 'Q' }

	return nombre;
}
module.exports = { numStr }