import React from 'react'
import { Icon } from '@rneui/themed'

export default function headerIcon({ color, name, type }) {
  return <Icon name={name} type={type} color={color} />
}
