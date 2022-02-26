
import {useQuery,useMutation,useQueryClient} from 'react-query'
import React, {Component, useEffect,useState} from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, ScrollView, Image, FlatList } from 'react-native';

import {getCourses} from './../../api/api';
import CourseContainer from './../../components/CourseContainer';

export default NewCourses = (props) => {
    // Access the client
    const queryClient = useQueryClient();

    // Queries
    const query = useQuery('courses', getCourses);

    return (
        <View>
            {query.status === "success" && query.data.map((obj,index) => {
                return (
                <ScrollView>
                    <CourseContainer nav={props.navigation} key={index} course={obj}></CourseContainer>
                </ScrollView>
                ) 
            })}
            {query.status === "loading" && <Text>Loading...</Text>}
        </View>
    )
};