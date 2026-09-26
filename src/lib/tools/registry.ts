export interface Tool {
  name: string;
  slug: string;
  category: string;
  description: string;
  icon: string;
  href: string;
  relatedSlugs: string[];
  whatIs?: string;
  howToUse?: string[];
  examples?: { title: string; input: string; output: string }[];
  faqs?: { q: string; a: string }[];
}

export interface ToolCategory {
  name: string;
  slug: string;
  description: string;
}

export const categories: ToolCategory[] = [
  {
    name: "Encoding",
    slug: "encoding",
    description: "Encode and decode data in various formats",
  },
  {
    name: "Generation",
    slug: "generation",
    description: "Generate identifiers, codes, and random data",
  },
  {
    name: "Validation",
    slug: "validation",
    description: "Validate and verify data formats",
  },
  {
    name: "Formatting",
    slug: "formatting",
    description: "Format and beautify your data",
  },
  {
    name: "Conversion",
    slug: "conversion",
    description: "Convert between different formats and bases",
  },
  {
    name: "Utility",
    slug: "utility",
    description: "Useful developer utilities and helpers",
  },
  {
    name: "Text",
    slug: "text",
    description: "Text manipulation and analysis tools",
  },
  {
    name: "CSS",
    slug: "css",
    description: "CSS tools and generators",
  },
  {
    name: "Image",
    slug: "image",
    description: "Image conversion and processing tools",
  },
  {
    name: "Color",
    slug: "color",
    description: "Color conversion and contrast tools",
  },
  {
    name: "Reference",
    slug: "reference",
    description: "Developer reference and lookup tools",
  },
  {
    name: "Code Generation",
    slug: "code-generation",
    description: "Generate code from data and schemas",
  },
  {
    name: "DevOps",
    slug: "devops",
    description: "Infrastructure and deployment tools",
  },
  {
    name: "Network",
    slug: "network",
    description: "Network calculation and analysis tools",
  },
  {
    name: "FinTech",
    slug: "fintech",
    description: "Financial calculators and tools",
  },
  {
    name: "AI Tools",
    slug: "ai-tools",
    description: "AI and LLM utility tools",
  },
];

export const tools: Tool[] = [
  // Encoding
  {
    name: "Base64 Encoder",
    slug: "base64-encode",
    category: "encoding",
    description: "Encode text to Base64 format. Supports Unicode characters.",
    icon: "ENC",
    href: "/base64-encode",
    relatedSlugs: ["base64-decode", "image-to-base64"],
    whatIs: "Base64 encoding converts binary data into an ASCII string format using a set of 64 characters (A-Z, a-z, 0-9, +, /). It's commonly used to transmit binary data over text-based protocols like email, JSON APIs, and URLs. This tool supports full Unicode input, automatically handling UTF-8 encoding before Base64 conversion.",
    howToUse: [
      "Paste or type your text in the input field",
      "Click 'Encode' to convert to Base64",
      "Copy the result using the Copy button",
      "Use 'Decode' on the Base64 Decoder page to reverse the process"
    ],
    examples: [
      {
        title: "Simple text encoding",
        input: "Hello, World!",
        output: "SGVsbG8sIFdvcmxkIQ=="
      },
      {
        title: "Unicode text encoding",
        input: "Hello 世界 🌍",
        output: "SGVsbG8g5LiW55WMIOKAmg=="
      },
      {
        title: "JSON payload encoding",
        input: '{"userId": 123, "token": "abc-123"}',
        output: "eyJ1c2VySWQiOiAxMjMsICJ0b2tlbiI6ICJhYmMtMTIzIn0="
      }
    ],
    faqs: [
      {
        q: "Is Base64 encryption?",
        a: "No. Base64 is an encoding scheme, not encryption. It provides no security — anyone can decode Base64 data. For sensitive data, use proper encryption (like AES) before Base64 encoding."
      },
      {
        q: "Why does my Base64 output have padding (=)?",
        a: "Base64 processes data in 3-byte chunks. If the input length isn't divisible by 3, padding characters (=) are added to make the output length a multiple of 4. This is standard Base64 behavior."
      },
      {
        q: "Can I encode files with this tool?",
        a: "For text content, yes. For binary files (images, PDFs), use the 'Image to Base64' tool which handles file uploads and converts them to Base64 data URIs."
      }
    ]
  },
  {
    name: "Base64 Decoder",
    slug: "base64-decode",
    category: "encoding",
    description: "Decode Base64 encoded text back to readable format.",
    icon: "DEC",
    href: "/base64-decode",
    relatedSlugs: ["base64-encode", "base64-to-image"],
    whatIs: "Base64 decoding reverses the Base64 encoding process, converting ASCII Base64 strings back to their original binary or text form. This tool automatically detects and handles UTF-8 encoded content, making it safe for international characters.",
    howToUse: [
      "Paste your Base64 string in the input field",
      "Click 'Decode' to convert back to text",
      "If the output appears garbled, the input may not be valid Base64 or may be binary data",
      "Use 'Encode' on the Base64 Encoder page to reverse the process"
    ],
    examples: [
      {
        title: "Simple text decoding",
        input: "SGVsbG8sIFdvcmxkIQ==",
        output: "Hello, World!"
      },
      {
        title: "Unicode text decoding",
        input: "SGVsbG8g5LiW55WMIOKAmg==",
        output: "Hello 世界 🌍"
      },
      {
        title: "JSON payload decoding",
        input: "eyJ1c2VySWQiOiAxMjMsICJ0b2tlbiI6ICJhYmMtMTIzIn0=",
        output: '{"userId": 123, "token": "abc-123"}'
      }
    ],
    faqs: [
      {
        q: "Why does decoding fail with 'Invalid Base64'?",
        a: "The input may contain invalid characters, incorrect padding, or line breaks. Ensure you're pasting a valid Base64 string without extra whitespace or newlines."
      },
      {
        q: "Can I decode Base64 images?",
        a: "This tool decodes to text. For Base64-encoded images, use the 'Base64 to Image' tool which will render and allow downloading the image file."
      }
    ]
  },
  {
    name: "URL Encoder",
    slug: "url-encode",
    category: "encoding",
    description: "Encode text for safe use in URLs and query parameters.",
    icon: "URL",
    href: "/url-encode",
    relatedSlugs: ["url-decode", "url-parser"],
    whatIs: "URL encoding (percent-encoding) converts characters that have special meaning in URLs (like spaces, &, =, ?, #) into a % followed by two hexadecimal digits. This ensures data can be safely transmitted in URLs, query strings, and form submissions. Spaces become %20 (or + in form data). This tool uses JavaScript's encodeURIComponent() which encodes all characters except A-Z a-z 0-9 - _ . ~",
    howToUse: [
      "Paste your text in the input field",
      "Click 'Encode' to convert to URL-safe format",
      "Copy the encoded result for use in URLs or query parameters",
      "Use the URL Decoder to reverse the process"
    ],
    examples: [
      {
        title: "Query parameter encoding",
        input: "search=hello world&category=books",
        output: "search%3Dhello%20world%26category%3Dbooks"
      },
      {
        title: "Special characters",
        input: "price=$100&discount=50%",
        output: "price%3D%24100%26discount%3D50%25"
      }
    ],
    faqs: [
      {
        q: "What's the difference between encodeURI and encodeURIComponent?",
        a: "encodeURI preserves URL structure characters (:, /, ?, #, &, =) — use for full URLs. encodeURIComponent encodes everything except -_.~ — use for individual query parameter values. This tool uses encodeURIComponent."
      },
      {
        q: "Should I encode the entire URL or just values?",
        a: "Only encode individual query parameter values. Encoding a full URL breaks the structure. Use URL Parser to see components."
      }
    ]
  },
  {
    name: "URL Decoder",
    slug: "url-decode",
    category: "encoding",
    description: "Decode URL-encoded text back to readable format.",
    icon: "UDC",
    href: "/url-decode",
    relatedSlugs: ["url-encode", "url-parser"],
    whatIs: "URL decoding reverses percent-encoding, converting %XX sequences back to their original characters. This is essential for reading query parameters, form data, and URLs that have been encoded for transmission. This tool uses JavaScript's decodeURIComponent() which handles all valid percent-encoded sequences.",
    howToUse: [
      "Paste your URL-encoded string in the input field",
      "Click 'Decode' to convert back to readable text",
      "View the decoded result",
      "Use the URL Encoder to reverse the process"
    ],
    examples: [
      {
        title: "Query parameter decoding",
        input: "search%3Dhello%20world%26category%3Dbooks",
        output: "search=hello world&category=books"
      },
      {
        title: "Special characters",
        input: "price%3D%24100%26discount%3D50%25",
        output: "price=$100&discount=50%"
      }
    ],
    faqs: [
      {
        q: "Why does decoding fail?",
        a: "Invalid percent-encoding (e.g., %GG, %2) causes errors. Ensure input contains valid %XX sequences where XX are hex digits (0-9, A-F)."
      },
      {
        q: "Can I decode a full URL?",
        a: "Yes, but it will decode the entire string including structural characters. For parsing URL components, use the URL Parser tool."
      }
    ]
  },
  {
    name: "HTML Encoder",
    slug: "html-encode",
    category: "encoding",
    description: "Encode special characters for safe use in HTML.",
    icon: "HTM",
    href: "/html-encode",
    relatedSlugs: ["html-decode"],
  },
  {
    name: "HTML Decoder",
    slug: "html-decode",
    category: "encoding",
    description: "Decode HTML entities back to readable text.",
    icon: "HDC",
    href: "/html-decode",
    relatedSlugs: ["html-encode"],
  },
  {
    name: "Image to Base64",
    slug: "image-to-base64",
    category: "encoding",
    description: "Convert images to Base64 encoded strings. Supports PNG, JPG, GIF, and more.",
    icon: "IMG",
    href: "/image-to-base64",
    relatedSlugs: ["base64-to-image", "base64-encode"],
  },
  {
    name: "Base64 to Image",
    slug: "base64-to-image",
    category: "encoding",
    description: "Decode Base64 encoded strings back to images.",
    icon: "B64",
    href: "/base64-to-image",
    relatedSlugs: ["image-to-base64", "base64-decode"],
  },
  // Generation
  {
    name: "UUID Generator",
    slug: "uuid-generator",
    category: "generation",
    description: "Generate random UUID v4 identifiers for your applications.",
    icon: "UID",
    href: "/uuid-generator",
    relatedSlugs: ["password-generator"],
    whatIs: "A UUID (Universally Unique Identifier) is a 128-bit identifier standardized by RFC 4122. Version 4 UUIDs are generated using random numbers, providing 122 bits of entropy (3.4×10^38 possibilities). They're used for database keys, session IDs, transaction IDs, and distributed systems where coordination is impractical.",
    howToUse: [
      "Click 'Generate' to create a new UUID v4",
      "Click 'Copy' to copy to clipboard",
      "Generate multiple UUIDs at once using the batch option",
      "Use the generated UUIDs in your database, APIs, or config files"
    ],
    examples: [
      {
        title: "Single UUID generation",
        input: "(click Generate)",
        output: "550e8400-e29b-41d4-a716-446655440000"
      },
      {
        title: "Batch generation (5 UUIDs)",
        input: "(click Generate x5)",
        output: "550e8400-e29b-41d4-a716-446655440000\n6ba7b810-9dad-41d4-a716-446655440000\n7ba7b810-9dad-41d4-a716-446655440001\n8ba7b810-9dad-41d4-a716-446655440002\n9ba7b810-9dad-41d4-a716-446655440003"
      }
    ],
    faqs: [
      {
        q: "Are these UUIDs cryptographically secure?",
        a: "Yes. This tool uses the browser's crypto.randomUUID() (Web Crypto API) which generates cryptographically secure random UUIDs suitable for security-sensitive applications."
      },
      {
        q: "Can UUIDs collide?",
        a: "Theoretically yes, but with 122 bits of randomness, the probability is astronomically low (~1 in 2.71 quintillion for 1 billion UUIDs). For practical purposes, they're unique."
      },
      {
        q: "What's the difference between UUID versions?",
        a: "v1: time-based, v3/v5: namespace-based (MD5/SHA-1), v4: random (this tool), v6/v7: ordered time-based. v4 is most common for general use."
      }
    ]
  },
  {
    name: "Password Generator",
    slug: "password-generator",
    category: "generation",
    description: "Generate strong, random passwords with customizable options.",
    icon: "PWD",
    href: "/password-generator",
    relatedSlugs: ["uuid-generator"],
    whatIs: "A password generator creates cryptographically secure random passwords with configurable length, character sets (uppercase, lowercase, numbers, symbols), and options like excluding similar characters. This tool uses the Web Crypto API (crypto.getRandomValues) for true randomness, not Math.random() which is predictable.",
    howToUse: [
      "Set desired password length (8-128 characters)",
      "Choose character sets: uppercase, lowercase, numbers, symbols",
      "Optionally exclude similar characters (l, 1, I, O, 0)",
      "Click 'Generate' to create a secure password",
      "Copy and store in a password manager immediately"
    ],
    examples: [
      {
        title: "Standard 16-char password",
        input: "Length: 16, All charsets",
        output: "K8#mP2$vL9@nQ5!w"
      },
      {
        title: "Memorable passphrase style",
        input: "Length: 24, Letters only",
        output: "xkcd-style-correct-horse-battery-staple"
      }
    ],
    faqs: [
      {
        q: "Is this secure for generating real passwords?",
        a: "Yes. It uses crypto.getRandomValues() from the Web Crypto API, which is cryptographically secure. The password is generated entirely in your browser and never transmitted."
      },
      {
        q: "Should I use the 'exclude similar characters' option?",
        a: "It reduces entropy slightly but improves readability when manually typing. For password manager storage, keep all characters for maximum entropy."
      },
      {
        q: "What's a good password length?",
        a: "16+ characters for high-security accounts (email, banking, password manager master). 12-15 for general use. NIST recommends minimum 8, but longer is exponentially stronger."
      }
    ]
  },
  {
    name: "Hash Generator",
    slug: "hash-generator",
    category: "generation",
    description: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes.",
    icon: "HASH",
    href: "/hash-generator",
    relatedSlugs: [],
    whatIs: "A hash function takes input data and produces a fixed-size string (hash) that uniquely represents that data. This tool supports MD5 (128-bit), SHA-1 (160-bit), SHA-256 (256-bit), and SHA-512 (512-bit). Hashes are used for data integrity verification, password storage (with salt), file checksums, and digital signatures. All hashing uses the browser's Web Crypto API.",
    howToUse: [
      "Enter or paste your text in the input field",
      "Select hash algorithm(s): MD5, SHA-1, SHA-256, SHA-512",
      "Click 'Generate' to compute hashes",
      "Copy individual hashes or all at once",
      "Compare with expected hash for verification"
    ],
    examples: [
      {
        title: "SHA-256 of 'hello'",
        input: "hello",
        output: "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
      },
      {
        title: "File integrity check",
        input: "(paste file content)",
        output: "Compare generated hash with published checksum"
      }
    ],
    faqs: [
      {
        q: "Which hash should I use?",
        a: "SHA-256 is the current standard for most uses. MD5 and SHA-1 are cryptographically broken and should not be used for security. SHA-512 provides more security margin but longer output."
      },
      {
        q: "Can I hash files?",
        a: "This tool hashes text input. For files, you'd need to read the file content first. For large files, use command-line tools like sha256sum."
      },
      {
        q: "Is hashing encryption?",
        a: "No. Hashing is one-way (irreversible). Encryption is two-way (reversible with key). You cannot 'decrypt' a hash back to the original data."
      }
    ]
  },
  {
    name: "Lorem Ipsum Generator",
    slug: "lorem-ipsum",
    category: "generation",
    description: "Generate placeholder text for your designs and mockups.",
    icon: "IPS",
    href: "/lorem-ipsum",
    relatedSlugs: [],
  },
  {
    name: "Random Color Generator",
    slug: "random-color",
    category: "generation",
    description: "Generate random colors and color palettes for your designs.",
    icon: "CLR",
    href: "/random-color",
    relatedSlugs: ["color-converter"],
  },
  {
    name: "QR Code Generator",
    slug: "qr-code-generator",
    category: "generation",
    description: "Generate QR codes for text, URLs, and more. Download as PNG.",
    icon: "QR",
    href: "/qr-code-generator",
    relatedSlugs: [],
  },
  // Formatting
  {
    name: "JSON Formatter",
    slug: "json-formatter",
    category: "formatting",
    description: "Format, validate, minify, and beautify JSON data.",
    icon: "JSON",
    href: "/json-formatter",
    relatedSlugs: [],
    whatIs: "A JSON Formatter (or beautifier) takes minified or poorly formatted JSON and adds proper indentation, line breaks, and spacing to make it human-readable. It also validates JSON syntax and can minify JSON by removing all whitespace for production use. This tool runs entirely in your browser using native JSON.parse() and JSON.stringify().",
    howToUse: [
      "Paste your JSON in the input field (can be minified or messy)",
      "Choose your preferred indentation (2 spaces, 4 spaces, or tabs)",
      "Click 'Format' to beautify, 'Minify' to compress, or 'Validate' to check syntax",
      "Copy the formatted output or download as a .json file",
      "Errors are highlighted with line numbers for easy debugging"
    ],
    examples: [
      {
        title: "Minified JSON formatting",
        input: '{"users":[{"id":1,"name":"Alice","active":true},{"id":2,"name":"Bob","active":false}]}',
        output: '{\n  "users": [\n    {\n      "id": 1,\n      "name": "Alice",\n      "active": true\n    },\n    {\n      "id": 2,\n      "name": "Bob",\n      "active": false\n    }\n  ]\n}'
      },
      {
        title: "Invalid JSON detection",
        input: '{"name": "John", "age": 30,}',
        output: "Error: Unexpected token } at line 1, column 28"
      }
    ],
    faqs: [
      {
        q: "Is my JSON data sent to a server?",
        a: "No. All processing happens in your browser using JavaScript's native JSON.parse() and JSON.stringify(). Zero network requests are made. Verify this in DevTools Network tab."
      },
      {
        q: "Can I format very large JSON files?",
        a: "Yes, but performance depends on your browser's memory. Files over 10MB may cause slowdowns. For huge files, consider command-line tools like jq."
      },
      {
        q: "Does it support JSON5 or comments?",
        a: "Standard JSON only. JSON5 (with comments, trailing commas) is not supported as it's not valid JSON. Remove comments before formatting."
      }
    ]
  },
  {
    name: "JSON Validator",
    slug: "json-validator",
    category: "formatting",
    description: "Validate JSON syntax and check for errors.",
    icon: "JVAL",
    href: "/json-validator",
    relatedSlugs: ["json-formatter"],
  },
  // Conversion
  {
    name: "Number Base Converter",
    slug: "number-base-converter",
    category: "conversion",
    description: "Convert between Binary, Octal, Decimal, and Hexadecimal.",
    icon: "NUM",
    href: "/number-base-converter",
    relatedSlugs: [],
  },
  {
    name: "Timestamp Converter",
    slug: "timestamp-converter",
    category: "conversion",
    description: "Convert Unix timestamps to human-readable dates and vice versa.",
    icon: "TMS",
    href: "/timestamp-converter",
    relatedSlugs: [],
  },
  {
    name: "Color Converter",
    slug: "color-converter",
    category: "conversion",
    description: "Convert between HEX, RGB, and HSL color formats.",
    icon: "COL",
    href: "/color-converter",
    relatedSlugs: ["random-color"],
  },
  {
    name: "Case Converter",
    slug: "case-converter",
    category: "conversion",
    description: "Convert text between camelCase, snake_case, kebab-case, and more.",
    icon: "CASE",
    href: "/case-converter",
    relatedSlugs: ["character-counter"],
  },
  {
    name: "JSON to CSV",
    slug: "json-to-csv",
    category: "conversion",
    description: "Convert JSON data to CSV format for spreadsheets.",
    icon: "J2C",
    href: "/json-to-csv",
    relatedSlugs: ["csv-to-json", "json-formatter"],
  },
  {
    name: "CSV to JSON",
    slug: "csv-to-json",
    category: "conversion",
    description: "Convert CSV data to JSON format for APIs and applications.",
    icon: "C2J",
    href: "/csv-to-json",
    relatedSlugs: ["json-to-csv"],
  },
  {
    name: "HTML to Markdown",
    slug: "html-to-markdown",
    category: "conversion",
    description: "Convert HTML code to clean Markdown format.",
    icon: "H2M",
    href: "/html-to-markdown",
    relatedSlugs: [],
  },
  // Utility
  {
    name: "JWT Decoder",
    slug: "jwt-decoder",
    category: "utility",
    description: "Decode JSON Web Tokens (JWT) to view header, payload, and signature.",
    icon: "JWT",
    href: "/jwt-decoder",
    relatedSlugs: [],
    whatIs: "A JWT (JSON Web Token) decoder splits a JWT into its three parts (header, payload, signature) and decodes the Base64URL-encoded header and payload. The signature cannot be decoded — it's used for verification. This tool helps you inspect token claims like expiration (exp), subject (sub), roles, and custom claims without sending your token to any server.",
    howToUse: [
      "Paste your JWT token in the input field",
      "The tool automatically decodes header and payload",
      "View the decoded JSON for each section",
      "Check expiration time (exp), issued at (iat), and custom claims",
      "Red warning appears if token is expired"
    ],
    examples: [
      {
        title: "Standard JWT with claims",
        input: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        output: 'Header: {"alg":"HS256","typ":"JWT"}\nPayload: {"sub":"1234567890","name":"John Doe","iat":1516239022}'
      }
    ],
    faqs: [
      {
        q: "Does this verify the JWT signature?",
        a: "No. This tool only decodes the header and payload (which are Base64URL-encoded, not encrypted). Signature verification requires the secret/public key and must be done on your server. Never trust a JWT without verifying its signature."
      },
      {
        q: "Is my JWT sent to a server?",
        a: "Absolutely not. Decoding happens entirely in your browser. Your JWT never leaves your device. Verify in DevTools Network tab — zero requests."
      },
      {
        q: "Why can't I decode the signature?",
        a: "The signature is a cryptographic hash, not encoded data. It's created by signing the header+payload with a secret key. It can only be verified, not decoded."
      }
    ]
  },
  {
    name: "URL Parser",
    slug: "url-parser",
    category: "utility",
    description: "Parse URLs to see protocol, hostname, path, and query parameters.",
    icon: "UPR",
    href: "/url-parser",
    relatedSlugs: ["url-encode", "url-decode"],
  },
  {
    name: "Cron Expression Generator",
    slug: "cron-generator",
    category: "utility",
    description: "Generate and describe cron expressions for scheduling tasks.",
    icon: "CRON",
    href: "/cron-generator",
    relatedSlugs: [],
  },
  {
    name: "Character Counter",
    slug: "character-counter",
    category: "utility",
    description: "Count characters, words, sentences, and lines in text.",
    icon: "CNT",
    href: "/character-counter",
    relatedSlugs: ["case-converter"],
  },
  {
    name: "Regex Tester",
    slug: "regex-tester",
    category: "utility",
    description: "Test regular expressions with live matching and highlighting.",
    icon: "REG",
    href: "/regex-tester",
    relatedSlugs: [],
    whatIs: "A regex tester lets you write and test regular expressions against sample text in real-time. It highlights matches, shows capture groups, and explains each part of the pattern. This tool uses JavaScript's native RegExp engine with support for flags (g, i, m, s, u, y). Perfect for debugging complex patterns before using them in code.",
    howToUse: [
      "Enter your regex pattern (without delimiters /.../)",
      "Choose flags: global (g), case-insensitive (i), multiline (m), dotAll (s), unicode (u), sticky (y)",
      "Paste test text in the input area",
      "Matches highlight automatically in real-time",
      "View match details, capture groups, and replacement preview"
    ],
    examples: [
      {
        title: "Email validation pattern",
        input: "Pattern: ^[\\w.-]+@[\\w.-]+\\.\\w+$\nText: user@example.com\nFlags: (none)",
        output: "Match: user@example.com"
      },
      {
        title: "Extract all numbers",
        input: "Pattern: \\d+\nText: Order #12345, item #678\nFlags: g",
        output: "Matches: 12345, 678"
      },
      {
        title: "Capture groups for date parsing",
        input: "Pattern: (\\d{4})-(\\d{2})-(\\d{2})\nText: 2024-01-15\nFlags: (none)",
        output: "Full: 2024-01-15\nGroup 1: 2024\nGroup 2: 01\nGroup 3: 15"
      }
    ],
    faqs: [
      {
        q: "Does it support lookbehind assertions?",
        a: "Yes, JavaScript supports lookbehind (?<=...) and negative lookbehind (?<!...) since ES2018. Works in all modern browsers."
      },
      {
        q: "Why doesn't my regex match?",
        a: "Common issues: missing 'g' flag for multiple matches, special characters not escaped, wrong anchor usage (^/$ vs \\A/\\z). Check the explanation panel for pattern breakdown."
      },
      {
        q: "Can I test replacement patterns?",
        a: "Yes. Enter a replacement string (with $1, $2 for capture groups) to see the replacement result live."
      }
    ]
  },
  // Formatting
  {
    name: "XML Formatter",
    slug: "xml-formatter",
    category: "formatting",
    description: "Format, validate, minify, and pretty-print XML documents.",
    icon: "XML",
    href: "/xml-formatter",
    relatedSlugs: ["html-formatter"],
  },
  {
    name: "SQL Formatter",
    slug: "sql-formatter",
    category: "formatting",
    description: "Format and beautify SQL queries with dialect support.",
    icon: "SQL",
    href: "/sql-formatter",
    relatedSlugs: [],
  },
  {
    name: "HTML Formatter",
    slug: "html-formatter",
    category: "formatting",
    description: "Format, beautify, and minify HTML code with proper indentation.",
    icon: "HFMT",
    href: "/html-formatter",
    relatedSlugs: ["xml-formatter", "css-minifier"],
  },
  {
    name: "CSS Minifier",
    slug: "css-minifier",
    category: "formatting",
    description: "Minify and beautify CSS code with syntax validation.",
    icon: "CSS",
    href: "/css-minifier",
    relatedSlugs: ["js-minifier", "html-formatter"],
  },
  {
    name: "JavaScript Minifier",
    slug: "js-minifier",
    category: "formatting",
    description: "Minify and beautify JavaScript code with syntax validation.",
    icon: "JS",
    href: "/js-minifier",
    relatedSlugs: ["css-minifier"],
  },
  // Conversion
  {
    name: "JSON to YAML",
    slug: "json-to-yaml",
    category: "conversion",
    description: "Convert between JSON and YAML formats bidirectionally.",
    icon: "YML",
    href: "/json-to-yaml",
    relatedSlugs: ["json-formatter", "json-to-csv"],
  },
  // Utility
  {
    name: "Diff Checker",
    slug: "diff-checker",
    category: "utility",
    description: "Compare two texts side by side and highlight differences.",
    icon: "DIFF",
    href: "/diff-checker",
    relatedSlugs: [],
  },
  {
    name: "Image Compressor",
    slug: "image-compressor",
    category: "utility",
    description: "Compress JPG, PNG, and WebP images to reduce file size.",
    icon: "IMG",
    href: "/image-compressor",
    relatedSlugs: ["image-to-base64"],
  },
  {
    name: "Color Contrast Checker",
    slug: "color-contrast",
    category: "utility",
    description: "Check WCAG color contrast ratios for accessibility compliance.",
    icon: "CCR",
    href: "/color-contrast",
    relatedSlugs: ["color-converter", "random-color"],
  },
  {
    name: "User Agent Parser",
    slug: "user-agent-parser",
    category: "utility",
    description: "Parse User Agent strings to extract browser, OS, and device info.",
    icon: "UAP",
    href: "/user-agent-parser",
    relatedSlugs: ["url-parser"],
  },
  // Validation
  {
    name: "Email Validator",
    slug: "email-validator",
    category: "validation",
    description: "Validate email addresses with format and syntax checking.",
    icon: "EM",
    href: "/email-validator",
    relatedSlugs: ["url-validator", "phone-validator"],
  },
  {
    name: "URL Validator",
    slug: "url-validator",
    category: "validation",
    description: "Validate URLs and parse their components.",
    icon: "UV",
    href: "/url-validator",
    relatedSlugs: ["email-validator", "url-parser"],
  },
  {
    name: "Phone Number Validator",
    slug: "phone-validator",
    category: "validation",
    description: "Validate phone numbers and detect international formats.",
    icon: "PH",
    href: "/phone-validator",
    relatedSlugs: ["email-validator"],
  },
  {
    name: "Credit Card Validator",
    slug: "credit-card-validator",
    category: "validation",
    description: "Validate credit card numbers using the Luhn algorithm.",
    icon: "CC",
    href: "/credit-card-validator",
    relatedSlugs: [],
  },
  {
    name: "JSON Schema Validator",
    slug: "json-schema-validator",
    category: "validation",
    description: "Validate JSON data against a JSON Schema definition.",
    icon: "JSV",
    href: "/json-schema-validator",
    relatedSlugs: ["json-validator", "json-formatter"],
  },
  // Text
  {
    name: "Word Counter",
    slug: "word-counter",
    category: "text",
    description: "Count words, characters, sentences, and reading time.",
    icon: "WC",
    href: "/word-counter",
    relatedSlugs: ["character-counter"],
  },
  {
    name: "Text Reverser",
    slug: "text-reverser",
    category: "text",
    description: "Reverse text, words, or lines instantly.",
    icon: "TR",
    href: "/text-reverser",
    relatedSlugs: [],
  },
  {
    name: "Remove Duplicate Lines",
    slug: "remove-duplicates",
    category: "text",
    description: "Remove duplicate lines from text keeping first occurrence.",
    icon: "RD",
    href: "/remove-duplicates",
    relatedSlugs: ["sort-lines"],
  },
  {
    name: "Sort Lines",
    slug: "sort-lines",
    category: "text",
    description: "Sort text lines alphabetically or numerically.",
    icon: "SL",
    href: "/sort-lines",
    relatedSlugs: ["remove-duplicates"],
  },
  // CSS
  {
    name: "CSS Beautifier",
    slug: "css-beautifier",
    category: "css",
    description: "Format and beautify CSS code with proper indentation.",
    icon: "CB",
    href: "/css-beautifier",
    relatedSlugs: ["css-minifier"],
  },
  {
    name: "Gradient Generator",
    slug: "gradient-generator",
    category: "css",
    description: "Generate CSS gradients with live preview and multiple stops.",
    icon: "GR",
    href: "/gradient-generator",
    relatedSlugs: ["box-shadow-generator", "css-gradient-generator"],
  },
  {
    name: "Box Shadow Generator",
    slug: "box-shadow-generator",
    category: "css",
    description: "Generate CSS box shadows with visual preview.",
    icon: "BS",
    href: "/box-shadow-generator",
    relatedSlugs: ["gradient-generator"],
  },
  // Image
  {
    name: "Image Resizer",
    slug: "image-resizer",
    category: "image",
    description: "Resize images by dimensions with aspect ratio lock.",
    icon: "IR",
    href: "/image-resizer",
    relatedSlugs: ["image-compressor", "png-to-jpg"],
  },
  {
    name: "PNG to JPG",
    slug: "png-to-jpg",
    category: "image",
    description: "Convert PNG images to JPG format with quality control.",
    icon: "P2J",
    href: "/png-to-jpg",
    relatedSlugs: ["jpg-to-png", "image-resizer"],
  },
  {
    name: "JPG to PNG",
    slug: "jpg-to-png",
    category: "image",
    description: "Convert JPG images to PNG format with lossless quality.",
    icon: "J2P",
    href: "/jpg-to-png",
    relatedSlugs: ["png-to-jpg", "image-resizer"],
  },
  // Color
  {
    name: "Color Palette Generator",
    slug: "color-palette",
    category: "color",
    description: "Generate color palettes from a base color.",
    icon: "CP",
    href: "/color-palette",
    relatedSlugs: ["random-color", "color-converter"],
  },
  {
    name: "CSS Gradient Generator",
    slug: "css-gradient-generator",
    category: "color",
    description: "Create CSS gradients with multiple color stops.",
    icon: "CG",
    href: "/css-gradient-generator",
    relatedSlugs: ["gradient-generator"],
  },
  // Reference
  {
    name: "HTTP Status Codes",
    slug: "http-status-codes",
    category: "reference",
    description: "Complete list of HTTP status codes with descriptions.",
    icon: "HTTP",
    href: "/http-status-codes",
    relatedSlugs: [],
  },
  {
    name: "ASCII Table",
    slug: "ascii-table",
    category: "reference",
    description: "Display ASCII character table with search functionality.",
    icon: "ASC",
    href: "/ascii-table",
    relatedSlugs: ["html-entities"],
  },
  {
    name: "HTML Entities",
    slug: "html-entities",
    category: "reference",
    description: "List common HTML entities with copy-to-clipboard support.",
    icon: "HTM",
    href: "/html-entities",
    relatedSlugs: ["ascii-table", "html-encode"],
  },
  // Code Generation
  {
    name: "JSON to TypeScript",
    slug: "json-to-typescript",
    category: "code-generation",
    description: "Convert JSON data to TypeScript interfaces and types.",
    icon: "TS",
    href: "/json-to-typescript",
    relatedSlugs: ["json-to-go", "json-to-rust", "json-to-dart"],
  },
  {
    name: "JSON to Go",
    slug: "json-to-go",
    category: "code-generation",
    description: "Convert JSON data to Go struct definitions with proper tags.",
    icon: "GO",
    href: "/json-to-go",
    relatedSlugs: ["json-to-typescript", "json-to-rust"],
  },
  {
    name: "JSON to Rust",
    slug: "json-to-rust",
    category: "code-generation",
    description: "Convert JSON data to Rust struct definitions with serde derives.",
    icon: "RS",
    href: "/json-to-rust",
    relatedSlugs: ["json-to-typescript", "json-to-go"],
  },
  {
    name: "JSON to Dart",
    slug: "json-to-dart",
    category: "code-generation",
    description: "Convert JSON data to Dart classes with fromJson/toJson methods.",
    icon: "DRT",
    href: "/json-to-dart",
    relatedSlugs: ["json-to-typescript"],
  },
  // DevOps
  {
    name: "Dockerfile Generator",
    slug: "dockerfile-generator",
    category: "devops",
    description: "Generate optimized Dockerfiles for Node.js, Python, Go, and more.",
    icon: "DKR",
    href: "/dockerfile-generator",
    relatedSlugs: ["terraform-generator", "helm-chart-generator"],
  },
  {
    name: "Terraform Generator",
    slug: "terraform-generator",
    category: "devops",
    description: "Generate Terraform configuration for AWS, GCP, and Azure.",
    icon: "TF",
    href: "/terraform-generator",
    relatedSlugs: ["dockerfile-generator", "helm-chart-generator"],
  },
  {
    name: "Helm Chart Generator",
    slug: "helm-chart-generator",
    category: "devops",
    description: "Generate Kubernetes Helm chart templates with configurable values.",
    icon: "HLM",
    href: "/helm-chart-generator",
    relatedSlugs: ["dockerfile-generator", "terraform-generator"],
  },
  // Network
  {
    name: "Subnet Calculator",
    slug: "subnet-calculator",
    category: "network",
    description: "Calculate subnet ranges, CIDR notation, and IP address info.",
    icon: "NET",
    href: "/subnet-calculator",
    relatedSlugs: [],
  },
  // FinTech
  {
    name: "SIP Calculator",
    slug: "sip-calculator",
    category: "fintech",
    description: "Calculate Systematic Investment Plan returns with projected wealth.",
    icon: "SIP",
    href: "/sip-calculator",
    relatedSlugs: ["emi-calculator"],
  },
  {
    name: "EMI Calculator",
    slug: "emi-calculator",
    category: "fintech",
    description: "Calculate Equated Monthly Installments for any loan type.",
    icon: "EMI",
    href: "/emi-calculator",
    relatedSlugs: ["sip-calculator"],
  },
  // AI Tools
  {
    name: "Token Counter",
    slug: "token-counter",
    category: "ai-tools",
    description: "Count tokens, characters, and words for LLM prompts.",
    icon: "TKN",
    href: "/token-counter",
    relatedSlugs: [],
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getRelatedTools(slug: string): Tool[] {
  const tool = getToolBySlug(slug);
  if (!tool) return [];
  return tool.relatedSlugs
    .map((relatedSlug) => getToolBySlug(relatedSlug))
    .filter((t): t is Tool => t !== undefined);
}

export function searchTools(query: string): Tool[] {
  const lower = query.toLowerCase();
  return tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(lower) ||
      tool.description.toLowerCase().includes(lower) ||
      tool.category.toLowerCase().includes(lower)
  );
}
