import { parse } from "papaparse";
import { Transformer } from "@parcel/plugin";

function transformation(source: string) {
	const { data } = parse(source, {
		dynamicTyping: true,
		header: true,
		skipEmptyLines: true,
	});
	return "module.exports = " + JSON.stringify(data);
}

export default new Transformer({
	async transform({ asset }) {
		asset.setCode(transformation(await asset.getCode()));
		asset.type = "js";
		return [asset];
	},
});
