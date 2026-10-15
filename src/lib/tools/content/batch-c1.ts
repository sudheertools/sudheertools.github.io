import type { Tool } from "../registry";

export type ToolContent = Pick<
  Tool,
  "whatIs" | "whyUse" | "howToUse" | "examples" | "useCases" | "faqs"
>;

export const batchC1Content: Record<string, ToolContent> = {
  "remove-duplicates": {
    whatIs:
      "Duplicate lines creep into data everywhere: merged CSV exports, aggregated log dumps, concatenated package lists, and SQL result sets pasted into a ticket. This tool splits your text on newlines and walks the lines once, keeping the first occurrence of every unique line and discarding later repeats. Uniqueness is an exact string match by default, so Apple and apple count as two different lines; untick Case sensitive to compare lowercased keys instead, while the surviving line keeps the original casing it was first seen with. Because every key lives in a Set, the pass is linear in the number of lines, which matters when you paste a hundred thousand rows of output at once.",
    whyUse: [
      "Keeps the first occurrence of each repeated line, so your original ordering and the earliest value you saw are preserved.",
      "The Case sensitive checkbox changes matching without rewriting the capitalisation of the lines that survive.",
      "A blue summary strip reports Total lines, Removed, and Remaining, so you can verify the change instead of eyeballing it.",
      "Large inputs are processed in a single Set pass, so ten-thousand-line log files finish almost instantly.",
      "Deduplication runs inside this browser tab - the text you paste is never transmitted or saved.",
    ],
    howToUse: [
      "Paste your list into the Input box on the left, one item per line.",
      "Leave the Case sensitive checkbox above the editors ticked for exact matching, or clear it so Apple and apple count as the same line.",
      "Click Remove Duplicates.",
      "Read the summary strip under the buttons: Total lines, Removed, and Remaining.",
      "Press Copy to put the cleaned text on the clipboard, or Clear to empty both boxes and the counter.",
      "If nothing repeated, a toast reports 'No duplicate lines found.' and the Output box still shows your original text.",
    ],
    examples: [
      {
        title: "Case-sensitive cleanup (5 lines in, 3 out, 2 removed)",
        input: "apple\nbanana\napple\ncherry\nbanana",
        output: "apple\nbanana\ncherry",
      },
      {
        title: "Case insensitive match keeps the first spelling (4 lines, 2 removed)",
        input: "Apple\napple\nBANANA\nbanana",
        output: "Apple\nBANANA",
      },
      {
        title: "Nothing to remove",
        input: "one\ntwo",
        output: "one\ntwo",
      },
    ],
    useCases: [
      "Cleaning aggregated CI or build output where the same warning line is repeated by every parallel job.",
      "Deduplicating pasted ID lists, email addresses, or package names before importing them into a sheet or script.",
      "Removing repeated rows produced by a JOIN or UNION ALL query before you count unique values.",
      "Trimming duplicate entries that have accumulated in a hosts file, allowlist, or route table over time.",
    ],
    faqs: [
      {
        q: "Does it remove duplicate words or only whole lines?",
        a: "Only whole lines. Each line is compared as one complete string, so user 1 and user 2 stay separate entries even though they share a word. For word-level deduplication, split the text into words first and run them through as lines.",
      },
      {
        q: "Is whitespace taken into account?",
        a: "Yes. Leading spaces, trailing spaces, and tabs are part of the line's key, which means apple and apple with a leading space are different lines. Trim spacing in your editor first if you want them collapsed.",
      },
      {
        q: "Why does case-insensitive mode keep Apple instead of lowercasing everything?",
        a: "Lowercasing is only used to build the comparison key; the first line encountered is copied to the output unchanged. That way the result keeps natural capitalisation while still folding Apple, APPLE, and apple into a single entry.",
      },
      {
        q: "What happens to blank lines?",
        a: "They are ordinary lines with an empty key: the first blank line is kept, and any further blank lines are counted as duplicates and removed. A trailing newline also creates one empty final line, so output counts can look one higher than you expect.",
      },
    ],
  },

  "sort-lines": {
    whatIs:
      "Sorting a block of lines is the fastest way to audit it: duplicates become adjacent, gaps in an ID sequence jump out, and unsorted config keys are easy to spot. This tool offers four modes on one row of buttons. A to Z and Z to A compare lines alphabetically using locale-aware ordering, so capitalisation does not shove every uppercase entry to the top. 0 to 9 and 9 to 0 parse each line with parseFloat and order by numeric value, which correctly ranks 10 above 2 - something plain text comparison gets wrong. Lines that do not start with a number are pushed to the end of both numeric modes instead of scattering through the result.",
    whyUse: [
      "Four one-click modes cover ascending and descending order for both text and numbers - no options panel to configure.",
      "Numeric modes parse with parseFloat, so mixed magnitudes rank correctly: 2, 10, 100 instead of 1, 10, 2.",
      "Non-numeric lines collect at the end of the list rather than interrupting the ordered numbers.",
      "Locale-aware comparison gives natural casing order (Apple before banana) instead of raw code-unit order.",
      "Sorting is plain client-side array work - nothing you paste is sent anywhere.",
    ],
    howToUse: [
      "Paste the lines you want ordered into the Input box on the left; blank lines count as items too.",
      "Pick a mode from the button row: A to Z, Z to A, 0 to 9, or 9 to 0 (A to Z is selected by default).",
      "Click Sort.",
      "Read the ordered result in the read-only Output box on the right.",
      "Click Copy to take the sorted text, or Clear to empty both boxes.",
      "Switch modes and press Sort again to compare orderings without re-pasting anything.",
    ],
    examples: [
      {
        title: "Alphabetical ascending (A to Z)",
        input: "pear\napple\nmango",
        output: "apple\nmango\npear",
      },
      {
        title: "Alphabetical descending (Z to A)",
        input: "pear\napple\nmango",
        output: "pear\nmango\napple",
      },
      {
        title: "Numeric ascending (0 to 9) - note 10 after 2",
        input: "10\n2\n1\n100",
        output: "1\n2\n10\n100",
      },
      {
        title: "Numeric descending (9 to 0)",
        input: "10\n2\n1\n100",
        output: "100\n10\n2\n1",
      },
    ],
    useCases: [
      "Ordering environment variables, feature flags, or route lists before committing so diffs stay minimal.",
      "Sorting numeric IDs or build numbers to spot duplicates and missing values at a glance.",
      "Putting a ticket-key or version list in order for a release checklist.",
      "Normalising a word list or dictionary file so spell-checkers and diff tools behave predictably.",
    ],
    faqs: [
      {
        q: "Why do numbers sort wrong in A to Z mode?",
        a: "Alphabetical comparison treats everything as text, so 10 lands before 2 because the character 1 precedes 2. Switch to 0 to 9, which parses each line as a number before comparing.",
      },
      {
        q: "How are non-numeric lines handled in the numeric modes?",
        a: "Lines that fail parseFloat compare as greater than every number, so they gather at the end of the list in both 0 to 9 and 9 to 0. Among themselves they still sort alphabetically, or in reverse alphabetical order for the descending mode.",
      },
      {
        q: "Is sorting case-sensitive?",
        a: "It uses locale-aware comparison rather than raw character codes, so mixed-case lists interleave naturally - Apple comes before banana instead of all capitals clumping into one block at the top.",
      },
      {
        q: "Does the tool drop blank lines?",
        a: "No. Empty lines are sorted like any other entry, and in numeric modes they count as non-numeric, so they end up at the bottom. Use Remove Duplicate Lines or edit by hand if you need them gone.",
      },
    ],
  },

  "css-beautifier": {
    whatIs:
      "Minified or machine-generated CSS is hard to read because every rule is collapsed onto one line. Beautifying it means re-inserting the structure: a newline and a deeper indent level after each opening brace, a fresh line after every declaration-ending semicolon, and exactly one space after each property colon. This formatter walks the stylesheet character by character while tracking brace depth, using two spaces per level, and it is string-aware - braces and semicolons inside quoted values such as a url() path are left untouched rather than treated as syntax. It reformats only: your selectors, values, and formatting quirks such as missing trailing semicolons pass through unchanged.",
    whyUse: [
      "Turns one-line minified CSS back into readable rules with consistent two-space indentation.",
      "String-aware, so punctuation inside quoted values like a url() filename never breaks the formatting pass.",
      "Empty input reports a clear inline error under the input box instead of silently returning nothing.",
      "The Beautified Output pane is read-only, keeping your source intact while you review the result.",
      "Formatting is a local string pass - your stylesheet stays on your device with no server round trip.",
    ],
    howToUse: [
      "Paste minified or messy CSS into the Input CSS box on the left.",
      "Click Beautify.",
      "Read the result in Beautified Output on the right: two spaces per nesting level, a new line per declaration, and a space after every colon.",
      "Click Copy to put the formatted CSS on the clipboard, or Clear to wipe both boxes and any error message.",
      "If the input is empty you get an inline message under the input: Please enter CSS to beautify.",
      "When formatting fails (for example an unbalanced closing brace), the error appears under the input and the output is cleared so you never copy a partial result.",
    ],
    examples: [
      {
        title: "Single-line rule set expanded",
        input: ".container{margin:0;padding:20px;}",
        output: ".container {\n  margin: 0;\n  padding: 20px;\n}",
      },
      {
        title: "Nested at-rule keeps its indent levels",
        input: "@media (max-width:600px){.nav{display:none;}}",
        output: "@media (max-width: 600px) {\n  .nav {\n    display: none;\n  }\n}",
      },
      {
        title: "Semicolons inside quoted strings are protected",
        input: '.box{background:url("a;b.png");border:1px solid red;}',
        output: '.box {\n  background: url("a;b.png");\n  border: 1px solid red;\n}',
      },
    ],
    useCases: [
      "Re-reading a vendor stylesheet that ships minified before you patch a rule in it.",
      "Cleaning CSS pasted out of a design tool or code generator that emits a single long line.",
      "Making rules diff-friendly before committing so code review shows only real changes.",
      "Normalising indentation when merging stylesheets written with tabs or inconsistent spacing.",
    ],
    faqs: [
      {
        q: "Why did my a:hover selector become a: hover?",
        a: "The formatter inserts a space after every colon outside quotes, which is exactly right for declarations but also reaches selector pseudo-classes. Delete that extra space in selectors if it bothers you - the rule still matches either way.",
      },
      {
        q: "Does it validate or repair broken CSS?",
        a: "No. It only repositions characters; unknown properties and missing semicolons pass through as-is. Structural problems surface as shifted indentation, and an unbalanced closing brace raises an error that is displayed under the input box.",
      },
      {
        q: "Why is the last semicolon missing from my output?",
        a: "The formatter never adds punctuation that was not in the input. If the final declaration before a closing brace had no semicolon, it stays that way - which is still valid CSS, because a trailing semicolon is optional.",
      },
      {
        q: "Can I minify CSS with this tool too?",
        a: "Minification is a separate page (CSS Minifier) that strips whitespace instead of adding it. Both tools share the same string-aware rules, so quoted content stays intact in either direction.",
      },
    ],
  },

  "gradient-generator": {
    whatIs:
      "A CSS gradient is a function that paints a colour transition across an element. linear-gradient takes an angle in degrees - 0deg points to the top, 90deg to the right - and lays colour stops along the line that angle defines, while radial-gradient spreads the same stops outward from a centre point as a circle. Each stop is a colour plus a position in percent, and the browser blends between neighbours. The angle is what separates a flat banner from one that feels lit from a corner: 135deg reads as light falling from the top-left, and 90deg sweeps horizontally across a hero section. This generator tunes that angle, flips between linear and radial, and writes the finished declaration for you.",
    whyUse: [
      "The Angle slider covers the full 0 to 360 degree range, and the preview updates as you drag.",
      "Linear and Radial are one click apart, so you can sweep a hero backdrop or centre a glow without editing syntax.",
      "Add Color Stop builds multi-point transitions, and the X button trims stops back down (two always remain).",
      "Every stop has a colour picker, an editable hex field, and a position slider with a live percentage readout.",
      "Copy CSS hands you the complete background declaration - the gradient you see is the text you get.",
    ],
    howToUse: [
      "Watch the preview bar at the top of the card; it always renders the gradient you are building.",
      "Click Linear or Radial to set the type (Linear is selected by default).",
      "With Linear active, drag the Angle slider between 0 and 360 degrees; the label reads Angle: 135 as you move it.",
      "For each colour stop, pick a swatch or type a hex value, then set its position on the percentage slider.",
      "Press Add Color Stop to insert another point, or the red X on a row to delete it (X disappears when only two stops are left).",
      "Click Copy CSS in the CSS Code panel to copy the full background: declaration to your clipboard.",
    ],
    examples: [
      {
        title: "Diagonal hero backdrop with a custom angle",
        input: "Type: Linear, Angle: 135, stops: #0f0c29 0%, #302b63 50%, #24243e 100%",
        output: "background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);",
      },
      {
        title: "Horizontal sweep using the default two stops",
        input: "Type: Linear, Angle: 90, stops: #667eea 0%, #764ba2 100%",
        output: "background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);",
      },
      {
        title: "Radial spotlight behind a section",
        input: "Type: Radial, stops: #667eea 0%, #764ba2 100%",
        output: "background: radial-gradient(circle, #667eea 0%, #764ba2 100%);",
      },
    ],
    useCases: [
      "Hero section backdrops where the gradient angle has to match the diagonal of the layout.",
      "A radial glow behind a pricing card or call-to-action that pulls the eye to the centre.",
      "Two-tone header bands that transition horizontally across the viewport.",
      "Previewing brand colour pairs at several angles before committing one to a stylesheet.",
    ],
    faqs: [
      {
        q: "Which angle gives a top-left to bottom-right look?",
        a: "Use 135deg. Zero degrees points straight up and 90deg points right, so 135deg aims down and to the right at the corner. Any value works, though - drag the slider until the preview matches your layout.",
      },
      {
        q: "Why does Radial hide the angle slider?",
        a: "A radial gradient spreads from a centre point instead of travelling along a direction, so there is no angle to set. The tool emits radial-gradient(circle, ...) with your stops; switch back to Linear to use the slider again.",
      },
      {
        q: "Do I need -webkit- vendor prefixes?",
        a: "Not in any browser from the last several years; linear-gradient and radial-gradient ship unprefixed in every current engine. Paste the copied declaration as-is.",
      },
      {
        q: "How do I make a hard-edged band instead of a blend?",
        a: "Give two adjacent stops the same position, for example white at 40% and dark at 40%. There is no distance left to interpolate across, so the colours meet at a crisp line.",
      },
    ],
  },

  "box-shadow-generator": {
    whatIs:
      "A CSS box-shadow is one shorthand property built from up to five parts: offset X and offset Y move the shadow, blur radius softens its edge, spread grows or shrinks it relative to the box, and the colour decides how dark it reads - almost always with alpha so it looks like light rather than paint. A leading inset keyword flips the shadow inside the element, which is how recessed inputs and pressed buttons are faked. Negative spread pulls the shadow inward for tighter elevations, and negative offsets move it up or left. The important constraint is that a shadow is painted outside the layout flow: nothing reflows when you change one.",
    whyUse: [
      "Offset X, Offset Y, Blur, Spread, and Color all sit on one screen with a live preview card.",
      "Realistic ranges: offsets and spread run from -50 to 50 pixels, blur from 0 to 100.",
      "The Inset shadow checkbox switches to an inner shadow for pressed, recessed, or well effects.",
      "The colour field accepts any CSS notation - hex, rgb(), hsl(), or rgba() for transparency.",
      "Copy CSS returns the complete property with px units on every value, ready to paste into a stylesheet.",
    ],
    howToUse: [
      "Look at the rounded card in the preview area; it wears the current shadow and updates as you edit.",
      "Drag Offset X and Offset Y to move the shadow horizontally and vertically (negative values shift left and up).",
      "Set Blur to soften the edge, then Spread to grow the shadow past the box or shrink it inside (negative pulls in).",
      "Type a colour such as rgba(0,0,0,0.1) in the Color field, and tick Inset shadow for an inner effect.",
      "Read the CSS Code panel, then click Copy CSS to copy box-shadow: ...; to the clipboard.",
    ],
    examples: [
      {
        title: "Card elevation (the default configuration)",
        input: "Offset X: 0, Offset Y: 4, Blur: 6, Spread: -1, Color: rgba(0,0,0,0.1), Inset: off",
        output: "box-shadow: 0px 4px 6px -1px rgba(0,0,0,0.1);",
      },
      {
        title: "Soft coloured glow with no offset",
        input: "Offset X: 0, Offset Y: 0, Blur: 24, Spread: 0, Color: rgba(102,126,234,0.6), Inset: off",
        output: "box-shadow: 0px 0px 24px 0px rgba(102,126,234,0.6);",
      },
      {
        title: "Inset shadow for a pressed state",
        input: "Offset X: 0, Offset Y: 2, Blur: 4, Spread: 0, Color: rgba(0,0,0,0.2), Inset: on",
        output: "box-shadow: inset 0px 2px 4px 0px rgba(0,0,0,0.2);",
      },
    ],
    useCases: [
      "Designing an elevation scale for a card system - light, medium, and floating - with consistent blur and opacity.",
      "Building focus rings and hover glows around buttons using a coloured shadow.",
      "Creating recessed inputs, wells, and track backgrounds with the inset option.",
      "Tuning dark-mode surfaces, where shadows usually need more blur and lower opacity to read correctly.",
    ],
    faqs: [
      {
        q: "What does a negative spread value do?",
        a: "It shrinks the shadow inside the element's bounds instead of letting it bleed outward, which produces a tighter, thinner-looking elevation. The -1px spread in the default card shadow keeps the drop close to the edge.",
      },
      {
        q: "Does a box shadow take up space in the layout?",
        a: "No. box-shadow paints outside the normal flow, so neighbours never move when you adjust it and shadows may overlap them. If you need reserved room, add padding or a border to the element instead.",
      },
      {
        q: "Why does the output put px on every number?",
        a: "The generator always writes explicit pixels for offset, blur, and spread. CSS also permits unitless zero for blur and spread, but the pixel form is valid everywhere and removes any ambiguity in the shorthand.",
      },
      {
        q: "Which colour format works best for shadows?",
        a: "Any CSS colour is accepted, but rgba() or hsl() with an alpha channel usually looks best. Transparency is what makes a shadow feel soft; a fully opaque colour reads as a solid outline instead.",
      },
    ],
  },

  "image-resizer": {
    whatIs:
      "Resizing means resampling: the source pixels are drawn onto a canvas at a new width and height, so the browser interpolates detail downward when you shrink (or blurs it upward when you enlarge). Two decisions shape the result - the pixel dimensions you type, and whether Maintain aspect ratio keeps the original proportion so nothing is stretched. Downscaling for the web is almost always worthwhile, because a 4000-pixel photo has no business sitting in an 800-pixel card and every saved pixel is bandwidth. The output keeps the source file's format, PNG stays PNG and JPG stays JPG re-encoded at 92 percent, and the side-by-side panels print both pixel size and file size before you download.",
    whyUse: [
      "Aspect-ratio lock fits the image inside your target box without distortion by computing the matching dimension for you.",
      "Original and Resized panels show pixels and formatted file size together, so savings are visible before downloading.",
      "The source format is preserved - PNG comes back as PNG and JPG as JPG, with no surprise conversion.",
      "Width and Height fields auto-fill with the image's true dimensions the moment you choose a file.",
      "Resampling happens on a local canvas: the picture is decoded and re-encoded on your device, never uploaded.",
    ],
    howToUse: [
      "Choose a file with the picker at the top - any image type is accepted, anything else is rejected with a toast.",
      "Width and Height fill in automatically with the original pixel dimensions.",
      "Enter your target size in pixels. Keep Maintain aspect ratio ticked to fit inside the box, or clear it to force exact (potentially distorting) dimensions.",
      "Click Resize; the button label changes to Resizing... while the canvas works.",
      "Compare the Original and Resized panels, each headed by its pixel dimensions and formatted file size.",
      "Press Download to save the file as resized- followed by the original name, or Clear to start over.",
    ],
    examples: [
      {
        title: "Wide photo fitted into an 800 by 600 box",
        input: "1600x900 photo, Width: 800, Height: 600, Maintain aspect ratio: on",
        output: "800x450 - the width constrains and the height follows the 16:9 ratio, so nothing is distorted",
      },
      {
        title: "Forced square thumbnail",
        input: "4032x3024 photo, Width: 512, Height: 512, Maintain aspect ratio: off",
        output: "512x512 - exact square, but pixels are stretched because the ratio changed",
      },
      {
        title: "Portrait constrained by height",
        input: "900x1600 portrait, Width: 800, Height: 600, Maintain aspect ratio: on",
        output: "338x600 - the height constrains, width rounds from 600 x (900 / 1600) = 337.5",
      },
    ],
    useCases: [
      "Shrinking camera photos to 1200-pixel-wide hero images before adding them to a page.",
      "Generating fixed 512 or 1024 pixel square assets for app icons and avatars.",
      "Reducing a screenshot so it fits inside a README without forcing endless scrolling.",
      "Checking how much file size drops at a given dimension before wiring the step into a build pipeline.",
    ],
    faqs: [
      {
        q: "What happens when I upscale an image?",
        a: "It works, but no detail is invented: the browser interpolates the pixels that already exist, so the result looks softer than a genuinely larger capture. Reserve upscaling for layout placeholders rather than recovering detail.",
      },
      {
        q: "Why is the resized file barely smaller?",
        a: "Both dimension reduction and compression drive size. If you only trimmed a few pixels there is little to gain, so pair a bigger downscale with a leaner export - the PNG to JPG tool is the lever when the source is a photo.",
      },
      {
        q: "Does the resized image keep transparency?",
        a: "Yes, because the source MIME type is preserved: a transparent PNG returns as a transparent PNG. JPG sources stay JPG, and JPEG cannot carry an alpha channel at all.",
      },
      {
        q: "Can I resize to exact, non-proportional dimensions?",
        a: "Yes - clear Maintain aspect ratio and both fields are used verbatim. That stretches or squashes the picture, which is handy for filling a fixed frame but wrong whenever the original proportions matter.",
      },
    ],
  },

  "png-to-jpg": {
    whatIs:
      "PNG stores pixels losslessly with a full alpha channel, which keeps screenshots and logos crisp but heavy; JPEG instead discards information through frequency-domain compression to shrink photographs dramatically. Converting means decoding the PNG, painting it onto a canvas, and re-encoding as image/jpeg at a quality you choose - the slider runs from 10 to 100 and starts at 92. The catch is alpha: JPEG has no transparency, so this tool fills the canvas with white (#FFFFFF) first and transparent regions become white rather than black. Choose it for photos and dense screenshots where bytes matter; keep PNG when transparency or pixel-exact text matters more.",
    whyUse: [
      "Quality slider from 10 to 100 percent lets you trade file size against compression artefacts deliberately.",
      "Transparency is handled explicitly: the canvas is painted white before encoding, so nothing turns black.",
      "Side-by-side previews print both file sizes, making the saving obvious before you commit to a download.",
      "Your filename is kept and only the extension changes from .png to .jpg.",
      "Conversion runs on an in-page canvas - no upload step, no queue, and no copy of your image on a server.",
    ],
    howToUse: [
      "Pick a PNG with the file chooser - only image/png is accepted, other types raise a toast.",
      "Adjust the Quality slider if you wish; it begins at 92 and can go as low as 10.",
      "Click Convert to JPG; the button reads Converting... while the canvas encodes.",
      "Compare the two previews: Original PNG shows the source size and Converted JPG shows the result.",
      "Press Download to save the file with a .jpg extension, or Clear to reset both panes.",
      "If the result looks blocky, raise Quality and convert again - every run re-reads the untouched original PNG.",
    ],
    examples: [
      {
        title: "Screenshot converted at default quality",
        input: "dashboard.png (1600x900, 1.8 MB), Quality: 92",
        output: "dashboard.jpg - image/jpeg re-encoded at 0.92, usually far smaller for photographic or gradient-heavy content",
      },
      {
        title: "Transparency is flattened to white",
        input: "badge.png (512x512, transparent background), Quality: 92",
        output: "badge.jpg - transparent pixels painted #FFFFFF white, because JPEG cannot store an alpha channel",
      },
      {
        title: "Quality extremes on the same file",
        input: "photo.png (3 MB), Quality: 100 compared with Quality: 40",
        output: "100 stays close to the source size with minimal artefacts; 40 shrinks sharply but shows ringing around hard edges",
      },
    ],
    useCases: [
      "Cutting the weight of PNG screenshots before embedding them in docs or issue threads.",
      "Preparing product photos that a camera app saved as PNG for delivery over the web.",
      "Meeting an upload form that only accepts .jpg files.",
      "Reducing image weight in email templates, where many clients handle large PNGs poorly.",
    ],
    faqs: [
      {
        q: "Will my transparent areas survive the conversion?",
        a: "Not as transparency. JPEG has no alpha channel, so the tool paints the canvas white first and those regions ship as white pixels. If a white halo would look wrong, stay with PNG or composite the image onto your target background colour first.",
      },
      {
        q: "Does the quality setting change my dimensions?",
        a: "No. Quality only feeds the JPEG encoder; width and height are copied exactly from the source PNG. Use the Image Resizer if you also need to change pixel dimensions.",
      },
      {
        q: "Why did the file not shrink at 100 percent?",
        a: "At 100 the encoder keeps nearly everything, and flat-colour PNG screenshots are already highly compressed. Slide toward 70 to 85 percent, the range where JPEG usually wins big without visible damage.",
      },
      {
        q: "Can I convert the result back to PNG later?",
        a: "You can decode it again, but the compression is baked in - converting JPG to PNG restores no pixels JPEG discarded. Keep the original PNG around if you still need a clean master.",
      },
    ],
  },

  "jpg-to-png": {
    whatIs:
      "JPEG decoding is fixed: the decompressor hands your pixels to the browser exactly as the encoder left them, artefacts included. Encoding those pixels as PNG swaps a lossy compressor for a lossless one (DEFLATE over filtered scanlines), so every decoded value is preserved bit for bit - and the file usually grows, often several times over, because nothing is thrown away. That is why this tool has no quality slider: there is no knob to turn when the format itself is lossless. Converting a JPG to PNG does not create transparency, since a JPEG never had an alpha channel; what you gain is a format editors and pipelines can re-save without compounding loss each time.",
    whyUse: [
      "Pixel-lossless hand-off: the decoded JPEG is re-encoded with PNG compression, so no further quality is lost downstream.",
      "No quality setting to agonise over - lossless encoding has no lossy parameter in the first place.",
      "Ideal before editing, because each subsequent save in a lossy format would otherwise stack new artefacts.",
      "Satisfies CMS uploads, forms, and validators that require a .png filename or MIME type.",
      "The browser decodes and re-encodes on its own - no cloud converter API and no upload step.",
    ],
    howToUse: [
      "Select a JPG with the file picker; image/jpeg and image/jpg are accepted, anything else raises a toast.",
      "Skip the settings entirely - there is no quality control, because PNG encoding is lossless.",
      "Click Convert to PNG; the button displays Converting... while the canvas works.",
      "Compare the Original JPG and Converted PNG previews, each labelled with its file size.",
      "Press Download to save with a .png extension (.jpg and .jpeg names are both renamed), or Clear to reset.",
    ],
    examples: [
      {
        title: "Lossless re-encode of a photo",
        input: "portrait.jpg (800x1200, 96 KB)",
        output: "portrait.png - the same decoded pixels, fully opaque, stored with PNG compression and therefore several times larger",
      },
      {
        title: "Satisfying a PNG-only upload",
        input: "scan.jpg (2480x3508), form accepts .png only",
        output: "scan.png - passes the extension check, dimensions unchanged",
      },
      {
        title: "Preparing a file for editing",
        input: "artwork.jpg opened for retouching in a design tool",
        output: "artwork.png - later saves stay lossless, so repeated edits no longer stack JPEG artefacts",
      },
    ],
    useCases: [
      "Uploading to a CMS or form that rejects .jpg files outright.",
      "Moving a JPEG into an editing workflow where every save would otherwise re-compress it.",
      "Creating a base you can later cut a background out of: the PNG stores the new alpha without touching existing pixels.",
      "Producing lossless intermediates for image-diff or OCR tooling that is sensitive to compression noise.",
    ],
    faqs: [
      {
        q: "Why is the PNG so much bigger than the JPG?",
        a: "JPEG deletes detail to save space; PNG keeps every decoded pixel, so the same image needs more bytes. Expect the PNG to come out several times larger depending on content - that growth is the price of losslessness, not a bug.",
      },
      {
        q: "Will this make my image transparent?",
        a: "No. A JPEG carries no alpha channel, so the resulting PNG is fully opaque. The conversion gives you a container that can hold transparency from now on; you still have to add the cut-out yourself in an editor.",
      },
      {
        q: "Does it repair JPEG compression artefacts?",
        a: "No. Blockiness and ringing are already baked into the decoded pixels, and PNG faithfully preserves them. Quality can only ever be lost in a conversion, never recovered.",
      },
      {
        q: "Is the missing quality slider a bug?",
        a: "It is intentional. PNG compression is lossless and deterministic - there is no quality-versus-size trade-off to expose, so the tool has nothing to offer beyond starting the conversion.",
      },
    ],
  },

  "color-palette": {
    whatIs:
      "Colour schemes are built by rotating hue while holding saturation and lightness steady. Complementary sits 180 degrees opposite on the wheel, analogous uses the immediate neighbours at minus 30 and plus 30, triadic divides the circle into thirds at 120 and 240, split-complementary flanks the complement at 150 and 210, and tetradic forms a rectangle with four hues at 90-degree steps. The tool converts your base hex into HSL, adds the offset to the hue, converts back to RGB, and rounds into a hex string, so every derived colour keeps the intensity and brightness of your base - only the hue moves. That shared saturation and lightness is what makes a palette read as one family instead of a random grab bag.",
    whyUse: [
      "Five classic schemes - Complementary, Analogous, Triadic, Split-Complementary, and Tetradic - from a single row of buttons.",
      "Set the base with the colour picker or by typing a hex value; the two controls stay in sync.",
      "Saturation and lightness carry over from your base colour, so swatches feel related rather than arbitrary.",
      "Click any swatch or its hex label to copy that single colour, with a toast confirming the value copied.",
      "Palette maths runs in the page - the colour you choose is not sent anywhere.",
    ],
    howToUse: [
      "Set the Base Color with the colour swatch or by typing a value such as #667eea in the text field.",
      "Choose a scheme from the buttons: Complementary, Analogous, Triadic, Split-Complementary, or Tetradic.",
      "Click Generate Palette - the empty state explains that nothing appears until you do.",
      "Read the swatch row: each tile shows its colour with the hex code printed underneath.",
      "Click a tile or its hex label to copy that colour; the toast confirms that the value is on your clipboard.",
      "Change the base or the scheme and generate again to compare directions side by side.",
    ],
    examples: [
      {
        title: "Complementary pair from the default base",
        input: "Base: #667eea, Scheme: Complementary",
        output: "#667eea, #ead266",
      },
      {
        title: "Triadic trio (hue +120 and +240)",
        input: "Base: #667eea, Scheme: Triadic",
        output: "#667eea, #ea667f, #7fea66",
      },
      {
        title: "Analogous neighbours (hue -30 and +30)",
        input: "Base: #667eea, Scheme: Analogous",
        output: "#66c0ea, #667eea, #9066ea",
      },
      {
        title: "Tetradic rectangle (hue +90, +180, +270)",
        input: "Base: #667eea, Scheme: Tetradic",
        output: "#667eea, #ea66c0, #ead266, #66ea90",
      },
    ],
    useCases: [
      "Deriving button, link, and error colours that harmonise with a brand hex already in the design system.",
      "Building an analogous set for subtle card backgrounds, hovers, and section tints.",
      "Generating a triadic accent set for illustrations, charts, and marketing graphics.",
      "Exploring split-complementary accents, which keep strong contrast without the tension of a direct complement.",
    ],
    faqs: [
      {
        q: "Are these colours accessible as text on my background?",
        a: "Harmony is not contrast. Rotating hue preserves saturation and lightness, which keeps the palette visually consistent, but you still have to check foreground-to-background ratios against WCAG - use the contrast checker for each pair you plan to ship.",
      },
      {
        q: "Why is my base colour always in the output?",
        a: "Every scheme is anchored on your base: offsets are added to its hue, so the original hex appears unchanged at the head of the list - and in the middle for analogous, where it sits between its two neighbours.",
      },
      {
        q: "What hex formats are accepted?",
        a: "Three-digit shorthand such as #abc (expanded to #aabbcc) and full six-digit values, in either case. Anything else is rejected with an invalid hex colour error, so check the length if generation fails.",
      },
      {
        q: "How many colours does each scheme return?",
        a: "Two for complementary; three for analogous, triadic, and split-complementary; and four for tetradic. Every list includes your base colour itself alongside the rotated hues.",
      },
    ],
  },

  "css-gradient-generator": {
    whatIs:
      "A gradient becomes expressive once it has more than two stops: three or more colour points let you fade through an intermediate hue, hold a flat band in the middle, or wash several tones across a button or card header. Each stop is a colour plus a position in percent, and the browser interpolates linearly between neighbours - give two stops the same position and the transition hardens into an edge. This generator opens on a three-stop example running coral to teal to blue at 0, 50, and 100 percent, so composition rather than angle is the starting point, and the assembled background declaration is one click from your clipboard for pasting straight into a stylesheet.",
    whyUse: [
      "Starts with three colour stops, so the first thing you build is a composed transition rather than a plain two-tone ramp.",
      "Add Color Stop and the X buttons grow or trim the stop list while the preview re-renders on every change.",
      "Linear and Radial types plus a 0 to 360 degree angle slider cover buttons, cards, and banners.",
      "Each stop exposes a colour picker, an editable hex field, and a position slider with a percentage readout together.",
      "Copy CSS puts a complete background declaration on the clipboard, ready to paste anywhere.",
    ],
    howToUse: [
      "Look at the live preview strip at the top; it already renders the default three-stop gradient.",
      "Toggle Linear or Radial to choose the shape - Radial removes the angle control.",
      "Drag the Angle slider to rotate a linear gradient; the label tracks the current value, 45 by default.",
      "Edit each stop: the swatch or hex text sets the colour, and the slider sets its 0 to 100 percent position.",
      "Click Add Color Stop to insert another point, or the red X on a row to remove it (two rows are always kept).",
      "Press Copy CSS to copy the full background declaration and paste it wherever you need it.",
    ],
    examples: [
      {
        title: "Default three-stop composition",
        input: "Linear, Angle: 45, stops: #ff6b6b 0%, #4ecdc4 50%, #45b7d1 100%",
        output: "background: linear-gradient(45deg, #ff6b6b 0%, #4ecdc4 50%, #45b7d1 100%);",
      },
      {
        title: "Four-stop banner with a flat middle band",
        input: "Linear, Angle: 90, stops: #ff9a9e 0%, #fad0c4 35%, #fad0c4 65%, #a1c4fd 100%",
        output: "background: linear-gradient(90deg, #ff9a9e 0%, #fad0c4 35%, #fad0c4 65%, #a1c4fd 100%);",
      },
      {
        title: "Radial two-tone for a hero",
        input: "Radial, stops: #4ecdc4 0%, #45b7d1 100%",
        output: "background: radial-gradient(circle, #4ecdc4 0%, #45b7d1 100%);",
      },
    ],
    useCases: [
      "Multi-tone button backgrounds and badge fills that fade through a brand's mid colour.",
      "Card header washes that blend two accents across a horizontal band.",
      "Section dividers that hold one flat colour and transition only near the edges.",
      "Testing stop positions visually before committing percentages to a design token.",
    ],
    faqs: [
      {
        q: "How is this different from the Gradient Generator?",
        a: "Both emit ready-to-paste background declarations. This tool opens on a three-stop composition and is built around assembling multi-colour ramps quickly, while Gradient Generator starts from two stops and focuses on tuning the angle and switching between linear and radial for hero backdrops.",
      },
      {
        q: "How do I get a hard edge instead of a smooth blend?",
        a: "Place two stops at the same percentage, such as white at 50 and dark at 50. Interpolation has no distance to cover, so the colours meet at a crisp line and the preview updates immediately.",
      },
      {
        q: "Do stop positions have to increase?",
        a: "They should. If a stop's position is lower than the one before it, CSS clamps it up to the previous position, which silently turns your stop into a hard edge. Nudge the sliders left to right to keep the ramp predictable.",
      },
      {
        q: "Is the preview exactly what the browser will render?",
        a: "Yes - the preview element is styled with the very string displayed in the CSS Code panel, so what you see is literally the declaration you are about to copy. No vendor prefixes are needed either.",
      },
    ],
  },

  "http-status-codes": {
    whatIs:
      "An HTTP status code is the first thing a client reads after a request: three digits that name the kind of outcome. The digits follow a class scheme. 1xx are informational handshakes - 100 Continue tells the client to send the body. 2xx confirm success: 200 OK carries a body, 201 Created points at a new resource, 204 No Content succeeds with nothing to return. 3xx redirect elsewhere, and 304 Not Modified tells a cache its copy is still fresh. 4xx mean the request itself is at fault: the server understood it but cannot or will not process it, from 401 needing credentials to 429 Too Many Requests being rate limiting. 5xx mean the server broke while handling an otherwise valid request.",
    whyUse: [
      "Codes are grouped under their class headings - Informational, Success, Redirection, Client Error, Server Error - so you can read a whole category at once.",
      "Search matches code digits, status names, and category names as you type, narrowing the list live.",
      "Clicking a code tile copies just the number, handy for tests, mock responses, and bug reports.",
      "Every entry carries a one-sentence description explaining when the code applies, not merely its name.",
      "The list ships as static data with the page, so lookups still work with the network off.",
    ],
    howToUse: [
      "Type into the search box labelled 'Search by code, name, or category...' - try 429, gateway, or redirect.",
      "Results re-group automatically under their category headings, and categories with no matches disappear.",
      "Read the description beside each status name to confirm you have found the right code.",
      "Click the blue code tile to copy the number; a toast confirms the copy.",
      "Clear the box to restore the full reference, or read the empty state when nothing matches your query.",
    ],
    examples: [
      {
        title: "Search by code",
        input: "Search: 429",
        output: "Client Error - 429 Too Many Requests: the client has sent too many requests in a given time",
      },
      {
        title: "Search by category",
        input: "Search: redirect",
        output: "Redirection - 301 Moved Permanently, 302 Found, 304 Not Modified (3 rows)",
      },
      {
        title: "Search by name fragment",
        input: "Search: gateway",
        output: "502 Bad Gateway and 504 Gateway Timeout",
      },
      {
        title: "Copying a code",
        input: "Click the blue tile labelled 204",
        output: "Clipboard receives 204; a toast confirms 204 copied!",
      },
    ],
    useCases: [
      "Deciding whether an API failure is the client's fault (4xx) or the server's (5xx) while triaging an incident.",
      "Writing accurate error handling: retry on 429 and 503, refresh the token on 401, follow redirects on 301.",
      "Explaining to a teammate why 403 differs from 401 during an access problem investigation.",
      "Populating mock servers and test fixtures with realistic status codes and their meanings.",
    ],
    faqs: [
      {
        q: "What is the difference between 401 and 403?",
        a: "401 Unauthorized means you are not authenticated - sign in and retry, usually after a WWW-Authenticate challenge. 403 Forbidden means the server knows who you are and still refuses this action, so re-authenticating will not help.",
      },
      {
        q: "Why does my API return 429?",
        a: "429 Too Many Requests means you exceeded a rate limit. Back off and retry later, honouring the Retry-After header when the server sends one - continuing to hammer the endpoint typically extends the penalty.",
      },
      {
        q: "Does the search look inside the descriptions?",
        a: "No. Matching covers the code digits, the status name, and the category name only. Searching a term that appears solely in a description, such as cache, returns nothing - the tool will report that no codes matched.",
      },
      {
        q: "Is 204 the same as 200?",
        a: "Both are 2xx successes, but 204 No Content explicitly carries no response body, which suits delete or update actions that return nothing. A 200 may include a body, so clients must be written to handle one.",
      },
    ],
  },

  "ascii-table": {
    whatIs:
      "ASCII is a 7-bit character encoding, which fixes it at 128 code points numbered 0 to 127. Codes 0 to 31 are non-printable control characters inherited from teleprinters - NUL, BEL, TAB at 9, line feed at 10, carriage return at 13 - and 127 is DELETE, leaving 32 to 126 printable and starting with the space at 32. The layout is deliberately patterned: digits occupy 48 to 57, uppercase A to Z sits at 65 to 90 so uppercase A is 65, and lowercase a to z lands exactly 32 higher at 97 to 122, which is why adding 32 flips case. ASCII is a strict subset of Unicode, so every code point keeps its meaning when you move to UTF-8.",
    whyUse: [
      "All 128 rows with decimal code, character, name, and category: Control, Whitespace, Punctuation, Digit, Letter.",
      "Search accepts a literal character, a code number, or a word from the name or category.",
      "Click any row to copy that character - control codes copy their mnemonic, such as LF for code 10.",
      "Control codes show a dash in place of a glyph, making the boundary of printable text obvious.",
      "The table ships with the page - searching and copying never round-trips to a server.",
    ],
    howToUse: [
      "Scroll the table or filter it with the search box: try a character (A), a code (65), or a name fragment (uppercase).",
      "Watch the footer, which reports how many of the 128 characters are currently shown.",
      "Read the columns: Dec for the decimal code, Char for the printable glyph, then Name and Category.",
      "Click a row to copy - for code 65 the clipboard receives A and the toast reads Copied: UPPERCASE A (65).",
      "Click a control row such as code 10 and the clipboard receives its name (LF) instead, because control codes have no printable glyph.",
      "Clear the box to bring all 128 rows back; an empty result reports that no characters matched your search.",
    ],
    examples: [
      {
        title: "Search by decimal code",
        input: "Search: 65",
        output: "1 row: 65 | A | UPPERCASE A | Letter - clicking it copies A",
      },
      {
        title: "Search by category",
        input: "Search: digit",
        output: "10 rows: codes 48 to 57, named DIGIT 0 through DIGIT 9",
      },
      {
        title: "Copying a control character",
        input: "Click the row whose Dec is 10",
        output: "Clipboard receives LF; the toast reads Copied: LF (10)",
      },
      {
        title: "The case offset in one search",
        input: "Search: letter",
        output: "52 rows - uppercase 65 to 90 plus lowercase 97 to 122",
      },
    ],
    useCases: [
      "Looking up the decimal code or mnemonic of a control character you see in a hex dump or log line.",
      "Confirming a code before writing an escape sequence or a numeric entity in source code.",
      "Checking whether a symbol you pasted is ASCII (below 128) or requires UTF-8 handling downstream.",
      "Teaching the character-code layout - digits, letters, and the case offset - on one visible grid.",
    ],
    faqs: [
      {
        q: "Why do codes 0 to 31 show no character?",
        a: "They are control codes: they instruct a terminal or transport rather than print a glyph. The table shows a dash plus the standard mnemonic such as TAB, LF, CR, or ESC, and clicking the row still copies something useful - the name.",
      },
      {
        q: "Is ASCII the same as Unicode?",
        a: "ASCII is a subset of Unicode: its 128 characters occupy the same code points in both, so uppercase A is 65 either way. Anything above 127 - accents, currency symbols, emoji - belongs to Unicode or an extended set and will not appear in this table.",
      },
      {
        q: "How do I get the hexadecimal value?",
        a: "The table prints decimal, so convert when you need hex: uppercase A is 41 in hex, digit 0 is 30, and 127 is 7F. The number base converter will do the arithmetic for longer ranges.",
      },
      {
        q: "Why are there 128 characters and not 256?",
        a: "ASCII is a 7-bit code, and 2 to the power of 7 gives 128 positions. The 0 to 255 range people remember comes from extended ASCII and Latin-1 variants, which are separate encodings rather than part of this standard table.",
      },
    ],
  },
};
