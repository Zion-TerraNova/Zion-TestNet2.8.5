# 🌟 ZION TestNet 2.8.5 - Official Website

Modern, clean website for ZION TestNet public blockchain.

## 📁 Structure

```
websiteV2/
├── index.html              # Main landing page
├── css/
│   └── main.css           # Modern stylesheet
├── js/
│   ├── main.js            # Core functionality
│   └── stats.js           # Live network statistics
├── assets/
│   ├── images/            # Images and graphics
│   └── icons/             # Icon assets
├── docs/                  # Documentation pages
│   ├── setup.html         # Setup guide
│   ├── api-reference.html # API documentation
│   ├── testnet-info.html  # TestNet information
│   └── pool-setup.html    # Pool setup guide
└── wiki/                  # Wiki pages
    ├── index.html         # Wiki home
    ├── mining-guide.html  # Mining tutorial
    ├── faq.html           # Frequently asked questions
    └── consciousness-levels.html
```

## 🎨 Features

### Modern Design
- **Clean & Professional** - Contemporary UI/UX
- **Responsive** - Mobile-first approach
- **Dark Theme** - Easy on the eyes
- **Smooth Animations** - Polished interactions

### Live Statistics
- **Real-time Updates** - Network metrics every 10s
- **Block Explorer** - Recent blocks display
- **Network Health** - Peers, hashrate, difficulty
- **Auto-refresh** - No manual reload needed

### Interactive Elements
- **Smooth Scrolling** - Seamless navigation
- **Mobile Menu** - Responsive hamburger menu
- **Click-to-Copy** - Code blocks copyable
- **Fade-in Animations** - Content reveals on scroll

## 🚀 Deployment

### GitHub Pages

1. **Enable GitHub Pages:**
   ```bash
   # Go to repository Settings > Pages
   # Source: Deploy from branch
   # Branch: main
   # Folder: /websiteV2
   ```

2. **Access:**
   - URL: `https://zion-terranova.github.io/Zion-TestNet2.8.5/`
   - Custom domain: Configure in repository settings

### Self-Hosted

1. **Upload to server:**
   ```bash
   scp -r websiteV2/* user@server:/var/www/html/
   ```

2. **Configure nginx:**
   ```nginx
   server {
       listen 80;
       server_name testnet.zionterranova.com;
       root /var/www/html;
       index index.html;
       
       location / {
           try_files $uri $uri/ =404;
       }
   }
   ```

## 📊 API Integration

Website connects to ZION API for live data:

- **Status:** `/api/status` - Blockchain metrics
- **Blocks:** `/api/blocks?limit=10` - Recent blocks
- **CORS:** Enabled for cross-origin requests

### API Response Format

```json
{
  "blockchain": {
    "height": 12547,
    "difficulty": 2850,
    "block_reward": 5479.45,
    "total_supply": 68726815000
  },
  "network": {
    "connected_peers": 127,
    "total_peers": 150
  },
  "version": "2.8.5"
}
```

## 🛠️ Customization

### Colors

Edit CSS variables in `css/main.css`:

```css
:root {
    --primary: #00ff88;        /* Main brand color */
    --secondary: #6366f1;      /* Accent color */
    --bg-primary: #0a0f1e;     /* Background */
    --text-primary: #f9fafb;   /* Text color */
}
```

### Stats Update Interval

Edit in `js/stats.js`:

```javascript
const CONFIG = {
    UPDATE_INTERVAL: 10000,  // milliseconds
    MAX_BLOCKS: 10           // blocks to display
};
```

### API Endpoints

Change API base URL in `js/stats.js`:

```javascript
const CONFIG = {
    API_BASE: 'http://www.zionterranova.com/api'
};
```

## 📝 Adding Content

### New Feature Card

```html
<div class="feature-card">
    <div class="feature-icon">
        <!-- SVG icon here -->
    </div>
    <h3>Feature Title</h3>
    <p>Feature description...</p>
    <ul class="feature-list">
        <li>Benefit 1</li>
        <li>Benefit 2</li>
    </ul>
</div>
```

### New Stat Card

```html
<div class="stat-card">
    <div class="stat-icon">📊</div>
    <div class="stat-data">
        <div class="stat-number" id="stat-name">-</div>
        <div class="stat-title">Stat Title</div>
    </div>
</div>
```

## 🔧 Development

### Local Testing

```bash
# Simple HTTP server
python3 -m http.server 8000

# Or with Node.js
npx http-server
```

Navigate to `http://localhost:8000/websiteV2/`

### Build for Production

No build step required - pure HTML/CSS/JS!

Just deploy the files as-is.

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers

## 🎯 Performance

- **Load Time:** < 2 seconds
- **File Sizes:**
  - HTML: ~15KB
  - CSS: ~12KB
  - JS: ~8KB total
- **No External Dependencies** - Fonts from Google CDN only

## 📄 License

MIT License - See main repository for details

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
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
