import IConfig from './config.interface';

export default (): IConfig => ({
  application: {
    port: parseInt(process.env.PORT, 10) || 3000,
  },
});
