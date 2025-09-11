import { NodeConnectionType } from 'n8n-workflow';
import { textCompletionFields } from './TextCompletion';
import { imageGenerationFields } from './ImageGeneration';
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
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
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
					{
						name: 'Image Generation',
						value: 'imageGeneration',
						action: 'Create an image generation',
						description: 'Create an image generation for a given prompt',
						routing: {
							request: {
								method: 'POST',
								url: '/image/replicate',
							},
							output: { postReceive: [sendErrorPostReceive] },
						},
					},
				],
				default: 'textCompletion',
			},
			...textCompletionFields,
			...imageGenerationFields,
		],
	};
}
