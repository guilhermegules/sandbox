
/**
 * Rate limiter: max 5 request per user in 10 seconds
 * 
 * Keep requests timestamps
 * Remove old ones
 * Verify the window size
 */
export class RateLimiter {
    private requests = new Map<string, number[]>();

    constructor(private limit: number = 5, private msWindow = 10000) { }

    allow(userId: string) {
        const timestamp = Date.now();

        if (!this.requests.has(userId)) {
            this.requests.set(userId, []);
        }

        const requestsByUser = this.requests.get(userId)!
        const validRequests = requestsByUser.filter((r) => timestamp - r < this.msWindow);

        if (validRequests.length >= this.limit) {
            return false;
        }

        validRequests.push(timestamp);
        this.requests.set(userId, validRequests);
        return true;
    }
}