export function detectMobile() {
	return /Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent)
}