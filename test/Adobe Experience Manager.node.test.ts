/**
 * Copyright (c) 2026 Velocity BPA
 * Licensed under the Business Source License 1.1
 */

import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { AdobeExperienceManager } from '../nodes/Adobe Experience Manager/Adobe Experience Manager.node';

// Mock n8n-workflow
jest.mock('n8n-workflow', () => ({
  ...jest.requireActual('n8n-workflow'),
  NodeApiError: class NodeApiError extends Error {
    constructor(node: any, error: any) { super(error.message || 'API Error'); }
  },
  NodeOperationError: class NodeOperationError extends Error {
    constructor(node: any, message: string) { super(message); }
  },
}));

describe('AdobeExperienceManager Node', () => {
  let node: AdobeExperienceManager;

  beforeAll(() => {
    node = new AdobeExperienceManager();
  });

  describe('Node Definition', () => {
    it('should have correct basic properties', () => {
      expect(node.description.displayName).toBe('Adobe Experience Manager');
      expect(node.description.name).toBe('adobeexperiencemanager');
      expect(node.description.version).toBe(1);
      expect(node.description.inputs).toContain('main');
      expect(node.description.outputs).toContain('main');
    });

    it('should define 6 resources', () => {
      const resourceProp = node.description.properties.find(
        (p: any) => p.name === 'resource'
      );
      expect(resourceProp).toBeDefined();
      expect(resourceProp!.type).toBe('options');
      expect(resourceProp!.options).toHaveLength(6);
    });

    it('should have operation dropdowns for each resource', () => {
      const operations = node.description.properties.filter(
        (p: any) => p.name === 'operation'
      );
      expect(operations.length).toBe(6);
    });

    it('should require credentials', () => {
      expect(node.description.credentials).toBeDefined();
      expect(node.description.credentials!.length).toBeGreaterThan(0);
      expect(node.description.credentials![0].required).toBe(true);
    });

    it('should have parameters with proper displayOptions', () => {
      const params = node.description.properties.filter(
        (p: any) => p.displayOptions?.show?.resource
      );
      for (const param of params) {
        expect(param.displayOptions.show.resource).toBeDefined();
        expect(Array.isArray(param.displayOptions.show.resource)).toBe(true);
      }
    });
  });

  // Resource-specific tests
describe('Assets Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        bearerToken: 'test-token',
        baseUrl: 'https://author-instance.adobeaemcloud.com/api'
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { httpRequest: jest.fn(), requestWithAuthentication: jest.fn() },
    };
  });

  it('should list assets successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('listAssets')
      .mockReturnValueOnce('/content/dam')
      .mockReturnValueOnce(20)
      .mockReturnValueOnce(0);

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      assets: [{ path: '/content/dam/asset1.jpg', title: 'Asset 1' }]
    });

    const result = await executeAssetsOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json.assets).toBeDefined();
  });

  it('should handle listAssets error', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValue('listAssets');
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);

    const result = await executeAssetsOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result[0].json.error).toBe('API Error');
  });

  it('should create asset successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('createAsset')
      .mockReturnValueOnce('test-asset.jpg')
      .mockReturnValueOnce('binary-data')
      .mockReturnValueOnce('{"title":"Test Asset"}');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      path: '/content/dam/test-asset.jpg',
      status: 'created'
    });

    const result = await executeAssetsOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json.status).toBe('created');
  });

  it('should get asset successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getAsset')
      .mockReturnValueOnce('test-asset.jpg');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      path: '/content/dam/test-asset.jpg',
      metadata: { title: 'Test Asset' }
    });

    const result = await executeAssetsOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json.path).toBe('/content/dam/test-asset.jpg');
  });

  it('should update asset successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('updateAsset')
      .mockReturnValueOnce('test-asset.jpg')
      .mockReturnValueOnce('{"title":"Updated Asset"}');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      path: '/content/dam/test-asset.jpg',
      status: 'updated'
    });

    const result = await executeAssetsOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json.status).toBe('updated');
  });

  it('should delete asset successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('deleteAsset')
      .mockReturnValueOnce('test-asset.jpg');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      status: 'deleted'
    });

    const result = await executeAssetsOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json.status).toBe('deleted');
  });

  it('should get renditions successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getRenditions')
      .mockReturnValueOnce('test-asset.jpg');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      renditions: [
        { name: 'original', size: '1920x1080' },
        { name: 'thumbnail', size: '150x150' }
      ]
    });

    const result = await executeAssetsOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json.renditions).toHaveLength(2);
  });
});

describe('ContentFragments Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				token: 'test-token',
				baseUrl: 'https://author-test.adobeaemcloud.com/api',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	describe('listContentFragments', () => {
		it('should list content fragments successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('listContentFragments')
				.mockReturnValueOnce('/content/dam/test')
				.mockReturnValueOnce('')
				.mockReturnValueOnce(20);

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
				entities: [{ path: '/content/dam/test/fragment1' }],
			});

			const result = await executeContentFragmentsOperations.call(
				mockExecuteFunctions,
				[{ json: {} }],
			);

			expect(result).toHaveLength(1);
			expect(result[0].json.entities).toHaveLength(1);
		});

		it('should handle list content fragments error', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('listContentFragments')
				.mockReturnValueOnce('/content/dam/test')
				.mockReturnValueOnce('')
				.mockReturnValueOnce(20);

			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeContentFragmentsOperations.call(
				mockExecuteFunctions,
				[{ json: {} }],
			);

			expect(result).toHaveLength(1);
			expect(result[0].json.error).toBe('API Error');
		});
	});

	describe('createContentFragment', () => {
		it('should create content fragment successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('createContentFragment')
				.mockReturnValueOnce('/content/dam/test/new-fragment')
				.mockReturnValueOnce('/conf/test/settings/dam/cfm/models/test-model')
				.mockReturnValueOnce('{"title": "Test Fragment", "description": "Test description"}');

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
				path: '/content/dam/test/new-fragment',
				created: true,
			});

			const result = await executeContentFragmentsOperations.call(
				mockExecuteFunctions,
				[{ json: {} }],
			);

			expect(result).toHaveLength(1);
			expect(result[0].json.created).toBe(true);
		});

		it('should handle invalid JSON in elements', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('createContentFragment')
				.mockReturnValueOnce('/content/dam/test/new-fragment')
				.mockReturnValueOnce('/conf/test/settings/dam/cfm/models/test-model')
				.mockReturnValueOnce('invalid json');

			await expect(
				executeContentFragmentsOperations.call(mockExecuteFunctions, [{ json: {} }]),
			).rejects.toThrow('Invalid JSON in elements parameter');
		});
	});

	describe('getContentFragment', () => {
		it('should get content fragment successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getContentFragment')
				.mockReturnValueOnce('/content/dam/test/fragment');

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
				path: '/content/dam/test/fragment',
				properties: { title: 'Test Fragment' },
			});

			const result = await executeContentFragmentsOperations.call(
				mockExecuteFunctions,
				[{ json: {} }],
			);

			expect(result).toHaveLength(1);
			expect(result[0].json.path).toBe('/content/dam/test/fragment');
		});
	});

	describe('updateContentFragment', () => {
		it('should update content fragment successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('updateContentFragment')
				.mockReturnValueOnce('/content/dam/test/fragment')
				.mockReturnValueOnce('{"title": "Updated Fragment"}');

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
				path: '/content/dam/test/fragment',
				updated: true,
			});

			const result = await executeContentFragmentsOperations.call(
				mockExecuteFunctions,
				[{ json: {} }],
			);

			expect(result).toHaveLength(1);
			expect(result[0].json.updated).toBe(true);
		});
	});

	describe('deleteContentFragment', () => {
		it('should delete content fragment successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('deleteContentFragment')
				.mockReturnValueOnce('/content/dam/test/fragment');

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
				deleted: true,
			});

			const result = await executeContentFragmentsOperations.call(
				mockExecuteFunctions,
				[{ json: {} }],
			);

			expect(result).toHaveLength(1);
			expect(result[0].json.deleted).toBe(true);
		});
	});

	describe('getVariations', () => {
		it('should get fragment variations successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getVariations')
				.mockReturnValueOnce('/content/dam/test/fragment');

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
				variations: ['master', 'variation1', 'variation2'],
			});

			const result = await executeContentFragmentsOperations.call(
				mockExecuteFunctions,
				[{ json: {} }],
			);

			expect(result).toHaveLength(1);
			expect(result[0].json.variations).toHaveLength(3);
		});
	});
});

describe('Content Fragment Models Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				accessToken: 'test-token',
				baseUrl: 'https://author-instance.adobeaemcloud.com/api',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
				requestWithAuthentication: jest.fn(),
			},
		};
	});

	it('should list content fragment models successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
			if (param === 'operation') return 'listModels';
			if (param === 'config') return 'global';
			return undefined;
		});

		const mockResponse = {
			models: [
				{ name: 'article', title: 'Article Model' },
				{ name: 'product', title: 'Product Model' },
			],
		};
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

		const result = await executeContentFragmentModelsOperations.call(
			mockExecuteFunctions,
			[{ json: {} }],
		);

		expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'GET',
			url: 'https://author-instance.adobeaemcloud.com/api/conf/global/settings/dam/cfm/models.json',
			headers: {
				Authorization: 'Bearer test-token',
				'Content-Type': 'application/json',
			},
			json: true,
		});
	});

	it('should create content fragment model successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
			if (param === 'operation') return 'createModel';
			if (param === 'config') return 'global';
			if (param === 'title') return 'New Article Model';
			if (param === 'elements') return [{ name: 'title', type: 'text' }];
			return undefined;
		});

		const mockResponse = { success: true, id: 'new-article-model' };
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

		const result = await executeContentFragmentModelsOperations.call(
			mockExecuteFunctions,
			[{ json: {} }],
		);

		expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
	});

	it('should handle errors gracefully when continueOnFail is true', async () => {
		mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
			if (param === 'operation') return 'getModel';
			if (param === 'config') return 'global';
			if (param === 'model') return 'nonexistent';
			return undefined;
		});

		mockExecuteFunctions.continueOnFail.mockReturnValue(true);
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Model not found'));

		const result = await executeContentFragmentModelsOperations.call(
			mockExecuteFunctions,
			[{ json: {} }],
		);

		expect(result).toEqual([{ json: { error: 'Model not found' }, pairedItem: { item: 0 } }]);
	});
});

describe('Pages Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        bearerToken: 'test-token',
        baseUrl: 'https://author-instance.adobeaemcloud.com/api'
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn()
      },
    };
  });

  it('should list pages successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('listPages')
      .mockReturnValueOnce('/content/mysite')
      .mockReturnValueOnce(2)
      .mockReturnValueOnce('');

    const mockResponse = { pages: [{ title: 'Test Page' }] };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executePagesOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{
      json: mockResponse,
      pairedItem: { item: 0 }
    }]);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://author-instance.adobeaemcloud.com/api/content/content/mysite.pages.json?depth=2',
      headers: {
        'Authorization': 'Bearer test-token',
        'Content-Type': 'application/json',
      },
      json: true,
    });
  });

  it('should create page successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('createPage')
      .mockReturnValueOnce('/content/mysite/newpage')
      .mockReturnValueOnce('/apps/myapp/templates/page')
      .mockReturnValueOnce('New Page')
      .mockReturnValueOnce({ property: [{ name: 'description', value: 'Test description' }] });

    const mockResponse = { path: '/content/mysite/newpage' };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executePagesOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{
      json: mockResponse,
      pairedItem: { item: 0 }
    }]);
  });

  it('should handle errors when continue on fail is enabled', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getPage');
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

    const result = await executePagesOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{
      json: { error: 'API Error' },
      pairedItem: { item: 0 }
    }]);
  });

  it('should throw error when continue on fail is disabled', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getPage');
    mockExecuteFunctions.continueOnFail.mockReturnValue(false);
    const error = new Error('API Error');
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(error);

    await expect(executePagesOperations.call(mockExecuteFunctions, [{ json: {} }])).rejects.toThrow('API Error');
  });
});

describe('Workflows Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				accessToken: 'test-token',
				baseUrl: 'https://author-test.adobeaemcloud.com/api',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	it('should list workflows successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('listWorkflows')
			.mockReturnValueOnce('RUNNING')
			.mockReturnValueOnce('/etc/workflow/models/dam/update_asset');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			workflows: [{ id: 'wf-123', status: 'RUNNING' }],
		});

		const result = await executeWorkflowsOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'GET',
			url: 'https://author-test.adobeaemcloud.com/api/etc/workflow/instances.json?status=RUNNING&model=%2Fetc%2Fworkflow%2Fmodels%2Fdam%2Fupdate_asset',
			headers: {
				'Authorization': 'Bearer test-token',
				'Accept': 'application/json',
			},
			json: true,
		});

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual({ workflows: [{ id: 'wf-123', status: 'RUNNING' }] });
	});

	it('should start workflow successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('startWorkflow')
			.mockReturnValueOnce('/etc/workflow/models/dam/update_asset')
			.mockReturnValueOnce('/content/dam/test.jpg')
			.mockReturnValueOnce('Test Workflow');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			id: 'wf-456',
			status: 'RUNNING',
		});

		const result = await executeWorkflowsOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'POST',
			url: 'https://author-test.adobeaemcloud.com/api/etc/workflow/instances',
			headers: {
				'Authorization': 'Bearer test-token',
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			body: {
				model: '/etc/workflow/models/dam/update_asset',
				payloadPath: '/content/dam/test.jpg',
				title: 'Test Workflow',
			},
			json: true,
		});

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual({ id: 'wf-456', status: 'RUNNING' });
	});

	it('should get workflow successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getWorkflow')
			.mockReturnValueOnce('wf-123');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			id: 'wf-123',
			status: 'RUNNING',
			model: '/etc/workflow/models/dam/update_asset',
		});

		const result = await executeWorkflowsOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'GET',
			url: 'https://author-test.adobeaemcloud.com/api/etc/workflow/instances/wf-123',
			headers: {
				'Authorization': 'Bearer test-token',
				'Accept': 'application/json',
			},
			json: true,
		});

		expect(result).toHaveLength(1);
		expect(result[0].json.id).toBe('wf-123');
	});

	it('should advance workflow successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('advanceWorkflow')
			.mockReturnValueOnce('wf-123')
			.mockReturnValueOnce('approve');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			id: 'wf-123',
			status: 'RUNNING',
		});

		const result = await executeWorkflowsOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'POST',
			url: 'https://author-test.adobeaemcloud.com/api/etc/workflow/instances/wf-123',
			headers: {
				'Authorization': 'Bearer test-token',
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			body: {
				route: 'approve',
			},
			json: true,
		});

		expect(result).toHaveLength(1);
		expect(result[0].json.id).toBe('wf-123');
	});

	it('should terminate workflow successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('terminateWorkflow')
			.mockReturnValueOnce('wf-123');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			success: true,
		});

		const result = await executeWorkflowsOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'DELETE',
			url: 'https://author-test.adobeaemcloud.com/api/etc/workflow/instances/wf-123',
			headers: {
				'Authorization': 'Bearer test-token',
				'Accept': 'application/json',
			},
			json: true,
		});

		expect(result).toHaveLength(1);
		expect(result[0].json.success).toBe(true);
	});

	it('should list workflow models successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('listWorkflowModels');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			models: [
				{ path: '/etc/workflow/models/dam/update_asset', title: 'DAM Update Asset' },
			],
		});

		const result = await executeWorkflowsOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'GET',
			url: 'https://author-test.adobeaemcloud.com/api/etc/workflow/models.json',
			headers: {
				'Authorization': 'Bearer test-token',
				'Accept': 'application/json',
			},
			json: true,
		});

		expect(result).toHaveLength(1);
		expect(result[0].json.models).toHaveLength(1);
	});

	it('should handle errors gracefully', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getWorkflow');
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
		mockExecuteFunctions.continueOnFail.mockReturnValue(true);

		const result = await executeWorkflowsOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json.error).toBe('API Error');
	});
});

describe('GraphQL Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ 
        bearerToken: 'test-bearer-token', 
        baseUrl: 'https://author-test.adobeaemcloud.com/api' 
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { 
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn() 
      },
    };
  });

  it('should execute GraphQL query via POST', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('executeQuery')
      .mockReturnValueOnce('my-endpoint')
      .mockReturnValueOnce('query { contentFragmentList { items { _path } } }')
      .mockReturnValueOnce('{}');

    const mockResponse = { data: { contentFragmentList: { items: [] } } };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeGraphQLOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'POST',
      url: 'https://author-test.adobeaemcloud.com/api/content/_cq_graphql/my-endpoint/endpoint.json',
      headers: {
        'Authorization': 'Bearer test-bearer-token',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        query: 'query { contentFragmentList { items { _path } } }', 
        variables: {} 
      }),
      json: true,
    });
    expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
  });

  it('should execute GraphQL query via GET', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('executeGetQuery')
      .mockReturnValueOnce('my-endpoint')
      .mockReturnValueOnce('query { contentFragmentList { items { _path } } }')
      .mockReturnValueOnce('{"limit": 10}');

    const mockResponse = { data: { contentFragmentList: { items: [] } } };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeGraphQLOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://author-test.adobeaemcloud.com/api/content/_cq_graphql/my-endpoint/endpoint.json?query=query+%7B+contentFragmentList+%7B+items+%7B+_path+%7D+%7D+%7D&variables=%7B%22limit%22%3A10%7D',
      headers: {
        'Authorization': 'Bearer test-bearer-token',
      },
      json: true,
    });
    expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
  });

  it('should get GraphQL schema', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getSchema')
      .mockReturnValueOnce('my-endpoint');

    const mockResponse = { data: { __schema: { types: [] } } };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeGraphQLOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://author-test.adobeaemcloud.com/api/content/_cq_graphql/my-endpoint.json/schema.json',
      headers: {
        'Authorization': 'Bearer test-bearer-token',
      },
      json: true,
    });
    expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
  });

  it('should execute global GraphQL query', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('executeGlobalQuery')
      .mockReturnValueOnce('query { contentFragmentList { items { _path } } }')
      .mockReturnValueOnce('{}');

    const mockResponse = { data: { contentFragmentList: { items: [] } } };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeGraphQLOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'POST',
      url: 'https://author-test.adobeaemcloud.com/api/content/graphql/global/endpoint.json',
      headers: {
        'Authorization': 'Bearer test-bearer-token',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        query: 'query { contentFragmentList { items { _path } } }', 
        variables: {} 
      }),
      json: true,
    });
    expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
  });

  it('should handle API errors', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('executeQuery')
      .mockReturnValueOnce('my-endpoint')
      .mockReturnValueOnce('invalid query')
      .mockReturnValueOnce('{}');

    const error = new Error('GraphQL syntax error');
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(error);

    await expect(
      executeGraphQLOperations.call(mockExecuteFunctions, [{ json: {} }])
    ).rejects.toThrow('GraphQL syntax error');
  });

  it('should handle invalid JSON variables', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('executeQuery')
      .mockReturnValueOnce('my-endpoint')
      .mockReturnValueOnce('query { contentFragmentList { items { _path } } }')
      .mockReturnValueOnce('invalid json');

    await expect(
      executeGraphQLOperations.call(mockExecuteFunctions, [{ json: {} }])
    ).rejects.toThrow('Invalid JSON in variables');
  });
});
});
