import api from './api'

class ApiWrapper{
  get(url,params={}){
    return api.get(url,{params});
  }

  post(url,data={}){
    return api.post(url,data);
  }

  put(url,data={}){
    return api.put(url,data);
  }

  delete(url){
    return api.delete(url);
  }
}

export default new ApiWrapper();