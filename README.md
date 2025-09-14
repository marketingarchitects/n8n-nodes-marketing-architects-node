# n8n-nodes-marketing-architects-node

This is an n8n community node that allows you to integrate Marketing Architects API into your n8n workflows.

Marketing Architects is a platform for creating and managing marketing campaigns, providing AI-powered text completion, image generation, and project management capabilities.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Author

**John Ryan Cottam**  
Email: jcottam@markarch.com  
Homepage: https://marketingarchitects.com

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Resources](#resources)  
[Version history](#version-history)  
[Development](#development)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

This node provides three main resource types with the following operations:

### Text Resource

- **Text Completion**: Generate AI-powered text completions for given prompts using the OpenRouter API

### Image Resource

- **Image Generation**: Create AI-generated images from text prompts using Replicate API

### Project Resource

- **Log Event**: Log events to track project activities and workflow executions

## Credentials

The Marketing Architects API requires authentication using the following credentials:

- **Token**: Your Marketing Architects API bearer token for authentication
- **Domain**: The API endpoint URL (defaults to `https://pushbtn.api.misfitsandmachines.com`)

To obtain your API credentials, visit the [Marketing Architects API Documentation](https://pushbtn.api.misfitsandmachines.com).

## Compatibility

- n8n 1.110.1 and above
- Node.js 20.15 and above

### Basic Setup

1. Install the node following the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/)
2. Configure your Marketing Architects API credentials
3. Add the Marketing Architects node to your workflow
4. Select the desired resource (Text, Image, or Project) and operation
5. Configure the operation parameters and execute your workflow

### Example Workflows

- **Content Generation**: Use Text Completion to generate marketing copy from prompts
- **Visual Content**: Use Image Generation to create marketing visuals from text descriptions
- **Project Tracking**: Use Log Event to track workflow executions and project milestones

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Marketing Architects API Documentation](https://pushbtn.api.misfitsandmachines.com)
- [Repository](https://github.com/marketingarchitects/n8n-nodes-marketing-architects-node)

## Version history

- **0.1.0** - Initial release with Text Completion, Image Generation, and Project Log Event operations

## Development

### Prerequisites

- Node.js 20.15 or higher
- npm or yarn package manager

### Run an initial build and make it linkable to n8n

```bash
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

### Development Commands

```bash
# Build the project
npm run build

# Watch for changes during development
npm run dev

# Format code
npm run format

# Lint code
npm run lint

# Fix linting issues
npm run lintfix
```

### Restart n8n to see your changes

```bash
n8n start
```
