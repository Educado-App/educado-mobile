import errorCodes from './errorCodes'; // Import error codes


export default function generateErrorResponse(res, errorCode = 'E0000', httpStatus = 401) {
  const errorCode = errorCodes[errorCode];
  return res.status(httpStatus).json(errorCode);
}

errors = []

// Try something
if(something != 5) {
  error += errorCodes['E0101'];
}

// Get authentication token
if(something != 'asd') {
  error += errorCodes['E0102'];
}

// Send request to database
if(something != 123) {
  error += errorCodes['E0103'];
}

errors = []

if (errors.length > 1) {
  return res.status(401).json({
    message: 'Multiple errors occured',
    errors: errors.map(errorCode => errorCodes[errorCode])
  });
}

if (errors.length == 1) {
  return res.status(401).json(errorCodes[errors[0]]);
}



res.status(404).json({error: error});
