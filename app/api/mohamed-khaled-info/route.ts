// Cores
import path from 'path'
import { promises as fs } from 'fs'
import { NextResponse } from 'next/server'
// Types
import { PortfolioData } from '@/src/types/portfolio.types'
import { PortfolioDataResponse } from '@/src/types/api.types'

// Portfolio JSON path
const filePath = path.join(process.cwd(), 'public', 'mohamed-khaled-info.json')

// Portfolio Object
let portfolioData: PortfolioData | null = null

// GET /api/mohamed-khaled-info
export async function GET(): Promise<NextResponse<PortfolioDataResponse>> {
    try {
        if (!portfolioData) {
            const file = await fs.readFile(filePath, 'utf-8')
            portfolioData = JSON.parse(file) as PortfolioData
        }

        return NextResponse.json(portfolioData)
    } catch (error) {
        console.error('Failed to read portfolio data:', error)

        const errorMessage =
            error instanceof Error
                ? error.message
                : 'Failed to load portfolio data'

        return NextResponse.json({ message: errorMessage }, { status: 500 })
    }
}
