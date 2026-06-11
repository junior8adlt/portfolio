/**
 * Smoke test: spawns the built server over stdio, lists tools and calls two of them.
 * Run after `npm run build`: npm run smoke
 */
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: process.execPath,
  args: ["dist/index.js"],
  env: { ...process.env },
});

const client = new Client({ name: "smoke", version: "0.0.0" });
await client.connect(transport);

const { tools } = await client.listTools();
console.log("tools:", tools.map((t) => t.name).join(", "));
if (tools.length < 5) throw new Error("expected 5 tools");

const contact = await client.callTool({ name: "get_contact", arguments: {} });
console.log("get_contact ok:", contact.content[0].text.slice(0, 120).replace(/\n/g, " "), "…");

const search = await client.callTool({
  name: "search_experience",
  arguments: { query: "MCP" },
});
console.log("search_experience('MCP') ok:", search.content[0].text.length, "bytes");

const cs = await client.callTool({ name: "get_case_study", arguments: { slug: "el-carril" } });
if (cs.isError) throw new Error(`get_case_study errored: ${cs.content[0].text}`);
if (!cs.content[0].text.includes("ledger")) throw new Error("get_case_study returned unexpected content");
console.log("get_case_study('el-carril') ok:", cs.content[0].text.length, "bytes");

await client.close();
console.log("SMOKE PASS");
