import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class AdobeExperienceManagerApi implements ICredentialType {
	name = 'adobeExperienceManagerApi';
	displayName = 'Adobe Experience Manager API';
	documentationUrl = 'https://developer.adobe.com/experience-manager/reference-materials/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://author-p{programId}-e{environmentId}.adobeaemcloud.com',
			placeholder: 'https://author-p12345-e67890.adobeaemcloud.com',
			description: 'The base URL for your AEM Cloud Service instance',
			required: true,
		},
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			default: '',
			description: 'Technical Account Client ID from Adobe Developer Console',
			required: true,
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Technical Account Client Secret from Adobe Developer Console',
			required: true,
		},
		{
			displayName: 'Technical Account ID',
			name: 'technicalAccountId',
			type: 'string',
			default: '',
			description: 'Technical Account ID from Adobe Developer Console',
			required: true,
		},
		{
			displayName: 'Organization ID',
			name: 'organizationId',
			type: 'string',
			default: '',
			description: 'Organization ID from Adobe Developer Console',
			required: true,
		},
		{
			displayName: 'Private Key',
			name: 'privateKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Private key for JWT signing (PEM format)',
			required: true,
		},
		{
			displayName: 'Metascopes',
			name: 'metascopes',
			type: 'string',
			default: 'ent_aem_cloud_api',
			description: 'Comma-separated list of metascopes for Adobe IMS',
			required: true,
		},
	];
}