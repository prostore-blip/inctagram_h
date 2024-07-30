import type { Meta, StoryObj } from '@storybook/react'
 

import { SingUp } from './singUp'
 
const meta = {
  title: 'Auth/SingUp',
  component: SingUp,
  tags: ['autodocs'],
} satisfies Meta<typeof SingUp>
 
export default meta
type Story = StoryObj<typeof meta>
 
export const Primary: Story = {}