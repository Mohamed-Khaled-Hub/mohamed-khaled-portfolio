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
