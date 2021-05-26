import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addPlace } from '../../store/actions/place';
import Colors from '../../constants/Colors';
import ImagePicker from '../../components/ImagePicker';
import LocationPicker from '../../components/LocationPicker';

const NewPlaceScreen = ({ navigation }) => {
  const [titleValue, setTitleValue] = useState('');
  const [selectedImage, setSelectedImage] = useState();

  const dispatch = useDispatch();

  const titleChangeHandler = (text) => {
    // you could add validation
    setTitleValue(text);
  };

  const handleImageTaken = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const saveHandler = () => {
    dispatch(addPlace({ title: titleValue, imageUri: selectedImage }));
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImagePicker fImageTaken={handleImageTaken} />
        <LocationPicker />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={saveHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: 'Add Place',
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default NewPlaceScreen;
