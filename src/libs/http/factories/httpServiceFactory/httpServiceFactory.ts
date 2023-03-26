import { HttpService } from '../../services/httpService/httpService.js';
import { HttpServiceConfig } from '../../services/httpService/httpServiceConfig.js';

export interface HttpServiceFactory {
  create(config: HttpServiceConfig): HttpService;
}
