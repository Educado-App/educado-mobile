import { React } from 'react'
import * as FileSystem from 'expo-file-system';

export async function CreateDirectory(name) {

    //Create a Directory by the (name)
    if (name !== undefined){

        try {
            await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + name)
                .then( () =>{
                        console.log("Created directory: " + name);
                        return name;
                    }
                )
                .catch(error => {
                    console.log(error)
                });
        }
        catch (error){
            console.log(error);
        }

    } else console.log("error: directory must have a name!");

}
export async function ReadDirectory(name){

        //Returns an ARRAY containing the names of existing items in the directory (name)

        let items;

        try {
             await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + name)
                .then(filesInDirectory => {
                    items = filesInDirectory;
                    console.log("ITEMS: ", items);
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

    try {
         await FileSystem.deleteAsync(FileSystem.documentDirectory + name)
            .then(() => {
                console.log("Deleted directory " + name);
            })
            .catch(error => {
                console.log("Error deleting the directory. (maybe it doesn't exist)");
            });
    }
    catch (error){
        console.log("error");
    }

}

export async function DownloadAndStoreContent(url, directory, name){

        //DOWNLOAD the video from the 'url' and STORE it in the 'directory'
        //Returns the local uri to the file
        //The name of the file is a substring of the url from the last '/'
        //For example : http://example.com/video.mp4 will be named 'video.mp4'

        const localUri = FileSystem.documentDirectory + directory + '/' + name;

        try {
              return await FileSystem.downloadAsync(url, localUri)
                .then(({ uri }) => {
                    console.log('Finished downloading to', uri);
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
export async function DeleteVideoByName(name, directory) {

        //Delete the video located in the local directory by its name

        let localName = FileSystem.documentDirectory + directory + '/' + name;

        try {
             await FileSystem.deleteAsync(localName)
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




