import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { BlankComponent } from '../blank/blank.component';
import { ListGraphs } from '../components/list-graphs/list-graphs.component';
import { SelectData } from '../components/select-data/select-data.component';
import { PreviewData } from '../components/preview-data/preview-data.component';
import { PreviewGraph } from '../components/preview-graph/preview-graph.component';
import { EndGraph } from '../components/end-graph/end-graph.component';

//Layouts
import { LayoutComponent } from '../_layout/layout/layout.component';

const pathModifier = "";

//All the routes for the app
const routes: Routes = [
  
  //no layout routes
  { path: pathModifier +'blank', component: BlankComponent},

  // Client routes goes here here
  { 
      path: '',
      component: LayoutComponent, 
      children: [
        { path: pathModifier +'', component: ListGraphs},
        { path: pathModifier +'selectData', component: SelectData},
        { path: pathModifier +'previewData', component: PreviewData},
        { path: pathModifier +'previewGraph', component: PreviewGraph},
        { path: pathModifier +'endGraphic', component: EndGraph}
      ]
  },

  //Default
  { path: '**', redirectTo: pathModifier +'noAccess' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}