/**
 * ZION TestNet 2.8.5 - Live Statistics
 * Real-time network metrics and block data
 */

(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        API_BASE: 'http://www.zionterranova.com/api',
        UPDATE_INTERVAL: 10000, // 10 seconds
        MAX_BLOCKS: 10
    };
    
    // DOM Elements
    const elements = {
        // Hero stats
        blockHeight: document.getElementById('block-height'),
        networkHashrate: document.getElementById('network-hashrate'),
        activePeers: document.getElementById('active-peers'),
        
        // Stats section
        statBlocks: document.getElementById('stat-blocks'),
        statDifficulty: document.getElementById('stat-difficulty'),
        statSupply: document.getElementById('stat-supply'),
        statPeers: document.getElementById('stat-peers'),
        
        // Blocks list
        blocksList: document.getElementById('blocks-list')
    };
    
    // Cache for data
    let cache = {
        status: null,
        blocks: []
    };
    
    /**
     * Format large numbers with K, M, B suffixes
     */
    function formatNumber(num) {
        if (num >= 1e9) {
            return (num / 1e9).toFixed(2) + 'B';
        } else if (num >= 1e6) {
            return (num / 1e6).toFixed(2) + 'M';
        } else if (num >= 1e3) {
            return (num / 1e3).toFixed(2) + 'K';
        }
        return num.toLocaleString();
    }
    
    /**
     * Format hashrate with appropriate units
     */
    function formatHashrate(hashrate) {
        if (hashrate >= 1e12) {
            return (hashrate / 1e12).toFixed(2) + ' TH/s';
        } else if (hashrate >= 1e9) {
            return (hashrate / 1e9).toFixed(2) + ' GH/s';
        } else if (hashrate >= 1e6) {
            return (hashrate / 1e6).toFixed(2) + ' MH/s';
        } else if (hashrate >= 1e3) {
            return (hashrate / 1e3).toFixed(2) + ' KH/s';
        }
        return hashrate.toFixed(2) + ' H/s';
    }
    
    /**
     * Format time ago
     */
    function timeAgo(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        const seconds = Math.floor(diff / 1000);
        
        if (seconds < 60) return seconds + 's ago';
        if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago';
        if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago';
        return Math.floor(seconds / 86400) + 'd ago';
    }
    
    /**
     * Animate number changes
     */
    function animateValue(element, start, end, duration = 1000) {
        if (!element) return;
        
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                element.textContent = Math.floor(end).toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }
    
    /**
     * Fetch blockchain status
     */
    async function fetchStatus() {
        try {
            const response = await fetch(`${CONFIG.API_BASE}/status`);
            if (!response.ok) throw new Error('API request failed');
            
            const data = await response.json();
            cache.status = data;
            updateStatusUI(data);
        } catch (error) {
            console.error('Failed to fetch status:', error);
            useFallbackData();
        }
    }
    
    /**
     * Fetch recent blocks
     */
    async function fetchBlocks() {
        try {
            const response = await fetch(`${CONFIG.API_BASE}/blocks?limit=${CONFIG.MAX_BLOCKS}`);
            if (!response.ok) throw new Error('API request failed');
            
            const blocks = await response.json();
            cache.blocks = blocks;
            updateBlocksUI(blocks);
        } catch (error) {
            console.error('Failed to fetch blocks:', error);
        }
    }
    
    /**
     * Update UI with status data
     */
    function updateStatusUI(data) {
        const blockchain = data.blockchain || {};
        const network = data.network || {};
        
        // Calculate hashrate from difficulty
        const hashrate = (blockchain.difficulty || 0) * 1000000;
        
        // Hero stats
        if (elements.blockHeight) {
            const current = parseInt(elements.blockHeight.textContent) || 0;
            if (blockchain.height !== current) {
                animateValue(elements.blockHeight, current, blockchain.height || 0);
            }
        }
        
        if (elements.networkHashrate) {
            elements.networkHashrate.textContent = formatHashrate(hashrate);
        }
        
        if (elements.activePeers) {
            const current = parseInt(elements.activePeers.textContent) || 0;
            const peers = network.connected_peers || 0;
            if (peers !== current) {
                animateValue(elements.activePeers, current, peers);
            }
        }
        
        // Stats section
        if (elements.statBlocks) {
            const current = parseInt(elements.statBlocks.textContent.replace(/,/g, '')) || 0;
            if (blockchain.height !== current) {
                animateValue(elements.statBlocks, current, blockchain.height || 0);
            }
        }
        
        if (elements.statDifficulty) {
            elements.statDifficulty.textContent = formatNumber(blockchain.difficulty || 0);
        }
        
        if (elements.statSupply) {
            elements.statSupply.textContent = formatNumber(blockchain.total_supply || 0);
        }
        
        if (elements.statPeers) {
            const current = parseInt(elements.statPeers.textContent) || 0;
            const peers = network.total_peers || network.connected_peers || 0;
            if (peers !== current) {
                animateValue(elements.statPeers, current, peers);
            }
        }
    }
    
    /**
     * Update blocks list UI
     */
    function updateBlocksUI(blocks) {
        if (!elements.blocksList) return;
        
        elements.blocksList.innerHTML = '';
        
        blocks.slice(0, CONFIG.MAX_BLOCKS).forEach(block => {
            const blockItem = document.createElement('div');
            blockItem.className = 'block-item';
            
            const height = document.createElement('div');
            height.className = 'block-height';
            height.textContent = `Block #${block.height || 0}`;
            
            const time = document.createElement('div');
            time.className = 'block-time';
            time.textContent = timeAgo(block.timestamp || Date.now());
            
            blockItem.appendChild(height);
            blockItem.appendChild(time);
            elements.blocksList.appendChild(blockItem);
        });
    }
    
    /**
     * Use fallback demo data when API is unavailable
     */
    function useFallbackData() {
        const demoData = {
            blockchain: {
                height: 12547,
                difficulty: 2850,
                block_reward: 5479.45,
                total_supply: 68726815000
            },
            network: {
                connected_peers: 127,
                total_peers: 150
            }
        };
        
        updateStatusUI(demoData);
        
        // Generate demo blocks
        const demoBlocks = [];
        const now = Date.now();
        
        for (let i = 0; i < CONFIG.MAX_BLOCKS; i++) {
            demoBlocks.push({
                height: demoData.blockchain.height - i,
                timestamp: now - (i * 120000) // 2 minutes apart
            });
        }
        
        updateBlocksUI(demoBlocks);
    }
    
    /**
     * Initialize stats updates
     */
    function init() {
        console.log('📊 Initializing live stats...');
        
        // Initial fetch
        fetchStatus();
        fetchBlocks();
        
        // Set up periodic updates
        setInterval(() => {
            fetchStatus();
            fetchBlocks();
        }, CONFIG.UPDATE_INTERVAL);
        
        // Update time ago every 30 seconds
        setInterval(() => {
            if (cache.blocks.length > 0) {
                updateBlocksUI(cache.blocks);
            }
        }, 30000);
    }
    
    // Run on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
