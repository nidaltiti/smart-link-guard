"use strict";

const DEFAULT_SETTINGS = {
    enabled: true,
    timeout: 3
};

async function getSettings() {
    const saved = await chrome.storage.local.get(DEFAULT_SETTINGS);

    return {
        enabled: saved.enabled !== false,
        timeout: Math.max(1, Number(saved.timeout) || 3)
    };
}

async function checkURL(url, timeoutSeconds) {
    const controller = new AbortController();

    const timer = setTimeout(() => {
        controller.abort();
    }, timeoutSeconds * 1000);

    try {
        const response = await fetch(url, {
            method: "GET",
            redirect: "follow",
            signal: controller.signal,
            cache: "no-store"
        });

        const status = response.status;

        if (status === 404 || (status >= 500 && status <= 599)) {
            return {
                reachable: false,
                reason: `HTTP_${status}`
            };
        }

        return {
            reachable: true,
            status
        };

    } catch (error) {
        return {
            reachable: false,
            reason: error.name === "AbortError"
                ? "TIMEOUT"
                : "CONNECTION_FAILED"
        };

    } finally {
        clearTimeout(timer);
    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.action !== "CHECK_AND_OPEN") {
        return;
    }

    (async () => {
        try {
            const settings = await getSettings();

            if (!settings.enabled) {
                await chrome.tabs.create({
                    url: message.url,
                    active: message.active !== false
                });

                sendResponse({ success: true, reason: "DISABLED" });
                return;
            }

            const result = await checkURL(
                message.url,
                settings.timeout
            );

            if (!result.reachable) {
                console.log(
                    "[Smart Link Guard] Blocked:",
                    message.url,
                    result.reason
                );

                sendResponse({
                    success: false,
                    reason: result.reason
                });

                return;
            }

            await chrome.tabs.create({
                url: message.url,
                active: message.active !== false
            });

            sendResponse({
                success: true,
                status: result.status
            });

        } catch (error) {
            console.error("[Smart Link Guard]", error);

            sendResponse({
                success: false,
                reason: "CHECK_ERROR"
            });
        }
    })();

    return true;
});