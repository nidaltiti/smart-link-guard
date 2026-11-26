"use strict";

document.addEventListener("DOMContentLoaded", async () => {

    const enabledInput = document.getElementById("enabled");
    const timeoutInput = document.getElementById("timeout");
    const saveButton = document.getElementById("saveSettings");
    const message = document.getElementById("message");
    const statusText = document.getElementById("statusText");
    const statusIndicator = document.getElementById("statusIndicator");

    const defaults = {
        enabled: true,
        timeout: 3
    };

    async function loadSettings() {
        const settings = await chrome.storage.local.get(defaults);

        enabledInput.checked = settings.enabled !== false;
        timeoutInput.value = settings.timeout || 3;

        updateStatus();
    }

    function updateStatus() {
        const enabled = enabledInput.checked;

        statusText.textContent = enabled ? "Protection enabled" : "Protection disabled";

        statusIndicator.classList.toggle("active", enabled);
        statusIndicator.classList.toggle("inactive", !enabled);
    }

    enabledInput.addEventListener("change", updateStatus);

    saveButton.addEventListener("click", async () => {

        const timeout = Number(timeoutInput.value);

        if (!Number.isInteger(timeout) || timeout < 1 || timeout > 30) {
            message.textContent = "Timeout must be between 1 and 30 seconds.";
            return;
        }

        await chrome.storage.local.set({
            enabled: enabledInput.checked,
            timeout
        });

        message.textContent = "Settings saved successfully.";

        updateStatus();

        setTimeout(() => {
            message.textContent = "";
        }, 2500);
    });

    await loadSettings();
});