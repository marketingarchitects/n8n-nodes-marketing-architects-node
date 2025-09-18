import type { INodeProperties } from 'n8n-workflow';

export const collageFields: INodeProperties[] = [
	{
		displayName: 'Images',
		name: 'images',
		type: 'fixedCollection',
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add Image URL',
		description: 'URLs of the images to include in the collage',
		displayOptions: {
			show: {
				resource: ['image'],
				operation: ['collage'],
			},
		},
		options: [
			{
				name: 'image',
				displayName: 'Image',
				values: [
					{
						displayName: 'Image URL',
						name: 'url',
						type: 'string',
						default: '',
						placeholder: 'https://example.com/image.jpg',
						description: 'URL of the image to include in the collage',
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'images',
				value: '={{$value.image.map(item => item.url)}}',
			},
		},
	},
	{
		displayName: 'Canvas',
		name: 'canvas',
		type: 'collection',
		default: {},
		description: 'Canvas settings for the collage',
		displayOptions: {
			show: {
				resource: ['image'],
				operation: ['collage'],
			},
		},
		options: [
			{
				displayName: 'Width',
				name: 'width',
				type: 'number',
				default: 1000,
				description: 'Width of the canvas in pixels',
				routing: {
					send: {
						type: 'body',
						property: 'canvas.width',
					},
				},
			},
			{
				displayName: 'Height',
				name: 'height',
				type: 'number',
				default: 1000,
				description: 'Height of the canvas in pixels',
				routing: {
					send: {
						type: 'body',
						property: 'canvas.height',
					},
				},
			},
			{
				displayName: 'Background Color',
				name: 'background',
				type: 'color',
				default: '#ffffff',
				description: 'Background color of the canvas (hex color)',
				routing: {
					send: {
						type: 'body',
						property: 'canvas.background',
					},
				},
			},
		],
	},
	{
		displayName: 'Gap',
		name: 'gap',
		type: 'number',
		default: 20,
		description: 'Gap between images in pixels',
		displayOptions: {
			show: {
				resource: ['image'],
				operation: ['collage'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'gap',
			},
		},
	},
];
