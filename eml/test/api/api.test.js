import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MockAdapter from 'axios-mock-adapter';

import {
  getCourse,
  getCourses,
  getAllSections,
  getSection,
  getSubscriptions,
  subscribeToCourse,
  unSubscribeToCourse,
  ifSubscribed,
} from '../../api/api';

jest.mock('axios');
jest.mock('@react-native-async-storage/async-storage');

const mock = new MockAdapter(axios);

const mockData = {
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
  sectionData:
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
  sectionsData: [
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

describe('API Functions', () => {
  beforeEach(() => {
    axios.get.mockReset();
    axios.post.mockReset();
  });

  describe('getCourse', () => {
    it('should get a specific course', async () => {
      const courseId = mockData.courseData._id;
      axios.get.mockResolvedValue({ data: mockData.courseData });

      const result = await getCourse(courseId);

      expect(axios.get).toHaveBeenCalledWith(`http://localhost:8888/api/courses/${courseId}`);
      expect(result).toEqual(mockData.courseData);

    });

    it('should handle errors', async () => {
      const courseId = mockData.courseData._id;
      const errorMessage = 'Error getting specific course: ' + mockData.errorResponse;

      axios.get.mockRejectedValue(new Error(errorMessage));

      await expect(getCourse(courseId)).rejects.toThrow(errorMessage);
    });
  });

  describe('getCourses', () => {
    it('should get all courses', async () => {
      axios.get.mockResolvedValue({ data: mockData.allCoursesData });

      const result = await getCourses();

      expect(axios.get).toHaveBeenCalledWith('http://localhost:8888/api/courses');
      expect(result).toEqual(mockData.allCoursesData);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Error getting all courses: ' + mockData.errorResponse;

      axios.get.mockRejectedValue(new Error(errorMessage));

      await expect(getCourses()).rejects.toThrow(errorMessage);
    });
  });

  describe('getAllSections', () => {
    it('should get all sections for a specific course', async () => {
      const courseId = mockData.courseData._id;
      axios.get.mockResolvedValue({ data: mockData.sectionsData });

      const result = await getAllSections(courseId);

      expect(axios.get).toHaveBeenCalledWith(`http://localhost:8888/api/courses/${courseId}/sections`);
      expect(result).toEqual(mockData.sectionsData);
    });

    it('should handle errors', async () => {
      const courseId = mockData.courseData._id;
      const errorMessage = 'Error getting all sections: ' + mockData.errorResponse;

      axios.get.mockRejectedValue(new Error(errorMessage));

      await expect(getAllSections(courseId)).rejects.toThrow(errorMessage);
    });
  });

  describe('getSection', () => {
    it('should get a specific section', async () => {
      const courseId = mockData.courseData._id;
      const sectionId = mockData.sectionData._id;
      axios.get.mockResolvedValue({ data: mockData.sectionData });

      const result = await getSection(courseId, sectionId);

      expect(axios.get).toHaveBeenCalledWith(`http://localhost:8888/api/courses/${courseId}/sections/${sectionId}`);
      expect(result).toEqual(mockData.sectionData);
    });

    it('should handle errors', async () => {
      const courseId = mockData.courseData._id;
      const sectionId = mockData.sectionData._id;
      const errorMessage = 'Error getting specific section: ' + mockData.errorResponse;

      axios.get.mockRejectedValue(new Error(errorMessage));

      await expect(getSection(courseId, sectionId)).rejects.toThrow(errorMessage);
    });
  });

  describe('getSubscriptions', () => {
    it('should get user subscriptions', async () => {
      const userId = mockData.userData._id;

      // Mock AsyncStorage.getItem to return the user ID
      AsyncStorage.getItem.mockResolvedValue(userId);

      mock
        .onGet(`/api/users/${userId}/subscriptions`)
        .reply(200, { data: mockData.subscriptionData });

      axios.get.mockResolvedValue({ data: mockData.subscribeData, data: mockData.subscriptionData });

      const result = await getSubscriptions();

      // Check that AsyncStorage.getItem was called with the expected argument
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@userId');

      // Check that axios.get was called with the correct URL
      expect(axios.get).toHaveBeenCalledWith(`http://localhost:8888/api/users/${userId}/subscriptions`);

      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@userId');
      expect(axios.get).toHaveBeenCalledWith(`http://localhost:8888/api/users/${userId}/subscriptions`);
      expect(result).toEqual(mockData.subscriptionData);
    });

    it('should handle errors', async () => {
      const userId = mockData.userData._id;
      const errorMessage = 'Error getting subscriptions: ' + mockData.errorResponse;

      axios.get.mockRejectedValue(new Error(errorMessage));

      await expect(getSubscriptions(userId)).rejects.toThrow(errorMessage);
    });
  });

  describe('subscribeToCourse', () => {
    it('should subscribe to a course', async () => {
      const userId = mockData.userData._id;
      const courseId = mockData.courseData._id;

      AsyncStorage.getItem.mockResolvedValue(userId);
      axios.post.mockResolvedValue({ data: 'subscription successful' });

      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

      await subscribeToCourse(courseId);

      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@userId');
      expect(axios.post).toHaveBeenCalledWith(`http://localhost:8888/api/courses/${courseId}/subscribe`, {
        user_id: userId,
      });
      expect(consoleLogSpy).toHaveBeenCalledWith('Subscribed successfully: subscription successful');
      consoleLogSpy.mockRestore();
    });

    it('should handle errors', async () => {
      const userId = mockData.userData._id;
      const courseId = mockData.courseData._id;
      const errorMessage = 'Error subscribing to course: ' + mockData.errorResponse;

      axios.post.mockRejectedValue(new Error(errorMessage));

      await expect(subscribeToCourse(userId, courseId)).rejects.toThrow(errorMessage);
    });
  });

  describe('unSubscribeToCourse', () => {
    it('should unsubscribe to a course', async () => {
      const userId = mockData.userData._id;
      const courseId = mockData.courseData._id;

      AsyncStorage.getItem.mockResolvedValue(userId);
      axios.post.mockResolvedValue({ data: 'unsubscription successful' });

      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

      await unSubscribeToCourse(courseId);

      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@userId');
      expect(axios.post).toHaveBeenCalledWith(`http://localhost:8888/api/courses/${courseId}/unsubscribe`, {
        user_id: userId,
      });
      expect(consoleLogSpy).toHaveBeenCalledWith('Unsubscribed successfully: unsubscription successful');
      consoleLogSpy.mockRestore();
    });

    it('should handle errors', async () => {
      const userId = mockData.userData._id;
      const courseId = mockData.courseData._id;
      const errorMessage = 'Error unsubscribing to course: ' + mockData.errorResponse;

      axios.post.mockRejectedValue(new Error(errorMessage));

      await expect(unSubscribeToCourse(userId, courseId)).rejects.toThrow(errorMessage);
    });
  });

  describe('ifSubscribed', () => {
    it('should check if user is subscribed to a course', async () => {
      const userId = mockData.userData._id;
      const courseId = mockData.courseData._id;

      // Mock AsyncStorage.getItem to return the user ID
      AsyncStorage.getItem.mockResolvedValue(userId);

      // Mock the Axios request
      const subscribedData = {
        isSubscribed: true
      };
      axios.get.mockResolvedValue({ data: subscribedData.isSubscribed });

      const result = await ifSubscribed(courseId);

      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@userId');
      expect(axios.get).toHaveBeenCalledWith(`http://localhost:8888/api/users/subscriptions?user_id=${userId}&course_id=${courseId}`);
      expect(result).toEqual(subscribedData.isSubscribed);
    });

    it('should handle errors', async () => {
      const userId = mockData.userData._id;
      const courseId = mockData.courseData._id;
      const errorMessage = 'Error checking if user is subscribed to a course: ' + mockData.errorResponse;

      axios.get.mockRejectedValue(new Error(errorMessage));

      await expect(ifSubscribed(userId, courseId)).rejects.toThrow(errorMessage);
    });
  });

});