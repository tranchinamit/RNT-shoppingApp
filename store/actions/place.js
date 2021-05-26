import * as FileSystem from 'expo-file-system';

import instanceDB from '../../utils/db';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (payload) => async (dispatch) => {
  const fileName = payload.imageUri.split('/').pop();

  const newPath = FileSystem.documentDirectory + fileName;

  try {
    await FileSystem.moveAsync({
      from: payload.imageUri,
      to: newPath,
    });

    const dbResult = await instanceDB.insertPlace({
      title: payload.title,
      imageUri: newPath,
      address: 'addressName',
      lat: 10.9,
      lng: 10.1,
    });

    console.log(dbResult);

    dispatch({
      type: ADD_PLACE,
      payload: {
        ...payload,
        id: dbResult.insertId,
        imageUri: newPath,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const loadPlaces = (payload) => async (dispatch) => {
  try {
    const dbRs = await instanceDB.getPlaces();
    console.log(dbRs);

    dispatch({ type: SET_PLACES, payload: dbRs.rows._array });
  } catch (err) {
    console.log(err);
  }
};
