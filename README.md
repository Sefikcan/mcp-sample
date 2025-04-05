**MCP** is a protocol that facilitates communication between AI models and the external world. It allows LLMs to access various data sources such as files, databases, and APIs.

## Why MCP?
* MCP helps in building complex workflows on top of LLMs. Since LLMs frequently need to integrate with data and tools, MCP provides the following functionalities:
  * Pre-built integrations that LLMs can directly connect to
  * Flexible switching between LLM providers
  * Protecting data within infrastructure according to best practices

## Architecture
MCP follows a client-server architecture where a main application connects to multiple servers.

### Components:
* **MCP Hosts**: Claude, IDEs, and AI programs that want to access data via MCP.
* **MCP Clients**: Protocols that connect to servers.
* **MCP Servers**: Standardized programs that expose specific capabilities through MCP.
* **Local Data Sources**: Securely accessible computer files, databases, or services for MCP servers.
* **Remote Services**: External systems accessible over the internet (APIs, etc.) that MCP servers can connect to.

---

### Server Development
* How to use our own server with Claude Desktop.
* Let's create a simple weather application.
* The MCP-based server will have two tools:
  * `get-alerts`
  * `get-forecast`
* Finally, we will connect it to Claude Desktop or Cursor:
  * The steps are similar:
    * Navigate to the settings of the respective IDE.
    * Select MCP and add the following configuration:

```json
{
  "mcpServers": { // main object
      "weather": { // server name
          "command": "node", // program to execute
          "args": [ // arguments for Node.js
              "project route"
          ]
      }
  }
}
```
* Now, the configured MCP server will appear in the prompt window.

#### MCP Server Concepts
MCP servers provide three main types of capabilities:
* **Resources**: File-like structures (APIs or file contents) readable by clients.
* **Tools**: Functions that can be invoked by LLMs with user approval.
* **Prompts**: Predefined templates for executing specific tasks.

