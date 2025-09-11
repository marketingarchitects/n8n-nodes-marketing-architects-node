import type { INodeProperties } from 'n8n-workflow';

export const imageGenerationFields: INodeProperties[] = [
	{
		displayName: 'Model',
		name: 'model',
		type: 'options',
		description: 'The model which will generate the image',
		displayOptions: {
			show: {
				operation: ['imageGeneration'],
			},
		},
		options: [
			{
				name: 'Google Imagen 4 Ultra',
				value: 'google/imagen-4-ultra',
			},
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
		default: 'google/imagen-4-ultra',
	},

	{
		displayName: 'Prompt',
		name: 'prompt',
		type: 'string',
		description: 'The text prompt for image generation',
		displayOptions: {
			show: {
				operation: ['imageGeneration'],
			},
		},
		typeOptions: {
			rows: 3,
		},
		routing: {
			send: {
				type: 'body',
				property: 'input.prompt',
			},
		},
		default: '',
	},

	{
		displayName: 'Negative Prompt',
		name: 'negative_prompt',
		type: 'string',
		description: 'What you do not want to see in the generated image',
		displayOptions: {
			show: {
				operation: ['imageGeneration'],
			},
		},
		typeOptions: {
			rows: 2,
		},
		routing: {
			send: {
				type: 'body',
				property: 'input.negative_prompt',
			},
		},
		default: '',
	},

	{
		displayName: 'Aspect Ratio',
		name: 'aspect_ratio',
		type: 'options',
		description: 'The aspect ratio for the generated image',
		displayOptions: {
			show: {
				operation: ['imageGeneration'],
			},
		},
		options: [
			{
				name: '16:9 (Landscape)',
				value: '16:9',
			},
			{
				name: '9:16 (Portrait)',
				value: '9:16',
			},
			{
				name: '1:1 (Square)',
				value: '1:1',
			},
			{
				name: '4:3',
				value: '4:3',
			},
			{
				name: '3:4',
				value: '3:4',
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'input.aspect_ratio',
			},
		},
		default: '16:9',
	},

	{
		displayName: 'Output Format',
		name: 'output_format',
		type: 'options',
		description: 'The format of the output image',
		displayOptions: {
			show: {
				operation: ['imageGeneration'],
			},
		},
		options: [
			{
				name: 'PNG',
				value: 'png',
			},
			{
				name: 'JPEG',
				value: 'jpeg',
			},
			{
				name: 'WebP',
				value: 'webp',
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'input.output_format',
			},
		},
		default: 'png',
	},

	{
		displayName: 'Seed',
		name: 'seed',
		type: 'number',
		description: 'Random seed for reproducible results. Use the same seed and prompt to get the same image.',
		displayOptions: {
			show: {
				operation: ['imageGeneration'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'input.seed',
			},
		},
		default: 1,
		typeOptions: {
			minValue: 0,
			maxValue: 2147483647,
		},
	},

	{
		displayName: 'Input Image',
		name: 'input_image',
		type: 'string',
		description: 'URL or base64 string of an input image for image-to-image generation',
		displayOptions: {
			show: {
				operation: ['imageGeneration'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'input.input_image',
			},
		},
		default: '',
	},

	{
		displayName: 'Character Reference Image',
		name: 'character_reference_image',
		type: 'string',
		description: 'URL or base64 string of a reference image for character consistency',
		displayOptions: {
			show: {
				operation: ['imageGeneration'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'input.character_reference_image',
			},
		},
		default: '',
	},

	{
		displayName: 'Image Input',
		name: 'image_input',
		type: 'fixedCollection',
		description: 'Array of image URLs or base64 strings for multi-image input',
		displayOptions: {
			show: {
				operation: ['imageGeneration'],
			},
		},
		placeholder: 'Add Image',
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'images',
				displayName: 'Images',
				values: [
					{
						displayName: 'Image URL or Base64',
						name: 'image',
						type: 'string',
						default: '',
						description: 'URL or base64 string of the image',
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'input.image_input',
				value: '={{ $value.images?.map(img => img.image) || [] }}',
			},
		},
	},

	{
		displayName: 'Mask',
		name: 'mask',
		type: 'string',
		description: 'URL or base64 string of a mask image for inpainting',
		displayOptions: {
			show: {
				operation: ['imageGeneration'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'input.mask',
			},
		},
		default: '',
	},

	{
		displayName: 'Image',
		name: 'image',
		type: 'string',
		description: 'URL or base64 string of an image for editing or variation',
		displayOptions: {
			show: {
				operation: ['imageGeneration'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'input.image',
			},
		},
		default: '',
	},

	{
		displayName: 'Webhook URL',
		name: 'webhook_url',
		type: 'string',
		description: 'URL to receive webhook notifications when the image generation is complete',
		displayOptions: {
			show: {
				operation: ['imageGeneration'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'webhook_url',
			},
		},
		default: '',
	},
];