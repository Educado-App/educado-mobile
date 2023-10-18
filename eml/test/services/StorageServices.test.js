import * as api from '../../api/api.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as StorageService from '../../services/StorageService.js';

jest.mock('@react-native-async-storage/async-storage');

// Mock the API functions
jest.mock('../../api/api');


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
    errorResponse: new Error('Error message'),
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
      const result = await StorageService.getCourseList();

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
      const result = await StorageService.getCourseList();

      // Assert
      expect(result).toEqual(mockDataAsyncStorage.allCourses);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@courseList',
        JSON.stringify(mockDataAsyncStorage.allCourses)
      );

      // Clean up by restoring the original api.getCourses function
      jest.restoreAllMocks();

    });

    it('should handle errors getting from async storage', async () => {

      const errorMessage = "Error getting course list from async storage: " + mockDataAPI.errorResponse;

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

      const errorMessage = "Error getting course list from database: " + mockDataAPI.errorResponse;

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

  describe('Subscribed Course List', () => {
    // Test cases for getSubCourseList
    it('should return the subscribed course list from AsyncStorage if it exists', async () => {

      // Arrange
      AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockDataAsyncStorage.subscribedCourses));
      jest.spyOn(api, 'getSubscriptions').mockResolvedValueOnce(mockDataAPI.subscribedCourses);

      // Act
      const result = await StorageService.getSubCourseList();

      // Assert
      expect(result).toEqual(mockDataAsyncStorage.subscribedCourses);

      // Clean up by restoring the original api.getCourses function
      jest.restoreAllMocks();
    });

    it('should call refreshCourseList if course list is not in AsyncStorage', async () => {

      //Arrange
      AsyncStorage.getItem.mockResolvedValueOnce(null);

      // Act
      jest.spyOn(api, 'getSubscriptions').mockResolvedValueOnce(mockDataAPI.subscribedCourses);

      const result = await StorageService.getSubCourseList();

      // Assert
      expect(result).toEqual(mockDataAsyncStorage.subscribedCourses);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@subCourseList',
        JSON.stringify(mockDataAsyncStorage.subscribedCourses)
      );

      // Clean up by restoring the original api.getCourses function
      jest.restoreAllMocks();

    });

    it('should handle errors getting from async storage', async () => {

      const errorMessage = "Error getting subscribed course list from async storage: " + mockDataAPI.errorResponse;

      // Mock AsyncStorage to simulate an error
      AsyncStorage.getItem.mockRejectedValue(new Error(errorMessage));

      // Mock the refreshCourseList function from the 'api' module to throw an error
      jest.spyOn(StorageService, 'refreshSubCourseList').mockRejectedValue(new Error(errorMessage));

      try {
        await StorageService.getSubCourseList();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual(errorMessage);
      }

      // Clean up by restoring the original mock functions
      jest.restoreAllMocks();
    });

    it('should handle errors in refreshCourseList', async () => {

      const errorMessage = "Error getting subscribed course list from database: " + mockDataAPI.errorResponse;

      // Mock AsyncStorage to simulate an error
      AsyncStorage.getItem.mockResolvedValue(null);
      AsyncStorage.getItem.mockRejectedValue(new Error(errorMessage));

      // Mocking the refreshCourseList function from StorageServices
      jest.spyOn(StorageService, 'refreshSubCourseList').mockRejectedValue(new Error(errorMessage));

      try {
        await StorageService.getSubCourseList();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual(errorMessage);
        expect(AsyncStorage.setItem).not.toHaveBeenCalled();
      }
      //Clean up by restoring the original StorageService.refreshCourseList function
      jest.restoreAllMocks();
    });
  });

  describe('Section List', () => {
    it('should return the section list from AsyncStorage if it exists', async () => {

      // Arrange
      AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockDataAsyncStorage.sectionData));
      jest.spyOn(api, 'getAllSections').mockResolvedValueOnce(mockDataAPI.sectionData);

      // Act
      const result = await StorageService.getSectionList(mockDataAPI.courseData._id);

      // Assert
      expect(result).toEqual(mockDataAsyncStorage.sectionData);

      // Clean up by restoring the original api.getCourses function
      jest.restoreAllMocks();
    });
    it('should call refreshSectionList if section list is not in AsyncStorage', async () => {

      // Arrange
      AsyncStorage.getItem.mockResolvedValueOnce(null);
      jest.spyOn(api, 'getAllSections').mockResolvedValueOnce(mockDataAPI.sectionData);

      // Act
      const result = await StorageService.getSectionList(mockDataAPI.courseData._id);

      // Assert
      expect(result).toEqual(mockDataAsyncStorage.sectionData);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@sectionList',
        JSON.stringify(mockDataAsyncStorage.sectionData)
      );

      // Clean up by restoring the original api.getCourses function
      jest.restoreAllMocks();

    });
    it('should handle errors getting from async storage', async () => {
      const errorMessage = "Error getting section list from async storage: " + mockDataAPI.errorResponse;

      // Mock AsyncStorage to simulate an error
      AsyncStorage.getItem.mockRejectedValue(new Error(errorMessage));

      // Mock the refreshCourseList function from the 'api' module to throw an error
      jest.spyOn(StorageService, 'refreshSectionList').mockRejectedValue(new Error(errorMessage));

      try {
        await StorageService.getSectionList(mockDataAPI.courseData._id);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual(errorMessage);
      }

      // Clean up by restoring the original mock functions
      jest.restoreAllMocks();
    });
    it('should handle errors in refreshSectionList', async () => {
      const errorMessage = "Error getting section list from database: " + mockDataAPI.errorResponse;

      // Mock AsyncStorage to simulate an error
      AsyncStorage.getItem.mockResolvedValue(null);
      AsyncStorage.getItem.mockRejectedValue(new Error(errorMessage));

      // Mocking the refreshCourseList function from StorageServices
      jest.spyOn(StorageService, 'refreshSectionList').mockRejectedValue(new Error(errorMessage));

      try {
        await StorageService.getSectionList(mockDataAPI.courseData._id);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual(errorMessage);
        expect(AsyncStorage.setItem).not.toHaveBeenCalled();
      }
      //Clean up by restoring the original StorageService.refreshCourseList function
      jest.restoreAllMocks();
    });
  });

  describe('Course', () => {
    it('should return the course from AsyncStorage if it exists', async () => {
      const course_id = mockDataAPI.courseData._id;

      // Arrange
      AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockDataAPI.courseData));
      jest.spyOn(api, 'getCourse').mockResolvedValueOnce(mockDataAPI.courseData);

      // Act
      const result = await StorageService.getCourseId(course_id);

      // Assert
      expect(result).toEqual(mockDataAPI.courseData);

      // Clean up by restoring the original api.getCourses function
      jest.restoreAllMocks();

    });

    it('should call refreshCourse if course is not in AsyncStorage', async () => {

      // Arrange
      AsyncStorage.getItem.mockResolvedValueOnce(null);
      jest.spyOn(api, 'getCourse').mockResolvedValueOnce(mockDataAPI.courseData);

      // Act
      const result = await StorageService.getCourseId(mockDataAPI.courseData._id);

      // Assert
      expect(result).toEqual(mockDataAPI.courseData);

      // Clean up by restoring the original api.getCourses function
      jest.restoreAllMocks();

    });

    it('should handle errors getting from async storage', async () => {

      const errorMessage = "Error getting course from async storage: " + mockDataAPI.errorResponse;

      // Mock AsyncStorage to simulate an error
      AsyncStorage.getItem.mockRejectedValue(new Error(errorMessage));

      // Mock the refreshCourse function from the 'api' module to throw an error
      jest.spyOn(StorageService, 'refreshCourse').mockRejectedValue(new Error(errorMessage));

      try {
        await StorageService.getCourseId(mockDataAPI.course_id);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual(errorMessage);
      }

      // Clean up by restoring the original mock functions
      jest.restoreAllMocks();
    });

    it('should handle errors in refreshCourse', async () => {

      const errorMessage = "Error getting course from database: " + mockDataAPI.errorResponse;

      // Mock AsyncStorage to simulate an error
      AsyncStorage.getItem.mockResolvedValue(null);
      AsyncStorage.getItem.mockRejectedValue(new Error(errorMessage));

      // Mocking the refreshCourse function from StorageServices
      jest.spyOn(StorageService, 'refreshCourse').mockRejectedValue(new Error(errorMessage));

      try {
        await StorageService.getCourseId(mockDataAPI.courseData._id);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual(errorMessage);
        expect(AsyncStorage.setItem).not.toHaveBeenCalled();
      }
      //Clean up by restoring the original StorageService.refreshCourse function
      jest.restoreAllMocks();
    });
  });
});