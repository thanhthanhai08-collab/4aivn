import DOMPurify from "isomorphic-dompurify";

/**
 * Preserves a deliberately small set of formatting tags and removes every
 * attribute, URL, embedded object, event handler, and executable element.
 */
export function sanitizeRichHtml(value: string) {
  if (!value) return "";

  return DOMPurify.sanitize(value, {
    ALLOWED_TAGS: [
      "p", "h2", "h3", "h4", "ul", "ol", "li", "strong", "em", "b",
      "i", "blockquote", "code", "pre", "br", "hr", "a",
    ],
    ALLOWED_ATTR: ["href", "title", "target", "rel"],
    ALLOW_UNKNOWN_PROTOCOLS: false,
  });
}
