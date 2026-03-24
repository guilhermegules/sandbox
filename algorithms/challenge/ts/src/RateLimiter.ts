
/**
 * Rate limiter: max 5 request per user in 10 seconds
 * 
 * Keep requests timestamps
 * Remove old ones
 * Verify the window size
 */
export class RateLimiter {
    private requests = new Map<string, number[]>();

    constructor(private limit = 5, private ms = 10000) { }

    allow(userId: string): boolean {
        const now = Date.now();

        if (!this.requests.has(userId)) {
            this.requests.set(userId, []);
        }

        const requestsByUser = this.requests.get(userId) ?? [];
        const validRequests = requestsByUser.filter(req => req - now < this.ms);

        if (validRequests.length >= this.limit) return false;

        validRequests.push(now);
        this.requests.set(userId, validRequests);
        return true;
    }
}