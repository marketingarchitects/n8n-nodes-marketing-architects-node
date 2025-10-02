import type { INodeProperties } from 'n8n-workflow';

export const imageAnalysisFields: INodeProperties[] = [
	{
		displayName: 'Image URL',
		name: 'url',
		type: 'string',
		description: 'The URL of the image to analyze. Alternative to uploading a file.',
		displayOptions: {
			show: {
				resource: ['image'],
				operation: ['analyzeImage'],
			},
		},
		default: '',
		placeholder: 'https://example.com/image.jpg',
		routing: {
			send: {
				type: 'body',
				property: 'url',
			},
		},
	},
	{
		displayName: 'Analysis Prompt',
		name: 'prompt',
		type: 'string',
		description: 'The prompt describing what you want to analyze in the image',
		displayOptions: {
			show: {
				resource: ['image'],
				operation: ['analyzeImage'],
			},
		},
		default: '',
		placeholder: 'e.g., What is the product in this image?',
		typeOptions: {
			rows: 3,
		},
		routing: {
			send: {
				type: 'body',
				property: 'prompt',
			},
		},
	},

	{
		displayName: 'Retry Settings',
		name: 'retrySettings',
		placeholder: 'Add retry option',
		description: 'Configure retry behavior on failure',
		type: 'collection',
		default: {},
		displayOptions: {
			show: {
				operation: ['analyzeImage'],
				resource: ['image'],
			},
		},
		options: [
			{
				displayName: 'Enable Retry on Failure',
				name: 'enableRetry',
				type: 'boolean',
				default: false,
				description: 'Whether to retry the request on failure',
			},
			{
				displayName: 'Max Retry Attempts',
				name: 'maxRetries',
				type: 'number',
				default: 3,
				description: 'Maximum number of retry attempts (1-10)',
				typeOptions: {
					minValue: 1,
					maxValue: 10,
				},
				displayOptions: {
					show: {
						enableRetry: [true],
					},
				},
			},
			{
				displayName: 'Retry Delay (Seconds)',
				name: 'retryDelay',
				type: 'number',
				default: 2,
				description: 'Delay between retry attempts in seconds (1-60)',
				typeOptions: {
					minValue: 1,
					maxValue: 60,
				},
				displayOptions: {
					show: {
						enableRetry: [true],
					},
				},
			},
			{
				displayName: 'Backoff Strategy',
				name: 'backoffStrategy',
				type: 'options',
				default: 'exponential',
				options: [
					{
						name: 'Fixed',
						value: 'fixed',
						description: 'Use fixed delay between retries',
					},
					{
						name: 'Exponential',
						value: 'exponential',
						description: 'Exponentially increase delay between retries',
					},
				],
				description: 'Strategy for calculating retry delays',
				displayOptions: {
					show: {
						enableRetry: [true],
					},
				},
			},
		],
	},
];
