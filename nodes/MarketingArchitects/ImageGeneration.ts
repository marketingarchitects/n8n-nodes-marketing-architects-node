import type { INodeProperties } from 'n8n-workflow';

export const imageGenerationFields: INodeProperties[] = [
	{
		displayName: 'Prompt',
		name: 'prompt',
		type: 'string',
		description: 'The prompt to generate the image',
		displayOptions: {
			show: {
				operation: ['imageGeneration'],
			},
		},
		default: 'a beautiful image of a cat',
		placeholder: 'e.g. a beautiful image of a cat',
		typeOptions: {
			rows: 3,
		},
		routing: {
			send: {
				type: 'body',
				property: 'input.prompt',
			},
		},
	},
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
				name: 'Seedream 3',
				value: 'bytedance/seedream-3',
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'model',
			},
		},
		default: 'bytedance/seedream-3',
	},
];
