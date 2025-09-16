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
];
