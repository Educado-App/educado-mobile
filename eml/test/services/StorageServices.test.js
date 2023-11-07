import * as api from '../../api/api.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as StorageService from '../../services/StorageService.js';
import { sub } from 'react-native-reanimated';
import { mockDataAPI } from '../mockData/mockDataAPI.js';
import { mockDataAsyncStorage } from '../mockData/mockDataAsyncStorage.js';


jest.mock('@react-native-async-storage/async-storage');

// Mock the API functions
jest.mock('../../api/api');

const mockData = mockDataAPI();
const mockDataAsync = mockDataAsyncStorage();


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

  /** COURSES */

  describe('Course', () => {
    it('should return the course from AsyncStorage if it exists', async () => {
      const course_id = mockData.courseData._id;

      // Arrange
      AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockData.courseData));
      jest.spyOn(api, 'getCourse').mockResolvedValueOnce(mockData.courseData);

      // Act
      const result = await StorageService.getCourseId(course_id);

      // Assert
      expect(result).toEqual(mockData.courseData);

      // Clean up by restoring the original api.getCourses function
      jest.restoreAllMocks();

    });

    it('should call refreshCourse if course is not in AsyncStorage', async () => {

      // Arrange
      AsyncStorage.getItem.mockResolvedValueOnce(null);
      jest.spyOn(api, 'getCourse').mockResolvedValueOnce(mockData.courseData);

      // Act
      const result = await StorageService.getCourseId(mockData.courseData._id);

      // Assert
      expect(result).toEqual(mockData.courseData);

      // Clean up by restoring the original api.getCourses function
      jest.restoreAllMocks();

    });

    it('should handle errors getting from async storage', async () => {

      const errorMessage = "Error getting course from async storage: " + mockData.errorResponse;

      // Mock AsyncStorage to simulate an error
      AsyncStorage.getItem.mockRejectedValue(new Error(errorMessage));

      // Mock the refreshCourse function from the 'api' module to throw an error
      jest.spyOn(StorageService, 'refreshCourse').mockRejectedValue(new Error(errorMessage));

      try {
        await StorageService.getCourseId(mockData.course_id);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual(errorMessage);
      }

      // Clean up by restoring the original mock functions
      jest.restoreAllMocks();
    });

    it('should handle errors in refreshCourse', async () => {

      const errorMessage = "Error getting course from database: " + mockData.errorResponse;

      // Mock AsyncStorage to simulate an error
      AsyncStorage.getItem.mockResolvedValue(null);
      AsyncStorage.getItem.mockRejectedValue(new Error(errorMessage));

      // Mocking the refreshCourse function from StorageServices
      jest.spyOn(StorageService, 'refreshCourse').mockRejectedValue(new Error(errorMessage));

      try {
        await StorageService.getCourseId(mockData.courseData._id);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual(errorMessage);
        expect(AsyncStorage.setItem).not.toHaveBeenCalled();
      }
      //Clean up by restoring the original StorageService.refreshCourse function
      jest.restoreAllMocks();
    });
  });

  describe('Course List', () => {
    // Test cases for getCourseList
    it('should return the course list from AsyncStorage if it exists', async () => {

      // Arrange
      AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockDataAsync.allCourses));
      jest.spyOn(api, 'getCourses').mockResolvedValueOnce(mockData.allCoursesData);

      // Act
      const result = await StorageService.getCourseList();

      // Assert
      expect(result).toEqual(mockDataAsync.allCourses);

      // Clean up by restoring the original api.getCourses function
      jest.restoreAllMocks();
    });

    it('should call refreshCourseList if course list is not in AsyncStorage', async () => {

      // Arrange
      AsyncStorage.getItem.mockResolvedValueOnce(null);
      jest.spyOn(api, 'getCourses').mockResolvedValueOnce(mockData.allCoursesData);

      // Act
      const result = await StorageService.getCourseList();

      // Assert
      expect(result).toEqual(mockDataAsync.allCourses);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@courseList',
        JSON.stringify(mockDataAsync.allCourses)
      );

      // Clean up by restoring the original api.getCourses function
      jest.restoreAllMocks();

    });

    it('should handle errors getting from async storage', async () => {

      const errorMessage = "Error getting course list from async storage: " + mockData.errorResponse;

      // Mock AsyncStorage to simulate an error
      AsyncStorage.getItem.mockRejectedValue(new Error(errorMessage));

      // Mock the refreshCourseList function from the 'api' module to throw an error
      jest.spyOn(StorageService, 'refreshCourseList').mockRejectedValue(new Error(errorMessage));

      try {
        await StorageService.getCourseList();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual(errorMessage);
      }

      // Clean up by restoring the original mock functions
      jest.restoreAllMocks();
    });

    it('should handle errors in refreshCourseList', async () => {

      const errorMessage = "Error getting course list from database: " + mockData.errorResponse;

      // Mock AsyncStorage to simulate an error
      AsyncStorage.getItem.mockResolvedValue(null);
      AsyncStorage.getItem.mockRejectedValue(new Error(errorMessage));

      // Mocking the refreshCourseList function from StorageServices
      jest.spyOn(StorageService, 'refreshCourseList').mockRejectedValue(new Error(errorMessage));

      try {
        await StorageService.getCourseList();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual(errorMessage);
        expect(AsyncStorage.setItem).not.toHaveBeenCalled();
      }
      //Clean up by restoring the original StorageService.refreshCourseList function
      jest.restoreAllMocks();
    });

  });

  /** SECTIONS **/
  describe('Section List', () => {
    it('should return the section list from AsyncStorage if it exists', async () => {

      // Arrange
      AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockDataAsync.sectionData));
      jest.spyOn(api, 'getAllSections').mockResolvedValueOnce(mockData.sectionData);

      // Act
      const result = await StorageService.getSectionList(mockData.courseData._id);

      // Assert
      expect(result).toEqual(mockDataAsync.sectionData);

      // Clean up by restoring the original api.getCourses function
      jest.restoreAllMocks();
    });
    it('should call refreshSectionList if section list is not in AsyncStorage', async () => {

      // Arrange
      AsyncStorage.getItem.mockResolvedValueOnce(null);
      jest.spyOn(api, 'getAllSections').mockResolvedValueOnce(mockData.sectionData);

      // Act
      const result = await StorageService.getSectionList(mockData.courseData._id);

      // Assert
      expect(result).toEqual(mockDataAsync.sectionData);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@sectionList',
        JSON.stringify(mockDataAsync.sectionData)
      );

      // Clean up by restoring the original api.getCourses function
      jest.restoreAllMocks();

    });
    it('should handle errors getting from async storage', async () => {
      const errorMessage = "Error getting section list from async storage: " + mockData.errorResponse;

      // Mock AsyncStorage to simulate an error
      AsyncStorage.getItem.mockRejectedValue(new Error(errorMessage));

      // Mock the refreshCourseList function from the 'api' module to throw an error
      jest.spyOn(StorageService, 'refreshSectionList').mockRejectedValue(new Error(errorMessage));

      try {
        await StorageService.getSectionList(mockData.courseData._id);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual(errorMessage);
      }

      // Clean up by restoring the original mock functions
      jest.restoreAllMocks();
    });
    it('should handle errors in refreshSectionList', async () => {
      const errorMessage = "Error getting section list from database: " + mockData.errorResponse;

      // Mock AsyncStorage to simulate an error
      AsyncStorage.getItem.mockResolvedValue(null);
      AsyncStorage.getItem.mockRejectedValue(new Error(errorMessage));

      // Mocking the refreshCourseList function from StorageServices
      jest.spyOn(StorageService, 'refreshSectionList').mockRejectedValue(new Error(errorMessage));

      try {
        await StorageService.getSectionList(mockData.courseData._id);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual(errorMessage);
        expect(AsyncStorage.setItem).not.toHaveBeenCalled();
      }
      //Clean up by restoring the original StorageService.refreshCourseList function
      jest.restoreAllMocks();
    });
  });

  /** SUBSCRIPTION **/

  describe('Subscribed Course List', () => {
    beforeEach(() => {
      jest.clearAllMocks(); // Clear all mocked function calls before each test
    });

    // Test cases for getSubCourseList
    it('should return the subscribed course list from AsyncStorage if it exists', async () => {
      // Mock AsyncStorage behavior
      AsyncStorage.getItem.mockResolvedValue(mockData.userData._id);
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockDataAsync.subscribedCourses));

      // Mock the api.getSubscriptions function
      jest.spyOn(api, 'getSubscriptions').mockResolvedValue(mockData.subscribedCourses);

      const result = await StorageService.getSubCourseList();

      expect(result).toEqual(mockDataAsync.subscribedCourses);
    });

    it('should call refreshSubCourseList and return its result if courses are not in AsyncStorage', async () => {
      // Mock AsyncStorage behavior
      AsyncStorage.getItem
        .mockResolvedValueOnce(mockData.userData._id)
        .mockResolvedValueOnce(null); // Mock the user ID and course list as not found

      // Mock the refreshSubCourseList function
      jest.spyOn(StorageService, 'refreshSubCourseList').mockResolvedValue(mockDataAsync.subscribedCourses);

      // Mock the api.getSubscriptions function
      jest.spyOn(api, 'getSubscriptions').mockResolvedValue(mockData.subscribedCourses);

      const result = await StorageService.getSubCourseList();

      expect(result).toEqual(mockDataAsync.subscribedCourses);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@subCourseList',
        JSON.stringify(mockDataAsync.subscribedCourses)
      );
    });

    it('should throw an error if AsyncStorage getItem fails', async () => {
      // Mock AsyncStorage to simulate a failure
      AsyncStorage.getItem.mockRejectedValue(new Error("Cannot fetch user id from async storage"));

      await expect(StorageService.getSubCourseList()).rejects.toThrow('Cannot fetch user id from async storage');
    });
  });

  describe('subscribe', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should subscribe the user to a course', async () => {
      // Mock AsyncStorage.getItem to return a user ID
      AsyncStorage.getItem.mockResolvedValue(mockData.userData._id); 

      // Mock the successful behavior of api.subscribeToCourse
      await api.subscribeToCourse.mockResolvedValue('Subscription Successful');

      // Call the subscribe function
      const result = await StorageService.subscribe(mockData.courseData._id);

      // Assert that the result is as expected
      expect(result).toBe('Subscription Successful');

      // Assert that AsyncStorage.getItem was called with the correct arguments
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@userId');

      // Assert that api.subscribeToCourse was called with the correct arguments
      expect(api.subscribeToCourse).toHaveBeenCalledWith(mockData.userData._id, mockData.courseData._id);
    });

    it('should throw an error when AsyncStorage getItem fails', async () => {
      // Mock AsyncStorage.getItem to simulate a failure
      AsyncStorage.getItem.mockRejectedValue(new Error('Cannot fetch user id from async storage'));

      // Assert that the subscribe function throws the expected error
      await expect(StorageService.subscribe(mockData.courseData._id)).rejects.toThrow('Cannot fetch user id from async storage');

      // Assert that AsyncStorage.getItem was called with the correct arguments
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@userId');
    });

    it('should throw an error when api.subscribeToCourse fails', async () => {
      // Mock AsyncStorage.getItem to return a user ID
      AsyncStorage.getItem.mockResolvedValue(mockData.userData._id); 

      // Mock the behavior of api.subscribeToCourse to simulate a failure
      api.subscribeToCourse.mockRejectedValue(new Error('Subscription failed'));

      // Assert that the subscribe function throws the expected error
      await expect(StorageService.subscribe(mockData.courseData._id)).rejects.toThrow('Subscription failed');

      // Assert that AsyncStorage.getItem was called with the correct arguments
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@userId');

      // Assert that api.subscribeToCourse was called with the correct arguments
      expect(api.subscribeToCourse).toHaveBeenCalledWith(mockData.userData._id, mockData.courseData._id);
    });
  });

  describe('unsubscribe', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should unsubscribe the user to a course', async () => {
      // Mock AsyncStorage.getItem to return a user ID
      AsyncStorage.getItem.mockResolvedValue(mockData.userData._id);

      // Mock the successful behavior of api.subscribeToCourse
      await api.unSubscribeToCourse.mockResolvedValue('Unsubscription Successful');

      // Call the subscribe function
      const result = await StorageService.unsubscribe(mockData.courseData._id);

      // Assert that the result is as expected
      expect(result).toBe('Unsubscription Successful');

      // Assert that AsyncStorage.getItem was called with the correct arguments
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@userId');

      // Assert that api.subscribeToCourse was called with the correct arguments
      expect(api.unSubscribeToCourse).toHaveBeenCalledWith(mockData.userData._id, mockData.courseData._id);
    });

    it('should throw an error when AsyncStorage getItem fails', async () => {
      // Mock AsyncStorage.getItem to simulate a failure
      AsyncStorage.getItem.mockRejectedValue(new Error('Cannot fetch user id from async storage'));

      // Assert that the subscribe function throws the expected error
      await expect(StorageService.unsubscribe(mockData.courseData._id)).rejects.toThrow('Cannot fetch user id from async storage');

      // Assert that AsyncStorage.getItem was called with the correct arguments
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@userId');
    });

    it('should throw an error when api.subscribeToCourse fails', async () => {
      // Mock AsyncStorage.getItem to return a user ID
      AsyncStorage.getItem.mockResolvedValue(mockData.userData._id);

      // Mock the behavior of api.subscribeToCourse to simulate a failure
      api.unSubscribeToCourse.mockRejectedValue(new Error('Unsubscription failed'));

      // Assert that the subscribe function throws the expected error
      await expect(StorageService.unsubscribe(mockData.courseData._id)).rejects.toThrow('Unsubscription failed');

      // Assert that AsyncStorage.getItem was called with the correct arguments
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@userId');

      // Assert that api.subscribeToCourse was called with the correct arguments
      expect(api.unSubscribeToCourse).toHaveBeenCalledWith(mockData.userData._id, mockData.courseData._id);
    });
  });

  describe('checkSubscriptions', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should check if the user is subscribed to a course', async () => {
      // Mock AsyncStorage.getItem to return a user ID
      AsyncStorage.getItem.mockResolvedValue(mockData.userData._id);

      // Mock the successful behavior of api.ifSubscribed
      await api.ifSubscribed.mockResolvedValue(true);

      // Call the checkSubscriptions function
      const result = await StorageService.checkSubscriptions(mockData.courseData._id);

      // Assert that the result is as expected
      expect(result).toBe(true);

      // Assert that AsyncStorage.getItem was called with the correct arguments
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@userId');

      // Assert that api.ifSubscribed was called with the correct arguments
      expect(api.ifSubscribed).toHaveBeenCalledWith(mockData.userData._id, mockData.courseData._id);
    });

    it('should throw an error when AsyncStorage getItem fails', async () => {
      // Mock AsyncStorage.getItem to simulate a failure
      AsyncStorage.getItem.mockRejectedValue(new Error('Cannot fetch user id from async storage'));

      // Assert that the checkSubscriptions function throws the expected error
      await expect(StorageService.checkSubscriptions(mockData.courseData._id)).rejects.toThrow('Cannot fetch user id from async storage');

      // Assert that AsyncStorage.getItem was called with the correct arguments
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@userId');
    });

    it('should throw an error when api.ifSubscribed fails', async () => {
      // Mock AsyncStorage.getItem to return a user ID
      AsyncStorage.getItem.mockResolvedValue(mockData.userData._id); 

      // Mock the behavior of api.ifSubscribed to simulate a failure
      await api.ifSubscribed.mockRejectedValue(new Error('Subscription check failed'));

      // Assert that the checkSubscriptions function throws the expected error
      await expect(StorageService.checkSubscriptions(mockData.courseData._id)).rejects.toThrow('Subscription check failed');

      // Assert that AsyncStorage.getItem was called with the correct arguments
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@userId');

      // Assert that api.ifSubscribed was called with the correct arguments
      expect(api.ifSubscribed).toHaveBeenCalledWith(mockData.userData._id, mockData.courseData._id);
    });
  });


  /** Downloading course **/



  /*jest.mock('api', () => ({
    getCourse: jest.fn(),
    getAllSections: jest.fn(),
    getLecturesInSection: jest.fn(),
    getExercisesInSection: jest.fn(),
  })); */

  describe('storeCourseLocally', () => {
    it('stores course locally', async () => {
      // Mock API responses
      api.getCourse.mockResolvedValue({ courseId: '123', /* other course properties */ });
      api.getAllSections.mockResolvedValue([{ _id: 'section1' }, { _id: 'section2' }]);
      api.getLecturesInSection.mockResolvedValue([]);
      api.getExercisesInSection.mockResolvedValue([]);

      // Mock AsyncStorage functions
      AsyncStorage.setItem = jest.fn();
      AsyncStorage.removeItem = jest.fn();

      const result = await StorageService.storeCourseLocally('123');
      expect(result).toBe(true);

      // Assert AsyncStorage calls
      expect(await AsyncStorage.setItem).toHaveBeenCalledTimes(6);
      expect(await AsyncStorage.removeItem).toHaveBeenCalledTimes(3);
    });

    it('handles errors during storage', async () => {
      // Mock API function to throw an error
      api.getCourse.mockRejectedValue(new Error('API error'));

      // Mock AsyncStorage functions
      AsyncStorage.setItem = jest.fn();
      AsyncStorage.removeItem = jest.fn();

      const result = await StorageService.storeCourseLocally('123');
      expect(result).toBe(false);

      // Assert AsyncStorage calls
      expect(await AsyncStorage.setItem).not.toHaveBeenCalled();
      expect(await AsyncStorage.removeItem).not.toHaveBeenCalled();
    });
  });

  describe('deleteLocallyStoredCourse', () => {
    it('deletes locally stored course', async () => {
      // Mock AsyncStorage functions
      AsyncStorage.removeItem = jest.fn();

      const sectionList = [{ _id: 'section1' }, { _id: 'section2' }];

      const result = await StorageService.deleteLocallyStoredCourse('123');
      expect(result).toBe(true);

      // Assert AsyncStorage calls
      expect(await AsyncStorage.removeItem).toHaveBeenCalledTimes(3);
    });

    it('handles errors during deletion', async () => {
      // Mock AsyncStorage function to throw an error
      AsyncStorage.removeItem = jest.fn().mockRejectedValue(new Error('AsyncStorage error'));

      const sectionList = [{ _id: 'section1' }, { _id: 'section2' }];

      const result = await StorageService.deleteLocallyStoredCourse('123', sectionList);
      expect(result).toBe(false);

      // Assert AsyncStorage calls
      expect(await AsyncStorage.removeItem).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateStoredCourses', () => {
    it('updates locally stored courses', async () => {
      // Mock functions and responses
      const subList = [{ courseId: '123', dateUpdated: '2023-11-03' }];
      api.getCourse.mockResolvedValue({ courseId: '123', /* other course properties */ });
      AsyncStorage.getItem = jest.fn().mockResolvedValue(JSON.stringify({ dateUpdated: '2023-11-02' }));
      AsyncStorage.setItem = jest.fn();

      await StorageService.updateStoredCourses(subList);

      // Assert AsyncStorage calls
      expect(api.getCourse).toHaveBeenCalledTimes(3);
      expect(AsyncStorage.getItem).toHaveBeenCalledTimes(3);
      expect(AsyncStorage.setItem).toHaveBeenCalledTimes(2);
    });

    it('handles errors during update', async () => {
      // Mock functions to throw errors
      const subList = [{ courseId: '123', dateUpdated: '2023-11-03' }];
      api.getCourse.mockRejectedValue(new Error('API error'));
      AsyncStorage.getItem = jest.fn().mockRejectedValue(new Error('AsyncStorage error'));
      AsyncStorage.setItem = jest.fn();

      await StorageService.updateStoredCourses(subList);

      // Assert AsyncStorage calls
      expect(api.getCourse).toHaveBeenCalledTimes(3);
      expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1);
      expect(AsyncStorage.setItem).not.toHaveBeenCalled();
    });
  });




});
