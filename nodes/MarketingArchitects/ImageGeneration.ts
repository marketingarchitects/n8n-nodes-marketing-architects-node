import type { INodeProperties } from 'n8n-workflow';

export const imageGenerationFields: INodeProperties[] = [
	{
		displayName: 'Model',
		name: 'imageModel',
		type: 'options',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		displayOptions: {
			show: {
				resource: ['image'],
				operation: ['imageGeneration'],
			},
		},
		typeOptions: {
			loadOptions: {
				routing: {
					request: {
						method: 'GET',
						url: '/replicate/models',
						qs: {
							type: 'image',
						},
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'data',
								},
							},
							{
								type: 'rootProperty',
								properties: {
									property: 'models',
								},
							},
							{
								type: 'setKeyValue',
								properties: {
									name: '={{$responseItem.model}}',
									value: '={{$responseItem.model}}',
								},
							},
							{
								type: 'sort',
								properties: {
									key: 'name',
								},
							},
						],
					},
				},
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'model',
			},
		},
		default: '',
	},

	{
		displayName: 'Prompt',
		name: 'imagePrompt',
		type: 'string',
		description: 'The prompt to generate the image',
		displayOptions: {
			show: {
				resource: ['image'],
				operation: ['imageGeneration'],
			},
		},
		default: 'a beautiful image of a cat',
		placeholder: 'e.g. a beautiful image of a cat',
		typeOptions: {
			rows: 4,
		},
		routing: {
			send: {
				type: 'body',
				property: 'input.prompt',
			},
		},
	},

	{
		displayName: 'Options',
		name: 'options',
		placeholder: 'Add option',
		description: 'Additional options to add',
		type: 'collection',
		default: {},
		displayOptions: {
			show: {
				operation: ['imageGeneration'],
				resource: ['image'],
			},
		},
		options: [
			{
				displayName: 'Aspect Ratio',
				name: 'aspect_ratio',
				type: 'options',
				default: '16:9',
				options: [
					{
						name: '1:1',
						value: '1:1',
					},
					{
						name: '2:3',
						value: '2:3',
					},
					{
						name: '16:9',
						value: '16:9',
					},
					{
						name: '9:16',
						value: '9:16',
					},
				],
				description: 'The aspect ratio of the image to generate',
				routing: {
					send: {
						type: 'body',
						property: 'input.aspect_ratio',
					},
				},
			},
			{
				displayName: 'Character Reference Image',
				name: 'character_reference_image',
				default: '',
				description: 'The character reference image to use for the image generation',
				type: 'string',
				routing: {
					send: {
						type: 'body',
						property: 'input.character_reference_image',
					},
				},
			},
			{
				displayName: 'Image Input',
				name: 'image_input',
				placeholder: 'Add Images',
				type: 'fixedCollection',
				default: {},
				typeOptions: {
					multipleValues: true,
				},
				description: 'The images to use for the image generation',
				options: [
					{
						name: 'image_input',
						displayName: 'Image Input',
						values: [
							{
								displayName: 'Image URL',
								name: 'value',
								type: 'string',
								default: '',
								description: 'URL of the image to use for the image generation',
							},
						],
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'input.image_input',
						value: '={{$value.image_input.map(item => item.value)}}',
					},
				},
			},
			{
				displayName: 'Input Image',
				name: 'input_image',
				default: '',
				description: 'The input image to use for the image generation',
				type: 'string',
				routing: {
					send: {
						type: 'body',
						property: 'input.input_image',
					},
				},
			},
			{
				displayName: 'Mask',
				name: 'mask',
				default: '',
				description: 'The mask to use for inpainting the image generation',
				type: 'string',
				routing: {
					send: {
						type: 'body',
						property: 'input.mask',
					},
				},
			},
		],
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
				operation: ['imageGeneration'],
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
