import React from 'react'
import Confetti from 'react-confetti'
import { useWindowDimensions } from 'react-native'

export default function Victory() {
  const { height, width } = useWindowDimensions()
  return <Confetti width={width} height={height} />
}
