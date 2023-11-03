export function exerciseScreenMock() {
  return {
    exerciseData: {
      _id: '65181a4f4c78b45368126ed7',
      parentSection: '6526528fc808771dd861fbec',
      title: 'Text exercise 1',
      description: 'What is the capital of France?',
      answers: [
        {
          text: 'Berlin',
          isCorrect: false,
          feedback: "Berlin is the capital of Germany.",
          dateUpdated: "2013-09-26T14:00:00.000Z",
        },
        {
          text: 'Rome',
          isCorrect: false,
          feedback: "Rome is the capital of Italy.",
          dateUpdated: "2013-09-26T14:00:00.000Z",
        },
        {
          text: 'Madrid',
          isCorrect: false,
          feedback: "Madrid is the capital of Spain.",
          dateUpdated: "2013-09-26T14:00:00.000Z",
        },
        {
          text: 'Paris',
          isCorrect: true,
          feedback: "Paris is the capital of France.",
          dateUpdated: "2013-09-26T14:00:00.000Z",
        },
      ],
      dateUpdated: "2013-09-26T14:00:00.000Z",
    },
    sectionData: {
      exercises: ['65181a4f4c78b45368126ed7', '6527e20b5897d93ea8914010'],
      components: [],
      _id: '6526528fc808771dd861fbec',
      parentCourse: '651e987f8999e62500457097',
      title: 'Test X',
      description: 'Hello',
      dateCreated: '2023-10-11T07:45:19.135Z',
      dateUpdated: '2023-10-11T07:45:19.135Z',
      __v: 37,
      lectures: [],
    },
    courseData: {
      rating: 2,
      status: 'draft',
      numOfSubscriptions: 0,
      sections: [
        '651e99608999e625004570a8',
        '6526528fc808771dd861fbec',
        '6527f7da1877373c3c653dc8',
      ],
      _id: '651e987f8999e62500457097',
      title: 'VirtualTurtor Group',
      category: 'personal finance',
      level: 'Iniciante',
      description: 'Silke var her',
      dateCreated: '2023-10-05T11:05:35.251Z',
      dateUpdated: '2023-10-05T11:05:35.251Z',
      __v: 11,
      published: false,
      estimatedHours: 1,
    },
  };
}
