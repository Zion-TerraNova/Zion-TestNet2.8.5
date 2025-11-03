/**
 * ZION Wallet Manager
 * Handles address generation, key management, and signing
 */

import * as crypto from 'crypto';
import bs58 from 'bs58';
import { WalletData } from './types';
import { WalletError, ValidationError } from './errors';

export class ZionWallet {
  public address: string;
  public publicKey: string;
  public privateKey: string;

  constructor(privateKey?: string) {
    if (privateKey) {
      this.privateKey = privateKey;
    } else {
      this.privateKey = this.generatePrivateKey();
    }

    this.publicKey = this.privateToPublic(this.privateKey);
    this.address = this.publicToAddress(this.publicKey);
  }

  /**
   * Generate new private key
   */
  private generatePrivateKey(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Derive public key from private key
   */
  private privateToPublic(privateKey: string): string {
    // Simplified version - production uses ECDSA secp256k1
    const hash = crypto
      .createHash('sha256')
      .update(Buffer.from(privateKey, 'hex'))
      .digest();
    return hash.toString('hex');
  }

  /**
   * Generate ZION address from public key
   */
  private publicToAddress(publicKey: string): string {
    // Hash public key
    const h1 = crypto
      .createHash('sha256')
      .update(Buffer.from(publicKey, 'hex'))
      .digest();
    const h2 = crypto.createHash('ripemd160').update(h1).digest();

    // Add version byte (0x5A for ZION)
    const versioned = Buffer.concat([Buffer.from([0x5a]), h2]);

    // Checksum (first 4 bytes of double SHA256)
    const checksum = crypto
      .createHash('sha256')
      .update(crypto.createHash('sha256').update(versioned).digest())
      .digest()
      .slice(0, 4);

    // Encode with base58
    const address = bs58.encode(Buffer.concat([versioned, checksum]));

    return address;
  }

  /**
   * Validate ZION address format
   */
  static validateAddress(address: string): boolean {
    try {
      const decoded = bs58.decode(address);

      // Check length (1 version + 20 hash + 4 checksum = 25 bytes)
      if (decoded.length !== 25) {
        return false;
      }

      // Check version byte
      if (decoded[0] !== 0x5a) {
        return false;
      }

      // Verify checksum
      const payload = decoded.slice(0, -4);
      const checksum = decoded.slice(-4);
      const expectedChecksum = crypto
        .createHash('sha256')
        .update(crypto.createHash('sha256').update(payload).digest())
        .digest()
        .slice(0, 4);

      return checksum.equals(expectedChecksum);
    } catch {
      return false;
    }
  }

  /**
   * Sign message with private key
   */
  signMessage(message: string): string {
    // Simplified version - production uses ECDSA
    const msgHash = crypto.createHash('sha256').update(message).digest();
    const keyBytes = Buffer.from(this.privateKey, 'hex');
    const signature = crypto
      .createHash('sha256')
      .update(Buffer.concat([msgHash, keyBytes]))
      .digest();
    return signature.toString('hex');
  }

  /**
   * Export wallet as object
   */
  toJSON(): WalletData {
    return {
      address: this.address,
      public_key: this.publicKey,
      private_key: this.privateKey,
    };
  }

  /**
   * Import wallet from object
   */
  static fromJSON(data: WalletData): ZionWallet {
    return new ZionWallet(data.private_key);
  }
}
