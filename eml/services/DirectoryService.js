import { React } from 'react'
import * as FileSystem from 'expo-file-system';

export async function CreateDirectory(name) {

    //Create a Directory by the (name)

    let string = "";

    try {
         await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + name)
            .then( () =>{
                    string = "Created directory: " + name
                }
            )
            .catch(error => {
                string = "Error Creating directory. (maybe It already exists)"
            });

            return string

            
    }
    catch (error){
        console.log(error);
    }

}
export async function ReadDirectory(name){

        //Returns an ARRAY containing the names of existing items in the directory (name)

        let items;

        try {
             FileSystem.readDirectoryAsync(FileSystem.documentDirectory + name)
                .then(filesInDirectory => {
                    items = filesInDirectory;
                    //console.log(items);
                })
                .catch(error => {
                    console.log("Error Reading directory (maybe it is not yet created)");
                })
        }
        catch (error){
            console.log(error);
        }

        return items;

    }
export async function DeleteDirectory(name){

    //Delete the directory located by name

    let string = "";

    try {
         FileSystem.deleteAsync(FileSystem.documentDirectory + name)
            .then(() => {
                string = "Deleted directory " + name
            })
            .catch(error => {
                string = "Error deleting the directory"
            });

            return string
    }
    catch (error){
        console.log("error");
    }

}

export async function DownloadAndStoreVideo(url, directory){

        //DOWNLOAD the video from the 'url' and STORE it in the 'directory'
        //Returns the local uri to the file
        //The name of the file is a substring of the url from the last '/'
        //For example : http://example.com/video.mp4 will be named 'video.mp4'

        const localUri = FileSystem.documentDirectory + directory + '/' + url.substring(url.lastIndexOf('/') + 1);

        try {
              FileSystem.downloadAsync(url, localUri)
                .then(({ uri }) => {
                    //console.log('Finished downloading to', uri);
                    return localUri;
                })
                .catch(error => {
                    console.error(error);
                });
        }
        catch (error){
            console.log(error);
        }
    }
export function DeleteVideoByUri(uri) {

        //Delete the video located in the uri

        try {
             FileSystem.deleteAsync(uri)
                .then(() => {
                    console.log(uri.substring(uri.lastIndexOf('/') + 1) + " Successfully Deleted!");
                })
                .catch(error => {
                    console.log(error);
                });
        }
        catch (error){

            console.log(error);
        }
    }
export function DeleteVideoByName(name, directory) {

        //Delete the video located in the local directory by its name

        let localName = FileSystem.documentDirectory + directory + '/' + name;

        try {
             FileSystem.deleteAsync(localName)
                .then(() => {
                    console.log(name + " deleted!");
                })
                .catch(error => {
                    console.log(error);
                });
        }
        catch (error){
            console.log(error);
        }
    }




