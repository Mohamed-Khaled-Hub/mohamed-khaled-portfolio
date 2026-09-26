'use client'

// Core
import axios from 'axios'
import {
    PropsWithChildren,
    createContext,
    useContext,
    useCallback,
    useMemo,
    useState,
    useEffect,
} from 'react'
// Functions
import { fetchWithRetry } from '@/src/utils/helpers.functions'
// Types
import { PortfolioData } from '@/src/types/portfolio.types'
import { PortfolioDataResponse } from '@/src/types/api.types'
import { PortfolioContextType } from '@/src/types/context.types'

// Context
export const PortfolioContext = createContext<PortfolioContextType>(
    {} as PortfolioContextType,
)

// Hook
export const usePortfolio = () => {
    const context = useContext(PortfolioContext)
    if (!context) {
        throw new Error('usePortfolio must be used within a PortfolioProvider')
    }
    return context
}

// Provider
export default function PortfolioProvider({ children }: PropsWithChildren) {
    const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(
        null,
    )
    const [isPortfolioLoading, setIsPortfolioLoading] = useState<boolean>(true)
    const [portfolioError, setPortfolioError] = useState<string | null>(null)

    // Call API with retries
    const fetchPortfolioDataWithRetry =
        useCallback(async (): Promise<PortfolioDataResponse> => {
            return fetchWithRetry(
                async () => {
                    const { data } = await axios.get<PortfolioDataResponse>(
                        '/api/mohamed-khaled-info',
                    )
                    return data
                },
                3,
                1000,
            )
        }, [])

    // GET /api/mohamed-khaled-info
    const getPortfolioData =
        useCallback(async (): Promise<PortfolioDataResponse> => {
            setIsPortfolioLoading(true)
            setPortfolioError(null)

            try {
                const data = await fetchPortfolioDataWithRetry()

                if ('message' in data) {
                    setPortfolioError(data.message)
                } else {
                    setPortfolioData(data)
                }

                return data
            } catch (err) {
                const message =
                    axios.isAxiosError(err) && err.response?.data?.message
                        ? err.response.data.message
                        : 'Failed to load portfolio data. Please check your connection.'

                setPortfolioError(message)
                return { message }
            } finally {
                setIsPortfolioLoading(false)
            }
        }, [fetchPortfolioDataWithRetry])

    // Fetch portfolio data
    useEffect(() => {
        let isMounted = true

        const fetchInitialData = async () => {
            try {
                const data = await fetchPortfolioDataWithRetry()

                if (!isMounted) return

                if ('message' in data) {
                    setPortfolioError(data.message)
                } else {
                    setPortfolioData(data)
                }
            } catch (err) {
                if (!isMounted) return

                const message =
                    axios.isAxiosError(err) && err.response?.data?.message
                        ? err.response.data.message
                        : 'Failed to load portfolio data. Please check your connection.'

                setPortfolioError(message)
            } finally {
                if (isMounted) {
                    setIsPortfolioLoading(false)
                }
            }
        }

        fetchInitialData().then()

        return () => {
            isMounted = false
        }
    }, [fetchPortfolioDataWithRetry])

    // Context Value
    const contextValue = useMemo(
        () => ({
            portfolioData,
            isPortfolioLoading,
            portfolioError,
            getPortfolioData,
        }),
        [portfolioData, isPortfolioLoading, portfolioError, getPortfolioData],
    )

    return (
        <PortfolioContext.Provider value={contextValue}>
            {children}
        </PortfolioContext.Provider>
    )
}
