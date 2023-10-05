import errorCodes from './errorCodes'; // Import error codes


export default function generateErrorResponse(res, errorCode = 'E0000', httpStatus = 401) {
  const errorCode = errorCodes[errorCode];
  return res.status(httpStatus).json(errorCode);
}
