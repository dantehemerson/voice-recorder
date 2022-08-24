import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PlayPauseButton, PlayPauseButtonProps } from './PlayPauseButton';

export default {
  component: PlayPauseButton,
  title: 'PlayPauseButton',
} as ComponentMeta<typeof PlayPauseButton>;

const Template: ComponentStory<typeof PlayPauseButton> = (
  args: PlayPauseButtonProps
) => {
  const [playing, setPlaying] = React.useState(args.playing);

  return (
    <div onClick={() => setPlaying(!playing)}>
      <PlayPauseButton {...args} playing={playing} />
    </div>
  );
};

export const Primary = Template.bind({});

Primary.args = {
  playing: false,
};
