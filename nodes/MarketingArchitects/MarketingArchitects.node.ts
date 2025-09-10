import type {
	// IExecuteFunctions,
	// INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';

import { chatFields, chatOperations } from './ChatDescription';

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
						name: 'Chat',
						value: 'chat',
					},
				],
				default: 'chat',
			},

			...chatOperations,
			...chatFields,
		],
	};

	// The function below is responsible for actually doing whatever this node
	// is supposed to do. In this case, we're just appending the `myString` property
	// with whatever the user has entered.
	// You can make async calls and use `await`.
	// async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	// 	const items = this.getInputData();

	// 	let item: INodeExecutionData;
	// 	let myString: string;

	// 	// Iterates over all input items and add the key "myString" with the
	// 	// value the parameter "myString" resolves to.
	// 	// (This could be a different value for each item in case it contains an expression)
	// 	for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
	// 		try {
	// 			myString = this.getNodeParameter('myString', itemIndex, '') as string;
	// 			item = items[itemIndex];

	// 			item.json.myString = myString;
	// 		} catch (error) {
	// 			// This node should never fail but we want to showcase how
	// 			// to handle errors.
	// 			if (this.continueOnFail()) {
	// 				items.push({ json: this.getInputData(itemIndex)[0].json, error, pairedItem: itemIndex });
	// 			} else {
	// 				// Adding `itemIndex` allows other workflows to handle this error
	// 				if (error.context) {
	// 					// If the error thrown already contains the context property,
	// 					// only append the itemIndex
	// 					error.context.itemIndex = itemIndex;
	// 					throw error;
	// 				}
	// 				throw new NodeOperationError(this.getNode(), error, {
	// 					itemIndex,
	// 				});
	// 			}
	// 		}
	// 	}

	// 	return [items];
	// }
}
