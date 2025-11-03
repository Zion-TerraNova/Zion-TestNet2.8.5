"""
ZION RPC Client
Handles JSON-RPC communication with ZION blockchain node
"""

import requests
import json
from typing import Dict, Any, Optional, List
from .exceptions import RPCError, ConnectionError, ValidationError


class ZionClient:
    """Main client for interacting with ZION blockchain"""
    
    def __init__(
        self,
        host: str = "localhost",
        port: int = 8332,
        protocol: str = "http",
        timeout: int = 30,
    ):
        """
        Initialize ZION client
        
        Args:
            host: Node hostname or IP
            port: RPC port (default 8332)
            protocol: http or https
            timeout: Request timeout in seconds
        """
        self.url = f"{protocol}://{host}:{port}/rpc"
        self.timeout = timeout
        self._session = requests.Session()
    
    def _call(self, method: str, params: Optional[Dict[str, Any]] = None) -> Any:
        """
        Make JSON-RPC call
        
        Args:
            method: RPC method name
            params: Method parameters
            
        Returns:
            RPC result
            
        Raises:
            RPCError: If RPC call fails
            ConnectionError: If connection fails
        """
        payload = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": method,
            "params": params or {}
        }
        
        try:
            response = self._session.post(
                self.url,
                json=payload,
                timeout=self.timeout,
                headers={"Content-Type": "application/json"}
            )
            response.raise_for_status()
            
            data = response.json()
            
            if "error" in data and data["error"]:
                raise RPCError(
                    data["error"].get("message", "Unknown error"),
                    data["error"].get("code", -1)
                )
            
            return data.get("result")
            
        except requests.exceptions.RequestException as e:
            raise ConnectionError(f"Connection failed: {str(e)}")
    
    # ========== Blockchain Methods ==========
    
    def get_info(self) -> Dict[str, Any]:
        """Get blockchain info (version, height, difficulty)"""
        return self._call("get_info")
    
    def get_block_count(self) -> int:
        """Get current block height"""
        return self._call("get_block_count")
    
    def get_block(self, block_hash: str) -> Dict[str, Any]:
        """
        Get block by hash
        
        Args:
            block_hash: Block hash (hex string)
            
        Returns:
            Block data
        """
        return self._call("get_block", {"block_hash": block_hash})
    
    def get_block_by_height(self, height: int) -> Dict[str, Any]:
        """
        Get block by height
        
        Args:
            height: Block height
            
        Returns:
            Block data
        """
        return self._call("get_block_by_height", {"height": height})
    
    def get_transaction(self, tx_hash: str) -> Dict[str, Any]:
        """
        Get transaction by hash
        
        Args:
            tx_hash: Transaction hash (hex string)
            
        Returns:
            Transaction data
        """
        return self._call("get_transaction", {"tx_hash": tx_hash})
    
    # ========== Wallet Methods ==========
    
    def get_balance(self, address: str) -> float:
        """
        Get wallet balance
        
        Args:
            address: ZION address
            
        Returns:
            Balance in ZION
        """
        result = self._call("get_balance", {"address": address})
        return float(result)
    
    def create_transaction(
        self,
        from_address: str,
        to_address: str,
        amount: float,
        private_key: str,
        fee: float = 0.001
    ) -> str:
        """
        Create and sign transaction
        
        Args:
            from_address: Sender address
            to_address: Recipient address
            amount: Amount in ZION
            private_key: Sender's private key (hex)
            fee: Transaction fee in ZION
            
        Returns:
            Transaction hash
        """
        return self._call("create_transaction", {
            "from": from_address,
            "to": to_address,
            "amount": amount,
            "private_key": private_key,
            "fee": fee
        })
    
    def send_transaction(self, signed_tx: str) -> str:
        """
        Broadcast signed transaction
        
        Args:
            signed_tx: Signed transaction (hex)
            
        Returns:
            Transaction hash
        """
        return self._call("send_transaction", {"signed_tx": signed_tx})
    
    # ========== Mining Methods ==========
    
    def get_mining_info(self) -> Dict[str, Any]:
        """Get mining info (difficulty, hashrate, etc.)"""
        return self._call("get_mining_info")
    
    def get_consciousness_level(self, address: str) -> int:
        """
        Get consciousness level (CL 1-9)
        
        Args:
            address: Miner address
            
        Returns:
            Consciousness level (1-9)
        """
        return self._call("get_consciousness_level", {"address": address})
    
    def get_mining_stats(self, address: str) -> Dict[str, Any]:
        """
        Get detailed mining stats
        
        Args:
            address: Miner address
            
        Returns:
            Mining statistics
        """
        return self._call("get_mining_stats", {"address": address})
    
    # ========== Network Methods ==========
    
    def get_peer_info(self) -> List[Dict[str, Any]]:
        """Get connected peers"""
        return self._call("get_peer_info")
    
    def get_network_hashrate(self) -> float:
        """Get total network hashrate"""
        return self._call("get_network_hashrate")
    
    # ========== Sacred Library Methods ==========
    
    def sacred_library_get_text(self, text_id: str) -> Dict[str, Any]:
        """
        Get sacred text from library
        
        Args:
            text_id: Text ID (e.g., "omnity_one_love")
            
        Returns:
            Text content and metadata
        """
        return self._call("sacred_library.get_text", {"text_id": text_id})
    
    def sacred_library_search(self, query: str, limit: int = 10) -> List[Dict[str, Any]]:
        """
        Search across sacred texts
        
        Args:
            query: Search query
            limit: Max results
            
        Returns:
            List of matching passages
        """
        return self._call("sacred_library.search", {
            "query": query,
            "limit": limit
        })
    
    def sacred_library_daily_wisdom(
        self,
        seed: Optional[str] = None,
        length: str = "medium"
    ) -> Dict[str, Any]:
        """
        Get daily wisdom quote
        
        Args:
            seed: Date seed (YYYY-MM-DD) or None for today
            length: short, medium, or long
            
        Returns:
            Wisdom quote with metadata
        """
        params = {"length": length}
        if seed:
            params["seed"] = seed
        return self._call("sacred_library.get_daily_wisdom", params)
    
    # ========== Utility Methods ==========
    
    def validate_address(self, address: str) -> bool:
        """
        Validate ZION address format
        
        Args:
            address: Address to validate
            
        Returns:
            True if valid
        """
        try:
            result = self._call("validate_address", {"address": address})
            return result.get("valid", False)
        except RPCError:
            return False
    
    def close(self):
        """Close HTTP session"""
        self._session.close()
    
    def __enter__(self):
        """Context manager entry"""
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        """Context manager exit"""
        self.close()
