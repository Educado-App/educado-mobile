import axios from 'axios';
import { generateCertificate } from '../../../api/api.js';
import { mockDataAPI } from '../../mockData/mockDataAPI';

jest.mock('axios');

describe('generateCertificate', () => {
    const mockData = mockDataAPI();
    const courseData = mockData.courseData;
    const studentData = mockData.userData; // Assuming userData is used as studentData
    const userData = mockData.userData;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should generate a certificate successfully', async () => {
        axios.get.mockImplementation((url) => {
            if (url === `/api/courses/${courseData._id}`) {
                return Promise.resolve({ data: courseData });
            } else if (url === `/api/students/${studentData._id}/info`) {
                return Promise.resolve({ data: studentData });
            } else if (url === `/api/users/${studentData._id}`) {
                return Promise.resolve({ data: userData });
            }
        });

        axios.put.mockResolvedValue({ data: { success: true } });

        const result = await generateCertificate(courseData._id, studentData._id);

        expect(result).toEqual({ success: true });
        expect(axios.get).toHaveBeenCalledTimes(3);
        expect(axios.put).toHaveBeenCalledWith('/api/student-certificates', {
            courseName: courseData.name,
            courseId: courseData._id,
            studentId: studentData._id,
            studentFirstName: userData.firstName,
            studentLastName: userData.lastName,
            courseCreator: courseData.creator,
            estimatedCourseDuration: courseData.estimatedDuration,
            dateOfCompletion: new Date().toISOString().split('T')[0],
            courseCategory: courseData.category,
        });
    });

    it('should throw an error if course data is not loaded', async () => {
        axios.get.mockImplementation((url) => {
            if (url === `/api/courses/${courseData._id}`) {
                return Promise.resolve({ data: null });
            } else if (url === `/api/students/${studentData._id}/info`) {
                return Promise.resolve({ data: studentData });
            } else if (url === `/api/users/${studentData._id}`) {
                return Promise.resolve({ data: userData });
            }
        });

        await expect(generateCertificate(courseData._id, studentData._id)).rejects.toThrow('Course, student, or user data not loaded');
    });

    it('should throw an error if student data is not loaded', async () => {
        axios.get.mockImplementation((url) => {
            if (url === `/api/courses/${courseData._id}`) {
                return Promise.resolve({ data: courseData });
            } else if (url === `/api/students/${studentData._id}/info`) {
                return Promise.resolve({ data: null });
            } else if (url === `/api/users/${studentData._id}`) {
                return Promise.resolve({ data: userData });
            }
        });

        await expect(generateCertificate(courseData._id, studentData._id)).rejects.toThrow('Course, student, or user data not loaded');
    });

    it('should throw an error if user data is not loaded', async () => {
        axios.get.mockImplementation((url) => {
            if (url === `/api/courses/${courseData._id}`) {
                return Promise.resolve({ data: courseData });
            } else if (url === `/api/students/${studentData._id}/info`) {
                return Promise.resolve({ data: studentData });
            } else if (url === `/api/users/${studentData._id}`) {
                return Promise.resolve({ data: null });
            }
        });

        await expect(generateCertificate(courseData._id, studentData._id)).rejects.toThrow('Course, student, or user data not loaded');
    });

    it('should throw an error if the API call to generate the certificate fails', async () => {
        axios.get.mockImplementation((url) => {
            if (url === `/api/courses/${courseData._id}`) {
                return Promise.resolve({ data: courseData });
            } else if (url === `/api/students/${studentData._id}/info`) {
                return Promise.resolve({ data: studentData });
            } else if (url === `/api/users/${studentData._id}`) {
                return Promise.resolve({ data: userData });
            }
        });

        axios.put.mockRejectedValue(new Error('API call failed'));

        await expect(generateCertificate(courseData._id, studentData._id)).rejects.toThrow('API call failed');
    });

    it('should throw an error for invalid course ID', async () => {
        axios.get.mockRejectedValue(new Error('Invalid course ID'));

        await expect(generateCertificate('invalid_course_id', studentData._id)).rejects.toThrow('Invalid course ID');
    });


    it('should throw an error for invalid student ID', async () => {
        axios.get.mockImplementation((url) => {
            if (url === `/api/courses/${courseData._id}`) {
                return Promise.resolve({ data: courseData });
            } else if (url === `/api/students/invalid_student_id/info`) {
                return Promise.reject(new Error('Invalid student ID'));
            } else if (url === `/api/users/invalid_student_id`) {
                return Promise.reject(new Error('Invalid student ID'));
            }
        });

        await expect(generateCertificate(courseData._id, 'invalid_student_id')).rejects.toThrow('Invalid student ID');
    });

    it('should handle network errors gracefully', async () => {
        axios.get.mockRejectedValue(new Error('Network Error'));

        await expect(generateCertificate(courseData._id, studentData._id)).rejects.toThrow('Network Error');
    });

    it('should throw an error if only part of the data is loaded', async () => {
        axios.get.mockImplementation((url) => {
            if (url === `/api/courses/${courseData._id}`) {
                return Promise.resolve({ data: courseData });
            } else if (url === `/api/students/${studentData._id}/info`) {
                return Promise.resolve({ data: studentData });
            } else if (url === `/api/users/${studentData._id}`) {
                return Promise.resolve({ data: null });
            }
        });

        await expect(generateCertificate(courseData._id, studentData._id)).rejects.toThrow('Course, student, or user data not loaded');
    });
});