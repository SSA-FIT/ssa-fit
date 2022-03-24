import { setupWorker } from 'msw';
import { authhandlers } from './handlers/authhandlers';
import { recoHandlers } from './handlers/recoHandlers';

export const worker = setupWorker(...authhandlers,...recoHandlers);

