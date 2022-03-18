import { setupWorker } from 'msw';
import { authhandlers } from './handlers/authhandlers';

export const worker = setupWorker(...authhandlers);
