import type { INodeProperties } from 'n8n-workflow';

export const textCompletionFields: INodeProperties[] = [
	{
		displayName: 'Model',
		name: 'textModel',
		type: 'options',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		displayOptions: {
			show: {
				resource: ['text'],
				operation: ['textCompletion'],
			},
		},
		default: '',
		typeOptions: {
			loadOptions: {
				routing: {
					request: {
						method: 'GET',
						url: '/generation/openrouter/models',
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
									property: 'data',
								},
							},
							{
								type: 'setKeyValue',
								properties: {
									name: '={{$responseItem.id}}',
									value: '={{$responseItem.id}}',
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
	},

	{
		displayName: 'Messages',
		name: 'textMessages',
		type: 'fixedCollection',
		typeOptions: {
			sortable: true,
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['text'],
				operation: ['textCompletion'],
			},
		},
		placeholder: 'Add Message',
		default: {
			messages: [
				{
					role: 'user',
					content: 'Hello, how are you?',
				},
			],
		},
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
						typeOptions: {
							rows: 4,
						},
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

	{
		displayName: 'Options',
		name: 'options',
		placeholder: 'Add option',
		description: 'Additional options to add',
		type: 'collection',
		default: {},
		displayOptions: {
			show: {
				operation: ['textCompletion'],
				resource: ['text'],
			},
		},
		options: [
			{
				displayName: 'Response Format (I.e. Structured Output) - The Model Must Support It',
				name: 'response_format',
				default: '',
				description: 'The response format to use for the text generation',
				type: 'json',
				routing: {
					send: {
						type: 'body',
						property: 'response_format',
						value: '={{ JSON.parse($value) }}',
					},
				},
			},
		],
	},
];
