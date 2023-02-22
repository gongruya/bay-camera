import * as React from 'react';
import VideoPlayerWrapper from './VideoPlayerWrapper.tsx';

export default function YoutubeVideoPlayer({ title, videoId }) {
  return (
    <VideoPlayerWrapper>
      <iframe src={'https://www.youtube-nocookie.com/embed/' + videoId}
        frameBorder="0"
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen>
      </iframe>
    </VideoPlayerWrapper>
  );
};