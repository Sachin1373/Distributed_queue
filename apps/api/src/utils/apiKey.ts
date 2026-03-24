import crypto from 'crypto';

const generateApiKey = (size:32, format: 'hex') => {
    return crypto.randomBytes(size).toString(format)
}

export default generateApiKey;