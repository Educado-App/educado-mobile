import { CreateDirectory, DeleteDirectory, DownloadAndStoreVideo, ReadDirectory } from "../../services/DirectoryService";
import * as FileSystem from 'expo-file-system';

// jest.mock('expo-file-system', () => ({
//     downloadAsync: jest.fn(() => Promise.resolve({ md5: 'md5', uri: 'uri' })),
//     getInfoAsync: jest.fn(() => Promise.resolve({ exists: true, md5: 'md5', uri: 'uri' })),
//     readAsStringAsync: jest.fn(() => Promise.resolve()),
//     writeAsStringAsync: jest.fn(() => Promise.resolve()),
//     deleteAsync: jest.fn(() => Promise.resolve()),
//     moveAsync: jest.fn(() => Promise.resolve()),
//     copyAsync: jest.fn(() => Promise.resolve()),
//     makeDirectoryAsync: jest.fn(() => Promise.resolve()),
//     readDirectoryAsync: jest.fn(() => Promise.resolve()),
//     createDownloadResumable: jest.fn(() => Promise.resolve()),
//     documentDirectory: "file:///test-directory/",
//   }));

it('Should create a directory with name "Test"', async () => {
   expect(CreateDirectory("Test")).toBe("Created directory: Test")
})

it('Should delete a created directory with name "Test2', async () => {
    CreateDirectory("Test2")
    DeleteDirectory("Test2")
})

it('Should read a created directory with name "Test3', async () => {
    CreateDirectory("Test3")
    ReadDirectory("Test3")
})

test('Should download a video to directory with name "Test4', async () => {
    CreateDirectory("Test4")
    DownloadAndStoreVideo('https://cdn.discordapp.com/attachments/594427121812897817/1040396889616560279/RPReplay_Final1668120192.mov', 'Test4')
    
})