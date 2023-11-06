import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getBucketImage } from '../../api/api';
import PropTypes from 'prop-types';

const TextImageLectureScreen = ({ lecture, course }) => {

  const [imageUrl, setImageUrl] = useState(null);

  const [paragraphs, setParagraphs] = useState(null);

  useEffect(() => {

    if (lecture.image) {
      getLectureImage();
    }
    splitText(lecture.description);

  }, []);


  const getLectureImage = async () => {

    try {
      const imageRes = await getBucketImage(lecture.image);
      setImageUrl(imageRes);
    }
    catch (err) {

      setImageUrl(null);
    }


  };

  //split text into paragraphs and dont cut words
  const splitText = (text) => {


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


    // Now, `_paragraphs` contains the split text.
    setParagraphs(_paragraphs);
  };

  return (<View className={'absolute w-full h-full px-4 pt-20'}>
    {/* <ProgressTopBar progressPercent={progress} color='black' /> */}
    {/* Content */}
    <Text className="text-center text-2xl pt-6 font-bold">BEM VINDO!</Text>
    <ScrollView className=" mt-2">


      {
        // Rendering all paragraphs above the image if the array has two or fewer elements
        // If the array has more than two elements, rendering all but the last paragraph above the image
        paragraphs && paragraphs.map((paragraph, index) => {
          if (paragraphs.length <= 2 || index !== paragraphs.length - 1) {
            return (
              index == 0 ?
                <Text key={index} className="text-[18px] pt-4 px-4 text-primary">{paragraph}</Text>
                :
                <Text key={index} className="text-[18px] pt-4 px-4 text-projectGray">{paragraph}</Text>
            );
          }
          return null;
        })
      }

      {/* Image */}
      {imageUrl && <View className="w-full h-[25vh] px-4 pt-8" >
        <Image
          source={{ uri: imageUrl }}
          className="w-full h-full"
        />
      </View>}
      {
        // Rendering the last paragraph below the image if the array has more than two elements
        paragraphs && paragraphs.length > 2 &&
                <Text className="text-[18px] px-4 text-projectGray">{paragraphs[paragraphs.length - 1]}</Text>
      }
    </ScrollView>

    <View className="flex-col w-full justify-left drop-shadow-2xl mt-2 pb-4 pt-2" >
      {/* Course name and lecturen name */}
      <View className="w-full flex-row justify-between">

        <View className=" flex-col mb-8">
          <Text className=" text-projectGray " >Nome do curso: {course.title}</Text>
          <Text className=" text-xl font-bold text-black " >{lecture.title}</Text>
        </View>
      </View>
    </View>
  </View>);
};

TextImageLectureScreen.propTypes = {
  lecture: PropTypes.object,
  course: PropTypes.object,
};

export default TextImageLectureScreen;