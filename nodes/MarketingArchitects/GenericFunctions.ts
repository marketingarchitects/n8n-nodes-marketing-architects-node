import type {
	IExecuteSingleFunctions,
	IN8nHttpFullResponse,
	INodeExecutionData,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

export async function sendErrorPostReceive(
	this: IExecuteSingleFunctions,
	data: INodeExecutionData[],
	response: IN8nHttpFullResponse,
): Promise<INodeExecutionData[]> {
	const statusCode = response.statusCode;

	// Handle HTTP errors (4xx and 5xx status codes)
	if (statusCode >= 400) {
		// Create a detailed error message
		let errorMessage = `HTTP ${statusCode} Error`;

		// Add response body to error if available
		if (response.body) {
			try {
				const responseBody =
					typeof response.body === 'string' ? JSON.parse(response.body) : response.body;

				if (responseBody.error) {
					errorMessage += `: ${responseBody.error}`;
				} else if (responseBody.message) {
					errorMessage += `: ${responseBody.message}`;
				} else {
					errorMessage += `: ${JSON.stringify(responseBody)}`;
				}
			} catch (parseError) {
				// If response body is not JSON, include it as-is
				errorMessage += `: ${response.body}`;
			}
		}

		// Create error object with status code and response details
		const errorData: JsonObject = {
			statusCode,
			error: errorMessage,
			response: {
				statusCode: response.statusCode,
				statusMessage: response.statusMessage || 'Unknown Error',
				headers: response.headers as JsonObject,
				body: response.body,
			},
		};

		throw new NodeApiError(this.getNode(), errorData);
	}

	return data;
}
