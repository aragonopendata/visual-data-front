import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { BlankComponent } from '../blank/blank.component';
import { ListGraphsComponent } from '../components/list-graphs/list-graphs.component';
import { SelectDataComponent } from '../components/select-data/select-data.component';
import { PreviewDataComponent } from '../components/preview-data/preview-data.component';
import { PreviewGraphComponent } from '../components/preview-graph/preview-graph.component';
import { EndGraphComponent } from '../components/end-graph/end-graph.component';

// Layouts
import { LayoutComponent } from '../_layout/layout/layout.component';

const pathModifier = '';

// All the routes for the app
const routes: Routes = [

  // no layout routes
  { path: pathModifier + 'blank', component: BlankComponent},

  // Client routes goes here here
  {
      path: '',
      component: LayoutComponent,
      children: [
        { path: pathModifier + '', component: ListGraphsComponent},
        { path: pathModifier + 'selectData', component: SelectDataComponent},
        { path: pathModifier + 'previewData', component: PreviewDataComponent},
        { path: pathModifier + 'previewGraph', component: PreviewGraphComponent},
        { path: pathModifier + 'endGraphic', component: EndGraphComponent}
      ]
  },

  // Default
  { path: '**', redirectTo: pathModifier + 'noAccess' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
