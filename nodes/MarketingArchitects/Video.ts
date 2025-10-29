import type { INodeProperties } from 'n8n-workflow';

export const videoGenerationFields: INodeProperties[] = [
	{
		displayName: 'Model',
		name: 'videoModel',
		type: 'options',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		displayOptions: {
			show: {
				resource: ['video'],
				operation: ['videoGeneration'],
			},
		},
		typeOptions: {
			loadOptions: {
				routing: {
					request: {
						method: 'GET',
						url: '/replicate/models',
						qs: {
							type: 'video',
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
		name: 'videoPrompt',
		type: 'string',
		description: 'The prompt to generate the video',
		displayOptions: {
			show: {
				resource: ['video'],
				operation: ['videoGeneration'],
			},
		},
		default: 'a cute panda eating in the forest',
		placeholder: 'e.g. a cute panda eating in the forest',
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
				operation: ['videoGeneration'],
				resource: ['video'],
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
						name: '16:9',
						value: '16:9',
					},
					{
						name: '9:16',
						value: '9:16',
					},
				],
				description: 'The aspect ratio of the video to generate',
				routing: {
					send: {
						type: 'body',
						property: 'input.aspect_ratio',
					},
				},
			},
			{
				displayName: 'Duration',
				name: 'duration',
				type: 'number',
				default: 4,
				description: 'The duration of the video in seconds (4-12)',
				typeOptions: {
					minValue: 4,
					maxValue: 12,
				},
				routing: {
					send: {
						type: 'body',
						property: 'input.duration',
					},
				},
			},
			{
				displayName: 'Image',
				name: 'image',
				default: '',
				description: 'The start reference image to use for the video generation vith Veo',
				type: 'string',
				routing: {
					send: {
						type: 'body',
						property: 'input.image',
					},
				},
			},
			{
				displayName: 'Negative Prompt',
				name: 'negative_prompt',
				default: '',
				description: 'The negative prompt to use for the video generation',
				type: 'string',
				routing: {
					send: {
						type: 'body',
						property: 'input.negative_prompt',
					},
				},
			},
			{
				displayName: 'Resolution',
				name: 'resolution',
				type: 'options',
				default: '720p',
				options: [
					{
						name: '720p',
						value: '720p',
					},
					{
						name: '1080p',
						value: '1080p',
					},
				],
				description: 'The resolution of the video to generate',
				routing: {
					send: {
						type: 'body',
						property: 'input.resolution',
					},
				},
			},
			{
				displayName: 'Start Image',
				name: 'start_image',
				default: '',
				description: 'The start reference image to use for the video generation',
				type: 'string',
				routing: {
					send: {
						type: 'body',
						property: 'input.start_image',
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
				operation: ['videoGeneration'],
				resource: ['video'],
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

export const videoSoraFields: INodeProperties[] = [
	{
		displayName: 'Prompt',
		name: 'soraPrompt',
		type: 'string',
		description: 'The prompt to generate the video with Sora',
		displayOptions: {
			show: {
				resource: ['video'],
				operation: ['videoSora'],
			},
		},
		required: true,
		default: '',
		placeholder: 'e.g. A serene underwater scene with colorful fish swimming',
		typeOptions: {
			rows: 4,
		},
		routing: {
			send: {
				type: 'body',
				property: 'prompt',
			},
		},
	},
	{
		displayName: 'Model',
		name: 'soraModel',
		type: 'options',
		description: 'The Sora model to use for video generation',
		displayOptions: {
			show: {
				resource: ['video'],
				operation: ['videoSora'],
			},
		},
		options: [
			{
				name: 'Sora 2',
				value: 'sora-2',
			},
			{
				name: 'Sora 2 Pro',
				value: 'sora-2-pro',
			},
		],
		default: 'sora-2',
		routing: {
			send: {
				type: 'body',
				property: 'model',
			},
		},
	},
	{
		displayName: 'Size',
		name: 'soraSize',
		type: 'options',
		description: 'The size/resolution of the video',
		displayOptions: {
			show: {
				resource: ['video'],
				operation: ['videoSora'],
			},
		},
		options: [
			{
				name: '1280x720 (720p)',
				value: '1280x720',
			},
			{
				name: '1920x1080 (1080p)',
				value: '1920x1080',
			},
			{
				name: '720x1280 (Portrait)',
				value: '720x1280',
			},
		],
		default: '1280x720',
		routing: {
			send: {
				type: 'body',
				property: 'size',
			},
		},
	},
	{
		displayName: 'Duration (Seconds)',
		name: 'soraSeconds',
		type: 'options',
		description: 'The duration of the video in seconds',
		displayOptions: {
			show: {
				resource: ['video'],
				operation: ['videoSora'],
			},
		},
		options: [
			{
				name: '4 Seconds',
				value: '4',
			},
			{
				name: '8 Seconds',
				value: '8',
			},
			{
				name: '12 Seconds',
				value: '12',
			},
			{
				name: '16 Seconds',
				value: '16',
			},
		],
		default: '8',
		routing: {
			send: {
				type: 'body',
				property: 'seconds',
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
				operation: ['videoSora'],
				resource: ['video'],
			},
		},
		options: [
			{
				displayName: 'Input Reference',
				name: 'input_reference',
				type: 'string',
				default: '',
				description: 'The input reference for the video generation',
				routing: {
					send: {
						type: 'body',
						property: 'input_reference',
					},
				},
			},
		],
	},
];

export const getVideoSoraFields: INodeProperties[] = [
	{
		displayName: 'Video ID',
		name: 'videoId',
		type: 'string',
		description: 'The ID of the video to retrieve',
		displayOptions: {
			show: {
				resource: ['video'],
				operation: ['getVideoSora'],
			},
		},
		required: true,
		default: '',
		placeholder: 'e.g. abc123xyz',
	},
];

export const getVideoSoraUrlFields: INodeProperties[] = [
	{
		displayName: 'Video ID',
		name: 'videoId',
		type: 'string',
		description: 'The ID of the video to retrieve download URL for',
		displayOptions: {
			show: {
				resource: ['video'],
				operation: ['getVideoSoraUrl'],
			},
		},
		required: true,
		default: '',
		placeholder: 'e.g. abc123xyz',
	},
];

export const videoAnalyzeFields: INodeProperties[] = [
	{
		displayName: 'Video URL',
		name: 'videoUrl',
		type: 'string',
		description: 'The URL of the video to analyze',
		displayOptions: {
			show: {
				resource: ['video'],
				operation: ['analyzeVideo'],
			},
		},
		default: '',
		placeholder: 'e.g. https://example.com/video.mp4',
		routing: {
			send: {
				type: 'body',
				property: 'url',
			},
		},
	},
	{
		displayName: 'Custom Prompt',
		name: 'customPrompt',
		type: 'string',
		description: 'Optional custom prompt for video analysis',
		displayOptions: {
			show: {
				resource: ['video'],
				operation: ['analyzeVideo'],
			},
		},
		default: '',
		placeholder:
			'e.g. Analyze this video and extract key information about people, objects, and activities.',
		typeOptions: {
			rows: 3,
		},
		routing: {
			send: {
				type: 'body',
				property: 'custom_prompt',
				value: '={{$parameter.customPrompt ? $parameter.customPrompt : undefined}}',
			},
		},
	},
	{
		displayName: 'Output Schema',
		name: 'outputSchema',
		type: 'json',
		description: 'Optional JSON schema to define the expected output structure',
		displayOptions: {
			show: {
				resource: ['video'],
				operation: ['analyzeVideo'],
			},
		},
		default: '',
		placeholder:
			'{"type": "object", "properties": {"people": {"type": "array", "items": {"type": "object", "properties": {"description": {"type": "string"}, "actions": {"type": "array", "items": {"type": "string"}}}}}}',
		typeOptions: {
			rows: 4,
		},
		routing: {
			send: {
				type: 'body',
				property: 'output_schema',
				value: '={{$parameter.outputSchema ? JSON.parse($parameter.outputSchema) : undefined}}',
			},
		},
	},
];
