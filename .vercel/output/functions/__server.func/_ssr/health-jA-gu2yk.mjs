//#region node_modules/.nitro/vite/services/ssr/assets/health-jA-gu2yk.js
async function probeHealth(run) {
	try {
		await run();
		return {
			ok: true,
			service: "linka"
		};
	} catch {
		return {
			ok: false,
			service: "linka"
		};
	}
}
async function probeSql(sql) {
	return probeHealth(() => sql.query("select 1"));
}
//#endregion
export { probeSql };
