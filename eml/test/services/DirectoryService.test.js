import { CreateDirectory } from "../services/DirectoryService";
import * as FileSystem from 'expo-file-system';

// it('console.log "Created directory: Test"', () => {
//     //CreateDirectory = jest.fn();
//     CreateDirectory('Test')
//     // The first argument of the first call to the function was 'hello'
//     expect(CreateDirectory.mock).toBe("Created directory: Test");
//   });

it('Should create a directory with name "Test"', async () => {
    //CreateDirectory('Test')
    const p = FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "Test")

    p.then(value => {
        console.log(value);
    })
    .catch(err => {
        console.log(err); // 👉️ "Something went wrong"
    });
    
    
    //console.log(FileSystem.readDirectoryAsync(FileSystem.documentDirectory))
    //expect(FileSystem.readDirectoryAsync(FileSystem.documentDirectory + "Test")).toEqual
})