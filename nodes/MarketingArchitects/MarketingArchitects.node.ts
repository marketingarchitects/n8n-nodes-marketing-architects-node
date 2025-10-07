import { NodeConnectionType } from 'n8n-workflow';
import { textCompletionFields } from './TextCompletion';
import { imageGenerationFields } from './ImageGeneration';
import { resizeImageFields } from './ImageResize';
import { imageAnalysisFields } from './ImageAnalysis';
import {
	videoGenerationFields,
	videoAnalyzeFields,
	videoSoraFields,
	getVideoSoraFields,
	getVideoSoraUrlFields,
} from './Video';
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
					{
						name: 'Resize Image',
						value: 'resizeImage',
						action: 'Resize an image',
						description: 'Resize an image with specified dimensions and options',
						routing: {
							request: {
								method: 'POST',
								url: '/image/resize',
							},
							output: { postReceive: [sendErrorPostReceive] },
						},
					},
					{
						name: 'Analyze Image',
						value: 'analyzeImage',
						action: 'Analyze an image',
						description: 'Analyze an image to extract metadata and technical information',
						routing: {
							request: {
								method: 'POST',
								url: '/image/analyze',
								headers: {
									'Content-Type': 'multipart/form-data',
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
						name: 'Create Video with Sora',
						value: 'videoSora',
						action: 'Create a video with sora',
						description: 'Create a video using OpenAI Sora model',
						routing: {
							request: {
								method: 'POST',
								url: '/video/openai',
							},
							output: { postReceive: [sendErrorPostReceive] },
						},
					},
					{
						name: 'Get Sora Video Status',
						value: 'getVideoSora',
						action: 'Get a sora video status',
						description: 'Retrieve the status of a sora video by ID',
						routing: {
							request: {
								method: 'GET',
								url: '=/video/openai/{{$parameter.videoId}}',
							},
							output: { postReceive: [sendErrorPostReceive] },
						},
					},
					{
						name: 'Get Sora Video URL',
						value: 'getVideoSoraUrl',
						action: 'Get a sora video URL',
						description: 'Retrieve the download URL for a sora video by ID',
						routing: {
							request: {
								method: 'GET',
								url: '=/video/openai/{{$parameter.videoId}}/download',
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
			...resizeImageFields,
			...imageAnalysisFields,
			...videoGenerationFields,
			...videoSoraFields,
			...getVideoSoraFields,
			...getVideoSoraUrlFields,
			...videoAnalyzeFields,
			...projectFields,
			...brandFields,
			...collageFields,
		],
	};
}
