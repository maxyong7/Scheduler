import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as secrets from 'secrets';

@Component({
  selector: 'app-bottom-container',
  templateUrl: './bottom-container.component.html',
  styleUrls: ['./bottom-container.component.css']
})


export class BottomContainerComponent implements OnInit {
  redirect_url: string = 'http://127.0.0.1:4200/callbacks'
  AUTHORIZE: string = "https://accounts.spotify.com/authorize"
  constructor(private router: Router) { }



  ngOnInit(): void {
  }

  requestAuthorization() {
    let client_id = secrets.client_id
    let client_secret = secrets.client_secret
    localStorage.setItem("client_id", client_id);
    localStorage.setItem("client_secret", client_secret); // In a real app you should not expose your client_secret to the user

    let url = this.AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(this.redirect_url);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    window.location.href = url; // Show Spotify's authorization screen
  }


}
