type SendPostOpts<TRequest> = {
  url: string,
  payload: TRequest,
};

export const sendPost = async <TRequest, TResponse>({
  url,
  payload,
}: SendPostOpts<TRequest>): Promise<TResponse> => {
  const response = await fetch(
    url,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
  );

  return response.json();
};
