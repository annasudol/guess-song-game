// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const fetchUserDB = async (name: string, id: string) => {
  const body = JSON.stringify({
    name,
    id,
  });
  const headers = { 'Content-Type': 'application/json' };
  const method = 'POST';
  try {
    const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/app/login`, { method, body, headers });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }
    return response;
  } catch (err) {
    throw err;
  }
};
