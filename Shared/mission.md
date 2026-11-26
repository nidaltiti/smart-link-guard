# Smart Link Guard

## 1. Mission

Build a browser extension for Google Chrome and Mozilla Firefox that prevents opening new tabs when a destination URL is unreachable.

## 2. Supported Browsers

- Google Chrome (Manifest V3)
- Mozilla Firefox (WebExtensions API)

## 3. Main Objective

Before opening a link in a new tab, check whether its destination is reachable.

Expected behavior:

1. User clicks a link.
2. Extension captures the link.
3. Extension checks the destination URL.
4. If reachable, open the URL in a new tab.
5. If unreachable, do not open a new tab.
6. Keep the current page unchanged.

## 4. Features

### URL Checking
- HTTP and HTTPS support.
- Configurable timeout.
- Default timeout: 3 seconds.
- Handle DNS errors.
- Handle connection errors.
- Handle timeout errors.
- Handle HTTP error responses.

### Tab Management
- Prevent unnecessary new tabs.
- Preserve the current tab.
- Support Ctrl + Click.
- Support middle mouse button.
- Support target="_blank".

### Settings
- Enable/disable extension.
- Configure connection timeout.
- Configure behavior for unreachable websites.
- Optional notification when a website cannot be reached.

## 5. Technical Requirements

- JavaScript
- HTML
- CSS
- WebExtensions API
- Manifest V3
- Background service worker where supported.
- Content scripts.
- Browser storage API.

## 6. Important Limitations

- CORS restrictions can prevent reliable URL checks.
- Some websites block HEAD requests.
- HTTP 403 and 404 responses do not necessarily mean the website is unreachable.
- Network connectivity and website availability must be distinguished.
- Avoid treating every HTTP error as a connection failure.
- Do not expose private browsing data.

## 7. Project Structure

```text
smart-link-guard/
│
├── mission.md
├── manifest.json
├── background.js
├── content.js
├── popup.html
├── popup.js
├── styles.css
│
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
│
├── chrome/
│
└── firefox/
```

## 8. Development Stages

### Stage 1
Create mission.md and define requirements.

### Stage 2
Build the shared JavaScript extension logic.

### Stage 3
Implement Chrome support.

### Stage 4
Implement Firefox compatibility.

### Stage 5
Test URL checking and tab behavior.

### Stage 6
Test DNS failures, timeouts, redirects and HTTP errors.

### Stage 7
Prepare installation packages.

## 9. Final Goal

One extension project supporting Chrome and Firefox.

The primary requirement is:

**If a URL is unreachable, do not open a new tab.**