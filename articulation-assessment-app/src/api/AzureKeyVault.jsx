import { SecretClient } from "@azure/keyvault-secrets";
import { InteractiveBrowserCredential } from "@azure/identity";

// Function to get the secret value from Azure Key Vault
export const getApiUrl = async () => {
    const kvUri = `https://kv-articulation-app.vault.azure.net/`;

    // Use InteractiveBrowserCredential for browser-based authentication
    const credential = new InteractiveBrowserCredential({
        clientId: "c1e00095-7b2c-4808-a14a-23cd6f91f614  ",  
        tenantId: "c66b6765-b794-4a2b-84ed-845b341c086a",
        clientSecret: "lxg8Q~VJh6PI9gPN7ccyQjh8ZfDkIvNbSIPWAcs5"  
    });
    
    const client = new SecretClient(kvUri, credential);

    try {
        const secret = await client.getSecret("apigateway-ip"); 
        const ipAddress = secret.value;
        return ipAddress;
    } catch (err) {
        console.error("Error retrieving secret:", err);
        throw err;
    }
};

