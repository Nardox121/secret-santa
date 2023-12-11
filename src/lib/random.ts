import { UUID } from 'mongodb';

export const generateGuid = () => `${new UUID()}`;