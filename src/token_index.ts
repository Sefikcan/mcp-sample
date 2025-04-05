import { McpServer} from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import axios from "axios";
import {StdioServerTransport} from "@modelcontextprotocol/sdk/server/stdio.js";

const tokenServer = new McpServer({
    name: "token-server",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools:{}
    }
});

tokenServer.tool(
    "generate-token",
    "Authenticate user and generate token from external auth service",
    {
        username: z.string().describe("The username of the user"),
        password: z.string().describe("The password of the user"),
    },
    async ({username, password}) => {
        try{
            const form = new FormData();
            form.append("username", username);
            form.append("password", password);
            form.append("grant_type", "password");

            const response = await axios.post("identity_url", form, {
                headers: {
                    "accept": "application/json",
                    "content-type": "application/json",
                }
            });

            const token = "Bearer " + response.data.access_token;
            return {
                content: [{
                    type: "text",
                    text: `Token: ${token}`,
                }]
            }
        } catch (error: any) {
            console.error("Token generation failed: ", error.response?.data || error.message);
            return {
                content: [{
                    type: "text",
                    text: "Authentication failed. Please check your username and password."
                }]
            }
        }
    }
)

async function main () {
    const transport = new StdioServerTransport();
    await tokenServer.connect(transport);
    console.error("Token MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in main()", error);
})