import React, { useEffect, useState } from 'react';
import YouTube, { YouTubePlayer } from 'react-youtube';
import { Button } from './ui/button';
import { Input } from './ui/input';


const YouTubeAudioPlayer = ({ videoId }: { videoId: any }) => {
    const [player, setPlayer] = useState<YouTubePlayer | null>(null);
    const [duration, setDuration] = useState<number>(0);
    const [time, setTime] = useState<number>(0);

    const onPlayerReady = (event: any) => {
        setPlayer(event.target);
        setDuration(event.target.getDuration())
    };

    const playAudio = () => {
        if (player) player.playVideo();
    };

    const pauseAudio = () => {
        if (player) player.pauseVideo();
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (player && player.getCurrentTime) {
                setTime(player.getCurrentTime());
            }
        }, 1000)
        return () => clearInterval(interval);
    }, [player])

    const handleSeek = (e: any) => {
        const newTime = parseFloat(e.target.value)
        setTime(newTime)
        if (player) player.seekTo(newTime)
    }
    const opts = {
        height: '0',
        width: '0',
        playerVars: {
            autoplay: 0,
            controls: 0,
            modestbranding: 1,
        },
    };

    


    return (
        <div className='flex justify-center'>
            <div className='flex  min-w-full h-16'>
                <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} style={{ opacity: 0 }} />
                <div className='w-full flex justify-center gap-4'>
                    <Button onClick={playAudio}>Play</Button>
                    <Button onClick={pauseAudio}>Pause</Button>
                </div>
                <div className='w-full flex justify-center gap-4'>
                    <Input type='range' min={0} max={duration} value={time} onChange={handleSeek} className='rounded-md' />
                    <div className='flex gap-4'>
                        <p>{time.toFixed(2)}</p>/
                        <p>{duration.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YouTubeAudioPlayer;
