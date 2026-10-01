# Model Context Protocol (MCP) Server Guide

A comprehensive guide explaining the **Model Context Protocol (MCP)**, its core capabilities, and step-by-step instructions on configuring MCP servers in **Claude**, **Antigravity**, and **Cursor**.

---

## 1. What is Model Context Protocol (MCP)?

The **Model Context Protocol (MCP)** is an open standard created to connect AI models with external tools, contextual data sources, and automated runtimes.

MCP resolves the **N × M fragmentation problem**: instead of writing custom integrations for each AI client (Claude, Cursor, Antigravity, VS Code, Zed), developers build an MCP server once, and any MCP-compliant AI client can use its tools and data.

### The 3 Core Primitives of MCP
1. **Tools**: Executable functions callable by the AI model (e.g., executing SQL queries, managing GitHub Pull Requests, invoking REST endpoints).
2. **Resources**: Contextual data providers that the user or agent can attach (e.g., database schemas, log streams, OpenAPI definitions).
3. **Prompts**: Standardized, parameterized prompt templates and guided workflow runbooks provided directly by the server.

---

## 2. What Can You Do Using MCP Servers?

| Domain | What You Can Do via MCP | Popular MCP Servers |
| :--- | :--- | :--- |
| **Databases** | Inspect live schemas, execute SQL queries, test migrations, run EXPLAIN plans | `@modelcontextprotocol/server-postgres`, `sqlite`, `mysql`, `mongo` |
| **DevOps & Git** | Create/review PRs, fetch issue threads, inspect Docker logs, restart Kubernetes pods | `@modelcontextprotocol/server-github`, `gitlab-mcp`, `docker-mcp` |
| **Live Web & Search** | Real-time web searching, fetching external API specs, crawling documentation | `@modelcontextprotocol/server-brave-search`, `fetch`, `puppeteer` |
| **Productivity & Tasks**| Read/write Notion docs, manage Linear/Jira tasks, send Slack notifications | `linear-mcp`, `slack-mcp`, `notion-mcp` |
| **Design & Tokens** | Extract Figma design tokens, inspect component auto-layouts, download SVG assets | `figma-mcp`, `designmd` |
| **Persistent Memory** | Store knowledge graphs across conversation sessions | `@modelcontextprotocol/server-memory` |

---

## 3. Configuration & Usage Across AI Tools

### A. Claude (Claude Desktop & Claude Code)

#### Claude Desktop
Claude Desktop communicates with MCP servers via `stdio`. Configuration is stored in `claude_desktop_config.json`:

* **File Locations:**
  * **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
  * **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
  * **Linux:** `~/.config/Claude/claude_desktop_config.json`

* **Configuration Schema:**
```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://postgres:password@localhost:5432/omnistore_cms"
      ]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_yourPersonalAccessToken"
      }
    }
  }
}
```

* **Usage:**
  1. Save the configuration and restart Claude Desktop.
  2. Click the **Hammer (🔨)** icon in the bottom-right of the input box to verify connected tools.

---

### B. Antigravity (Google Antigravity IDE & CLI)

Antigravity natively supports both **Stdio** (local CLI commands) and **SSE** (remote HTTP services) transports.

* **File Locations:**
  * **Global Config (all sessions):** `~/.gemini/config/mcp_config.json` (Windows: `C:\Users\<Username>\.gemini\config\mcp_config.json`)
  * **Plugin Scope:** `plugins/<plugin_name>/mcp_config.json`
  * **Workspace Discovery:** `.agents/` or plugin manifests

* **Configuration Schema (`mcp_config.json`):**
```json
{
  "mcpServers": {
    "sqlite-helper": {
      "command": "sqlite-mcp-server",
      "args": ["c:/Users/Nikhil/Desktop/cms/data.db"],
      "env": {
        "DB_READONLY": "true"
      }
    },
    "remote-team-service": {
      "serverUrl": "https://mcp.internal.company.com/sse"
    }
  }
}
```

* **Usage:**
  1. Tools are automatically discovered and injected upon startup.
  2. Tools use progressive disclosure and lazy loading to preserve prompt tokens.
  3. View and inspect active MCP servers in the IDE under **Additional Options (...) > MCP Servers**.

---

### C. Cursor (Cursor AI Editor)

Cursor supports MCP in both **Composer (Agent Mode)** and **Cursor Chat**.

#### Method 1: Settings UI
1. Open **Cursor Settings** (`Ctrl + Shift + J` or `Cmd + Shift + J`).
2. Go to **Features** > **MCP Servers**.
3. Click **"+ Add New MCP Server"**.
4. Enter Name, Type (`command` or `sse`), and Command.

#### Method 2: Workspace Config (`.cursor/mcp.json`)
Create `.cursor/mcp.json` in your project root:
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "C:\\Users\\Nikhil\\Desktop\\cms"
      ]
    }
  }
}
```

* **Usage:** Switch Composer to **Agent Mode**. Cursor will automatically invoke MCP tools during execution.

---

## 4. Platform Comparison Matrix

| Feature | Claude Desktop | Antigravity IDE | Cursor Editor |
| :--- | :--- | :--- | :--- |
| **Config File** | `claude_desktop_config.json` | `mcp_config.json` | Settings UI / `.cursor/mcp.json` |
| **Stdio (Local)** | Supported | Supported | Supported |
| **SSE (Remote)** | Supported | Supported (`serverUrl`) | Supported (`sse` type) |
| **Workspace Scope** | Via Claude Code | Plugins / `.agents` | `.cursor/mcp.json` |
| **Loading Mode** | Eager Injection | Progressive / Lazy Loaded | Agent Context Injection |

---

## 5. Security Best Practices

1. **Least Privilege:** Always use read-only credentials for databases whenever write access is not strictly required.
2. **Secret Management:** Avoid committing plaintext API tokens into version-controlled repository files.
3. **Context Optimization:** Only enable MCP servers needed for your active workflows to avoid token overhead.
4. **Path Restrictions:** Restrict filesystem server arguments to explicit workspace paths.
