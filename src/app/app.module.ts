// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';

// Primeng
import {DropdownModule, DataTableModule, AutoCompleteModule} from 'primeng/primeng';

// Main
import { AppComponent } from './zmain/app.component';
import { AppRoutingModule } from './zmain/app-routing.module';
import { Config } from './config';


// Generic Component
import { BlankComponent } from './blank/blank.component';
import { CkanService } from './components/data/ckan.service';

// Data Components
import { ShareDataService } from './components/data/shareData';

// Layaouts
// Layout Client
import { HeaderComponent } from './_layout/header/header.component';
import { LayoutComponent } from './_layout/layout/layout.component';
import { FooterComponent } from './_layout/footer/footer.component';
import { MigasComponent } from './_layout/migas/migas.component';
import { Constants } from './app.constants';

// Pages
import { ListGraphsComponent } from './components/list-graphs/list-graphs.component';
import { SelectDataComponent } from './components/select-data/select-data.component';
import { PreviewDataComponent } from './components/preview-data/preview-data.component';
import { PreviewGraphComponent } from './components/preview-graph/preview-graph.component';
import { EndGraphComponent } from './components/end-graph/end-graph.component';
import { DatasetsService } from './header-modules-components/datasets.service';

// Utils
import {AccordionModule} from 'ng2-accordion';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DropdownModule,
    AccordionModule,
    AutoCompleteModule,
    DataTableModule,
    ChartsModule
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    MigasComponent,
    AppComponent,
    BlankComponent,
    ListGraphsComponent,
    SelectDataComponent,
    PreviewDataComponent,
    PreviewGraphComponent,
    EndGraphComponent
  ],
  providers: [
    DatePipe,
    Config ,
    Constants,
    DatasetsService,
    CkanService,
    ShareDataService],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
