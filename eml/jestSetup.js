jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// jest.mock('screens/explore/Explore.jsx', () => {
//     const mockComponent = require('react-native/jest/mockComponent');
//     return mockComponent('screens/explore/Explore.jsx');
// });