import type { INodeProperties } from 'n8n-workflow';

export const projectFields: INodeProperties[] = [
	{
		displayName: 'Project ID',
		name: 'project_id',
		type: 'number',
		required: true,
		description: 'The project ID to associate the log to',
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['logEvent'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'project_id',
			},
		},
		default: '',
	},

	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		required: true,
		description: 'The message to log',
		displayOptions: {
			show: {
				resource: ['project'],
				operation: ['logEvent'],
			},
		},
		default: '',
		placeholder: 'e.g. Image generations completed',
		typeOptions: {
			rows: 3,
		},
		routing: {
			send: {
				type: 'body',
				property: 'message',
			},
		},
	},
];
