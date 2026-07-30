import { XMLBuilder, XMLParser } from "fast-xml-parser";
import fs from "node:fs";

const DEFAULT_LANG = "en";
const LANG_DIR = "./langs";
const EOL = "\n";

// Keep stdout compact. Some CI workflows pass step output into later action inputs,
// and very large translation-key lists can make Node fail with "argument list too long".
const DEFAULT_LOG_LIMIT = 25;
const parsedLogLimit = Number.parseInt(
	process.env.SYNC_TRANSLATIONS_LOG_LIMIT ?? `${DEFAULT_LOG_LIMIT}`,
	10,
);
const LOG_LIMIT = Number.isFinite(parsedLogLimit) && parsedLogLimit >= 0
	? parsedLogLimit
	: DEFAULT_LOG_LIMIT;

const REPORT_PATH = process.env.SYNC_TRANSLATIONS_REPORT_PATH
	?? "translation-sync-summary.md";
const WRITE_FULL_REPORT = process.env.SYNC_TRANSLATIONS_FULL_REPORT === "1";

const parser = new XMLParser({
	ignoreAttributes: false,
	preserveOrder: true,
});

const builder = new XMLBuilder({
	ignoreAttributes: false,
	format: true,
	indentBy: "\t",
	preserveOrder: true,
});

function readXml(lang) {
	return fs.readFileSync(`${LANG_DIR}/Cafe_${lang}.xml`).toString();
}

function writeXml(lang, xml) {
	fs.writeFileSync(`${LANG_DIR}/Cafe_${lang}.xml`, xml.concat(EOL), "utf-8");
}

function collapseEmptyTags(contents) {
	return contents.replace(/<(\b\w+\b)( [^>]+)><\/\1>/g, "<$1$2 />");
}

function getLang(file) {
	return file.match(/^Cafe_([a-zA-Z_]+)\.xml$/)?.[1];
}

function cloneNode(node) {
	return JSON.parse(JSON.stringify(node));
}

function getNodeKey(node) {
	return Object.keys(node).find((key) => key !== ":@");
}

function syncNode(src, dest, stats) {
	src.forEach((srcNode, index) => {
		const srcId = srcNode[":@"]?.["@_id"];

		if (srcId) {
			// translation node, check if id exists in destination
			const destNode = dest.find((n) => n[":@"]?.["@_id"] === srcId);
			if (!destNode) {
				// if missing insert it at the right position
				dest.splice(index, 0, cloneNode(srcNode));
				stats.missing.push(srcId);
			}
			return;
		}

		// structural node, check if section exists in destination
		const key = getNodeKey(srcNode);
		if (!key) {
			return;
		}

		const destIndex = dest.findIndex((n) => n[key] !== undefined);
		if (destIndex === -1) {
			dest.splice(index, 0, cloneNode(srcNode));
			stats.missingSections.push(key);
			return;
		}

		syncNode(srcNode[key], dest[destIndex][key], stats);
	});
}

function logStats(lang, stats) {
	if (stats.missing.length === 0 && stats.missingSections.length === 0) {
		console.log(`✓  Cafe_${lang}.xml — up to date`);
		return;
	}

	const sectionText = stats.missingSections.length > 0
		? `, ${stats.missingSections.length} missing section(s)`
		: "";

	console.log(
		`✎  Cafe_${lang}.xml — added ${stats.missing.length} missing key(s)${sectionText}`,
	);

	const shownKeys = stats.missing.slice(0, LOG_LIMIT);
	shownKeys.forEach((key) => console.log(`   + ${key}`));

	const hiddenCount = stats.missing.length - shownKeys.length;
	if (hiddenCount > 0) {
		console.log(`   … ${hiddenCount} more key(s) omitted from CI log`);
	}

	stats.missingSections
		.slice(0, LOG_LIMIT)
		.forEach((section) => console.log(`   + section <${section}>`));
}

function formatReport(results) {
	const lines = [
		"# Translation sync summary",
		"",
		`Default language: ${DEFAULT_LANG}`,
		"",
	];

	results.forEach(({ lang, stats }) => {
		lines.push(`## Cafe_${lang}.xml`);
		lines.push("");
		lines.push(`- Missing keys added: ${stats.missing.length}`);
		lines.push(`- Missing sections added: ${stats.missingSections.length}`);

		if (WRITE_FULL_REPORT && stats.missing.length > 0) {
			lines.push("");
			lines.push("### Keys added");
			stats.missing.forEach((key) => lines.push(`- \`${key}\``));
		}

		if (WRITE_FULL_REPORT && stats.missingSections.length > 0) {
			lines.push("");
			lines.push("### Sections added");
			stats.missingSections.forEach((section) => lines.push(`- \`${section}\``));
		}

		lines.push("");
	});

	return lines.join(EOL).concat(EOL);
}

function writeReports(results) {
	const report = formatReport(results);
	fs.writeFileSync(REPORT_PATH, report, "utf-8");

	if (process.env.GITHUB_STEP_SUMMARY) {
		fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, report, "utf-8");
	}
}

function syncLang(lang, src) {
	const xml = readXml(lang);
	const dest = parser.parse(xml);
	const stats = { missing: [], missingSections: [] };

	syncNode(src[1].cafe, dest[1].cafe, stats);
	logStats(lang, stats);

	const updatedXml = builder.build(dest);
	writeXml(lang, collapseEmptyTags(updatedXml));

	return stats;
}

(function syncAll() {
	const xml = readXml(DEFAULT_LANG);
	const src = parser.parse(xml);
	const files = fs.readdirSync(LANG_DIR);
	const results = [];

	console.log(`Default language: ${DEFAULT_LANG}`);

	files.forEach((file) => {
		const lang = getLang(file);

		if (!lang) {
			console.log(`⚠  ${file} — skipping (lang not found)`);
			return;
		}

		if (lang !== DEFAULT_LANG) {
			const stats = syncLang(lang, src);
			results.push({ lang, stats });
		}
	});

	writeReports(results);
	console.log(`Summary written to ${REPORT_PATH}`);
})();
