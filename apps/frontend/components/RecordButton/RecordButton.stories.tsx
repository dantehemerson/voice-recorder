import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RecordButton } from './RecordButton';

export default {
  component: RecordButton,
  title: 'RecordButton',
} as ComponentMeta<typeof RecordButton>;

const Template: ComponentStory<typeof RecordButton> = (args) => (
  <RecordButton {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  stopped: true,
};
