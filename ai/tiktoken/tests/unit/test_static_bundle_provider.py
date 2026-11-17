from pathlib import Path
import pytest

from token_inspector.web.static_bundle_provider import StaticBundleProvider


def test_static_bundle_provider_serves_files_and_etags(tmp_path: Path) -> None:
    # Arrange: Create test directory with static assets
    static_dir = tmp_path / "static"
    static_dir.mkdir()
    (static_dir / "index.html").write_text("<!DOCTYPE html><html><body>Test</body></html>", encoding="utf-8")
    (static_dir / "app.css").write_text("body { background: #000; }", encoding="utf-8")
    (static_dir / "app.js").write_text("console.log('test');", encoding="utf-8")

    provider = StaticBundleProvider(static_dir=static_dir)

    # Act 1: Fetch index.html without If-None-Match
    status, headers, content = provider.get_asset("index.html")

    # Assert 1
    assert status == 200
    assert "text/html" in headers["Content-Type"]
    assert "ETag" in headers
    assert "Content-Security-Policy" in headers
    assert "default-src 'self'" in headers["Content-Security-Policy"]
    etag = headers["ETag"]
    assert len(etag) > 0
    assert b"Test" in content

    # Act 2: Fetch app.css with matching ETag
    _, css_headers, _ = provider.get_asset("app.css")
    css_etag = css_headers["ETag"]
    status_304, headers_304, content_304 = provider.get_asset("app.css", if_none_match=css_etag)

    # Assert 2: 304 Not Modified
    assert status_304 == 304
    assert len(content_304) == 0
    assert headers_304["ETag"] == css_etag

    # Act 3: Missing file returns 404
    status_404, _, _ = provider.get_asset("nonexistent.png")
    assert status_404 == 404

    # Act 4: Path traversal attempt is blocked
    traversal_status, _, _ = provider.get_asset("../../../../pyproject.toml")
    assert traversal_status == 404
