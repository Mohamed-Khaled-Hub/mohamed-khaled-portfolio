export type Section = { id: string; label: string }

export type Shortcut = {
    keys: string[]
    label: string
}

export type FeedbackType =
    | 'play'
    | 'pause'
    | 'forward'
    | 'backward'
    | 'volumeUp'
    | 'volumeDown'
    | 'mute'
    | 'unmute'

export type Feedback = {
    id: number
    type: FeedbackType
    value?: number
}
