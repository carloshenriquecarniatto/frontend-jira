import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FramePageComponent } from './pages/master/frame.page';
import { JiraViewerComponent } from './pages/jira-viewer/jira-viewer.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ItemCardsComponent } from './components/dashboard/item-cards/item-cards.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { IssuesService } from './services/issues.service';
import { GroupedCardsComponent } from './components/dashboard/grouped-cards/grouped-cards.component';
import { FilterByLabelAndDatePipe } from './utils/filter-by-label-date.pipe';
import { ErrorMessageComponent } from './components/shared/error-message/error-message.component';

@NgModule({
  declarations: [
    AppComponent,
    FramePageComponent,
    JiraViewerComponent,
    LoadingComponent,
    NavbarComponent,
    ItemCardsComponent,
    GroupedCardsComponent,
    FilterByLabelAndDatePipe,
    ErrorMessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    DragDropModule,
  ],
  providers: [IssuesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
