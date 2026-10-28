import type { Tool } from "../registry";

export type ToolExtras = Pick<
  Tool,
  "commonMistakes" | "security" | "comparison" | "relatedGuides"
>;

const extras: Record<string, ToolExtras> = {
  "base64-encode": {
    commonMistakes: [
      "Encoding an entire URL and breaking its structure. Encode only the parameter value, not the protocol, host, or slashes.",
      "Assuming Base64 is encryption. The output is trivially reversible by anyone; never put passwords or API keys in it as a security measure.",
      "Truncating the string mid-copy. A missing trailing = often means you cut the string short, and the decoder will reject it.",
      "Storing Base64 blobs longer than a few KB in HTML attributes; use a file download or blob URL instead.",
    ],
    security:
      "Base64 is an encoding, not encryption. Anyone who receives the output can decode it instantly. Do not use it to hide passwords, tokens, or personal data; treat Base64 output as plaintext that happens to use a restricted alphabet. For real protection, encrypt with Web Crypto API (AES-GCM) or use your platform's secret store.",
    comparison: {
      name: "Base64 Decoder",
      href: "/base64-decode",
      useWhen:
        "You have readable text and need the Base64 form: embedding a small image in HTML, building an Authorization: Basic header, or storing binary-safe text in JSON.",
      useThemWhen:
        "You already have a Base64 string and need the original text back: inspecting a token, recovering a data URI payload, or debugging what an API actually sent.",
    },
  },
  "base64-decode": {
    commonMistakes: [
      "Pasting a Base64URL string (using - and _) into the standard decoder; the alphabets differ and the decode will fail.",
      "Feeding image bytes into a text decoder and seeing mojibake. Use the Base64 to Image tool for binary payloads.",
      "Forgetting that line breaks and spaces from email or JSON wrapping must be removed before decoding.",
      "Expecting decode to fix a double-encoded string; decode once per layer.",
    ],
    security:
      "Decoded content is untrusted input. A Base64 string that decodes to <script> or a javascript: URL is an attack vector if you insert it into the DOM. Always treat decoded text as data, escape it before display, and never eval it. This tool decodes locally with atob() and TextDecoder, so your strings stay in the tab.",
    comparison: {
      name: "Base64 Encoder",
      href: "/base64-encode",
      useWhen:
        "You have plaintext or binary-safe text and need to produce Base64: building credentials, embedding assets, or creating data URIs.",
      useThemWhen:
        "You have received Base64 and need to inspect the original content: reading tokens, debugging payloads, or verifying an encoding round trip.",
    },
  },
  "url-encode": {
    commonMistakes: [
      "Encoding an entire URL instead of just the value, turning : and / into %3A and %2F and breaking the structure.",
      "Using + for spaces in query strings; encodeURIComponent emits %20, which is correct for URLs while + belongs to form bodies.",
      "Encoding already-encoded values a second time, which turns % into %25.",
      "Skipping encoding for # in fragments or & in values, silently truncating the request.",
    ],
    security:
      "Percent-encoding is not sanitization. An encoded value can still decode to ../ path traversal, SQL fragments, or HTML. Use this tool to make text URL-safe, then apply server-side validation and parameterized queries before use.",
    comparison: {
      name: "URL Decoder",
      href: "/url-decode",
      useWhen:
        "You have raw text with spaces, ampersands, or non-ASCII characters that must travel inside a query string or form body.",
      useThemWhen:
        "You see %20 and %C3 sequences in logs or DevTools and need to read what the user actually sent.",
    },
    relatedGuides: undefined,
  },
  "url-decode": {
    commonMistakes: [
      "Decoding an entire URL including the structure, which can change the meaning of path segments.",
      "Expecting + to become a space; strict URI decoding keeps + literal, and only form bodies treat it as space.",
      "Feeding strings with %GG or a trailing % and wondering why decodeURIComponent throws.",
      "Decoding input that was never encoded, which usually changes nothing but can still fail on stray % signs.",
    ],
    security:
      "Decoded query values are a classic injection source. A value that decodes to ' OR 1=1-- is harmless as text but dangerous when concatenated into SQL or innerHTML. Decode for visibility, then validate against an allow list before trusting it.",
    comparison: {
      name: "URL Encoder",
      href: "/url-encode",
      useWhen:
        "You need to read the human-readable form of a percent-encoded query value, form field, or callback parameter.",
      useThemWhen:
        "You have plain text that must be made safe for a URL: building links, API calls, or redirect targets.",
    },
  },
  "uuid-generator": {
    commonMistakes: [
      "Generating one UUID and hard-coding it across environments; generate fresh values per deployment or per record.",
      "Using UUID v4 where you need sortable identifiers; UUID v7 or a timestamp column is better for append-only keys.",
      "Assuming UUIDs are secret. They are identifiers, not credentials; combine with auth if the value grants access.",
      "Parsing UUIDs with strict hyphen assumptions when a platform emits the 32-character unhyphenated form.",
    ],
    security:
      "UUIDs generated with crypto.getRandomValues are collision-resistant for practical purposes, but they are still public identifiers. Do not use a UUID as a session token or password reset key by itself; pair it with server-side secrets and expiry.",
    comparison: {
      name: "Password Generator",
      href: "/password-generator",
      useWhen:
        "You need a unique identifier: database primary keys, correlation IDs, file names, or client-side deduplication keys.",
      useThemWhen:
        "You need a secret a human or client must keep: API tokens, temporary passwords, or recovery codes.",
    },
    relatedGuides: [
      { href: "/guides/uuid-generation", title: "UUID Generation Guide" },
    ],
  },
  "password-generator": {
    commonMistakes: [
      "Generating the password in a browser tab you sync or screenshot, exposing it to history or cloud backups.",
      "Reusing the generated value across sites, which turns one breach into many.",
      "Storing it in plain text notes instead of a password manager vault.",
      "Choosing a shorter length than your threat model needs; 16+ characters is the modern baseline for machine-generated secrets.",
    ],
    security:
      "This tool uses crypto.getRandomValues, the browser's CSPRNG, and never sends the result anywhere. Still, generate high-value secrets on a trusted device, store them in a password manager immediately, and rotate any secret that may have been shoulder-surfed or logged.",
    comparison: {
      name: "UUID Generator",
      href: "/uuid-generator",
      useWhen:
        "You need a cryptographically strong secret: a temporary password, API token, or recovery code that a human or client will use to authenticate.",
      useThemWhen:
        "You need a non-secret unique identifier for records, jobs, or assets where guessing carries no privilege.",
    },
  },
  "hash-generator": {
    commonMistakes: [
      "Using MD5 or SHA-1 for password storage; both are broken for collision resistance and far too fast for passwords.",
      "Hashing twice for 'extra security'; a single application of the algorithm is the correct design.",
      "Comparing hashes with string equality that short-circuits; use constant-time comparison on the server.",
      "Assuming two files with the same hash are identical without also comparing sizes, in adversarial scenarios.",
    ],
    security:
      "Hashes are integrity checks, not encryption: they are one-way by design but fast to brute-force for low-entropy inputs. Passwords need a slow KDF (argon2, bcrypt, scrypt) with a per-user salt. SHA-256 or SHA-3 are appropriate for file integrity and signatures, never for passwords alone.",
    comparison: {
      name: "JWT Decoder",
      href: "/jwt-decoder",
      useWhen:
        "You need a deterministic fingerprint of data: verifying file downloads, caching keys, or detecting duplicate content.",
      useThemWhen:
        "You need to read the claims inside a structured signed token: inspecting exp, sub, or scope before trusting an API request.",
    },
    relatedGuides: [
      { href: "/guides/hash-functions", title: "Hash Functions Guide" },
    ],
  },
  "jwt-decoder": {
    commonMistakes: [
      "Decoding the payload and treating it as authenticated. Decoding reveals claims; only signature verification proves they were issued by your server.",
      "Ignoring the exp claim, which leaves expired sessions accepted by lazy clients.",
      "Pasting production JWTs into third-party debuggers, which can leak them into logs.",
      "Confusing the three header parts separated by dots; only the middle part is the claims payload.",
    ],
    security:
      "This tool decodes locally and never transmits your token, but the decoded claims are still untrusted until the signature is verified server-side against your secret or public key. Watch for the alg: none trick, where an attacker strips the signature; reject that algorithm on the server. Never place secrets in JWT claims: they are readable by design.",
    comparison: {
      name: "Base64 Decoder",
      href: "/base64-decode",
      useWhen:
        "You need to inspect the header and claims of a JWT: checking exp, sub, scope, or which algorithm signed it.",
      useThemWhen:
        "The value is raw Base64 text rather than a structured signed token: decoding credentials, data URIs, or opaque blobs.",
    },
    relatedGuides: [
      { href: "/guides/jwt-decoding", title: "JWT Decoding Guide" },
    ],
  },
  "json-formatter": {
    commonMistakes: [
      "Pasting a JavaScript object literal with unquoted keys and expecting valid JSON; JSON requires double-quoted keys.",
      "Formatting a 50 MB payload and freezing the tab; split the file or process it server-side.",
      "Trusting the formatter as a validator; pretty-printing does not guarantee semantic correctness against your schema.",
      "Losing precision on large integers, which JavaScript Number cannot represent beyond 2^53.",
    ],
    security:
      "Formatting runs entirely in the browser with JSON.parse and JSON.stringify, so API responses you paste are never uploaded. Beware pasting tokens or PII into any online formatter you do not control: once it leaves your tab it may be logged. Use this local tool for sensitive payloads.",
    comparison: {
      name: "JSON Validator",
      href: "/json-validator",
      useWhen:
        "You have syntactically valid JSON and want readable indentation: code review, debugging, diffs, or documentation.",
      useThemWhen:
        "You suspect the JSON is broken and need precise error location with line and column before any formatting.",
    },
    relatedGuides: [
      { href: "/guides/json-formatting", title: "JSON Formatting Guide" },
    ],
  },
  "json-validator": {
    commonMistakes: [
      "Validating syntax only and assuming the object matches your schema; use the JSON Schema Validator for structure checks.",
      "Ignoring trailing commas copied from JavaScript or YAML, which strict JSON rejects.",
      "Validating a JSONP wrapper (callback({...})) as if it were plain JSON.",
      "Assuming a parse success means the API contract holds; types and required fields still need schema checks.",
    ],
    security:
      "Validation happens locally, so payloads never leave the browser. On servers, always validate untrusted JSON against a schema and enforce size limits before parsing to avoid prototype pollution (objects with __proto__ keys) and denial of service from deeply nested structures.",
    comparison: {
      name: "JSON Formatter",
      href: "/json-formatter",
      useWhen:
        "You need to confirm a string is valid JSON and pinpoint the exact line and column of any syntax error.",
      useThemWhen:
        "You already have valid JSON and want readable indentation, sorted keys, or a compact minified form.",
    },
  },
  "regex-tester": {
    commonMistakes: [
      "Forgetting to escape . + * ? ( ) [ ] { } when you mean them literally.",
      "Using greedy quantifiers like .* when you needed lazy .*? for the shortest match.",
      "Catastrophic backtracking with nested quantifiers such as (a+)+ on long inputs; test against worst-case strings.",
      "Assuming JavaScript regex behaves like Python or Java; lookbehind, named groups, and unicode support vary by engine.",
    ],
    security:
      "ReDoS (Regular Expression Denial of Service) is a real attack: an attacker-controlled string against a vulnerable pattern can pin a CPU for minutes. Avoid nested unbounded quantifiers on user input, set input length limits, and prefer linear-time alternatives for untrusted data. This tester runs the pattern locally via the RegExp constructor.",
    comparison: {
      name: "Diff Checker",
      href: "/diff-checker",
      useWhen:
        "You need to design or debug a pattern: match highlighting, capture groups, flags, and live replacement previews.",
      useThemWhen:
        "You have two blocks of text and need a line-by-line visual diff rather than pattern matching.",
    },
    relatedGuides: [
      { href: "/guides/regex-testing", title: "Regex Testing Guide" },
    ],
  },
  "word-counter": {
    commonMistakes: [
      "Assuming every word processor agrees on counts; hyphenation, footnotes, and headers change numbers.",
      "Using reading time at 200 wpm for dense technical material, which real readers finish more slowly.",
      "Counting characters without spaces against limits that require the full length.",
      "Ignoring emoji, which can count as two UTF-16 code units while platforms apply their own weighting.",
    ],
    security:
      "Your draft is never transmitted; all counting runs on the local string in the browser. If you paste unpublished copy, credentials, or personal data into online counters elsewhere, it may be stored. This tool keeps everything in the tab.",
    comparison: {
      name: "Case Converter",
      href: "/case-converter",
      useWhen:
        "You need length metrics: words, characters, sentences, paragraphs, lines, and estimated reading time for editorial targets.",
      useThemWhen:
        "You need to normalize capitalization: titles, headings, camelCase identifiers, or SQL keywords.",
    },
  },
  "timestamp-converter": {
    commonMistakes: [
      "Treating Unix timestamps as seconds when the value is in milliseconds (13 digits vs 10).",
      "Ignoring the local timezone offset and misreading UTC as local time.",
      "Parsing ambiguous date-only strings without a format, letting the engine guess.",
      "Using ISO strings as database keys without normalizing to UTC.",
    ],
    security:
      "Conversion is purely local arithmetic on Date objects, so timestamps never leave the tab. On servers, validate user-supplied date strings before constructing Date objects to avoid unexpected parsing of malformed input.",
    comparison: {
      name: "Number Base Converter",
      href: "/number-base-converter",
      useWhen:
        "You need to translate between Unix epochs, ISO 8601 strings, and human-readable local dates.",
      useThemWhen:
        "You need to convert the same numeric value across binary, octal, decimal, and hexadecimal representations.",
    },
  },
  "number-base-converter": {
    commonMistakes: [
      "Dropping the leading zeros in binary, which changes the byte layout when you paste into bit-level contexts.",
      "Forgetting the sign bit and reading a two's-complement negative as a huge positive.",
      "Mixing radix prefixes (0x, 0b, 0o) in one field; enter bare digits and pick the base with the selector.",
      "Overflowing past 53 bits of precision when the tool falls back to BigInt.",
    ],
    security:
      "Conversion runs locally with BigInt, so values never leave the browser. When these numbers gate access (ports, flags, permissions), validate ranges on the server rather than trusting client-side bounds.",
    comparison: {
      name: "Timestamp Converter",
      href: "/timestamp-converter",
      useWhen:
        "You need the same value in a different positional base: binary for bit flags, hex for colors and memory, octal for file modes.",
      useThemWhen:
        "You need to interpret or produce Unix epoch values and ISO date strings.",
    },
  },
  "token-counter": {
    commonMistakes: [
      "Assuming one tokenizer matches another; OpenAI, Anthropic, and open models count differently.",
      "Budgeting exactly to the limit with no room for the model's completion tokens.",
      "Counting only words and guessing tokens for code, where punctuation density raises the ratio.",
      "Re-counting after truncation instead of re-tokenizing the final prompt actually sent.",
    ],
    security:
      "Counting happens locally with a tokenizer approximation, so your prompt text is not uploaded. Do not paste secrets into any cloud-hosted counter; if your prompt contains keys, redact them first regardless of the tool.",
    comparison: {
      name: "Word Counter",
      href: "/word-counter",
      useWhen:
        "You need an estimate of LLM token usage for prompts, context windows, and cost budgets before calling a model API.",
      useThemWhen:
        "You need human-facing length metrics: words, reading time, sentences, and character limits for editorial content.",
    },
  },
  "css-gradient-generator": {
    commonMistakes: [
      "Stacking more than four colour stops and producing muddy intermediate bands.",
      "Placing stops out of order and having CSS clamp them, turning a smooth ramp into a hard edge.",
      "Forgetting a fallback background-color for browsers or export targets that skip the gradient.",
      "Using 180deg expecting left-to-right; 90deg is horizontal, 180deg points down.",
    ],
    security:
      "Gradients are static CSS with no external requests, so nothing sensitive is involved. If you copy generated CSS into a third-party editor extension, review the pasted code for injected url() trackers before shipping it.",
    comparison: {
      name: "Box Shadow Generator",
      href: "/box-shadow-generator",
      useWhen:
        "You need a background ramp: heroes, cards, buttons, and section dividers with multi-stop colour blends.",
      useThemWhen:
        "You need elevation and depth: layered shadows with spread, inset variants, and multi-shadow stacks.",
    },
  },
  "color-contrast": {
    commonMistakes: [
      "Checking only text/background pairs and ignoring placeholder and disabled states.",
      "Testing against the brand hex without accounting for opacity or gradient overlays.",
      "Assuming AAA is always required; most UIs target AA for body text and large-text AA for display type.",
      "Forgetting to re-check after switching to dark mode, where foreground and background both change.",
    ],
    security:
      "Contrast calculation is pure math on colour values in the browser; no data is sent anywhere. Accessible colour choices have no security impact, but colour alone must never be the only signal for errors or state.",
    comparison: {
      name: "Color Converter",
      href: "/color-converter",
      useWhen:
        "You need to verify WCAG 2.2 contrast ratios (AA, AAA) between foreground and background colours before shipping UI.",
      useThemWhen:
        "You need to translate a colour between HEX, RGB, HSL, and OKLCH for use in CSS or design tokens.",
    },
  },
  "subnet-calculator": {
    commonMistakes: [
      "Confusing /24-style CIDR prefixes with dotted netmasks when filling the form.",
      "Forgetting that the network and broadcast addresses are reserved, so usable hosts is total minus two.",
      "Using 192.168.x.x and 10.x.x.x interchangeably without checking they fall inside the chosen prefix.",
      "Assuming CIDR block sizes are decimal-friendly; a /22 is 1024 addresses, not a round thousand.",
    ],
    security:
      "All arithmetic happens locally. When planning real network boundaries, validate that proposed ranges do not overlap existing infrastructure and that private address space (RFC 1918) is what you intend for internal segments.",
    comparison: {
      name: "URL Parser",
      href: "/url-parser",
      useWhen:
        "You need network address, broadcast, wildcard mask, and usable host range for a CIDR block during infrastructure planning.",
      useThemWhen:
        "You need to split a URL into protocol, host, port, path, and query parameters for API or link debugging.",
    },
  },
  "sip-calculator": {
    commonMistakes: [
      "Ignoring inflation when projecting future corpus value, which overstates real purchasing power.",
      "Changing the step-up assumption without re-running the calculation for each year.",
      "Comparing pre-tax SIP figures with post-tax withdrawals without accounting for capital gains.",
      "Assuming past mutual fund returns continue; use the rate as a scenario, not a guarantee.",
    ],
    security:
      "Figures are computed locally from your inputs and never stored or transmitted. Treat the output as an estimate for planning, not investment advice, and verify current tax rules with a qualified advisor before acting.",
    comparison: {
      name: "EMI Calculator",
      href: "/emi-calculator",
      useWhen:
        "You are projecting wealth accumulation through periodic mutual fund investments with optional annual step-up.",
      useThemWhen:
        "You are computing the fixed monthly payment on a loan principal with a given interest rate and tenure.",
    },
  },
  "dockerfile-generator": {
    commonMistakes: [
      "Running as root in the final image; add a dedicated USER for production containers.",
      "Copying the entire working directory including node_modules and .git; use .dockerignore and targeted COPY.",
      "Skipping layer ordering, placing frequently changed steps before rarely changing ones and defeating the cache.",
      "Pinning only the base image tag (node:20) instead of a digest, which can silently change underneath you.",
    ],
    security:
      "Generated Dockerfiles use official base images and multi-stage builds, but review every instruction before shipping: avoid baking secrets into ENV or layers, scan images with a vulnerability scanner, and pin base images by digest for reproducible, auditable builds.",
    comparison: {
      name: "Terraform Generator",
      href: "/terraform-generator",
      useWhen:
        "You need a container build definition: base image, dependency install, build steps, and a hardened runtime image.",
      useThemWhen:
        "You need infrastructure-as-code: cloud resources, networking, and state-managed provisioning in HCL.",
    },
  },
  "terraform-generator": {
    commonMistakes: [
      "Committing generated .tf files without review; defaults may not match your provider region or version.",
      "Hard-coding secrets in variables instead of using a secrets manager or environment injection.",
      "Skipping terraform fmt and validate after generation, which catches syntax drift early.",
      "Assuming resource names are globally unique; cloud providers often require account-scoped uniqueness.",
    ],
    security:
      "Generation is local, so nothing is sent to HashiCorp or any provider. Before running apply, review every resource, never commit credentials, use remote state with locking, and pin provider versions to avoid surprise breaking changes.",
    comparison: {
      name: "Dockerfile Generator",
      href: "/dockerfile-generator",
      useWhen:
        "You need HCL for provisioning cloud infrastructure: compute, storage, networking, and IAM with state management.",
      useThemWhen:
        "You need a container image build: multi-stage compilation, dependency layers, and a minimal runtime image.",
    },
  },
};

export function getExtrasBySlug(slug: string): ToolExtras | undefined {
  return extras[slug];
}
