import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import logo from '../../assets/images/logo.png';

const CertificateTemplate = ({
    studentName,
    estimatedCourseDuration,
    courseName,
    dateOfCompletion,
    creatorName
}) => {
    return (
        <View className={"p-2 bg-projectWhite rounded-sm flex items-center"}>
            <View className={"  border-2"}/* style={styles.outerBleed} */>
                <View className={"flex border-2 m-2 border-progressBar"} /* style={styles.innerBleed} */>
                    <View className={"flex flex-col items-center px-8 justify-around"} /* style={styles.content} */>
                        <Text className={"font-semibold text-primary_custom text-base mt-5 mb-2"}/* style={styles.title} */>CERTIFICADO DE CONCLUSÃO</Text>
                        <Text className={"text-center text-[10px]"}  /* style={styles.mainText} */>
                            Certificamos que {studentName} concluiu com sucesso {estimatedCourseDuration} horas do curso de {courseName} no dia {dateOfCompletion}, na modalidade de educação à distância na plataforma Educado.
                        </Text>
                        <View className="w-full flex items-center mt-4"/* style={styles.signatureContainer} */>
                            <Text className="italic text-[8px]" /* style={styles.signature} */>{creatorName}</Text>
                            <View className="border-b border-black w-[40%] mt-1"/>
                            <Text className="text-[8px]">{creatorName}, Instrutor</Text>
                        </View>
                        
                        <Image
                            className={"scale-[0.25]"}
                            /* style={styles.logo} */
                            source={logo}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};


export default CertificateTemplate;