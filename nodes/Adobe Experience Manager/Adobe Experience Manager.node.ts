/**
 * Copyright (c) 2026 Velocity BPA
 * 
 * Licensed under the Business Source License 1.1 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     https://github.com/VelocityBPA/n8n-nodes-adobeexperiencemanager/blob/main/LICENSE
 * 
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
  NodeApiError,
} from 'n8n-workflow';

export class AdobeExperienceManager implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Adobe Experience Manager',
    name: 'adobeexperiencemanager',
    icon: 'file:adobeexperiencemanager.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with the Adobe Experience Manager API',
    defaults: {
      name: 'Adobe Experience Manager',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'adobeexperiencemanagerApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Asset',
            value: 'asset',
          },
          {
            name: 'ContentFragment',
            value: 'contentFragment',
          },
          {
            name: 'Page',
            value: 'page',
          },
          {
            name: 'GraphQL Query',
            value: 'graphQLQuery',
          },
          {
            name: 'Workflow',
            value: 'workflow',
          }
        ],
        default: 'asset',
      },
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['asset'],
		},
	},
	options: [
		{
			name: 'Get Assets',
			value: 'getAssets',
			description: 'List all assets with filtering and pagination',
			action: 'Get assets',
		},
		{
			name: 'Get Asset',
			value: 'getAsset',
			description: 'Get specific asset details and metadata',
			action: 'Get asset',
		},
		{
			name: 'Create Asset',
			value: 'createAsset',
			description: 'Upload new asset to specified path',
			action: 'Create asset',
		},
		{
			name: 'Update Asset',
			value: 'updateAsset',
			description: 'Update asset metadata and properties',
			action: 'Update asset',
		},
		{
			name: 'Delete Asset',
			value: 'deleteAsset',
			description: 'Remove asset from DAM',
			action: 'Delete asset',
		},
		{
			name: 'Get Asset Renditions',
			value: 'getAssetRenditions',
			description: 'List all renditions for an asset',
			action: 'Get asset renditions',
		},
		{
			name: 'Create Asset Rendition',
			value: 'createAssetRendition',
			description: 'Generate new rendition for asset',
			action: 'Create asset rendition',
		},
	],
	default: 'getAssets',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['contentFragment'],
		},
	},
	options: [
		{
			name: 'Get Content Fragments',
			value: 'getContentFragments',
			description: 'List all content fragments',
			action: 'Get content fragments',
		},
		{
			name: 'Get Content Fragment',
			value: 'getContentFragment',
			description: 'Get specific content fragment data',
			action: 'Get a content fragment',
		},
		{
			name: 'Create Content Fragment',
			value: 'createContentFragment',
			description: 'Create new content fragment',
			action: 'Create a content fragment',
		},
		{
			name: 'Update Content Fragment',
			value: 'updateContentFragment',
			description: 'Update content fragment fields',
			action: 'Update a content fragment',
		},
		{
			name: 'Delete Content Fragment',
			value: 'deleteContentFragment',
			description: 'Delete content fragment',
			action: 'Delete a content fragment',
		},
		{
			name: 'Get Content Fragment Variations',
			value: 'getContentFragmentVariations',
			description: 'List fragment variations',
			action: 'Get content fragment variations',
		},
		{
			name: 'Create Content Fragment Variation',
			value: 'createContentFragmentVariation',
			description: 'Create new variation',
			action: 'Create a content fragment variation',
		},
	],
	default: 'getContentFragments',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['page'],
		},
	},
	options: [
		{
			name: 'Get Pages',
			value: 'getPages',
			description: 'List pages with hierarchy information',
			action: 'Get pages',
		},
		{
			name: 'Get Page',
			value: 'getPage',
			description: 'Get specific page content and properties',
			action: 'Get a page',
		},
		{
			name: 'Create Page',
			value: 'createPage',
			description: 'Create new page from template',
			action: 'Create a page',
		},
		{
			name: 'Update Page',
			value: 'updatePage',
			description: 'Update page properties and content',
			action: 'Update a page',
		},
		{
			name: 'Delete Page',
			value: 'deletePage',
			description: 'Remove page and its children',
			action: 'Delete a page',
		},
		{
			name: 'Publish Page',
			value: 'publishPage',
			description: 'Publish page to publish instance',
			action: 'Publish a page',
		},
		{
			name: 'Unpublish Page',
			value: 'unpublishPage',
			description: 'Unpublish page from publish instance',
			action: 'Unpublish a page',
		},
	],
	default: 'getPages',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['graphQLQuery'],
    },
  },
  options: [
    {
      name: 'Execute GraphQL Query',
      value: 'executeGraphQLQuery',
      description: 'Execute a GraphQL query via POST',
      action: 'Execute GraphQL query',
    },
    {
      name: 'Execute GraphQL Query (GET)',
      value: 'executeGraphQLGet',
      description: 'Execute a GraphQL query via GET',
      action: 'Execute GraphQL query via GET',
    },
    {
      name: 'Get GraphQL Schema',
      value: 'getGraphQLSchema',
      description: 'Get the current GraphQL schema',
      action: 'Get GraphQL schema',
    },
    {
      name: 'Create Persisted Query',
      value: 'createPersistedQuery',
      description: 'Create a persisted GraphQL query',
      action: 'Create persisted query',
    },
    {
      name: 'Execute Persisted Query',
      value: 'getPersistedQuery',
      description: 'Execute a persisted GraphQL query',
      action: 'Execute persisted query',
    },
  ],
  default: 'executeGraphQLQuery',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['workflow'],
		},
	},
	options: [
		{
			name: 'Get Workflow Instances',
			value: 'getWorkflowInstances',
			description: 'List workflow instances',
			action: 'Get workflow instances',
		},
		{
			name: 'Get Workflow Instance',
			value: 'getWorkflowInstance',
			description: 'Get workflow instance details',
			action: 'Get workflow instance',
		},
		{
			name: 'Start Workflow',
			value: 'startWorkflow',
			description: 'Start new workflow instance',
			action: 'Start workflow',
		},
		{
			name: 'Update Workflow Instance',
			value: 'updateWorkflowInstance',
			description: 'Update workflow instance',
			action: 'Update workflow instance',
		},
		{
			name: 'Terminate Workflow',
			value: 'terminateWorkflow',
			description: 'Terminate workflow instance',
			action: 'Terminate workflow',
		},
		{
			name: 'Get Workflow Models',
			value: 'getWorkflowModels',
			description: 'List available workflow models',
			action: 'Get workflow models',
		},
		{
			name: 'Complete Work Item',
			value: 'completeWorkItem',
			description: 'Complete workflow work item',
			action: 'Complete work item',
		},
	],
	default: 'getWorkflowInstances',
},
{
	displayName: 'Asset Path',
	name: 'path',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['asset'],
			operation: ['getAsset', 'createAsset', 'updateAsset', 'deleteAsset', 'getAssetRenditions', 'createAssetRendition'],
		},
	},
	default: '',
	placeholder: '/content/dam/my-project/assets/image.jpg',
	description: 'The path to the asset in DAM',
},
{
	displayName: 'Root Path',
	name: 'path',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['asset'],
			operation: ['getAssets'],
		},
	},
	default: '/content/dam',
	placeholder: '/content/dam/my-project',
	description: 'The root path to search for assets',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['asset'],
			operation: ['getAssets'],
		},
	},
	default: 20,
	description: 'Maximum number of assets to return',
},
{
	displayName: 'Offset',
	name: 'offset',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['asset'],
			operation: ['getAssets'],
		},
	},
	default: 0,
	description: 'Number of assets to skip for pagination',
},
{
	displayName: 'Filter',
	name: 'filter',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['asset'],
			operation: ['getAssets'],
		},
	},
	default: '',
	placeholder: 'name LIKE "%image%"',
	description: 'JCR SQL2 filter expression',
},
{
	displayName: 'File',
	name: 'file',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['asset'],
			operation: ['createAsset'],
		},
	},
	default: '',
	description: 'Binary data or file path to upload',
},
{
	displayName: 'Metadata',
	name: 'metadata',
	type: 'collection',
	placeholder: 'Add Metadata',
	displayOptions: {
		show: {
			resource: ['asset'],
			operation: ['createAsset', 'updateAsset'],
		},
	},
	default: {},
	options: [
		{
			displayName: 'Title',
			name: 'dc:title',
			type: 'string',
			default: '',
			description: 'Asset title',
		},
		{
			displayName: 'Description',
			name: 'dc:description',
			type: 'string',
			default: '',
			description: 'Asset description',
		},
		{
			displayName: 'Creator',
			name: 'dc:creator',
			type: 'string',
			default: '',
			description: 'Asset creator',
		},
		{
			displayName: 'Keywords',
			name: 'dc:subject',
			type: 'string',
			default: '',
			description: 'Comma-separated keywords',
		},
	],
},
{
	displayName: 'Rendition Config',
	name: 'renditionConfig',
	type: 'collection',
	placeholder: 'Add Rendition Config',
	required: true,
	displayOptions: {
		show: {
			resource: ['asset'],
			operation: ['createAssetRendition'],
		},
	},
	default: {},
	options: [
		{
			displayName: 'Name',
			name: 'name',
			type: 'string',
			default: '',
			description: 'Rendition name',
		},
		{
			displayName: 'Width',
			name: 'width',
			type: 'number',
			default: 300,
			description: 'Rendition width in pixels',
		},
		{
			displayName: 'Height',
			name: 'height',
			type: 'number',
			default: 300,
			description: 'Rendition height in pixels',
		},
		{
			displayName: 'Quality',
			name: 'quality',
			type: 'number',
			default: 85,
			description: 'Image quality (1-100)',
		},
		{
			displayName: 'Format',
			name: 'format',
			type: 'options',
			options: [
				{ name: 'JPEG', value: 'jpeg' },
				{ name: 'PNG', value: 'png' },
				{ name: 'WebP', value: 'webp' },
			],
			default: 'jpeg',
			description: 'Output format',
		},
	],
},
{
	displayName: 'Model',
	name: 'model',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['contentFragment'],
			operation: ['getContentFragments'],
		},
	},
	default: '',
	description: 'Filter content fragments by model',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['contentFragment'],
			operation: ['getContentFragments'],
		},
	},
	default: 20,
	description: 'Maximum number of content fragments to return',
},
{
	displayName: 'Offset',
	name: 'offset',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['contentFragment'],
			operation: ['getContentFragments'],
		},
	},
	default: 0,
	description: 'Number of content fragments to skip',
},
{
	displayName: 'Path',
	name: 'path',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['contentFragment'],
			operation: ['getContentFragment', 'updateContentFragment', 'deleteContentFragment', 'getContentFragmentVariations', 'createContentFragmentVariation'],
		},
	},
	default: '',
	description: 'Path to the content fragment',
},
{
	displayName: 'Model',
	name: 'model',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['contentFragment'],
			operation: ['createContentFragment'],
		},
	},
	default: '',
	description: 'Content fragment model to use',
},
{
	displayName: 'Title',
	name: 'title',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['contentFragment'],
			operation: ['createContentFragment'],
		},
	},
	default: '',
	description: 'Title of the content fragment',
},
{
	displayName: 'Data',
	name: 'data',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['contentFragment'],
			operation: ['createContentFragment', 'updateContentFragment', 'createContentFragmentVariation'],
		},
	},
	default: '{}',
	description: 'Content fragment data as JSON object',
},
{
	displayName: 'Variation Name',
	name: 'variationName',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['contentFragment'],
			operation: ['createContentFragmentVariation'],
		},
	},
	default: '',
	description: 'Name of the content fragment variation',
},
{
	displayName: 'Path',
	name: 'path',
	type: 'string',
	default: '/content',
	required: true,
	displayOptions: {
		show: {
			resource: ['page'],
			operation: ['getPages'],
		},
	},
	description: 'Root path to list pages from',
},
{
	displayName: 'Depth',
	name: 'depth',
	type: 'number',
	default: 1,
	displayOptions: {
		show: {
			resource: ['page'],
			operation: ['getPages'],
		},
	},
	description: 'Depth of page hierarchy to retrieve',
},
{
	displayName: 'Filter',
	name: 'filter',
	type: 'string',
	default: '',
	displayOptions: {
		show: {
			resource: ['page'],
			operation: ['getPages'],
		},
	},
	description: 'Filter expression for pages',
},
{
	displayName: 'Page Path',
	name: 'pagePath',
	type: 'string',
	default: '',
	required: true,
	displayOptions: {
		show: {
			resource: ['page'],
			operation: ['getPage', 'updatePage', 'deletePage', 'publishPage', 'unpublishPage'],
		},
	},
	description: 'Path to the specific page',
},
{
	displayName: 'Parent Path',
	name: 'parentPath',
	type: 'string',
	default: '/content',
	required: true,
	displayOptions: {
		show: {
			resource: ['page'],
			operation: ['createPage'],
		},
	},
	description: 'Parent path where the new page will be created',
},
{
	displayName: 'Template',
	name: 'template',
	type: 'string',
	default: '',
	required: true,
	displayOptions: {
		show: {
			resource: ['page'],
			operation: ['createPage'],
		},
	},
	description: 'Template path for the new page',
},
{
	displayName: 'Title',
	name: 'title',
	type: 'string',
	default: '',
	required: true,
	displayOptions: {
		show: {
			resource: ['page'],
			operation: ['createPage'],
		},
	},
	description: 'Title of the new page',
},
{
	displayName: 'Name',
	name: 'name',
	type: 'string',
	default: '',
	required: true,
	displayOptions: {
		show: {
			resource: ['page'],
			operation: ['createPage'],
		},
	},
	description: 'Node name of the new page',
},
{
	displayName: 'Properties',
	name: 'properties',
	type: 'json',
	default: '{}',
	displayOptions: {
		show: {
			resource: ['page'],
			operation: ['updatePage'],
		},
	},
	description: 'Page properties to update as JSON object',
},
{
	displayName: 'Force Delete',
	name: 'force',
	type: 'boolean',
	default: false,
	displayOptions: {
		show: {
			resource: ['page'],
			operation: ['deletePage'],
		},
	},
	description: 'Whether to force delete page and its children',
},
{
	displayName: 'Deep Publish',
	name: 'deep',
	type: 'boolean',
	default: false,
	displayOptions: {
		show: {
			resource: ['page'],
			operation: ['publishPage', 'unpublishPage'],
		},
	},
	description: 'Whether to publish/unpublish child pages as well',
},
{
  displayName: 'GraphQL Query',
  name: 'query',
  type: 'string',
  typeOptions: {
    editor: 'code',
    editorLanguage: 'graphql',
  },
  required: true,
  displayOptions: {
    show: {
      resource: ['graphQLQuery'],
      operation: ['executeGraphQLQuery', 'executeGraphQLGet'],
    },
  },
  default: '',
  description: 'The GraphQL query to execute',
},
{
  displayName: 'Variables',
  name: 'variables',
  type: 'json',
  required: false,
  displayOptions: {
    show: {
      resource: ['graphQLQuery'],
      operation: ['executeGraphQLQuery', 'executeGraphQLGet', 'getPersistedQuery'],
    },
  },
  default: '{}',
  description: 'Variables to pass to the GraphQL query',
},
{
  displayName: 'Query Name',
  name: 'queryName',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['graphQLQuery'],
      operation: ['createPersistedQuery', 'getPersistedQuery'],
    },
  },
  default: '',
  description: 'Name for the persisted query',
},
{
  displayName: 'Query Definition',
  name: 'query',
  type: 'string',
  typeOptions: {
    editor: 'code',
    editorLanguage: 'graphql',
  },
  required: true,
  displayOptions: {
    show: {
      resource: ['graphQLQuery'],
      operation: ['createPersistedQuery'],
    },
  },
  default: '',
  description: 'The GraphQL query definition to persist',
},
{
	displayName: 'Status',
	name: 'status',
	type: 'options',
	displayOptions: {
		show: {
			resource: ['workflow'],
			operation: ['getWorkflowInstances'],
		},
	},
	options: [
		{
			name: 'All',
			value: '',
		},
		{
			name: 'Running',
			value: 'RUNNING',
		},
		{
			name: 'Completed',
			value: 'COMPLETED',
		},
		{
			name: 'Aborted',
			value: 'ABORTED',
		},
		{
			name: 'Suspended',
			value: 'SUSPENDED',
		},
	],
	default: '',
	description: 'Filter workflow instances by status',
},
{
	displayName: 'Model',
	name: 'model',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['workflow'],
			operation: ['getWorkflowInstances'],
		},
	},
	default: '',
	description: 'Filter by workflow model path',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['workflow'],
			operation: ['getWorkflowInstances'],
		},
	},
	default: 100,
	description: 'Maximum number of workflow instances to return',
	typeOptions: {
		minValue: 1,
		maxValue: 1000,
	},
},
{
	displayName: 'Instance ID',
	name: 'instanceId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['workflow'],
			operation: ['getWorkflowInstance', 'updateWorkflowInstance', 'terminateWorkflow', 'completeWorkItem'],
		},
	},
	default: '',
	description: 'The workflow instance ID',
},
{
	displayName: 'Model',
	name: 'model',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['workflow'],
			operation: ['startWorkflow'],
		},
	},
	default: '',
	description: 'Path to the workflow model (e.g., /var/workflow/models/dam/update_asset)',
},
{
	displayName: 'Payload',
	name: 'payload',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['workflow'],
			operation: ['startWorkflow'],
		},
	},
	default: '',
	description: 'The payload path or resource for the workflow',
},
{
	displayName: 'Title',
	name: 'title',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['workflow'],
			operation: ['startWorkflow'],
		},
	},
	default: '',
	description: 'Optional title for the workflow instance',
},
{
	displayName: 'Action',
	name: 'action',
	type: 'options',
	required: true,
	displayOptions: {
		show: {
			resource: ['workflow'],
			operation: ['updateWorkflowInstance'],
		},
	},
	options: [
		{
			name: 'Suspend',
			value: 'suspend',
		},
		{
			name: 'Resume',
			value: 'resume',
		},
		{
			name: 'Restart',
			value: 'restart',
		},
	],
	default: 'suspend',
	description: 'Action to perform on the workflow instance',
},
{
	displayName: 'Work Item ID',
	name: 'workitemId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['workflow'],
			operation: ['completeWorkItem'],
		},
	},
	default: '',
	description: 'The work item ID to complete',
},
{
	displayName: 'Route',
	name: 'route',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['workflow'],
			operation: ['completeWorkItem'],
		},
	},
	default: '',
	description: 'The route to take when completing the work item',
},
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const resource = this.getNodeParameter('resource', 0) as string;

    switch (resource) {
      case 'asset':
        return [await executeAssetOperations.call(this, items)];
      case 'contentFragment':
        return [await executeContentFragmentOperations.call(this, items)];
      case 'page':
        return [await executePageOperations.call(this, items)];
      case 'graphQLQuery':
        return [await executeGraphQLQueryOperations.call(this, items)];
      case 'workflow':
        return [await executeWorkflowOperations.call(this, items)];
      default:
        throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not supported`);
    }
  }
}

// ============================================================
// Resource Handler Functions
// ============================================================

async function executeAssetOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('adobeexperiencemanagerApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			const baseHeaders = {
				'Authorization': `Bearer ${credentials.accessToken}`,
				'Content-Type': 'application/json',
			};

			switch (operation) {
				case 'getAssets': {
					const path = this.getNodeParameter('path', i) as string;
					const limit = this.getNodeParameter('limit', i) as number;
					const offset = this.getNodeParameter('offset', i) as number;
					const filter = this.getNodeParameter('filter', i) as string;

					let url = `${credentials.baseUrl}/api/assets.json?path=${encodeURIComponent(path)}&limit=${limit}&offset=${offset}`;
					if (filter) {
						url += `&filter=${encodeURIComponent(filter)}`;
					}

					const options = {
						method: 'GET',
						url,
						headers: baseHeaders,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getAsset': {
					const path = this.getNodeParameter('path', i) as string;

					const options = {
						method: 'GET',
						url: `${credentials.baseUrl}/api/assets${path}.json`,
						headers: baseHeaders,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'createAsset': {
					const path = this.getNodeParameter('path', i) as string;
					const file = this.getNodeParameter('file', i) as string;
					const metadata = this.getNodeParameter('metadata', i) as any;

					const formData = {
						file: file,
						fileName: path.split('/').pop(),
						...metadata,
					};

					const options = {
						method: 'POST',
						url: `${credentials.baseUrl}/api/assets${path}`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
						},
						formData,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'updateAsset': {
					const path = this.getNodeParameter('path', i) as string;
					const metadata = this.getNodeParameter('metadata', i) as any;

					const options = {
						method: 'PUT',
						url: `${credentials.baseUrl}/api/assets${path}`,
						headers: baseHeaders,
						body: { metadata },
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'deleteAsset': {
					const path = this.getNodeParameter('path', i) as string;

					const options = {
						method: 'DELETE',
						url: `${credentials.baseUrl}/api/assets${path}`,
						headers: baseHeaders,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getAssetRenditions': {
					const path = this.getNodeParameter('path', i) as string;

					const options = {
						method: 'GET',
						url: `${credentials.baseUrl}/api/assets${path}/renditions.json`,
						headers: baseHeaders,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'createAssetRendition': {
					const path = this.getNodeParameter('path', i) as string;
					const renditionConfig = this.getNodeParameter('renditionConfig', i) as any;

					const options = {
						method: 'POST',
						url: `${credentials.baseUrl}/api/assets${path}/renditions`,
						headers: baseHeaders,
						body: renditionConfig,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(
						this.getNode(),
						`The operation "${operation}" is not known!`,
					);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});
		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeContentFragmentOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('adobeexperiencemanagerApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getContentFragments': {
					const model = this.getNodeParameter('model', i) as string;
					const limit = this.getNodeParameter('limit', i) as number;
					const offset = this.getNodeParameter('offset', i) as number;

					const params = new URLSearchParams();
					if (model) params.append('model', model);
					params.append('limit', limit.toString());
					params.append('offset', offset.toString());

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/api/assets/content-fragments?${params.toString()}`,
						headers: {
							Authorization: `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getContentFragment': {
					const path = this.getNodeParameter('path', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/api/assets/content-fragments/${encodeURIComponent(path)}`,
						headers: {
							Authorization: `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'createContentFragment': {
					const model = this.getNodeParameter('model', i) as string;
					const title = this.getNodeParameter('title', i) as string;
					const data = this.getNodeParameter('data', i) as object;

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/api/assets/content-fragments`,
						headers: {
							Authorization: `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						body: {
							model,
							title,
							data,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'updateContentFragment': {
					const path = this.getNodeParameter('path', i) as string;
					const data = this.getNodeParameter('data', i) as object;

					const options: any = {
						method: 'PUT',
						url: `${credentials.baseUrl}/api/assets/content-fragments/${encodeURIComponent(path)}`,
						headers: {
							Authorization: `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						body: {
							data,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'deleteContentFragment': {
					const path = this.getNodeParameter('path', i) as string;

					const options: any = {
						method: 'DELETE',
						url: `${credentials.baseUrl}/api/assets/content-fragments/${encodeURIComponent(path)}`,
						headers: {
							Authorization: `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getContentFragmentVariations': {
					const path = this.getNodeParameter('path', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/api/assets/content-fragments/${encodeURIComponent(path)}/variations`,
						headers: {
							Authorization: `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'createContentFragmentVariation': {
					const path = this.getNodeParameter('path', i) as string;
					const variationName = this.getNodeParameter('variationName', i) as string;
					const data = this.getNodeParameter('data', i) as object;

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/api/assets/content-fragments/${encodeURIComponent(path)}/variations`,
						headers: {
							Authorization: `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						body: {
							variationName,
							data,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});
		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executePageOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('adobeexperiencemanagerApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			const baseUrl = `https://author-p${credentials.programId}-e${credentials.environmentId}.adobeaemcloud.com`;
			const headers = {
				'Authorization': `Bearer ${credentials.accessToken}`,
				'Content-Type': 'application/json',
			};

			switch (operation) {
				case 'getPages': {
					const path = this.getNodeParameter('path', i) as string;
					const depth = this.getNodeParameter('depth', i) as number;
					const filter = this.getNodeParameter('filter', i) as string;

					const queryParams = new URLSearchParams();
					if (depth) queryParams.append('depth', depth.toString());
					if (filter) queryParams.append('filter', filter);

					const options: any = {
						method: 'GET',
						url: `${baseUrl}/api/sites/pages?path=${encodeURIComponent(path)}&${queryParams.toString()}`,
						headers,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getPage': {
					const pagePath = this.getNodeParameter('pagePath', i) as string;

					const options: any = {
						method: 'GET',
						url: `${baseUrl}/api/sites/pages/${encodeURIComponent(pagePath)}`,
						headers,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'createPage': {
					const parentPath = this.getNodeParameter('parentPath', i) as string;
					const template = this.getNodeParameter('template', i) as string;
					const title = this.getNodeParameter('title', i) as string;
					const name = this.getNodeParameter('name', i) as string;

					const body = {
						parentPath,
						template,
						title,
						name,
					};

					const options: any = {
						method: 'POST',
						url: `${baseUrl}/api/sites/pages`,
						headers,
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'updatePage': {
					const pagePath = this.getNodeParameter('pagePath', i) as string;
					const properties = this.getNodeParameter('properties', i) as string;

					let parsedProperties: any;
					try {
						parsedProperties = JSON.parse(properties);
					} catch (error: any) {
						throw new NodeOperationError(this.getNode(), `Invalid JSON in properties: ${error.message}`);
					}

					const options: any = {
						method: 'PUT',
						url: `${baseUrl}/api/sites/pages/${encodeURIComponent(pagePath)}`,
						headers,
						body: { properties: parsedProperties },
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'deletePage': {
					const pagePath = this.getNodeParameter('pagePath', i) as string;
					const force = this.getNodeParameter('force', i) as boolean;

					const queryParams = force ? '?force=true' : '';

					const options: any = {
						method: 'DELETE',
						url: `${baseUrl}/api/sites/pages/${encodeURIComponent(pagePath)}${queryParams}`,
						headers,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'publishPage': {
					const pagePath = this.getNodeParameter('pagePath', i) as string;
					const deep = this.getNodeParameter('deep', i) as boolean;

					const body = { deep };

					const options: any = {
						method: 'POST',
						url: `${baseUrl}/api/sites/pages/${encodeURIComponent(pagePath)}/publish`,
						headers,
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'unpublishPage': {
					const pagePath = this.getNodeParameter('pagePath', i) as string;
					const deep = this.getNodeParameter('deep', i) as boolean;

					const body = { deep };

					const options: any = {
						method: 'POST',
						url: `${baseUrl}/api/sites/pages/${encodeURIComponent(pagePath)}/unpublish`,
						headers,
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});

		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeGraphQLQueryOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('adobeexperiencemanagerApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'executeGraphQLQuery': {
          const query = this.getNodeParameter('query', i) as string;
          const variables = this.getNodeParameter('variables', i, '{}') as string;

          const body: any = {
            query,
          };

          if (variables && variables !== '{}') {
            body.variables = typeof variables === 'string' ? JSON.parse(variables) : variables;
          }

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/content/graphql/global/endpoint.json`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'executeGraphQLGet': {
          const query = this.getNodeParameter('query', i) as string;
          const variables = this.getNodeParameter('variables', i, '{}') as string;

          const queryParams: any = {
            query,
          };

          if (variables && variables !== '{}') {
            const parsedVariables = typeof variables === 'string' ? JSON.parse(variables) : variables;
            queryParams.variables = JSON.stringify(parsedVariables);
          }

          const url = new URL(`${credentials.baseUrl}/content/graphql/global/endpoint.json`);
          Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]));

          const options: any = {
            method: 'GET',
            url: url.toString(),
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getGraphQLSchema': {
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/content/graphql/global/endpoint.json/schema.json`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'createPersistedQuery': {
          const queryName = this.getNodeParameter('queryName', i) as string;
          const query = this.getNodeParameter('query', i) as string;

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/content/graphql/global/endpoint.json/persisted-queries`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            body: {
              queryName,
              query,
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getPersistedQuery': {
          const queryName = this.getNodeParameter('queryName', i) as string;
          const variables = this.getNodeParameter('variables', i, '{}') as string;

          let url = `${credentials.baseUrl}/content/graphql/global/endpoint.json/persisted-queries/${queryName}`;

          if (variables && variables !== '{}') {
            const parsedVariables = typeof variables === 'string' ? JSON.parse(variables) : variables;
            const urlObj = new URL(url);
            urlObj.searchParams.append('variables', JSON.stringify(parsedVariables));
            url = urlObj.toString();
          }

          const options: any = {
            method: 'GET',
            url,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({
        json: result,
        pairedItem: { item: i },
      });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error.message },
          pairedItem: { item: i },
        });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeWorkflowOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('adobeexperiencemanagerApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			const baseUrl = credentials.baseUrl || `https://author-p${credentials.programId}-e${credentials.environmentId}.adobeaemcloud.com`;
			const headers = {
				'Authorization': `Bearer ${credentials.accessToken}`,
				'Content-Type': 'application/json',
			};

			switch (operation) {
				case 'getWorkflowInstances': {
					const status = this.getNodeParameter('status', i) as string;
					const model = this.getNodeParameter('model', i) as string;
					const limit = this.getNodeParameter('limit', i) as number;

					let url = `${baseUrl}/api/workflow/instances?limit=${limit}`;
					if (status) {
						url += `&status=${status}`;
					}
					if (model) {
						url += `&model=${encodeURIComponent(model)}`;
					}

					const options: any = {
						method: 'GET',
						url,
						headers,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getWorkflowInstance': {
					const instanceId = this.getNodeParameter('instanceId', i) as string;

					const options: any = {
						method: 'GET',
						url: `${baseUrl}/api/workflow/instances/${instanceId}`,
						headers,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'startWorkflow': {
					const model = this.getNodeParameter('model', i) as string;
					const payload = this.getNodeParameter('payload', i) as string;
					const title = this.getNodeParameter('title', i) as string;

					const body: any = {
						model,
						payload,
					};

					if (title) {
						body.title = title;
					}

					const options: any = {
						method: 'POST',
						url: `${baseUrl}/api/workflow/instances`,
						headers,
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'updateWorkflowInstance': {
					const instanceId = this.getNodeParameter('instanceId', i) as string;
					const action = this.getNodeParameter('action', i) as string;

					const body = {
						action,
					};

					const options: any = {
						method: 'PUT',
						url: `${baseUrl}/api/workflow/instances/${instanceId}`,
						headers,
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'terminateWorkflow': {
					const instanceId = this.getNodeParameter('instanceId', i) as string;

					const options: any = {
						method: 'DELETE',
						url: `${baseUrl}/api/workflow/instances/${instanceId}`,
						headers,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getWorkflowModels': {
					const options: any = {
						method: 'GET',
						url: `${baseUrl}/api/workflow/models`,
						headers,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'completeWorkItem': {
					const instanceId = this.getNodeParameter('instanceId', i) as string;
					const workitemId = this.getNodeParameter('workitemId', i) as string;
					const route = this.getNodeParameter('route', i) as string;

					const body: any = {};
					if (route) {
						body.route = route;
					}

					const options: any = {
						method: 'POST',
						url: `${baseUrl}/api/workflow/instances/${instanceId}/workitems/${workitemId}`,
						headers,
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(
						this.getNode(),
						`Unknown operation: ${operation}`,
						{ itemIndex: i },
					);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});
		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}
