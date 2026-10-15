import type { Tool } from "../registry";

export type ToolContent = Pick<
  Tool,
  "whatIs" | "whyUse" | "howToUse" | "examples" | "useCases" | "faqs"
>;

export const batchBContent: Record<string, ToolContent> = {
  "number-base-converter": {
    whatIs:
      "A number base (or radix) is how many unique digits a numeral system uses to represent values. Decimal is base 10 (0-9), binary is base 2 (0 and 1), octal is base 8, and hexadecimal is base 16 (0-9 plus A-F). Each digit's position represents a power of its base, so decimal 255 equals 1x10^2 + 5x10^1 + 5x10^0 and equals FF in hexadecimal. Programmers switch between bases constantly: binary for bit masks and flags, octal for Unix file permissions like 0755, hex for memory addresses, byte pairs, and CSS colors. Converting means parsing digits in the source base to their numeric value, then re-emitting that value as digits in the target base.",
    whyUse: [
      "Converts in both directions instantly between Binary, Octal, Decimal, and Hexadecimal, including fractional values like 0.5.",
      "Avoids error-prone manual position-weighted arithmetic, especially for long binary strings and hex byte pairs.",
      "Quickly decodes bit masks, permission modes, and color codes you encounter in logs, diffs, and CSS.",
      "Swap button flips source and target bases and feeds the result back as input, which is handy for round-trip checks.",
      "Validation errors name exactly which digits are illegal for the selected base before any conversion runs.",
    ],
    howToUse: [
      "Type the number in the Input Number field (digits, A-F letters for hex, and an optional single decimal point are accepted).",
      "Pick the source system under From Base: Binary, Octal, Decimal, or Hexadecimal.",
      "Pick the destination system under To Base.",
      "Click Convert to see the result in the Output box.",
      "Press Copy to grab the result, Swap to reverse the two bases, or Clear to start over.",
    ],
    examples: [
      {
        title: "Decimal to hexadecimal",
        input: "255 (From: Decimal, To: Hexadecimal)",
        output: "ff",
      },
      {
        title: "Binary to decimal",
        input: "11111111 (From: Binary, To: Decimal)",
        output: "255",
      },
      {
        title: "Fractional decimal to binary",
        input: "0.5 (From: Decimal, To: Binary)",
        output: "0.1",
      },
    ],
    useCases: [
      "Decoding binary flags or permission bits you see in code review output and shell tools.",
      "Translating CSS hex colors like #1a2b3c into decimal RGB channel values while building design tokens.",
      "Auditing manual arithmetic in assembly, networking (subnet masks), and embedded programming coursework.",
      "Converting memory addresses and byte dumps printed in hex during low-level debugging sessions.",
    ],
    faqs: [
      {
        q: "Why is my hex result lowercase?",
        a: "The converter uses JavaScript's number toString(16), which emits lowercase letters (ff, not FF). Hexadecimal digits are case-insensitive, so both forms are valid; CSS and most tooling accept either. Uppercase it manually if your style guide requires it.",
      },
      {
        q: "Does it handle decimal (fractional) numbers?",
        a: "Yes. Enter a value like 0.5 with a single decimal point and the converter scales fractional digits too. Fractional conversion runs up to 10 digits of precision, so inherently repeating values such as 0.1 in binary are truncated rather than infinite.",
      },
      {
        q: "What characters are valid for each base?",
        a: "Base 2 allows only 0-1, base 8 allows 0-7, base 10 allows 0-9, and base 16 allows 0-9 plus A-F. Entering a digit outside the selected base reports which characters are allowed instead of guessing at a conversion.",
      },
      {
        q: "How are negative numbers handled?",
        a: "A leading minus sign is supported and carries through to the result, so -255 in decimal becomes -ff in hexadecimal. That is sign-magnitude behavior, which suits plain arithmetic; machine register views of negatives use two's complement, which this tool does not apply.",
      },
    ],
  },

  "timestamp-converter": {
    whatIs:
      "A Unix timestamp is the count of seconds elapsed since the Unix epoch, 1970-01-01T00:00:00Z (coordinated universal time). JavaScript's Date works in milliseconds since the same epoch, so timestamps appear in two flavors: 10-digit values in seconds (like 1700000000) and 13-digit values in milliseconds (like 1700000000000). Databases such as MySQL, Redis, and PostgreSQL, log files, Git commits, and API fields like JWT exp and iat store time as epoch integers because integers sort cleanly and carry no timezone ambiguity. Human-facing formats follow ISO 8601 / RFC 3339, such as 2023-11-14T22:13:20Z. This tool converts both directions and auto-detects seconds versus milliseconds by magnitude.",
    whyUse: [
      "Auto-detects whether you pasted seconds or milliseconds, so you never divide by 1000 by hand.",
      "Returns four views of the same instant: local date, ISO 8601, RFC 1123 UTC string, and relative time.",
      "Date to timestamp mode outputs both epoch seconds and milliseconds for SQL, JavaScript, and Python APIs.",
      "Current Timestamp tab shows both units at once, useful for expiring tokens, cache keys, and test fixtures.",
      "Empty or malformed input is rejected with a clear message instead of silently producing an invalid date.",
    ],
    howToUse: [
      "Choose the Timestamp → Date, Date → Timestamp, or Current Timestamp tab.",
      "For timestamp conversion, enter a Unix timestamp in seconds or milliseconds (detected automatically).",
      "For date conversion, enter any JavaScript-parsable date such as 2024-01-01 or January 1, 2024.",
      "Click Convert (the Current Timestamp tab fetches values as soon as you open it).",
      "Review the labeled result rows and click Copy on any individual value.",
    ],
    examples: [
      {
        title: "Epoch seconds to readable date",
        input: "1700000000 (Timestamp → Date tab)",
        output:
          "ISO: 2023-11-14T22:13:20.000Z\nUTC: Tue, 14 Nov 2023 22:13:20 GMT\nDate: 11/14/2023, 10:13:20 PM (varies by locale/timezone)\nRelative: 2 years ago",
      },
      {
        title: "Date to epoch seconds",
        input: "2024-01-01 (Date → Timestamp tab)",
        output: "Seconds: 1704067200\nMilliseconds: 1704067200000",
      },
      {
        title: "Milliseconds detected automatically",
        input: "1700000000000 (Timestamp → Date tab)",
        output:
          "ISO: 2023-11-14T22:13:20.000Z\n(the same instant as 1700000000; 13-digit values are read as milliseconds)",
      },
    ],
    useCases: [
      "Debugging expired JWTs or session tokens by converting their exp claim into a readable time.",
      "Turning epoch created_at values from database rows into dates when writing queries or support tickets.",
      "Grabbing the current epoch value for seeding caches, rate limiters, and test fixtures.",
      "Investigating log files where timestamps are printed in UTC while your team works in local time.",
    ],
    faqs: [
      {
        q: "Seconds or milliseconds: how does the tool tell them apart?",
        a: "Values greater than 9,999,999,999 are treated as milliseconds; smaller values are treated as seconds. Current epoch seconds are 10 digits (about 1.7 billion) and milliseconds are 13 digits (about 1.7 trillion), so the boundary is unambiguous for any realistic date.",
      },
      {
        q: "Why does the Date row differ from ISO and UTC?",
        a: "Date uses JavaScript toLocaleString(), which follows your browser's locale and timezone. ISO always ends in Z (UTC) and the UTC row uses the RFC 1123 GMT format; both are timezone-independent, which makes them safer to move between systems.",
      },
      {
        q: "Does the tool account for timezones?",
        a: "Epoch timestamps are absolute moments with no timezone attached. The ISO and UTC rows render that instant in UTC, while the local Date row shows it in your browser's timezone, which is why it can appear shifted by several hours.",
      },
      {
        q: "What happens to Unix timestamps in 2038?",
        a: "32-bit signed second counters overflow on 19 January 2038. Modern systems use 64-bit integers or millisecond counts and are unaffected; JavaScript's millisecond clock is safe until roughly the year 275,760.",
      },
    ],
  },

  "color-converter": {
    whatIs:
      "Colors on the web are expressed in a few equivalent notations. HEX (#RRGGBB) writes each red, green, and blue channel as two base-16 digits (00-FF), so #FF0000 is pure red. RGB does the same in decimal as rgb(255, 0, 0) with each channel ranging 0-255 in an additive model where light combines toward white. HSL separates what humans perceive: Hue is an angle 0-360 around a color wheel, Saturation 0-100% blends toward gray, and Lightness 0-100% blends toward black or white. Converting HEX to RGB is simple base-16 division; RGB to HSL uses the maximum, minimum, and delta of the three channels to derive hue, saturation, and lightness.",
    whyUse: [
      "All three formats stay in sync: editing any field or dragging any slider instantly updates HEX, RGB, and HSL output.",
      "Built-in color picker for visual selection plus exact text entry when you already know a hex code.",
      "Live preview swatch so you can sanity-check a color before pasting it into CSS.",
      "Copy buttons on each output row grab exactly the CSS-ready string, including rgb() and hsl() function notation.",
      "HSL sliders make it easy to dial lightness and saturation while keeping a brand hue stable.",
    ],
    howToUse: [
      "Switch to the HEX, RGB, or HSL tab depending on the format you have on hand.",
      "Enter your value: type a hex code, or drag the R, G, B (or H, S, L) sliders.",
      "Watch the other formats and the preview swatch update in real time.",
      "Click Copy next to HEX, RGB, or HSL to copy a ready-to-paste CSS value.",
      "Invalid hex input shows an 'Invalid hex color' message; correct it and the outputs refresh.",
    ],
    examples: [
      {
        title: "Pure red across formats",
        input: "#ff0000",
        output: "HEX: #ff0000\nRGB: rgb(255, 0, 0)\nHSL: hsl(0, 100%, 50%)",
      },
      {
        title: "Brand blue",
        input: "#3498db",
        output:
          "HEX: #3498db\nRGB: rgb(52, 152, 219)\nHSL: hsl(204, 70%, 53%)",
      },
      {
        title: "HSL sliders to hex",
        input: "Hue: 120, Saturation: 100%, Lightness: 50%",
        output: "HEX: #00ff00\nRGB: rgb(0, 255, 0)",
      },
    ],
    useCases: [
      "Translating a designer's Figma hex values into hsl() CSS variables you can tweak for dark mode.",
      "Converting pixel-picker values from screenshots into decimal RGB for canvas or game code.",
      "Building accessible palettes by adjusting HSL lightness instead of guessing hex digits.",
      "Matching a color sampled from an image to the CSS notation your framework expects.",
    ],
    faqs: [
      {
        q: "What hex format should I enter?",
        a: "Use the six-digit #RRGGBB form, which this tool is designed around. Each pair of digits is one channel from 00 to FF, so #ffffff is white and #000000 is black. Three-digit shorthand like #f00 should be expanded to #ff0000 before converting.",
      },
      {
        q: "Why do my HSL values look slightly rounded?",
        a: "Hue is computed in degrees and saturation and lightness as percentages, then displayed as whole numbers for readability. Display rounding shifts a value by less than one percent, which is imperceptible; copy the RGB or HEX value when you need bit-exact output.",
      },
      {
        q: "Is RGB 255 the same as 100%?",
        a: "Yes for a single channel: each RGB channel runs 0-255 (8 bits), so 255 is 100% of that channel's intensity. HSL percentages are different: they describe saturation and lightness of the whole color, which is why hsl(0, 100%, 50%) and rgb(255, 0, 0) are the same red.",
      },
      {
        q: "Does converting between formats lose precision?",
        a: "HEX and RGB are exact inverses because both are 8-bit-per-channel representations. HSL involves fractional math, so cycling RGB to HSL and back can differ by at most one unit per channel. If you need a perfect round trip, start and end with hex.",
      },
    ],
  },

  "case-converter": {
    whatIs:
      "Codebases and content pipelines rely on consistent naming styles, and each has rules. camelCase lowercases the first word and capitalizes the rest (getUserById, standard for JavaScript variables). PascalCase capitalizes every word (GetUserId, standard for classes). snake_case joins lowercase words with underscores (get_user_id, used by Python and C). kebab-case uses hyphens (get-user-id, used for CSS classes and URL slugs), and CONSTANT_CASE underscores uppercase words for compile-time constants (MAX_RETRIES). Prose styles like Title Case and Sentence case follow typographic rules instead. This tool tokenizes input on spaces, hyphens, underscores, and existing capitalization boundaries, then reassembles all twelve styles at once.",
    whyUse: [
      "One click produces all twelve styles simultaneously, so you never guess which convention a codebase uses before copying.",
      "Handles mixed input: 'user-profile settings', 'userName', and 'USER NAME' all tokenize correctly.",
      "Each result has its own Copy button for grabbing exactly the style you need.",
      "Covers database column renames, API field naming, CSS class naming, and file slugs in a single pass.",
      "Avoids subtle mistakes like leftover separators or double capitals that manual editing introduces.",
    ],
    howToUse: [
      "Paste or type any text into the Input Text area (spaces, hyphens, underscores, and capitals all act as separators).",
      "Click Convert to generate every supported case style at once.",
      "Scan the labeled rows: UPPER CASE, lower case, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case, path/case, and Header-Case.",
      "Click Copy on the row you want.",
      "Use Clear to reset the input and results.",
    ],
    examples: [
      {
        title: "Plain phrase to all styles",
        input: "hello world example",
        output:
          "camelCase: helloWorldExample\nPascalCase: HelloWorldExample\nsnake_case: hello_world_example\nkebab-case: hello-world-example\nCONSTANT_CASE: HELLO_WORLD_EXAMPLE\ntitle: Hello World Example\npath/case: hello/world/example",
      },
      {
        title: "Kebab identifier to camel and friends",
        input: "user-profile settings",
        output:
          "camelCase: userProfileSettings\nPascalCase: UserProfileSettings\nsnake_case: user_profile_settings\ndot.case: user.profile.settings\nHeader-Case: User Profile Settings",
      },
    ],
    useCases: [
      "Renaming database columns or JSON keys to a team's snake_case standard without typos.",
      "Converting design-token names into kebab-case CSS custom properties and camelCase JS constants.",
      "Generating URL slugs from human-readable titles during content migrations.",
      "Fixing identifiers pasted from docs that use spaces or mixed casing into compilable names.",
    ],
    faqs: [
      {
        q: "How does the converter decide where words begin?",
        a: "It splits on whitespace, hyphens, and underscores first, then on case boundaries: the transition from a lowercase letter to an uppercase letter (userName becomes user and Name). That is why input that already mixes styles still breaks into sensible words.",
      },
      {
        q: "Why does Title Case differ from Header-Case?",
        a: "Title Case applies prose capitalization to the original tokens, while Header-Case first replaces hyphens and underscores with spaces and then capitalizes every word. For identifiers like user-profile, Title Case leaves the hyphen in place but Header-Case removes it.",
      },
      {
        q: "What happens to numbers and punctuation?",
        a: "Digits stay attached to their words, so item2 remains item2 across styles. Other punctuation is stripped by the identifier styles (snake, kebab, camel, dot, path) because those formats allow only letters, digits, and a single separator; upper, lower, title, and sentence preserve the original text more faithfully.",
      },
      {
        q: "Does it support PascalCase for class names?",
        a: "Yes: PascalCase is camelCase with an uppercase first letter, generated from the same tokenization. Both appear side by side so you can pick the one your language expects: JavaScript classes and React components use PascalCase, while functions and variables typically use camelCase.",
      },
    ],
  },

  "json-to-csv": {
    whatIs:
      "JSON (JavaScript Object Notation) stores structured data as nested objects and arrays, while CSV (Comma-Separated Values) is a flat text table: one header row naming the columns, then one row per record. Converting between them means flattening: this tool collects the union of keys from every object in your array to build the header line, then writes one line per record in that column order. CSV escaping follows RFC 4180: any field containing the delimiter, a double quote, or a newline is wrapped in double quotes, and embedded quotes are doubled. You can also switch the delimiter to a semicolon or tab, common in European spreadsheet exports, before downloading the result.",
    whyUse: [
      "Produces RFC 4180-compliant quoting automatically, so fields with commas, quotes, or line breaks survive Excel and Google Sheets.",
      "Header row is built from the union of all object keys, so records with different shapes still line up in columns.",
      "Choose comma, semicolon, or tab delimiter to match your locale's spreadsheet import settings.",
      "Download button saves a ready-to-open data.csv without any extra cleanup.",
      "Errors distinguish invalid JSON, empty arrays, and arrays without objects so failures are easy to diagnose.",
    ],
    howToUse: [
      "Paste a JSON array of objects into the Input (JSON) panel (a single object also works and becomes one row).",
      "Select the delimiter: Comma, Semicolon, or Tab.",
      "Click Convert to render CSV into the Output (CSV) panel.",
      "Click Copy for the clipboard or Download CSV to save data.csv.",
      "Clear empties both panels for the next dataset.",
    ],
    examples: [
      {
        title: "Array of records to CSV",
        input: '[{"name":"John","age":30},{"name":"Jane","age":25}]',
        output: "name,age\nJohn,30\nJane,25",
      },
      {
        title: "Values that need quoting",
        input: '[{"name":"Doe, John","city":"New York"}]',
        output: 'name,city\n"Doe, John",New York',
      },
      {
        title: "Semicolon delimiter",
        input: '[{"product":"Widget","price":9.99}] with delimiter set to Semicolon',
        output: "product;price\nWidget;9.99",
      },
    ],
    useCases: [
      "Exporting API responses or database query results into a spreadsheet for stakeholders.",
      "Preparing survey or analytics JSON for import into Excel, Google Sheets, or Numbers.",
      "Turning config-file arrays into readable CSVs for documentation or QA review.",
      "Generating CSV test fixtures for data-migration dry runs.",
    ],
    faqs: [
      {
        q: "What JSON shape does the tool expect?",
        a: "An array of flat objects like [{...}, {...}] is ideal because each object becomes one row. A single object is accepted and wrapped into a one-row table; nested objects and arrays are serialized into JSON text inside the cell rather than expanded into more columns.",
      },
      {
        q: "Why is a value wrapped in extra double quotes?",
        a: "RFC 4180 requires quoting any field that contains the delimiter, a double quote, or a newline. A name like Doe, John becomes a quoted field with the comma preserved, which is exactly what Excel and other parsers need to read the value back correctly.",
      },
      {
        q: "Do keys missing from some records cause problems?",
        a: "No. The header is the union of every key seen across the array; when a record lacks a key, that cell is left empty. Column order follows the order in which keys were first encountered.",
      },
      {
        q: "Can it convert very large files?",
        a: "It runs fully client-side, so size is limited mainly by browser memory. A few megabytes of JSON converts in seconds; if you regularly process hundreds of megabytes, a streaming command-line tool like jq will be more efficient.",
      },
    ],
  },

  "csv-to-json": {
    whatIs:
      "CSV (Comma-Separated Values) is a plain-text table defined by RFC 4180: the first line holds column names, each following line is a record, and fields containing the delimiter or line breaks are wrapped in double quotes with embedded quotes doubled. JSON (JavaScript Object Notation) represents the same information as an array of objects, one object per row, which is the shape REST APIs and document databases expect. Converting CSV to JSON means parsing those quoting rules correctly, mapping each header name to an object key, and emitting pretty-printed JSON. This tool supports comma, semicolon, and tab delimiters (semicolon is the default separator in many European locales) and handles quoted fields with embedded commas.",
    whyUse: [
      "Proper RFC 4180 quote parsing: embedded commas and doubled quotes inside quoted fields come out intact.",
      "Delimiter selector for comma, semicolon, and tab files exported from different spreadsheet locales.",
      "Rejects input with fewer than two rows using 'CSV must have at least a header row and one data row.', so empty pastes fail fast.",
      "Pretty-printed 2-space JSON output you can paste straight into an API request body.",
      "Download JSON button writes a .json file for piping into scripts or seed files.",
    ],
    howToUse: [
      "Paste CSV text with a header row into the Input (CSV) panel.",
      "Pick the delimiter that matches your file: Comma, Semicolon, or Tab.",
      "Click Convert to generate an array of JSON objects in the Output (JSON) panel.",
      "Copy the JSON or click Download JSON to save data.json.",
      "Clear resets both panels.",
    ],
    examples: [
      {
        title: "Standard comma CSV",
        input: "name,age,city\nJohn,30,New York\nJane,25,London",
        output:
          '[\n  {\n    "name": "John",\n    "age": "30",\n    "city": "New York"\n  },\n  {\n    "name": "Jane",\n    "age": "25",\n    "city": "London"\n  }\n]',
      },
      {
        title: "Quoted field containing a comma",
        input: 'name,city\n"Doe, John",London',
        output: '[\n  {\n    "name": "Doe, John",\n    "city": "London"\n  }\n]',
      },
    ],
    useCases: [
      "Seeding a development database or mock API from a spreadsheet export.",
      "Converting CSV survey responses into JSON for a Node.js or Python import script.",
      "Feeding configuration tables maintained in Excel into an application that reads JSON.",
      "Turning tab-separated log exports into structured JSON for ingestion pipelines.",
    ],
    faqs: [
      {
        q: "Why are numbers quoted in the output?",
        a: "CSV carries no type information: 30 and \"30\" look identical in the text file, so this tool maps every cell to a JSON string rather than guessing. If your consumer needs real numbers, coerce them afterward in your import script or with a schema-aware parser.",
      },
      {
        q: "Does it support semicolon or tab-separated files?",
        a: "Yes: choose Semicolon or Tab below the input panels before converting. Semicolon is the default list separator in many locales, so Excel exports from those regions use it instead of commas.",
      },
      {
        q: "What if my CSV has no header row?",
        a: "The first line is always treated as the header, because JSON objects need keys. If your file lacks one, add a placeholder header line such as col1,col2 before converting; otherwise every value would be mislabeled.",
      },
      {
        q: "How are embedded newlines inside quoted fields handled?",
        a: "The parser tracks quote state, so newlines and delimiters inside a quoted field stay part of the same field instead of starting a new row. Lines outside quotes split rows, which is exactly the RFC 4180 behavior spreadsheets use.",
      },
    ],
  },

  "html-to-markdown": {
    whatIs:
      "HTML describes document structure with angle-bracket tags such as h1, p, and strong, while Markdown, introduced by John Gruber in 2004, expresses the same structure with lightweight punctuation: # for headings, ** for bold, - for list items. Markdown renders in GitHub, README files, static-site generators, and chat apps. Converting means mapping semantic tags to their Markdown equivalents: h1-h6 become # through ######, strong and b become **, em and i become *, anchor hrefs become [text](url), lists become dashes and numbers, and pre/code blocks become fenced code. This converter also strips scripts, styles, and HTML comments, converts tables into pipe syntax, decodes entities like &amp;, and cleans up extra blank lines.",
    whyUse: [
      "Cleans up automatically: script, style, and comment blocks are removed so page chrome never leaks into your Markdown.",
      "Covers headings, inline formatting, links, images, ordered and unordered lists, blockquotes, tables, and code fences.",
      "Common HTML entities are decoded so the output reads like real text instead of entity soup.",
      "Download .md gives you a ready-to-commit file, not just clipboard text.",
      "Runs locally on the pasted markup; your content is never sent anywhere.",
    ],
    howToUse: [
      "Paste the HTML fragment or full document into the Input (HTML) panel.",
      "Click Convert to transform it into Markdown in the Output (Markdown) panel.",
      "Review headings, lists, links, and tables in the output for anything the mapping normalized.",
      "Click Copy or Download .md to save converted.md.",
      "Clear resets both panels for the next snippet.",
    ],
    examples: [
      {
        title: "Headings, emphasis, and a list",
        input:
          "<h1>Hello World</h1><p>This is <strong>bold</strong> and <em>italic</em> text.</p><ul><li>Item 1</li><li>Item 2</li></ul>",
        output:
          "# Hello World\n\nThis is **bold** and *italic* text.\n\n- Item 1\n- Item 2",
      },
      {
        title: "Link and inline code",
        input:
          '<p>Read the <a href="https://example.com/docs">docs</a> and run <code>npm install</code>.</p>',
        output:
          "Read the [docs](https://example.com/docs) and run `npm install`.",
      },
    ],
    useCases: [
      "Migrating CMS or web-page content into a Markdown-based docs site or README.",
      "Converting HTML snippets from email or Word export into clean Markdown for GitHub issues.",
      "Cleaning pasted 'Copy as HTML' output into prose you can diff in Git.",
      "Preparing newsletter or blog HTML for republishing on platforms like dev.to or Hashnode.",
    ],
    faqs: [
      {
        q: "Is the conversion exact or lossy?",
        a: "Semantic structure survives; presentation does not. Inline styles, class attributes, and layout divs are dropped by design because Markdown has no equivalent, so visual formatting you cared about should be re-expressed with CSS in the target system.",
      },
      {
        q: "What happens to script tags and comments?",
        a: "They are removed before conversion along with style blocks, so trackers, analytics snippets, and editor comments never appear in the output. That also makes pasting an entire page source practical rather than noisy.",
      },
      {
        q: "Are nested lists and tables supported?",
        a: "Tables become pipe-delimited Markdown with a --- separator row. Nested ul lists are flattened to one level because the simple replacement does not track depth, so check indentation on deeply nested content and indent manually if needed.",
      },
      {
        q: "Why did my HTML entities change?",
        a: "The common entities (&amp;, &lt;, &gt;, &quot;, &#39;, &nbsp;) are decoded into their literal characters so the Markdown reads naturally. Less common entities such as &mdash; pass through unchanged, so expand those to literal characters before converting.",
      },
    ],
  },

  "jwt-decoder": {
    whatIs:
      "A JWT (JSON Web Token), standardized in RFC 7519, is a compact, URL-safe credential built from three dot-separated segments: header, payload, and signature. The first two segments are JSON maps encoded with Base64URL, which uses - and _ instead of + and / and typically drops padding. That is encoding, not encryption: anyone holding the token can read its claims. The header names the algorithm (alg) and type (typ). The payload carries registered claims such as sub (subject), iss (issuer), aud (audience), iat (issued at), and exp (expiration, in epoch seconds), plus custom claims. The signature is a cryptographic hash over the first two segments and can only be verified with the server's secret or public key, never decoded.",
    whyUse: [
      "Splits and Base64URL-decodes header and payload instantly so you can read exp, sub, roles, and custom claims.",
      "Shows a colored banner with remaining or elapsed time whenever an exp claim is present.",
      "No key needed for inspection: decoding is pure Base64URL plus JSON, which is all you need while debugging claims.",
      "Each section (header, payload, signature) has its own Copy button for pasting into code or bug reports.",
      "Malformed tokens return specific errors such as wrong segment count or invalid Base64 instead of a blank screen.",
    ],
    howToUse: [
      "Paste the full token, all three dot-separated segments, into the JWT Token field.",
      "Click Decode (or Clear to reset).",
      "Read the expiration banner: green shows time remaining, red shows how long ago the token expired.",
      "Inspect the pretty-printed Header and Payload JSON for claims like exp, sub, and scopes.",
      "Use the per-section Copy buttons to copy the header, payload, or raw signature.",
    ],
    examples: [
      {
        title: "Standard signed JWT",
        input:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        output:
          'Header: {\n  "alg": "HS256",\n  "typ": "JWT"\n}\nPayload: {\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}\nSignature: SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      },
      {
        title: "Token with an expiration claim (expired)",
        input:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MiIsImV4cCI6MTcwMDAwMDAwMH0.c2lnbmF0dXJl",
        output:
          'Payload: {\n  "sub": "42",\n  "exp": 1700000000\n}\nRed banner: Expired (elapsed days and hours shown, growing with time since 2023-11-14T22:13:20Z)',
      },
    ],
    useCases: [
      "Debugging 401 and 403 API failures by checking whether the exp claim has passed or the wrong audience was issued.",
      "Verifying what identity and roles a session token actually carries during integration testing.",
      "Inspecting third-party tokens from Auth0, Firebase, or AWS Cognito without wiring up a decode page in your app.",
      "Confirming iat and exp timestamps line up with your token TTL configuration before a release.",
    ],
    faqs: [
      {
        q: "Does this verify the JWT signature?",
        a: "No. Only the header and payload are decoded; both are Base64URL-encoded, not encrypted. Signature verification requires the issuer's secret or public key and must happen on your server, for example with a library such as jsonwebtoken. Never treat an unverified token as proof of identity.",
      },
      {
        q: "Is my token sent anywhere?",
        a: "Decoding runs entirely in the browser with atob and JSON.parse; no network request carries your token. You can confirm this in the DevTools Network tab: nothing appears after you click Decode.",
      },
      {
        q: "Why can't the signature be decoded?",
        a: "The third segment is a cryptographic hash (HMAC-SHA256, RSA, or EdDSA depending on alg) computed over the encoded header and payload. Hashes are one-way by design, so the segment can be reproduced and compared but never expanded back into text.",
      },
      {
        q: "The token won't decode. What's wrong?",
        a: "The tool requires exactly three dot-separated segments and valid Base64URL JSON in the first two. Common paste errors include copying only part of the Authorization header, leaving the Bearer prefix in place, or picking up line breaks from email; strip the prefix and whitespace, then retry.",
      },
    ],
  },

  "url-parser": {
    whatIs:
      "A URL (Uniform Resource Locator), defined by RFC 3986 and the WHATWG URL Standard, is a structured address with five parts: scheme (the protocol, such as https), authority (hostname plus optional port), path (the resource route like /products/shoes), query (the ?key=value pairs that refine the request), and fragment (the #anchor that targets a position in the page). In https://example.com:8080/search?q=shoes&page=2#results, https is the scheme, example.com the hostname, 8080 the port, /search the path, q=shoes&page=2 the query, and results the fragment. Query values are percent-encoded (a space becomes %20) and are decoded for display, which is how server routers, analytics tools, and link checkers split URLs apart.",
    whyUse: [
      "Breaks any URL into labeled components: protocol, hostname, port, path, search, and hash, each with its own Copy button.",
      "Query parameters are listed as decoded key and value pairs, so %20 and + spaces become readable text.",
      "Instantly reveals tracking parameters, missing ports, or a stray fragment that is breaking a redirect.",
      "Accepts full URLs with ports, nested paths, and multiple parameters.",
      "Malformed URLs produce a clear error instead of silently mis-parsing.",
    ],
    howToUse: [
      "Paste a complete URL (including https://) into the URL to Parse field.",
      "Click Parse.",
      "Read the component rows: Protocol, Hostname, Port, Pathname, Search, and Hash.",
      "Scroll to Query Parameters to see each key=value pair decoded; copy any row individually.",
      "Clear resets the field and results.",
    ],
    examples: [
      {
        title: "Full URL with port and fragment",
        input: "https://example.com:8080/products?category=electronics&sort=price#reviews",
        output:
          "Protocol: https:\nHostname: example.com\nPort: 8080\nPathname: /products\nSearch: ?category=electronics&sort=price\nHash: #reviews\nQuery Parameters: category=electronics, sort=price",
      },
      {
        title: "Encoded query values are decoded",
        input: "https://example.com/search?q=hello%20world",
        output:
          "Protocol: https:\nHostname: example.com\nPort: (default)\nPathname: /search\nSearch: ?q=hello%20world\nQuery Parameters: q=hello world",
      },
    ],
    useCases: [
      "Auditing UTM and tracking parameters on marketing links before a campaign launches.",
      "Debugging why a redirect drops part of the path or query string.",
      "Extracting base hostnames or API paths when writing scrapers and integration tests.",
      "Checking which port and scheme a self-hosted service actually uses.",
    ],
    faqs: [
      {
        q: "What's the difference between this and the URL Validator?",
        a: "The parser always tries to split whatever you paste into components and shows them; the validator first judges whether the string is a legal URL, reports specific errors (missing protocol, unsupported scheme), and only then displays components when it passes.",
      },
      {
        q: "Why does the port say (default)?",
        a: "Ports are optional because each scheme has a standard default: 443 for https and 80 for http. When you omit the port, the URL parser reports an empty value, which the tool labels (default) rather than inventing a number.",
      },
      {
        q: "Do query parameters get URL-decoded?",
        a: "Yes. Parameters are read through the searchParams API, which decodes percent-encoding, so q=hello%20world displays as q=hello world while the raw Search row still shows the original encoded form. Copy whichever representation your destination needs.",
      },
      {
        q: "Why did parsing fail on a URL I copied from a browser?",
        a: "Copied links sometimes contain spaces, smart quotes, or are missing the scheme (www.example.com). The parser needs a valid absolute URL, so add https:// and remove stray whitespace or angle brackets added by chat apps before pasting.",
      },
    ],
  },

  "cron-generator": {
    whatIs:
      "Cron is the Unix task scheduler, and its language is a five-field expression read left to right: minute (0-59), hour (0-23), day of month (1-31), month (1-12), and day of week (0-6, where 0 is Sunday). Each field accepts a specific value like 5, a wildcard * for every value, a list like 1,3,5, a range like 1-5, or a step like */15 for every fifteenth value. So 0 9 * * 1-5 means at 09:00 on weekdays. When both day-of-month and day-of-week are restricted, standard cron runs the job when either matches. System cron interprets expressions in the server's local timezone, and variants like Quartz add seconds and year fields.",
    whyUse: [
      "Five field inputs mirror the real cron layout, so what you build is exactly what you paste into crontab.",
      "Ten one-click presets cover common schedules such as every minute, midnight, and weekdays at 9 as starting points.",
      "A human-readable description is generated for your expression, catching mistakes like a wrong hour before deploy.",
      "Next 5 Runs preview shows concrete upcoming dates so you can verify the schedule matches intent.",
      "Supports the standard special characters: lists with commas, ranges with hyphens, and steps with slashes.",
    ],
    howToUse: [
      "Optionally click a preset such as Weekdays only to fill the five fields automatically.",
      "Edit Minute, Hour, Day of Month, Month, and Day of Week individually using numbers, *, commas, hyphens, or steps.",
      "Click Generate to build the expression.",
      "Read the Expression and Description rows, then check the Next 5 Runs list against what you expect.",
      "Click Copy Expression to copy it, or Clear to start over.",
    ],
    examples: [
      {
        title: "Weekdays at 9 AM",
        input: "Minute: 0, Hour: 9, Day of Month: *, Month: *, Day of Week: 1-5",
        output:
          "Expression: 0 9 * * 1-5\nDescription: at minute 0, at 9:00, on Monday",
      },
      {
        title: "Every 15 minutes",
        input: "Minute: */15, all other fields: *",
        output: "Expression: */15 * * * *\nDescription: every 15 minutes, every hour",
      },
      {
        title: "Midnight on the first of the month",
        input: "Minute: 0, Hour: 0, Day of Month: 1, Month: *, Day of Week: *",
        output: "Expression: 0 0 1 * *\nDescription: at minute 0, at 0:00, on day 1",
      },
    ],
    useCases: [
      "Writing crontab entries for nightly database backups and log rotation.",
      "Scheduling GitHub Actions or CI jobs that mirror a production cron cadence.",
      "Configuring Kubernetes CronJobs or systemd timers from a human-readable requirement.",
      "Translating a phrase like every weekday at 9 from a product spec into a verified expression.",
    ],
    faqs: [
      {
        q: "What do the five fields mean?",
        a: "Minute, hour, day of month, month, and day of week, in that order. Standard cron allows * for any, lists like 1,15, ranges like 1-5, and steps like */10 or 1-30/5. Field order is the most common mistake, so each input here is labeled to keep the mapping visible.",
      },
      {
        q: "Why do my next-run times look wrong?",
        a: "Cron schedules run in the machine's local timezone, and this preview uses your browser's timezone. If the server lives in UTC, an expression like 0 9 * * * fires at 09:00 UTC, which may be a different local hour for you. Align the schedule with the host's TZ setting.",
      },
      {
        q: "Does this include seconds or a year field?",
        a: "No. It generates the classic five-field format used by Vixie/ISC cron, crontab on Linux and macOS, and most CI systems. Quartz and Spring schedulers expect six or seven fields with seconds and optionally a year; prepend a seconds field for those engines.",
      },
      {
        q: "What happens when both day-of-month and day-of-week are set?",
        a: "In standard cron the job runs when either restriction matches (an OR), not both, so 0 0 1 * 1 fires on the 1st and on every Monday. Some non-standard implementations differ; check your platform's crontab documentation when combining them.",
      },
    ],
  },

  "character-counter": {
    whatIs:
      "A character count is the atomic unit of text length: every letter, digit, space, punctuation mark, and newline contributes one. Character tools usually report two headline numbers, total characters and characters excluding whitespace, because different systems count differently. Twitter/X allows 280 characters including spaces, a Google search snippet shows roughly 155-160 characters, an SMS segment holds 160 GSM-7 characters (or 70 when UCS-2 emoji force Unicode mode), and many HTML inputs enforce maxlength on raw code points. This tool tallies characters with and without spaces alongside words, sentences, paragraphs, and lines, updates as you type, and offers a one-click Copy Stats button for pasting the breakdown into a ticket or spec.",
    whyUse: [
      "Characters and characters-without-spaces update live as you type, which is what limit checking actually needs.",
      "Copy Stats button puts the whole labeled breakdown of all six metrics on your clipboard in one action.",
      "Line and paragraph counts expose formatting problems invisible in a word processor's count.",
      "Built for compliance checks: tweet lengths, meta descriptions, form maxlength values, and SMS budgets.",
      "Nothing is uploaded: counting is pure string-length math in your browser.",
    ],
    howToUse: [
      "Type or paste text into the Input Text area; counts appear immediately as you edit.",
      "Read the six stat cards: Characters, Characters (no spaces), Words, Sentences, Paragraphs, and Lines.",
      "Compare Characters against the limit you are targeting (280 for X, 160 for SMS, about 60 for a title tag).",
      "Click Copy Stats to copy the full labeled breakdown for a ticket or review.",
      "Clear the text box to reset all counters.",
    ],
    examples: [
      {
        title: "Two-line note",
        input: "Hello world.\nThis is a test.",
        output:
          "Characters: 28\nCharacters (no spaces): 23\nWords: 6\nSentences: 2\nParagraphs: 1\nLines: 2",
      },
      {
        title: "Meta description length check",
        input:
          "Our free developer tools convert, validate, and format data instantly in your browser.",
        output:
          "Characters: 86\nCharacters (no spaces): 74\nWords: 13\nSentences: 1\nParagraphs: 1\nLines: 1",
      },
    ],
    useCases: [
      "Checking a post against X's 280-character limit before publishing.",
      "Trimming meta descriptions and title tags to the pixel widths Google actually shows.",
      "Verifying SMS or push-notification copy fits one segment to avoid double billing.",
      "Confirming form field maxlength values against the content users actually need to enter.",
    ],
    faqs: [
      {
        q: "How is this different from the Word Counter?",
        a: "This tool leads with character metrics (total, excluding spaces, and lines) plus the Copy Stats export, because character-limit compliance is its main job. Word Counter instead emphasizes word and sentence statistics and estimated reading time at 200 words per minute for writers and SEO work.",
      },
      {
        q: "Do emojis and accented letters count as one character?",
        a: "The count uses JavaScript string length, which measures UTF-16 code units. Most accented letters count as one, but many emoji count as two because they are built from surrogate pairs. Platforms like X apply their own weighting rules, so treat emoji-heavy drafts as approximate.",
      },
      {
        q: "Are newlines counted?",
        a: "Yes: each line break is one character in the total and is also what creates the Lines figure. Characters (no spaces) strips every whitespace type including newlines and tabs, giving you the compact length of the visible text.",
      },
      {
        q: "Why does my word processor show a different count?",
        a: "Word processors tokenize hyphenated words and numbers differently and sometimes exclude headers or footers. This tool defines words as whitespace-separated tokens and sentences as .!? boundaries, so results are reproducible and align with what most web platforms count.",
      },
    ],
  },

  "regex-tester": {
    whatIs:
      "A regular expression is a compact pattern language for matching text, formalized here in ECMAScript, JavaScript's RegExp flavor. A pattern combines literals (cat), character classes ([0-9], \\d, \\w, \\s), quantifiers (*, +, ?, {n,m}), anchors (^ and $), capturing groups (...), and alternation (|). Flags modify meaning: g finds every match instead of just the first, i ignores case, m makes ^ and $ respect line boundaries, and s lets dots span newlines. Capture groups expose parenthesized subpatterns: in (\\d{4})-(\\d{2})-(\\d{2}), group 1 is the year. This tool runs JavaScript's native engine, so results match exactly what your browser and Node.js will produce.",
    whyUse: [
      "The match list shows each hit with its exact index in the string, which anchor and word-boundary bugs depend on.",
      "Capture groups are extracted per match, so date or log-parsing patterns can be verified before coding them.",
      "Highlighted Matches pane paints every match inside your test text for instant visual confirmation.",
      "Flag checkboxes (g, i, m, s) toggle without editing the pattern, making flag mistakes obvious.",
      "Copy produces a complete /pattern/flags literal ready to paste into code.",
    ],
    howToUse: [
      "Enter the pattern body between the / delimiters: type just the pattern, such as \\d+, not /\\d+/.",
      "Tick the flags you need: g (global), i (case-insensitive), m (multiline), s (dotAll).",
      "Paste sample text into the Test String area.",
      "Click Test to run it; matches appear on the right with indices and groups, and the text below highlights them.",
      "Click Copy to grab the full /pattern/flags, or Clear to reset everything.",
    ],
    examples: [
      {
        title: "Extract all numbers with the global flag",
        input: "Pattern: \\d+ | Flags: g | Text: Order #12345, item #678",
        output:
          "Matches (2):\n1) 12345 at index 7\n2) 678 at index 20",
      },
      {
        title: "Date parsing with capture groups",
        input:
          "Pattern: (\\d{4})-(\\d{2})-(\\d{2}) | Flags: g | Text: 2024-01-15 and 2023-12-31",
        output:
          "Match 1 at index 0: 2024-01-15, groups: 2024, 01, 15\nMatch 2 at index 15: 2023-12-31, groups: 2023, 12, 31",
      },
      {
        title: "Case-insensitive literal match",
        input: "Pattern: hello | Flags: i and g | Text: Hello WORLD hello",
        output:
          "Matches (2):\n1) Hello at index 0\n2) hello at index 12",
      },
    ],
    useCases: [
      "Debugging a validation regex that passes locally but fails on production data.",
      "Extracting IDs, dates, or amounts from logs before writing the final script.",
      "Learning how flags change behavior by toggling i or m against the same text.",
      "Reviewing a pattern copied from Stack Overflow against your actual input format.",
    ],
    faqs: [
      {
        q: "Does it support lookbehind assertions?",
        a: "Yes: JavaScript has supported (?<=...) and (?<!...) since ES2018, and modern browsers run them through this tool. Lookaheads like (?=...) work too, but features from other regex flavors such as .NET named groups may not.",
      },
      {
        q: "Why does my pattern match only once?",
        a: "Without the g flag, a RegExp returns just the first match, and this tool's exec loop stops after one hit on purpose to mirror JavaScript. Tick g for find-all behavior; the flags field already starts with g by default.",
      },
      {
        q: "Why doesn't my regex match anything?",
        a: "Typical causes include unescaped metacharacters (a dot matches any character, so escape it as \\. when you mean a literal period), wrong anchors (^ and $ match string edges unless m is set), or a forgotten flag. A count of zero with 'No matches found' confirms the pattern simply did not apply.",
      },
      {
        q: "How do capture groups differ from the full match?",
        a: "Parentheses remember their inner text: the full match is the entire pattern's span, while each group is one parenthesized slice. Group numbering follows opening-paren order, and non-capturing groups like (?:...) group structure without consuming a number.",
      },
    ],
  },

  "diff-checker": {
    whatIs:
      "A diff compares two versions of text and reports the smallest set of line changes that transforms one into the other. Most line-based diffs, including git diff and the unified format, rest on the Longest Common Subsequence algorithm: it finds the longest run of lines that appears unchanged in both inputs, and everything outside that spine is marked as removed from the left or added on the right. Results render with line numbers and symbols (+ for additions, - for deletions) so reviewers can see exactly what moved. This tool computes an LCS diff between two pasted texts and summarizes it with added, removed, and unchanged line counts.",
    whyUse: [
      "Side-by-side input panels mirror how code review tools present original versus modified text.",
      "Color-coded table with both left and right line numbers plus + and - markers, like a unified diff.",
      "Header stats (+added, -removed, unchanged) give an at-a-glance summary before you read individual lines.",
      "Whitespace is preserved in pre-formatted rows, so indentation changes remain visible.",
      "Runs locally, so confidential code or contract text never leaves your machine.",
    ],
    howToUse: [
      "Paste the original version of the text into the Original Text panel.",
      "Paste the changed version into the Modified Text panel.",
      "Click Compare.",
      "Read the stats line, then scan the table: green rows are additions, red rows are removals, unmarked rows are unchanged.",
      "Use the left and right line-number columns to locate changes in each source, then Clear to start a new comparison.",
    ],
    examples: [
      {
        title: "One line changed",
        input:
          "Original: apple\nbanana\ncherry | Modified: apple\nblueberry\ncherry",
        output:
          "+1 added, -1 removed, 2 unchanged\nLeft 1 / Right 1: apple (unchanged)\nLeft 2: banana (removed)\nRight 2: blueberry (added)\nLeft 3 / Right 3: cherry (unchanged)",
      },
      {
        title: "Identical texts",
        input: "Original: hello | Modified: hello",
        output:
          "0 added, 0 removed, 1 unchanged\nLeft 1 / Right 1: hello (unchanged)",
      },
    ],
    useCases: [
      "Reviewing config or SQL changes without opening a full Git client.",
      "Comparing two versions of a legal or API contract paragraph by paragraph.",
      "Checking whether a minified file actually changed after regeneration.",
      "Verifying copy edits in documentation between drafts.",
    ],
    faqs: [
      {
        q: "Word-level or line-level differences?",
        a: "Line-level: each input is split on newlines and whole lines are marked added, removed, or unchanged. A one-word edit inside a long line therefore shows the entire line as changed. For character-level precision, compare the individual lines with a dedicated tool first.",
      },
      {
        q: "How are moved lines reported?",
        a: "The LCS algorithm marks a relocated line as removed from its old position and added at the new one; it does not track moves the way git's --color-moved option does. That is standard diff semantics and keeps the output unambiguous.",
      },
      {
        q: "What do the two line-number columns mean?",
        a: "The first is the line number in the original text, the second in the modified text. A removed line has only a left number, an added line only a right number, and unchanged lines show matching context numbers so you can map positions between versions.",
      },
      {
        q: "Is there a limit on text size?",
        a: "LCS runs in O(n x m) time and memory for n and m lines, which is fine for files of hundreds or a few thousand lines. Pasting tens of thousands of lines can stall the tab, so for large files use git diff or the diff command-line tool instead.",
      },
    ],
  },

  "image-compressor": {
    whatIs:
      "Image compression reduces file size by discarding data the eye is less likely to notice, trading fidelity for bytes. Lossy formats like JPEG and WebP use chroma subsampling and quantization: the quality slider from 10 to 100 controls how aggressively high-frequency detail is discarded, with 80 usually looking fine on screens and 50 showing artifacts on sharp edges. PNG stays lossless, so savings there come mostly from downscaling. This tool draws your image onto an HTML canvas at up to your chosen max width or height (default 1920px), re-encodes it at the selected quality via canvas.toBlob, and keeps lowering quality in 10% steps until the output fits a 1 MB target.",
    whyUse: [
      "Side-by-side original and compressed previews plus exact before and after byte sizes and a Saved percentage.",
      "Quality slider 10-100 and max-dimension slider 100-4000px give fine control over the size and appearance tradeoff.",
      "Automatic downscale to a max width or height preserves aspect ratio while cutting the largest size driver.",
      "Downloads with the original filename prefixed compressed- so versions never overwrite each other.",
      "Files are read with FileReader and re-encoded on canvas; no upload to any server occurs.",
    ],
    howToUse: [
      "Choose Quality (%) and Max Width/Height with the two sliders (defaults: 80% and 1920px).",
      "Click the file input and select a JPG, PNG, or WebP image.",
      "Review the Original preview and its file size.",
      "Click Compress to re-encode; the Compressed preview appears with its new size and the green savings banner showing Original, Compressed, and Saved %.",
      "Click Download to save compressed-<filename>, or Clear to start over.",
    ],
    examples: [
      {
        title: "Typical photo compression",
        input: "photo.jpg (2.5 MB), Quality: 80%, Max Width/Height: 1920px",
        output:
          "Compressed size and Saved % appear in the green banner (for a typical photo, roughly 400 KB and about 84% saved; exact values depend on image content).",
      },
      {
        title: "Aggressive setting for thumbnails",
        input: "screenshot.png (1.8 MB), Quality: 50%, Max Width/Height: 800px",
        output:
          "Dimensions are scaled down to fit 800px; the green banner reports the new byte size and Saved % (PNG savings come from the downscale because PNG encoding is lossless).",
      },
    ],
    useCases: [
      "Shrinking hero images and screenshots before committing them to a website repo.",
      "Meeting upload limits on CMS, issue trackers, or email attachments that reject multi-megabyte files.",
      "Batch-preparing product or portfolio images at 1920px for fast page loads.",
      "Reducing bandwidth for mobile visitors by re-encoding oversized photos.",
    ],
    faqs: [
      {
        q: "What quality setting should I use?",
        a: "80% is the usual sweet spot for photos: visually clean at typical screen sizes with large savings. Drop to 50-70% for thumbnails or backgrounds where bytes matter more, and keep 90%+ only for images with fine detail you will inspect up close.",
      },
      {
        q: "Why didn't my PNG shrink much?",
        a: "PNG is lossless, so the quality slider does not discard pixel detail for PNG output. Savings come from the max-dimension downscale; if the image already fits within 1920px on its longest side, expect little change. Convert to JPEG or WebP if you need aggressive reduction.",
      },
      {
        q: "Is my image uploaded anywhere?",
        a: "No. The file is read locally with FileReader, drawn to a canvas, and re-encoded in the page; nothing is transmitted. You can verify zero upload requests in the Network tab during compression.",
      },
      {
        q: "Does compression change the image dimensions?",
        a: "Only when the longer edge exceeds your Max Width/Height setting, in which case both sides scale down proportionally and aspect ratio is preserved. At or below the limit, dimensions stay identical and only the encoder settings change.",
      },
    ],
  },

  "color-contrast": {
    whatIs:
      "The Web Content Accessibility Guidelines quantify readable contrast as a ratio between 1:1 and 21:1. First you compute each color's relative luminance: every sRGB channel is divided by 255, linearized with a gamma correction, then combined as L = 0.2126R + 0.7152G + 0.0722B using weights that reflect the human eye's sensitivity to green. The contrast ratio is (L1 + 0.05) / (L2 + 0.05) with the lighter color on top, so black on white is exactly 21:1. WCAG requires 4.5:1 for normal body text at Level AA, 7:1 for Level AAA, and 3:1 for large text (18pt or larger, or 14pt bold), which is also the bar for many UI component boundaries.",
    whyUse: [
      "Reports the numeric ratio to two decimals alongside the AA, AAA, and Large verdicts used in accessibility audits.",
      "Three pass and fail rows mirror the exact WCAG thresholds: 4.5 for AA normal, 7 for AAA normal, and 3 for AA large.",
      "Live sample text renders in your chosen colors so you can judge readability, not just numbers.",
      "Accepts hex codes directly or pick visually with the color wells.",
      "Fast re-check workflow: adjust a shade and test again without reloading.",
    ],
    howToUse: [
      "Set the Foreground Color (the text) using the picker or by typing a hex code such as #333333.",
      "Set the Background Color the text sits on.",
      "Click Check Contrast.",
      "Read the Contrast Ratio (X.XX:1) and the WCAG Rating badge: AAA, AA, AA Large, or Fail.",
      "Check the three threshold rows (Normal Text AA, Normal Text AAA, Large Text AA) before shipping the palette.",
    ],
    examples: [
      {
        title: "Pure black on white",
        input: "Foreground: #000000, Background: #FFFFFF",
        output:
          "Contrast Ratio: 21.00:1\nWCAG Rating: AAA\nNormal Text (AA): Pass | Normal Text (AAA): Pass | Large Text (AA): Pass",
      },
      {
        title: "Muted gray meets AA but not AAA",
        input: "Foreground: #767676, Background: #FFFFFF",
        output:
          "Contrast Ratio: 4.54:1\nWCAG Rating: AA\nNormal Text (AA): Pass | Normal Text (AAA): Fail | Large Text (AA): Pass",
      },
      {
        title: "Brand blue fails body text",
        input: "Foreground: #3498db, Background: #FFFFFF",
        output:
          "Contrast Ratio: 3.15:1\nWCAG Rating: AA Large\nNormal Text (AA): Fail | Normal Text (AAA): Fail | Large Text (AA): Pass",
      },
    ],
    useCases: [
      "Auditing body text and button labels against WCAG 2.2 AA before an accessibility review.",
      "Choosing a darker shade when a brand color fails the 4.5:1 text requirement.",
      "Verifying hover, visited states, and placeholder text in dark themes.",
      "Documenting contrast ratios in a design system's accessibility notes.",
    ],
    faqs: [
      {
        q: "What is the difference between AA and AAA?",
        a: "AA is the baseline most regulations reference: 4.5:1 for normal text and 3:1 for large text. AAA raises normal text to 7:1. AAA is aspirational for full sites; aiming for it on body copy is good practice, but it is rarely mandated wholesale.",
      },
      {
        q: "What counts as large text?",
        a: "WCAG defines large as at least 18pt (roughly 24px) normal weight, or 14pt (roughly 18.66px) bold, about 1.5x the body size. For those sizes the required ratio drops to 3:1. Captions, paragraphs, and form labels still need 4.5:1 at AA.",
      },
      {
        q: "Why do two similar grays get different ratios?",
        a: "Luminance is non-linear: mid-grays change perceptually faster than near-black or near-white values, and the green-heavy weighting (0.7152) means greenish grays read lighter. Always measure with the formula rather than eyeballing distance on the color wheel.",
      },
      {
        q: "Does the checker account for images behind text?",
        a: "No. It compares two solid hex colors. WCAG requires the ratio against the worst-case point of any background image or gradient, so check the lightest and darkest regions behind your text, or add a solid scrim until both extremes pass.",
      },
    ],
  },

  "user-agent-parser": {
    whatIs:
      "A User-Agent string is the identification a browser sends in the HTTP User-Agent header, historically a space-piled description like Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ... Chrome/120.0.0.0 Safari/537.36. Each token signals something: the platform token (Windows NT 10.0) maps to the OS version, Chrome/120 is the browser build, AppleWebKit/537 is the rendering engine shared by Safari and Chromium browsers, and Mobile or iPhone markers identify form factor. Servers parse these tokens to tailor responses, gather analytics, or gate features, though the practice is declining as browsers freeze UA details for privacy (User-Agent reduction) in favor of client hints. This tool applies ordered regular expressions to extract browser, OS, device, and engine.",
    whyUse: [
      "Four result cards (Browser, Operating System, Device, Engine) each show a name and version extracted from the string.",
      "One-click sample buttons load realistic Chrome/Windows, Safari/macOS, Firefox/Linux, and iPhone strings for quick tests.",
      "Copy JSON exports the full parsed structure for logging or bug reports.",
      "Ordered regex rules mirror real-world precedence: Edge and Opera are checked before Chrome, which would otherwise match inside them.",
      "Works offline on pasted strings, so you can parse UAs captured from server logs privately.",
    ],
    howToUse: [
      "Paste a User-Agent string, or click one of the sample buttons to load an example.",
      "Click Parse (samples parse immediately when clicked).",
      "Read the four cards: Browser, Operating System, Device, and Engine with their versions.",
      "Click Copy JSON to grab the structured result.",
      "Clear resets the input and cards.",
    ],
    examples: [
      {
        title: "Chrome on Windows",
        input:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        output:
          "Browser: Chrome (120)\nOS: Windows 10\nDevice: Desktop\nEngine: WebKit (537)",
      },
      {
        title: "Mobile Safari on iPhone",
        input:
          "Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1",
        output:
          "Browser: Safari (604)\nOS: iOS (17.2)\nDevice: Mobile\nEngine: WebKit (605)",
      },
      {
        title: "Firefox on Linux",
        input:
          "Mozilla/5.0 (X11; Linux x86_64; rv:121.0) Gecko/20100101 Firefox/121.0",
        output:
          "Browser: Firefox (121)\nOS: Linux\nDevice: Desktop\nEngine: Gecko (20100101)",
      },
    ],
    useCases: [
      "Reproducing mobile-specific bugs by pasting the UA string from a support ticket.",
      "Testing analytics rules that segment traffic by browser or device type.",
      "Verifying what UA your own app sends by copying navigator.userAgent into the parser.",
      "Learning UA anatomy when implementing device detection or feature flags.",
    ],
    faqs: [
      {
        q: "Why is the browser version just 120 instead of 120.0.0.0?",
        a: "The extraction rules capture the major version number (Chrome/120 becomes 120), which is what compatibility decisions usually need. Minor and build numbers change constantly within a major release and rarely affect behavior.",
      },
      {
        q: "Can User-Agent strings be trusted?",
        a: "Not for security or fully accurate analytics: they are trivially spoofed, and browsers are actively shrinking them for privacy as sec-ch-ua client hints replace much of this data. Treat the output as a hint about the requesting client, never as proof of it.",
      },
      {
        q: "Why does my browser show as Safari or the wrong engine?",
        a: "Chrome and Edge include a Safari/537.36 token in their strings, so detection order matters: Edge and Opera rules run first, then Chrome, and only then would Safari match. String-based detection is inherently heuristic, which is why the tool evaluates rules in precedence order.",
      },
      {
        q: "What about desktop versus mobile detection?",
        a: "Device type is decided by Mobile, iPhone, and iPod markers (Mobile), then iPad and Android-tablet markers (Tablet), and defaults to Desktop when neither appears. Vendor and model are no longer exposed by modern browser UAs, so they are reported as Unknown.",
      },
    ],
  },

  "email-validator": {
    whatIs:
      "Email syntax is governed by RFC 5321 (transport) and RFC 5322 (header format). An address is local-part@domain: the local part is up to 64 characters where dots may appear inside but never at the start, end, or doubled; the domain is up to 253 characters, must contain at least one dot, and cannot start or end with a hyphen. Quoted local parts and comments exist in the RFC but are rarely supported in practice, so validators like this one stick to the everyday ASCII subset plus common specials (!#$%&'*+/=?^_`{|}~-). Crucially, syntax validation only proves the shape is legal: confirming a mailbox exists requires an MX DNS lookup, and confirming delivery requires sending mail.",
    whyUse: [
      "Error messages name the exact broken rule, such as 'Local part cannot have consecutive dots', instead of a generic invalid verdict.",
      "Valid addresses are split into local part and domain so you can reuse them in code or spreadsheets.",
      "Enforces RFC limits: 64-character local part, 253-character domain, mandatory dot in the domain, and hyphen placement.",
      "Enter key submits, making rapid validation of a list quick.",
      "Checks run in-browser, so addresses from real users are not transmitted.",
    ],
    howToUse: [
      "Type or paste an address into the Email Address field.",
      "Click Validate or press Enter.",
      "If valid, read the green panel showing the extracted local part and domain.",
      "If invalid, review the bulleted error list: every failing rule is reported, not just the first.",
      "Click Clear to reset, then enter the next address.",
    ],
    examples: [
      {
        title: "Valid address with plus tag",
        input: "jane.doe+tag@sub.example.com",
        output:
          "Valid Email\nLocal part: jane.doe+tag | Domain: sub.example.com",
      },
      {
        title: "Consecutive dots in local part",
        input: "john..doe@example.com",
        output: "Invalid Email\n- Local part cannot have consecutive dots.",
      },
      {
        title: "Domain without a dot",
        input: "admin@localhost",
        output: "Invalid Email\n- Domain must contain at least one dot.",
      },
    ],
    useCases: [
      "Screening signup form input before it reaches your mail provider and its bounce penalties.",
      "Cleaning an exported contact list prior to import into a marketing tool.",
      "Verifying test accounts in QA scripts where a typo'd domain would fail silently.",
      "Teaching the difference between syntactically valid and deliverable addresses.",
    ],
    faqs: [
      {
        q: "Does this check if the mailbox exists?",
        a: "No. It validates syntax only. Existence requires an MX record lookup plus SMTP probing, and even that cannot guarantee delivery because of greylisting and catch-all addresses. Common practice is to validate format at signup and verify deliverability by sending a confirmation email.",
      },
      {
        q: "Why was a valid-looking address rejected?",
        a: "Common causes: a domain with no dot (admin@localhost), consecutive or leading dots, more than one @, or characters outside the accepted set. The panel lists every violated rule, so read all bullets: fixing one may reveal the next.",
      },
      {
        q: "Does it accept international (Unicode) addresses?",
        a: "Only the ASCII subset is checked. Internationalized addresses like a Chinese-script domain require punycode conversion (each Unicode label rewritten to its xn-- form) before DNS can resolve them; convert to punycode first, then validate the ASCII result.",
      },
      {
        q: "What about quotes and plus addressing?",
        a: "Plus tags such as user+tag@domain.com use allowed local characters and pass. Fully quoted local parts like \"john doe\"@example.com from RFC 5322 are rejected because real-world providers rarely support them and the embedded @ would confuse most parsers.",
      },
    ],
  },

  "url-validator": {
    whatIs:
      "A URL is valid when it parses under the WHATWG URL Standard, the algorithm browsers themselves use, and when its scheme is one you intend to support. The scheme (https:, ftp:, mailto:) must be followed by :// for hierarchical schemes, the host must be a domain or IP literal, and the remaining path, query, and fragment components follow RFC 3986 character rules. Two points people often confuse: a string like www.example.com is a valid hostname but an invalid URL because it lacks a scheme, and permissive parsers will happily accept javascript: and data: schemes, which are dangerous in link hrefs. Allowlisting protocols is a security control, not pedantry.",
    whyUse: [
      "Catches the number one mistake, a missing https://, with an explicit message rather than a confusing parse failure.",
      "Protocol allowlist flags dangerous schemes like javascript: that could indicate an injection attempt.",
      "On success, shows the parsed protocol, hostname, port, path, query, and hash for double-checking.",
      "Accepts Enter-key submission for quick sequential checks.",
      "Validates with the same URL parser your browser uses, so results match real-world behavior.",
    ],
    howToUse: [
      "Paste the full URL into the URL field.",
      "Click Validate or press Enter.",
      "If valid, review the green panel's components: protocol, hostname, port, path, query, and hash.",
      "If invalid, read the error bullets: missing protocol and unsupported schemes are called out explicitly.",
      "Clear resets the field and result.",
    ],
    examples: [
      {
        title: "Well-formed HTTPS URL",
        input: "https://example.com:8080/docs?lang=en#intro",
        output:
          "Valid URL\nProtocol: https: | Hostname: example.com | Port: 8080 | Path: /docs | Query: ?lang=en | Hash: #intro",
      },
      {
        title: "Missing scheme",
        input: "www.example.com",
        output:
          "Invalid URL\n- Invalid URL format. Make sure to include the protocol (e.g., https://).",
      },
      {
        title: "Dangerous scheme rejected",
        input: "javascript:alert(1)",
        output: "Invalid URL\n- Unsupported protocol: javascript:",
      },
    ],
    useCases: [
      "Vetting user-submitted link fields before storing or rendering them.",
      "Checking sitemap and crawler-disallow URLs for typos before deployment.",
      "Validating callback and webhook URLs in integration configuration screens.",
      "Teaching the difference between a hostname and a fully qualified URL.",
    ],
    faqs: [
      {
        q: "Which protocols are accepted?",
        a: "http:, https:, ftp:, ftps:, mailto:, and tel: pass the allowlist; anything else, including javascript:, data:, and file:, is reported as an unsupported protocol. Restricting schemes in user input is a basic XSS defense, since javascript: URLs execute when followed.",
      },
      {
        q: "Is example.com without https:// ever valid?",
        a: "Not as a URL. Browsers may auto-complete it for you in the address bar, but programmatic parsers require a scheme, and that is the most common cause of failed validation. Add the protocol, or use the URL Parser for inspecting already complete links.",
      },
      {
        q: "Does it check that the domain exists?",
        a: "No. Validation is purely syntactic: it confirms the string parses and the scheme is allowed. DNS resolution, certificate checks, and HTTP status are separate concerns that need network requests the tool deliberately does not make.",
      },
      {
        q: "What about IP addresses, ports, and encoded characters?",
        a: "The URL constructor handles hostnames, IPv4 and IPv6 literals, and explicit ports, which appear in the Port row when present. Percent-encoded characters in the path and query are accepted and shown as written in the parsed components.",
      },
    ],
  },

  "phone-validator": {
    whatIs:
      "Phone numbers are structured by the international E.164 standard: an optional leading +, a country code of one to three digits (first digit non-zero), and a national number, with no more than 15 digits in total. That is why +1 415 555 2671 becomes +14155552671 when normalized. Locally, numbers are written in many styles: (415) 555-2671, 415-555-2671, or 415 555 2671, all of which reduce to the same digit string once spaces, dashes, and parentheses are stripped. A validator's job is to remove formatting characters, enforce practical length bounds (7 to 15 digits), detect whether the number looks international or US/Canada style, and present a normalized digit form.",
    whyUse: [
      "Strips spaces, dashes, and parentheses before validating, so users can paste numbers in any common style.",
      "Detects the format class (International, US/Canada, or National) and extracts country code and national number separately.",
      "Returns a normalized digit string ready for storage or dialing APIs.",
      "Reports multiple problems at once, such as too short and format issues, instead of stopping at the first.",
      "Validation happens locally, so numbers from customer records are not posted to a third-party service.",
    ],
    howToUse: [
      "Enter the number in any style: +44 20 7183 8750, (555) 123-4567, or bare digits.",
      "Click Validate or press Enter.",
      "If valid, read Format, Normalized, Country Code, and National Number.",
      "If invalid, review the error bullets for length, illegal characters, or unrecognized format.",
      "Clear to reset for the next number.",
    ],
    examples: [
      {
        title: "US/Canada style",
        input: "(555) 123-4567",
        output:
          "Valid Phone Number\nFormat: US/Canada\nNormalized: 5551234567\nCountry Code: +1\nNational Number: 5551234567",
      },
      {
        title: "International with country code",
        input: "+44 20 7183 8750",
        output:
          "Valid Phone Number\nFormat: International\nNormalized: +442071838750\nNational Number: 2071838750",
      },
      {
        title: "Too short",
        input: "12345",
        output:
          "Invalid Phone Number\n- Phone number is too short (minimum 7 digits).",
      },
    ],
    useCases: [
      "Validating checkout or signup phone fields before sending OTP and SMS messages, since bad numbers waste SMS credits.",
      "Normalizing messy CRM imports into E.164 for Twilio or Vonage APIs.",
      "Checking whether a form expects a country code by testing local versus international formats.",
      "Cleaning support-ticket contact data before click-to-dial integration.",
    ],
    faqs: [
      {
        q: "What is E.164 and why normalize to it?",
        a: "E.164 is the ITU-T standard formatting of + country code plus national number with at most 15 digits. Telephony APIs require it because they need the country code unambiguously, and storing E.164 also makes deduplication possible across formatting styles.",
      },
      {
        q: "Does a valid result mean the number exists?",
        a: "No. The tool checks digit-count bounds and pattern shape only. A number can be perfectly formatted yet unassigned or disconnected; real verification requires a carrier or HLR lookup service.",
      },
      {
        q: "Which formats are recognized?",
        a: "Three classes: International (a + prefix with 7 to 15 digits after the country code), US/Canada (10-digit style with optional +1, parentheses, and separators), and National (digit strings that fit the basic rule without matching the others). Unrecognized layouts produce a format error.",
      },
      {
        q: "Why is my local number rejected without a country code?",
        a: "Local formats like 020 7183 8750 often begin with a trunk zero that is only valid within one country, and digits starting with 0 fail the international digit rule. When sending internationally, always include the country code so the result is unambiguous.",
      },
    ],
  },

  "credit-card-validator": {
    whatIs:
      "Credit card numbers follow an ISO/IEC 7812 numbering structure: a six-digit issuer identification number (IIN, formerly BIN), an account identifier, and a final check digit computed with the Luhn algorithm (mod 10). Luhn was invented at IBM in 1954: starting from the right, double every second digit, subtract 9 from any doubled value above 9, sum all digits, and the total must be divisible by 10. Luhn catches single-digit errors and most adjacent transpositions like 12 becoming 21, which is why terminals validate it before contacting a bank. Brands also enforce lengths: Visa 13, 16, or 19; Mastercard 16; American Express 15; Discover 16 or 19. This tool strips formatting, runs Luhn, and detects the brand from the leading digits.",
    whyUse: [
      "Runs the actual Luhn mod-10 checksum, not just a length rule, so typos are caught before submission.",
      "Detects Visa, Mastercard, American Express, Discover, Diners Club, JCB, UnionPay, and Maestro from IIN prefixes.",
      "Accepts spaces or dashes and reformats the digits into neat four-digit groups.",
      "Validates brand-specific lengths (such as Amex must be 15 digits) with a specific error message.",
      "Purely local format checking: the tool explicitly never sends the number anywhere.",
    ],
    howToUse: [
      "Enter the card number with or without spaces or dashes, for example 4111 1111 1111 1111.",
      "Click Validate or press Enter.",
      "If valid, read Card Type and the grouped Formatted value.",
      "If invalid, review the specific errors: bad length, unrecognized IIN, or failed Luhn check.",
      "Clear resets the field.",
    ],
    examples: [
      {
        title: "Standard Visa test number",
        input: "4111111111111111",
        output:
          "Valid Card Number\nCard Type: Visa\nFormatted: 4111 1111 1111 1111",
      },
      {
        title: "American Express test number",
        input: "378282246310005",
        output:
          "Valid Card Number\nCard Type: American Express\nFormatted: 3782 8224 6310 005",
      },
      {
        title: "Visa with a typo (fails Luhn)",
        input: "4111111111111112",
        output: "Invalid Card Number\n- Card number failed Luhn check.",
      },
    ],
    useCases: [
      "Front-end form validation that rejects fat-fingered numbers before an API call costs a transaction fee.",
      "QA testing of payment forms using known-good test numbers for each brand.",
      "Cleaning exported transaction data by filtering rows that fail the checksum.",
      "Teaching the Luhn algorithm with immediate pass and fail feedback.",
    ],
    faqs: [
      {
        q: "Is this a payment or authorization check?",
        a: "No. It verifies format only: Luhn checksum, IIN prefix, and length. It cannot tell whether the card is active, has funds, or belongs to anyone; that requires a payment processor. Never present format validation as proof a card is real.",
      },
      {
        q: "Why does a real-looking number fail Luhn?",
        a: "One wrong digit anywhere breaks the mod-10 sum. Check for typos and transpositions, which is exactly what Luhn was designed to catch. Conversely, the last digit of every valid card number is determined by the preceding digits, so almost-random numbers almost always fail.",
      },
      {
        q: "Which test numbers should I use in development?",
        a: "Common sandbox numbers include 4111 1111 1111 1111 (Visa), 5555 5555 5555 4444 (Mastercard), 3782 8224 6310 005 (Amex), and 6011 1111 1111 1117 (Discover). Stripe, Braintree, and PayPal document their own sets; these pass Luhn but exist only for testing.",
      },
      {
        q: "Does it store or transmit my input?",
        a: "No. The digits are checked in your browser with a small checksum loop and never leave the page. Even so, make it a habit to avoid pasting real card numbers into any online tool, out of caution.",
      },
    ],
  },

  "json-schema-validator": {
    whatIs:
      "JSON Schema is a vocabulary for declaring the shape of JSON data: a schema is itself a JSON document where type declares the expected JSON type, properties describes each field's sub-schema, required lists mandatory keys, enum restricts values to a fixed set, minimum and maximum bound numbers, minLength and maxLength bound strings, pattern applies a regular expression, and items validates every element of an array. Schemas act as machine-readable contracts, so API teams publish them and clients can fail fast instead of crashing downstream. This tool evaluates a data document against a practical subset of these keywords, descends into nested objects and arrays, and returns each violation with a path like profile.age.",
    whyUse: [
      "Errors carry a path prefix (age, items[0].name style) so you know exactly which field in a nested document failed.",
      "Checks types, required fields, enums, numeric ranges, string length, and regex patterns in a single pass.",
      "Data and schema panels load with a working default example, so the workflow is clear immediately.",
      "Multiple violations are all reported together: fix a batch, not one error at a time.",
      "Everything is evaluated locally, so API payloads and internal schemas stay in the tab.",
    ],
    howToUse: [
      "Paste the JSON document to check into the JSON Data panel (a sample object is prefilled).",
      "Paste or edit the schema in the JSON Schema panel (a sample with type, properties, minimum, and required is prefilled).",
      "Click Validate.",
      "If it fails, read each bullet: the path prefix shows the offending field and the message states the rule broken.",
      "Fix the data or schema and re-validate; Clear empties both panels.",
    ],
    examples: [
      {
        title: "Matching the default schema",
        input:
          'Data: {"name": "John", "age": 30, "email": "john@example.com"} | Schema: {"type":"object","properties":{"name":{"type":"string"},"age":{"type":"number","minimum":0},"email":{"type":"string"}},"required":["name","age"]}',
        output: "Data matches the schema",
      },
      {
        title: "Out-of-range value",
        input:
          'Data: {"name": "John", "age": -5} | Schema: (same as above)',
        output: "Validation failed\n- age: Value must be at least 0.",
      },
      {
        title: "Missing required property",
        input: 'Data: {"age": 30} | Schema: (same as above)',
        output:
          'Validation failed\n- name: Required property "name" is missing.',
      },
    ],
    useCases: [
      "Verifying an API response matches its published schema during integration tests.",
      "Sanity-checking config files such as settings.json or package metadata against their documented schema.",
      "Learning JSON Schema keywords by editing the prefilled example and watching errors change.",
      "Reviewing form-submission payloads before wiring up server-side validation.",
    ],
    faqs: [
      {
        q: "Which JSON Schema keywords are supported?",
        a: "type (including unions like string|number), properties, required, enum, minimum, maximum, minLength, maxLength, pattern, and items: the core of draft-07. Advanced constructs such as $ref, allOf, anyOf, oneOf, if/then/else, and format are not evaluated; schemas using them will validate only the parts this tool understands.",
      },
      {
        q: "Does it forbid extra properties?",
        a: "Not by default: additionalProperties: false is not enforced in this implementation, so unexpected extra keys pass unless another rule catches them. If strictness matters, compare the key set manually or use a full draft-07 library such as ajv in your test suite.",
      },
      {
        q: "Why did my number fail a type check?",
        a: "JSON types are respected strictly: 30 is a number but \"30\" is a string, and a type: number constraint fails on the quoted version with an 'Expected type number, got string' message. That distinction is one of the most useful checks this validator performs.",
      },
      {
        q: "Is the data uploaded for validation?",
        a: "No. Both documents are parsed and checked with JavaScript in the page. Schemas frequently describe private API contracts and payloads contain user records, so keeping evaluation client-side matters; you can verify no network traffic accompanies the Validate click.",
      },
    ],
  },

  "word-counter": {
    whatIs:
      "Word count is the standard measure of content length for writing and publishing: a word is any run of text separated by whitespace, so don't and open-source each count as one. Beyond raw words, editors track sentences (delimited by ., !, and ?), paragraphs (blocks separated by blank lines), and estimated reading time, conventionally 200 words per minute for an average adult reading silently. That is why a 600-word post shows as 3 minutes. Publishers use these numbers to brief writers (800-1,200 words for a typical blog post), SEOs estimate content depth against top-ranking pages, and academics enforce thesis limits. This tool computes words, characters, sentences, paragraphs, and reading time live as you type.",
    whyUse: [
      "Estimated reading time at 200 words per minute, the figure most editorial style guides assume.",
      "Live updates while you type or paste: there is no convert button to press.",
      "Sentence and paragraph counts reveal structural quality: run-on paragraphs or too-short sentences.",
      "Words appear first in the layout because that is the metric writers check against a brief.",
      "Counts are computed locally with no text leaving the browser.",
    ],
    howToUse: [
      "Paste or type your draft into the Input Text area.",
      "Watch the six cards update instantly: Words, Characters, Characters (no spaces), Sentences, Paragraphs, and Reading Time.",
      "Use Words against your target (for example 1,500 for a long-form post) and Reading Time to set reader expectations.",
      "Check Sentences and Paragraphs to confirm the piece is broken into scannable chunks.",
      "Keep editing: stats recompute on every keystroke.",
    ],
    examples: [
      {
        title: "Short passage stats",
        input: "Hello world. This is a test.",
        output:
          "Words: 6\nCharacters: 28\nCharacters (no spaces): 23\nSentences: 2\nParagraphs: 1\nReading Time: 1 min",
      },
      {
        title: "Reading time scales with length",
        input: "Any 450-word article draft",
        output:
          "Words: 450\nReading Time: 3 min (450 divided by 200 wpm is 2.25, rounded up to the next minute)",
      },
    ],
    useCases: [
      "Hitting a freelance brief's word target, such as 'submit 1,200 plus or minus 100 words'.",
      "Estimating read time to display on a blog index or newsletter introduction.",
      "Checking that a landing-page section is scannable via sentence and paragraph counts.",
      "Comparing draft length against the average length of ranking articles for an SEO target.",
    ],
    faqs: [
      {
        q: "How is this different from the Character Counter?",
        a: "This page is built around words and reading time, the metrics writers, editors, and SEOs size content with, and shows estimated minutes at 200 wpm. Character Counter leads with characters (with and without spaces) and line counts plus a Copy Stats export, for fitting hard character limits like tweets, meta descriptions, and form fields.",
      },
      {
        q: "Why 200 words per minute?",
        a: "Silent reading studies put average adult prose reading around 200-250 wpm; 200 is the conservative figure most editorial and UX guidelines use, and results round up, so even a 10-word snippet shows '1 min' rather than a fraction. Dense technical material is read slower, so adjust mentally for your audience.",
      },
      {
        q: "How are words and sentences counted?",
        a: "Words are whitespace-separated tokens after trimming, so hyphenated compounds stay one word. Sentences split on runs of ., !, or ? and discard empty pieces; abbreviations like 'Dr.' can end a sentence early, so treat the count as an estimate rather than a grammar verdict.",
      },
      {
        q: "Why does my word processor disagree?",
        a: "Apps like Word count hyphenation, footnotes, and text boxes differently and may exclude headers. This tool uses transparent web-oriented rules (whitespace tokens, .!? sentences, blank-line paragraphs) that match how CMS editors and many SEO tools count.",
      },
    ],
  },

  "text-reverser": {
    whatIs:
      "Reversing text is a classic string operation: take the sequence of characters and emit them backwards. The subtlety lies in what counts as a unit. Character mode reverses every code point, turning Hello World into dlroW olleH. Word mode keeps the characters inside each word intact but reverses the word order (Hello World Foo becomes Foo World Hello), which requires splitting on whitespace and rejoining with single spaces. Line mode does the same at the paragraph level, swapping line order while preserving each line's content, which is useful for flipping newest-first log exports. In JavaScript, strings are UTF-16 sequences, so naive reversal operates on code units: most text is safe, but emoji built from surrogate pairs can break.",
    whyUse: [
      "Three modes (characters, words, lines) cover the distinct reversal jobs without options overload.",
      "Side-by-side input and output panes show the transformation immediately after clicking Reverse.",
      "Copy button takes the exact reversed string to the clipboard, preserving whitespace.",
      "Word and line modes normalize runs of whitespace to single separators, giving clean output.",
      "Instant local processing for palindromes, obfuscation, and test data.",
    ],
    howToUse: [
      "Click the characters, words, or lines tab to choose your reversal mode.",
      "Paste the source text into the Input panel.",
      "Click Reverse.",
      "Read the result in the Output panel, which is read-only so you cannot accidentally edit it.",
      "Click Copy to grab it, or Clear to reset both panels.",
    ],
    examples: [
      {
        title: "Character reversal",
        input: "Hello World (mode: characters)",
        output: "dlroW olleH",
      },
      {
        title: "Word order reversal",
        input: "Hello World Foo (mode: words)",
        output: "Foo World Hello",
      },
      {
        title: "Line order reversal",
        input: "line one\nline two\nline three (mode: lines)",
        output: "line three\nline two\nline one",
      },
    ],
    useCases: [
      "Creating palindrome test strings for interview practice or unit tests.",
      "Flipping newest-first exports to chronological order with the lines mode.",
      "Generating obfuscated placeholder text or puzzle answers.",
      "Verifying that string-handling code behaves correctly on reversed inputs.",
    ],
    faqs: [
      {
        q: "What happens to multiple spaces between words?",
        a: "Words mode splits on runs of whitespace and rejoins with exactly one space, so 'a   b' becomes 'b a' rather than preserving the original spacing. If you need byte-exact preservation, use character mode, which reverses the raw string without touching whitespace.",
      },
      {
        q: "Do emoji and accents survive reversal?",
        a: "Accented Latin characters are single code units and reverse fine. Emoji made of surrogate pairs, especially when combined with variation selectors, can be split by a UTF-16 reversal and render as broken glyphs, so verify emoji-heavy output visually before using it.",
      },
      {
        q: "Is character mode the same as a palindrome check?",
        a: "Yes. Comparing the input to its character-reversed output is the standard palindrome test: paste a word or phrase, reverse in characters mode, and if the outputs match (ignoring case and spaces), you have a palindrome.",
      },
      {
        q: "Why is the output field read-only?",
        a: "It always reflects a fresh reversal of the input, and letting you edit it would desync the two panes. Change the input or mode and click Reverse again, or Copy the current result if you want to tweak it in an editor.",
      },
    ],
  },
};
