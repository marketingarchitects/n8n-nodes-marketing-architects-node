# n8n-nodes-marketing-architects-node

This is an n8n community node. It lets you use Marketing Architects in your n8n workflows.

Marketing Architects is a platform for creating and managing marketing campaigns.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials) <!-- delete if no auth needed -->  
[Compatibility](#compatibility)  
[Usage](#usage) <!-- delete if not using this section -->  
[Resources](#resources)  
[Version history](#version-history) <!-- delete if not using this section -->

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

- Text Completion
- Image Generation
- Project
- Log Event

## Credentials

- Domain
- Bearer Token

## Compatibility

- n8n 1.110.1 and above

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Marketing Architects Documentation](https://pushbtn.api.misfitsandmachines.com)

## Version history

- 0.1.0

## Development

### Run an initial build and make it linkable to n8n

```
npm run build
npm link
```

### List nodes and credentials in package.json

```json
"n8n": {
  "n8nNodesApiVersion": 1,
  "credentials": [
    "dist/credentials/MarketingArchitectsApi.credentials.js"
  ],
  "nodes": [
    "dist/nodes/MarketingArchitects/MarketingArchitects.node.js"
  ]
}
```

### Link build to n8n

```bash
# In the nodes directory within your n8n installation
cd ~/.n8n/nodes

# node-package-name is the name from the package.json
npm link n8n-nodes-marketing-architects-node
```

### Start n8n and see your node

```bash
n8n start
```

### Iterate on your node

```bash
npm run dev
```

### Restart n8n to see your changes

```bash
n8n start
```
