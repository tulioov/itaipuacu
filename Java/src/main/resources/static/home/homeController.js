var gaugeCxCasa;

$(function () {
	gaugeCxCasa = $("#gaugeCxCasa").dynameter({
		label: 'Cx Casa',
		value: 80,
		min: 0.0,
		max: 100,
		unit: '%',
		regions: {// Value-keys and color-refs
			0 : 'error',
			15 : 'warn',
			40 : 'normal'
		}
	});
	gaugeCxCasa.changeValue(30);

});


