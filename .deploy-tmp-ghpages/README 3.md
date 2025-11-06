# ZION TestNet 2.8.5 - WebsiteV2# 🌟 ZION TestNet 2.8.5 - Official Website



Modern, professional website for the ZION public testnet.Modern, clean website for ZION TestNet public blockchain.



## 🌐 Live Site## 📁 Structure



**Production:** https://testnet.zionterranova.com  ```

**GitHub Pages:** Deployed from `gh-pages` branchwebsiteV2/

├── index.html              # Main landing page

## 📁 Structure├── css/

│   └── main.css           # Modern stylesheet

```├── js/

websiteV2/│   ├── main.js            # Core functionality

├── index.html          # Homepage with live stats│   └── stats.js           # Live network statistics

├── 404.html           # Custom 404 page├── assets/

├── robots.txt         # SEO crawler instructions│   ├── images/            # Images and graphics

├── sitemap.xml        # SEO sitemap│   └── icons/             # Icon assets

├── css/├── docs/                  # Documentation pages

│   └── main.css       # Complete styling│   ├── setup.html         # Setup guide

├── js/│   ├── api-reference.html # API documentation

│   ├── main.js        # Navigation & UI interactions│   ├── testnet-info.html  # TestNet information

│   └── stats.js       # Live blockchain stats│   └── pool-setup.html    # Pool setup guide

├── assets/└── wiki/                  # Wiki pages

│   └── icons/    ├── index.html         # Wiki home

│       └── zion.gif   # Logo (animated GIF)    ├── mining-guide.html  # Mining tutorial

├── docs/    ├── faq.html           # Frequently asked questions

│   ├── index.html           # Docs homepage    └── consciousness-levels.html

│   ├── setup.html           # Installation & configuration```

│   ├── api-reference.html   # RPC/WebSocket API

│   ├── testnet-info.html    # Network specs & seeds## 🎨 Features

│   └── pool-setup.html      # Mining pool guide

└── wiki/### Modern Design

    ├── index.html               # Wiki homepage- **Clean & Professional** - Contemporary UI/UX

    ├── getting-started.html     # Intro & first steps- **Responsive** - Mobile-first approach

    ├── mining-guide.html        # Mining algorithms & config- **Dark Theme** - Easy on the eyes

    ├── consciousness-levels.html # 9 consciousness levels- **Smooth Animations** - Polished interactions

    └── faq.html                 # Frequently asked questions

```### Live Statistics

- **Real-time Updates** - Network metrics every 10s

## 🚀 Local Development- **Block Explorer** - Recent blocks display

- **Network Health** - Peers, hashrate, difficulty

### Quick Start- **Auto-refresh** - No manual reload needed



1. **Clone the repo:**### Interactive Elements

   ```bash- **Smooth Scrolling** - Seamless navigation

   git clone https://github.com/Zion-TerraNova/Zion-TestNet2.8.5.git- **Mobile Menu** - Responsive hamburger menu

   cd Zion-TestNet2.8.5/websiteV2- **Click-to-Copy** - Code blocks copyable

   ```- **Fade-in Animations** - Content reveals on scroll



2. **Serve locally** (pick one):## 🚀 Deployment

   

   **Python:**### GitHub Pages

   ```bash

   python3 -m http.server 80001. **Enable GitHub Pages:**

   ```   ```bash

      # Go to repository Settings > Pages

   **Node.js (http-server):**   # Source: Deploy from branch

   ```bash   # Branch: main

   npx http-server -p 8000   # Folder: /websiteV2

   ```   ```

   

   **PHP:**2. **Access:**

   ```bash   - URL: `https://zion-terranova.github.io/Zion-TestNet2.8.5/`

   php -S localhost:8000   - Custom domain: Configure in repository settings

   ```

### Self-Hosted

3. **Open:** http://localhost:8000

1. **Upload to server:**

### Live Reload (Optional)   ```bash

   scp -r websiteV2/* user@server:/var/www/html/

Install `live-server` for auto-refresh during development:   ```

```bash

npm install -g live-server2. **Configure nginx:**

cd websiteV2   ```nginx

live-server --port=8000   server {

```       listen 80;

       server_name testnet.zionterranova.com;

## 📤 Deployment       root /var/www/html;

       index index.html;

### Using the Deploy Script       

       location / {

We've automated deployment to `gh-pages`:           try_files $uri $uri/ =404;

       }

```bash   }

cd Zion-TestNet2.8.5   ```

chmod +x scripts/deploy_pages.sh

./scripts/deploy_pages.sh## 📊 API Integration

```

Website connects to ZION API for live data:

This script:

- Clones repo into temp directory- **Status:** `/api/status` - Blockchain metrics

- Checks out `gh-pages` branch- **Blocks:** `/api/blocks?limit=10` - Recent blocks

- Copies `websiteV2/` contents- **CORS:** Enabled for cross-origin requests

- Adds logo and CNAME

- Commits and pushes to `gh-pages`### API Response Format



## 🎨 Customization```json

{

### Colors  "blockchain": {

    "height": 12547,

Edit CSS variables in `css/main.css`:    "difficulty": 2850,

    "block_reward": 5479.45,

```css    "total_supply": 68726815000

:root {  },

    --primary: #00ff88;      /* Bright green */  "network": {

    --secondary: #6366f1;    /* Indigo */    "connected_peers": 127,

    --accent: #f59e0b;       /* Amber */    "total_peers": 150

    --bg-primary: #0a0f1e;   /* Dark navy */  },

    --bg-card: #1f2937;      /* Card background */  "version": "2.8.5"

}}

``````



### Logo## 🛠️ Customization



Replace `assets/icons/zion.gif` with your own logo. Recommended:### Colors

- Format: GIF (animated), PNG, or SVG

- Size: 40×40px (or square ratio)Edit CSS variables in `css/main.css`:

- Transparent background preferred

```css

### API Endpoint:root {

    --primary: #00ff88;        /* Main brand color */

Update live stats API in `js/stats.js`:    --secondary: #6366f1;      /* Accent color */

    --bg-primary: #0a0f1e;     /* Background */

```javascript    --text-primary: #f9fafb;   /* Text color */

const API_BASE = 'http://www.zionterranova.com/api';}

``````



## 🔧 Features### Stats Update Interval



- ✅ Responsive design (mobile-first)Edit in `js/stats.js`:

- ✅ Dark theme optimized

- ✅ Live blockchain stats (auto-refresh every 10s)```javascript

- ✅ Click-to-copy code blocksconst CONFIG = {

- ✅ Smooth scroll navigation    UPDATE_INTERVAL: 10000,  // milliseconds

- ✅ SEO optimized (robots.txt, sitemap.xml)    MAX_BLOCKS: 10           // blocks to display

- ✅ Custom 404 page};

- ✅ Fast loading (no frameworks, pure HTML/CSS/JS)```



## 📊 Live Stats Integration### API Endpoints



The homepage displays real-time data from the ZION blockchain:Change API base URL in `js/stats.js`:



**Endpoints used:**```javascript

- `/api/status` - Block height, hashrate, peersconst CONFIG = {

- `/api/blocks?limit=10` - Recent blocks    API_BASE: 'http://www.zionterranova.com/api'

};

**Auto-refresh:** Every 10 seconds  ```

**Fallback:** Demo data if API unavailable

## 📝 Adding Content

## 🌍 SEO & Social

### New Feature Card

### Meta Tags

```html

All pages include:<div class="feature-card">

- Title & description    <div class="feature-icon">

- OpenGraph (og:) tags for social sharing        <!-- SVG icon here -->

- Favicon & apple-touch-icon    </div>

- Theme color for mobile browsers    <h3>Feature Title</h3>

    <p>Feature description...</p>

### Sitemap    <ul class="feature-list">

        <li>Benefit 1</li>

`sitemap.xml` lists all pages for search engines.        <li>Benefit 2</li>

    </ul>

### Custom Domain</div>

```

CNAME file contains: `testnet.zionterranova.com`

### New Stat Card

**DNS Setup:**

- Add CNAME record: `testnet` → `Zion-TerraNova.github.io````html

- OR use A records to GitHub Pages IPs<div class="stat-card">

    <div class="stat-icon">📊</div>

## 📝 Content Updates    <div class="stat-data">

        <div class="stat-number" id="stat-name">-</div>

### Add New Page        <div class="stat-title">Stat Title</div>

    </div>

1. Create HTML file in `docs/` or `wiki/`</div>

2. Copy navigation from existing page```

3. Add to `sitemap.xml`

4. Link from relevant index page## 🔧 Development

5. Run deploy script

### Local Testing

### Update Navigation

```bash

Edit the `<nav>` section in each file. Unified menu:# Simple HTTP server

- Features (homepage)python3 -m http.server 8000

- Quick Start (homepage)

- Wiki / Docs# Or with Node.js

- Live Stats (homepage)npx http-server

- GitHub```



## 🧪 TestingNavigate to `http://localhost:8000/websiteV2/`



### Browser Testing### Build for Production



Test in:No build step required - pure HTML/CSS/JS!

- Chrome/Edge (Chromium)

- FirefoxJust deploy the files as-is.

- Safari

- Mobile browsers (iOS Safari, Chrome Mobile)## 📱 Browser Support



### Performance- ✅ Chrome 90+

- ✅ Firefox 88+

- No external dependencies (except Google Fonts)- ✅ Safari 14+

- Minimal JavaScript- ✅ Edge 90+

- Optimized assets- ✅ Mobile browsers

- Fast first paint

## 🎯 Performance

## 📦 Tech Stack

- **Load Time:** < 2 seconds

- **HTML5** - Semantic markup- **File Sizes:**

- **CSS3** - Modern features (Grid, Flexbox, CSS Variables)  - HTML: ~15KB

- **Vanilla JavaScript** - No frameworks  - CSS: ~12KB

- **Google Fonts** - Inter (UI), JetBrains Mono (code)  - JS: ~8KB total

- **No External Dependencies** - Fonts from Google CDN only

## 📄 License

## 📄 License

MIT License - See repo root LICENSE file

MIT License - See main repository for details

---

## 🤝 Contributing

**Built for ZION TestNet 2.8.5**  

World's First Consciousness-Based Blockchain  1. Fork the repository

© 2025 ZION Blockchain2. Create feature branch

3. Make changes to `websiteV2/`
4. Test thoroughly
5. Submit pull request

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/Zion-TerraNova/Zion-TestNet2.8.5/issues)
- **Discussions:** [GitHub Discussions](https://github.com/Zion-TerraNova/Zion-TestNet2.8.5/discussions)
- **Documentation:** See `docs/` and `wiki/` folders

---

**Built with ❤️ for the ZION community**

Version: 2.8.5 "Milky Way"  
Last Updated: November 3, 2025
