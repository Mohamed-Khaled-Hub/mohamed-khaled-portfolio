// Types
import { PortfolioData } from '@/src/types/portfolio.types'
import { PortfolioDataResponse } from '@/src/types/api.types'

export type PortfolioContextType = {
    portfolioData: PortfolioData | null
    isPortfolioLoading: boolean
    portfolioError: string | null
    getPortfolioData: () => Promise<PortfolioDataResponse>
}
