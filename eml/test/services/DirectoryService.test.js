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
    it('Should return a string confirming that a directory named "Test" was successfully created', () => {
        expect(CreateDirectory("Test")).toBe("Created directory: Test")
    })
})

it('Should read and return contents of a directory with name "Test', () => {
    expect(ReadDirectory("Test")).toBe(undefined)
})

describe('DeleteDirectory', () => {
    it('Should delete a created directory with name "Test', () => {
        expect(DeleteDirectory("Test")).toBe("Deleted directory: Test")
    })
})

test('Should return a URI to a locally stored downloaded video', () => {
    expect(DownloadAndStoreVideo('TestVideo', 'TestDirectory')).toBe("file:///test-directory/TestDirectory/TestVideo")
    
})

test('Should return confirmation that the specified video was deleted', () => {
    expect(DeleteVideoByUri("Test")).toBe("Test Successfully Deleted!")
})

test('Should return confirmation that video in the specified directory was deleted', async () => {
    expect(DeleteVideoByName("testVideo", "testDirectory")).toBe("testVideo deleted!")
})


//Function failure cases

describe('CreateDirectory', () => {
    it('Should return an error string', () => {
        FileSystem.makeDirectoryAsync.mockImplementation(() => {
            throw new Error();
          });
        expect(CreateDirectory("Test")).toBe("Error Creating directory. (Maybe It already exists?)")
    })
})


it('Should return an error string', async () => {
    FileSystem.readDirectoryAsync.mockImplementation(() => {
        throw new Error();
      });
    expect(ReadDirectory("Test")).toBe("Error reading directory. (Maybe it doesn't exist?)")
})

describe('DeleteDirectory', () => {
    it('Should return an error string', async () => {
        FileSystem.deleteAsync.mockImplementation(() => {
            throw new Error();
          });
        expect(DeleteDirectory("Test")).toBe("Error deleting the directory")
    })
})

test('Should return an error string', async () => {
    FileSystem.downloadAsync.mockImplementation(() => {
        throw new Error();
      });
    expect(DownloadAndStoreVideo('TestVideo', 'TestDirectory')).toBe("Error downloading content")
    
})

test('Should return confirmation that the specified video was deleted', () => {
    FileSystem.deleteAsync.mockImplementation(() => {
        throw new Error();
      });
    expect(DeleteVideoByUri("Test")).toBe("Error deleting specified video")
})


test('Should return an error string', () => {
    FileSystem.deleteAsync.mockImplementation(() => {
        throw new Error();
      });
    expect(DeleteVideoByName("testVideo", "testDirectory")).toBe("Error deleting video in specified directory")
})