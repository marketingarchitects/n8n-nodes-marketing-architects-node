import { NodeConnectionType } from 'n8n-workflow';
import { textCompletionFields } from './TextCompletion';
import { imageGenerationFields } from './ImageGeneration';
import { videoGenerationFields } from './VideoGeneration';
import { projectFields } from './Project';
import { sendErrorPostReceive } from './GenericFunctions';
import type { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class MarketingArchitects implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Marketing Architects',
		name: 'marketingArchitects',
		group: ['transform'],
		icon: { light: 'file:ma.svg', dark: 'file:ma-dark.svg' },
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
		version: 1,
		description: 'Consume Marketing Architects API',
		defaults: {
			name: 'Marketing Architects',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'marketingArchitectsApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://pushbtn.api.misfitsandmachines.com',
			url: '',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: '={{"Bearer " + $credentials.token}}',
			},
		},

		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Project',
						value: 'project',
					},
					{
						name: 'Text',
						value: 'text',
					},
					{
						name: 'Image',
						value: 'image',
					},
					{
						name: 'Video',
						value: 'video',
					},
				],
				default: 'project',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['text'],
					},
				},
				options: [
					{
						name: 'Text Completion',
						value: 'textCompletion',
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
				default: 'textCompletion',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['image'],
					},
				},
				options: [
					{
						name: 'Image Generation',
						value: 'imageGeneration',
						action: 'Create an image',
						description: 'Create an image for a given prompt',
						routing: {
							request: {
								method: 'POST',
								url: '/image/replicate',
							},
							output: { postReceive: [sendErrorPostReceive] },
						},
					},
				],
				default: 'imageGeneration',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['video'],
					},
				},
				options: [
					{
						name: 'Video Generation',
						value: 'videoGeneration',
						action: 'Create a video',
						description: 'Create a video for a given prompt',
						routing: {
							request: {
								method: 'POST',
								url: '/video/replicate',
							},
							output: { postReceive: [sendErrorPostReceive] },
						},
					},
				],
				default: 'videoGeneration',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['project'],
					},
				},
				options: [
					{
						name: 'Log Event',
						value: 'logEvent',
						action: 'Log an event',
						description: 'Log an event',
						routing: {
							request: {
								method: 'POST',
								url: '/logs',
								body: {
									source: '={{$workflow.name}}',
								},
							},
							output: { postReceive: [sendErrorPostReceive] },
						},
					},
				],
				default: 'logEvent',
			},

			...textCompletionFields,
			...imageGenerationFields,
			...projectFields,
			...videoGenerationFields,
		],
	};
}
