# n8n-nodes-adobe-experience-manager

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

This n8n community node provides comprehensive Adobe Experience Manager integration with 11 resources and 70+ operations. It enables DAM asset management, content fragment authoring, page operations, GraphQL content delivery queries, and workflow automation for AEM instances directly from n8n workflows.

![n8n Community Node](https://img.shields.io/badge/n8n-Community%20Node-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![AEM](https://img.shields.io/badge/AEM-6.5-red)
![Adobe](https://img.shields.io/badge/Adobe-Experience%20Cloud-orange)

## Features

- **DAM Management** — Upload, retrieve, update, and organize digital assets in the AEM Digital Asset Manager
- **Content Fragments** — Create, edit, publish, and query structured content fragments and fragment models
- **Page Operations** — Create, update, move, copy, delete, and publish AEM pages
- **GraphQL Queries** — Execute persisted and ad-hoc GraphQL queries against AEM's content delivery layer
- **Workflow Automation** — Trigger and monitor AEM workflow instances for content approval and publication
- **Asset Renditions** — Generate and retrieve asset renditions and metadata
- **Tags** — Create and manage the AEM tag taxonomy
- **Users and Groups** — Manage AEM user accounts and group membership
- **Replication** — Activate and deactivate content across author and publish tiers
- **Search** — Full-text and property-based content search via the QueryBuilder API
- **Multi-Environment Support** — Connect to author, publish, and preview instances with separate credentials

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** → **Community Nodes**
3. Click **Install a community node**
4. Enter `@velocity-bpa/n8n-nodes-adobe-experience-manager`
5. Click **Install**

### Manual Installation

```bash
cd ~/.n8n
npm install @velocity-bpa/n8n-nodes-adobe-experience-manager
```

### Development Installation

```bash
git clone https://github.com/Velocity-BPA/n8n-nodes-adobe-experience-manager.git
cd n8n-nodes-adobe-experience-manager
npm install
npm run build
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-adobe-experience-manager
n8n start
```

## Credentials Setup

| Field | Description | Required |
|-------|-------------|----------|
| AEM Host | Your AEM instance URL (e.g., https://author.example.com) | Yes |
| Username | AEM user with appropriate permissions | Yes |
| Password | Password or API token | Yes |
| Port | Instance port (default: 4502 author, 4503 publish) | No |
| SSL Verify | Enable SSL certificate verification | No |

## Resources & Operations

### 1. Asset (DAM)

| Operation | Description |
|-----------|-------------|
| Upload Asset | Upload a binary file to a DAM folder |
| Get Asset | Retrieve asset metadata and properties |
| Update Asset | Modify asset metadata and properties |
| Delete Asset | Remove an asset from the DAM |
| Move Asset | Relocate an asset to a different DAM path |
| Copy Asset | Duplicate an asset to a target path |
| Search Assets | Query assets by metadata, type, or full-text |
| Get Renditions | List available renditions for an asset |
| Get Rendition | Download a specific rendition of an asset |

### 2. Content Fragment

| Operation | Description |
|-----------|-------------|
| Create Fragment | Create a new content fragment from a model |
| Get Fragment | Retrieve a content fragment and its fields |
| Update Fragment | Modify content fragment field values |
| Delete Fragment | Remove a content fragment |
| Publish Fragment | Activate a fragment to the publish tier |
| Unpublish Fragment | Deactivate a fragment |
| List Fragments | Query fragments by model, path, or properties |
| Get Fragment Model | Retrieve a content fragment model definition |
| List Fragment Models | List all available content fragment models |

### 3. Page

| Operation | Description |
|-----------|-------------|
| Create Page | Create a new page under a parent path |
| Get Page | Retrieve page properties and content |
| Update Page | Modify page properties |
| Delete Page | Remove a page from the repository |
| Move Page | Relocate a page to a new path |
| Copy Page | Duplicate a page to a target location |
| Activate Page | Replicate a page to publish |
| Deactivate Page | Remove a page from publish |
| List Children | List child pages under a path |
| Lock Page | Lock a page for exclusive editing |
| Unlock Page | Release a page lock |

### 4. GraphQL

| Operation | Description |
|-----------|-------------|
| Execute Query | Run an ad-hoc GraphQL query |
| Execute Persisted Query | Run a saved persisted query by path |
| List Persisted Queries | Retrieve all persisted queries for an endpoint |

### 5. Workflow

| Operation | Description |
|-----------|-------------|
| Start Workflow | Initiate a workflow instance with a payload |
| Get Workflow Status | Check the status of a running workflow |
| List Workflow Models | Retrieve available workflow model definitions |
| List Instances | List workflow instances with optional filters |
| Terminate Workflow | Stop a running workflow instance |

### 6. Tag

| Operation | Description |
|-----------|-------------|
| Create Tag | Create a new tag in the taxonomy |
| Get Tag | Retrieve tag metadata |
| Update Tag | Modify tag title or description |
| Delete Tag | Remove a tag |
| List Tags | List tags under a namespace |

### 7. Search

| Operation | Description |
|-----------|-------------|
| QueryBuilder Search | Execute a QueryBuilder property and full-text search |
| Full-Text Search | Search across all content by keyword |

### 8. Replication

| Operation | Description |
|-----------|-------------|
| Activate | Replicate content to publish instances |
| Deactivate | Remove content from publish instances |
| Get Replication Status | Check replication queue and agent status |

### 9. User

| Operation | Description |
|-----------|-------------|
| Create User | Create a new AEM user account |
| Get User | Retrieve user profile and properties |
| Update User | Modify user properties or password |
| Delete User | Remove a user from the system |
| List Users | Query users in the repository |

### 10. Group

| Operation | Description |
|-----------|-------------|
| Create Group | Create a new user group |
| Get Group | Retrieve group membership and properties |
| Add Member | Add a user to a group |
| Remove Member | Remove a user from a group |
| List Groups | List all groups in the system |

### 11. Rendition

| Operation | Description |
|-----------|-------------|
| Generate Rendition | Request generation of a new asset rendition |
| Get Rendition URL | Retrieve the URL for a specific rendition |
| List Renditions | List all renditions available for an asset |

## Error Handling

| Error | Description | Solution |
|-------|-------------|----------|
| 401 Unauthorized | Invalid credentials | Verify username, password, and user permissions |
| 403 Forbidden | Insufficient permissions | Grant appropriate read/write access to the AEM user |
| 404 Not Found | Resource path does not exist | Check content path and AEM version |
| 409 Conflict | Resource already exists at target path | Use a different path or delete the existing resource |
| 500 Server Error | AEM internal error | Check AEM logs and system health |

## Development

```bash
npm install
npm run build
npm test
npm run lint
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

Licensed under the **Business Source License 1.1**.

Free for personal, educational, and internal non-commercial use. Commercial production use requires a license from Velocity BPA.

For licensing inquiries: **licensing@velobpa.com**

## Support

- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-adobe-experience-manager/issues)
- **Adobe AEM Documentation**: [Adobe Experience League](https://experienceleague.adobe.com/docs/experience-manager.html)
