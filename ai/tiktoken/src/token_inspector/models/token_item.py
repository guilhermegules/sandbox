from typing import Optional
from pydantic import BaseModel, Field


class SubwordInfo(BaseModel):
    is_subword_continuation: bool = Field(..., description="True if token is part of a fragmented word")
    word_boundary_index: int = Field(..., ge=0, description="Index of the word this token belongs to")


class TokenItem(BaseModel):
    index: int = Field(..., ge=0, description="Sequential 0-based token index in sequence")
    token_id: int = Field(..., ge=0, description="Numeric BPE token ID (e.g. 9906)")
    text: str = Field(..., description="Decoded UTF-8 token string")
    raw_bytes: str = Field(..., description="Hex representation of raw byte sequence (e.g. '0x20 0x6a')")
    byte_length: int = Field(..., ge=0, description="Number of raw bytes in token")
    is_whitespace: bool = Field(..., description="True if token consists solely of whitespace characters")
    subword_info: SubwordInfo = Field(..., description="Subword fragmentation metadata")
    logprob: Optional[float] = Field(None, description="Natural log probability ln(P) if generation token")
    probability_pct: Optional[float] = Field(None, ge=0.0, le=100.0, description="Derived probability P * 100")
