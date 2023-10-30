import errorCodes from './errorCodes'; // Import error codes


export default function generateErrorResponse(res, error_code = 'E0000', httpStatus = 401) {
	const errorCode = errorCodes[error_code];
	return res.status(httpStatus).json(errorCode);
}
