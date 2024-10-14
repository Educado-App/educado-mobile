import axios from 'axios';

/**
 * Generates a certificate for a student.
 * @param {string} courseId - The ID of the course.
 * @param {string} studentId - The ID of the student.
 * @returns {Promise<Object>} - The response from the server.
 */
const generateCertificate = async (courseId, studentId) => {
    try {
        // Fetch course data
        const courseResponse = await axios.get(`/api/courses/${courseId}`);
        const courseData = courseResponse.data;

        // Fetch student data and user data concurrently
        const [studentResponse, userResponse] = await Promise.all([
            axios.get(`/api/students/${studentId}/info`),
            axios.get(`/api/users/${studentId}`)
        ]);

        const studentData = studentResponse.data;
        const userData = userResponse.data;
    
        // Ensure data is loaded
        if (!courseData || !studentData || !userData) {
            throw new Error('Course, student, or user data not loaded');
        }

        // Call the endpoint to generate the certificate
        const response = await axios.put('/api/student-certificates', {
            courseName: courseData.name,
            courseId: courseData._id,
            studentId: studentData._id,
            studentFirstName: userData.firstName,
            studentLastName: userData.lastName,
            courseCreator: courseData.creator,
            estimatedCourseDuration: courseData.estimatedDuration,
            dateOfCompletion: new Date().toISOString().split('T')[0], // current date
            courseCategory: courseData.category,
        });

        console.log('Certificate generated:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error generating certificate:', error.response?.data || error.message);
        throw error;
    }
};

export default generateCertificate;