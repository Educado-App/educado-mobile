
export const errorCodes = {

  // E00 - General authentication errors & unknown errors
  E0000: {
    code: 'E0000',
    message: 'Unknown error occured.'
  },
  E0001: {
    code: 'E0001',
    message: 'Authentication token is invalid or expired.'
  },
  E0002: {
    code: 'E0002',
    message: 'Users role does not have the necessary permissions for this action'
  },
  E0004: {
		code: 'E0004',
		message: 'User not found'
	},

  // E01 - Login errors
  E0101: {
    code: 'E0101',
    message: 'Invalid username or password'
  },
  E0102: {
    code: 'E0102',
    message: 'Account is locked due to multiple failed login attempts. Please try again later.'
  },
  E0103: {
    code: 'E0103',
    message: 'Account is not verified. Please check your email for a verification link.'
  },
  E0104: {
    code: 'E0104',
    message: 'Account is suspended or blocked by and administrator.'
  },

  // E02 - Signup errors
  E0201: {
    code: 'E0201',
    message: 'User with the provided email already exists.'
  },
  E0202: {
    code: 'E0202',
    message: 'Password does not meet the minimum requirements.'
  },
  E0203: {
    code: 'E0203',
    message: 'Invalid email format.'
  },
  E0204: {
    code: 'E0204',
    message: 'User registration is currently disabled.'
  },
  E0205: {
    code: 'E0205',
    message: 'Could not send a verification email. Please try again later.'
  },

  // E03 - Logout errors
  E0301: {
    code: 'E0301',
    message: 'User is not authenticated. Logout is not possible.'
  },

  // E04 - Password reset errors
  E0401: {
    code: 'E0401',
    message: 'The provided email is not associated with any account.'
  },
  E0402: {
    code: 'E0402',
    message: 'Password reset link has expired.'
  },
  E0403: {
    code: 'E0403',
    message: 'Password reset link is invalid or has already been used.'
  },
  E0404: {
    code: 'E0404',
    message: 'Password reset code has expired.'
  },
  E0405: {
    code: 'E0405',
    message: 'Password reset code is invalid or has already been used.'
  },

  // E05 - Verification errors
  E0501: {
    code: 'E0501',
    message: 'Account is already verified.'
  },
  E0502: {
    code: 'E0502',
    message: 'Verification link has expired.'
  },
  E0503: {
    code: 'E0503',
    message: 'Verification link is invalid or has already been used.'
  }
};



