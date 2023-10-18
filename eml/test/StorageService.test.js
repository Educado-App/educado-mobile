/**
 * This file contains unit tests for the StorageService module.
 * The module provides functions for storing and retrieving data from AsyncStorage.
 * The tests cover the following functions:
 * - getCourseList
 * - getSubCourseList
 * - getSectionList
 * - getCourseId
 * - clearAsyncStorage
 * 
 * The tests use Jest and mock AsyncStorage to simulate storage operations.
 * 
 * @module StorageService.test.js
 */
import * as api from '../api/api.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getCourseList,
  getSubCourseList,
  getSectionList,
  getCourseId,
  clearAsyncStorage
} from '../services/StorageService.js';

jest.mock('@react-native-async-storage/async-storage');


describe('Async Storage Functions', () => {
  // Helper function to reset mocked AsyncStorage
  const resetAsyncStorage = () => {
    AsyncStorage.clear();
    AsyncStorage.getItem.mockReset();
    AsyncStorage.setItem.mockReset();
  };

  beforeEach(() => {
    resetAsyncStorage();
  });

  const mockDataAPI = {
    userData: {
      _id: '651a78592cf67cb9e721aea1',
      name: 'test test',
      email: 'test@mail.dk',
      subscriptions: ['651d596a26cd9875d86a12b7'],
    },
    courseData: {
      title: 'Course math',
      _id: '651d3a15cda7d5bd2878dfc7',
      sections: ['651d40e3cdcba354b1b9490d', '651d599626cd9875d86a12bc'],
      description: 'Test',
      category: 'Finanças pessoais',
      estimatedHours: 10,
      dateUpdated: '2023-10-04T10:10:29.897Z',
      dateCreated: '2023-10-04T10:10:29.897Z',
      difficulty: 1,
      published: true,
      status: 'published',
      rating: 0,
      numOfSubscriptions: 0,
      __v: 6,
    },
    sectionData: [
      {
        title: 'test section',
        _id: '651d40e3cdcba354b1b9490d',
        parentCourse: '651d3a15cda7d5bd2878dfc7',
        description: 'this is a test section',
        components: [],
        sectionNumber: 1,
        totalPoints: 100,
        dateUpdated: '2023-10-04T10:10:29.897Z',
        dateCreated: '2023-10-04T10:10:29.897Z',
        __v: 1,
      },
      {
        title: 'test section 2',
        _id: '651d599626cd9875d86a12bc',
        parentCourse: '651d3a15cda7d5bd2878dfc7',
        description: 'this is a test section 2',
        components: [],
        sectionNumber: 2,
        totalPoints: 200,
        dateUpdated: '2023-10-04T10:10:29.897Z',
        dateCreated: '2023-10-04T10:10:29.897Z',
        __v: 1,
      },
    ],
    allCoursesData: [
      {
        title: 'Course math',
        _id: '651d3a15cda7d5bd2878dfc7',
        sections: ['651d40e3cdcba354b1b9490d'],
        description: 'Test',
        category: 'Finanças pessoais',
        estimatedHours: 10,
        dateUpdated: '2023-10-04T10:10:29.897Z',
        dateCreated: '2023-10-04T10:10:29.897Z',
        difficulty: 1,
        published: true,
        status: 'published',
        rating: 0,
        numOfSubscriptions: 0,
        __v: 6,
      },
      {
        title: 'Just a test course',
        _id: '651d596a26cd9875d86a12b7',
        sections: ['651d599626cd9875d86a12bc', '651d59a126cd9875d86a12c0'],
        description: 'Test description',
        category: 'Costura',
        estimatedHours: 20,
        dateUpdated: '2023-10-04T12:24:10.740Z',
        dateCreated: '2023-10-04T12:24:10.740Z',
        difficulty: 3,
        published: true,
        status: 'published',
        rating: 3,
        numOfSubscriptions: 0,
        __v: 2,
      },
    ],
    subscribedCourses: [
      {
        title: 'Just a test course',
        _id: '651d596a26cd9875d86a12b7',
        sections: ['651d599626cd9875d86a12bc', '651d59a126cd9875d86a12c0'],
        description: 'Test description',
        category: 'Costura',
        estimatedHours: 20,
        dateUpdated: '2023-10-04T12:24:10.740Z',
        dateCreated: '2023-10-04T12:24:10.740Z',
        difficulty: 3,
        published: true,
        status: 'published',
        rating: 3,
        numOfSubscriptions: 0,
        __v: 2,
      },
    ],
  };

  const mockDataAsyncStorage = {

    allCourses: [
      {
        title: 'Course math',
        courseId: '651d3a15cda7d5bd2878dfc7',
        description: 'Test',
        category: 'Finanças pessoais',
        estimatedHours: 10,
        dateUpdated: '2023-10-04T10:10:29.897Z',
        difficulty: 1,
        published: true,
        status: 'published',
        rating: 0,
      },
      {
        title: 'Just a test course',
        courseId: '651d596a26cd9875d86a12b7',
        description: 'Test description',
        category: 'Costura',
        estimatedHours: 20,
        dateUpdated: '2023-10-04T12:24:10.740Z',
        difficulty: 3,
        published: true,
        status: 'published',
        rating: 3,
      },
    ],
    subscribedCourses: [
      {
        title: 'Just a test course',
        courseId: '651d596a26cd9875d86a12b7',
        description: 'Test description',
        category: 'Costura',
        estimatedHours: 20,
        dateUpdated: '2023-10-04T12:24:10.740Z',
        difficulty: 3,
        published: true,
        status: 'published',
        rating: 3,
      }
    ],
    sectionData: [

      {
        title: 'test section',
        sectionId: '651d40e3cdcba354b1b9490d',
        parentCourseId: '651d3a15cda7d5bd2878dfc7',
        description: 'this is a test section',
        components: [],
        total: 100,
      },
      {
        title: 'test section 2',
        sectionId: '651d599626cd9875d86a12bc',
        parentCourseId: '651d3a15cda7d5bd2878dfc7',
        description: 'this is a test section 2',
        components: [],
        total: 200,
      },
    ],
  };

  describe('Course List', () => {
    // Test cases for getCourseList
    it('should return the course list from AsyncStorage if it exists', async () => {
      // Arrange
      AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockDataAsyncStorage.allCourses));
      jest.spyOn(api, 'getCourses').mockResolvedValueOnce(mockDataAPI.allCoursesData);

      // Act
      const result = await getCourseList();

      // Assert
      expect(result).toEqual(mockDataAsyncStorage.allCourses);

      // Clean up by restoring the original api.getCourses function
      jest.restoreAllMocks();


    });

    it('should call refreshCourseList if course list is not in AsyncStorage', async () => {
      // Arrange
      AsyncStorage.getItem.mockResolvedValueOnce(null);
      jest.spyOn(api, 'getCourses').mockResolvedValueOnce(mockDataAPI.allCoursesData);

      // Act
      const result = await getCourseList();

      // Assert
      expect(result).toEqual(mockDataAsyncStorage.allCourses);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@courseList',
        JSON.stringify(mockDataAsyncStorage.allCourses)
      );

      // Clean up by restoring the original api.getCourses function
      jest.restoreAllMocks();

    });

    it('should handle errors gracefully when refreshing course list', async () => {

      // Arrange
      AsyncStorage.getItem.mockResolvedValueOnce(null);

      const mockError = new Error('API error');
      api.getCourses = jest.fn(() => {
        throw mockError;
      });
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

      // Act
      const result = await getCourseList();

      // Assert
      expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);

      // Clean up by restoring the original api.getCourses function
      api.getCourses.mockRestore();
      consoleErrorSpy.mockRestore();
    });
  });

  describe('Subscribed Course List', () => {
    // Test cases for getCourseList

    it('should return the subscribed course list from AsyncStorage if it exists', async () => {
      // Arrange
      AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockDataAsyncStorage.subscribedCourses));
      jest.spyOn(api, 'getSubscriptions').mockResolvedValueOnce(mockDataAPI.subscribedCourses);

      // Act
      const result = await getSubCourseList();

      // Assert
      expect(result).toEqual(mockDataAsyncStorage.subscribedCourses);

      // Clean up by restoring the original api.getCourses function
      jest.restoreAllMocks();

    });

    it('should call refreshCourseList if the subscribed course list is not in AsyncStorage', async () => {
      AsyncStorage.getItem.mockResolvedValueOnce(null);

      jest.spyOn(api, 'getSubscriptions').mockResolvedValueOnce(mockDataAPI.subscribedCourses);

      const result = await getSubCourseList();
      expect(result).toEqual(mockDataAsyncStorage.subscribedCourses);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@subCourseList',
        JSON.stringify(mockDataAsyncStorage.subscribedCourses)
      );

      // Clean up by restoring the original api.getCourses function
      jest.restoreAllMocks();

    });

    it('should handle errors gracefully when refreshing course list', async () => {

      AsyncStorage.getItem.mockResolvedValueOnce(null);

      const mockError = new Error('API error');
      api.getSubscriptions = jest.fn(() => {
        throw mockError;
      });

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

      const result = await getSubCourseList();
      expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);

      // Clean up by restoring the original api.getCourses function
      api.getSubscriptions.mockRestore();
      consoleErrorSpy.mockRestore();
    });

  });

  describe('getSectionList', () => {
    it('should return the section list from AsyncStorage if it exist', async () => {

      const course_id = mockDataAPI.courseData._id;
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockDataAsyncStorage.sectionData));

      // Arrange
      jest.spyOn(api, 'getAllSections').mockResolvedValueOnce(mockDataAPI.sectionData);

      const result = await getSectionList(course_id);
      expect(result).toEqual(mockDataAsyncStorage.sectionData);

      // Clean up by restoring the original api.getCourses function
      jest.restoreAllMocks();
    });


    it('should call refreshSectionList if its not in AsyncStorage', async () => {

      const course_id = mockDataAPI.courseData._id;

      jest.spyOn(api, 'getAllSections').mockResolvedValueOnce(mockDataAPI.sectionData);

      AsyncStorage.getItem.mockResolvedValue(null);

      const result = await getSectionList(course_id);

      // Assert
      expect(result).toEqual(mockDataAsyncStorage.sectionData);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@sectionList',
        JSON.stringify(mockDataAsyncStorage.sectionData)
      );

      // Clean up by restoring the original api.getCourses function
      jest.restoreAllMocks();
    });


    it('should handle errors gracefully when getting section list', async () => {
      // Arrange
      const course_id = mockDataAPI.courseData._id;

      AsyncStorage.getItem.mockResolvedValue(null);

      const mockError = new Error('API error');
      api.getAllSections = jest.fn(() => {
        throw mockError;
      });

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

      // Act
      const result = await getSectionList(course_id);
      // Assert
      expect(result).toBeUndefined();
      expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);

      // Clean up by restoring the original api.getCourses function
      api.getAllSections.mockRestore();
      consoleErrorSpy.mockRestore();
    });
  });

  describe('getCourseId', () => {
    it('should return the course from AsyncStorage if it exists', async () => {

      const course_id = mockDataAPI.courseData._id;

      AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockDataAPI.courseData));

      jest.spyOn(api, 'getCourse').mockResolvedValueOnce(mockDataAPI.courseData);

      const result = await getCourseId(course_id);
      expect(result).toEqual(mockDataAPI.courseData);

      // Clean up by restoring the original api.getCourses function
      jest.restoreAllMocks();

    });

    it('should call refreshCourse if course is not in AsyncStorage', async () => {

      const course_id = mockDataAPI.courseData._id;

      AsyncStorage.getItem.mockResolvedValueOnce(null);

      jest.spyOn(api, 'getCourse').mockResolvedValueOnce(mockDataAPI.courseData);

      const result = await getCourseId(course_id);

      expect(result).toEqual(mockDataAPI.courseData);

      // Clean up by restoring the original api.getCourses function
      jest.restoreAllMocks();
    });

    it('should handle errors gracefully when refreshing course', async () => {

      const course_id = mockDataAPI.courseData._id;

      AsyncStorage.getItem.mockResolvedValue(null);

      const mockError = new Error('API error');
      api.getCourse = jest.fn(() => {
        throw mockError;
      });

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

      // Act
      const result = await getCourseId(course_id);
      // Assert
      expect(result).toBeUndefined();
      expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);

      // Clean up by restoring the original api.getCourses function
      api.getCourse.mockRestore();
      consoleErrorSpy.mockRestore();
    });
  });


  // Test cases for clearAsyncStorage
  it('should clear AsyncStorage', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    await clearAsyncStorage();
    expect(AsyncStorage.clear).toHaveBeenCalled();
    consoleLogSpy.mockRestore();

  });

});