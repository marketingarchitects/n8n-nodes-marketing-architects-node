import type { INodeProperties } from 'n8n-workflow';

export const imageGenerationFields: INodeProperties[] = [
	{
		displayName: 'Model',
		name: 'model',
		type: 'options',
		description: 'The model which will generate the image generation',
		displayOptions: {
			show: {
				operation: ['imageGeneration'],
			},
		},
		options: [
			{
				name: 'Claude Sonnet 4',
				value: 'anthropic/claude-sonnet-4',
			},
			{
				name: 'Gemini 2.5 Pro',
				value: 'google/gemini-2.5-pro',
			},
			{
				name: 'GPT-4o',
				value: 'openai/gpt-4o',
			},
			{
				name: 'GPT-5',
				value: 'openai/gpt-5',
			},
			{
				name: 'Qwen3 Max',
				value: 'qwen/qwen3-max',
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'model',
			},
		},
		default: 'openai/gpt-4o',
	},

	{
		displayName: 'Prompt',
		name: 'prompt',
		type: 'fixedCollection',
		typeOptions: {
			sortable: true,
			multipleValues: true,
		},
		displayOptions: {
			show: {
				operation: ['imageGeneration'],
			},
		},
		placeholder: 'Add Message',
		default: {},
		options: [
			{
				displayName: 'Messages',
				name: 'messages',
				values: [
					{
						displayName: 'Role',
						name: 'role',
						type: 'options',
						options: [
							{
								name: 'Assistant',
								value: 'assistant',
							},
							{
								name: 'System',
								value: 'system',
							},
							{
								name: 'User',
								value: 'user',
							},
						],
						default: 'user',
					},
					{
						displayName: 'Content',
						name: 'content',
						type: 'string',
						default: '',
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'messages',
				value: '={{ $value.messages }}',
			},
		},
	},
];
