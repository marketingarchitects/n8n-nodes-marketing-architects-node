import type { INodeProperties } from 'n8n-workflow';

export const collageFields: INodeProperties[] = [
	{
		displayName: 'Images',
		name: 'images',
		type: 'fixedCollection',
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add Image URL',
		description: 'URLs of the images to include in the collage',
		displayOptions: {
			show: {
				resource: ['image'],
				operation: ['collage'],
			},
		},
		options: [
			{
				name: 'image',
				displayName: 'Image',
				values: [
					{
						displayName: 'Image URL',
						name: 'url',
						type: 'string',
						default: '',
						placeholder: 'https://example.com/image.jpg',
						description: 'URL of the image to include in the collage',
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'images',
				value: '={{$value.image.map(item => item.url)}}',
			},
		},
	},
	{
		displayName: 'Canvas',
		name: 'canvas',
		type: 'collection',
		default: {},
		description: 'Canvas settings for the collage',
		displayOptions: {
			show: {
				resource: ['image'],
				operation: ['collage'],
			},
		},
		options: [
			{
				displayName: 'Width',
				name: 'width',
				type: 'number',
				default: 1920,
				description: 'Width of the canvas in pixels',
				routing: {
					send: {
						type: 'body',
						property: 'canvas.width',
					},
				},
			},
			{
				displayName: 'Height',
				name: 'height',
				type: 'number',
				default: 1080,
				description: 'Height of the canvas in pixels',
				routing: {
					send: {
						type: 'body',
						property: 'canvas.height',
					},
				},
			},
			{
				displayName: 'Background Color',
				name: 'background',
				type: 'color',
				default: '#ffffff',
				description: 'Background color of the canvas (hex color)',
				routing: {
					send: {
						type: 'body',
						property: 'canvas.background',
					},
				},
			},
		],
	},
	{
		displayName: 'Gap',
		name: 'gap',
		type: 'number',
		default: 20,
		description: 'Gap between images in pixels',
		displayOptions: {
			show: {
				resource: ['image'],
				operation: ['collage'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'gap',
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
				operation: ['collage'],
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
