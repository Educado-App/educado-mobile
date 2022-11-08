import { React } from 'react'
import * as FileSystem from 'expo-file-system';


export async function CreateDirectory(name) {
    //Create a Directory by the (name)

    try {
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + name)
            .then( () =>{
                    console.log("Created directory: " + name);
                }
            );

    }
    catch (error){
        console.log(error);
    }

}
export async function ReadDirectory(name){

        //Returns an ARRAY containing the names of existing items in the directory (name)

        let items;

        try {
            await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + name)
                .then(filesInDirectory => {
                    items = filesInDirectory;
                    console.log(items);
                })
                .catch(error => {
                    console.log(error);
                })
        }
        catch (error){
            console.log(error);
        }

        return items;
    }
export async function DeleteDirectory(name){
    //Delete the directory located by name

    try {
        await FileSystem.deleteAsync(FileSystem.documentDirectory + name)
            .then(() => {
                console.log("Deleted directory " + name);
            })
            .catch(error => {
                console.log("Error deleting the directory");
            });
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

        let uri;

        try {
            await FileSystem.downloadAsync(url,
                FileSystem.documentDirectory + directory +  url.substring(url.lastIndexOf('/') + 1))
                .then(({ localUri }) => {
                    console.log('Finished downloading to ', localUri);
                    uri = localUri;
                })
                .catch(error => {
                    console.error(error);
                });
        }
        catch (error){
            console.log(error);
        }

        return uri;
    }
export async function DeleteVideoByUri(uri) {

        //Delete the video located in the uri

        try {
            await FileSystem.deleteAsync(uri)
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
export async function DeleteVideoByName(name) {

        //Delete the video located in the local directory by its name

        let localName = FileSystem.documentDirectory + name;

        try {
            await FileSystem.deleteAsync(localName)
                .then(() => {
                    console.log(localName + " Successfully Deleted!");
                })
                .catch(error => {
                    console.log(error);
                });
        }
        catch (error){
            console.log(error);
        }
    }




