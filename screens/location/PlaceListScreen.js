import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, FlatList } from 'react-native';
import { loadPlaces } from '../../store/actions/place';
import PlaceItem from '../../components/PlaceItem';

export default ({ navigation }) => {
  const dispatch = useDispatch();
  const { places } = useSelector((state) => state.places);

  useEffect(() => {
    dispatch(loadPlaces());
    return () => {};
  }, [dispatch]);

  return (
    <FlatList
      // onRefresh={loadedProducts}
      // refreshing={isRefreshing}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem
          {...item}
          fSelect={() =>
            navigation.navigate('PlaceDetail', {
              id: item.id,
              title: item.title,
            })
          }
        />
      )}
    />
  );
};

const styles = StyleSheet.create({});
