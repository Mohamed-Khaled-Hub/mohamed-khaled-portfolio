// Cores
import path from 'path'
import { promises as fs } from 'fs'
import { NextResponse } from 'next/server'
// Types
import { PortfolioData } from '@/src/types/portfolio.types'
import { PortfolioDataResponse } from '@/src/types/api.types'

export async function GET(): Promise<NextResponse<PortfolioDataResponse>> {
    try {
        const filePath = path.join(
            process.cwd(),
            'public',
            'mohamed-khaled-info.json',
        )

        const file = await fs.readFile(filePath, 'utf-8')
        const data = JSON.parse(file) as PortfolioData

        return NextResponse.json(data)
    } catch (error) {
        console.error('Failed to read portfolio data:', error)

        const errorMessage =
            error instanceof Error
                ? error.message
                : 'Failed to load portfolio data'

        return NextResponse.json({ message: errorMessage }, { status: 500 })
    }
}
