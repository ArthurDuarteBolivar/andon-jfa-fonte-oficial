import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Nodemcu } from '../model/nodemcu';

@Injectable({
  providedIn: 'root'
})
export class SheetsService {

  constructor(private http:HttpClient) { }


  submitForm(nodemcuUpdates: Nodemcu, isValorFinal: boolean): Observable<any> {
    
    let url: string = "";
    var data: Date = new Date();
    switch (nodemcuUpdates.nameId.name) {
      case "010": //20
        url = "https://docs.google.com/forms/d/e/1FAIpQLSfgXmOnvShKXQhG3vytTycyuVahZoRk1QgcO8blrUEjM4NUdw/formResponse";
        break;
      case "020": //21
        url = "https://docs.google.com/forms/d/e/1FAIpQLSdppsZOForGMVxygysxEbTximi3nWUPGF4N48iIo7tiANdlBg/formResponse";
        break;
      case "030": //22
        url = "https://docs.google.com/forms/d/e/1FAIpQLScgavZVKh0jUd5asvPUmImuJPFsIDUJNWm7lZyGMgbxSJxJGA/formResponse";
        break;
      case "040": //23
        url = "https://docs.google.com/forms/d/e/1FAIpQLSfn0Q94QIkKAa5hPrkgPX6SgRiJTAo_otIz-_jJrnq5knsA1Q/formResponse";
        break;
      case "050": //24
        url = "https://docs.google.com/forms/d/e/1FAIpQLSdb9i_sGA8hNHbNyK5X_EUbFNgfDvOzWIjdATmBWpDNg2b9uQ/formResponse";
        break;
      case "060": //25
        url = "https://docs.google.com/forms/d/e/1FAIpQLScy9TkxrXEIM8KuPZ3wIDE7jRMH8OO1aUtm-4Tc4vCqPKfAPg/formResponse";
        break;
      case "070": //26
        url = "https://docs.google.com/forms/d/e/1FAIpQLSdwstwIN3vB28FPBm62kldjNNJ3Tz6ti41l4McImEQrIavScA/formResponse";
        break;
      case "080": //27
        url = "https://docs.google.com/forms/d/e/1FAIpQLSc4FYj6HluZ3D-qvF_AdF_55kIkah1a6qEA3v66aXdxyx1T0A/formResponse";
        break;
      case "090": //28
        url = "https://docs.google.com/forms/d/e/1FAIpQLSf7P4NBMap6SOtYWRMLmtmieYKAxeEKh-d4-hr-zejheQrnpw/formResponse";
        break;
      case "100": //29
        url = "https://docs.google.com/forms/d/e/1FAIpQLSfAm9ihO8iafFaddrUR3wbEP_CwUqQqH1remIZI1uaFt-uAJA/formResponse";
        break;
      case "110": //30
        url = "https://docs.google.com/forms/d/e/1FAIpQLSeZXhvuK_szAvIFcQcefUIjBKqdVp1ZVoA_2wzw1HRZaXySIg/formResponse";
        break;
      case "120": //31
        url = "https://docs.google.com/forms/d/e/1FAIpQLSc9P9aUpiP2YvYZ399fVFxTk-vX3GM5qozimxnEoHOT8ocLxw/formResponse";
        break;
      case "130": //32
        url = "https://docs.google.com/forms/d/e/1FAIpQLSdB1jqHzegDpKgnFcRn7aNZZI3T03bVW0u4pYOEwGXTbSsxSg/formResponse";
        break;
      case "140": //33
        url = "https://docs.google.com/forms/d/e/1FAIpQLSc2nUxq6gMna1lFdUz-nYXJp6SYLn3f6pRVTFfwj4ZrXhXNbQ/formResponse";
        break;
      case "150": //34
        url = "https://docs.google.com/forms/d/e/1FAIpQLScmYNQOJipUqcKd9I4SfH0WnoGlbPbp_t1CVyYNDuN9Vn8p7A/formResponse";
        break;
      case "160": //35
        url = "https://docs.google.com/forms/d/e/1FAIpQLSf-e_Itg6t6cVxp7rZTmDefP4iwI1DYKgT2KmfDAYgKzMNnMQ/formResponse";
        break;
      default:
        break;
    }
    
    var downTime;
    if(isValorFinal){
     downTime =  "VALOR FINAL"; 
    }else{
      downTime = "";
    }
    
    if(nodemcuUpdates.count >= 0){
      const params = new URLSearchParams();
      params.set('ifq', '');
      params.set('entry.290312375', nodemcuUpdates.count.toString());
      params.set('entry.2046558341', nodemcuUpdates.maintenance.toString());
      params.set('entry.1719580299', '');
      params.set('entry.1567371503', downTime);
      
      const fullUrl = `${url}?${params.toString()}`;
      
      return this.http.get(fullUrl);
    }
    return of("");
  }
}
