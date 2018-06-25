// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { AngularOpenlayersModule } from 'ngx-openlayers';
import { AuthGuard } from './_guards/auth.guard';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { UtilsService } from './components/exportedFunctions/utils.service';

// Primeng
import {
  DropdownModule,
  DataTableModule,
  AutoCompleteModule,
  SpinnerModule,
  InputTextModule
} from 'primeng/primeng';
// Main
import { AppComponent } from './app.component';
// Service Component
import { CkanService } from './services/ckan.service';
import { GaodcService } from './services/gaodc.service';
import { URLService } from './services/url.service';
import { VirtuosoService } from './services/virtuoso.service';
import { GraphService } from './services/graph.service';
// Data Components
import { ShareDataService } from './services/shareData.service';
import { DatasetsService } from './services/datasets.service';
// Layouts
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { MigasComponent } from './components/common/migas/migas.component';
// Constants
import { Constants } from './app.constants';
// Pages
import { BodyComponent } from './components/common/body/body.component';
import { ListGraphsComponent } from './components/list-graphs/list-graphs.component';
import { SelectDataComponent } from './components/select-data/select-data.component';
import { PreviewDataComponent } from './components/preview-data/preview-data.component';
import { PreviewGraphComponent } from './components/preview-graph/preview-graph.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { EndGraphComponent } from './components/end-graph/end-graph.component';
import { EmbedGraphComponent } from './components/embed-graph/embed-graph.component';
import { MapComponent } from './components/common/map/map.component';
// Utils
import { AccordionModule } from 'ngx-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxCarouselModule } from 'ngx-carousel';
import { DragulaModule } from 'ng2-dragula';
import { TreeModule } from 'angular-tree-component';
import 'hammerjs';
import { UtilsGraphService } from './components/exportedFunctions/utilsChats.util';

// All the routes for the app
const routes: Routes = [
  // Embed Routes
  { path: 'charts/embed/:id', component: EmbedGraphComponent },
  { path: 'adminPanel', component: AdminPanelComponent, canActivate: [AuthGuard] },

  // No Embed routes
  {
    path: '',
    component: BodyComponent,
    children: [
      { path: '', component: ListGraphsComponent, pathMatch: 'full' },
      { path: 'selectData', component: SelectDataComponent },
      { path: 'previewData', component: PreviewDataComponent },
      { path: 'previewGraph', component: PreviewGraphComponent },
      { path: 'endGraphic/:id', component: EndGraphComponent },
      { path: 'charts/:id', component: EndGraphComponent }
    ]
  }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    DropdownModule,
    AccordionModule.forRoot(),
    AutoCompleteModule,
    DataTableModule,
    SpinnerModule,
    ChartsModule,
    ColorPickerModule,
    NgxCarouselModule,
    DragulaModule,
    InputTextModule,
    TreeModule,
    AngularOpenlayersModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    MigasComponent,
    BodyComponent,
    AppComponent,
    ListGraphsComponent,
    SelectDataComponent,
    PreviewDataComponent,
    PreviewGraphComponent,
    EndGraphComponent,
    EmbedGraphComponent,
    MapComponent,
    AdminPanelComponent
  ],
  providers: [
    DatePipe,
    Constants,
    DatasetsService,
    CkanService,
    GaodcService,
    VirtuosoService,
    ShareDataService,
    GraphService,
    URLService,
    UtilsGraphService,
    UtilsService,
    AuthGuard,
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
