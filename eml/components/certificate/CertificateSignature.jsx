import RN from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

export default function CertificateSignature(props) {
  return (
    <RN.Text {...props} className="font-ooohbaby text-projectBlack text-body">{props.children}</RN.Text>
  );
}

CertificateSignature.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
};