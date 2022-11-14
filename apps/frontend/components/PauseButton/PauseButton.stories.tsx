import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PauseButton } from './PauseButton';

export default {
  component: PauseButton,
  title: PauseButton.name,
} as ComponentMeta<typeof PauseButton>;

const Template: ComponentStory<typeof PauseButton> = (args) => (
  <PauseButton {...args} />
);

export const Primary = Template.bind({});

Primary.args = {};
