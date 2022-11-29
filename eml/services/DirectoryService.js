import { React } from 'react'
import * as FileSystem from 'expo-file-system';

export function CreateDirectory(name) {

    //Create a Directory with "name"

    try {
        FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + name);

        return "Created directory: " + name;
      } catch (error) {
        return "Error Creating directory. (Maybe It already exists?)"
      }

}

export function ReadDirectory(name){

        //Returns an ARRAY containing the names of existing items in the directory (name)

        let items;

        try {
             FileSystem.readDirectoryAsync(FileSystem.documentDirectory + name)
                .then(filesInDirectory => {
                    items = filesInDirectory;
                })

                return items;
        }
        catch (error){
            return "Error reading directory. (Maybe it doesn't exist?)"
        }
    }

export function DeleteDirectory(name){

    //Delete the directory located by name

    try {
        FileSystem.deleteAsync(FileSystem.documentDirectory + name)
        return "Deleted directory: " + name;
        }
    catch (error){
        return "Error deleting the directory";
    }
}

export function DownloadAndStoreVideo(url, directory){

        //DOWNLOAD the video from the 'url' and STORE it in the 'directory'
        //Returns the local uri to the file
        //The name of the file is a substring of the url from the last '/'
        //For example : http://example.com/video.mp4 will be named 'video.mp4'

        const localUri = FileSystem.documentDirectory + directory + '/' + url.substring(url.lastIndexOf('/') + 1);

        try {
            FileSystem.downloadAsync(url, localUri)
            return localUri;
        }
        catch (error){
            return "Error downloading content"
        }
    }

export function DeleteVideoByUri(uri) {

        //Delete the video located in the uri

        try {
            FileSystem.deleteAsync(uri)
            return uri.substring(uri.lastIndexOf('/') + 1) + " Successfully Deleted!";
        }
        catch (error){
            return "Error deleting specified video";
        }
    }
    
export function DeleteVideoByName(name, directory) {

        //Delete the video located in the local directory by its name

        let localName = FileSystem.documentDirectory + directory + '/' + name;

        try {
            FileSystem.deleteAsync(localName)
            return name + " deleted!";
        }
        catch (error){
            return "Error deleting video in specified directory";
        }
    }




