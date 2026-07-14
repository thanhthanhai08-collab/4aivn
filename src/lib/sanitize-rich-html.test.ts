import assert from "node:assert/strict";
import test from "node:test";

import { sanitizeRichHtml } from "./sanitize-rich-html";

test("preserves callout notes and only their supported presentation classes", () => {
  const clean = sanitizeRichHtml(
    '<aside class="fixed callout--tip unknown" onclick="alert(1)"><strong>Ghi chú</strong><p>Nội dung</p></aside>'
  );

  assert.equal(
    clean,
    '<aside class="callout--tip"><strong>Ghi chú</strong><p>Nội dung</p></aside>'
  );

  assert.equal(
    sanitizeRichHtml('<aside class="unknown" data-track="1">Ghi chú</aside>'),
    "<aside>Ghi chú</aside>"
  );
  assert.equal(
    sanitizeRichHtml('<aside class="callout--info callout--info">Thông tin</aside>'),
    '<aside class="callout--info">Thông tin</aside>'
  );
});

test("preserves article tables while removing inline presentation attributes", () => {
  const clean = sanitizeRichHtml(
    '<table style="position:fixed"><thead><tr><th style="color:red">Tên</th></tr></thead><tbody><tr><td>Dữ liệu</td></tr></tbody></table>'
  );

  assert.equal(
    clean,
    "<table><thead><tr><th>Tên</th></tr></thead><tbody><tr><td>Dữ liệu</td></tr></tbody></table>"
  );
});

test("preserves heading anchors used by article tables of contents", () => {
  const clean = sanitizeRichHtml(
    '<h2 id="section-1" class="fixed">Phần một</h2><a href="#section-1">Đi tới</a>'
  );

  assert.equal(clean, '<h2 id="section-1">Phần một</h2><a href="#section-1">Đi tới</a>');
});

test("continues to remove executable and embedded HTML", () => {
  const clean = sanitizeRichHtml(
    '<p onmouseover="alert(1)">An toàn</p><script>alert(1)</script><style>body{display:none}</style><iframe src="https://example.com"></iframe><img src="https://example.com/tracker.png"><a href="javascript:alert(1)">Liên kết</a>'
  );

  assert.equal(clean, '<p>An toàn</p><a>Liên kết</a>');
});

test("keeps the existing basic rich-text contract", () => {
  const input =
    '<h3>Tiêu đề</h3><p><strong>Đậm</strong> và <em>nghiêng</em></p><ol><li>Một</li></ol><blockquote>Trích dẫn</blockquote><pre><code>npm test</code></pre><hr><a href="https://example.com" target="_blank" rel="noopener noreferrer">Nguồn</a>';

  assert.equal(sanitizeRichHtml(input), input);
});
