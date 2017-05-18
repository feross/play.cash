exports.isSafariHomeApp = window.navigator.standalone === true
exports.isChromeHomeApp = window.matchMedia('(display-mode: standalone)').matches
