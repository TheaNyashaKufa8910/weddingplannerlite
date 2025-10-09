import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET || 'devsecret';
  const expiresIn = process.env.JWT_EXPIRES || '7d';
  return jwt.sign({ id: userId }, secret, { expiresIn });
};

export default generateToken;
