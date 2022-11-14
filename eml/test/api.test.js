import * as api from "../api/api";

test('get CourseList from public route', async () => {
  const data = await api.getCourses();
  expect(data.status).toBe(200);
})

test('get Course by id from public route', async () => {
  const knownId = '636ab1d05302dbf9307526ad'
  const expectedData = {
    "status": 200,
    "success": true,
    "data": {
      "id": "636ab1d05302dbf9307526ad",
      "sections": [],
      "title": "The course",
      "category": "635f9ae2991d8c6da796a1cc",
      "description": "Holy shitake! It works! Almost...",
      "author": {
        "_id": "635dacde991d8c6da796a1c5",
        "firstName": "Demo",
        "lastName": "User"
      },
      "published": true,
      "modifiedAt": "2022-11-08T19:45:20.844Z",
      "createdAt": "2022-11-08T19:45:20.844Z",
      "__v": 0
    }
  }
  const actualData = await api.getCourse('636ab1d05302dbf9307526ad');
  expect(expectedData).toStrictEqual(actualData);
})

