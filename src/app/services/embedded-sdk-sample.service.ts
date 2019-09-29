import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmbeddedSdkSampleService {
  baseUrl = environment.BASE_URL + '/MicroStrategyLibrary/api/';

  constructor(private http: HttpClient) {}

  getAuthToken(credentials: object) {
    return this.http
      .post(this.baseUrl + 'auth/login', credentials, {
        observe: 'response',
        responseType: 'text'
      })
      .toPromise();
  }

  getAllProjects(authToken: string | string[]) {
    return this.http
      .get(this.baseUrl + 'projects', {
        headers: new HttpHeaders({
          'X-MSTR-AuthToken': authToken
        })
      })
      .toPromise();
  }

  getConfigurationLevelFolders(
    authToken: string | string[],
    projectId: string | string[]
  ) {
    return this.http
      .get(this.baseUrl + 'folders?limit=-1&offset=0', {
        headers: new HttpHeaders({
          'X-MSTR-AuthToken': authToken,
          'X-MSTR-ProjectID': projectId
        })
      })
      .toPromise();
  }

  searchDocsInFolder(
    authToken: string | string[],
    projectId: string | string[],
    folderId: any,
    numDisplay: any
  ) {
    const limit = numDisplay == null ? 200 : numDisplay;
    const requestUrl = `${this.baseUrl}searches/results?pattern=4&root=${folderId}&type=55&getAncestors=false&limit=${limit}&offset=0`;
    return this.http
      .get(requestUrl, {
        headers: new HttpHeaders({
          'X-MSTR-AuthToken': authToken,
          'X-MSTR-ProjectID': projectId
        })
      })
      .toPromise();
  }

  getEmbeddedAuthToken(credentials: {
    username: string;
    loginMode: number;
    password: string;
  }) {
    return this.http
      .post(this.baseUrl + 'auth/login', credentials, {
        observe: 'response',
        responseType: 'text'
      })
      .toPromise();
  }
}
