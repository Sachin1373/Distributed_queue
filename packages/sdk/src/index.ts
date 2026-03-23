export class Queue {
    private apiKey: string;
    private baseUrl: string;


    constructor(config: { apiKey: string, baseUrl: string }) {
        this.apiKey = config.apiKey;
        this.baseUrl = config.baseUrl;
    }

    async add(type: string, payload: object, options: { callbackUrl: string; retries?: number }) {
        const res = await fetch(`${this.baseUrl}/jobs`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-api-key": this.apiKey },
            body: JSON.stringify({ type, payload, ...options }),
        });
        return res.json();
    }
}