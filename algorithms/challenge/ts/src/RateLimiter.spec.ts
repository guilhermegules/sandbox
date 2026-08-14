import { expect, describe, it } from 'vitest'
import { RateLimiter } from './RateLimiter.js'
describe('RateLimiter', () => {
    it('should accept requests from the user when the time limit is on the range', () => {
        const rateLimiter = new RateLimiter();
        const userId = '1';

        expect(rateLimiter.allow(userId)).toBe(true);
        expect(rateLimiter.allow(userId)).toBe(true);
        expect(rateLimiter.allow(userId)).toBe(true);
        expect(rateLimiter.allow(userId)).toBe(true);
        expect(rateLimiter.allow(userId)).toBe(true);
        expect(rateLimiter.allow(userId)).toBe(false);
        setTimeout(() => {
            rateLimiter.allow(userId);
        }, 1000);
    })
})