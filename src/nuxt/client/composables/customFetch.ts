export const headersForm = {
  'Content-Type': 'multipart/form-data',
};

export const headersAuth = (token: string) => {
  return {
    Authorization: `Bearer ${token}`,
  };
};
