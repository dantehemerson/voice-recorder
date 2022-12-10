import { useEffect, useRef, useState } from 'react';

export enum AudioPlayerState {
  LOADING,
  PAUSED,
  PLAYING,
  FAILED,
}

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [state, setState] = useState<AudioPlayerState>(AudioPlayerState.PAUSED);
  const [currentTime, _setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    console.log('🤫 Dante ➤ AudioPlayer ➤ audioRef', audioRef);

    audioRef.current.onplay = () => {
      setState(AudioPlayerState.PLAYING);
    };

    audioRef.current.onpause = () => {
      setState(AudioPlayerState.PAUSED);
    };

    if (audioRef.current.readyState > 0) {
      setDuration(audioRef.current.duration);
    }

    audioRef.current.onloadedmetadata = () => {
      setDuration(audioRef.current.duration);
    };

    audioRef.current.ontimeupdate = () => {
      _setCurrentTime(audioRef.current.currentTime);
    };
  }, []);

  function pause() {
    audioRef.current.pause();
  }

  function play() {
    audioRef.current.play();
  }

  function setCurrentTime(newTime: number) {
    console.log('Changint time');
    _setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  }

  return {
    audioRef,
    state,
    setCurrentTime,
    duration,
    currentTime,
    pause,
    play,

    get isPlaying() {
      switch (state) {
        case AudioPlayerState.LOADING:
        case AudioPlayerState.PLAYING:
          return true;
        default:
          return false;
      }
    },
  };
}
