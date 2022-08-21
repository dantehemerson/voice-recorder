import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Slider, SliderProps } from './Slider';

export default {
  component: Slider,
  title: 'Slider',
} as ComponentMeta<typeof Slider>;

const Template: ComponentStory<typeof Slider> = (args: SliderProps) => (
  <Slider {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
};
