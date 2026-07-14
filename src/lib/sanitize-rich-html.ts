import DOMPurify from "isomorphic-dompurify";

const ALLOWED_CALLOUT_CLASSES = new Set([
  "callout--warning",
  "callout--tip",
  "callout--info",
]);

DOMPurify.addHook("uponSanitizeAttribute", (node, data) => {
  if (data.attrName !== "class" || node.nodeName.toLowerCase() !== "aside") {
    return;
  }

  const safeClasses = data.attrValue
    .split(/\s+/)
    .filter((className) => ALLOWED_CALLOUT_CLASSES.has(className));

  if (safeClasses.length === 0) {
    data.keepAttr = false;
    return;
  }

  data.attrValue = [...new Set(safeClasses)].join(" ");
});

/**
 * Preserves a deliberately small set of formatting tags and removes every
 * attribute, URL, embedded object, event handler, and executable element.
 */
export function sanitizeRichHtml(value: string) {
  if (!value) return "";

  return DOMPurify.sanitize(value, {
    ALLOWED_TAGS: [
      "p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li",
      "strong", "em", "b", "i", "blockquote", "code", "pre", "br",
      "hr", "a", "aside", "table", "caption", "colgroup", "col",
      "thead", "tbody", "tfoot", "tr", "th", "td",
    ],
    ALLOWED_ATTR: ["href", "title", "target", "rel"],
    ADD_ATTR: (attributeName, tagName) =>
      (attributeName === "class" && tagName === "aside") ||
      (attributeName === "id" && /^h[1-6]$/.test(tagName)),
    ALLOW_DATA_ATTR: false,
    ALLOW_UNKNOWN_PROTOCOLS: false,
  });
}
