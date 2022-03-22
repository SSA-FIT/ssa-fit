import { setupWorker } from 'msw';
import { recoHandlers } from './handlers/recoHandlers';

export const worker = setupWorker(...recoHandlers);
