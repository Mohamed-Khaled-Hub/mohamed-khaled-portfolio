// Constants
import { MONTHS } from '@/src/utils/helpers.constants'

export function formatDate(value: string) {
    const [year, month] = value.split('-')
    return `${MONTHS[Number(month) - 1] ?? ''} ${year}`.trim()
}
