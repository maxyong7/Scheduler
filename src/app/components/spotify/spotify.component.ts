import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as secret from 'secrets';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css']
})
export class SpotifyComponent implements OnInit {

  access_token!: any;
  refresh_token!: any;

  // redirect_uri_check: string = 'http://127.0.0.1:4200/callbacks'
  // redirect_uri: string = 'http://127.0.0.1:4200/'
  // redirect_uri_check: string = 'http://maxyongdemo1.s3-website-us-east-1.amazonaws.com/callbacks'
  // redirect_uri: string = 'http://maxyongdemo1.s3-website-us-east-1.amazonaws.com/'
  redirect_uri_check: string = 'https://maxyong.com/callbacks'
  redirect_uri: string = 'https://maxyong.com/'

  AUTHORIZE: string = "https://accounts.spotify.com/authorize"
  TOKEN: string = "https://accounts.spotify.com/api/token";
  PLAYLISTS: string = "https://api.spotify.com/v1/me/playlists";
  DEVICES: string = "https://api.spotify.com/v1/me/player/devices";
  PLAY: string = "https://api.spotify.com/v1/me/player/play";
  PAUSE: string = "https://api.spotify.com/v1/me/player/pause";
  NEXT: string = "https://api.spotify.com/v1/me/player/next";
  PREVIOUS: string = "https://api.spotify.com/v1/me/player/previous";
  PLAYER: string = "https://api.spotify.com/v1/me/player";
  TRACKS: string = "https://api.spotify.com/v1/playlists/{{PlaylistId}}/tracks";
  CURRENTLYPLAYING: string = "https://api.spotify.com/v1/me/player/currently-playing";
  SHUFFLE: string = "https://api.spotify.com/v1/me/player/shuffle";
  VOLUME: string = "https://api.spotify.com/v1/me/player/volume"

  client_id = secret.client_id
  client_secret = secret.client_secret;

  currentPlayingImage!: any;
  currentPlayingImageUrl!: any;
  currentPlayingTitle!: any;
  currentPlayingTitleUrl!: any;
  currentPlayingArtist!: any;
  currentPlayingArtistUrl!: any;
  value!: number
  playPause!: boolean | undefined
  deviceList: any;

  google: string = '//google.com'
  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {



    // console.log("onInit")
    // console.log(window.location.search.length)
    if (window.location.search.length > 0) {
      this.handleRedirect();
    }
    else {
      this.access_token = localStorage.getItem("access_token");
      if (this.access_token != null) {

        // we have an access token so present device section
        // document.getElementById("deviceSection")!.style.display = 'block';
        // console.log("elseee")

        this.currentlyPlaying(true);
        this.refreshDevices();
        this.autoUpdateCurrentlyPlaying();
      }
    }
    // this.refreshRadioButtons();
  }

  formatLabel() {
    return this.value;
  }


  autoUpdateCurrentlyPlaying() {
    setInterval(() => { this.currentlyPlaying(false) }, 5000)
  }

  requestAuthorization() {
    let client_id = secret.client_id
    let client_secret = secret.client_secret
    localStorage.setItem("client_id", client_id);
    // localStorage.setItem("client_secret", client_secret); // In a real app you should not expose your client_secret to the user

    let url = this.AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(this.redirect_uri_check);
    url += "&show_dialog=true";
    // url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    url += "&scope=user-read-playback-state user-modify-playback-state";
    window.location.href = url; // Show Spotify's authorization screen
  }


  onPageLoad() {
    // console.log("onPageLoaded")
    if (window.location.search.length > 0) {
      this.handleRedirect();
    }
    else {
      this.access_token = localStorage.getItem("access_token");
      if (this.access_token == null) {
        // we don't have an access token so present token section
        document.getElementById("tokenSection")!.style.display = 'block';
      }
      else {
        // we have an access token so present device section
        // document.getElementById("deviceSection")!.style.display = 'block';
        this.currentlyPlaying(true);
      }
    }
    // this.refreshRadioButtons();
  }

  handleRedirect() {
    let code = this.getCode();
    // console.log("Got code: " + code)

    this.fetchAccessToken(code);
    window.history.pushState("", "", this.redirect_uri); // remove param from url
  }

  getCode() {
    let code = null;
    const queryString = window.location.search;
    // console.log(`queryString length: ${queryString.length}`)
    if (queryString.length > 0) {
      const urlParams = new URLSearchParams(queryString);
      code = urlParams.get('code')
    }
    return code;
  }


  fetchAccessToken(code: any) {
    let body = "grant_type=authorization_code";
    body += "&code=" + code;
    body += "&redirect_uri=" + encodeURI(this.redirect_uri_check);
    body += "&client_id=" + this.client_id;
    body += "&client_secret=" + this.client_secret;
    this.callAuthorizationApi(body)


  }

  callAuthorizationApi(body: any) {


    let xhr = new XMLHttpRequest();
    xhr.open("POST", this.TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(this.client_id + ":" + this.client_secret).toString());
    xhr.send(body);
    xhr.onload = () => {
      // console.log("called")
      // console.log(xhr.status)
      if (xhr.status == 200) {
        var data = JSON.parse(xhr.responseText);
        // console.log(data);
        var data = JSON.parse(xhr.responseText);
        if (data.access_token != undefined) {
          this.access_token = data.access_token;
          localStorage.setItem("access_token", this.access_token);
        }
        if (data.refresh_token != undefined) {
          this.refresh_token = data.refresh_token;
          localStorage.setItem("refresh_token", this.refresh_token);
        }
        this.onPageLoad();
      }
      else {
        // console.log(xhr.responseText);
      }
    }
  }
  // handleAuthorizationResponse(xhr: any) {
  //   if (xhr.status == 200) {
  //     var data = JSON.parse(xhr.responseText);
  //     console.log(data);
  //     var data = JSON.parse(xhr.responseText);
  //     if (data.access_token != undefined) {
  //       this.access_token = data.access_token;
  //       localStorage.setItem("access_token", this.access_token);
  //     }
  //     if (data.refresh_token != undefined) {
  //       this.refresh_token = data.refresh_token;
  //       localStorage.setItem("refresh_token", this.refresh_token);
  //     }
  //     this.onPageLoad();
  //   }
  //   else {
  //     console.log(xhr.responseText);
  //     alert(xhr.responseText);
  //   }
  // }

  refreshDevices() {
    // console.log("clicked")
    this.callApi3("GET", this.DEVICES, null);
  }

  delayedCurrentlyPlaying(timeout: number) {
    setTimeout(() => {

      this.currentlyPlaying(true)
    }, timeout);
  }

  removeAllItems(elementId: any) {
    let node = document.getElementById(elementId);
    while (node!.firstChild) {
      node!.removeChild(node!.firstChild);
    }
  }

  addDevice(item: any) {
    let node = document.createElement("option");
    node.value = item.id;
    node.innerHTML = item.name;
    document.getElementById("devices")!.appendChild(node);
  }

  transfer(id: string) {
    let body: any = {};
    body.device_ids = [];
    body.device_ids.push(id)

    // body.device_ids.push(this.deviceId())

    this.callApi("PUT", this.PLAYER, JSON.stringify(body), true);
  }

  previous() {
    this.callApi("POST", this.PREVIOUS, null, true);
  }

  play() {
    this.currentlyPlaying
    let xhr = new XMLHttpRequest();
    let body: any = {};
    xhr.open("GET", this.PLAYER + "?market=US", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + this.access_token);
    xhr.send(null);
    xhr.onload = () => {
      // console.log(xhr.status)
      if (xhr.status == 200) {
        // console.log("playing")
      }
      else if (xhr.status == 204) {

      }
      else if (xhr.status == 401) {
        this.refreshAccessToken()
      }
      else {
        // console.log(xhr.responseText);
        // alert(xhr.responseText);
      }
      // console.log(body)
      this.callApi("PUT", this.PLAY, JSON.stringify(body), true);

    };

  }

  shuffle() {
    this.callApi("PUT", this.SHUFFLE + "?state=true", null, true);
    this.play();
  }

  pause() {
    this.callApi("PUT", this.PAUSE, null, true);
  }

  next() {
    this.callApi("POST", this.NEXT, null, true);
  }

  updateSound(value: any) {
    // console.log("(change)")
    let volume_percent = value
    // console.log(volume_percent)
    this.callApi("PUT", this.VOLUME + `?volume_percent=${volume_percent}`, null);

  }

  deviceId() {
    const devices = document.getElementById("devices") as HTMLInputElement | null;
    return devices!.value;
  }



  currentlyPlaying(firstTimeLoad: boolean) {
    // this.callApi100("GET", this.PLAYER + "?market=US", null, this.handleCurrentlyPlayingResponse);
    this.callApi2("GET", this.PLAYER + "?market=US", null, firstTimeLoad);
  }

  callApi(method: string, url: any, body: any, playing?: boolean) {
    // console.log("callApi")
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + this.access_token);
    xhr.send(body);
    xhr.onload = () => this.handleApiResponse(xhr, playing);
  }


  callApi3(method: string, url: any, body: any) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + this.access_token);
    xhr.send(body);
    xhr.onload = () => this.handleDevicesResponse(xhr);
  }

  callApi2(method: string, url: any, body: any, firstTimeLoad: boolean) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + this.access_token);
    xhr.send(body);
    xhr.onload = () => this.handleCurrentlyPlayingResponse(xhr, firstTimeLoad);
  }

  callApi100(method: string, url: any, body: any, callback: Function) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + this.access_token);
    xhr.send(body);
    xhr.onload = () => callback(xhr);
  }

  handleDevicesResponse(xhr: any) {
    // console.log("handling")
    // console.log(xhr.status)
    // console.log(xhr)
    if (xhr.status == 200) {
      var data = JSON.parse(xhr.responseText);
      // console.log("handled")
      // console.log(data);
      // this.removeAllItems("devices");
      // console.log(data)
      this.deviceList = data.devices
      // console.log(this.deviceList)
      // data.devices.forEach((item: any) => this.addDevice(item));
    }
    else if (xhr.status == 401) {
      this.refreshAccessToken()
    }
    else {
      // console.log(xhr.responseText);
      // alert(xhr.responseText);
    }
  }

  refreshAccessToken() {
    this.refresh_token = localStorage.getItem("refresh_token");
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + this.refresh_token;
    body += "&client_id=" + secret.client_id;
    this.callAuthorizationApi(body);
  }

  handleCurrentlyPlayingResponse(xhr: any, firstTimeLoad: boolean) {
    // console.log(xhr)
    if (xhr.status == 200) {
      var data = JSON.parse(xhr.responseText);
      // console.log(data);
      if (data.item != null) {
        this.currentPlayingImage = data.item.album.images[2].url;

        this.currentPlayingImageUrl = data.item.album.external_urls.spotify;
        this.currentPlayingTitle = data.item.name;
        this.currentPlayingTitleUrl = data.item.album.external_urls.spotify;
        this.currentPlayingArtist = data.item.artists[0].name;
        this.currentPlayingArtistUrl = data.item.artists[0].external_urls.spotify;
        this.playPause = data.is_playing
        if (firstTimeLoad) {
          this.value = data.device.volume_percent
        }

      }


      if (data.device != null) {
        // select device
        const currentDevice = data.device.id;
        // document.getElementById('devices')!.value=currentDevice;
      }

      if (data.context != null) {
        // select playlist
        let currentPlaylist = data.context.uri;
        currentPlaylist = currentPlaylist.substring(currentPlaylist.lastIndexOf(":") + 1, currentPlaylist.length);
        // document.getElementById('playlists')!.value=currentPlaylist;
      }
    }
    else if (xhr.status == 204) {

      this.currentPlayingImage = data.item.album.images[2].url;
      this.currentPlayingImageUrl = data.item.album.external_urls.spotify;
      this.currentPlayingTitle = data.item.name;
      this.currentPlayingArtist = data.item.artists[0].name;
      this.playPause = data.is_playing
      if (firstTimeLoad) {
        this.value = data.device.volume_percent
      }
    }
    else if (xhr.status == 401) {
      this.refreshAccessToken()
    }
    else {
      // console.log(xhr.responseText);
      // alert(xhr.responseText);
    }
  }

  handleApiResponse(xhr: any, playing = true) {
    // console.log(xhr.status)
    if (xhr.status == 200) {
      // console.log(xhr.responseText);
      setTimeout(() => {
        this.currentlyPlaying(playing), 2000
      });

    }
    else if (xhr.status == 204) {
      setTimeout(() => {
        this.currentlyPlaying(playing), 2000
      });
    }
    else if (xhr.status == 401) {
      this.refreshAccessToken()
    }
    else if (xhr.status == 404) {
      // console.log(xhr.responseText)
      let alert_msg = `Play a song on Spotify App first! Then refresh this page again :)`;
      let action = "Dismiss"
      this.snackBar.open(alert_msg, action, { duration: 4500 });
      // let xhr = new XMLHttpRequest();
      // xhr.open("GET", this.DEVICES, true);
      // xhr.setRequestHeader('Content-Type', 'application/json');
      // xhr.setRequestHeader('Authorization', 'Bearer ' + this.access_token);
      // xhr.send();
      // xhr.onload = () => {
      //   if (xhr.status == 200) {
      //     var data = JSON.parse(xhr.responseText);
      //     // console.log(data)
      //     // console.log(data.devices[0].id)
      //     let dataDeviceId = data.devices[0].id
      //     console.log(dataDeviceId)
      //     let body: any = {};
      //     body.context_uri = "spotify:playlist:" + secret.user_uri;
      //     body.offset = {};
      //     body.offset.position = 1;
      //     body.position_ms = 0;
      //     this.callApi("PUT", this.PLAY + "?device_id=" + dataDeviceId, JSON.stringify(body))
    }
    else {
      // console.log(xhr.responseText)
      // alert(xhr.responseText);
    }
  }

  changeVolume() {
    this.value = 0
    return

  }

  goToLink(url: any) {
    // console.log(url)
    window.open(url, '_blank');
  }

}
