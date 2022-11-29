import { CreateDirectory, DeleteDirectory, DeleteVideoByName, DeleteVideoByUri, DownloadAndStoreVideo, ReadDirectory } from "../../services/DirectoryService";
import * as FileSystem from 'expo-file-system';

jest.mock('expo-file-system', () => ({
    downloadAsync: jest.fn(() => Promise.resolve({ md5: 'md5', uri: 'uri' })),
    getInfoAsync: jest.fn(() => Promise.resolve({ exists: true, md5: 'md5', uri: 'uri' })),
    readAsStringAsync: jest.fn(() => Promise.resolve()),
    writeAsStringAsync: jest.fn(() => Promise.resolve()),
    deleteAsync: jest.fn(() => Promise.resolve()),
    moveAsync: jest.fn(() => Promise.resolve()),
    copyAsync: jest.fn(() => Promise.resolve()),
    makeDirectoryAsync: jest.fn(() => Promise.resolve()),
    readDirectoryAsync: jest.fn(() => Promise.resolve()),
    createDownloadResumable: jest.fn(() => Promise.resolve()),
    documentDirectory: "file:///test-directory/",
  }));

//Success cases

describe('CreateDirectory', () => {
    it('Should return a string confirming that a directory named "Test" was successfully created', async () => {
        CreateDirectory("Test").then(r => {expect(r).toBe("Created directory: Test")} )
    })
})

it('Should read and return contents of a directory with name "Test', async () => {
    ReadDirectory("Test").then(r => {expect(r).toBe(undefined)})
})

describe('DeleteDirectory', () => {
    it('Should delete a created directory with name "Test2', async () => {
        DeleteDirectory("Test").then(r => {expect(r).toBe("Deleted directory: Test")})
    })
})

test('Should return a URI to a locally stored downloaded video', async () => {
    DownloadAndStoreVideo('https://cdn.discordapp.com/attachments/594427121812897817/1040396889616560279/RPReplay_Final1668120192.mov', 'Test4')
    .then(r => {expect.toBe(undefined)})
    
})

test('Should return confirmation that the specified video was deleted', async () => {
    DeleteVideoByUri("Test")
    .then(r => {expect.toBe("Test Successfully Deleted!")})
})

test('Should return confirmation that video in the specified directory was deleted', async () => {
    DeleteVideoByName("testVideo", "testDirectory")
    .then(r => {expect.toBe("testVideo deleted!")})
})

//Function failure cases

describe('CreateDirectory', () => {
    it('Should return an error string', async () => {
        FileSystem.makeDirectoryAsync.mockResolvedValue(new Error())
        CreateDirectory("Test").then(r => {expect(r).toBe("Error Creating directory. (maybe It already exists)")} )
    })
})


it('Should return an error string', async () => {
    FileSystem.readDirectoryAsync.mockResolvedValue(new Error())
    ReadDirectory("Test").then(r => {expect(r).toBe("Error Reading directory (maybe it is not yet created)")})
})

describe('DeleteDirectory', () => {
    FileSystem.deleteAsync.mockResolvedValue(new Error())
    it('Should return an error string', async () => {
        DeleteDirectory("Test").then(r => {expect(r).toBe("Error deleting the directory")})
    })
})