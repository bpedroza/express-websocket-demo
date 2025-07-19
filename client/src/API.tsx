export default class API {
  public static postJSON(endpoint: string, params: { [key: string]: any }): Promise<Response> {
    const url = import.meta.env.VITE_API_BASE_URL + endpoint;

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
  }
}