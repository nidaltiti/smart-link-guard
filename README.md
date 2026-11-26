# Smart Link Guard 🛡️

**Smart Link Guard** is a browser extension for Google Chrome and Mozilla Firefox designed to prevent unwanted new tabs from opening when destination websites are unavailable or return HTTP error responses.

The project uses shared source files for both browsers, with separate manifests.

## ✨ Features

- Intercepts JavaScript `window.open()` requests.
- Checks destination URLs before opening new tabs.
- Blocks HTTP 404 responses.
- Blocks HTTP 5xx server errors.
- Blocks connection failures.
- Blocks DNS failures when detected by the connection check.
- Blocks requests that exceed the configured timeout.
- Allows successful HTTP responses, including redirects.
- Enable or disable protection.
- Configure connection timeout.
- Supports Chrome and Firefox.

## 📁 Project Structure

```text
smart-link-guard/
│
├── shared/
│   ├── background.js
│   ├── content.js
│   ├── page-bridge.js
│   ├── popup.js
│   ├── popup.html
│   └── styles.css
│
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
│
├── chrome/
│   └── manifest.json
│
├── firefox/
│   └── manifest.json
│
├── build.ps1
│
└── dist/
    ├── chrome/
    └── firefox/
```

### Directory Description

| Directory / File | Description |
|---|---|
| `shared/` | Shared JavaScript, HTML and CSS files |
| `icons/` | Extension icons |
| `chrome/` | Chrome manifest |
| `firefox/` | Firefox manifest |
| `build.ps1` | Build script for both browsers |
| `dist/chrome/` | Chrome installation package |
| `dist/firefox/` | Firefox installation package |

## ⚙️ Requirements

- Windows
- PowerShell
- Google Chrome or Mozilla Firefox

## 🔨 Build the Extension

The project maintains one shared source code directory.

You only need to modify files inside `shared/`.

### Build Instructions

1. Open PowerShell.
2. Navigate to the project directory.
3. Run:

```powershell
.\build.ps1
```

The build script copies the shared files, browser manifest and icons into their respective output directories.

Expected output:

```text
dist/
│
├── chrome/
│   ├── manifest.json
│   ├── background.js
│   ├── content.js
│   ├── page-bridge.js
│   ├── popup.js
│   ├── popup.html
│   ├── styles.css
│   └── icons/
│
└── firefox/
    ├── manifest.json
    ├── background.js
    ├── content.js
    ├── page-bridge.js
    ├── popup.js
    ├── popup.html
    ├── styles.css
    └── icons/
```

## 🌐 Installation – Google Chrome

### Developer Mode Installation

1. Open Google Chrome.
2. Navigate to:

```text
chrome://extensions/
```

3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the following directory:

```text
smart-link-guard/dist/chrome/
```

6. Smart Link Guard should now appear in your extensions list.
7. Enable the extension.

### Reload After Changes

After modifying shared source files:

1. Run `build.ps1`.
2. Open `chrome://extensions/`.
3. Find Smart Link Guard.
4. Click **Reload**.
5. Refresh the website being tested.

## 🦊 Installation – Mozilla Firefox

### Temporary Add-on Installation

1. Open Mozilla Firefox.
2. Navigate to:

```text
about:debugging#/runtime/this-firefox
```

3. Select **This Firefox**.
4. Click **Load Temporary Add-on**.
5. Navigate to:

```text
smart-link-guard/dist/firefox/
```

6. Select:

```text
manifest.json
```

7. Smart Link Guard should appear in your Firefox extensions list.

**Important:** Temporary Firefox add-ons are removed when Firefox restarts. A permanently installed version requires the appropriate Mozilla signing and distribution process.

### Reload After Changes

1. Run `build.ps1`.
2. Open `about:debugging`.
3. Find Smart Link Guard.
4. Click **Reload**.

## 🛡️ Protection Rules

The extension uses the following intended rules:

| HTTP / Connection Result | Action |
|---|---|
| HTTP 200 | Allow |
| HTTP 301 / 302 | Allow |
| Other HTTP 3xx | Allow |
| HTTP 404 | Block |
| HTTP 5xx | Block |
| DNS failure | Block |
| Connection failure | Block |
| Timeout | Block |

## ⚙️ Settings

Click the Smart Link Guard toolbar icon to access the popup.

Available settings:

- **Enable Protection:** Turn protection on or off.
- **Connection Timeout:** Configure the timeout in seconds.
- **Save Settings:** Save your preferences.

Default timeout: **3 seconds**.

## 🔍 How It Works

The extension consists of three main components:

### 1. page-bridge.js

Intercepts JavaScript `window.open()` requests from webpages.

### 2. content.js

Receives intercepted requests and sends them to the background script.

### 3. background.js

Checks the destination URL and decides whether to allow or block the new tab.

The extension opens a new tab only when its connection check considers the destination acceptable.

## ⚠️ Known Limitations

- The current implementation primarily intercepts JavaScript `window.open()` calls.
- It does not intercept every possible browser tab-opening mechanism.
- Some websites use other methods to create new tabs.
- Cross-origin CORS restrictions can prevent the extension from reading HTTP status codes.
- A failed fetch does not always mean that the destination website is offline.
- Firefox and Chrome compatibility should be tested separately.

Therefore, blocking behavior may vary between websites.

## 🔐 Privacy

Smart Link Guard is designed to perform URL checks locally through the browser extension.

The current project does not require a user account or a remote database.

## 🚀 Development

To contribute or modify the extension:

1. Clone or download the project.
2. Edit files inside `shared/`.
3. Modify browser-specific settings inside `chrome/` or `firefox/` when necessary.
4. Run `build.ps1`.
5. Test the generated versions in both browsers.

## 📄 License

License information has not yet been specified.

---

**Smart Link Guard**  
Protect your browsing experience. 🛡️