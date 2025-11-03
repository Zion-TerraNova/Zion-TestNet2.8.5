/**
 * ZION Sacred Library Client
 * Specialized client for Sacred Library API
 */

import { ZionClient } from './client';
import { SacredText, WisdomQuote } from './types';

export class SacredLibrary {
  private client: ZionClient;

  // Available texts
  static readonly TEXTS = {
    cosmic_egg: 'Cosmic Egg (2,500 lines)',
    omnity_one_love: 'Omnity One Love (12,518 lines)',
    secrets_of_amenti: 'Secrets of Amenti (8,200 lines)',
    dohrman_prophecy: 'Dohrman Prophecy (6,318 lines)',
    via_lucis: 'Via Lucis (4,800 lines)',
    sacred_trinity: 'Sacred Trinity (5,256 lines)',
  };

  constructor(client?: ZionClient) {
    this.client = client || new ZionClient();
  }

  /**
   * Get complete sacred text
   */
  async getText(textId: string): Promise<SacredText> {
    return this.client.sacredLibraryGetText(textId);
  }

  /**
   * Search across all texts
   */
  async search(query: string, limit = 10): Promise<any[]> {
    return this.client.sacredLibrarySearch(query, limit);
  }

  /**
   * Get daily wisdom quote
   */
  async dailyWisdom(
    seed?: string,
    length: 'short' | 'medium' | 'long' = 'medium'
  ): Promise<WisdomQuote> {
    return this.client.sacredLibraryDailyWisdom(seed, length);
  }

  /**
   * List all available sacred texts
   */
  listTexts(): Array<{ id: string; description: string }> {
    return Object.entries(SacredLibrary.TEXTS).map(([id, description]) => ({
      id,
      description,
    }));
  }
}
