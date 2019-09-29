import { Component, OnInit } from '@angular/core';
import { EmbeddedSdkSampleService } from '../../services/embedded-sdk-sample.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-embedded-sdk-sample',
  templateUrl: './embedded-sdk-sample.component.html',
  styleUrls: ['./embedded-sdk-sample.component.scss']
})
export class EmbeddedSDKSampleComponent implements OnInit {
  FOLDER_ID = null;
  folderId = null;
  FOLDER_NAME = null;
  PROJECT_NAME = null;
  NUM_OF_DOCS_TO_DISPLAY = null;

  authToken = '';
  projects: Array<any>;
  projectId = '5B3FFAAC11E956F4DD2A0080EFC5F5EF';
  configurationFolders: Array<any>;
  docsInFolder: Array<any>;
  filterList: Array<any>;
  showList = 'list';
  searchText = '';
  currentDocId = null;

  constructor(private embeddedSdkSampleSrv: EmbeddedSdkSampleService) {}

  ngOnInit() {
    this.initData();
  }

  initData() {
    const credentials = {
      username: 'administrator',
      loginMode: 1,
      password: 'oXG8O5aQ5w'
    };
    this.embeddedSdkSampleSrv.getAuthToken(credentials).then(res => {
      this.authToken = res.headers.get('X-MSTR-AuthToken');
      return this.embeddedSdkSampleSrv
        .getAllProjects(this.authToken)
        .then((res: any) => {
          this.projects = res;
          this.getTheProject();
          return this.embeddedSdkSampleSrv
            .getConfigurationLevelFolders(this.authToken, this.projectId)
            .then((res: any) => {
              this.configurationFolders = res;
              this.getTheFolder();
              return this.embeddedSdkSampleSrv
                .searchDocsInFolder(
                  this.authToken,
                  this.projectId,
                  this.folderId,
                  this.NUM_OF_DOCS_TO_DISPLAY
                )
                .then((res: any) => {
                  this.docsInFolder = this.prepareData(res.result);
                  this.filterList = _.cloneDeep(this.docsInFolder);
                });
            });
        });
    });
  }

  getTheProject() {
    /* Find the project ID */
    if (this.projects && this.projects.length > 0) {
      /* Go through returned project list to find the project*/
      if (this.projectId && this.projectId.length > 0) {
        this.projects.forEach(e => {
          if (e.id === this.projectId) {
            this.projectId = e.id;
          }
        });
      } else {
        if (this.PROJECT_NAME == null || this.PROJECT_NAME.length <= 0) {
          this.PROJECT_NAME = 'MicroStrategy Tutorial';
        }
        this.projects.forEach(e => {
          if (e.name === 'MicroStrategy Tutorial') {
            this.projectId = e.id;
          }
        });
      }

      /* If didn't find the project matching the projectName, use the first project*/
      this.projectId =
        this.projectId == null ? this.projects[0].id : this.projectId;
    }
  }

  getTheFolder() {
    if (this.configurationFolders && this.configurationFolders.length > 0) {
      // If folderId was provided/specified
      if (this.FOLDER_ID && this.FOLDER_ID.length > 0) {
        this.configurationFolders.forEach(e => {
          if (e.id === this.FOLDER_ID) {
            this.folderId = e.id;
          }
        });
      }

      // If folderId was not provided or provided folderId does not match any returned folders
      if (this.folderId == null) {
        if (this.FOLDER_NAME == null || this.FOLDER_NAME.length <= 0) {
          this.FOLDER_NAME = 'Public Objects';
        }
        this.configurationFolders.forEach(e => {
          if (e.name === this.FOLDER_NAME) {
            this.folderId = e.id;
          }
        });
      }

      // If provided folderName does not match any returned folders, search for 'Public Objects'
      if (this.folderId == null) {
        this.configurationFolders.forEach(e => {
          if (e.name === 'Public Objects') {
            this.folderId = e.id;
          }
        });
      }
    }
  }

  prepareData(arr) {
    arr.forEach(e => {
      /* append cover page URL */
      e.imageUrl =
        e.iconPath && e.iconPath.length !== 0 ? e.iconPath : 'dossier.png';
      /* Parse string to Date objects */
      e.dateModified = this.parseDate(e.dateModified);
      e.dateCreated = this.parseDate(e.dateCreated);
    });
    if (!arr || !arr.length) {
      return [];
    }
    return arr.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
  }

  parseDate(date) {
    const newDate = date.replace('.000', '');
    const len = newDate.length;
    return new Date(
      newDate.slice(0, len - 2) + ':' + newDate.slice(len - 2, len)
    );
  }

  goToListView() {
    return (this.showList = 'list');
  }

  isShowList() {
    return this.showList === 'list';
  }

  getFilterList() {
    const list = this.docsInFolder.filter(obj => {
      return this.checkObjVal(obj);
    });
    this.filterList = list;
  }

  checkObjVal(obj: object) {
    let checked = false;
    const searchVal = this.searchText.toLocaleLowerCase();
    const checkVal = (val: any) => {
      if (!checked) {
        return val
          .toString()
          .toLocaleLowerCase()
          .indexOf(searchVal) > -1;
      }
      return false;
    };
    // tslint:disable-next-line: forin
    for (const i in obj) {
      const firstVal = obj[i];
      if (!checked) {
        if (Object.prototype.toString.call(firstVal) === '[object Object]') {
          Object.keys(firstVal).forEach(j => {
            checked = checkVal(firstVal[j]);
          });
        } else {
          checked = checkVal(firstVal);
        }
      }
    }
    return checked;
  }

  openDocFromMain($event) {
    this.showList = 'showDocView';
    this.currentDocId = $event.currentDocId;
  }

  openDoc($event) {
    this.currentDocId = $event.currentDocId;
  }
}
