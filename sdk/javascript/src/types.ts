/**
 * ZION SDK Type Definitions
 */

export interface BlockchainInfo {
  version: string;
  height: number;
  difficulty: number;
  network: 'testnet' | 'mainnet';
  total_supply: number;
  circulating_supply: number;
}

export interface Block {
  hash: string;
  height: number;
  timestamp: number;
  transactions: Transaction[];
  miner: string;
  difficulty: number;
  nonce: number;
  previous_hash: string;
}

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  amount: number;
  fee: number;
  timestamp: number;
  confirmations: number;
  block_hash?: string;
}

export interface MiningInfo {
  difficulty: number;
  hashrate: number;
  blocks_found: number;
  current_algorithm: string;
}

export interface MiningStats {
  address: string;
  hashrate: number;
  blocks_found: number;
  total_rewards: number;
  consciousness_level: number;
  multiplier: number;
  last_share: number;
}

export interface PeerInfo {
  id: string;
  address: string;
  version: string;
  height: number;
  latency: number;
}

export interface WalletData {
  address: string;
  public_key: string;
  private_key: string;
}

export interface SacredText {
  id: string;
  title: string;
  content: string;
  metadata: {
    lines: number;
    ipfs_hash: string;
    author?: string;
  };
}

export interface WisdomQuote {
  quote: string;
  source: string;
  text_id: string;
  line_number: number;
  length: 'short' | 'medium' | 'long';
}
