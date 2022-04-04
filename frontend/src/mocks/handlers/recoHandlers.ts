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

  // 즐겨찾기 해제
  rest.get(
    `${process.env.REACT_APP_LOCALHOST_URL}/api/users/bookmark`,

    async (request, response, context) => {
      const exerciseId = request.url.searchParams.get('exerciseId');

      if (exerciseId === '401') {
        return response(
          context.status(401),
          context.json({
            message: 'Unauthorized',
          }),
        );
      }

      if (exerciseId === '403') {
        return response(
          context.status(403),
          context.json({
            message: '인증 실패',
          }),
        );
      }

      if (exerciseId === '404') {
        return response(
          context.status(404),
          context.json({
            message: 'Not Found',
          }),
        );
      }

      if (exerciseId === '500') {
        return response(
          context.status(500),
          context.json({
            message: '서버 오류',
          }),
        );
      }
      return response(
        context.json({
          message: '성공',
        }),
      );
    },
  ),
];
