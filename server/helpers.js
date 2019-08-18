exports.detectMobile = function detectMobile(userAgent) {
	return /Mobi/i.test(userAgent) || /Android/i.test(userAgent);
};

// Helpers - I know is repeated - I did not setup lerna because this experiments is not big enough imo
exports.parseJSON = function parseJSON(data) {
	return JSON.parse(data);
};

exports.stringifyJSON = function stringifyJSON(data) {
	return JSON.stringify(data);
};

exports.readySocketData = function readySocketData(type, data) {
	const readyData = { type, data };

	const stringifiedData = JSON.stringify(readyData);
	return stringifiedData;
};
