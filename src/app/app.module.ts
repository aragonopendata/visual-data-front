// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// Primeng
import {
  DropdownModule,
  DataTableModule,
  AutoCompleteModule
} from 'primeng/primeng';
// Main
import { AppComponent } from './app.component';
// Generic Component
import { CkanService } from './services/ckan.service';
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
import { EndGraphComponent } from './components/end-graph/end-graph.component';
import { EmbedGraphComponent } from './components/embed-graph/embed-graph.component';
import { NoEmbedGraphComponent } from './components/no-embed-graph/no-embed-graph.component';
import { ListGraphService } from './services/list-graph.service';
// Utils
import { AccordionModule } from 'ng2-accordion';
import { ChartsModule } from 'ng2-charts';
import { ColorPickerModule } from 'ngx-color-picker';

const pathModifier = Constants.PATH_MODIFIER;

// All the routes for the app
const routes: Routes = [
  // Embed Routes
  { path: pathModifier + 'charts/embed/:id', component: EmbedGraphComponent},

  // No Embed routes
  {
      path: pathModifier + '',
      component: BodyComponent,
      children: [
        { path: pathModifier + '', component: ListGraphsComponent, pathMatch: 'full' },
        { path: pathModifier + 'selectData', component: SelectDataComponent, pathMatch: 'full' },
        { path: pathModifier + 'previewData', component: PreviewDataComponent, pathMatch: 'full' },
        { path: pathModifier + 'previewGraph', component: PreviewGraphComponent, pathMatch: 'full' },
        { path: pathModifier + 'endGraphic', component: EndGraphComponent, pathMatch: 'full' },
        { path: pathModifier + 'charts/:id', component: NoEmbedGraphComponent, pathMatch: 'full' }
      ]
  },
  // Default
  { path: '**', redirectTo: pathModifier + '' }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    DropdownModule,
    AccordionModule,
    AutoCompleteModule,
    DataTableModule,
    ChartsModule,
    ColorPickerModule,
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
    NoEmbedGraphComponent
  ],
  providers: [
    DatePipe,
    Constants,
    DatasetsService,
    CkanService,
    ShareDataService,
    ListGraphService,
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
