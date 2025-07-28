export default class API {
  public static postJSON(endpoint: string, params: { [key: string]: any }): Promise<Response> {
    const url = import.meta.env.VITE_API_BASE_URL + endpoint;

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(params),
    });
  }

  public static getJSON(endpoint: string, params: { [key: string]: any } = {}): Promise<Response> {
    let url = import.meta.env.VITE_API_BASE_URL + endpoint;
    const paramString = new URLSearchParams(params).toString();
    url += '?' + paramString;

    return fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });
  }
}