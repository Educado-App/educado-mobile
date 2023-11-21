import { View } from 'react-native';
import React from 'react';
import Text from '../general/Text';
import PropTypes from 'prop-types';
import CertificateModal from './CertificateModal';
import CertificateSignature from './CertificateSignature';
import EducadoLogo from '../images/EducadoLogo';

/**
 * Component to create modal (popup) that shows user a preview of certificate
 * @param {Object} props Should contain the following properties
 * - modalVisible: Boolean to show if modal should be visible
 * - onModalClose: Function to do when modal closes
 * - certificate: a certificate to preview
 */
export default function CertificatePreview(props) {
  const { modalVisible, onModalClose, certificate } = props;

  const studentName = certificate?.studentFirstName + ' ' + certificate?.studentLastName;
  const courseDuration = certificate?.estimatedCourseDuration;
  const courseName = certificate?.courseName;
  const doc = certificate?.dateOfCompletion;
  const courseCreator = certificate?.courseCreator;

  const certificateText = `Certificamos que ${studentName} concluiu com sucesso 
  ${courseDuration} horas do curso de ${courseName} no dia 
  ${doc}, na modalidade de educação à distância na plataforma Educado.`

  return (
    <CertificateModal modalVisible={modalVisible} closeModal={onModalClose} id="EducadoModal">
      <View className="flex flex-1 flex-row justify-end p-4">
        <View className="flex-1 border-solid border-2 border-black m-2 ">
          <View className="flex-1 border-solid border-2 border-primary m-2">
            <Text className="text-center text-4xl text-webprimary font-bold p-6">CERTIFICADO DE CONCLUSÃO</Text>

            <Text className="p-4 text-center text-projectBlack text-xl">{certificateText}</Text>

            <CertificateSignature className="pt-4 text-center text-projectBlack text-lg">{courseCreator}</CertificateSignature>
            <View className="h-0.5 my-1 mx-20 bg-projectBlack"></View>
            <Text className="px-4 text-center text-projectBlack text-sm">{courseCreator}, Instrutor</Text>

            <View className="pt-8 mb-2 mx-auto">
              <EducadoLogo />
            </View>
          </View>
        </View>
      </View>
    </CertificateModal >
  );
}

CertificatePreview.propTypes = {
  modalVisible: PropTypes.bool,
  onModalClose: PropTypes.func,
  certificate: PropTypes.object,
};