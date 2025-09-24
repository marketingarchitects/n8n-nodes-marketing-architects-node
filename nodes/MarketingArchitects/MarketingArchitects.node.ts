import { NodeConnectionType } from 'n8n-workflow';
import { textCompletionFields } from './TextCompletion';
import { imageGenerationFields } from './ImageGeneration';
import { videoGenerationFields, videoAnalyzeFields } from './Video';
import { projectFields } from './Project';
import { brandFields } from './Brand';
import { collageFields } from './Collage';
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
						name: 'Brand',
						value: 'brand',
					},
					{
						name: 'Image',
						value: 'image',
					},
					{
						name: 'Project',
						value: 'project',
					},
					{
						name: 'Text',
						value: 'text',
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
						resource: ['brand'],
					},
				},
				options: [
					{
						name: 'Get Brand Info',
						value: 'getBrandInfo',
						action: 'Get brand info',
						description: 'Get brand info for a given domain',
						routing: {
							request: {
								method: 'GET',
							},
						},
					},
				],
				default: 'getBrandInfo',
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
					{
						name: 'Create Collage',
						value: 'collage',
						action: 'Create a collage',
						description: 'Create a collage from multiple images',
						routing: {
							request: {
								method: 'POST',
								url: '/image/collage',
								body: {
									output: {
										format: 'png',
										quality: 100,
										filename: 'collage.png',
									},
								},
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
					{
						name: 'Analyze Video',
						value: 'analyzeVideo',
						action: 'Analyze a video',
						description: 'Analyze a video from a given URL',
						routing: {
							request: {
								method: 'POST',
								url: '/video/analyze',
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
			...videoGenerationFields,
			...videoAnalyzeFields,
			...projectFields,
			...brandFields,
			...collageFields,
		],
	};
}
