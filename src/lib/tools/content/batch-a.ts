import type { Tool } from "../registry";

export type ToolContent = Pick<
  Tool,
  "whatIs" | "whyUse" | "howToUse" | "examples" | "useCases" | "faqs"
>;

export const batchAContent: Record<string, ToolContent> = {
  "base64-encode": {
    whatIs:
      "Base64 is a binary-to-text encoding scheme defined in RFC 4648 that represents arbitrary bytes using 64 printable ASCII characters: A-Z, a-z, 0-9, plus + and /. Data is processed in 3-byte groups, and each group becomes 4 encoded characters, so Base64 output is about 33% larger than the original. If the final group is incomplete, = padding characters are added to make the length a multiple of 4. Base64 exists because many transport layers - JSON strings, email MIME bodies, data URIs, XML, and URL path segments - were designed for text, not raw binary. This encoder converts Unicode input to UTF-8 bytes first, then applies standard Base64, so emoji and non-Latin scripts encode correctly.",
    whyUse: [
      "Unicode-safe: text is converted to UTF-8 before encoding, so emoji, CJK characters, and accents survive the round trip.",
      "Runs entirely in your browser with btoa() and TextEncoder - there is no upload, no API call, and no server log of your content.",
      "Exact RFC 4648 output with correct = padding, so the result interoperates with every standard Base64 decoder.",
      "Free and unlimited: encode strings of any length without accounts, rate limits, or watermarks.",
      "One click to copy puts a ready-to-paste value for JSON payloads, data URIs, or Authorization headers on your clipboard.",
    ],
    howToUse: [
      "Paste or type plain text into the Input (plain text) box on the left.",
      "Click the Encode button below the output area.",
      "Read the result in the read-only Output (Base64) box on the right.",
      "Click Copy Output to copy the encoded string, or Clear to reset both boxes.",
      "To reverse the process, use the 'Try the Base64 Decoder' link shown under the editor.",
    ],
    examples: [
      {
        title: "Simple text encoding",
        input: "Hello, World!",
        output: "SGVsbG8sIFdvcmxkIQ==",
      },
      {
        title: "Unicode text encoding (CJK + emoji)",
        input: "Hello 世界 🌍",
        output: "SGVsbG8g5LiW55WMIOKAmg==",
      },
      {
        title: "JSON payload encoding",
        input: '{"userId": 123, "token": "abc-123"}',
        output: "eyJ1c2VySWQiOiAxMjMsICJ0b2tlbiI6ICJhYmMtMTIzIn0=",
      },
    ],
    useCases: [
      "Embedding small images, fonts, or icons directly in CSS or HTML as data URIs so they load without an extra request.",
      "Sending binary blobs (PDFs, files) inside JSON API responses where only text is allowed.",
      "Placing credentials in HTTP Basic Auth headers, which require base64 of the username:password string.",
      "Storing binary data in text-only databases or CSV columns that cannot hold raw bytes.",
    ],
    faqs: [
      {
        q: "Is Base64 encryption?",
        a: "No. Base64 is an encoding scheme, not encryption - anyone can decode it in one step with no key. Treat Base64 output as plain text: if the data is sensitive, encrypt it (for example with AES) before encoding.",
      },
      {
        q: "Why does my Base64 output end with equals signs?",
        a: "Base64 processes input in 3-byte chunks that expand to 4 characters. When the input length is not divisible by 3, = padding is appended so the output length is always a multiple of 4. The padding is standard RFC 4648 behavior and is stripped automatically when decoding.",
      },
      {
        q: "Can I encode files with this tool?",
        a: "Yes for text content - paste any text, including JSON, HTML, or source code. For binary files such as images or PDFs, use the Image to Base64 tool, which reads the file from disk and produces a complete data URI with the correct MIME header.",
      },
      {
        q: "Why is the output a third longer than my input?",
        a: "Each 3 input bytes become 4 output characters, which is a 4/3 expansion, or roughly 33%. That overhead is intrinsic to Base64 and applies to every encoder - it is the price of representing binary-safe data in ASCII.",
      },
    ],
  },

  "base64-decode": {
    whatIs:
      "Base64 decoding reverses RFC 4648 encoding: each group of four Base64 characters is mapped back to three bytes by looking up every character's 6-bit value in the standard alphabet (A-Z = 0-25, a-z = 26-51, 0-9 = 52-61, + = 62, / = 63) and dropping = padding. The recovered bytes are then interpreted as UTF-8 text. Decoding is where encoding mistakes surface: an illegal character, missing padding, or a length that is not a multiple of 4 produces an invalid byte stream. This tool validates the alphabet and length before decoding, and uses strict UTF-8 decoding so corrupted input raises a clear error instead of silently producing garbage characters.",
    whyUse: [
      "Instantly turns opaque API values, tokens, and data URIs back into readable text for debugging.",
      "Validates alphabet and length up front, so malformed input reports a specific error instead of decoding to noise.",
      "Strict UTF-8 handling means international text is restored correctly and corruption is flagged rather than hidden.",
      "Everything is decoded locally with atob() and TextDecoder - your strings stay inside the browser tab.",
      "The copy button hands you clean plain text ready to paste into an editor, terminal, or ticket.",
    ],
    howToUse: [
      "Paste your Base64 string into the Input (Base64 text) box.",
      "Click the Decode button.",
      "If the input is valid, the plain text appears in the read-only Output (plain text) box.",
      "If decoding fails, an error below the input explains the problem (bad characters, wrong length, or invalid UTF-8).",
      "Click Copy Output to grab the result or Clear to reset, and follow the link below the editor to switch back to the encoder.",
    ],
    examples: [
      {
        title: "Simple text decoding",
        input: "SGVsbG8sIFdvcmxkIQ==",
        output: "Hello, World!",
      },
      {
        title: "Unicode text decoding (CJK + emoji)",
        input: "SGVsbG8g5LiW55WMIOKAmg==",
        output: "Hello 世界 🌍",
      },
      {
        title: "JSON payload decoding",
        input: "eyJ1c2VySWQiOiAxMjMsICJ0b2tlbiI6ICJhYmMtMTIzIn0=",
        output: '{"userId": 123, "token": "abc-123"}',
      },
    ],
    useCases: [
      "Inspecting base64-encoded JSON bodies or Authorization Basic values captured in browser DevTools.",
      "Recovering text from data URIs (data:text/plain;base64,...) found in HTML, CSS, or emails.",
      "Debugging why an API returns unreadable output - decode it to see the actual bytes.",
      "Restoring configuration blobs or tokens that a system stores in encoded form.",
    ],
    faqs: [
      {
        q: "Why does decoding fail with an invalid Base64 error?",
        a: "The input must contain only A-Z, a-z, 0-9, +, /, and optional trailing = padding, with a total length that is a multiple of 4. Line breaks, spaces, missing padding, or characters like - and _ (Base64URL) will fail - Base64URL uses a different alphabet and should be converted to standard Base64 first.",
      },
      {
        q: "Can I decode Base64 images with this tool?",
        a: "This tool decodes to text, so image bytes will show up as unreadable characters. For images, use the Base64 to Image tool, which accepts both plain Base64 and full data URIs, renders a preview, and lets you download the picture as a file.",
      },
      {
        q: "What does 'not valid UTF-8' mean?",
        a: "Base64 can encode any bytes, including binary data that is not valid UTF-8 text. Because this decoder uses strict UTF-8 decoding, it reports an error instead of displaying mojibake - the data is probably binary, so try the Base64 to Image tool instead.",
      },
      {
        q: "Is my decoded text sent anywhere?",
        a: "No request is made with your content. The browser decodes the string locally using atob() and TextDecoder, so the Network tab in DevTools will show nothing being transmitted.",
      },
    ],
  },

  "url-encode": {
    whatIs:
      "URL encoding, formally called percent-encoding (RFC 3986), converts characters that are reserved or unsafe inside a URL into a % sign followed by two hexadecimal digits representing that byte's value. A space becomes %20, & becomes %26, and / becomes %2F. Percent-encoding is required for query parameter values, form field data, and any text containing spaces or non-ASCII characters, because URLs are limited to a subset of ASCII. This tool uses JavaScript's encodeURIComponent(), which percent-encodes every character except letters, digits, and - _ . ! ~ * ' ( ), producing a value that is safe to drop directly into a query string or form body.",
    whyUse: [
      "Prevents broken requests: spaces, &, =, and # inside values otherwise truncate or corrupt your query string.",
      "Uses encodeURIComponent(), the correct choice for individual parameter values rather than whole URLs.",
      "Multi-byte characters are encoded byte-by-byte as UTF-8, so cafe with an accent and emoji arrive at the server intact.",
      "The conversion happens in-page with a built-in browser function - no round trip and no storage of your text.",
      "Output is immediately copy-ready for curl commands, fetch() calls, and link building.",
    ],
    howToUse: [
      "Paste or type the text you want to make URL-safe into the Input (plain text) box.",
      "Click Encode to convert it.",
      "The percent-encoded result appears in the read-only Output (URL Encoded) box.",
      "Click Copy Output to copy the value, or Clear to start over.",
      "To reverse the process, open the related URL Decoder from the tools shown below the editor.",
    ],
    examples: [
      {
        title: "Query string fragment encoding",
        input: "search=hello world&category=books",
        output: "search%3Dhello%20world%26category%3Dbooks",
      },
      {
        title: "Special characters",
        input: "price=$100&discount=50%",
        output: "price%3D%24100%26discount%3D50%25",
      },
      {
        title: "Accented letters and symbols (UTF-8)",
        input: "Café ☕",
        output: "Caf%C3%A9%20%E2%98%95",
      },
    ],
    useCases: [
      "Building API search URLs so user input with spaces or ampersands never breaks the request.",
      "Encoding form values before submitting them with fetch() or XMLHttpRequest.",
      "Preparing redirect URLs with callback parameters that must survive a trip through a query string.",
      "Encoding filenames or paths used in signed URLs and webhook payloads.",
    ],
    faqs: [
      {
        q: "What is the difference between encodeURI and encodeURIComponent?",
        a: "encodeURI preserves URL structure characters (:, /, ?, #, &, =) and is meant for complete URLs. encodeURIComponent encodes everything except letters, digits, and - _ . ! ~ * ' ( ), so it is safe for individual query parameter values - which is what this tool uses.",
      },
      {
        q: "Should I encode the entire URL or just the values?",
        a: "Only encode individual values. Encoding a full URL turns its : and / into %3A and %2F, which breaks the structure entirely. Keep the URL skeleton raw and encode each parameter value separately.",
      },
      {
        q: "Why did my space become %20 and not +?",
        a: "Both represent a space: %20 is standard percent-encoding used in URLs, while + is the form-encoding convention of application/x-www-form-urlencoded bodies. encodeURIComponent always emits %20, which is correct for query strings and works everywhere.",
      },
      {
        q: "Does encoding change the meaning of my text?",
        a: "No. Percent-encoding is reversible and lossless - decoding returns the exact original bytes. The only visible change is that non-ASCII characters expand to three %XX sequences each because UTF-8 uses up to 4 bytes per character.",
      },
    ],
  },

  "url-decode": {
    whatIs:
      "URL decoding, or percent-decoding, is the inverse of RFC 3986 percent-encoding: every %XX sequence is read as one hexadecimal byte, and consecutive bytes are combined and interpreted - typically as UTF-8 - to recover the original character. In form data, + is also commonly treated as a space. Decoding is what your server performs automatically when it reads query parameters, and it is the fastest way to see what a client actually sent. This tool uses JavaScript's decodeURIComponent(), so multi-byte sequences such as %C3%A9 decode correctly, while malformed input like %GG or a truncated %C produces a clear error instead of a crash.",
    whyUse: [
      "Reveals the real value of query parameters that arrive percent-encoded in API logs or DevTools.",
      "Correctly reassembles multi-byte UTF-8 sequences, so international text reads normally after decoding.",
      "Built-in error handling reports invalid sequences rather than throwing an unhandled exception.",
      "Decoding runs locally in the browser - your strings are processed by native string functions only.",
      "Pairs directly with the URL encoder so you can round-trip values and confirm they are lossless.",
    ],
    howToUse: [
      "Paste the percent-encoded text into the Input (URL Encoded) box.",
      "Click Decode.",
      "The readable result appears in the read-only Output (Decoded) box.",
      "If the input contains invalid sequences such as %GG, an error message is shown instead of output.",
      "Click Copy Output to copy the text or Clear to reset both fields.",
    ],
    examples: [
      {
        title: "Query string fragment decoding",
        input: "search%3Dhello%20world%26category%3Dbooks",
        output: "search=hello world&category=books",
      },
      {
        title: "Special characters",
        input: "price%3D%24100%26discount%3D50%25",
        output: "price=$100&discount=50%",
      },
      {
        title: "UTF-8 multi-byte decoding",
        input: "caf%C3%A9%20mood",
        output: "café mood",
      },
    ],
    useCases: [
      "Reading what a user actually searched for when the URL shows q=%E2%80%A6 instead of plain text.",
      "Debugging webhook or OAuth callback URLs where redirect parameters arrive encoded.",
      "Cleaning up copy-pasted links from browser address bars before reusing the values.",
      "Verifying that your own encoder produced the exact string the server expects.",
    ],
    faqs: [
      {
        q: "Why does decoding fail?",
        a: "decodeURIComponent() throws when it meets a % that is not followed by two hex digits, or a byte sequence that is not valid UTF-8 - examples include %GG, a lone %, or %2 at the end of the input. Fix the sequence (for example %2 should be %20) and decode again.",
      },
      {
        q: "Can I decode a whole URL at once?",
        a: "Yes, but it will decode the structural parts too, turning %2F in the path into / and potentially changing what the URL means. For breaking a URL into protocol, host, path, and parameters, use the URL Parser tool instead.",
      },
      {
        q: "Does this decode + as a space?",
        a: "Strict URI decoding leaves + as a literal plus sign, because + only means space in application/x-www-form-urlencoded form bodies. If your string came from a form POST, replace + with %20 first or encode it before decoding.",
      },
      {
        q: "Is a decoded value safe to inject into HTML or SQL?",
        a: "Decoding only recovers text - it performs no escaping for output contexts. Treat the result as untrusted input and apply the normal defenses (HTML entity encoding, parameterized queries) before using it.",
      },
    ],
  },

  "html-encode": {
    whatIs:
      "HTML encoding replaces characters that carry meaning in HTML markup - chiefly <, >, and & - with character references (entities) such as &lt;, &gt;, and &amp;. When the browser parses the document, it converts those references back to the literal characters, so the text displays exactly as written instead of being interpreted as tags. This matters whenever user-supplied or generated content is inserted into a page: without encoding, a string containing script markup could execute code, a vulnerability known as cross-site scripting (XSS). This tool encodes by serializing your text through the browser's own HTML serializer, which escapes exactly the characters browsers escape when they generate markup.",
    whyUse: [
      "Escapes &, <, and > using the browser's own serializer, so the output matches what real frameworks emit.",
      "Protects against cross-site scripting when you display user-generated text such as comments or profile fields.",
      "Leaves non-ASCII characters untouched, keeping encoded output readable instead of filling it with numeric codes.",
      "The DOM element doing the work lives in your page - nothing you enter is transmitted anywhere.",
      "One click to copy gives you a string that is safe to paste into templates, attributes, or documentation.",
    ],
    howToUse: [
      "Paste the plain text you need to escape into the Input (plain text) box.",
      "Click Encode.",
      "The HTML-encoded result appears in the read-only Output (HTML Encoded) box.",
      "Click Copy Output to copy the escaped string, or Clear to empty both fields.",
      "To convert entities back to readable text, open the related HTML Decoder listed below the editor.",
    ],
    examples: [
      {
        title: "Escaping tags and ampersands",
        input: '<p>Hello & World</p>',
        output: '&lt;p&gt;Hello &amp; World&lt;/p&gt;',
      },
      {
        title: "Comparison operators in code snippets",
        input: "if (a < b && c > d) keep",
        output: "if (a &lt; b &amp;&amp; c &gt; d) keep",
      },
      {
        title: "Plain text passes through unchanged",
        input: "café — only markup characters are escaped",
        output: "café — only markup characters are escaped",
      },
    ],
    useCases: [
      "Safely rendering user comments, forum posts, or review text inside a page without executing embedded markup.",
      "Documenting HTML or JSX code inside a blog post so the angle brackets display instead of vanishing.",
      "Escaping values before inserting them into HTML attribute strings built with JavaScript.",
      "Preparing text for RSS feeds and email templates where stray < or & breaks parsing.",
    ],
    faqs: [
      {
        q: "Does this tool escape double quotes for attributes?",
        a: "The browser serializer escapes &, <, and > but leaves straight double quotes and apostrophes as literal characters, which is correct for text nodes. If you are inserting the value into a quoted HTML attribute, also replace each double quote with the &quot; entity manually to avoid breaking out of the attribute.",
      },
      {
        q: "Is HTML encoding the same as HTML minifying?",
        a: "No. Encoding escapes special characters so they render as text; the HTML Formatter tool minifies or pretty-prints markup structure. Use encoding when you need to display code as content, and formatting when you need to restructure a document.",
      },
      {
        q: "Can I HTML-encode a whole page?",
        a: "This tool is for text fragments - it escapes characters, it does not parse documents. To indent, compress, or validate a full document, use the HTML Formatter, which understands tags, void elements, and nesting.",
      },
      {
        q: "Where does my text go when I click Encode?",
        a: "Nowhere. The encoder creates a hidden textarea inside the current page and serializes the string in memory; no network request carries your content.",
      },
    ],
  },

  "html-decode": {
    whatIs:
      "HTML decoding converts character references back into the characters they represent. HTML defines three forms: named entities like &amp; and &copy;, decimal numeric references like &#33;, and hexadecimal references like &#x1F600;. Parsers resolve all three while building the document tree, so what you see on screen is always the decoded text - the entities exist only in the source. Use this tool when content you copy from page source, an RSS feed, or an email shows raw entities instead of symbols. Decoding runs through the browser's own HTML parser, which ships with the complete entity table from the HTML Living Standard, including names like &hellip; and &mdash;.",
    whyUse: [
      "Understands all three entity forms: named, decimal numeric, and hexadecimal numeric references.",
      "Powered by the browser's real HTML parser, so support matches what production browsers will render.",
      "Turns unreadable markup fragments into plain text you can search, diff, or reuse.",
      "Parsing happens on a detached element in your tab - your markup is not sent to any server.",
      "Complements the encoder, letting you round-trip content and confirm nothing was lost.",
    ],
    howToUse: [
      "Paste HTML-encoded text into the Input (HTML Encoded) box.",
      "Click Decode.",
      "The readable text appears in the read-only Output (Decoded) box.",
      "Click Copy Output to copy the result, or Clear to reset both fields.",
      "Use the related HTML Encoder link below the editor when you need to escape text instead.",
    ],
    examples: [
      {
        title: "Named entity decoding",
        input: "&lt;p&gt;Hello &amp; goodbye&lt;/p&gt;",
        output: "<p>Hello & goodbye</p>",
      },
      {
        title: "Decimal numeric references",
        input: "&#72;&#101;&#108;&#108;&#111; World!",
        output: "Hello World!",
      },
      {
        title: "Symbol entities in running text",
        input: "Fish &amp; Chips &copy; 2026",
        output: "Fish & Chips © 2026",
      },
    ],
    useCases: [
      "Cleaning up text copied from a page view-source, where quotes and symbols appear as entities.",
      "Recovering readable content from RSS feeds or newsletters that encode punctuation.",
      "Checking whether a CMS or template double-encoded content before storing it.",
      "Turning escaped snippets in documentation back into code you can run.",
    ],
    faqs: [
      {
        q: "What is the difference between this and the HTML Encoder?",
        a: "The encoder goes from readable text to entities (& becomes &amp;) for safe insertion into markup; the decoder goes the other way, turning entities back into symbols. They are inverse operations, which makes it easy to verify a round trip.",
      },
      {
        q: "Why did some of my tags disappear?",
        a: "They should not: this tool decodes character references but does not strip or render tags. If your input contains a literal tag such as <b>, it passes through as text; if entities were used (&lt;b&gt;), they are decoded to the visible angle-bracket characters.",
      },
      {
        q: "Does it support numeric references for emoji?",
        a: "Yes. Both decimal (&#128512;) and hexadecimal (&#x1F600;) references resolve to the matching Unicode character, as long as the code point is valid. The browser parser handles the conversion for you.",
      },
      {
        q: "Will decoding fix double-encoded text?",
        a: "Only one layer is removed per run. If the content shows &amp;amp;, it was encoded twice - click Decode again to strip the second layer. Running it repeatedly is safe because plain text without entities passes through unchanged.",
      },
    ],
  },

  "image-to-base64": {
    whatIs:
      "Every file is just bytes, and Base64 lets those bytes travel as text. This tool reads your image with the browser's FileReader API and converts it into a data URI - the format data:image/png;base64,iVBORw0KGgo... - where a short MIME header identifies the image type and the remainder is the encoded file content. Data URIs let an image be embedded directly in HTML, CSS, or JSON without a separate network request, which is handy for icons and small assets. The conversion happens entirely inside your browser tab: the selected file is read from your disk into memory and is never transmitted anywhere. PNG, JPG, GIF, SVG, and WebP are supported up to 10 MB.",
    whyUse: [
      "Produces a complete data URI with the correct MIME type, ready to paste into an img src attribute or CSS url().",
      "The file never leaves your machine - FileReader works on the local File object in memory.",
      "Shows the filename, human-readable size, and a visual preview so you can confirm you picked the right asset.",
      "Supports every common web image format (PNG, JPG, GIF, SVG, WebP) up to 10 MB.",
      "Copy to clipboard or download the Base64 as a .txt file for version control and code review.",
    ],
    howToUse: [
      "Click the dashed upload area or drag and drop an image onto it (PNG, JPG, GIF, SVG, WebP; max 10 MB).",
      "Wait for the Converting... spinner to finish - the file is read locally with FileReader.",
      "Check the file card (name and size) and the image preview to confirm the right file.",
      "Read the full data URI in the Base64 Output box.",
      "Click Copy to Clipboard to grab it, Download as TXT to save it, or Clear to remove the file and output.",
    ],
    examples: [
      {
        title: "Small GIF becomes a data URI",
        input: "File: pixel.gif (a 1x1 GIF)",
        output:
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5... (the full string contains every byte of the file)",
      },
      {
        title: "JPG conversion shows Base64 size overhead",
        input: "File: hero.jpg (245 KB)",
        output:
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ... (245 KB of image becomes roughly 327 KB of text because Base64 expands data by 33%)",
      },
      {
        title: "Output structure of every conversion",
        input: "File: any-image.png",
        output:
          "data:image/png;base64,<MIME header> then the Base64 bytes; the header tells browsers and servers how to interpret the payload",
      },
    ],
    useCases: [
      "Inlining small logos, favicons, or illustrations in CSS to remove render-blocking asset requests.",
      "Embedding screenshots directly in JSON payloads, issue trackers, or markdown that only accepts text.",
      "Generating Base64 constants for mobile apps or embedded firmware that store images in code.",
      "Email templates and AMP pages that require images to be embedded rather than linked.",
    ],
    faqs: [
      {
        q: "Is my image uploaded to a server?",
        a: "No. The file input hands a local File object to FileReader, which reads it in the browser - there is no fetch, no form post, and no storage. You can verify this by watching the Network tab while converting.",
      },
      {
        q: "Why is the Base64 string so much bigger than my file?",
        a: "Base64 encodes 3 bytes as 4 characters, so text output is 4/3 (about 133%) the original size. A 245 KB image becomes roughly 327 KB of text; use it for small assets and keep large photos as normal files.",
      },
      {
        q: "Which image formats are supported?",
        a: "Anything the browser can read as an image: PNG, JPG/JPEG, GIF, SVG, and WebP are listed in the uploader, and the data URI header reflects the file's actual MIME type. Files larger than 10 MB are rejected to keep the browser responsive.",
      },
      {
        q: "How do I use the result in HTML or CSS?",
        a: "Paste the entire data URI as the value: an img tag src attribute in HTML, or background-image: url() in CSS. Because it is self-contained, no extra HTTP request is made for that asset.",
      },
    ],
  },

  "base64-to-image": {
    whatIs:
      "Base64 image data is simply the Base64 encoding of an image's raw bytes, usually prefixed with a data URI header such as data:image/jpeg;base64,. Decoding converts each Base64 quartet back into bytes, and this tool reassembles those bytes into a Blob that the browser can render in an img element. Because the result is ordinary image bytes, it can be previewed instantly and downloaded as a real file. The tool accepts both forms: a complete data URI, where the MIME type is detected from the header (jpg is normalized to jpeg), or a plain Base64 string, which is assumed to be PNG. The Blob is built in memory - nothing is uploaded.",
    whyUse: [
      "Accepts both full data URIs and plain Base64 strings, so pasted output from any source works.",
      "Renders an on-page preview immediately, confirming the data really is the image you expected.",
      "Download Image saves a real file (decoded-image.png) you can open in any viewer or re-upload.",
      "Malformed input reports a specific error instead of showing a broken image icon.",
      "Decoding happens locally via atob() and Blob - your image data stays on your device.",
    ],
    howToUse: [
      "Paste the Base64 image data into the Input box - either a full data URI or a plain Base64 string.",
      "Click Decode.",
      "If valid, the decoded picture appears in the Preview area below the buttons.",
      "Click Download Image to save it as decoded-image.png, or Clear to reset.",
      "Plain Base64 without a data URI header is treated as PNG; if your data is JPEG, include the header for correct rendering.",
    ],
    examples: [
      {
        title: "Data URI input (recommended)",
        input: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
        output:
          "Preview shows the original PNG; Download Image saves those exact bytes as decoded-image.png",
      },
      {
        title: "Plain Base64 string (assumed PNG)",
        input: "iVBORw0KGgoAAAANSUhEUgAA...",
        output:
          "Decoded as image/png (the default when no data URI header is present) and rendered in the preview pane",
      },
      {
        title: "Invalid data is reported, not rendered",
        input: "SGVsbG8sIFdvcmxkIQ==",
        output:
          "Error: the bytes decode to text (Hello, World!), not a valid image, so no preview is produced",
      },
    ],
    useCases: [
      "Recovering an actual image file from a Base64 string found in a database column or API response.",
      "Turning CSS or HTML data URIs back into PNG/JPG files you can edit in an image tool.",
      "Verifying that a screenshot embedded in a ticket or email really matches the claimed content.",
      "Saving logos delivered as Base64 inside JSON so they can be reused as standalone assets.",
    ],
    faqs: [
      {
        q: "My preview is blank - what went wrong?",
        a: "Either the Base64 is corrupted (check for missing padding or stray line breaks) or the MIME type is wrong. Plain strings are assumed to be PNG; if your data is JPEG or GIF, paste the full data:image/...;base64, header so the browser decodes it with the right type.",
      },
      {
        q: "What is the difference between this and the Base64 Decoder?",
        a: "The Base64 Decoder converts text to readable text and expects valid UTF-8 bytes. This tool converts Base64 to image bytes, which are not text at all - use it whenever the payload is a picture, and the text decoder for everything else.",
      },
      {
        q: "Does the downloaded file match the original image exactly?",
        a: "Yes. The tool rebuilds the original byte stream and wraps it in a Blob of the detected MIME type, so the downloaded file is byte-for-byte the image that was encoded - no re-compression is applied.",
      },
      {
        q: "Is my pasted image data secure here?",
        a: "The string is parsed with atob() inside your own tab and rendered from a local object URL. Nothing is transmitted, and closing the tab discards the data completely.",
      },
    ],
  },

  "uuid-generator": {
    whatIs:
      "A UUID (Universally Unique Identifier) is a 128-bit label standardized in RFC 4122, written as five hex groups separated by hyphens (8-4-4-4-12). Version 4 builds the identifier from a cryptographically secure random number generator, setting 122 bits - the version and variant bits are fixed per spec - which yields about 3.4 x 10^38 possible values. That makes accidental collisions effectively impossible for databases, session tokens, request IDs, and filenames, even across independent systems that never coordinate. This tool calls the Web Crypto API's crypto.randomUUID(), so every value is spec-compliant and safe for security-sensitive uses.",
    whyUse: [
      "Generated with crypto.randomUUID() from the Web Crypto API, a cryptographically secure source rather than a predictable PRNG.",
      "Batch generation (up to 100 at once) with per-row and copy-all buttons speeds up seeding test data.",
      "A built-in validator checks whether any string is a well-formed UUID v4.",
      "Values are minted in your browser tab; the process involves no network call.",
      "Standard hyphenated format drops straight into Postgres uuid columns, Mongo _id fields, and REST payloads.",
    ],
    howToUse: [
      "Set Count (1 to 100) in the number field next to the Generate button.",
      "Click Generate UUIDs to create the batch.",
      "Copy any single value with its Copy link, or grab every line with Copy All.",
      "Scroll to the UUID Validator section below the generator.",
      "Paste a UUID into the validator field and click Validate to see a valid or invalid banner.",
    ],
    examples: [
      {
        title: "Single UUID generation",
        input: "Count: 1, then click Generate UUIDs",
        output:
          "550e8400-e29b-41d4-a716-446655440000 (sample - yours will differ; every generation is random)",
      },
      {
        title: "Batch generation (5 UUIDs)",
        input: "Count: 5, then click Generate UUIDs",
        output:
          "550e8400-e29b-41d4-a716-446655440000\n6ba7b810-9dad-41d4-b167-446655440001\n7c9e6679-7425-40de-944b-e07fc1f90ae7\n8f14e45f-ea8e-4d6f-9b3c-2a1d0e5f7a90\n9b71d224-6e3f-4f8a-8c2e-1d4f6a8b0c33 (illustrative values in the correct v4 format)",
      },
      {
        title: "UUID validation",
        input: "550e8400-e29b-41d4-a716-446655440000",
        output: "Valid UUID v4 (green confirmation banner)",
      },
    ],
    useCases: [
      "Primary keys for database rows where sequential integers would leak record counts or invite enumeration.",
      "Idempotency keys and request IDs so distributed services can safely retry operations.",
      "Session identifiers, password reset tokens (combined with server-side hashing), and temporary file names.",
      "Seeding test fixtures and demo datasets with realistic, collision-free identifiers.",
    ],
    faqs: [
      {
        q: "Are these UUIDs cryptographically secure?",
        a: "Yes. The generator uses crypto.randomUUID(), which draws from the browser's secure random source, so values are unpredictable enough for session tokens and API keys. For passwords or high-value secrets, still combine them with server-side hashing and expiry.",
      },
      {
        q: "Can UUIDs collide?",
        a: "Theoretically yes, but with 122 random bits the birthday-bound probability is astronomically low - generating a billion UUIDs every second for a century would still almost certainly produce no repeat. Database uniqueness constraints remain good practice as a safety net.",
      },
      {
        q: "What is the difference between UUID versions?",
        a: "v1 is time-and-MAC based, v3 and v5 derive deterministically from a name and namespace (MD5 or SHA-1), v4 is fully random (what this tool makes), and v6/v7 add sortable time prefixes. For general-purpose identifiers, v4 is the common default; v7 is gaining ground when you need time ordering.",
      },
      {
        q: "Why does the validator say my UUID is invalid?",
        a: "The string must match the 8-4-4-4-12 hyphenated hex pattern. Braces, urn:uuid: prefixes, or the compact 32-hex form without hyphens are rejected - normalize the value first.",
      },
    ],
  },

  "password-generator": {
    whatIs:
      "A password generator combines characters from selected sets and shuffles them using a cryptographically secure random source, producing a passphrase-grade secret in milliseconds. The strength comes from two factors: length and entropy. Each selected character class expands the alphabet - for example 26 letters, 26 capitals, 10 digits, and 32 symbols gives 94 symbols, or about 6.55 bits per character - so a 16-character password from the full set carries roughly 105 bits of entropy, far beyond what offline cracking can reach. This tool uses crypto.getRandomValues(), never repeats its output pattern, and estimates strength from entropy thresholds so you can see Weak through Strong in real time.",
    whyUse: [
      "Crypto-secure randomness from the Web Crypto API - characters come from getRandomValues(), not Math.random().",
      "Length slider from 4 to 128 characters covers everything from a Wi-Fi PIN to a maximum-entropy passphrase.",
      "Four independent character-set toggles let you meet site rules (symbols required, no symbols allowed, digits only).",
      "Live strength labels (Weak, Fair, Good, Strong) reflect real entropy math rather than naive length checks.",
      "Runs fully offline - the password exists only in this tab until you copy it.",
    ],
    howToUse: [
      "Adjust the length slider (default 16; range 4-128) to your target.",
      "Tick the checkboxes for Uppercase, Lowercase, Numbers, and Symbols to define the allowed character sets.",
      "Click Generate Password to create a new value.",
      "Check the strength label (Weak/Fair/Good/Strong) below the field - lengthen the password if it is not Strong.",
      "Click Copy to place the password on your clipboard, then Clear to remove it from the screen.",
    ],
    examples: [
      {
        title: "Default 16-character password",
        input: "Length 16, all four character sets enabled",
        output:
          "k7$Rm2!pQx9Lw#Tn (sample - every generation is different; the exact characters are random)",
      },
      {
        title: "Digits-only PIN",
        input: "Length 6, only Numbers enabled",
        output:
          "481920 (illustrative - six random digits; ~19.9 bits of entropy, suitable for short-lived PINs only)",
      },
      {
        title: "Maximum-entropy passphrase",
        input: "Length 64, all sets enabled",
        output:
          "Hy3&vK...64 random characters total (about 419 bits of entropy - far stronger than any human-memorable password)",
      },
    ],
    useCases: [
      "Creating unique credentials for every account so one breach never unlocks your other services.",
      "Generating API tokens, database passwords, and .env secrets during project setup.",
      "Building high-entropy salts or seed strings for tests and infrastructure automation.",
      "Satisfying strict site policies (must include symbols / must not include ambiguous characters) via the set toggles.",
    ],
    faqs: [
      {
        q: "Is this password safe to use?",
        a: "Yes, provided you copy it into a password manager rather than chat or email. The randomness comes from the browser's secure generator, and the value is never sent anywhere - the main risk is how you transport it, not how it was made.",
      },
      {
        q: "How long should my password be?",
        a: "For accounts, 16 characters with all sets enabled is a solid default (~105 bits). For service accounts and API keys, go longer (32+). Length dominates strength: each extra character adds ~6.5 bits, which multiplies the attacker's work.",
      },
      {
        q: "Why is my password still rated Weak?",
        a: "The label is computed from entropy, so it usually means the length is short or too few character sets are enabled. Enable all four sets and move the slider past 12 characters to reach Good or Strong.",
      },
      {
        q: "Can I disable ambiguous characters like l, 1, O, 0?",
        a: "The tool's sets are the four standard classes (A-Z, a-z, 0-9, and a symbol set including !@#$%^&*()_+-=[]{}|;:,.<>?). If you need a confusion-free password, generate one with all sets and swap the ambiguous characters by hand, or increase the length instead - entropy recovers the loss.",
      },
    ],
  },

  "hash-generator": {
    whatIs:
      "A cryptographic hash function maps input of any length to a fixed-size digest: SHA-1 produces 160 bits, SHA-256 produces 256 bits, and SHA-512 produces 512 bits, each rendered as lowercase hex. Hashes are deterministic (the same input always gives the same digest), one-way (recovering the input from the digest is computationally infeasible), and collision-resistant (finding two inputs with the same digest is impractical). You verify integrity by re-hashing a file or string and comparing digests. This tool implements SHA-1, SHA-256, and SHA-512 using the Web Crypto API's crypto.subtle.digest(), which is async, secure, and available in every modern browser.",
    whyUse: [
      "SHA-256 and SHA-512 via the browser's native crypto.subtle.digest() - no JavaScript crypto library shipped over the wire.",
      "SHA-1 included for compatibility with legacy checksums and git object identifiers (never for passwords or signatures).",
      "UTF-8 encoding is applied before hashing, so the same text hashes identically across platforms.",
      "Choose the algorithm per row; digests appear side by side for direct comparison.",
      "Hashing happens in your tab - inputs and digests are not logged by any server.",
    ],
    howToUse: [
      "Type or paste the text to hash into the Input text area.",
      "Tick the checkboxes for SHA-1, SHA-256, and SHA-512 (any combination).",
      "Click Generate Hashes.",
      "Each selected algorithm shows its hex digest on its own row with a Copy link.",
      "Click Copy All to grab every algorithm and digest at once, or Clear to reset.",
    ],
    examples: [
      {
        title: "SHA-256 of a single word",
        input: "hello",
        output:
          "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
      },
      {
        title: "SHA-1 of the same input (for comparison)",
        input: "hello",
        output: "aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d",
      },
      {
        title: "SHA-512 shows the 128-hex-digit digest",
        input: "hello",
        output:
          "9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043",
      },
    ],
    useCases: [
      "Verifying file integrity: hash a download once and confirm future copies produce the same digest.",
      "Comparing git commit hashes and package-lock integrity fields when troubleshooting builds.",
      "Looking up known-password hashes in Have I Been Pwned style tools (hash the candidate locally first).",
      "Building deterministic cache keys or content identifiers where the input must map to a stable value.",
    ],
    faqs: [
      {
        q: "Why does hashing say it is not working in insecure contexts?",
        a: "crypto.subtle is only exposed on secure origins (https:// or localhost). If the page is served over plain HTTP from a LAN address or file URL, the API is undefined and the tool reports an error - serve the site over HTTPS to fix it.",
      },
      {
        q: "Can I hash MD5 or other algorithms?",
        a: "Not with this tool - it offers SHA-1, SHA-256, and SHA-512, which is what the Web Crypto API provides natively. MD5 is broken for security purposes anyway; if you need its checksum behavior for a legacy format, use a dedicated MD5 utility.",
      },
      {
        q: "Is hashing the same as encrypting?",
        a: "No. Encryption is designed to be reversed with a key, while hashing is designed to be one-way - you can verify a hash matches a known input, but you cannot recover the input from the digest. That is why passwords should be stored as hashes (ideally bcrypt or Argon2, not plain SHA-256).",
      },
      {
        q: "Why does the same input give a different digest in another tool?",
        a: "Check the encoding first. This tool hashes UTF-8 bytes, so accented characters or emoji may hash differently in tools that assume Latin-1. Also confirm the algorithm and that there is no hidden trailing newline in your input.",
      },
    ],
  },

  "lorem-ipsum": {
    whatIs:
      "Lorem ipsum is placeholder text derived by Cicero's philosophical work De finibus bonorum et malorum, scrambled in the 1500s by an unknown typesetter and standardized in the 1980s by Letraset. Its value is statistical: the distribution of letters in lorem ipsum approximates natural English, so layouts show a realistic text mass without the distraction of meaningful copy. This generator produces standard lorem ipsum paragraphs (starting Lorem ipsum dolor sit amet...), sentences, or word counts using a seeded word pool, so you can fill wireframes, mockups, and CMS templates with content that has the right shape before real writing exists.",
    whyUse: [
      "Three generation modes - paragraphs, sentences, and raw words - matched by a single Type selector.",
      "Counts up to 100 paragraphs or sentences and 10,000 words, enough to stress-test layouts with realistic volume.",
      "Classic Lorem ipsum distribution keeps line lengths and word shapes representative of real English.",
      "Copy All puts the entire generated block on the clipboard for pasting into Figma, HTML, or docs.",
      "Generation is instant and local - no text service is contacted, so draft content stays private.",
    ],
    howToUse: [
      "Choose Type: paragraphs, sentences, or words.",
      "Set Count (1-100 for paragraphs and sentences, 1-10000 for words).",
      "Click Generate Lorem Ipsum.",
      "Read the result in the output area below.",
      "Click Copy All to copy the text, or Clear to empty the output.",
    ],
    examples: [
      {
        title: "5 words",
        input: "Type: words, Count: 5",
        output: "lorem ipsum dolor sit amet",
      },
      {
        title: "2 sentences",
        input: "Type: sentences, Count: 2",
        output:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        title: "1 paragraph",
        input: "Type: paragraphs, Count: 1",
        output:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
    ],
    useCases: [
      "Filling dashboard, blog, and landing-page mockups with text blocks that have realistic density.",
      "Testing responsive typography and line-length behavior before copywriting is finished.",
      "Creating bulk sample data for CMS migrations and design-system component galleries.",
      "Showing a client a layout in a language-neutral way without premature wording debates.",
    ],
    faqs: [
      {
        q: "What does lorem ipsum actually say?",
        a: "Nothing - it is intentionally unreadable Latin from Cicero's De finibus, with words scrambled so readers do not get absorbed in the meaning. The point is visual texture: correct letter frequencies, word lengths, and paragraph rhythm without real content.",
      },
      {
        q: "Is lorem ipsum good for SEO?",
        a: "No. Search engines treat it as boilerplate, and pages full of it can look thin or unfinished. Use it only in staging or design phases and replace it with real copy before launch - leaving lorem ipsum live is a classic content-quality red flag.",
      },
      {
        q: "Can I change the starting text?",
        a: "The output always begins with the standard Lorem ipsum dolor sit amet opening when generating paragraphs or sentences, which keeps blocks consistent across mockups. Edit the pasted text in your design tool if you need a different opening line.",
      },
      {
        q: "Is there a risk of copyright issues?",
        a: "No. Lorem ipsum has been in public use for centuries, and its text carries no trademark or licensing restrictions - it is safe for commercial mockups and documentation.",
      },
    ],
  },

  "random-color": {
    whatIs:
      "A random color is simply a point chosen somewhere in a color space. This generator draws six colors at once and presents each one in three equivalent notations: HEX (#3366CC, a compact web standard), RGB (RGB(51,102,204), separate red/green/blue channels), and HSL (HSL(220, 60%, 50%), hue-saturation-lightness - the model designers prefer because its sliders behave intuitively). Converting between the models is pure arithmetic on the same underlying color. Clicking any swatch goes further: it derives a 10-step palette from that color by sweeping lightness from 10% to 82% while keeping hue and saturation fixed, giving you a usable tonal ramp instantly.",
    whyUse: [
      "Six independent colors per click, each with HEX, RGB, and HSL values side by side for direct copy.",
      "Clicking a swatch builds a 10-step lightness ramp (10% to 82%) - a ready-made tonal palette from one seed color.",
      "Exact conversions between HEX, RGB, and HSL so the notation you need is always available.",
      "Every value is copyable with one click, and each swatch shows a live contrast indicator.",
      "Runs in the browser with no accounts or asset pipeline - pure client-side generation.",
    ],
    howToUse: [
      "Click Generate Random Colors to fill six color cards.",
      "Note each card's HEX, RGB, and HSL values; click any code snippet or the Copy HEX link to copy it.",
      "Click a color swatch to derive a 10-step palette from it (lightness sweep, same hue and saturation).",
      "Click any palette swatch to copy that tint's HEX value.",
      "Repeat Generate to redraw the set whenever you need fresh options.",
    ],
    examples: [
      {
        title: "Converting one color between models",
        input: "#3366CC",
        output: "RGB(51, 102, 204) - HSL(220, 60%, 50%)",
      },
      {
        title: "Derived palette structure",
        input: "Click the #3366CC swatch",
        output:
          "A 10-step ramp from HSL(220, 60%, 10%) up to HSL(220, 60%, 82%) - darkest shadow tone to lightest tint, all sharing one hue",
      },
      {
        title: "Regenerate for a new batch",
        input: "Click Generate Random Colors again",
        output:
          "Six entirely new colors with their own HEX/RGB/HSL triples; previous values are replaced",
      },
    ],
    useCases: [
      "Exploring accent colors for a landing page, brand mark, or app theme during early design passes.",
      "Building tonal ramps for UI states (hover, pressed, disabled) from a single seed color.",
      "Generating test palettes for charts, heatmaps, and data visualizations.",
      "Teaching or demonstrating color-model conversions with real, immediately verifiable numbers.",
    ],
    faqs: [
      {
        q: "How are the colors actually chosen?",
        a: "The generator picks random values within the color space and rounds them to clean HEX and HSL numbers. Because the results are unconstrained, some pairs may clash - click a swatch to open its derived palette when you want harmonious, controlled tones instead of pure randomness.",
      },
      {
        q: "Which notation should I use - HEX, RGB, or HSL?",
        a: "Use HEX for CSS and design tokens (compact and universally supported), RGB when you need channel math or alpha compositing, and HSL while exploring - adjusting lightness up or down predictably produces lighter or darker variants of the same color.",
      },
      {
        q: "How do I know a color has enough contrast?",
        a: "Use the lightness sweep: steps around 10-30% are safe on white backgrounds, while 60-82% steps work on dark backgrounds. For compliance-grade checks (WCAG AA/AAA), pair the chosen color with your background in a contrast checker tool.",
      },
      {
        q: "Are these colors saved between visits?",
        a: "No. Each session starts fresh and nothing is persisted or transmitted - colors are generated locally, so feel free to experiment with confidential brand colors.",
      },
    ],
  },

  "qr-code-generator": {
    whatIs:
      "A Quick Response (QR) code is a two-dimensional matrix barcode defined by ISO/IEC 18004. It encodes data in a grid of black and white modules using Reed-Solomon error correction, which lets the code remain readable even if part of it is damaged or obscured - higher correction levels (L, M, Q, H) tolerate 7%, 15%, 25%, or 30% damage respectively. Quiet zones, alignment patterns, and format-information bits make the symbol robust to rotation and partial occlusion. This tool converts your text into a QR matrix client-side with the qrcode library (version 40 capacity: up to 7,089 numeric, 4,296 alphanumeric, or 2,953 bytes at level L) and renders it as a downloadable PNG.",
    whyUse: [
      "Text, URLs, Wi-Fi credentials, or contact cards converted to a scannable QR entirely in your browser.",
      "Size options (128, 256, 512 px) and foreground/background color pickers let you match the code to its placement.",
      "Error-correction level M is set by default - a balanced choice that survives minor print damage while holding more data.",
      "Download PNG exports a crisp raster image at the chosen size, ready for print or slides.",
      "Nothing is uploaded: the encoder runs locally with margin 2 quiet zone, so codes for private links stay private.",
    ],
    howToUse: [
      "Type or paste the content (URL, text, Wi-Fi payload) into the content text area.",
      "Pick a Size: small (128 px), medium (256 px), or large (512 px).",
      "Optionally change the foreground and background colors with the two color inputs.",
      "Click Generate to render the QR code below the form.",
      "Use Download PNG to save the file, Copy Image to put it on the clipboard, or Clear to reset.",
    ],
    examples: [
      {
        title: "Website URL",
        input: "https://example.com/products",
        output:
          "A QR matrix at the selected size; scanning opens https://example.com/products in a phone camera browser",
      },
      {
        title: "Plain text payload",
        input: "Wifi:T:WPA;P:secret123;S:MyNetwork;;",
        output:
          "A scannable code that phone Wi-Fi scanners read as a network join prompt (standard Wi-Fi QR format)",
      },
      {
        title: "Size and color customization",
        input: "Size: large (512 px), black on white",
        output:
          "A 512 px PNG with a margin-2 quiet zone - high enough resolution for print at roughly 1.3 inches",
      },
    ],
    useCases: [
      "Printed codes on packaging, menus, posters, and business cards linking to a URL or payment page.",
      "Sharing Wi-Fi credentials in offices and Airbnbs without spelling out the passphrase.",
      "Event check-in links, contact cards (vCard payloads), and product documentation.",
      "Generating offline-friendly codes for slides and PDFs where clickable links will not work.",
    ],
    faqs: [
      {
        q: "How much data can a QR code hold?",
        a: "Capacity depends on version and error correction: a version-40 code holds up to 7,089 numeric, 4,296 alphanumeric, or 2,953 bytes at level L. The default level M trades some capacity for 15% damage tolerance, which is usually the right balance for real-world printing.",
      },
      {
        q: "Will my QR code expire?",
        a: "Not by itself - the code is a static encoding of whatever text you entered. The link it points to can expire, though; for long-lived print, redirect through a URL you control so the destination can change later.",
      },
      {
        q: "Can I scan it without an app?",
        a: "Yes. Modern phone cameras (iOS Camera, Google Camera, and most Android camera apps) detect QR codes natively and offer to open the payload. Dedicated scanner apps help with unusual payload types like Wi-Fi or vCard.",
      },
      {
        q: "Why is my code hard to scan?",
        a: "Common causes are low contrast, a missing quiet zone (keep the blank margin around the code), printing it too small, or a glossy reflection. This generator keeps a margin of 2 modules and warns when colors are too close - stick to dark modules on a light background for reliability.",
      },
    ],
  },

  "json-formatter": {
    whatIs:
      "JSON (JavaScript Object Notation, RFC 8259) is a text data-interchange format built from six constructs: objects {}, arrays [], strings in double quotes, numbers, booleans, and null. Formatting (pretty-printing) inserts whitespace and line breaks without changing meaning, making nested structures readable; minifying strips all optional whitespace for smaller payloads. This tool does both, plus validation - it parses the input with JSON.parse() and, on success, reports the line count and the number of keys so you can gauge structure size. Because formatting and parsing are standard, round-tripping a document through this tool is lossless for data (though key order and number formatting may normalize).",
    whyUse: [
      "Format, Minify, and Validate in one place - all three operate on the same input with a single click.",
      "Indentation choices (2 spaces, 4 spaces, 8 spaces, Tab) match any team's style guide.",
      "Live stats banner shows line count and key count after formatting, useful for spotting unexpectedly large payloads.",
      "Validation pinpoints failures with the parser's position information instead of a vague error.",
      "Everything runs through native JSON.parse()/JSON.stringify() in your browser - API bodies stay on your machine.",
    ],
    howToUse: [
      "Paste your JSON into the input text area.",
      "Choose an indent style: 2 spaces (default), 4 spaces, 8 spaces, or Tab.",
      "Click Format to pretty-print, Minify to compress, or Validate to check syntax only.",
      "Read the result plus the Lines and Keys stats banner below the buttons.",
      "Click Copy to copy the output, or Clear to reset the editor.",
    ],
    examples: [
      {
        title: "Pretty-print with 2-space indent",
        input: '{"users":[{"id":1,"name":"Alice","active":true}]}',
        output:
          '{\n  "users": [\n    {\n      "id": 1,\n      "name": "Alice",\n      "active": true\n    }\n  ]\n}',
      },
      {
        title: "Minify for transmission",
        input:
          '{\n  "id": 1,\n  "name": "Alice",\n  "tags": ["admin", "user"]\n}',
        output: '{"id":1,"name":"Alice","tags":["admin","user"]}',
      },
      {
        title: "Validation failure message",
        input: '{"name": "John", "age": 30,}',
        output:
          "Invalid JSON at position 27. (trailing commas are not allowed in JSON, unlike JavaScript object literals)",
      },
    ],
    useCases: [
      "Prettifying API responses in Postman, curl output, or browser DevTools before reading them.",
      "Minifying JSON configuration files and payloads to reduce transfer size.",
      "Auditing unfamiliar configuration blobs - key count and nesting become visible at a glance.",
      "Normalizing JSON before committing it so diffs show only semantic changes.",
    ],
    faqs: [
      {
        q: "What is the difference between the JSON Formatter and JSON Validator?",
        a: "The formatter both parses and rewrites your document (pretty-print or minify), while the validator only checks syntax and reports whether it is valid - it never alters your input. Use the validator when you need a yes/no answer without touching the text.",
      },
      {
        q: "Why does formatting say my JSON is invalid?",
        a: "JSON.parse() is strict: single quotes for strings, comments, trailing commas, unquoted keys, and NaN/Infinity are all rejected even though JavaScript allows them. The position number in the error tells you where parsing stopped.",
      },
      {
        q: "Does formatting change my data?",
        a: "Not semantically - values, types, and nesting are preserved exactly. Two normalizations can appear: key order follows the original insertion order as parsed, and some number representations (like 1.0) may be emitted as 1.",
      },
      {
        q: "Is there a size limit?",
        a: "There is no artificial cap; practical limits come from your browser's memory (large multi-megabyte documents may take a moment to parse). For very large files, format them on your machine with jq or a code editor instead.",
      },
    ],
  },

  "json-validator": {
    whatIs:
      "JSON validation checks that a document conforms to RFC 8259 before it reaches a parser that might fail at the worst moment. The validator runs the input through JSON.parse(), which enforces the full grammar: double-quoted keys and strings, no trailing commas, no comments, correct nesting of objects and arrays, and literal true/false/null. On success it confirms validity and echoes nothing else; on failure it reports the character position where parsing stopped, which is usually enough to jump straight to the bug. Validating early is cheap insurance - it catches malformed payloads from string concatenation, hand-edited configuration, and truncated API responses.",
    whyUse: [
      "Instant pass/fail on any JSON document using the browser's strict RFC 8259 parser.",
      "Error messages include the exact character position (for example Invalid JSON at position 27).",
      "Read-only workflow - the validator never reformats or rewrites your input, unlike a formatter.",
      "Catches the classic offenders: trailing commas, single quotes, comments, and unquoted keys.",
      "Validation runs locally, so credentials and private payloads in your JSON are never transmitted.",
    ],
    howToUse: [
      "Paste the JSON you want to check into the input text area.",
      "Click Validate.",
      "A green banner confirms Valid JSON if the document parses.",
      "If it is invalid, a red banner shows the parser error and the character position where it failed.",
      "Click Clear to empty the input and dismiss the result.",
    ],
    examples: [
      {
        title: "Valid document",
        input: '{"name": "John", "age": 30, "active": true}',
        output: "Valid JSON",
      },
      {
        title: "Trailing comma rejected",
        input: '{"name": "John", "age": 30,}',
        output:
          "Invalid JSON at position 27. (JSON does not allow a comma after the last property)",
      },
      {
        title: "Single quotes rejected",
        input: "{'name': 'John'}",
        output:
          "Invalid JSON at position 2. (keys and string values must use double quotes)",
      },
    ],
    useCases: [
      "Checking API request/response bodies before wiring them into code or test suites.",
      "Verifying configuration files (package.json, tsconfig.json, CI configs) after manual edits.",
      "Troubleshooting data exports and webhooks where one bad character breaks ingestion.",
      "Teaching teams the concrete differences between JSON and JavaScript object syntax.",
    ],
    faqs: [
      {
        q: "What is the difference between the JSON Validator and JSON Formatter?",
        a: "The validator only reports whether your JSON is valid and never changes it - ideal for quick checks on content you must keep verbatim. The formatter additionally pretty-prints or minifies the document, so it is the tool when you want corrected whitespace as well.",
      },
      {
        q: "My JSON says invalid but it looks fine - why?",
        a: "The usual culprits are invisible: a trailing comma, single quotes, a JavaScript comment, an unquoted key, or a smart quote pasted from a document. The position number in the message points to the exact character; inspect around it first.",
      },
      {
        q: "Does it validate against a schema?",
        a: "No - this checks syntax only (is it parseable JSON at all?), not structure (do the fields match your expected schema with correct types?). For schema validation, use a dedicated tool with a JSON Schema draft definition.",
      },
      {
        q: "Is very large JSON supported?",
        a: "Yes, subject to your browser's memory. Parsing is done natively, so multi-megabyte documents work but may take a brief moment; if the tab runs out of memory, validate the file in slices or with a command-line tool.",
      },
    ],
  },

  "xml-formatter": {
    whatIs:
      "XML (eXtensible Markup Language, W3C recommendation) is a strict, tag-based format for structured data: every opening tag needs a matching closing tag, attributes must be quoted, and documents must be well-formed to parse at all. Formatting indents the nested elements so hierarchy is visible; minifying removes whitespace between tags for compact transport. This tool does both, plus validation - it parses the input and reports element statistics (total tags and maximum nesting depth) when the document is well-formed, or a specific defect when it is not, such as mismatched or unclosed tags. Unlike JSON, XML errors usually name the tag involved, making repair straightforward.",
    whyUse: [
      "Format, Minify, and Validate in one editor with your choice of indentation.",
      "Validation reports tags and max depth on success, and pinpoints mismatched or unclosed tags on failure.",
      "Supports attributes, self-closing tags, comments, and text content the way a real XML parser does.",
      "Whitespace-only changes are safe: formatting never alters element order, attributes, or text.",
      "Runs locally through the browser's DOMParser - configuration files and payloads stay on your machine.",
    ],
    howToUse: [
      "Paste your XML document into the input text area.",
      "Choose the indent size (2 or 4 spaces, or Tab).",
      "Click Format to pretty-print, Minify to compress whitespace, or Validate to check well-formedness.",
      "On success, the banner shows Valid XML with the tag count and maximum depth; on failure it names the problem.",
      "Click Copy to copy the output, or Clear to reset the editor.",
    ],
    examples: [
      {
        title: "Pretty-print a flat structure",
        input: '<root><item key="value">Content</item></root>',
        output:
          '<root>\n  <item key="value">Content</item>\n</root>',
      },
      {
        title: "Minify for transport",
        input: '<root>\n  <item>Content</item>\n  <flag/>\n</root>',
        output: '<root><item>Content</item><flag/></root>',
      },
      {
        title: "Validation catches a tag mismatch",
        input: "<root><item></root>",
        output:
          "Mismatched tags: expected </item> but found </root>. (each element must close inside its parent)",
      },
    ],
    useCases: [
      "Reading and reviewing SOAP payloads, RSS/Atom feeds, and Sitemap files that arrive as dense single lines.",
      "Tidying configuration documents (pom.xml, build configs, Android manifests) before committing.",
      "Debugging XML generation code by validating output as soon as templates change.",
      "Preparing compact XML for systems that treat whitespace between elements as insignificant.",
    ],
    faqs: [
      {
        q: "What is the difference between XML and HTML formatting?",
        a: "XML requires strict well-formedness - every tag closes (or self-closes), attributes are quoted, and case matters - while HTML tolerates unclosed tags and implicit structure. The XML Formatter enforces XML rules; the HTML Formatter handles real-world markup with void elements such as img and br.",
      },
      {
        q: "Why does validation report unclosed tags?",
        a: "Every opening tag needs a matching closing tag in the correct nesting order. A document like <root><item> leaves <item> open, so the parser reports Unclosed tags: root (or item) - add the missing closing tag and validate again.",
      },
      {
        q: "Does formatting change my data?",
        a: "No. Only whitespace between elements is added or removed; element names, attribute values, text content, CDATA sections, and entity references are preserved exactly. If your application is one of the rare cases where inter-element whitespace matters, compare before and after with Minify.",
      },
      {
        q: "Does it check against an XSD schema?",
        a: "No - validation here means well-formedness (is it structurally parseable?), not schema validity (do the elements and types match a contract?). For XSD or DTD validation, use a schema-aware tool.",
      },
    ],
  },

  "sql-formatter": {
    whatIs:
      "SQL formatting normalizes query text by placing major clauses (SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, JOIN) on their own lines and aligning expressions for readability. Minifying compresses a query to its barest form by stripping comments and collapsing whitespace - useful for embedding statements in application code. Validation performs a lightweight structural check: balanced parentheses, quotes, and brackets. That catches the errors that account for most hand-written SQL mistakes (an unclosed paren or an odd number of quotes) without pretending to be a full parser. This tool supports standard SQL plus MySQL, PostgreSQL, and SQLite dialect preferences.",
    whyUse: [
      "Four dialect options (standard, MySQL, PostgreSQL, SQLite) so keywords and idiom match your database.",
      "Format, Minify, and Validate from one editor - switch between presentation styles instantly.",
      "Validation reports concrete balance errors, e.g. Mismatched parentheses: 1 opening vs 0 closing.",
      "Comment stripping in minify mode (-- and block comments) removes noise from production payloads.",
      "Queries are processed locally; connection strings and data embedded in literals never leave the tab.",
    ],
    howToUse: [
      "Paste your SQL statement into the input text area.",
      "Select the dialect: standard, MySQL, PostgreSQL, or SQLite.",
      "Click Format to lay out the query, Minify to compress it, or Validate to check structure.",
      "Read the result (or the validation report) in the output area below.",
      "Click Copy to copy the statement, or Clear to reset the editor.",
    ],
    examples: [
      {
        title: "Clause-per-line formatting",
        input: "select id, name from users where active = 1 order by name",
        output:
          "SELECT id,\n  name\nFROM users\nWHERE active = 1\nORDER BY name",
      },
      {
        title: "Minified output for embedding",
        input: "SELECT id, name\nFROM users\nWHERE active = 1",
        output: "SELECT id, name FROM users WHERE active = 1",
      },
      {
        title: "Validation error on unbalanced input",
        input: "SELECT id FROM users WHERE (active = 1",
        output:
          "Mismatched parentheses: 1 opening vs 0 closing. (close the group before running the query)",
      },
    ],
    useCases: [
      "Cleaning up long ORM-generated or hand-written queries before code review.",
      "Minifying statements for inclusion in stored-procedure scripts or migration files.",
      "Quick structural checks before pasting a query into a production console.",
      "Standardizing query style across a team by choosing one dialect and indent preset.",
    ],
    faqs: [
      {
        q: "Is this a real SQL parser?",
        a: "No. Validation checks balance of parentheses, quotes, and brackets - the checks that catch most manual editing mistakes - but it does not parse SQL grammar, so it will not catch an unknown column name or wrong clause order. Always test the query against your database.",
      },
      {
        q: "Why did formatting change my keywords to uppercase?",
        a: "The formatter normalizes clause keywords (SELECT, FROM, WHERE...) for a consistent look. Identifiers - table and column names - are left as written, so your schema casing is never altered.",
      },
      {
        q: "What is the difference between Format and Minify?",
        a: "Format adds line breaks and indentation for human reading; Minify strips comments and collapses whitespace into a single line for storage or transport. Both preserve the query's meaning - neither executes anything.",
      },
      {
        q: "Which dialect should I pick?",
        a: "Choose the one matching your database (PostgreSQL, MySQL, or SQLite). The standard option is a neutral baseline; differences mostly affect keyword handling and operators. The choice never rewrites vendor-specific syntax in your query.",
      },
    ],
  },

  "html-formatter": {
    whatIs:
      "HTML formatting restructures a document's whitespace: formatting indents nested elements so the tree is scannable, while minifying collapses everything onto fewer lines to reduce bytes sent to the browser. Both operate on markup text using HTML's rules - notably void elements like img, br, and input never take closing tags, and attributes may be unquoted in lenient parsing. Validation here checks that every non-void tag opens and closes the same number of times, reporting mismatches like Tag <p> appears 1 time(s) but is closed 0 time(s). That catches unclosed tags, the single most common cause of broken page layout, without needing a full document model.",
    whyUse: [
      "Format, Minify, and Validate from one editor with configurable indentation.",
      "Validation knows HTML void elements, so <img> and <br> are not falsely flagged as unclosed.",
      "Mismatch reports name the tag and the counts (opened vs closed), so the fix is obvious.",
      "Minify removes whitespace between tags to cut page weight while preserving rendered output.",
      "Processing is local: templates, drafts, and any embedded content stay in the browser.",
    ],
    howToUse: [
      "Paste your HTML into the input text area.",
      "Choose the indent size (2 or 4 spaces, or Tab).",
      "Click Format to indent the document, Minify to compress it, or Validate to check tag balance.",
      "On success the banner reports the number of tags found; on failure it names the unbalanced tag.",
      "Click Copy to copy the result, or Clear to reset the editor.",
    ],
    examples: [
      {
        title: "Indent a nested fragment",
        input: "<div><p>Hello World</p><img src=\"logo.png\"></div>",
        output:
          "<div>\n  <p>Hello World</p>\n  <img src=\"logo.png\">\n</div>",
      },
      {
        title: "Minify before sending",
        input: "<div>\n  <p>Hello</p>\n</div>",
        output: "<div><p>Hello</p></div>",
      },
      {
        title: "Validation catches an unclosed tag",
        input: "<div><p>Hello</div>",
        output:
          "Tag <p> appears 1 time(s) but is closed 0 time(s). (add </p> before </div>)",
      },
    ],
    useCases: [
      "Readable diffs of templates and component markup in version control.",
      "Minifying server-rendered HTML fragments to trim bandwidth on high-traffic pages.",
      "Auditing hand-edited markup for unclosed tags before deploying.",
      "Prettifying HTML copied from email builders, page sources, or generated output.",
    ],
    faqs: [
      {
        q: "What is the difference between this and the HTML Encoder?",
        a: "The formatter restructures markup (indentation, whitespace, balance checks); the encoder escapes special characters like < and & so plain text can be displayed safely. Formatting treats your input as HTML structure, encoding treats it as text content.",
      },
      {
        q: "Why does minifying my HTML change nothing?",
        a: "If the input is already on one line with minimal whitespace, there is nothing left to remove - minify only strips optional whitespace between tags and inside text nodes. Note that stripping whitespace can alter rendering where spaces are significant (inline text with line breaks).",
      },
      {
        q: "Does validation detect nesting errors?",
        a: "It checks that each tag's open and close counts match, which catches unclosed and extra tags. It does not enforce a full content model (block elements inside inline elements, duplicate ids, and similar issues still need a linter or validator service).",
      },
      {
        q: "Will formatting break my page?",
        a: "No. Only whitespace between tags changes; attributes, text, and structure are untouched. The exception is pre or textarea content, where whitespace is meaningful - check those areas after reformatting.",
      },
    ],
  },

  "css-minifier": {
    whatIs:
      "CSS minification removes everything the parser does not need: comments, indentation, line breaks, trailing semicolons, and optional whitespace around selectors and properties. A rule like .card { margin: 0; padding: 20px; } becomes .card{margin:0;padding:20px}, which renders identically because CSS treats whitespace between declarations as insignificant. Across stylesheets, this routinely trims 20-40% of bytes, directly reducing load time on first visit. This tool also beautifies (re-indents) and validates: it counts selectors and properties found in the document and checks that curly braces balance, reporting errors like Mismatched braces: 1 opening vs 0 closing.",
    whyUse: [
      "Minify, Beautify, and Validate in one editor - switch between compact and readable forms freely.",
      "Validation reports selector and property counts plus concrete brace-balance errors.",
      "Whitespace-only transformations preserve cascade order and specificity, so rendering never changes.",
      "Beautify restores readable indentation for auditing minified vendor CSS.",
      "Processing is entirely local - theme files and design tokens are not uploaded.",
    ],
    howToUse: [
      "Paste your stylesheet into the input text area.",
      "Click Minify to compress, Beautify to re-indent, or Validate to check structure.",
      "On validation, read the Selectors and Properties counts or the brace-balance error.",
      "Click Copy to copy the output, or Clear to reset the editor.",
    ],
    examples: [
      {
        title: "Minify a rule",
        input: "/* card */\n.card { margin: 0; padding: 20px; }",
        output: ".card{margin:0;padding:20px}",
      },
      {
        title: "Validate counts selectors and properties",
        input: ".button { color: red; }",
        output:
          "Valid CSS structure - Selectors: 1, Properties: 1 (comments and whitespace do not count)",
      },
      {
        title: "Brace-balance error",
        input: ".button { color: red;",
        output:
          "Mismatched braces: 1 opening vs 0 closing. (every { needs a matching })",
      },
    ],
    useCases: [
      "Shrinking production stylesheets before deployment to cut page weight.",
      "Auditing third-party or generated CSS by reading the beautified form first.",
      "Checking hand-edited styles for the stray brace that breaks every rule after it.",
      "Preparing CSS payloads for inline embedding in emails or HTML documents.",
    ],
    faqs: [
      {
        q: "What is the difference between CSS minification and JS minification?",
        a: "They handle different syntaxes: CSS minification removes comments and whitespace around selectors and declarations; JS minification must also respect strings, template literals, and semicolon-sensitive constructs. Using the wrong tool on the other language's source will corrupt it - this tool is CSS-only.",
      },
      {
        q: "Is minified CSS safe?",
        a: "Yes for normal stylesheets - whitespace and comments are not semantically significant in CSS (except inside content: \" \" strings and calc spacing, which this tool preserves). The rendered result is identical; only bytes are saved.",
      },
      {
        q: "Does validation check for unknown properties?",
        a: "No - it validates structure: balanced braces, sensible selector/property counts, and parseable rules. Misspelled property names and unsupported values still need a linter or your browser's dev tools to catch.",
      },
      {
        q: "Why does beautify not add a space after every colon?",
        a: "Beautify normalizes indentation and line breaks but preserves spacing that was already present around colons, so style is not forced on content you wrote compactly. Re-run with Minify first if you want a uniform base before beautifying.",
      },
    ],
  },

  "js-minifier": {
    whatIs:
      "JavaScript minification shortens source code for delivery: comments and optional whitespace are stripped, variable names may be shortened, and output is compressed into fewer bytes. Because JavaScript is whitespace-sensitive in places (automatic semicolon insertion, return newline rules), minification must understand string literals, template literals, and regexes - which is why this tool's minifier is conservative. It removes comments and collapses whitespace while respecting quoted strings, then validates by checking that braces, parentheses, brackets, and quotes balance and reporting the document's line count. Beautify does the reverse, breaking statements onto lines for reading.",
    whyUse: [
      "Minify, Beautify, and Validate handle strings safely - text inside quotes is never altered.",
      "Validation checks brace, paren, and bracket balance plus quote pairing, with a clear line count.",
      "Beautify breaks after {, }, and ; producing code that is easy to read in review.",
      "No dependencies are loaded: transformation runs as local string processing in the browser.",
      "One-click copy moves the result into build pipelines or inline <script> blocks.",
    ],
    howToUse: [
      "Paste your JavaScript into the input text area.",
      "Click Minify to compress, Beautify to reformat for reading, or Validate to check balance.",
      "Read the output (or the validation report with line count) below the buttons.",
      "Click Copy to copy the result, or Clear to reset the editor.",
    ],
    examples: [
      {
        title: "Minify a commented function",
        input:
          "// greet\nfunction greet(name) {\n  console.log('Hello ' + name);\n}",
        output: "function greet(name){console.log('Hello '+name);}",
      },
      {
        title: "Beautify compact code",
        input: "function add(a,b){return a+b;}",
        output: "function add(a,b) {\n  return a+b;\n}",
      },
      {
        title: "Validation catches an unclosed brace",
        input: "function add(a,b) { return a+b;",
        output:
          "Mismatched braces: 1 opening vs 0 closing. (close the function body before running the file)",
      },
    ],
    useCases: [
      "Shrinking inline scripts and small utilities where a full bundler is overkill.",
      "Producing compact snippets for documentation, Stack Overflow answers, or email templates.",
      "Auditing unfamiliar code by beautifying it first, then checking structural balance.",
      "Quick sanity checks on scripts assembled from fragments or generated output.",
    ],
    faqs: [
      {
        q: "Is this a full JavaScript minifier like Terser or Uglify?",
        a: "No - it performs conservative whitespace and comment removal plus structural validation, without renaming variables or deeply transforming syntax. That is the safe choice for one-off snippets; production builds should use a bundler's minifier (Terser, esbuild) as part of the toolchain.",
      },
      {
        q: "Can minifying break my code?",
        a: "Conservative minification rarely does, but automatic semicolon insertion edge cases exist (a line starting with ( or [ after return). If your code relies on those patterns, validate and test the minified output before shipping - or leave it beautified.",
      },
      {
        q: "What does the validator actually check?",
        a: "Balance: every { has a }, every ( has a ), every [ has a ], and quotes pair up, plus a line count of the input. It does not parse JavaScript syntax, so it will not catch a misspelled variable or missing keyword - use a linter for that.",
      },
      {
        q: "How is this different from the CSS Minifier?",
        a: "Different grammar entirely: CSS minification works on selectors and declarations, while this tool handles JavaScript constructs (quotes, template literals, semicolons). Feeding one language's source to the other tool will corrupt it.",
      },
    ],
  },

  "json-to-yaml": {
    whatIs:
      "JSON and YAML are two encodings of the same hierarchical data model. JSON (RFC 8259) is verbose but unambiguous - explicit braces, brackets, commas, and quotes. YAML 1.2 is whitespace-driven: indentation nests structures, a key and its value share a line with a colon, and lists use - markers, which makes configuration files dramatically easier to hand-edit. Strings containing colons or hash symbols must be quoted in YAML, and numbers, booleans (true/false), and null (or ~) carry over directly. This converter reads one format and writes the other, using a proper parser so structures round-trip faithfully rather than relying on text substitution.",
    whyUse: [
      "Converts both directions - JSON to YAML and YAML to JSON - with a Swap button that flips the inputs in one click.",
      "Structures round-trip faithfully: nested objects, arrays, numbers, booleans, and null all map correctly.",
      "Quoting is applied automatically where YAML requires it (strings containing : or #).",
      "Preserves multi-line readability, ideal for Kubernetes manifests, CI configs, and Ansible playbooks.",
      "Conversion happens in-page, so configuration containing tokens or internal URLs is not uploaded.",
    ],
    howToUse: [
      "Confirm the direction shown in the mode label (JSON to YAML or YAML to JSON).",
      "Paste the source document into the left input box.",
      "Click Convert to parse and transform it.",
      "Read the result in the right output box, then click Copy to copy it.",
      "Click Swap to reverse direction (the fields exchange content automatically), or Clear to reset.",
    ],
    examples: [
      {
        title: "JSON to YAML",
        input:
          '{"name":"Alice","age":30,"active":true,"tags":["admin","user"]}',
        output:
          "name: Alice\nage: 30\nactive: true\ntags:\n  - admin\n  - user",
      },
      {
        title: "YAML to JSON",
        input: "name: Alice\nage: 30",
        output: '{\n  "name": "Alice",\n  "age": 30\n}',
      },
      {
        title: "Automatic quoting of risky strings",
        input: '{"url": "https://x.dev", "note": "see: docs #4"}',
        output:
          'url: "https://x.dev"\nnote: "see: docs #4" (unquoted values containing : or # would break YAML parsing)',
      },
    ],
    useCases: [
      "Converting API JSON responses into YAML snippets for documentation and runbooks.",
      "Migrating configuration between tools that expect different formats (JSON config vs YAML manifest).",
      "Preparing Kubernetes, GitHub Actions, or Docker Compose YAML from an existing JSON template.",
      "Reviewing JSON payloads more comfortably by reading the YAML equivalent.",
    ],
    faqs: [
      {
        q: "Is YAML interchangeable with JSON?",
        a: "Almost: JSON is a subset of YAML 1.2, so every JSON document is valid YAML. The reverse is not true - YAML adds anchors, aliases, multi-line strings, and comments that JSON parsers reject. Converting YAML to JSON silently drops comments and collapses advanced constructs.",
      },
      {
        q: "Why did my YAML keys get quoted?",
        a: "The converter quotes any string containing a colon, hash, leading/trailing spaces, or that would otherwise be parsed as a number or boolean. Without those quotes, the YAML parser would misread your value - quoting is a correctness requirement, not a style choice.",
      },
      {
        q: "What happens to comments when converting?",
        a: "Comments exist only in YAML. Converting YAML to JSON removes them because JSON has no comment syntax; converting JSON to YAML simply has none to add. Keep a commented original alongside if the annotations matter.",
      },
      {
        q: "Does the converter validate my input first?",
        a: "Yes - it parses the source with a real parser before emitting anything. Malformed JSON or YAML raises a parse error with a position instead of producing corrupt output, which makes it useful as a checker too.",
      },
    ],
  },
};