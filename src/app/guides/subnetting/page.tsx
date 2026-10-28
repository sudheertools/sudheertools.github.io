import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Subnetting Guide — CIDR, Masks, and Usable Hosts",
  description:
    "Practical subnetting guide: CIDR notation, network and broadcast addresses, RFC 1918 private ranges, VLSM basics, and common prefix sizes.",
  alternates: {
    canonical: "https://sudheertools.github.io/guides/subnetting",
  },
  openGraph: {
    title: "Subnetting Guide — CIDR, Masks, and Usable Hosts",
    description:
      "CIDR notation, usable host math, private ranges, and VLSM for network planning.",
    url: "https://sudheertools.github.io/guides/subnetting",
  },
};

export default function SubnettingGuide() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
      <nav className="mb-8 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/guides" className="hover:text-blue-600 dark:hover:text-blue-400">
          Guides
        </Link>
        <span className="mx-2">/</span>
        <span>Subnetting</span>
      </nav>

      <article>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Subnetting: CIDR and Usable Hosts
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          How CIDR prefixes map to masks, which addresses are reserved, and the
          private ranges you should plan around.
        </p>

        <div className="prose prose-gray mt-8 max-w-none dark:prose-invert">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            CIDR Notation
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            A CIDR block is an address plus a prefix length: 192.168.1.0/24
            means the first 24 bits identify the network and the remaining 8
            bits identify hosts. The prefix determines the mask (/24 →
            255.255.255.0) and the block size (2^(32−24) = 256 addresses).
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Common Prefix Sizes
          </h2>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">Prefix</th>
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">Mask</th>
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">Total</th>
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">Usable Hosts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="py-2 font-mono text-gray-900 dark:text-white">/30</td><td className="py-2 text-gray-600 dark:text-gray-400">255.255.255.252</td><td className="py-2 text-gray-600 dark:text-gray-400">4</td><td className="py-2 text-gray-600 dark:text-gray-400">2</td></tr>
              <tr><td className="py-2 font-mono text-gray-900 dark:text-white">/29</td><td className="py-2 text-gray-600 dark:text-gray-400">255.255.255.248</td><td className="py-2 text-gray-600 dark:text-gray-400">8</td><td className="py-2 text-gray-600 dark:text-gray-400">6</td></tr>
              <tr><td className="py-2 font-mono text-gray-900 dark:text-white">/28</td><td className="py-2 text-gray-600 dark:text-gray-400">255.255.255.240</td><td className="py-2 text-gray-600 dark:text-gray-400">16</td><td className="py-2 text-gray-600 dark:text-gray-400">14</td></tr>
              <tr><td className="py-2 font-mono text-gray-900 dark:text-white">/27</td><td className="py-2 text-gray-600 dark:text-gray-400">255.255.255.224</td><td className="py-2 text-gray-600 dark:text-gray-400">32</td><td className="py-2 text-gray-600 dark:text-gray-400">30</td></tr>
              <tr><td className="py-2 font-mono text-gray-900 dark:text-white">/24</td><td className="py-2 text-gray-600 dark:text-gray-400">255.255.255.0</td><td className="py-2 text-gray-600 dark:text-gray-400">256</td><td className="py-2 text-gray-600 dark:text-gray-400">254</td></tr>
              <tr><td className="py-2 font-mono text-gray-900 dark:text-white">/16</td><td className="py-2 text-gray-600 dark:text-gray-400">255.255.0.0</td><td className="py-2 text-gray-600 dark:text-gray-400">65,536</td><td className="py-2 text-gray-600 dark:text-gray-400">65,534</td></tr>
            </tbody>
          </table>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Reserved Addresses
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Every block reserves the first address (network) and the last
            (broadcast). Usable hosts = total − 2. A /31 (2 addresses) is a
            special point-to-point case with no reserved addresses on modern
            equipment; /32 is a single host route.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            RFC 1918 Private Ranges
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>10.0.0.0/8 — 10.0.0.0 to 10.255.255.255</li>
            <li>172.16.0.0/12 — 172.16.0.0 to 172.31.255.255</li>
            <li>192.168.0.0/16 — 192.168.0.0 to 192.168.255.255</li>
          </ul>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            These never route on the public internet; use NAT or a VPN at the
            edge. Overlapping private ranges between two merging networks is a
            classic cloud-migration problem — plan non-overlapping CIDRs early.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Related Tools
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li><Link href="/subnet-calculator" className="text-blue-600 hover:underline dark:text-blue-400">Subnet Calculator</Link> — network, broadcast, and host range</li>
            <li><Link href="/number-base-converter" className="text-blue-600 hover:underline dark:text-blue-400">Number Base Converter</Link> — inspect binary masks</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
