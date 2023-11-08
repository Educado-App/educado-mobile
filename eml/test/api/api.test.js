import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mockDataAPI } from '../mockData/mockDataAPI';

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

const port = 'http://localhost:8888';

const mockData = mockDataAPI();

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

      expect(axios.get).toHaveBeenCalledWith(`${port}/api/courses/${courseId}`);
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

      expect(axios.get).toHaveBeenCalledWith(`${port}/api/courses`);
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

      expect(axios.get).toHaveBeenCalledWith(`${port}/api/courses/${courseId}/sections`);
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

      expect(axios.get).toHaveBeenCalledWith(`${port}/api/courses/${courseId}/sections/${sectionId}`);
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

      mock
        .onGet(`/api/users/${userId}/subscriptions`)
        .reply(200, { data: mockData.subscriptionData });

      axios.get.mockResolvedValue({ data: mockData.subscribeData, data: mockData.subscriptionData });

      const result = await getSubscriptions(userId);

      // Check that axios.get was called with the correct URL
      expect(axios.get).toHaveBeenCalledWith(`${port}/api/users/${userId}/subscriptions`);
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

      await subscribeToCourse(userId, courseId);

      expect(axios.post).toHaveBeenCalledWith(`${port}/api/courses/${courseId}/subscribe`, {
        user_id: userId,
      });
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

      await unSubscribeToCourse(userId, courseId);

      expect(axios.post).toHaveBeenCalledWith(`${port}/api/courses/${courseId}/unsubscribe`, {
        user_id: userId,
      });
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

      // Mock the Axios request
      const subscribedData = {
        isSubscribed: true
      };
      axios.get.mockResolvedValue({ data: subscribedData.isSubscribed });

      const result = await ifSubscribed(userId, courseId);

      expect(axios.get).toHaveBeenCalledWith(`${port}/api/users/subscriptions?user_id=${userId}&course_id=${courseId}`);
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