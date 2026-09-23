'use client'

// Components
import PortfolioLoading from '@/src/components/UiRelated/PortfolioLoading'
import PortfolioError from '@/src/components/UiRelated/PortfolioError'
// Hooks
import { usePortfolio } from '@/src/providers/PortfolioProvider'

export default function Home() {
    const { portfolioData, portfolioError, isPortfolioLoading } = usePortfolio()

    if (isPortfolioLoading) {
        return <PortfolioLoading message='Loading portfolio data...' />
    }

    if (portfolioError) {
        return <PortfolioError message={portfolioError} />
    }

    console.log('Portfolio Data:', portfolioData)

    return <div>Hello</div>
}
