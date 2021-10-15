import { trackByFactory } from '@stlmpp/utils';

export const trackById = trackByFactory<{ id: number }>('id');
export const trackByIndex = trackByFactory<any>();
