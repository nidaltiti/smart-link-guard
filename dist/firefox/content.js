"use strict";

(() => {
    if (window.__smartLinkGuardLoaded) return;

    window.__smartLinkGuardLoaded = true;

    window.addEventListener("message", event => {

        if (event.source !== window) return;
        if (event.origin !== location.origin) return;

        const data = event.data;

        if (
            !data ||
            data.channel !== "SMART_LINK_GUARD" ||
            data.action !== "OPEN_REQUEST"
        ) {
            return;
        }

        let url;

        try {
            url = new URL(data.url);

            if (!["http:", "https:"].includes(url.protocol)) {
                return;
            }
        } catch {
            return;
        }

        chrome.runtime.sendMessage({
            action: "CHECK_AND_OPEN",
            url: url.href,
            active: true
        }).catch(error => {
            console.error(
                "[Smart Link Guard]",
                error
            );
        });

    });
})();