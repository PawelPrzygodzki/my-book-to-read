import { DataSource } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import ormconfig from './ormconfig';
export default new DataSource(ormconfig);
