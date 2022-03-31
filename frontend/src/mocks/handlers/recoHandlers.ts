import { rest } from 'msw';
import {
  ExerciseSelections,
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
      return response(context.json({ profileRec: ExerciseSelections }));
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
