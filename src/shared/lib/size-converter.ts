const SizeConvert = (size: number): string => {
	const X = (size: number, unit: number): string => {
		let a: string = (s / unit).toFixed(2);
		if (a[a.length - 1] === "0") {
			a = a.substr(0, a.length - 1);
		}
		if (a[a.length - 1] === "0") {
			a = a.substr(0, a.length - 1);
		}
		if (a[a.length - 1] === ".") {
			a = a.substr(0, a.length - 1);
		}
		return a;
	};
	const s = size;
	if (s === 0) {
		return "0 Б";
	}
	if (s < 1024) {
		return s + " Б";
	}
	if (s < 1048576) {
		return Math.round(s / 1024) + " КиБ";
	}
	if (s < 1073741824) {
		let a: string = X(s, 1048576);
		if (a === "1024") { return "1 ГиБ"; }
		return a + " МиБ";
	}
	if (s < 1099511627776) {
		let a: string = X(s, 1073741824);
		if (a === "1024") { return "1 ТиБ"; }
		return a + " ГиБ";
	}
	if (s < 1125899906842624) {
		let a: string = X(s, 1099511627776);
		if (a === "1024") { return "1 ПиБ"; }
		return a + " ТиБ";
	}
	if (s < 1152921504606846976) {
		let a: string = X(s, 1125899906842624);
		if (a === "1024") { return "1 ЭиБ"; }
		return a + " ПиБ";
	}
	{
		let a: string = X(s, 1125899906842624);
		return a + " ЭиБ";
	}
};

export { SizeConvert };