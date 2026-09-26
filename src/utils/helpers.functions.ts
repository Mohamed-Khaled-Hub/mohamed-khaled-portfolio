// Constants
import { MONTHS } from '@/src/utils/helpers.constants'

export function formatDate(value: string) {
    const [year, month] = value.split('-')
    return `${MONTHS[Number(month) - 1] ?? ''} ${year}`.trim()
}

export function formatVideoTime(seconds: number) {
    if (!Number.isFinite(seconds)) return '0:00'
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
}

export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchWithRetry<T>(
    fn: () => Promise<T>,
    retries = 3,
    delay = 1000,
): Promise<T> {
    try {
        return await fn()
    } catch (error) {
        if (retries <= 1) throw error
        await sleep(delay)
        return fetchWithRetry(fn, retries - 1, Math.round(delay * 1.5))
    }
}
