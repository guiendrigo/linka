import { i as resolveSmartLink, n as redirectTarget } from "./resolve-BPVOCpaa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bio-BWcG2gJ3.js
var BIO_CODE_RE = /^[a-z0-9]{8}$/;
var BIO_ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789";
function bioCode() {
	const bytes = crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(8));
	let code = "";
	for (const byte of bytes) code += BIO_ALPHABET[byte % 31];
	return code;
}
function cleanBioIdentity(input) {
	const title = (input.title ?? "").trim().replace(/\s+/g, " ");
	if (title.length < 2 || title.length > 80) throw new Error("O título da página precisa ter entre 2 e 80 caracteres.");
	const description = (input.description ?? "").trim().replace(/\s+/g, " ");
	if (description.length > 280) throw new Error("A descrição cabe em 280 caracteres.");
	return {
		title,
		description
	};
}
function inspectPhoto(bytes) {
	if (bytes.byteLength > 1e6) throw new Error("A foto precisa ter no máximo 1 MB.");
	if (bytes.byteLength < 12) throw new Error("Esse arquivo de imagem não parece válido.");
	if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) return "image/jpeg";
	if (bytes[0] === 137 && bytes[1] === 80 && bytes[2] === 78 && bytes[3] === 71 && bytes[4] === 13 && bytes[5] === 10 && bytes[6] === 26 && bytes[7] === 10) return "image/png";
	if (bytes[0] === 82 && bytes[1] === 73 && bytes[2] === 70 && bytes[3] === 70 && bytes[8] === 87 && bytes[9] === 69 && bytes[10] === 66 && bytes[11] === 80) return "image/webp";
	throw new Error("Envie uma foto em JPEG, PNG ou WebP.");
}
function parsePhotoBase64(input) {
	const trimmed = input.trim();
	if (!trimmed) throw new Error("Envie uma foto em JPEG, PNG ou WebP.");
	const comma = trimmed.indexOf(",");
	const compact = (trimmed.startsWith("data:") && comma !== -1 ? trimmed.slice(comma + 1) : trimmed).replace(/\s/g, "");
	if (!/^[A-Za-z0-9+/]+=*$/.test(compact) || compact.length > Math.ceil(14e5) + 8) throw new Error("A foto precisa ter no máximo 1 MB.");
	const bytes = decodeBase64(compact);
	return {
		mime: inspectPhoto(bytes),
		bytes
	};
}
function bioListItems(products) {
	const items = [];
	for (const product of products) {
		if (!product.bioVisible) continue;
		const resolution = resolveSmartLink({
			code: product.code,
			title: product.title,
			detail: "",
			priceCents: product.priceCents,
			commissionPct: 0,
			offers: product.offers
		});
		if (!redirectTarget(resolution)) continue;
		items.push({
			code: product.code,
			title: product.title,
			priceCents: product.priceCents
		});
	}
	return items;
}
function decodeBase64(raw) {
	if (typeof Buffer !== "undefined") return new Uint8Array(Buffer.from(raw, "base64"));
	const binary = atob(raw);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
	return bytes;
}
//#endregion
export { parsePhotoBase64 as a, cleanBioIdentity as i, bioCode as n, bioListItems as r, BIO_CODE_RE as t };
