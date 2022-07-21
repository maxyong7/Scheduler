import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { QuillModule } from 'ngx-quill'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BottomContainerComponent } from './components/bottom-container/bottom-container.component';
import { PopUpTaskComponent } from './components/pop-up-task/pop-up-task.component';
import { SpotifyComponent } from './components/spotify/spotify.component';
import { TimeSlotComponent } from './components/time-slot/time-slot.component';
import { TimeSpaceComponent } from './components/time-space/time-space.component';
import { TimeSpaceItemComponent } from './components/time-space-item/time-space-item.component';
import { TopButtonComponent } from './components/top-button/top-button.component';
import { TopContainerComponent } from './components/top-container/top-container.component';
import { WeatherComponent } from './components/weather/weather.component';
import { MoreDetailsComponent } from './components/more-details/more-details.component';

@NgModule({
  declarations: [
    AppComponent,
    BottomContainerComponent,
    PopUpTaskComponent,
    SpotifyComponent,
    TimeSlotComponent,
    TimeSpaceComponent,
    TimeSpaceItemComponent,
    TopButtonComponent,
    TopContainerComponent,
    WeatherComponent,
    MoreDetailsComponent,

  ],
  entryComponents: [PopUpTaskComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    QuillModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
