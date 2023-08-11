

import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { FileSystem, StorageAccessFramework } from 'expo-file-system'

//react-native-sound
//    "react-native-sound": "^0.11.2"

// import React, { Component } from "react";
// import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
// import { FileSystem } from "expo";
// import Sound from "react-native-sound";
// import MidiWriter from "midi-writer-js";

class App extends Component {
  state = {
    count: 0,
  };


  createFile = async function () {
    // Used to create file called sample
    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (permissions.granted) {
      const uri = permissions.directoryUri;
      const fileName = 'sample.txt'; // the name of the file you want to create
      const mimeType = 'text/plain'; // MIME type for a plain text file

      try {
        const fileUri = await StorageAccessFramework.createFileAsync(uri, fileName, mimeType);
        await StorageAccessFramework.writeAsStringAsync(fileUri, "Hello World").then(() => console.log("Written successfully")).
          catch((err) => console.log(err.message))
        console.log(`File created at: ${fileUri}`);
      } catch (error) {
        console.error('Error creating file:', error);
      }
    }
  }


  saveFile = async () => {

    // Used to check directory contents
    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (permissions.granted) {
      // Gets SAF URI from response
      const uri = permissions.directoryUri;

      // Gets all files inside of selected directory
      const files = await StorageAccessFramework.readDirectoryAsync(uri);
      StorageAccessFramework.
        alert(`Files inside ${uri}:\n\n${JSON.stringify(files)}`);
    }

  }

  // onPress = async () => {
  //   fs.writeFileSync("songg8.txt", "Hello World", function (err) {
  //     if (err) throw err;
  //   });
  //   console.log("FilePath is null.");
  //   //   }
  //   //   this.setState({
  //   //     count: this.state.count + 1,
  //   //   });
  //   // };
  //   // makeFile = async (buffer) => {
  //   //   const filePath = FileSystem.documentDirectory + "myMidiFile.mid";
  //   //   try {
  //   //     await FileSystem.writeAsStringAsync(filePath, buffer, {
  //   //       encoding: FileSystem.EncodingType.Base64,
  //   //     });
  //   //     console.log("MIDI file saved successfully.");
  //   //     return filePath;
  //   //   } catch (error) {
  //   //     console.error("Error saving MIDI file:", error);
  //   //     return null;
  //   //   }
  // };



  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.createFile}>
          <Text>Click me</Text>
        </TouchableOpacity>
        <Text>You clicked {this.state.count} times</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginBottom: 10,
  },
});

export default App;