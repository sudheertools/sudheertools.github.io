import type { Tool } from "../registry";

export type ToolContent = Pick<Tool, "whatIs" | "whyUse" | "howToUse" | "examples" | "useCases" | "faqs">;

export const batchC2Content: Record<string, ToolContent> = {
  "json-to-typescript": {
    whatIs:
      "TypeScript interfaces describe the shape of data: which keys exist, what type each holds, and whether a key may be missing. JSON carries no type information - every value is just text - so this tool infers it by walking your parsed object: strings become string, numbers become number, booleans become boolean, arrays become T[], and each nested object becomes its own interface named after the key with a capital letter. Null or undefined samples are marked optional with ?, and an empty array becomes any[] while an empty object becomes an empty child interface, so the generated code always compiles.",
    whyUse: [
      "Paste JSON, name the root interface, and get compiling TypeScript instead of transcribing dozens of fields by hand.",
      "Nested objects and arrays of objects each become a separate named interface, so deep payloads stay readable rather than collapsing into one anonymous type.",
      "Null-valued fields are flagged with ?, telling you exactly where the real API may omit data - widen those into unions such as string | null once you know every shape.",
      "Types stay precise: number for numeric values, boolean for true and false, string[] for string arrays, and any[] where a sample array is empty.",
      "Conversion uses JSON.parse inside the page, so response captures containing customer records are never uploaded.",
    ],
    howToUse: [
      "Set the Root Interface Name field above the editor - it defaults to Root - to name the top-level interface, for example User.",
      "Paste your document into the JSON Input box; the input must be an object, because arrays and primitives are rejected.",
      "Click Convert. Bad syntax reports Invalid JSON. Please check your input, and an array root reports JSON must be an object (not an array or primitive).",
      "Read the result under TypeScript Output: the root interface prints first, then child interfaces in the order they were discovered.",
      "Click Copy to grab the code (a Copied to clipboard! toast confirms), or Clear to empty the input, output, and error together.",
    ],
    examples: [
      {
        title: "Flat object becomes one named interface",
        input: '{"name": "Ada Lovelace", "age": 36, "active": true, "tags": ["math", "code"]}',
        output:
          "interface User {\n  name: string;\n  age: number;\n  active: boolean;\n  tags: string[];\n}",
      },
      {
        title: "Nested object plus a null field",
        input: '{"id": 42, "address": {"city": "London", "zip": null}}',
        output:
          "interface User {\n  id: number;\n  address: Address;\n}\n\ninterface Address {\n  city: string;\n  zip?: null;\n}",
      },
      {
        title: "Array of objects and an empty container",
        input: '{"orders": [{"sku": "A1", "qty": 2}], "items": []}',
        output:
          "interface Root {\n  orders: Orders[];\n  items: any[];\n}\n\ninterface Orders {\n  sku: string;\n  qty: number;\n}",
      },
    ],
    useCases: [
      "Typing fetch() responses in a Next.js or React app from a payload you captured in the Network tab.",
      "Generating prop and state interfaces for a component library directly from JSON fixtures in your test suite.",
      "Documenting webhook bodies so handlers can destructure fields with autocomplete instead of guessing keys.",
      "Bootstrapping types for a new API client before refining names, optionality, and unions by hand.",
    ],
    faqs: [
      {
        q: "Why is a null field typed as null instead of string | null?",
        a: "The sample only proves that one response had null there, so the generator emits the safe optional form zip?: null, which compiles and still signals missing data. Once you know the field also carries text, edit it to string | null or string | undefined - the tool starts from evidence rather than guessing your domain.",
      },
      {
        q: "Can I pass a top-level array or a bare string?",
        a: "No. The converter requires an object at the root and prints JSON must be an object (not an array or primitive) otherwise. Wrap the array as {\"items\": [...]}, convert it, then rename Root to Items and drop the wrapper field if you only needed the element shape.",
      },
      {
        q: "Why did an empty array become any[]?",
        a: "With zero elements there is nothing to infer, so the tool emits any[] and you replace it with a concrete element type such as string[] once you know what the array holds. The same applies to an empty object, which is emitted as its own empty interface for you to fill in.",
      },
      {
        q: "Does my JSON leave the browser?",
        a: "No. Parsing and code generation happen in the page with JSON.parse, so credentials or customer rows embedded in the sample stay on your machine.",
      },
    ],
  },

  "json-to-go": {
    whatIs:
      "Go describes data with structs: named fields, one fixed type each, and methods that operate on them. Because Go is statically typed and JSON is not, this tool infers a struct from your sample document. Field names are capitalized, since Go only exposes exported fields to encoding/json, and every field gets a backtick json tag carrying the original key so casing like userId survives unmarshaling. Numbers are mapped by magnitude (int8, int16, int32, int64, or float64 for decimals), null and unknown values become interface{}, and arrays become slices such as []string. Nested objects generate their own struct.",
    whyUse: [
      "Exported field names and json tags are written for you, so encoding/json unmarshals the payload without extra struct tags to maintain.",
      "Numeric width is inferred from the sample: 30 becomes int8, 104592 becomes int32, huge values become int64, and decimals become float64.",
      "Nested objects and arrays of objects emit companion structs (Address, Order) instead of anonymous map[string]interface{} soup.",
      "The output begins with package main, so a fresh file already builds with go build and needs no import lines added.",
      "The document is parsed inside your tab, so API bodies with internal identifiers are not sent to a service.",
    ],
    howToUse: [
      "Type a name into the Root Struct Name field (Root is the default) - it becomes the top-level type, for example User.",
      "Paste JSON into the JSON Input box. It must be an object; arrays and primitives are refused with an error under the box.",
      "Click Convert to produce the Go Output block, which starts with package main followed by your structs.",
      "Check that nested types were emitted as separate structs after the root, separated by a blank line.",
      "Click Copy to take the code to your clipboard, or Clear to reset the input, output, and error state.",
    ],
    examples: [
      {
        title: "Scalar types and json tags",
        input: '{"userId": 104592, "name": "Ada Lovelace", "rating": 4.5, "verified": true, "tags": ["math", "code"]}',
        output:
          'package main\n\ntype User struct {\n  UserId int32 `json:"userId"`\n  Name string `json:"name"`\n  Rating float64 `json:"rating"`\n  Verified bool `json:"verified"`\n  Tags []string `json:"tags"`\n}',
      },
      {
        title: "Nested object becomes a second struct",
        input: '{"profile": {"city": "London", "visits": 12}}',
        output:
          'package main\n\ntype User struct {\n  Profile Profile `json:"profile"`\n}\n\ntype Profile struct {\n  City string `json:"city"`\n  Visits int8 `json:"visits"`\n}',
      },
      {
        title: "Empty array and null fall back to interface{}",
        input: '{"tags": [], "meta": null}',
        output:
          'package main\n\ntype Root struct {\n  Tags []interface{} `json:"tags"`\n  Meta interface{} `json:"meta"`\n}',
      },
    ],
    useCases: [
      "Defining request and response DTOs for a Go microservice that decodes JSON with encoding/json.",
      "Generating structs for a CLI tool that reads a config file or an external API without hand-writing tags.",
      "Reviewing how a third-party payload maps onto Go types before committing to a client library.",
      "Teaching the rules of exported identifiers and struct tags with a real, compilable example.",
    ],
    faqs: [
      {
        q: "Why are my field names capitalized?",
        a: "encoding/json only marshals exported (capitalized) fields, so the generator uppercases the first letter of every key. The json tag keeps the wire name exact, so a UserId field still decodes from a userId key in the payload.",
      },
      {
        q: "Why did a counter become int8?",
        a: "The tool picks the smallest signed integer type that can hold the value in your sample - 12 fits int8, 104592 needs int32, and larger values need int64. If the number will grow later, widen the field to int or int64 before shipping the struct.",
      },
      {
        q: "What does interface{} mean here?",
        a: "It is the empty interface, the Go way of saying any type, and the generator uses it for null values and for arrays whose sample is empty. Replace it with a concrete type (string, a struct, or a typed slice) as soon as you know the real shape.",
      },
      {
        q: "Do I need to add anything before compiling?",
        a: "The package main line and the structs are all you get, so paste the output into a .go file and run go build. Add imports only if your code then calls other packages; plain struct definitions with encoding/json need the standard library import you already use.",
      },
    ],
  },

  "json-to-rust": {
    whatIs:
      "Rust reads JSON through serde: a struct that derives Serialize and Deserialize can be turned into JSON and parsed back with one call. This tool writes that boilerplate - the use serde import, a #[derive(Debug, Serialize, Deserialize)] line, and a pub struct typed from your sample: i64 for whole numbers, f64 for decimals, String, bool, Vec<T> for arrays, and Option<serde_json::Value> when the sample shows null. Field names are lowercased to stay valid Rust identifiers, and each field carries a #[serde(rename = \"key\")] attribute so the original JSON key such as userId still matches. Nested objects become separate structs.",
    whyUse: [
      "Output is ready to paste: the serde use statement and derive macros are included, not left for you to remember.",
      "CamelCase and snake_case payloads map correctly because every field is paired with #[serde(rename)], preserving the wire key.",
      "Type choices are idiomatic Rust - i64 for integers, f64 for floats, String for text, Vec<T> for lists, Option for null.",
      "Nested objects and arrays of objects spawn their own structs (Address, Order) so deserialization stays strongly typed.",
      "No request is made with your payload; the structs are generated by string logic running in the browser.",
    ],
    howToUse: [
      "Enter a name in the Root Struct Name field (Root by default) for the top-level type, for example User.",
      "Paste your JSON into the JSON Input box; it must be an object, otherwise an inline error appears.",
      "Click Convert to render the Rust Output: it opens with use serde::{Serialize, Deserialize}; and then your structs.",
      "Inspect each field's #[serde(rename = \"...\")] line to confirm the JSON key survives the lowercase field name.",
      "Click Copy to copy the code, or Clear to wipe the input, output, and any error message.",
    ],
    examples: [
      {
        title: "Serde struct with core scalar types",
        input: '{"user_id": 104592, "name": "Ada", "balance": 1250.75, "active": true, "roles": ["admin"], "address": {"city": "London"}}',
        output:
          'use serde::{Serialize, Deserialize};\n\n#[derive(Debug, Serialize, Deserialize)]\npub struct User {\n    #[serde(rename = "user_id")]\n    pub user_id: i64,\n    #[serde(rename = "name")]\n    pub name: String,\n    #[serde(rename = "balance")]\n    pub balance: f64,\n    #[serde(rename = "active")]\n    pub active: bool,\n    #[serde(rename = "roles")]\n    pub roles: Vec<String>,\n    #[serde(rename = "address")]\n    pub address: Address,\n}\n\n#[derive(Debug, Serialize, Deserialize)]\npub struct Address {\n    #[serde(rename = "city")]\n    pub city: String,\n}',
      },
      {
        title: "CamelCase key with a lowercased field name",
        input: '{"userId": 7}',
        output:
          'use serde::{Serialize, Deserialize};\n\n#[derive(Debug, Serialize, Deserialize)]\npub struct User {\n    #[serde(rename = "userId")]\n    pub userid: i64,\n}',
      },
      {
        title: "Null and empty list samples",
        input: '{"nickname": null, "tags": []}',
        output:
          'use serde::{Serialize, Deserialize};\n\n#[derive(Debug, Serialize, Deserialize)]\npub struct User {\n    #[serde(rename = "nickname")]\n    pub nickname: Option<serde_json::Value>,\n    #[serde(rename = "tags")]\n    pub tags: Vec<serde_json::Value>,\n}',
      },
    ],
    useCases: [
      "Creating request and response types for an axum or actix-web service that calls serde_json::from_str.",
      "Deserializing third-party API payloads in a Rust CLI without hand-writing rename attributes.",
      "Prototyping a data model from a captured sample before refining lifetimes and enums by hand.",
      "Learning what serde requires - derives, renames, and owned String fields - from working output.",
    ],
    faqs: [
      {
        q: "Why is my field named userid instead of user_id?",
        a: "The generator lowercases the key to produce a legal Rust identifier, so userId becomes userid and user_id stays user_id. The adjacent #[serde(rename = \"userId\")] attribute is what actually reads and writes the JSON key, so deserialization is correct either way; rename the field and the attribute together if you prefer different Rust style.",
      },
      {
        q: "Will this compile in my project?",
        a: "It compiles once serde has the derive feature enabled: add serde = { version = \"1\", features = [\"derive\"] } to Cargo.toml, and serde_json = \"1\" if you keep the serde_json::Value types. Then paste the file into src/ and run cargo check.",
      },
      {
        q: "Why does a null field become Option<serde_json::Value>?",
        a: "null has no concrete type, so the tool cannot choose String or i64; Option makes the field deserializable and serde_json::Value stands in for any JSON value. Swap it for Option<String> or Option<i64> once you know what the server actually sends.",
      },
      {
        q: "Is my JSON uploaded for conversion?",
        a: "No - parsing and struct generation run in the page, and the tab transmits nothing while you work. The only network traffic involved is loading the tool page itself.",
      },
    ],
  },

  "json-to-dart": {
    whatIs:
      "In Flutter and pure Dart, JSON is read through classes rather than interfaces: you declare final fields, a constructor that requires them, a factory fromJson(Map<String, dynamic>) that reads each key, and a toJson() that writes them back. This tool generates that complete round trip for every object in your sample. Scalars map to String, int, double, and bool; integers stay int while decimals become double; arrays become List<T>; and a null sample becomes dynamic, which accepts anything. Nested objects get their own class - named by capitalizing the key, such as Address - whose fromJson is called from the parent.",
    whyUse: [
      "Both directions are generated: fromJson parses responses and toJson rebuilds maps for requests, so you never write half a model.",
      "Nested classes delegate correctly - address: Address.fromJson(json['address']) - instead of forcing you to chain manual mapping code.",
      "Collections keep their element type through List<String> and List<Order>, giving you autocomplete inside map loops.",
      "Constructor parameters are emitted as required named arguments, which reads well at call sites and catches missing fields at compile time.",
      "Works offline on the pasted sample: no Dart SDK, no build_runner, and no server sees your JSON.",
    ],
    howToUse: [
      "Set the Root Class Name field (it defaults to Root) - this names the top-level class, for example User.",
      "Paste your JSON into the JSON Input box. Arrays and primitives at the root are rejected with an error.",
      "Click Convert to print the Dart Output block containing the class, constructor, fromJson, and toJson.",
      "Scroll the output to confirm nested classes were appended after the parent, separated by a blank line.",
      "Click Copy to copy the code to your clipboard, or Clear to empty the input, output, and error.",
    ],
    examples: [
      {
        title: "Full class with fromJson and toJson",
        input: '{"name": "Ada", "age": 36, "score": 9.5, "active": true, "tags": ["math"], "address": {"city": "London"}}',
        output:
          "class User {\n  final String name;\n  final int age;\n  final double score;\n  final bool active;\n  final List<String> tags;\n  final Address address;\n\n  User({\n    required this.name,\n    required this.age,\n    required this.score,\n    required this.active,\n    required this.tags,\n    required this.address,\n  });\n\n  factory User.fromJson(Map<String, dynamic> json) => User(\n    name: json['name'],\n    age: json['age'],\n    score: json['score'],\n    active: json['active'],\n    tags: json['tags'],\n    address: Address.fromJson(json['address']),\n  );\n\n  Map<String, dynamic> toJson() => {\n    'name': name,\n    'age': age,\n    'score': score,\n    'active': active,\n    'tags': tags,\n    'address': address,\n  };\n}\n\nclass Address {\n  final String city;\n\n  Address({\n    required this.city,\n  });\n\n  factory Address.fromJson(Map<String, dynamic> json) => Address(\n    city: json['city'],\n  );\n\n  Map<String, dynamic> toJson() => {\n    'city': city,\n  };\n}",
      },
      {
        title: "Null sample becomes dynamic",
        input: '{"nickname": null}',
        output:
          "class User {\n  final dynamic nickname;\n\n  User({\n    required this.nickname,\n  });\n\n  factory User.fromJson(Map<String, dynamic> json) => User(\n    nickname: json['nickname'],\n  );\n\n  Map<String, dynamic> toJson() => {\n    'nickname': nickname,\n  };\n}",
      },
      {
        title: "Array of objects is mapped element by element",
        input: '{"orders": [{"sku": "A1", "qty": 2}]}',
        output:
          "class User {\n  final List<Orders> orders;\n\n  User({\n    required this.orders,\n  });\n\n  factory User.fromJson(Map<String, dynamic> json) => User(\n    orders: (json['orders'] as List).map((e) => Orders.fromJson(e)).toList(),\n  );\n\n  Map<String, dynamic> toJson() => {\n    'orders': orders,\n  };\n}\n\nclass Orders {\n  final String sku;\n  final int qty;\n\n  Orders({\n    required this.sku,\n    required this.qty,\n  });\n\n  factory Orders.fromJson(Map<String, dynamic> json) => Orders(\n    sku: json['sku'],\n    qty: json['qty'],\n  );\n\n  Map<String, dynamic> toJson() => {\n    'sku': sku,\n    'qty': qty,\n  };\n}",
      },
    ],
    useCases: [
      "Creating model classes for a Flutter app that consumes a REST API, ready for json_serializable-style patterns.",
      "Parsing webhook or IoT payloads in a Dart backend without installing the build_runner toolchain first.",
      "Verifying that a response really contains int vs double fields before you write validation logic.",
      "Generating a starting set of classes for a package you intend to publish, then renaming fields to Dart conventions.",
    ],
    faqs: [
      {
        q: "Why is every constructor parameter required?",
        a: "The generator assumes the sample JSON is the complete object, so it emits required this.field for each key. If the server may omit a value, change the type to a nullable one (String?, int?) and drop that required keyword, or supply a default in the constructor body.",
      },
      {
        q: "Why did a null value become dynamic?",
        a: "null carries no type information, so the tool cannot pick String or int and falls back to dynamic, which accepts anything and disables static checks. Replace it with String?, int?, or a proper model type as soon as you know what the field can hold.",
      },
      {
        q: "How are lists of objects handled?",
        a: "An array whose first element is an object produces a List<Orders> field and a fromJson that casts and maps every element: (json['orders'] as List).map((e) => Orders.fromJson(e)).toList(). Scalars instead come straight across, so List<String> just assigns json['tags'].",
      },
      {
        q: "Do I need json_serializable or freezed for this to work?",
        a: "No. The output is plain Dart with no annotations and no code generation step, so it runs immediately. You can later migrate the same shape to json_serializable or freezed if you want immutability helpers and copyWith methods.",
      },
    ],
  },

  "dockerfile-generator": {
    whatIs:
      "A Dockerfile is a short list of instructions that builds a container image: FROM picks the base, WORKDIR sets the working directory, COPY brings files in, RUN executes build steps, EXPOSE documents the port, and CMD starts the process. This tool writes that file for the runtime you choose. Node.js gets npm ci and a build step, Python gets pip install from requirements.txt, while Go and Rust get a two-stage recipe in which a compiler image produces the binary and a slim final image copies only the artifact. Options also control multi-stage output and whether a non-root user is created before RUN steps.",
    whyUse: [
      "Seven runtimes on one screen - Node.js, Python, Go, Rust, Java, Nginx, and Custom - each with the idiomatic base image and build commands.",
      "Multi-stage toggle keeps compiled languages small by shipping alpine or slim images instead of a full toolchain.",
      "Non-root option injects addgroup/adduser and USER lines so containers do not run as root by default.",
      "Commands use the exec form (CMD [\"npm\", \"start\"]), which avoids shell overhead and handles signals correctly.",
      "Templates are assembled in memory and rendered in the page - nothing about your stack is transmitted.",
    ],
    howToUse: [
      "Pick a runtime from the button grid: Node.js, Python, Go, Rust, Java, Nginx, or Custom.",
      "Leave Multi-stage build checked to keep the second FROM stage for compiled languages; uncheck it to emit a single stage.",
      "Leave Run as root unchecked to insert RUN addgroup -S appgroup && adduser -S appuser -G appgroup and USER appuser before each RUN step; check it to skip those lines.",
      "Click Generate to print the file under the Dockerfile label, starting with a # Dockerfile for <runtime> comment.",
      "Click Copy to take the whole file to your clipboard and paste it at the root of your project next to your source.",
    ],
    examples: [
      {
        title: "Node.js production image (Run as root checked)",
        input: "Runtime: Node.js, Multi-stage build: on, Run as root: on",
        output:
          '# Dockerfile for Node.js\nFROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nRUN npm run build\nEXPOSE 3000\nCMD ["npm", "start"]',
      },
      {
        title: "Python image with a non-root user (default options)",
        input: "Runtime: Python, Multi-stage build: on, Run as root: off",
        output:
          '# Dockerfile for Python\nFROM python:3.12-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN addgroup -S appgroup && adduser -S appuser -G appgroup\nUSER appuser\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nEXPOSE 8000\nCMD ["python", "app.py"]',
      },
      {
        title: "Go two-stage build for a small final image",
        input: "Runtime: Go, Multi-stage build: on, Run as root: on",
        output:
          '# Dockerfile for Go\nFROM golang:1.22-alpine AS builder\nWORKDIR /app\nCOPY go.mod go.sum ./\nRUN go mod download\nCOPY . .\nRUN CGO_ENABLED=0 GOOS=linux go build -o main .\n\nFROM alpine:latest\nRUN apk --no-cache add ca-certificates\nWORKDIR /root/\nCOPY --from=builder /app/main .\nCMD ["./main"]',
      },
    ],
    useCases: [
      "Scaffolding a first Dockerfile for a side project so CI can build and push an image immediately.",
      "Converting a bulky development image into a multi-stage production image with only the runtime left.",
      "Adding non-root user lines to satisfy container security scanning in Kubernetes and CI policies.",
      "Comparing how the same app is packaged across languages when learning Docker conventions.",
    ],
    faqs: [
      {
        q: "Why do the addgroup and USER lines repeat?",
        a: "With Run as root switched off, the generator emits that block ahead of every RUN instruction it encounters, so a template with two RUN steps gets two blocks. Keep the first block, then move a single USER appuser line to just before CMD so the final command also runs unprivileged.",
      },
      {
        q: "Does the Multi-stage build toggle change my Node.js output?",
        a: "No. The Node.js, Python, and Nginx templates already have a single FROM line, and the toggle only removes FROM lines from the generated steps, so those runtimes look the same either way. Go, Rust, and Java are the ones that gain or lose their second stage.",
      },
      {
        q: "What is the difference between CMD and ENTRYPOINT?",
        a: "CMD gives the default command, which docker run arguments override, while ENTRYPOINT pins the executable so extra arguments are passed to it. The templates use CMD for most runtimes and ENTRYPOINT for Java, where the container should always start with java -jar.",
      },
      {
        q: "Is the generated Dockerfile production ready?",
        a: "It is a correct, opinionated starting point: valid syntax, sensible base images, and best-practice ordering. Before shipping, pin exact image digests, drop build-only dependencies from the final stage, and confirm the port and start command match your app.",
      },
    ],
  },

  "terraform-generator": {
    whatIs:
      "Terraform declares infrastructure as code in HCL: a resource block names a type such as aws_instance, a local label, and the arguments that describe the resource. This generator offers twelve ready templates - four resource kinds across three providers. AWS covers EC2 Instance, S3 Bucket, RDS Database, and VPC; GCP offers Compute Engine, Cloud Storage, Cloud SQL, and VPC Network; Azure maps the same four slots to Virtual Machine, Blob Storage, Azure SQL, and Virtual Network. Each template is valid HCL with sensible defaults, tags, and cross-resource references such as aws_vpc.example.id, headed by a comment naming the provider and resource you picked.",
    whyUse: [
      "Twelve templates spanning AWS, GCP, and Azure so you can see the equivalent resource side by side.",
      "References are already wired - the public subnet points at aws_vpc.example.id - instead of isolated blocks that do not link up.",
      "Secrets stay out of the file: database templates read var.db_password and var.sql_password rather than hard-coding credentials.",
      "Switching provider resets the resource buttons to a valid choice, so you can never generate an AWS template with a GCP label.",
      "Configuration is produced in the page; your account names and internal CIDRs are not sent anywhere.",
    ],
    howToUse: [
      "Click a Provider button: AWS, GCP, or Azure. Changing provider automatically resets the resource selection to that provider's first option.",
      "Click a Resource Type button - AWS lists EC2 Instance, S3 Bucket, RDS Database, and VPC, while GCP and Azure relabel the same four choices.",
      "Click Generate to print the configuration under the Terraform Configuration heading, preceded by a comment such as # Terraform configuration for AWS EC2 Instance.",
      "Read through the HCL for the arguments you need to change - AMI, bucket name, engine version, or CIDR blocks are region specific.",
      "Click Copy to copy the block, paste it into main.tf, then run terraform init and terraform plan to review the change.",
    ],
    examples: [
      {
        title: "AWS EC2 instance",
        input: "Provider: AWS, Resource Type: EC2 Instance",
        output:
          '# Terraform configuration for AWS EC2 Instance\n\nresource "aws_instance" "example" {\n  ami           = "ami-0c55b159cbfafe1f0"\n  instance_type = "t3.micro"\n\n  tags = {\n    Name = "example-instance"\n  }\n}',
      },
      {
        title: "AWS VPC with a linked public subnet",
        input: "Provider: AWS, Resource Type: VPC",
        output:
          '# Terraform configuration for AWS VPC\n\nresource "aws_vpc" "example" {\n  cidr_block = "10.0.0.0/16"\n\n  tags = {\n    Name = "example-vpc"\n  }\n}\n\nresource "aws_subnet" "public" {\n  vpc_id     = aws_vpc.example.id\n  cidr_block = "10.0.1.0/24"\n\n  tags = {\n    Name = "public-subnet"\n  }\n}',
      },
      {
        title: "GCP bucket with versioning enabled",
        input: "Provider: GCP, Resource Type: Cloud Storage",
        output:
          '# Terraform configuration for GCP Cloud Storage\n\nresource "google_storage_bucket" "example" {\n  name          = "my-example-bucket"\n  location      = "US"\n  force_destroy = true\n\n  versioning {\n    enabled = true\n  }\n}',
      },
    ],
    useCases: [
      "Bootstrapping an infrastructure-as-code repository for a new environment instead of clicking through a cloud console.",
      "Learning HCL syntax and the argument names of a provider you have not used before.",
      "Comparing how the same concept - a VM, a bucket, a database, a network - is expressed on AWS, GCP, and Azure.",
      "Producing a reviewable starting file for a pull request where infrastructure changes must be diffed.",
    ],
    faqs: [
      {
        q: "Do I still need a provider block?",
        a: "Yes. The templates contain resource blocks only, so add a terraform block with required_providers naming aws, google, or azurerm, plus any backend configuration, before running terraform init. Init downloads the provider and locks its version in .terraform.lock.hcl.",
      },
      {
        q: "Why do the database templates use var.db_password?",
        a: "So secrets never land in version control. Declare a variable block with sensitive = true and supply the value through an environment variable (TF_VAR_db_password) or a secrets manager at plan time.",
      },
      {
        q: "Can I use these AMI and machine-type values as they are?",
        a: "Treat them as placeholders. AMI IDs, zones, and machine types differ per region and account, so verify them with a data source such as data \"aws_ami\" or your provider's equivalent before applying.",
      },
      {
        q: "Does the generator run Terraform or create files?",
        a: "It only renders text into the page for you to copy. Nothing is executed, no state file is touched, and no cloud API is called.",
      },
    ],
  },

  "helm-chart-generator": {
    whatIs:
      "Helm packages a Kubernetes application as a chart: YAML manifests stored in templates/ that contain Go template expressions, plus a values.yaml of defaults. When you run helm install or helm upgrade, every {{ ... }} expression is rendered - {{ .Release.Name }} becomes the release name you chose, and {{ .Values.image.repository | default \"nginx\" }} reads a configured value or falls back to a default - and the resulting plain YAML is applied to the cluster. This tool generates those templates for the four resources you need most: a Deployment that runs your containers, a Service that load-balances them, a ConfigMap for environment configuration, and an Ingress for external traffic.",
    whyUse: [
      "Four Kubernetes kinds on tap - Deployment, Service, ConfigMap, and Ingress - with correct apiVersion and kind headers.",
      "Labels and selectors stay consistent (app: {{ .Release.Name }}), which is the most common thing charts get wrong.",
      "Every value is wrapped in | default, so a chart still installs with an empty values.yaml.",
      "The Show values.yaml toggle reveals the matching defaults file, so you can see which keys the template expects.",
      "Templates are rendered in the tab; your image names and internal hostnames stay on your machine.",
    ],
    howToUse: [
      "Choose the Resource Type: Deployment, Service, ConfigMap, or Ingress. Switching type clears any template you already generated.",
      "Click Generate to render the YAML into the Template block below the buttons.",
      "Click Show values.yaml to expand the default values file (the label then becomes Hide values.yaml) and check replicaCount, image, service, resources, config, and ingress keys.",
      "Click Copy to copy the template and save it in your chart as templates/deployment.yaml (or the matching name).",
      "Copy values.yaml the same way and save it as values.yaml at the chart root, then override keys with --set or -f for each environment.",
    ],
    examples: [
      {
        title: "Deployment template",
        input: "Resource Type: Deployment",
        output:
          'apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: {{ .Release.Name }}-app\n  labels:\n    app: {{ .Release.Name }}\nspec:\n  replicas: {{ .Values.replicaCount | default 1 }}\n  selector:\n    matchLabels:\n      app: {{ .Release.Name }}\n  template:\n    metadata:\n      labels:\n        app: {{ .Release.Name }}\n    spec:\n      containers:\n        - name: {{ .Release.Name }}\n          image: "{{ .Values.image.repository }}:{{ .Values.image.tag | default "latest" }}"\n          ports:\n            - containerPort: {{ .Values.service.targetPort | default 80 }}\n          resources:\n            limits:\n              cpu: {{ .Values.resources.limits.cpu | default "500m" }}\n              memory: {{ .Values.resources.limits.memory | default "128Mi" }}\n            requests:\n              cpu: {{ .Values.resources.requests.cpu | default "100m" }}\n              memory: {{ .Values.resources.requests.memory | default "64Mi" }}',
      },
      {
        title: "Service template",
        input: "Resource Type: Service",
        output:
          'apiVersion: v1\nkind: Service\nmetadata:\n  name: {{ .Release.Name }}-svc\n  labels:\n    app: {{ .Release.Name }}\nspec:\n  type: {{ .Values.service.type | default "ClusterIP" }}\n  ports:\n    - port: {{ .Values.service.port | default 80 }}\n      targetPort: {{ .Values.service.targetPort | default 80 }}\n      protocol: TCP\n  selector:\n    app: {{ .Release.Name }}',
      },
      {
        title: "Ingress template routing to the Service",
        input: "Resource Type: Ingress",
        output:
          'apiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: {{ .Release.Name }}-ingress\n  labels:\n    app: {{ .Release.Name }}\n  annotations:\n    nginx.ingress.kubernetes.io/rewrite-target: /\nspec:\n  rules:\n    - host: {{ .Values.ingress.host | default "example.com" }}\n      http:\n        paths:\n          - path: {{ .Values.ingress.path | default "/" }}\n            pathType: Prefix\n            backend:\n              service:\n                name: {{ .Release.Name }}-svc\n                port:\n                  number: {{ .Values.service.port | default 80 }}',
      },
    ],
    useCases: [
      "Writing the manifests for a new chart without memorizing every label and selector convention.",
      "Adding an Ingress or ConfigMap to an existing chart when your application outgrows a plain Service.",
      "Teaching how {{ .Release.Name }} and {{ .Values.* }} placeholders turn into concrete YAML at install time.",
      "Generating per-environment overrides by keeping one template and varying values.yaml between installs.",
    ],
    faqs: [
      {
        q: "Which resources does a basic web chart need?",
        a: "A Deployment and a Service are the minimum: the Deployment runs the pods and the Service gives them a stable address. Add an Ingress when traffic must arrive from outside the cluster, and a ConfigMap when the app reads environment configuration.",
      },
      {
        q: "Where do the values come from?",
        a: "Each expression pipes through | default, for example {{ .Values.replicaCount | default 1 }}, so a missing key in values.yaml falls back to that default instead of rendering an empty string. Override any of them with --set replicaCount=3 or a custom values file per environment.",
      },
      {
        q: "Why is everything prefixed with {{ .Release.Name }}?",
        a: "Names must be unique inside a cluster, and one chart can be installed many times (staging, production, per-tenant). Building names from the release name lets every object - Deployment, Service, ConfigMap, Ingress - stay consistent and collision free.",
      },
      {
        q: "Does this create the whole chart scaffold?",
        a: "It produces the templates you select plus a values.yaml you can reveal with the toggle, not the Chart.yaml manifest. Create Chart.yaml yourself with apiVersion: v2, your chart name, and a semantic version, then drop the generated files into templates/ and the chart root.",
      },
    ],
  },

  "subnet-calculator": {
    whatIs:
      "CIDR notation splits an IPv4 address into a network part and a host part: the number after the slash (for example /24) says how many leading bits identify the network, and the remaining bits address hosts. A /24 leaves 8 host bits, so 2^8 = 256 total addresses; the first is reserved as the network address and the last as the broadcast address, which leaves 254 usable for devices. This calculator takes any address plus a prefix from 0 to 32 and derives the network address, broadcast address, subnet mask, wildcard mask, usable range, host counts, IP class, private/public status, and binary forms of address and mask.",
    whyUse: [
      "Nine result tiles in one view: network, broadcast, mask, wildcard, first and last usable, total and usable hosts, and IP class.",
      "Each tile carries its own Copy link, so you can lift just the broadcast address or mask into a ticket or config.",
      "Validation is specific - Invalid IP address format., IP octets must be 0-255., or CIDR must be between 0 and 32. - instead of a silent failure.",
      "Binary IP and binary mask rows make the arithmetic visible, which is exactly how subnetting is taught in CCNA-style courses.",
      "Private-range detection (10/8, 172.16/12, 192.168/16) plus class reporting tells you instantly whether an address is internal.",
    ],
    howToUse: [
      "Enter any IPv4 address in the IP Address field - it does not have to be the network address, so 192.168.1.100 works for a /24.",
      "Set the prefix length in the CIDR field beside it; it defaults to 24 and accepts 0 through 32.",
      "Click Calculate. Malformed input is reported inline beneath the fields before any math runs.",
      "Read the nine tiles: Network Address, Broadcast Address, Subnet Mask, Wildcard Mask, First Usable, Last Usable, Total Hosts, Usable Hosts, and IP Class - each with a Copy link.",
      "Scroll to the Private IP Yes/No row and the dotted-binary Binary IP and Binary Mask rows for the underlying bit pattern.",
    ],
    examples: [
      {
        title: "Class C /24 office LAN",
        input: "IP Address: 192.168.1.0, CIDR: 24",
        output:
          "Network Address: 192.168.1.0\nBroadcast Address: 192.168.1.255\nSubnet Mask: 255.255.255.0\nWildcard Mask: 0.0.0.255\nFirst Usable: 192.168.1.1\nLast Usable: 192.168.1.254\nTotal Hosts: 256\nUsable Hosts: 254\nIP Class: C\nPrivate IP: Yes\nBinary IP: 11000000.10101000.00000001.00000000\nBinary Mask: 11111111.11111111.11111111.00000000",
      },
      {
        title: "Splitting a /24 into /26 segments",
        input: "IP Address: 192.168.1.100, CIDR: 26",
        output:
          "Network Address: 192.168.1.64\nBroadcast Address: 192.168.1.127\nSubnet Mask: 255.255.255.192\nWildcard Mask: 0.0.0.63\nFirst Usable: 192.168.1.65\nLast Usable: 192.168.1.126\nTotal Hosts: 64\nUsable Hosts: 62\nIP Class: C\nPrivate IP: Yes\nBinary Mask: 11111111.11111111.11111111.11000000",
      },
      {
        title: "Point-to-point /30 link",
        input: "IP Address: 10.0.0.1, CIDR: 30",
        output:
          "Network Address: 10.0.0.0\nBroadcast Address: 10.0.0.3\nSubnet Mask: 255.255.255.252\nWildcard Mask: 0.0.0.3\nFirst Usable: 10.0.0.1\nLast Usable: 10.0.0.2\nTotal Hosts: 4\nUsable Hosts: 2\nIP Class: A\nPrivate IP: Yes",
      },
    ],
    useCases: [
      "Planning subnets for a VPC or office LAN and confirming how many devices each segment can hold.",
      "Deriving the wildcard mask required by Cisco-style access-control lists, which are written as address plus inverse mask.",
      "Checking whether a proposed range overlaps an existing one before you commit CIDRs to Terraform.",
      "Practicing binary subnetting for certification exams with the Binary IP and Binary Mask rows as a self-check.",
    ],
    faqs: [
      {
        q: "Why is the usable host count 254 for a /24?",
        a: "A /24 provides 2^8 = 256 addresses, and two of them are reserved: the network address (192.168.1.0) identifies the subnet itself and the broadcast address (192.168.1.255) reaches every host in it. Subtracting both leaves 2^(32-24) - 2 = 254 addresses you can assign to interfaces.",
      },
      {
        q: "Do I have to enter the network address?",
        a: "No. Type any address inside the range - the calculator masks it down to the network address for you, so 192.168.1.100 with /24 still reports 192.168.1.0 as the network and 192.168.1.254 as the last usable host.",
      },
      {
        q: "What is the wildcard mask used for?",
        a: "It is the bitwise inverse of the subnet mask - 0.0.0.255 for a /24 - and firewall ACLs such as Cisco access lists use it to say which host bits must match. The calculator prints it alongside the mask so you can paste either form.",
      },
      {
        q: "How are /31 and /32 treated?",
        a: "They are special-cased: a /32 reports 1 usable host (the address itself), while a /31 shows 0 because the tool still treats one endpoint as network and the other as broadcast. On router-to-router links, RFC 3021 says both /31 addresses are usable, so assign them manually there.",
      },
    ],
  },

  "sip-calculator": {
    whatIs:
      "A Systematic Investment Plan invests the same amount on a fixed day every month, so units are bought when prices are high and when they are low - an effect called rupee-cost averaging - and every installment compounds until the end of the term. The calculator applies the future value of an annuity due: FV = P x ((1 + i)^n - 1) / i x (1 + i), where P is the monthly installment, i is the annual rate divided by 12, and n is the number of months. It reports the amount you put in, the growth on top of it, and the final corpus, plus a year-by-year table.",
    whyUse: [
      "Three headline figures side by side - Total Invested, Estimated Returns, and Total Wealth - so the contribution of compounding is obvious.",
      "The Yearly Breakdown table shows invested, wealth, and returns for each year, which is how you see growth accelerating later in the term.",
      "Defaults of ₹10,000 per month, 12% p.a., and 10 years are pre-filled, so the first click already produces a realistic projection.",
      "Copy Summary exports a plain-text block with your inputs and totals for a plan document, chat, or spreadsheet.",
      "No sign-in, no rate limit, and no record of your figures - the arithmetic happens on the client.",
    ],
    howToUse: [
      "Enter the Monthly Investment (₹) amount; the field starts at 10000 and steps in units of 500.",
      "Set the Expected Return (% p.a.), allowed from 1 to 50 in steps of 0.5 (12 is pre-filled).",
      "Set the Time Period (Years) between 1 and 50.",
      "Click Calculate to fill the three cards: Total Invested (blue), Estimated Returns (green), and Total Wealth (purple).",
      "Read the Yearly Breakdown table with Year, Invested, Wealth, and Returns columns, one row for every year of the term.",
      "Click Copy Summary to copy a text block containing your inputs and the three totals.",
    ],
    examples: [
      {
        title: "₹5,000 monthly at 12% p.a. for 10 years",
        input: "Monthly Investment (₹): 5000, Expected Return (% p.a.): 12, Time Period (Years): 10",
        output:
          "Total Invested: ₹600,000\nEstimated Returns: ₹561,695\nTotal Wealth: ₹1,161,695",
      },
      {
        title: "Year-by-year growth for the same SIP",
        input: "Monthly Investment (₹): 5000, Expected Return (% p.a.): 12, Time Period (Years): 10",
        output:
          "Year 1:  Invested ₹60,000,   Wealth ₹64,047,    Returns ₹4,047\nYear 5:  Invested ₹300,000,  Wealth ₹412,432,   Returns ₹112,432\nYear 10: Invested ₹600,000,  Wealth ₹1,161,695, Returns ₹561,695",
      },
      {
        title: "Doubling the installment doubles the corpus",
        input: "Monthly Investment (₹): 10000 (the default), Expected Return (% p.a.): 12, Time Period (Years): 10",
        output:
          "Total Invested: ₹1,200,000\nEstimated Returns: ₹1,123,391\nTotal Wealth: ₹2,323,391",
      },
    ],
    useCases: [
      "Projecting the corpus of a monthly mutual-fund SIP before you commit to a multi-year amount.",
      "Showing a first-time investor how ₹5,000 a month can more than double over a decade at 12% p.a.",
      "Comparing scenarios - a raise in installment, a longer term, or a different expected return - to set a goal amount.",
      "Building a year-by-year plan to decide when the corpus reaches a target such as a down payment or retirement nest egg.",
    ],
    faqs: [
      {
        q: "Is the compounding monthly?",
        a: "Yes. The annual rate is divided by 12 to get the monthly rate (12% p.a. becomes 1% per month), and that rate is applied every month. The formula also carries a (1 + i) factor, which treats each installment as invested at the start of the month rather than the end.",
      },
      {
        q: "Are these returns guaranteed?",
        a: "No. The percentage you enter is an assumption, not a promise - equity funds fluctuate and may deliver far less over a single decade. Run the calculation with a conservative rate and a higher one so you plan for a range rather than one number.",
      },
      {
        q: "Can I model a step-up SIP or quarterly payments?",
        a: "This tool is monthly only with a constant installment. For a step-up, calculate each phase separately (for example 5 years at ₹5,000 then 5 more at ₹7,000) using the last corpus as the starting point, or build a small spreadsheet.",
      },
      {
        q: "Do the figures include tax or exit load?",
        a: "They are gross projections: no expense ratio, exit load, or capital-gains tax is deducted, so real-world corpus will be lower. Subtract the fund's expense ratio from your expected return for a fairer estimate.",
      },
    ],
  },

  "emi-calculator": {
    whatIs:
      "An Equated Monthly Installment is a fixed payment that fully repays a loan over a set tenure. Because interest is charged on the outstanding balance, the early EMIs are mostly interest and the later ones are mostly principal - the split shifts every month even though the payment never changes. The calculator uses the standard formula EMI = P x r x (1 + r)^n / ((1 + r)^n - 1), where P is the loan amount, r is the monthly rate (annual rate / 12 / 100), and n is the number of months. It returns the EMI, total repayment, total interest, and an amortization table by year.",
    whyUse: [
      "Monthly EMI is shown as a large headline figure with Principal Amount, Total Interest, and Total Payment beneath it.",
      "A principal-versus-interest bar makes the cost of the tenure visible at a glance before you read the table.",
      "The Yearly Breakdown table lists principal paid, interest paid, and the closing balance for every year of the loan.",
      "Defaults of ₹1,000,000 at 8.5% for 20 years let you see a typical home-loan projection on the first click.",
      "Your loan figures are handled in the tab and never posted to a server.",
    ],
    howToUse: [
      "Enter the Loan Amount (₹) in the first field; it starts at 1000000 and steps in units of 10000.",
      "Set the Interest Rate (% p.a.) from 0.1 to 50 in steps of 0.1 (8.5 is pre-filled).",
      "Set the Tenure (Years) between 1 and 50; the calculator converts it to months for the formula.",
      "Click Calculate to reveal the Monthly EMI banner plus the Principal Amount, Total Interest, and Total Payment cards.",
      "Read the split bar showing what share of everything you repay is principal versus interest, then the Yearly Breakdown table with Year, Principal, Interest, and Balance columns.",
      "Click Copy Summary to copy a text block with your inputs, the EMI, total payment, and total interest.",
    ],
    examples: [
      {
        title: "Home loan: ₹1,000,000 at 8.5% for 20 years",
        input: "Loan Amount (₹): 1000000, Interest Rate (% p.a.): 8.5, Tenure (Years): 20",
        output:
          "Monthly EMI: ₹8,678\nPrincipal Amount: ₹1,000,000\nTotal Interest: ₹1,082,776\nTotal Payment: ₹2,082,776\nInterest share: 108% of the amount borrowed",
      },
      {
        title: "Car loan: ₹500,000 at 10% for 5 years",
        input: "Loan Amount (₹): 500000, Interest Rate (% p.a.): 10, Tenure (Years): 5",
        output:
          "Monthly EMI: ₹10,624\nPrincipal Amount: ₹500,000\nTotal Interest: ₹137,411\nTotal Payment: ₹637,411\nSplit bar: 73% Principal, 27% Interest",
      },
      {
        title: "Personal loan with the formula worked through",
        input: "Loan Amount (₹): 200000, Interest Rate (% p.a.): 12, Tenure (Years): 3",
        output:
          "r = 12 / 12 / 100 = 0.01, n = 3 x 12 = 36\nEMI = 200000 x 0.01 x (1.01)^36 / ((1.01)^36 - 1) = ₹6,643\nTotal Payment: ₹239,143\nTotal Interest: ₹39,143\nSplit bar: 80% Principal, 20% Interest",
      },
    ],
    useCases: [
      "Checking whether a home, car, or personal loan EMI fits your monthly budget before applying.",
      "Comparing the total interest cost of a 10-year versus a 20-year tenure on the same amount.",
      "Negotiating with a lender by showing the amortization schedule and the interest you would actually pay.",
      "Planning prepayment: the yearly balance column shows how much principal remains outstanding.",
    ],
    faqs: [
      {
        q: "Why is the total interest larger than the loan itself on a 20-year loan?",
        a: "Interest accrues every month on the full outstanding balance, and in the early years that balance is close to the amount you borrowed. At 8.5% over 240 months you repay ₹2,082,776 on a ₹1,000,000 loan, so the ₹1,082,776 of interest exceeds the principal; shortening the tenure or lowering the rate cuts it dramatically.",
      },
      {
        q: "Can I calculate a 0% interest loan?",
        a: "Not with this tool - the calculation requires a positive rate (the field starts at 0.1), so a zero value returns nothing. For an interest-free loan the answer is simple: divide the principal by the number of months, for example ₹200,000 over 36 months is ₹5,556 per month.",
      },
      {
        q: "Are fees and insurance included?",
        a: "No. The output covers only principal and interest, so processing fees, stamp duty, and credit insurance offered by lenders sit outside this math. Add any one-time fee to the principal if you want the true disbursed cost.",
      },
      {
        q: "Will my EMI stay the same in real life?",
        a: "For a fixed-rate loan, yes - that is the point of an equated installment. On a floating-rate loan the lender revises the rate when the benchmark moves, and either the tenure or the EMI changes accordingly, so recalculate with the new rate here.",
      },
    ],
  },

  "token-counter": {
    whatIs:
      "Language models do not read words; they read tokens, subword pieces produced by a byte-pair encoding tokenizer, so pricing and context limits are measured in tokens rather than words. English prose runs at roughly 1.3 tokens per word, which is the conversion this tool applies. Alongside that estimate it counts characters, words, lines, and sentences, then prices the result using per-1,000-token tables for GPT-4, GPT-4o, GPT-3.5-Turbo, Claude 3, Llama 3, or a custom entry. Input and output are priced separately because providers charge more for the tokens they generate than for the ones you send.",
    whyUse: [
      "Results refresh as you type, so you can watch a prompt approach a model's context limit while you trim it.",
      "Six model presets with real per-1K prices for input and output, and a custom preset with zero pricing when your provider is not listed.",
      "Characters, words, lines, and sentences are counted next to the token estimate, which helps spot bloat such as repeated whitespace.",
      "Estimated Input Cost and Estimated Output Cost convert the token count into dollars, so a batch job's bill is predictable.",
      "Your prompt never leaves the page: counting is character arithmetic in the tab, which matters when the text is a proprietary prompt.",
    ],
    howToUse: [
      "Click a Model button - gpt-4, gpt-4o (the default), gpt-3.5-turbo, claude-3, llama-3, or custom - to select the pricing table.",
      "Paste or type into the Input Text box; the counts refresh on every keystroke, so you can watch them change while editing.",
      "Click Count Tokens to recompute manually if you changed the model while the box was empty.",
      "Read the four stat tiles (Characters, Words, Lines, Sentences), the large Estimated Tokens banner, and the two cost tiles below it.",
      "Click Copy Results for a plain-text summary of all counts together with the active model name.",
    ],
    examples: [
      {
        title: "Single sentence on GPT-4o (default)",
        input: "The quick brown fox jumps over the lazy dog.",
        output:
          "Characters: 44\nWords: 9\nLines: 1\nSentences: 1\nEstimated Tokens: 12\nModel: gpt-4o\nEstimated Input Cost: $0.0001\nEstimated Output Cost: $0.0002",
      },
      {
        title: "Short instruction on GPT-4 pricing",
        input: "Summarize the quarterly report in five bullet points.",
        output:
          "Characters: 53\nWords: 8\nLines: 1\nSentences: 1\nEstimated Tokens: 11\nModel: gpt-4\nEstimated Input Cost: $0.0003\nEstimated Output Cost: $0.0007",
      },
      {
        title: "Three-line prompt with line and sentence counts",
        input: "Line one is short.\nLine two is a bit longer than the first.\nLine three finishes the prompt.",
        output:
          "Characters: 91\nWords: 18\nLines: 3\nSentences: 3\nEstimated Tokens: 24\nModel: gpt-4o\nEstimated Input Cost: $0.0001\nEstimated Output Cost: $0.0004",
      },
    ],
    useCases: [
      "Checking that a system prompt plus user message still fits inside a model's context window before you ship.",
      "Estimating the cost of a nightly batch job that summarizes thousands of documents.",
      "Comparing the price of the same prompt on GPT-4 versus GPT-4o or Claude 3 before choosing a model.",
      "Trimming verbose prompts - cutting filler words and repeated instructions - to lower both cost and latency.",
    ],
    faqs: [
      {
        q: "How accurate is the token estimate?",
        a: "It is an approximation: words are multiplied by 1.3 and rounded up, not run through the model's real tokenizer. Plain English lands close, but code, JSON, URLs, CJK text, and rare words often split into more tokens than the estimate suggests, so treat the figure as a guide with meaningful margin rather than a billing number.",
      },
      {
        q: "Why do input and output costs differ?",
        a: "Providers price generated tokens higher than supplied ones - GPT-4 charges $0.03 per 1K input tokens and $0.06 per 1K output tokens. The tool therefore prices the same token count twice, which is why the output tile is usually the larger of the two.",
      },
      {
        q: "What does the custom model option do?",
        a: "Custom carries zero pricing, so the character, word, line, sentence, and token statistics still compute while both cost tiles show $0.0000. Use it when your provider is not in the list, or when you only care about context length and not cost.",
      },
      {
        q: "Is my prompt uploaded?",
        a: "No. Counting happens entirely in the page with string operations, so drafts, API keys, or customer data inside the text are not transmitted.",
      },
    ],
  },

  "html-entities": {
    whatIs:
      "HTML entities - also called character references - spell out characters that markup treats specially: &amp; for the ampersand, &lt; and &gt; for angle brackets, and &quot; for the double quote. The browser renders them as the symbol while the source stays safe to parse, which is why escaping user content prevents broken markup and cross-site scripting. Besides the named form, HTML accepts decimal (&#65;) and hexadecimal (&#x41;) references that can express any Unicode character. This page is a searchable reference for the entities you actually use, showing the rendered character, the readable name, and the exact code to paste.",
    whyUse: [
      "One click copies the entity code, so you never retype &hellip; or hunt for the right semicolon.",
      "Search matches the name, the entity code, the rendered character, and the description at the same time.",
      "Covers the everyday set - quotes, dashes, ellipsis, currency symbols, arrows, and card suits - rather than thousands of obscure names.",
      "Each card shows the glyph and the code together, so you can confirm what &mdash; actually produces before using it.",
      "Nothing is transmitted: the list is a static table rendered in your browser tab.",
    ],
    howToUse: [
      "Type into the search box (Search by name, entity code, or character...) to filter by description, name, code, or the character itself.",
      "Browse the card grid: each card shows the rendered glyph in a blue tile, the entity's name, and the code such as &hellip;.",
      "Click a card to copy its code - the toast confirms with the name and code, for example Less Than (&lt;) copied!.",
      "Watch the footer line (Showing 39 entities. Click any entity to copy its code.) which updates as you filter.",
      "Clear the box to restore the full list; a search with no matches shows No entities found matching \"your text\".",
    ],
    examples: [
      {
        title: "The four characters you must escape in HTML",
        input: '& < > "',
        output:
          "Ampersand: &amp;\nLess Than: &lt;\nGreater Than: &gt;\nQuotation Mark: &quot;",
      },
      {
        title: "Filtering by description",
        input: 'search: "dash"',
        output: "En Dash: &ndash;\nEm Dash: &mdash;\nShowing 2 entities.",
      },
      {
        title: "Searching by name fragment",
        input: 'search: "quote"',
        output:
          "Left Double Quote: &ldquo;\nRight Double Quote: &rdquo;\nShowing 2 entities.",
      },
    ],
    useCases: [
      "Escaping user-generated content before inserting it into HTML or an email template so angle brackets cannot break the layout.",
      "Writing alt text, captions, or CMS copy that needs a copyright symbol, degree sign, or euro sign without pasting Unicode.",
      "Looking up the difference between &ndash; and &mdash; when proofreading typography in a blog post.",
      "Recalling the exact name of a character you can see but cannot type, such as &hellip; or &plusmn;.",
    ],
    faqs: [
      {
        q: "What is the difference between &amp; and &#38;?",
        a: "Both produce the same ampersand character: &amp; is the named form and &#38; is the decimal numeric form (&#x26; is hexadecimal). Named entities are readable in source, but numeric references can express any Unicode code point, so generators usually emit numbers for characters without a well-known name.",
      },
      {
        q: "Which characters actually need escaping?",
        a: "In text content, the three that matter are & (always write &amp;), < (write &lt;), and > (write &gt;, conventionally). Inside a quoted attribute you must also escape the double quote as &quot;, otherwise the attribute ends early and your markup breaks.",
      },
      {
        q: "Do these entities work inside JavaScript or JSON?",
        a: "No. Entities are resolved only by an HTML parser, so a string in JavaScript or JSON keeps them literally - you would see the text &amp; instead of an ampersand. Escape those formats with their own rules (backslashes in JS, \" and \\ in JSON).",
      },
      {
        q: "Why does the list show only 39 entities?",
        a: "The HTML standard defines more than two thousand named references, but only a few dozen come up in day-to-day markup. This reference keeps the useful ones - punctuation, quotes, dashes, currency, arrows, and symbols - so the grid stays scannable; use a numeric reference for anything else.",
      },
    ],
  },
};
