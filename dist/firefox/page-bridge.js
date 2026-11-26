"use strict";

(() => {
    if (window.__smartLinkGuardBridge) return;

    window.__smartLinkGuardBridge = true;

    const originalOpen = window.open;

    window.open = function (url, target, features) {
        if (!url || url === "about:blank") {
            return originalOpen.apply(this, arguments);
        }

        let parsed;

        try {
            parsed = new URL(url, location.href);
        } catch {
            return null;
        }

        if (!["http:", "https:"].includes(parsed.protocol)) {
            return originalOpen.apply(this, arguments);
        }

        window.postMessage({
            channel: "SMART_LINK_GUARD",
            action: "OPEN_REQUEST",
            url: parsed.href
        }, location.origin);

        return null;
    };
})();