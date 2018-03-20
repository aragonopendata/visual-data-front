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
// Layouts
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { MigasComponent } from './components/common/migas/migas.component';
// Constants
import { Constants } from './app.constants';
// Pages
import { ListGraphsComponent } from './components/list-graphs/list-graphs.component';
import { SelectDataComponent } from './components/select-data/select-data.component';
import { PreviewDataComponent } from './components/preview-data/preview-data.component';
import { PreviewGraphComponent } from './components/preview-graph/preview-graph.component';
import { EndGraphComponent } from './components/end-graph/end-graph.component';
import { DatasetsService } from './services/datasets.service';
// Utils
import { AccordionModule } from 'ng2-accordion';
import { ChartsModule } from 'ng2-charts';
import { ColorPickerModule } from 'ngx-color-picker';

const pathModifier = Constants.PATH_MODIFIER;
const routes: Routes = [
  { path: pathModifier + '', component: ListGraphsComponent, pathMatch: 'full' },
  { path: pathModifier + 'selectData', component: SelectDataComponent, pathMatch: 'full' },
  { path: pathModifier + 'previewData', component: PreviewDataComponent, pathMatch: 'full' },
  { path: pathModifier + 'previewGraph', component: PreviewGraphComponent, pathMatch: 'full' },
  { path: pathModifier + 'endGraphic', component: EndGraphComponent, pathMatch: 'full' }
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
    AppComponent,
    ListGraphsComponent,
    SelectDataComponent,
    PreviewDataComponent,
    PreviewGraphComponent,
    EndGraphComponent
  ],
  providers: [
    DatePipe,
    Constants,
    DatasetsService,
    CkanService,
    ShareDataService,
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
