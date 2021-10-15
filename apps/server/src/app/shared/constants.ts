import { resolve } from 'path';
import { environment } from '../../environments/environment';

export const FRONT_END_PATH = resolve(process.cwd(), environment.frontEndPath);
