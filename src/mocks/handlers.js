// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
  rest.get(
    'https://zoo-animal-api.herokuapp.com/animals/rand',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          name: 'Masai Giraffe',
          latin_name: 'Giraffa camelopardalis tippelskirchi',
          animal_type: 'Mammal',
          active_time: 'Diurnal',
          length_min: '15',
          length_max: '17',
          weight_min: '1200',
          weight_max: '4250',
          lifespan: '13',
          habitat: 'Savanna and woodland',
          diet: 'Leaves, shoots, and fruits',
          geo_range: 'Southern Kenya and Tanzania',
          image_link:
            'https://upload.wikimedia.org/wikipedia/commons/3/3b/Mannetjes_masaigiraffe_in_de_Serengeti%2C_Tanzania%2C_-12_januari_2013_a.jpg',
          id: 114,
        })
      );
    }
  ),

  rest.get('https://zoo-animal-api.herokuapp.com/invalid', (req, res, ctx) => {
    return res(
      ctx.status(404),
      ctx.json({
        error:
          "We're unable to find the information you are looking for. Please try again.",
      })
    );
  }),
];
