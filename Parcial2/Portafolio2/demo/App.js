import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import CircleButton from './components/CircleButton';
import IconButton from './components/IconButton';
import * as ImagePicker from 'expo-image-picker';

const PlaceholderImage = require("./assets/icon.png")

export default function App() {

    const [showAppOptions, setShowAppOptions] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);


    const pickImageAsync = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      })
      if(!result.canceled) {
        //console.log(result);
        setSelectedImage(result.assets[0].uri);
        setShowAppOptions(true);
      }else{
        console.log("You didn't select any image");
      }
    }

    const onReset=() => {
      setShowAppOptions(false);
    }

    const onAddSticker =()=> {

    }

    const onSaveImageAsyng = async () =>{

    }

  return (
    <View style={styles.container}>                         
        <View style={styles.imageContainer}>
          <ImageViewer selectedImage={selectedImage} PlaceholderImageSource={PlaceholderImage}></ImageViewer>
          
        </View>
        {showAppOptions ? (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton icon="refresh" label="Reset" onPress={onReset} />
              <CircleButton onPress={onAddSticker} />
              <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsyng} />
            </View>  
          </View>
        ) : (<View style={styles.footerContainer}>
          <Button onPress={pickImageAsync} theme="primary" label="Chose a Photo"></Button>
          <Button onPress={() => setShowAppOptions(true)} label="Use this Photo"></Button>
        </View>
        )}
        <Text>Ya agarro</Text>
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e4053',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textpromps:{
    color: '#fff',
  },
  imageContainer:{
    flex: 1,
    paddingTop:58,
  },
  footerContainer:{
    flex: 1/3,
    alignItems: 'center',
  },
  optionsContainer:{
    position: 'absolute',
    buttom: 80,
  },
  optionsRow:{
    alignItems: 'center',
    flexDirection: 'row',
  },

});
