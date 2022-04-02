import { rest } from 'msw';
import {
  ExerciseSelections,
  NonUserSelections,
  SimilarityExerciseSelections,
} from '../databse/recommendations';

export const recoHandlers = [
  rest.get(
    `${process.env.REACT_APP_LOCALHOST_URL}/api/recommendation`,

    async (request, response, context) => {
      return response(context.json({ exercises: ExerciseSelections }));
    },
  ),
  rest.get(
    `${process.env.REACT_APP_LOCALHOST_URL}/api/recommendation/profile`,

    async (request, response, context) => {
      console.log(request.body);
      return response(context.json({ profileRec: ExerciseSelections }));
    },
  ),

  rest.post(
    `${process.env.REACT_APP_LOCALHOST_URL}/api/recommendation/profile`,

    async (request, response, context) => {
      return response(context.json({ profileRec: NonUserSelections }));
    },
  ),
  rest.get(
    `${process.env.REACT_APP_LOCALHOST_URL}/api/recommendation/similarity`,

    async (request, response, context) => {
      return response(
        context.json({ similarityRec: SimilarityExerciseSelections }),
      );
    },
  ),
  rest.get(
    `${process.env.REACT_APP_LOCALHOST_URL}/api/recommendation/bookmark`,

    async (request, response, context) => {
      return response(context.json({ bookmark: ExerciseSelections }));
    },
  ),
];
