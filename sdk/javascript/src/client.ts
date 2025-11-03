/**
 * ZION RPC Client
 * Handles JSON-RPC communication with ZION blockchain node
 */

import axios, { AxiosInstance } from 'axios';
import { RPCError, ConnectionError } from './errors';
import {
  BlockchainInfo,
  Block,
  Transaction,
  MiningInfo,
  MiningStats,
  PeerInfo,
} from './types';

export interface ZionClientOptions {
  host?: string;
  port?: number;
  protocol?: 'http' | 'https';
  timeout?: number;
}

export class ZionClient {
  private client: AxiosInstance;

  constructor(options: ZionClientOptions = {}) {
    const {
      host = 'localhost',
      port = 8332,
      protocol = 'http',
      timeout = 30000,
    } = options;

    this.client = axios.create({
      baseURL: `${protocol}://${host}:${port}/rpc`,
      timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Make JSON-RPC call
   */
  private async call<T = any>(method: string, params: object = {}): Promise<T> {
    try {
      const response = await this.client.post('', {
        jsonrpc: '2.0',
        id: 1,
        method,
        params,
      });

      const { data } = response;

      if (data.error) {
        throw new RPCError(
          data.error.message || 'Unknown error',
          data.error.code || -1
        );
      }

      return data.result;
    } catch (error: any) {
      if (error instanceof RPCError) {
        throw error;
      }
      throw new ConnectionError(`Connection failed: ${error.message}`);
    }
  }

  // ========== Blockchain Methods ==========

  /**
   * Get blockchain info (version, height, difficulty)
   */
  async getInfo(): Promise<BlockchainInfo> {
    return this.call<BlockchainInfo>('get_info');
  }

  /**
   * Get current block height
   */
  async getBlockCount(): Promise<number> {
    return this.call<number>('get_block_count');
  }

  /**
   * Get block by hash
   */
  async getBlock(blockHash: string): Promise<Block> {
    return this.call<Block>('get_block', { block_hash: blockHash });
  }

  /**
   * Get block by height
   */
  async getBlockByHeight(height: number): Promise<Block> {
    return this.call<Block>('get_block_by_height', { height });
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<Transaction> {
    return this.call<Transaction>('get_transaction', { tx_hash: txHash });
  }

  // ========== Wallet Methods ==========

  /**
   * Get wallet balance
   */
  async getBalance(address: string): Promise<number> {
    const result = await this.call<string>('get_balance', { address });
    return parseFloat(result);
  }

  /**
   * Create and sign transaction
   */
  async createTransaction(params: {
    from: string;
    to: string;
    amount: number;
    privateKey: string;
    fee?: number;
  }): Promise<string> {
    return this.call<string>('create_transaction', {
      from: params.from,
      to: params.to,
      amount: params.amount,
      private_key: params.privateKey,
      fee: params.fee || 0.001,
    });
  }

  /**
   * Broadcast signed transaction
   */
  async sendTransaction(signedTx: string): Promise<string> {
    return this.call<string>('send_transaction', { signed_tx: signedTx });
  }

  // ========== Mining Methods ==========

  /**
   * Get mining info (difficulty, hashrate, etc.)
   */
  async getMiningInfo(): Promise<MiningInfo> {
    return this.call<MiningInfo>('get_mining_info');
  }

  /**
   * Get consciousness level (CL 1-9)
   */
  async getConsciousnessLevel(address: string): Promise<number> {
    return this.call<number>('get_consciousness_level', { address });
  }

  /**
   * Get detailed mining stats
   */
  async getMiningStats(address: string): Promise<MiningStats> {
    return this.call<MiningStats>('get_mining_stats', { address });
  }

  // ========== Network Methods ==========

  /**
   * Get connected peers
   */
  async getPeerInfo(): Promise<PeerInfo[]> {
    return this.call<PeerInfo[]>('get_peer_info');
  }

  /**
   * Get total network hashrate
   */
  async getNetworkHashrate(): Promise<number> {
    return this.call<number>('get_network_hashrate');
  }

  // ========== Sacred Library Methods ==========

  /**
   * Get sacred text from library
   */
  async sacredLibraryGetText(textId: string): Promise<any> {
    return this.call('sacred_library.get_text', { text_id: textId });
  }

  /**
   * Search across sacred texts
   */
  async sacredLibrarySearch(query: string, limit = 10): Promise<any[]> {
    return this.call('sacred_library.search', { query, limit });
  }

  /**
   * Get daily wisdom quote
   */
  async sacredLibraryDailyWisdom(
    seed?: string,
    length: 'short' | 'medium' | 'long' = 'medium'
  ): Promise<any> {
    const params: any = { length };
    if (seed) params.seed = seed;
    return this.call('sacred_library.get_daily_wisdom', params);
  }

  // ========== Utility Methods ==========

  /**
   * Validate ZION address format
   */
  async validateAddress(address: string): Promise<boolean> {
    try {
      const result = await this.call<{ valid: boolean }>('validate_address', {
        address,
      });
      return result.valid;
    } catch {
      return false;
    }
  }
}
