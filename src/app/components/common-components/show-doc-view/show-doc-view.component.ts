import {
  Component,
  OnInit,
  Input,
  Output,
  ElementRef,
  EventEmitter
} from '@angular/core';
import { EmbeddedSdkSampleService } from '../../../services/embedded-sdk-sample.service';

declare const microstrategy: any;
@Component({
  selector: 'app-show-doc-view',
  templateUrl: './show-doc-view.component.html',
  styleUrls: ['./show-doc-view.component.scss']
})
export class ShowDocViewComponent implements OnInit {
  @Input() docsInFolder;
  @Input() projectId;
  @Input() currentDocId;
  @Output() openDocEmit = new EventEmitter<any>();
  docListActiveClass = 'btn-primary';

  constructor(
    private elementRef: ElementRef,
    private embeddedSdkSampleSrv: EmbeddedSdkSampleService
  ) {}

  ngOnInit() {
    this.showDossier();
  }

  openDoc(currDoc) {
    const myEl = this.elementRef.nativeElement.querySelector(
      '#dossierContainer'
    );
    if (myEl.firstChild) {
      myEl.removeChild(myEl.firstChild);
    }
    this.currentDocId = currDoc.id;
    this.openDocEmit.emit({
      currentDocId: currDoc.id
    });
    this.showDossier();
  }

  showDossier() {
    const placeHolderDiv = this.elementRef.nativeElement.querySelector(
      '#dossierContainer'
    );
    const projectUrl =
      'http://wcld2d11mst.corp.vha.ad:8080/MicroStrategyLibrary/app/' +
      this.projectId;
    const dossierUrl = projectUrl + '/' + this.currentDocId;
    const credentials = {
      username: 'administrator',
      loginMode: 1,
      password: 'oXG8O5aQ5w'
    };
    microstrategy.dossier.create({
      placeholder: placeHolderDiv,
      // url should match /dossier/projectId/docId
      url: dossierUrl,
      enableCustomAuthentication: true,
      enableResponsive: true,
      customAuthenticationType:
        microstrategy.dossier.CustomAuthenticationType.AUTH_TOKEN,
      getLoginToken: () => {
        return this.embeddedSdkSampleSrv
          .getEmbeddedAuthToken(credentials)
          .then(res => {
            return res.headers.get('X-MSTR-AuthToken');
          });
      }
    });
  }

  highlightSelection(selectedDocId) {
    return selectedDocId.id === this.currentDocId
      ? this.docListActiveClass
      : '';
  }
}
