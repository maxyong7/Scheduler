import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { timeInterface, timeSlotInterface, keywordTypes } from 'src/app/timeinterface';
import { map, filter, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import * as secret from 'secrets';

declare const Buffer: any
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TimelistService {
  // private apiUrl = 'http://localhost:5000'
  private apiUrl = 'https://07ilrb9rd1.execute-api.us-east-1.amazonaws.com/live'
  private apiUrlWeather = 'https://geolocation-db.com/json'
  constructor(private http: HttpClient) { }
  public subject = new Subject<any>()
  public addSubject = new Subject<any>()
  public addOnSubject = new Subject<any>()
  public subjectDetail = new Subject<any>()

  public subjectEdit = new Subject<any>()
  private editMode: boolean = false

  TOKEN: string = "https://accounts.spotify.com/api/token";
  client_id = secret.client_id
  client_secret = secret.client_secret;

  // localArray: any
  // tsInterface!: timeSlotInterface[]




  getTime(keyword: keywordTypes): Observable<timeInterface[] | timeSlotInterface[]> {
    const url = `${this.apiUrl}/${keyword}`
    // let timeArray = this.http.get<timeInterface[] | timeSlotInterface[]>(url)
    // timeArray.subscribe((value) => {
    //   this.localArray = value
    //   if (typeof this.localArray === typeof this.tsInterface) {
    //     console.log("Local Array")
    //     console.log(this.localArray)
    //     localStorage.setItem("timeSlotList", JSON.stringify(this.localArray))
    //   }
    //   else {
    //     console.log("Type of value:")
    //     console.log(typeof this.localArray)
    //   }

    // })
    return this.http.get<timeInterface[] | timeSlotInterface[]>(url)

  }

  getTimeSlot(time: string): Observable<timeSlotInterface[]> {
    const url = `${this.apiUrl}/${keywordTypes.timeslotsItem}?${keywordTypes.time1}=${time}`
    return this.http.get<timeSlotInterface[]>(url)
  }

  updateTime(data: timeSlotInterface): Observable<timeSlotInterface> {
    const url = `${this.apiUrl}/${keywordTypes.timeslotsItem}/${data.id}`
    return this.http.put<timeSlotInterface>(url, data, httpOptions)
  }


  // //Does not update at all
  // updateTime(data: timeSlotInterface): Observable<any> {
  //   const url = `${this.apiUrl}/${keywordTypes.timeslotsItem}/${data.id}`
  //   return this.http.get<timeSlotInterface>(url)
  // }

  deleteTime(time: timeSlotInterface) {
    const url = `${this.apiUrl}/${keywordTypes.timeslotsItem}/${time.id}`
    // console.log(time)
    // console.log(url)
    return this.http.delete<timeSlotInterface>(url)
  }

  toggleRefresh(data?: timeInterface[]) {
    // console.log("toggled")
    // console.log(data)
    // this.getTime(keywordTypes.timeslotsItem).subscribe((value) => (refreshList = value));
    this.subject.next(data)
  }

  onRefresh(): Observable<any> {
    return this.subject.asObservable()
  }

  // toggleAdd(newItem: any) {
  //   console.log("toggleAdded")
  //   console.log(newItem)
  //   this.addSubject.next(newItem)
  // }

  // onAdd(): Observable<any> {
  //   return this.addSubject.asObservable()
  // }

  addTime(data: timeSlotInterface): Observable<timeSlotInterface> {
    const url = `${this.apiUrl}/${keywordTypes.timeslotsItem}`
    // console.log(url)
    return this.http.post<timeSlotInterface>(url, data, httpOptions)
  }


  sendItemAddOn(itemAddOn: any) {
    // console.log(itemAddOn)
    this.addOnSubject.next(itemAddOn)
  }

  getItemAddOn() {
    return this.addOnSubject.asObservable()
  }

  // toggleDelete(): void {
  //   this.getTime(keyword).subscribe((value) => this.refreshList = value)
  //   this.subject.next(this.refreshList)
  // }
  // OnDelete(): Observable<any> {
  //   return this.subject.asObservable()
  // }

  callAuthorizationApi(code: any, redirect_uri: any) {
    var form = {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    }
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Authorization': 'Basic ' + btoa(secret.client_id + ':' + secret.client_secret)
    //   })
    // }

    const buff = Buffer.from(
      secret.client_id + ":" + secret.client_secret
    ).toString("base64")
    const httpOptions2 = { headers: new HttpHeaders({ 'Authorization': 'Basic ' + btoa(secret.client_id + ':' + secret.client_secret) }) }
    // console.log("calling")
    // console.log(this.TOKEN)
    // console.log(form)
    // console.log(httpOptions)

    return this.http.post(this.TOKEN, form, httpOptions2)
  }

  // getToken() {
  //   let params = ('grant_type=client_credentials');
  //   let client_id = secret.client_id; // Your client id
  //   let client_secret = secret.client_secret; // Your secret
  //   let encoded = btoa(client_id + ':' + client_secret);
  //   let headers = new HttpHeaders();
  //   headers.append('Authorization', 'Basic ' + encoded);
  //   headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //   let uurl = 'https://accounts.spotify.com/api/token';

  //   return this.http.post(uurl, params, { headers: headers })
  //     .pipe(map(res => {
  //       let data = res
  //       return data;
  //     }));
  // }

  getToken(code: any, redirect_uri: any) {

    // console.log("gettingtoken")
    let params = ('grant_type=authorization_code');
    var form = {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirect_uri,
    }
    let client_id = secret.client_id; // Your client id
    let client_secret = secret.client_secret; // Your secret
    let encoded = btoa(client_id + ':' + client_secret).toString();
    let headers = new HttpHeaders();
    headers.append('Authorization', 'Basic ' + encoded);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let uurl = 'https://accounts.spotify.com/api/token';

    // return this.http.post(uurl, form, { headers: headers })
    //   .pipe(map(res => {
    //     let data = res
    //     return data;
    //   }));

    return this.http.post(uurl, {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirect_uri,
    }, { headers: headers })
  }


  authorizedSpotify() {
    return !!localStorage.getItem('access_token')
  }



  toggleDetail(data: any) {
    // console.log("toggled detail")
    // console.log(data)
    // this.getTime(keywordTypes.timeslotsItem).subscribe((value) => (refreshList = value));
    this.subjectDetail.next(data)
  }

  onGetDetail(): Observable<any> {
    return this.subjectDetail.asObservable()
  }

  toggleEdit(value: boolean): void {
    this.editMode = value
    // this.getTime(keywordTypes.timeslotsItem).subscribe((value) => (refreshList = value));
    this.subjectEdit.next(this.editMode)
  }

  onGetEdit(): Observable<any> {
    return this.subjectEdit.asObservable()
  }

  toggleAdd(value: boolean) {
    // console.log("toggleAdded")
    this.addSubject.next(value)
  }

  onAdd(): Observable<any> {
    return this.addSubject.asObservable()
  }

  getLocation(): Observable<any> {
    const url = `${this.apiUrlWeather}/${secret.geolocationApi}`
    return this.http.get<any>(url)
  }

}
