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
        <View className={"bg-projectWhite m-4 p-2 rounded-md flex items-center"}>
            <View className={"h-[210px] w-[342px] border-2 flex items-center"}/* style={styles.outerBleed} */>
                <View className={"flex h-full border-2 border-progressBar"} /* style={styles.innerBleed} */>
                    <View className={"flex flex-col items-center px-6 flex-grow"} /* style={styles.content} */>
                        <Text className={"text-primary_custom font-semibold text-base mb-4"}/* style={styles.title} */>CERTIFICADO DE CONCLUSÃO</Text>
                        <Text className={"text-[10px] text-center"}/* style={styles.mainText} */>
                            Certificamos que {studentName} concluiu com sucesso {estimatedCourseDuration} horas do curso de {courseName} no dia {dateOfCompletion}, na modalidade de educação à distância na plataforma Educado.
                        </Text>
                        <View /* style={styles.signatureContainer} */>
                            <Text /* style={styles.signature} */>{creatorName}</Text>
                            <Text>{creatorName}, Instrutor</Text>
                        </View>
                        <View className={"flex-grow"} />
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

const styles = StyleSheet.create({
    outerBleed: {
        height: 662,
        width: 342,
        display: 'flex',
        margin: 16,
        borderWidth: 2,
        borderColor: '#000',
    },
    innerBleed: {
        display: 'flex',
        margin: 16,
        padding: 16,
        borderWidth: 2,
        borderColor: '#5ECCE9',
    },
    content: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 36,
        color: '#166276',
        fontWeight: '700',
        marginTop: 80,
    },
    mainText: {
        margin: 16,
        fontSize: 24,
        textAlign: 'center',
    },
    signatureContainer: {
        marginVertical: 48,
        alignItems: 'center',
    },
    signature: {
        fontFamily: 'Oooh Baby', // Ensure this font is available in your project
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginBottom: 8,
        paddingBottom: 8,
        fontSize: 24,
    },
    logo: {
        marginVertical: 16,
        width: 160,
        height: 160, // Adjust height to maintain aspect ratio
    },
    qrCode: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: 80,
        height: 80, // Adjust height to maintain aspect ratio
    },
});

export default CertificateTemplate;