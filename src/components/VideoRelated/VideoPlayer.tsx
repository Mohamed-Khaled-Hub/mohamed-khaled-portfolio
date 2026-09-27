'use client'

// Core
import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
    Maximize,
    Minimize,
    Pause,
    Play,
    RotateCcw,
    RotateCw,
    Volume2,
    VolumeX,
} from 'lucide-react'
// Constants
import { SHORTCUTS, RATES } from '@/src/utils/helpers.constants'
// Functions
import { formatVideoTime } from '@/src/utils/helpers.functions'
// Types
import { Feedback, FeedbackType } from '@/src/types/ui.types'
import { VideoPlayerProps } from '@/src/types/props.types'
// Styles
import '@/src/styles/components/VideoRelated/VideoPlayer.css'

export default function VideoPlayer({
    src,
    extraShortcuts = [],
}: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const progressRef = useRef<HTMLInputElement>(null)
    const hideTimeout = useRef<ReturnType<typeof setTimeout>>(undefined)
    const feedbackId = useRef(0)

    const [playing, setPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(1)
    const [muted, setMuted] = useState(false)
    const [rateIndex, setRateIndex] = useState(1)
    const [fullscreen, setFullscreen] = useState(false)
    const [uiVisible, setUiVisible] = useState(true)
    const [feedback, setFeedback] = useState<Feedback | null>(null)

    const allShortcuts = [...SHORTCUTS, ...extraShortcuts]

    const triggerFeedback = (type: FeedbackType, value?: number) => {
        const id = ++feedbackId.current
        setFeedback({ id, type, value })
        setTimeout(() => {
            setFeedback((current) => (current?.id === id ? null : current))
        }, 700)
    }

    const updateProgressFill = useCallback(
        (time: number) => {
            const input = progressRef.current
            if (!input || !duration) return
            const pct = (time / duration) * 100
            input.style.background = `linear-gradient(to right, var(--color-c5) ${pct}%, var(--color-c3) ${pct}%)`
        },
        [duration],
    )

    // Sync state with the <video> element
    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const onTimeUpdate = () => {
            setCurrentTime(video.currentTime)
            updateProgressFill(video.currentTime)
        }
        const onLoadedMetadata = () => setDuration(video.duration)
        const onPlay = () => setPlaying(true)
        const onPause = () => setPlaying(false)

        video.addEventListener('timeupdate', onTimeUpdate)
        video.addEventListener('loadedmetadata', onLoadedMetadata)
        video.addEventListener('play', onPlay)
        video.addEventListener('pause', onPause)

        return () => {
            video.removeEventListener('timeupdate', onTimeUpdate)
            video.removeEventListener('loadedmetadata', onLoadedMetadata)
            video.removeEventListener('play', onPlay)
            video.removeEventListener('pause', onPause)
        }
    }, [fullscreen, updateProgressFill])

    // Track native fullscreen state
    useEffect(() => {
        const onFullscreenChange = () => {
            setFullscreen(document.fullscreenElement === containerRef.current)
        }
        document.addEventListener('fullscreenchange', onFullscreenChange)
        return () =>
            document.removeEventListener('fullscreenchange', onFullscreenChange)
    }, [])

    const togglePlay = () => {
        const video = videoRef.current
        if (!video) return
        if (video.paused) {
            void video.play()
            triggerFeedback('play')
        } else {
            video.pause()
            triggerFeedback('pause')
        }
    }

    const seekBy = (delta: number) => {
        const video = videoRef.current
        if (!video) return
        video.currentTime = Math.min(
            Math.max(video.currentTime + delta, 0),
            video.duration || 0,
        )
        triggerFeedback(delta > 0 ? 'forward' : 'backward')
    }

    const jumpToPercent = (tenth: number) => {
        const video = videoRef.current
        if (!video || !video.duration) return
        video.currentTime = (video.duration * tenth) / 10
    }

    const changeVolume = (delta: number) => {
        const video = videoRef.current
        if (!video) return
        const next = Math.min(Math.max(video.volume + delta, 0), 1)
        video.volume = next
        video.muted = false
        setVolume(next)
        setMuted(false)
        triggerFeedback(delta > 0 ? 'volumeUp' : 'volumeDown', next)
    }

    const toggleMute = () => {
        const video = videoRef.current
        if (!video) return
        video.muted = !video.muted
        setMuted(video.muted)
        triggerFeedback(video.muted ? 'mute' : 'unmute')
    }

    const toggleFullscreen = () => {
        if (document.fullscreenElement) {
            void document.exitFullscreen()
        } else {
            void containerRef.current?.requestFullscreen({
                navigationUI: 'hide',
            })
        }
    }

    const cycleRate = () => {
        const video = videoRef.current
        if (!video) return
        const next = (rateIndex + 1) % RATES.length
        video.playbackRate = RATES[next]
        setRateIndex(next)
    }

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const target = event.target as HTMLElement
            if (['INPUT', 'TEXTAREA'].includes(target.tagName)) return

            const key = event.key.toLowerCase()

            if (key === ' ' || key === 'k') {
                event.preventDefault()
                togglePlay()
            } else if (key === 'arrowright' || key === 'l') {
                event.preventDefault()
                seekBy(10)
            } else if (key === 'arrowleft' || key === 'j') {
                event.preventDefault()
                seekBy(-10)
            } else if (key === 'arrowup') {
                event.preventDefault()
                changeVolume(0.1)
            } else if (key === 'arrowdown') {
                event.preventDefault()
                changeVolume(-0.1)
            } else if (key === 'm') {
                toggleMute()
            } else if (key === 'f') {
                toggleFullscreen()
            } else if (/^[0-9]$/.test(key)) {
                jumpToPercent(Number(key))
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Auto-hide the shortcuts list and controls bar
    // Only while fullscreen, playing, reappearing on mouse movement, a key press, or a tap
    useEffect(() => {
        const resetHideTimer = () => {
            setUiVisible(true)
            clearTimeout(hideTimeout.current)
            if (fullscreen && playing) {
                hideTimeout.current = setTimeout(
                    () => setUiVisible(false),
                    4000,
                )
            }
        }

        resetHideTimer()

        if (!fullscreen || !playing) return

        const container = containerRef.current
        container?.addEventListener('mousemove', resetHideTimer)
        container?.addEventListener('keydown', resetHideTimer)
        container?.addEventListener('touchstart', resetHideTimer)

        return () => {
            clearTimeout(hideTimeout.current)
            container?.removeEventListener('mousemove', resetHideTimer)
            container?.removeEventListener('keydown', resetHideTimer)
            container?.removeEventListener('touchstart', resetHideTimer)
        }
    }, [fullscreen, playing])

    // Make the thumb of the video moves smoothly
    useEffect(() => {
        if (!playing) return
        let frame: number
        const tick = () => {
            const video = videoRef.current
            if (video) {
                setCurrentTime(video.currentTime)
                updateProgressFill(video.currentTime)
            }
            frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(frame)
    }, [playing, duration, updateProgressFill])

    const renderFeedbackIcon = () => {
        if (!feedback) return null

        switch (feedback.type) {
            case 'play':
                return <Play size={26} aria-hidden />
            case 'pause':
                return <Pause size={26} aria-hidden />
            case 'forward':
                return (
                    <>
                        <RotateCw size={26} aria-hidden />
                        <span>10s</span>
                    </>
                )
            case 'backward':
                return (
                    <>
                        <RotateCcw size={26} aria-hidden />
                        <span>10s</span>
                    </>
                )
            case 'volumeUp':
            case 'volumeDown':
                return (
                    <>
                        {(feedback.value ?? 0) === 0 ? (
                            <VolumeX size={26} aria-hidden />
                        ) : (
                            <Volume2 size={26} aria-hidden />
                        )}
                        <span>{Math.round((feedback.value ?? 0) * 100)}%</span>
                    </>
                )
            case 'mute':
                return <VolumeX size={26} aria-hidden />
            case 'unmute':
                return <Volume2 size={26} aria-hidden />
        }
    }

    const shortcutsClassName = [
        'video-player-shortcuts',
        fullscreen && 'video-player-shortcuts-overlay',
        fullscreen && !uiVisible && 'video-player-shortcuts-hidden',
    ]
        .filter(Boolean)
        .join(' ')

    const controlsClassName = [
        'video-player-controls',
        fullscreen && 'video-player-controls-fullscreen',
        fullscreen && !uiVisible && 'video-player-controls-hidden',
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <div
            ref={containerRef}
            className={
                fullscreen
                    ? 'video-player video-player-fullscreen'
                    : 'video-player'
            }
        >
            <div className={shortcutsClassName}>
                <ul className='video-player-shortcuts-list'>
                    {allShortcuts.map((shortcut) => (
                        <li
                            key={shortcut.label}
                            className='video-player-shortcuts-row'
                        >
                            <span className='video-player-shortcuts-keys'>
                                {shortcut.keys.map((key) => (
                                    <kbd key={key} className='video-player-kbd'>
                                        {key}
                                    </kbd>
                                ))}
                            </span>
                            <span className='video-player-shortcuts-label'>
                                {shortcut.label}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <div
                className={
                    fullscreen
                        ? 'video-player-media-wrap video-player-media-wrap-fullscreen'
                        : 'video-player-media-wrap'
                }
            >
                <video
                    ref={videoRef}
                    src={src}
                    autoPlay
                    onClick={togglePlay}
                    className={
                        fullscreen
                            ? 'video-player-media video-player-media-fullscreen'
                            : 'video-player-media video-player-media-inline'
                    }
                />

                <AnimatePresence>
                    {feedback && (
                        <motion.div
                            key={feedback.id}
                            className='video-player-feedback'
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            transition={{
                                duration: 0.25,
                                ease: [0.33, 1, 0.68, 1],
                            }}
                        >
                            <span className='video-player-feedback-badge'>
                                {renderFeedbackIcon()}
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className={controlsClassName}>
                <input
                    ref={progressRef}
                    type='range'
                    min={0}
                    max={duration || 0}
                    value={currentTime}
                    step={0.1}
                    onChange={(event) => {
                        const video = videoRef.current
                        if (!video) return
                        const next = Number(event.target.value)
                        video.currentTime = next
                        setCurrentTime(next)
                        updateProgressFill(next)
                    }}
                    className='video-player-progress'
                    aria-label='Seek'
                />

                <div className='video-player-controls-row'>
                    <div className='video-player-controls-group'>
                        <button
                            type='button'
                            onClick={() => seekBy(-10)}
                            className='video-player-btn'
                            aria-label='Back 10 seconds'
                        >
                            <RotateCcw size={16} aria-hidden />
                        </button>
                        <button
                            type='button'
                            onClick={togglePlay}
                            className='video-player-btn'
                            aria-label={playing ? 'Pause' : 'Play'}
                        >
                            {playing ? (
                                <Pause size={16} aria-hidden />
                            ) : (
                                <Play size={16} aria-hidden />
                            )}
                        </button>
                        <button
                            type='button'
                            onClick={() => seekBy(10)}
                            className='video-player-btn'
                            aria-label='Forward 10 seconds'
                        >
                            <RotateCw size={16} aria-hidden />
                        </button>
                        <span className='video-player-time'>
                            {formatVideoTime(currentTime)} /{' '}
                            {formatVideoTime(duration)}
                        </span>
                    </div>

                    <div className='video-player-controls-group'>
                        <button
                            type='button'
                            onClick={toggleMute}
                            className='video-player-btn'
                            aria-label={muted ? 'Unmute' : 'Mute'}
                        >
                            {muted || volume === 0 ? (
                                <VolumeX size={16} aria-hidden />
                            ) : (
                                <Volume2 size={16} aria-hidden />
                            )}
                        </button>
                        <input
                            type='range'
                            min={0}
                            max={1}
                            step={0.05}
                            value={muted ? 0 : volume}
                            onChange={(event) => {
                                const video = videoRef.current
                                if (!video) return
                                const next = Number(event.target.value)
                                video.volume = next
                                video.muted = false
                                setVolume(next)
                                setMuted(false)
                            }}
                            className='video-player-volume'
                            aria-label='Volume'
                        />
                        <button
                            type='button'
                            onClick={cycleRate}
                            className='video-player-btn video-player-rate'
                        >
                            {RATES[rateIndex]}x
                        </button>
                        <button
                            type='button'
                            onClick={toggleFullscreen}
                            className='video-player-btn'
                            aria-label={
                                fullscreen
                                    ? 'Exit fullscreen'
                                    : 'Enter fullscreen'
                            }
                        >
                            {fullscreen ? (
                                <Minimize size={16} aria-hidden />
                            ) : (
                                <Maximize size={16} aria-hidden />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
