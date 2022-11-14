import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Logo } from './Logo';

export default {
  component: Logo,
  title: Logo.name,
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
