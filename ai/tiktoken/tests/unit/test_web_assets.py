from pathlib import Path
import re
import pytest

from token_inspector.web.static_bundle_provider import StaticBundleProvider


def test_web_assets_air_gapped_offline_and_wcag() -> None:
    # Arrange
    static_dir = Path(__file__).parent.parent.parent / "src" / "token_inspector" / "web" / "static"
    provider = StaticBundleProvider(static_dir=static_dir)

    html_file = static_dir / "index.html"
    css_file = static_dir / "app.css"
    js_file = static_dir / "app.js"

    assert html_file.exists(), "index.html must exist"
    assert css_file.exists(), "app.css must exist"
    assert js_file.exists(), "app.js must exist"

    html_content = html_file.read_text(encoding="utf-8")
    css_content = css_file.read_text(encoding="utf-8")
    js_content = js_file.read_text(encoding="utf-8")

    total_bytes = len(html_content.encode("utf-8")) + len(css_content.encode("utf-8")) + len(js_content.encode("utf-8"))

    # Assert 1: Total size under 140KB
    assert total_bytes < 140 * 1024

    # Assert 2: Zero external CDN URLs (no http:// or https:// except internal schema or namespace)
    for name, content in [("index.html", html_content), ("app.css", css_content), ("app.js", js_content)]:
        external_urls = re.findall(r'https?://(?!localhost|127\.0\.0\.1)[^"\'\s>]+', content)
        # Filter out xmlns schemas if any
        real_cdn_urls = [u for u in external_urls if "w3.org" not in u]
        assert len(real_cdn_urls) == 0, f"Found external CDN references in {name}: {real_cdn_urls}"

    # Assert 3: WCAG landmarks in HTML (<header>, <nav>, <main>, <aside>)
    assert "<header" in html_content
    assert "<nav" in html_content
    assert "<main" in html_content
    assert "<aside" in html_content

    # Assert 4: 6-hue cycling token badge classes in CSS
    for i in range(6):
        assert f".token-hue-{i}" in css_content
