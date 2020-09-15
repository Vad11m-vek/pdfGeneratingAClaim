document.querySelector('#tel').addEventListener('change', e => {
	var numbers = tel.value.replace(/\D/g, ''),
		char = { 2: ' ( ', 5: ' ) ', 8: ' - ', 10: ' - ' };
	tel.value = '';
	for (var i = 0; i < 12; i++) {
		tel.value += (char[i] || '') + numbers[i];
	}
})
