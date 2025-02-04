import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
  const config = useRuntimeConfig();
  return jwt.sign({ userId: user.id }, config.jwtAccessSecret, {
    expiresIn: "10h",
  });
};

const generateRefreshToken = (user) => {
  const config = useRuntimeConfig();
  return jwt.sign({ userId: user.id }, config.jwtRefreshSecret, {
    expiresIn: "4h",
  });
};

export const decodeRefreshToken = (token) => {
  const config = useRuntimeConfig();
  try {
    return jwt.verify(token, config.jwtRefreshSecret);
  } catch (error) {
    return null;
  }
};

export const decodeAuthToken = (token) => {
  const config = useRuntimeConfig();
  try {
    return jwt.verify(token, config.jwtAccessSecret);
  } catch (error) {
    return null;
  }
};

export const generateTokens = (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    accessToken,
    refreshToken,
  };
};
