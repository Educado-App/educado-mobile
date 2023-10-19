import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Image } from 'react-native';
import ProgressTopBar from './ProgressTopBar';
import { ScrollView } from 'react-native-gesture-handler';

const TextImageLectureScreen = ({ lecture, course }) => {



    const [imageUrl, setImageUrl] = useState(null);

    const [paragraphs, setParagraphs] = useState(null);

    useEffect(() => {

        if (lecture.image) {
            console.log("INSIDE TEXT IMAGE LECTURE SCREEN", lecture.image)
        }
        splitText(lecture.description);

    }, [])


    //split text into paragraphs and dont cut words
    const splitText = (text) => {
        console.log("INSIDE SPLIT TEXT")
        console.log("TEXT", text, text.length)
        let _paragraphs = [];

        if (text.length < 250) {
            _paragraphs.push(text);
            setParagraphs(_paragraphs);
            return;
        }

        // Function to find the nearest space to break the string.
        const findBreakPoint = (str, start, direction = 1) => {
            let pos = start;
            while (pos > 0 && pos < str.length) {
                if (str[pos] === ' ') return pos;
                pos += direction;
            }
            return pos;
        };

        // If the text is less than 300 characters, then the first chunk should be the entire text.
        if (text.length <= 250) {
            _paragraphs.push(text);
        } else {
            // Find the nearest space to 300th character to break the string.
            const breakPoint1 = findBreakPoint(text, 250);
            _paragraphs.push(text.substring(0, breakPoint1));

            // Remaining text to be divided into 150 character chunks.
            let remainingText = text.substring(breakPoint1);

            while (remainingText.length > 0) {
                const breakPoint = findBreakPoint(remainingText, 100);
                const chunk = remainingText.substring(0, breakPoint);
                _paragraphs.push(chunk);
                remainingText = remainingText.substring(breakPoint);
            }
        }


        console.log("PARAGRAPHS", _paragraphs)

        // Now, `_paragraphs` contains the split text.
        setParagraphs(_paragraphs);
    };


    return (<View className={"absolute w-full h-full p-5 pb-20"}>
        <ProgressTopBar progressPercent={75} color='black' />
        {/* Content */}

        <ScrollView className="flex-grow">
            <Text className="text-center text-2xl pt-8 font-bold">BEM VINDO!</Text>

            {
                // Rendering all paragraphs above the image if the array has two or fewer elements
                // If the array has more than two elements, rendering all but the last paragraph above the image
                paragraphs && paragraphs.map((paragraph, index) => {
                    if (paragraphs.length <= 2 || index !== paragraphs.length - 1) {
                        return (
                            <Text key={index + paragraph} className={index === 0 ? "text-[18px] pt-6 text-primary" : "text-[18px] pt-4 text-gray "}>{paragraph}</Text>
                        );
                    }
                    return null;
                })
            }


            {/* {paragraphs && paragraphs.length == 1 &&
                <Text className=" text-[18px] pt-4 text-gray ">{paragraphs[0]}</Text>
            } */}


            {/* Image */}
            {imageUrl && <View className="w-full h-[50vh] pt-8" >
                <Image
                    source={{ uri: lecture.image }}
                    style={{ width: '100%', height: '100%' }}
                />
            </View>}
            {!imageUrl && <View className="w-full h-[25vh] pt-8" >
                <Image
                    source={{ uri: "https://media.cnn.com/api/v1/images/stellar/prod/231003090501-01-lebron-bronny-james.jpg?c=16x9&q=h_720,w_1280,c_fill" }}
                    style={{ width: '100%', height: '100%' }}
                />
            </View>}
            {
                // Rendering the last paragraph below the image if the array has more than two elements
                paragraphs && paragraphs.length > 2 &&
                <Text className=" text-[18px] pt-4 text-gray ">{paragraphs[paragraphs.length - 1]}</Text>
            }
        </ScrollView>


        <View className="w-full flex-col items-start justify-left pt-4" >
            {/* Course name and lecturen name */}
            <View className="w-full flex-row justify-between items-end">

                <View className=" flex-col">
                    <Text className=" text-gray " >Course Name: {course.title}</Text>
                    <Text className=" text-xl font-bold text-black " >{lecture.title && lecture.title}</Text>
                </View>
            </View>
        </View>
    </View>);
}

export default TextImageLectureScreen;