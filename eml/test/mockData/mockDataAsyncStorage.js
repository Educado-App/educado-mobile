
export function mockDataAsyncStorage() {

	return {
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
		subscribedCourses2: [
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
		section: {
			title: 'test section',
			sectionId: '651d40e3cdcba354b1b9490d',
			parentCourseId: '651d3a15cda7d5bd2878dfc7',
			description: 'this is a test section',
			components: [],
			total: 100,
		},
		course: {
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
	};
}