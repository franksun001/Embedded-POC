import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmbeddedSDKSampleComponent } from './components/embedded-sdk-sample/embedded-sdk-sample.component';
import { TableListComponent } from './components/common-components/table-list/table-list.component';
import { ShowDocViewComponent } from './components/common-components/show-doc-view/show-doc-view.component';
import { EmbeddedSdkSampleService } from './services/embedded-sdk-sample.service';

@NgModule({
  declarations: [
    AppComponent,
    EmbeddedSDKSampleComponent,
    TableListComponent,
    ShowDocViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [EmbeddedSdkSampleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
