import os
from pathlib import Path

# Set tiktoken cache dir to ensure offline operation
cache_dir = Path(__file__).parent.parent / ".tiktoken_cache"
if cache_dir.exists():
    os.environ.setdefault("TIKTOKEN_CACHE_DIR", str(cache_dir.resolve()))
