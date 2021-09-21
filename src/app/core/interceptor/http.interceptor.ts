import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, retry, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { LoaderService } from '../services/loader.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];
    requestCount=0;
    isSessionOut:boolean;
    constructor(
        public router: Router,
    ) { }

    /** Request interceptor **/
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let lastResponse: HttpEvent<any>;
        let error: HttpErrorResponse;
        // if (this.authUserService.isAuthenticated()) {
        //     const token = this.authUserService.getUserDetails('token');
        //     req = req.clone({ headers: req.headers.set('authorization', token) });
        // }
        this.startRequest();
        this.requests.push(req);
        return next.handle(req).pipe(
            tap((event: HttpEvent<any>) => {
                // console.log("event", event, typeof (event));

                if (event instanceof HttpResponse) {
                    this.removeRequest(req);
                    if (event && event.body.statusCode == 401) {
                        // this.router.navigate(['/login']);
                    }
                } else {
                    // console.log(event);
                }
            },
                (err: any) => {
                    this.removeRequest(req);
                    if (err instanceof HttpErrorResponse) {
                        const error = err.error;
                        //console.log(error);
                    //     if(!error?.ProgressEvent?.loaded){
                    //     this.alertService.errorToast("Network Error");
                    // }

                        if (error.statusCode === 401) {
                            // this.router.navigate(['/login']);
                        }
                        // else if (error.statusCode === 401 || error.statusCode === 500) {

                        // }
                    }
                }),
                finalize(()=>{
                    if (lastResponse?.type === HttpEventType.Sent && !error) {
                        // last response type was 0, and we haven't received an error
                        this.removeRequest(req);
                        console.log('aborted request');
                      }
                })
        );
    }
    /** Remove request **/
    removeRequest(req: HttpRequest<any>) {
        this.endRequest();
        const i = this.requests.indexOf(req);
        this.requests.splice(i, 1);
    }
    startRequest(): void {
        // If this is the first request,start the spinner
        if (this.requestCount == 0) {
        }
        
        this.requestCount++;
    }

    endRequest(): void {
            if (this.requestCount == 0){
            return;
            }
    
            this.requestCount--;
    
            if (this.requestCount == 0) {
                this.isSessionOut=false;
            } 
                 
    }
}