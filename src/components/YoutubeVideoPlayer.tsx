import * as React from 'react';
import {VideoPlayerWrapper} from './VideoPlayerWrapper';

export interface YoutubeVideoPlayerProps {
  title: string;
  videoId: string;
};

export function YoutubeVideoPlayer({title, videoId}:YoutubeVideoPlayerProps) {
  return (
    <VideoPlayerWrapper>
      <iframe src={'https://www.youtube-nocookie.com/embed/' + videoId}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen>
      </iframe>
    </VideoPlayerWrapper>
  );
};
