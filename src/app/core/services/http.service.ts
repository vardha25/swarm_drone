

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = 'http://10.42.0.1:5000';
  baseUrl1='http://10.42.0.49:5000';
  baseUrl2='http://10.42.0.181:5000';
  headers = new HttpHeaders({
  });

  constructor(
    private http: HttpClient
  ) { }


  getData(url: string, data?: any, backGroundUrl?: boolean): Observable<any> {
    let searchParams = new HttpParams();
    for (const key in data) {
      searchParams = searchParams.append(key, data[key]);
    }

    const apiUrl = `${this.baseUrl}${url}`;
    if (backGroundUrl) {
      // this.loaderServcie.backGroundUrls.push(apiUrl);
    }
    return this.http.get(apiUrl, { params: searchParams })
      .pipe(map((response: any) => {
        return response;
      }));
  }

  getDataByIP(ip,url: string, data?: any, backGroundUrl?: boolean): Observable<any> {
    let searchParams = new HttpParams();
    for (const key in data) {
      searchParams = searchParams.append(key, data[key]);
    }

    const apiUrl = `${ip}${url}`;
    if (backGroundUrl) {
      // this.loaderServcie.backGroundUrls.push(apiUrl);
    }
    return this.http.get(apiUrl, { params: searchParams })
      .pipe(map((response: any) => {
        return response;
      }));
  }

  get(url: string, data?: any, backGroundUrl?: boolean): Observable<any> {
    let searchParams = new HttpParams();
    for (const key in data) {
      searchParams = searchParams.append(key, data[key]);
    }

    const apiUrl = url;
    if (backGroundUrl) {
      // this.loaderServcie.backGroundUrls.push(apiUrl);
    }
    return this.http.get(apiUrl, { params: searchParams })
      .pipe(map((response: any) => {
        return response;
      }));
  }

  postData(url: string, data: any, formData?: boolean) {
    const apiUrl = `${this.baseUrl}${url}`;
    const postData = !formData ? data : this.appendFormData(data);
    return this.http.post(apiUrl, postData, { headers: this.headers })
      .pipe(map((response: any) => {
        return response;
      }));
  } 
  
  postsvlData(ip,url: string, data: any, formData?: boolean) {
    const apiUrl = `${ip}${url}`;
    const postData = !formData ? data : this.appendFormData(data);
    return this.http.post(apiUrl, postData, { headers: this.headers })
      .pipe(map((response: any) => {
        return response;
      }));
  }

  putData(url: string, data: any, formData?: boolean) {
    const apiUrl = `${this.baseUrl}${url}`;
    const postData = !formData ? data : this.appendFormData(data);
    return this.http.put(apiUrl, postData)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  patchData(url: string, data: any, formData?: boolean) {
    const apiUrl = `${this.baseUrl}${url}`;
    const postData = !formData ? data : this.appendFormData(data);
    return this.http.patch(apiUrl, postData)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  deleteData(url: string, data?: any, formData?: boolean) {
    const apiUrl = `${this.baseUrl}${url}`;
    // const postData = !formData ? data : this.appendFormData(data);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: formData
    };
    return this.http.delete(apiUrl, options)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  getFile(url: string, data?: any, backGroundUrl?: boolean){
    const apiUrl = `${this.baseUrl}${url}`;
    return this.http.get(apiUrl,{responseType:'blob'});
  }

  appendFormData(myFormData: { [x: string]: any; }): FormData {
    const fd = new FormData();
    for (const key in myFormData) {
      if (myFormData[key]) {
        fd.append(key, myFormData[key]);
      }
    }
    return fd;
  }
}
