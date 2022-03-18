import { rest } from 'msw';

export const authhandlers = [
  rest.get(
    `${process.env.REACT_APP_LOCALHOST_URL}/api/auth/users/sign-up/email-verification`,

    async (request, response, context) => {
      const userEmail = request.url.searchParams.get('email');

      if (userEmail === '500error@naver.com') {
        return response(
          context.status(500),
          context.json({
            message: '실패',
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
];
