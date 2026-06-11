# alberto-mcp

MCP server for [Alberto Ochoa](https://albertoochoa.dev)'s CV and portfolio. Connect it to your
agent and ask his career anything — experience, case studies, skills, contact.

## Use it

```jsonc
// Claude Code / Claude Desktop / any MCP client
{
  "mcpServers": {
    "alberto": { "command": "npx", "args": ["-y", "alberto-mcp"] }
  }
}
```

Then ask things like *"Does Alberto have SQL optimization experience?"* or
*"Summarize his el-carril case study."*

## Tools

| Tool | What it returns |
|------|-----------------|
| `get_profile` | Full CV (JSON Resume schema) |
| `list_case_studies` | Portfolio case studies index |
| `get_case_study` | One forensic case study, full sections |
| `search_experience` | Keyword search across jobs, skills, projects |
| `get_contact` | Email, LinkedIn, GitHub, availability |

Data is fetched live from `albertoochoa.dev` (same dataset that renders the site, the PDF CV and
`llms.txt`). No local state, no tracking.

## Develop

```bash
npm install
npm run build
npm run smoke   # spawns the server over stdio and exercises the tools
```
