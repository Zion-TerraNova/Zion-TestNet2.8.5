"""
ZION Sacred Library Client
Specialized client for Sacred Library API
"""

from typing import Dict, Any, List, Optional
from .client import ZionClient


class SacredLibrary:
    """Client for ZION Sacred Library (39,036 lines of wisdom)"""
    
    # Available texts
    TEXTS = {
        "cosmic_egg": "Cosmic Egg (2,500 lines)",
        "omnity_one_love": "Omnity One Love (12,518 lines)",
        "secrets_of_amenti": "Secrets of Amenti (8,200 lines)",
        "dohrman_prophecy": "Dohrman Prophecy (6,318 lines)",
        "via_lucis": "Via Lucis (4,800 lines)",
        "sacred_trinity": "Sacred Trinity (5,256 lines)",
    }
    
    def __init__(self, client: Optional[ZionClient] = None):
        """
        Initialize Sacred Library client
        
        Args:
            client: ZionClient instance or None to create new
        """
        self.client = client or ZionClient()
    
    def get_text(self, text_id: str) -> Dict[str, Any]:
        """
        Get complete sacred text
        
        Args:
            text_id: Text ID (e.g., "omnity_one_love")
            
        Returns:
            Text content and metadata
        """
        return self.client.sacred_library_get_text(text_id)
    
    def search(self, query: str, limit: int = 10) -> List[Dict[str, Any]]:
        """
        Search across all texts
        
        Args:
            query: Search query
            limit: Max results
            
        Returns:
            List of matching passages
        """
        return self.client.sacred_library_search(query, limit)
    
    def daily_wisdom(
        self,
        seed: Optional[str] = None,
        length: str = "medium"
    ) -> Dict[str, Any]:
        """
        Get daily wisdom quote
        
        Args:
            seed: Date (YYYY-MM-DD) or None for today
            length: "short" (1-2 lines), "medium" (3-5), "long" (6-10)
            
        Returns:
            Wisdom quote with source metadata
        """
        return self.client.sacred_library_daily_wisdom(seed, length)
    
    def get_metadata(self, text_id: str) -> Dict[str, Any]:
        """
        Get text metadata only (no content)
        
        Args:
            text_id: Text ID
            
        Returns:
            Metadata (title, lines, IPFS hash, etc.)
        """
        return self.client._call("sacred_library.get_metadata", {"text_id": text_id})
    
    def get_table_of_contents(self, text_id: str) -> List[Dict[str, Any]]:
        """
        Get table of contents for text
        
        Args:
            text_id: Text ID
            
        Returns:
            List of chapters/sections
        """
        return self.client._call("sacred_library.get_toc", {"text_id": text_id})
    
    def get_excerpt(
        self,
        text_id: str,
        start_line: int,
        end_line: int
    ) -> Dict[str, Any]:
        """
        Get excerpt from text
        
        Args:
            text_id: Text ID
            start_line: Start line number (1-indexed)
            end_line: End line number
            
        Returns:
            Text excerpt
        """
        return self.client._call("sacred_library.get_excerpt", {
            "text_id": text_id,
            "start_line": start_line,
            "end_line": end_line
        })
    
    def list_texts(self) -> List[Dict[str, str]]:
        """
        List all available sacred texts
        
        Returns:
            List of text IDs with descriptions
        """
        return [
            {"id": text_id, "description": desc}
            for text_id, desc in self.TEXTS.items()
        ]
    
    def __repr__(self) -> str:
        return f"SacredLibrary(texts={len(self.TEXTS)})"
