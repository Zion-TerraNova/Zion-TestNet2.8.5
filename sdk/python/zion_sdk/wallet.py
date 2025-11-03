"""
ZION Wallet Manager
Handles address generation, key management, and signing
"""

import hashlib
import secrets
import base58
from typing import Tuple, Optional
from .exceptions import WalletError, ValidationError


class ZionWallet:
    """ZION wallet for key management and signing"""
    
    def __init__(self, private_key: Optional[str] = None):
        """
        Initialize wallet
        
        Args:
            private_key: Existing private key (hex) or None to generate new
        """
        if private_key:
            self.private_key = private_key
        else:
            self.private_key = self.generate_private_key()
        
        self.public_key = self.private_to_public(self.private_key)
        self.address = self.public_to_address(self.public_key)
    
    @staticmethod
    def generate_private_key() -> str:
        """
        Generate new private key
        
        Returns:
            Private key (64 hex characters)
        """
        return secrets.token_hex(32)
    
    @staticmethod
    def private_to_public(private_key: str) -> str:
        """
        Derive public key from private key
        
        Args:
            private_key: Private key (hex)
            
        Returns:
            Public key (hex)
        """
        # Simplified version - production uses ECDSA secp256k1
        h = hashlib.sha256(bytes.fromhex(private_key)).digest()
        return h.hex()
    
    @staticmethod
    def public_to_address(public_key: str) -> str:
        """
        Generate ZION address from public key
        
        Args:
            public_key: Public key (hex)
            
        Returns:
            ZION address (base58 with checksum)
        """
        # Hash public key
        h1 = hashlib.sha256(bytes.fromhex(public_key)).digest()
        h2 = hashlib.ripemd160(h1).digest() if hasattr(hashlib, 'ripemd160') \
             else hashlib.new('ripemd160', h1).digest()
        
        # Add version byte (0x5A for ZION)
        versioned = b'\x5A' + h2
        
        # Checksum (first 4 bytes of double SHA256)
        checksum = hashlib.sha256(hashlib.sha256(versioned).digest()).digest()[:4]
        
        # Encode with base58
        address = base58.b58encode(versioned + checksum).decode('utf-8')
        
        return address
    
    @staticmethod
    def validate_address(address: str) -> bool:
        """
        Validate ZION address format
        
        Args:
            address: Address to validate
            
        Returns:
            True if valid
        """
        try:
            decoded = base58.b58decode(address)
            
            # Check length (1 version + 20 hash + 4 checksum = 25 bytes)
            if len(decoded) != 25:
                return False
            
            # Check version byte
            if decoded[0] != 0x5A:
                return False
            
            # Verify checksum
            payload = decoded[:-4]
            checksum = decoded[-4:]
            expected_checksum = hashlib.sha256(
                hashlib.sha256(payload).digest()
            ).digest()[:4]
            
            return checksum == expected_checksum
            
        except Exception:
            return False
    
    def sign_message(self, message: str) -> str:
        """
        Sign message with private key
        
        Args:
            message: Message to sign
            
        Returns:
            Signature (hex)
        """
        # Simplified version - production uses ECDSA
        msg_hash = hashlib.sha256(message.encode()).digest()
        key_bytes = bytes.fromhex(self.private_key)
        signature = hashlib.sha256(msg_hash + key_bytes).digest()
        return signature.hex()
    
    def to_dict(self) -> dict:
        """
        Export wallet as dictionary
        
        Returns:
            Wallet data (address, public key, private key)
        """
        return {
            "address": self.address,
            "public_key": self.public_key,
            "private_key": self.private_key
        }
    
    @classmethod
    def from_dict(cls, data: dict) -> "ZionWallet":
        """
        Import wallet from dictionary
        
        Args:
            data: Wallet data
            
        Returns:
            ZionWallet instance
        """
        return cls(private_key=data.get("private_key"))
    
    def __repr__(self) -> str:
        return f"ZionWallet(address='{self.address}')"
