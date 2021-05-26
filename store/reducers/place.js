import { ADD_PLACE, SET_PLACES } from '../actions/place';
import Place from '../../models/place';

const initData = [
  {
    id: 'dummyId_1',
    imageUri: `https://www.immune-image.eu/wp-content/uploads/2020/01/publications-immune-image.jpg`,
    title: `book`,
  },
  {
    id: 'dummyId_2',
    imageUri: `https://gnbvietnam.com/wp-content/uploads/2018/04/Manhattan-3.jpg`,
    title: `New York`,
  },
];

const initialState = {
  places: [...initData],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_PLACE:
      console.log(payload);
      const newPlace = new Place(
        payload.id.toString(),
        payload.title,
        payload.imageUri,
      );
      return {
        places: state.places.concat(newPlace),
      };
    case SET_PLACES:
      return {
        places: payload
          ? payload.map(
              (pl) => new Place(pl.id.toString(), pl.title, pl.imageUri),
            )
          : [...initData],
      };
    default:
      return state;
  }
};
