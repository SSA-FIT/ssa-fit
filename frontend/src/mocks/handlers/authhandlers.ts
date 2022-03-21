import { rest } from 'msw';
import { EmailCodeConfirm } from '../../types/commonTypes';

export const authhandlers = [
  rest.get(
    `${process.env.REACT_APP_LOCALHOST_URL}/api/users/sign-up/email-verification`,

    async (request, response, context) => {
      const userEmail = request.url.searchParams.get('email');

      if (userEmail === '409error@naver.com') {
        return response(
          context.status(409),
          context.json({
            message: '이미 등록된 이메일 입니다.',
          }),
        );
      }

      if (userEmail === '500error@naver.com') {
        return response(
          context.status(500),
          context.json({
            message: 'Internal Server Error, 이메일 인증 실패',
          }),
        );
      }

      return response(
        context.json({
          message:
            '입력한 이메일로 인증 메일을 발송했습니다.\n 이메일에 표시된 인증코드를 입력해주세요.',
        }),
      );
    },
  ),

  rest.post(
    `${process.env.REACT_APP_LOCALHOST_URL}/api/users/sign-up/email-verification`,

    async (request, response, context) => {
      // const data: EmailCodeConfirm = request.body;
      // const { userEmail, emailCode } = data;
      const userEmail = request.url.searchParams.get('email');
      const emailCode = request.url.searchParams.get('code');

      if (emailCode === '401error') {
        return response(
          context.status(401),
          context.json({
            message: '올바른 인증 코드가 아닙니다.',
          }),
        );
      }

      if (emailCode === '403error') {
        return response(
          context.status(403),
          context.json({
            message: '인증코드가 만료 되었습니다.',
          }),
        );
      }

      if (emailCode === '500error') {
        return response(
          context.status(500),
          context.json({
            message: 'Internal Server Error, 인증 코드 확인 실패',
          }),
        );
      }

      return response(
        context.json({
          message: '이메일 인증 완료 되었습니다.',
        }),
      );
    },
  ),
];
