from pathlib import Path
from typing import Dict, List, Optional, Tuple
import hashlib
import mimetypes


class StaticBundleProvider:
    """Provides embedded zero-CDN static web assets with deterministic ETags and 304 caching."""

    MIME_OVERRIDES: Dict[str, str] = {
        ".html": "text/html; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".js": "application/javascript; charset=utf-8",
        ".json": "application/json",
        ".svg": "image/svg+xml",
        ".ico": "image/x-icon",
    }

    def __init__(self, static_dir: Optional[Path] = None) -> None:
        self.static_dir = static_dir or (Path(__file__).parent / "static")

    def _resolve_mime(self, path: Path) -> str:
        ext = path.suffix.lower()
        if ext in self.MIME_OVERRIDES:
            return self.MIME_OVERRIDES[ext]
        mime, _ = mimetypes.guess_type(str(path))
        return mime or "application/octet-stream"

    def has_asset(self, filename: str) -> bool:
        asset_path = (self.static_dir / filename).resolve()
        return asset_path.exists() and asset_path.is_file() and str(asset_path).startswith(str(self.static_dir.resolve()))

    def list_assets(self) -> List[str]:
        if not self.static_dir.exists():
            return []
        return [p.name for p in self.static_dir.iterdir() if p.is_file()]

    def get_asset(
        self,
        filename: str,
        if_none_match: Optional[str] = None,
    ) -> Tuple[int, Dict[str, str], bytes]:
        """Fetch asset bytes, MIME type, and ETag header; returns 304 if ETag matches."""
        asset_path = (self.static_dir / filename).resolve()
        try:
            asset_path.relative_to(self.static_dir.resolve())
        except ValueError:
            return 404, {}, b"Not Found"

        if not (asset_path.exists() and asset_path.is_file()):
            return 404, {}, b"Not Found"

        content = asset_path.read_bytes()
        etag = f'"{hashlib.sha256(content).hexdigest()}"'
        headers: Dict[str, str] = {
            "ETag": etag,
            "Cache-Control": "public, max-age=3600",
            "Content-Security-Policy": (
                "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; "
                "img-src 'self' data:; connect-src 'self'"
            ),
        }

        # Check client cache conditional request
        if if_none_match:
            clean_inm = if_none_match.strip()
            if clean_inm == etag or clean_inm == etag.strip('"'):
                return 304, headers, b""

        headers["Content-Type"] = self._resolve_mime(asset_path)
        return 200, headers, content
