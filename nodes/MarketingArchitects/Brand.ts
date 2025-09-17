import type { INodeProperties } from 'n8n-workflow';
import { sendErrorPostReceive } from './GenericFunctions';

export const brandFields: INodeProperties[] = [
	{
		displayName: 'Domain',
		name: 'domain',
		type: 'string',
		required: true,
		placeholder: 'e.g. marketingarchitects.com',
		description: 'The domain to get the brand info for',
		displayOptions: {
			show: {
				resource: ['brand'],
				operation: ['getBrandInfo'],
			},
		},
		routing: {
			request: {
				method: 'GET',
				url: '=/brand/{{$parameter.domain}}',
			},
			output: {
				postReceive: [sendErrorPostReceive],
			},
		},
		default: 'marketingarchitects.com',
	},
];
