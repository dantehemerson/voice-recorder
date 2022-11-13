import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StopButton } from './StopButton';

export default {
  component: StopButton,
  title: StopButton.name,
} as ComponentMeta<typeof StopButton>;

const Template: ComponentStory<typeof StopButton> = (args) => (
  <StopButton {...args} />
);

export const Primary = Template.bind({});

Primary.args = {};
