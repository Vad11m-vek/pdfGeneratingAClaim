document.querySelector('#tel').addEventListener('change', e => {
	var numbers = tel.value.replace(/\D/g, ''),
		char = { 0: '( ', 3: ' ) ', 6: ' - ', 8: ' - ' };
	tel.value = '';
	for (var i = 0; i < 10; i++) {
		tel.value += (char[i] || '') + numbers[i];
	}
})
