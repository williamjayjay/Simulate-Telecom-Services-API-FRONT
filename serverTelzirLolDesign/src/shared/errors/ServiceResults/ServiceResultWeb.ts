import ServiceResult from './ServiceResult';

class ServiceResultWeb<T> extends ServiceResult {
  public data: T;
  public statusCode: number;

  constructor(success: boolean, message: string, data: T, statusCode: number) {
    super(success, message);
    this.data = data;
    this.statusCode = statusCode;
  }
}

export default ServiceResultWeb;
