import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FramePageComponent } from './pages/master/frame.page';
import { JiraViewerComponent } from './pages/jira-viewer/jira-viewer.component';

const routes: Routes = [
  {
    path: '',
    component: FramePageComponent,
    children: [
      {
        path: '',
        component: JiraViewerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
