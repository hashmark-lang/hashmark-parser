const N_CHILDREN = 10;
const MAX_DEPTH = 3;

const LINE_CONTENT =
	"#inline Lorem \\# ipsum #inline[dolor *sit* amet, consectetur] adipiscing elit. #inline[Integer convallis nec turpis] quis \\[ ullamcorper. _Integer_ ultricies velit accumsan volutpat viverra. Nulla et nibh \\# sed nisl interdum \\[ fringilla \\[ id in leo. #inline[Integer laoreet leo mi, _non_ accumsan] diam sodales eu. Praesent sagittis _efficitur_ turpis, non ullamcorper velit dictum ac. _In_ hac habitasse #inline[platea #inline[dictumst]. Donec molestie #inline[#inline[#inline[eros] a nisi] elementum]], eu eleifend velit #inline[blandit]. #inline[Maecenas] ac neque in sapien tempus \\\\ ullamcorper quis vel magna. Morbi sed justo quis orci mattis dapibus. #inline Nulla #inline[tristique] elit magna.\n";

export function generateBenchmarkInput(indent = "", depth = 0): string {
	if (depth > MAX_DEPTH) return "";
	return (indent + LINE_CONTENT + generateBenchmarkInput(indent + "\t", depth + 1)).repeat(
		N_CHILDREN
	);
}

// https://stackoverflow.com/a/18650828
export function formatBytes(bytes: number, decimals = 2): string {
	if (bytes === 0) return "0 Bytes";

	const k = 1000;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
