import { rest } from 'msw';
import { LogInRequest } from '../../types/authTypes';
import {
  EmailCodeConfirm,
  ResetPasswordConfirm,
  ResetPasswordEmailCodeConfirm,
  SignUpData,
} from '../../types/commonTypes';

export const authhandlers = [
  rest.get(
    `${process.env.REACT_APP_LOCALHOST_URL}/api/users/sign-up/email-verification`,

    async (request, response, context) => {
      const email = request.url.searchParams.get('email');

      if (email === '409error@naver.com') {
        return response(
          context.status(409),
          context.json({
            message: '이미 등록된 이메일 입니다.',
          }),
        );
      }

      if (email === '500error@naver.com') {
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
            '입력한 이메일로 인증 메일을 발송했습니다<br>이메일에 표시된 인증코드를 입력해주세요.',
        }),
      );
    },
  ),

  rest.post(
    `${process.env.REACT_APP_LOCALHOST_URL}/api/users/sign-up/email-verification`,

    async (request: any, response, context) => {
      const data: EmailCodeConfirm = request.body;
      const { code, email } = data;

      // const userEmail = data.email;
      // const emailCode = data.code;

      if (code === '401error') {
        return response(
          context.status(401),
          context.json({
            message: '올바른 인증 코드가 아닙니다.',
          }),
        );
      }

      if (code === '403error') {
        return response(
          context.status(403),
          context.json({
            message: '인증코드가 만료 되었습니다.',
          }),
        );
      }

      if (code === '500error') {
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

  rest.get(
    `${process.env.REACT_APP_LOCALHOST_URL}/api/users/sign-up/id-check`,

    async (request, response, context) => {
      const userId = request.url.searchParams.get('userId');

      if (userId === '409error') {
        return response(
          context.status(409),
          context.json({
            message: '이미 존재하는 ID 입니다.',
          }),
        );
      }

      if (userId === '500error') {
        return response(
          context.status(500),
          context.json({
            message: 'Internal Server Error, ID 중복 확인 실패',
          }),
        );
      }

      return response(
        context.json({
          message: '사용 가능한 ID 입니다.',
        }),
      );
    },
  ),

  rest.post(
    `${process.env.REACT_APP_LOCALHOST_URL}/api/users/sign-up`,

    async (request: any, response, context) => {
      const data: SignUpData = request.body;
      const { userId } = data;

      if (userId === '400error') {
        return response(
          context.status(400),
          context.json({
            message: '입력값이 유효하지 않습니다.',
          }),
        );
      }

      if (userId === '500error') {
        return response(
          context.status(500),
          context.json({
            message: 'Internal Server Error, 신체 정보 등록 실패',
          }),
        );
      }

      return response(
        context.json({
          message: '가입이 완료되었습니다.',
        }),
      );
    },
  ),

  rest.post(
    `${process.env.REACT_APP_LOCALHOST_URL}/api/users/login`,

    async (request: any, response, context) => {
      const data: LogInRequest = request.body;
      const { userId } = data;

      if (userId === '400error') {
        return response(
          context.status(401),
          context.json({
            message: '아이디 또는 비밀번호를 확인해주세요.',
          }),
        );
      }

      if (userId === '500error') {
        return response(
          context.status(500),
          context.json({
            message: 'Internal Server Error, 로그인 실패',
          }),
        );
      }

      return response(
        context.json({
          message: '로그인하였습니다.',
          token: 'asfasdfawefzxcvzxvdsv.asdfweefwfwefzxvxcvxzcv.wqwdafsdfsdf',
        }),
      );
    },
  ),

  rest.get(
    `${process.env.REACT_APP_LOCALHOST_URL}/api/users/login/searching-id`,

    async (request, response, context) => {
      const email = request.url.searchParams.get('email');

      if (email === '401error@naver.com') {
        return response(
          context.status(401),
          context.json({
            message: '입력하신 이메일이 맞는지 확인해주세요.',
          }),
        );
      }

      if (email === '500error@naver.com') {
        return response(
          context.status(500),
          context.json({
            message: 'Internal Server Error, 아이디 찾기 실패',
          }),
        );
      }

      return response(
        context.json({
          message: '아이디 찾기에 성공하였습니다.',
          userId: 'success',
        }),
      );
    },
  ),

  rest.get(
    `${process.env.REACT_APP_LOCALHOST_URL}/api/users/login/reset-password`,

    async (request, response, context) => {
      const email = request.url.searchParams.get('email');
      const userId = request.url.searchParams.get('userId');

      if (email === '409error@naver.com') {
        return response(
          context.status(409),
          context.json({
            message: '입력하신 회원 정보가 맞는지 확인해주세요.',
          }),
        );
      }

      if (email === '500error@naver.com') {
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
    `${process.env.REACT_APP_LOCALHOST_URL}/api/users/login/reset-password`,

    async (request: any, response, context) => {
      const data: ResetPasswordEmailCodeConfirm = request.body;
      const { code, email, userId } = data;

      // const userEmail = data.email;
      // const emailCode = data.code;

      if (code === '401error') {
        return response(
          context.status(401),
          context.json({
            message: '올바른 인증 코드가 아닙니다.',
          }),
        );
      }

      if (code === '403error') {
        return response(
          context.status(403),
          context.json({
            message: '인증코드가 만료 되었습니다.',
          }),
        );
      }

      if (code === '500error') {
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

  rest.put(
    `${process.env.REACT_APP_LOCALHOST_URL}/api/users/login/reset-password`,

    async (request: any, response, context) => {
      const data: ResetPasswordConfirm = request.body;
      const { password, email, userId } = data;

      if (password === '500error') {
        return response(
          context.status(500),
          context.json({
            message: 'Internal Server Error, 비밀번호 재설정 실패',
          }),
        );
      }

      return response(
        context.json({
          message: '비밀번호 재설정이 완료 되었습니다.',
        }),
      );
    },
  ),
];
