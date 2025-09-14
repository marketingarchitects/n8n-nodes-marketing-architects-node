# n8n-nodes-marketing-architects-node

[![npm](https://img.shields.io/npm/v/n8n-nodes-marketing-architects-node)](https://www.npmjs.com/package/n8n-nodes-marketing-architects-node)
[![license](https://img.shields.io/npm/l/n8n-nodes-marketing-architects-node)](https://en.wikipedia.org/wiki/MIT_license)
[![developed by](https://img.shields.io/badge/developed_by-MarketingArchitects-white)](https://marketingarchitects.com)

This is an n8n community node that allows you to integrate Marketing Architects API into your n8n workflows.

Marketing Architects is a platform for creating and managing marketing campaigns, providing AI-powered text completion, image generation, and project management capabilities.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Table of Contents

- [Installation](#installation)
- [Operations](#operations)
- [Credentials](#credentials)
- [Compatibility](#compatibility)
- [Resources](#resources)
- [Version history](#version-history)
- [Development](#development)
- [Adding New Features](#adding-new-features)
- [Version Management](#version-management)
- [Publishing to npm](#publishing-to-npm)

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

## Adding New Features

### 1. Create New Operation Files

When adding new operations, create corresponding files in the `nodes/MarketingArchitects/` directory:

```bash
# Example: Adding a new "Analytics" resource
touch nodes/MarketingArchitects/Analytics.ts
```

### 2. Update Main Node File

Add your new resource and operations to `MarketingArchitects.node.ts`:

```typescript
// Import your new operation fields
import { analyticsFields } from './Analytics';

// Add to properties array
properties: [
	// ... existing resources
	{
		displayName: 'Analytics',
		name: 'analytics',
		value: 'analytics',
	},
	// ... existing operations
	...analyticsFields,
];
```

### 3. Update Node Configuration

Modify `MarketingArchitects.node.json` if needed:

```json
{
	"node": "n8n-nodes-base.marketingArchitects",
	"nodeVersion": "1.1", // Increment when adding features
	"categories": ["Utility", "Marketing", "Analytics"] // Add new categories
}
```

### 4. Test Your Changes

```bash
# Build and test
npm run build
npm run lint
npm run format

# Link to n8n and test
npm link
cd ~/.n8n/nodes
npm link n8n-nodes-marketing-architects-node
n8n start
```

## Version Management

### Bumping Version

1. **Update package.json version**:

```bash
# Patch version (bug fixes)
npm version patch

# Minor version (new features)
npm version minor

# Major version (breaking changes)
npm version major
```

2. **Update README.md version history**:

```markdown
## Version history

- **0.2.0** - Added Analytics resource with performance tracking operations
- **0.1.1** - Fixed authentication token handling
- **0.1.0** - Initial release with Text Completion, Image Generation, and Project Log Event operations
```

3. **Update node version** in `MarketingArchitects.node.json` if needed:

```json
{
	"nodeVersion": "2.0" // Increment for significant changes
}
```

### Semantic Versioning Guidelines

- **MAJOR** (1.0.0): Breaking changes to API or node behavior
- **MINOR** (0.1.0): New features, new resources, or new operations
- **PATCH** (0.0.1): Bug fixes, documentation updates, or small improvements

## Publishing to npm

### Prerequisites

1. **Create npm account** at [npmjs.com](https://www.npmjs.com/)
2. **Login to npm**:

```bash
npm login
```

3. **Verify your account** (if required by npm)

### Pre-Publication Checklist

1. **Build the project**:

```bash
npm run build
```

2. **Run all quality checks**:

```bash
npm run lint
npm run format
npm run lintfix
```

3. **Test the built package**:

```bash
npm pack
# This creates a .tgz file you can inspect
```

4. **Update version** (if not done already):

```bash
npm version patch  # or minor/major
```

### Publishing Process

1. **Publish to npm**:

```bash
npm publish
```

2. **Verify publication**:

```bash
npm view n8n-nodes-marketing-architects-node
```

3. **Test installation**:

```bash
# In a test environment
npm install n8n-nodes-marketing-architects-node
```

### Post-Publication

1. **Create GitHub release** (if using GitHub):

```bash
git tag v0.2.0
git push origin v0.2.0
```

2. **Update n8n community nodes registry** (if applicable)

3. **Update documentation** and notify users of new features

### Troubleshooting

- **Permission denied**: Ensure you're logged in with `npm login`
- **Version already exists**: Bump version with `npm version patch`
- **Build errors**: Fix linting issues with `npm run lintfix`
- **Package too large**: Check `.npmignore` file to exclude unnecessary files

### Automated Publishing (Optional)

Consider setting up GitHub Actions for automated publishing:

```yaml
# .github/workflows/publish.yml
name: Publish to npm
on:
  push:
    tags:
      - 'v*'
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```
