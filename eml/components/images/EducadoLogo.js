import React from 'react';
import { Image } from 'react-native';

export default function EducadoLogo(props) {

  return (
    <Image
      source={require('../../assets/logo_educado.png')}
      style={props.style}
      className={'h-12'}
      resizeMode='contain'
    />
  );
}
