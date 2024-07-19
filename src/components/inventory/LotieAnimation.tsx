import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../icons/inventory/Animation .json';


interface LottieAnimationProps {
    height?: number | string;
    width?: number | string;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ height = 400, width = 400 }) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return <Lottie options={defaultOptions} height={height} width={width} />;
};

export default LottieAnimation;
