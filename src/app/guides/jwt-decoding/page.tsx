import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Decode JWT Tokens — A Complete Guide",
  description:
    "Learn how JWT tokens work, how to decode them, and what each header, payload, and signature field means. Claims, security pitfalls, and practical examples included.",
  alternates: {
    canonical: "https://sudheertools.github.io/guides/jwt-decoding",
  },
  openGraph: {
    title: "How to Decode JWT Tokens — Complete Guide",
    description:
      "Learn how JWT tokens work, how to decode them, and what each field means.",
    url: "https://sudheertools.github.io/guides/jwt-decoding",
  },
};

export default function JwtDecodingGuide() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
      <nav className="mb-8 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>Guides</span>
        <span className="mx-2">/</span>
        <span>JWT Decoding</span>
      </nav>

      <article>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          How to Decode JWT Tokens
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          A practical guide to understanding and decoding JSON Web Tokens —
          structure, claims, security, and debugging.
        </p>

        <div className="prose prose-gray mt-8 max-w-none dark:prose-invert">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What is a JWT?
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            A JSON Web Token (JWT, often pronounced &quot;jot&quot;) is a
            compact, URL-safe way of representing claims between two parties as
            a JSON object. The format is defined in RFC 7519 and is the token
            layer behind most modern login flows: OpenID Connect ID tokens,
            OAuth 2.0 access tokens, and the sessions issued by identity
            providers such as Auth0, Keycloak, Okta, and Azure AD.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Everything inside a JWT is a claim — a statement about the user or
            client, plus metadata about the token itself: who issued it, who
            may use it, when it was created, and when it stops being valid. The
            server signs once after login, and the client presents that token
            on every later request, so the API can authorize the call without a
            database lookup each time.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            JWT Structure
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            A JWT is a single string built from three sections separated by
            single dots — a format conventionally written as
            header.payload.signature:
          </p>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto dark:bg-gray-800">
            <code>
              {
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
              }
            </code>
          </pre>
          <p className="text-gray-600 dark:text-gray-400">
            The three sections do different jobs:
          </p>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>
              <strong>Header:</strong> Metadata about the token itself: the
              signing algorithm (for example HS256 or RS256), the token type
              (typ JWT), and often a key ID (kid) that tells the verifier which
              key to fetch. The header is critical input to verification, so
              never trust it blindly.
            </li>
            <li>
              <strong>Payload:</strong> The claims: sub for the subject, roles
              or scopes for permissions, timestamps for lifetime, plus any
              custom fields your application adds. This is the part you will
              read most often when debugging.
            </li>
            <li>
              <strong>Signature:</strong> A digest computed over the encoded
              header and payload using a shared secret (HMAC) or a private key
              (RSA or ECDSA). It does not hide the data — it proves the token
              was issued by its owner and has not been modified.
            </li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400">
            The header and payload are not encrypted. They are Base64URL-encoded
            (RFC 4648, section 5), a URL-safe variant of Base64 in which
            <code>+</code> becomes <code>-</code>, <code>/</code> becomes{" "}
            <code>_</code>, and <code>=</code> padding is usually omitted. That
            is why the header and payload both begin with the characters{" "}
            <code>ey</code> — the Base64 rendering of the brace and quote that
            open a JSON object — and why a token can travel safely inside URLs,
            cookies, and the <code>Authorization</code> header.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Decoded, the first two segments of the demo token above look like
            this:
          </p>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto dark:bg-gray-800">
            <code>{`header:  {"alg": "HS256", "typ": "JWT"}
payload: {"sub": "1234567890", "name": "John Doe", "iat": 1516239022}
signature: binary data, not JSON`}</code>
          </pre>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            How to Decode
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Decoding needs nothing but a Base64 decoder: the header and payload
            decode straight back to JSON. The third section is different — it
            is not encoded data, so it cannot be decoded, only verified.
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
            <li>
              Split the token on the two dots. You get three segments; you only
              need the first two.
            </li>
            <li>
              Convert Base64URL back to standard Base64: replace every{" "}
              <code>-</code> with <code>+</code>, every <code>_</code> with{" "}
              <code>/</code>, and add <code>=</code> padding until the length is
              a multiple of 4.
            </li>
            <li>
              Base64-decode the result and parse it as JSON —{" "}
              <code>atob</code> in the browser, <code>base64 --decode</code> on
              the command line.
            </li>
            <li>Pretty-print the JSON so the claims are readable.</li>
          </ol>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto dark:bg-gray-800">
            <code>{`const [header, payload] = token.split(".");
const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
console.log(JSON.parse(json));`}</code>
          </pre>
          <p className="text-gray-600 dark:text-gray-400">
            One catch: <code>atob</code> returns a byte string, so claims with
            non-ASCII characters (names, addresses) must be decoded as UTF-8,
            for example with <code>TextDecoder</code>. For ordinary ASCII claims
            the raw output is enough. In practice you rarely do this by hand —
            a decoder handles padding, URL-safe characters, and pretty-printing
            for you.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Registered Claims
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            RFC 7519 reserves seven claim names. Providers send most of them on
            every token, so recognising them is the fastest way to read one:
          </p>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">Claim</th>
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">Meaning</th>
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">Typical value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">iss</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Issuer — who created the token</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">https://dev-123.auth0.com/</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">sub</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Subject — who the token is about</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">auth0|64f1c2...</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">aud</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Audience — who may use it</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">orders-api or a client ID</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">exp</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Expiration — Unix seconds after which the token is invalid</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">1767225600</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">nbf</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Not before — token is invalid before this time</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">1767222000</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">iat</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Issued at — Unix seconds when it was created</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">1767221900</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">jti</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Token ID — unique ID used for revocation</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">3c9b8f2e-...</td>
              </tr>
            </tbody>
          </table>
          <p className="text-gray-600 dark:text-gray-400">
            Applications layer custom claims on top — <code>scope</code>,{" "}
            <code>roles</code>, <code>permissions</code>, <code>email</code>,{" "}
            <code>tenant</code>. Keep them small: every claim travels in the
            request header on every call, and custom claims must not reuse the
            registered names.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            What Decoding Proves — and What It Doesn&apos;t
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Decoding is reading; verification is checking. They are different
            operations, and only one of them requires a key:
          </p>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>
              <strong>Decoding (no key required):</strong> anyone holding the
              token can read the header and payload. This is safe and useful
              for debugging, but it proves nothing about authenticity — an
              attacker can edit claims and re-encode them in seconds.
            </li>
            <li>
              <strong>Verification (key required):</strong> the receiver
              recomputes the signature over the encoded header and payload using
              the algorithm from the header and the issuer&apos;s secret (HMAC)
              or public key (RSA/ECDSA), then compares it with the signature in
              the token. It also checks <code>iss</code>, <code>aud</code>,{" "}
              <code>exp</code>, and <code>nbf</code> against expected values.
            </li>
            <li>
              <strong>Where it runs:</strong> your server must verify before it
              trusts. A browser can verify RS256 tokens against the
              issuer&apos;s public JWKS for display purposes, but authorization
              decisions belong on the server.
            </li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400">
            Decoding without verifying is like reading the return address on an
            envelope: useful information, but not proof of who sent it. Always
            verify tokens on your server before acting on their claims.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Common Use Cases: Debugging Real Tokens
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Most JWT decoding happens while troubleshooting. When an API starts
            answering 401, a decoded token answers these questions in seconds:
          </p>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>
              <strong>Provider setup (Auth0, Keycloak, Okta):</strong> confirm{" "}
              <code>aud</code> matches your API identifier exactly and{" "}
              <code>iss</code> matches the provider&apos;s issuer URL — a
              missing or extra trailing slash is a classic cause of rejected
              tokens.
            </li>
            <li>
              <strong>Permissions:</strong> read <code>scope</code> (a
              space-separated string) or the roles and permissions claims to see
              whether the token actually carries the access you expect.
            </li>
            <li>
              <strong>Timing:</strong> compare <code>iat</code> and{" "}
              <code>exp</code> with the current time to catch a wrong clock on
              the issuing server or an unexpectedly short lifetime.
            </li>
            <li>
              <strong>Key rotation:</strong> read <code>kid</code> from the
              header and confirm it matches one of the keys published in the
              issuer&apos;s JWKS document.
            </li>
            <li>
              <strong>ID token vs access token:</strong> the audience tells them
              apart — an ID token&apos;s <code>aud</code> is your client ID,
              while an access token&apos;s <code>aud</code> is the API. Sending
              the wrong one to the API is a very common integration bug.
            </li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Security Pitfalls
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            A token is trivial to read, which is exactly why the payload must be
            treated as public information:
          </p>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>
              <strong>The payload is encoded, not encrypted.</strong> Treat
              every claim as public. Never put passwords, API keys, or data you
              cannot expose into a JWT — anyone who can see the token (browser
              storage, access logs, a proxy) can read those claims. If you need
              confidentiality, encrypt the token (JWE) or keep the data
              server-side.
            </li>
            <li>
              <strong>alg:none attacks.</strong> A naive verifier reads{" "}
              <code>alg</code> from the header. An attacker rewrites the header
              to <code>{'{"alg": "none"}'}</code>, deletes the signature, and
              is accepted. Pin the expected algorithm in server configuration,
              reject <code>none</code>, and never let the token choose the
              algorithm.
            </li>
            <li>
              <strong>Algorithm confusion.</strong> If a server accepts HS256
              while holding only an RSA public key, an attacker can forge
              tokens by signing with HMAC and using that public key as the
              secret. The server configuration — not the token header — must
              decide which algorithm and key type apply.
            </li>
            <li>
              <strong>Unverified claims are attacker input.</strong> Reading
              roles from an unverified payload is equivalent to letting anyone
              mint an admin token. Verify first, then trust the claims.
            </li>
            <li>
              <strong>Bearer means bearer.</strong> A stolen token works until
              it expires. Keep lifetimes short, use refresh tokens, and rotate
              or revoke by <code>jti</code> if your stack supports a deny list.
            </li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Debugging Expired Tokens
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            <code>exp</code>, <code>nbf</code>, and <code>iat</code> are Unix
            timestamps in seconds — not milliseconds. Mixing the two units is
            the most common reason a token looks expired the moment it is
            issued.
          </p>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>
              Convert before comparing: <code>exp * 1000</code> against{" "}
              <code>Date.now()</code>, or <code>new Date(exp * 1000)</code> for
              a readable date. Our decoder does this for you and reports whether
              the token is already expired.
            </li>
            <li>
              If it expires immediately, check the provider&apos;s token
              lifetime setting and whether a client is replaying a cached token
              from a previous session.
            </li>
            <li>
              Allow for clock skew: <code>nbf</code> may sit slightly in the
              future and <code>exp</code> slightly in the past when servers&apos;
              clocks differ, so small leeway (30 to 60 seconds) is normal.
            </li>
            <li>
              Expect short lifetimes. Access tokens commonly live 5 to 60
              minutes on purpose, with a longer refresh token exchanging for a
              fresh one. An expired access token is routine; a failing refresh
              flow is the real bug.
            </li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <dl className="text-gray-600 dark:text-gray-400">
            <dt className="font-semibold text-gray-900 dark:text-white mt-4">
              Do I need a secret key to decode a JWT?
            </dt>
            <dd className="mt-1">
              No. The header and payload are only Base64URL-encoded, so anyone
              can read them with a decoder. The secret or private key is
              required for verification — proving the token came from a trusted
              issuer and was not modified — which is a different operation.
            </dd>
            <dt className="font-semibold text-gray-900 dark:text-white mt-4">
              Is it safe to decode a JWT in the browser?
            </dt>
            <dd className="mt-1">
              Yes. Decoding is local string manipulation, and our decoder runs
              entirely in your browser, so the token never leaves your machine.
              Safe to read is not the same as safe to trust: never authorize a
              request from an unverified payload.
            </dd>
            <dt className="font-semibold text-gray-900 dark:text-white mt-4">
              Why does my token expire after 15 minutes?
            </dt>
            <dd className="mt-1">
              Short access-token lifetimes limit the damage of a stolen token;
              the client silently exchanges a refresh token for a new one. If
              you need longer sessions, change the lifetime in your identity
              provider&apos;s settings — do not remove the expiry check on your
              API.
            </dd>
          </dl>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Try It Yourself
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Use our free{" "}
            <Link
              href="/jwt-decoder"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              JWT Decoder
            </Link>{" "}
            to instantly decode any JWT token. Paste your token and see the
            header, payload, and expiration — entirely in your browser, no data
            uploaded.
          </p>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>
              Decodes both the header and the payload, including tokens whose
              Base64URL padding is missing.
            </li>
            <li>
              Converts <code>exp</code>, <code>iat</code>, and{" "}
              <code>nbf</code> from Unix seconds into readable dates.
            </li>
            <li>
              Shows whether the token is expired, or exactly how long it still
              has to live.
            </li>
            <li>
              Rejects malformed input with a clear message — a JWT must have
              exactly three dot-separated parts.
            </li>
          </ul>
        </div>
      </article>

      <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
        <Link
          href="/"
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          &larr; Back to all tools
        </Link>
      </div>
    </div>
  );
}
