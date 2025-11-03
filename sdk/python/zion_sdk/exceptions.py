"""
ZION SDK Exceptions
Custom exceptions for error handling
"""


class ZionError(Exception):
    """Base exception for ZION SDK"""
    pass


class ConnectionError(ZionError):
    """Raised when connection to node fails"""
    pass


class RPCError(ZionError):
    """Raised when RPC call returns error"""
    
    def __init__(self, message: str, code: int = -1):
        super().__init__(message)
        self.code = code
        self.message = message


class ValidationError(ZionError):
    """Raised when validation fails"""
    pass


class WalletError(ZionError):
    """Raised for wallet-related errors"""
    pass


class TransactionError(ZionError):
    """Raised for transaction errors"""
    pass
