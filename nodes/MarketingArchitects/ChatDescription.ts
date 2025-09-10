import type { INodeProperties } from 'n8n-workflow';

import { sendErrorPostReceive } from './GenericFunctions';

export const chatOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['chat'],
			},
		},
		options: [
			{
				name: 'Complete',
				value: 'complete',
				action: 'Create a text completion',
				description: 'Create a text completion for a given prompt',
				routing: {
					request: {
						method: 'POST',
						url: '/generation/open-router',
					},
					output: { postReceive: [sendErrorPostReceive] },
				},
			},
		],
		default: 'complete',
	},
];

const completeOperations: INodeProperties[] = [
	{
		displayName: 'Model',
		name: 'model',
		type: 'options',
		description: 'The model which will generate the completion',
		displayOptions: {
			show: {
				operation: ['complete'],
				resource: ['chat'],
				'@version': [1],
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
				resource: ['chat'],
				operation: ['complete'],
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

export const chatFields: INodeProperties[] = [...completeOperations];
