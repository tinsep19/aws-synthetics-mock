class SyntheticsLogger {
  constructor() {
  }
  debug(message: string, ex:any){
    console.debug(message, ex);
  }
  error(message: string, ex:any){
    console.error(message, ex);
  }
  info(message: string, ex:any){
    console.info(message, ex);
  }
  log(message: string, ex:any){
    console.log(message, ex);
  }
  warn(message: string, ex:any){
    console.warn(message, ex);
  }
}
export default SyntheticsLogger;
