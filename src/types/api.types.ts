// Types
import { PortfolioData } from '@/src/types/portfolio.types'

export type PortfolioDataResponse =
    | PortfolioData
    | {
          message: string
      }
