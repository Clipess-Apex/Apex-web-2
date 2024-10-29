// src/react-lottie.d.ts
declare module 'react-lottie' {
    import { Component } from 'react';

    export interface LottieOptions {
        loop?: boolean;
        autoplay?: boolean;
        animationData: any;
        rendererSettings?: {
            preserveAspectRatio?: string;
        };
    }

    export interface LottieProps {
        options: LottieOptions;
        height?: number | string;
        width?: number | string;
        isStopped?: boolean;
        isPaused?: boolean;
        speed?: number;
        direction?: number;
        ariaRole?: string;
        ariaLabel?: string;
        eventListeners?: Array<{
            eventName: string;
            callback: () => void;
        }>;
        segments?: number[] | boolean;
    }

    export default class Lottie extends Component<LottieProps> {}
}
