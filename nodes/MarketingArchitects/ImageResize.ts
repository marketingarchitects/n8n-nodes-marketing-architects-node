import type { INodeProperties } from 'n8n-workflow';

export const resizeImageFields: INodeProperties[] = [
	{
		displayName: 'Image URL',
		name: 'url',
		type: 'string',
		description: 'The URL of the image to resize',
		displayOptions: {
			show: {
				resource: ['image'],
				operation: ['resizeImage'],
			},
		},
		default: '',
		placeholder: 'https://example.com/image.png',
		routing: {
			send: {
				type: 'body',
				property: 'url',
			},
		},
	},
	{
		displayName: 'Width',
		name: 'width',
		type: 'number',
		description: 'The width of the resized image in pixels',
		displayOptions: {
			show: {
				resource: ['image'],
				operation: ['resizeImage'],
			},
		},
		default: 1280,
		typeOptions: {
			minValue: 1,
		},
		routing: {
			send: {
				type: 'body',
				property: 'width',
			},
		},
	},
	{
		displayName: 'Height',
		name: 'height',
		type: 'number',
		description: 'The height of the resized image in pixels',
		displayOptions: {
			show: {
				resource: ['image'],
				operation: ['resizeImage'],
			},
		},
		default: 720,
		typeOptions: {
			minValue: 1,
		},
		routing: {
			send: {
				type: 'body',
				property: 'height',
			},
		},
	},
	{
		displayName: 'Fit',
		name: 'fit',
		type: 'options',
		description: 'How the image should be resized to fit the dimensions',
		displayOptions: {
			show: {
				resource: ['image'],
				operation: ['resizeImage'],
			},
		},
		options: [
			{
				name: 'Contain',
				value: 'contain',
				description: 'Scale the image to fit within the area, maintaining aspect ratio',
			},
			{
				name: 'Cover',
				value: 'cover',
				description: 'Scale the image to cover the entire area, cropping if necessary',
			},
			{
				name: 'Fill',
				value: 'fill',
				description: 'Stretch the image to fill the exact dimensions',
			},
			{
				name: 'Inside',
				value: 'inside',
				description: 'Scale the image to fit within the area without cropping',
			},
			{
				name: 'Outside',
				value: 'outside',
				description: 'Scale the image to cover the area, may extend beyond dimensions',
			},
		],
		default: 'cover',
		routing: {
			send: {
				type: 'body',
				property: 'fit',
			},
		},
	},
	{
		displayName: 'Position',
		name: 'position',
		type: 'options',
		description: 'The position of the image when using cover or contain fit modes',
		displayOptions: {
			show: {
				resource: ['image'],
				operation: ['resizeImage'],
			},
		},
		options: [
			{
				name: 'Bottom',
				value: 'bottom',
			},
			{
				name: 'Bottom Left',
				value: 'bottom-left',
			},
			{
				name: 'Bottom Right',
				value: 'bottom-right',
			},
			{
				name: 'Center',
				value: 'center',
			},
			{
				name: 'Left',
				value: 'left',
			},
			{
				name: 'Right',
				value: 'right',
			},
			{
				name: 'Top',
				value: 'top',
			},
			{
				name: 'Top Left',
				value: 'top-left',
			},
			{
				name: 'Top Right',
				value: 'top-right',
			},
		],
		default: 'center',
		routing: {
			send: {
				type: 'body',
				property: 'position',
			},
		},
	},
	{
		displayName: 'Background Color',
		name: 'background',
		type: 'string',
		description: 'Background color for areas not covered by the image (hex color code)',
		displayOptions: {
			show: {
				resource: ['image'],
				operation: ['resizeImage'],
			},
		},
		default: '#000000',
		placeholder: '#000000',
		routing: {
			send: {
				type: 'body',
				property: 'background',
			},
		},
	},
	{
		displayName: 'Output Format',
		name: 'outputFormat',
		type: 'options',
		description: 'The format of the output image',
		displayOptions: {
			show: {
				resource: ['image'],
				operation: ['resizeImage', 'collage'],
			},
		},
		options: [
			{
				name: 'JPEG',
				value: 'jpg',
			},
			{
				name: 'PNG',
				value: 'png',
			},
			{
				name: 'WebP',
				value: 'webp',
			},
			{
				name: 'AVIF',
				value: 'avif',
			},
		],
		default: 'jpg',
		routing: {
			send: {
				type: 'body',
				property: 'output.format',
			},
		},
	},
	{
		displayName: 'Quality',
		name: 'quality',
		type: 'number',
		description: 'The quality of the output image (1-100)',
		displayOptions: {
			show: {
				resource: ['image'],
				operation: ['resizeImage', 'collage'],
			},
		},
		default: 80,
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		routing: {
			send: {
				type: 'body',
				property: 'output.quality',
			},
		},
	},
];
