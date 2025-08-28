import type { INodeProperties } from 'n8n-workflow';

export const imageGenerationFields: INodeProperties[] = [
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
];
