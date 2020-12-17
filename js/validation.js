document.querySelector('#tel').addEventListener('change', e => {
	var numbers = tel.value.replace(/\D/g, ''),
		char = { 2: ' ( ', 5: ' ) ', 8: ' - ', 10: ' - ' };
	tel.value = '';
	for (var i = 0; i < 12; i++) {
		tel.value += (char[i] || '') + numbers[i];
	}
})
document.addEventListener('click', event => {
	if (event.target == emailUser) {
		function validateEmail(email) {
			const re = /^[A-Z0-9._%+-]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/;
			return re.test(String(email).toLowerCase());
		}
		let email = document.querySelector('emailUser');

		// console.log(validateEmail(email));

	}

})