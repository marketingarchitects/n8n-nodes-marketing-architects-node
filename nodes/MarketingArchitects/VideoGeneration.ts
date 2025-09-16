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
];
