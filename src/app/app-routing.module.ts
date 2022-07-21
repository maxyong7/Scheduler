import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { SpotifyComponent } from './components/spotify/spotify.component';

const routes: Routes = [
  { path: '', component: SpotifyComponent, canActivate: [AuthGuard] },
  { path: 'login', component: SpotifyComponent },
  { path: 'callbacks', component: SpotifyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [SpotifyComponent]
