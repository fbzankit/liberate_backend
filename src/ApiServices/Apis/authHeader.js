
import Auth from '../../Auth/Auth';
export {
    authHeader,
    authNoneHeader,
}
function authHeader(){
  return  {
    'Content-Type': 'application/json;charset=UTF-8',
    'Authorization':`Bearer ${Auth.getAccessToken()}`}
}
function authNoneHeader(){
  return  {'Content-Type': 'application/json;charset=UTF-8'}
}
