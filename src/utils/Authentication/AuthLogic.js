import {API} from '../API'
import inMemoryJWT from './InMemoryJwt'
export class AuthLogic {
 
    async LogIn(){
        window.addEventListener('storage', this.syncLogout);

    }
    
    
   async  syncLogout (event) {
      if (event.key === 'logout') {
        console.log('logged out from storage!')
      }
    }
    
    async  logout () {
      inMemoryToken = null;
      API.logout();
      // to support logging out from all windows
      window.localStorage.setItem('logout', Date.now())
    }


}