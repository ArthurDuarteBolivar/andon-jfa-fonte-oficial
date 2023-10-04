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
        url = "https://docs.google.com/forms/d/e/1FAIpQLSfE90T3InfAGryyBGoUkcr4bA5v-Rjmkngr88pcWxnQPKYhcg/formResponse";
        break;
      case "020": //21
        url = "https://docs.google.com/forms/d/e/1FAIpQLSepI1Vl4UURfB_PneguFSYqNRIAn56HZXf-24qyqXXV7iKMIw/formResponse";
        break;
        case "030": //22
        url = "https://docs.google.com/forms/d/e/1FAIpQLSemvziIUhC8A3mH4880NwX1ZsHLac_cc1XJifc4Yy268twmVQ/formResponse";
        break;
      case "040": //23
        url = "https://docs.google.com/forms/d/e/1FAIpQLSdu3aXNXa5KcBv-ydADOv4PF4DzxtWcHSCwO9TkNd5oupHAig/formResponse";
        break;
      case "050": //24
        url = "https://docs.google.com/forms/d/e/1FAIpQLSe4or02XBPk5533dzgYOQc-fMleyUR_SFuG2QD8Wa8QL5m4Og/formResponse";
        break;
      case "060": //25
        url = "https://docs.google.com/forms/d/e/1FAIpQLSfUERSDvz9JchENvYXRlfVscvVygVsrGvValftt3AjLur-lVA/formResponse";
        break;
      case "070": //26
        url = "https://docs.google.com/forms/d/e/1FAIpQLSd7cW12ds5i0vbphpz-m5Db4zgQUhRrp4L_hDUMvcVq_0UBkA/formResponse";
        break;
      case "080": //27
        url = "https://docs.google.com/forms/d/e/1FAIpQLSdaMbbzWOrIKS5myZ3SmC05iVdFYyn9cHxPMeg5GugOK-KEiA/formResponse";
        break;
      case "090": //28
        url = "https://docs.google.com/forms/d/e/1FAIpQLSe5c7gYVqnNEMr68W4-LgXHGRccYnPdQn_9PG4aTy--4vuZ6Q/formResponse";
        break;
      case "100": //29
        url = "https://docs.google.com/forms/d/e/1FAIpQLSeQo9HuNavrsQbIXs6gZIK56C-yRQMEMGxkakE6821ApZQxSg/formResponse";
        break;
      case "110": //30
        url = "https://docs.google.com/forms/d/e/1FAIpQLSc-N2qJ9OiOKJMACIQaI8AdVUVQ5eBQkVP6dZF3oUX6-7s64Q/formResponse";
        break;
      case "120": //31
        url = "https://docs.google.com/forms/d/e/1FAIpQLScsOZMSIuOSWPoJm4guvFjz8mLZn5givzpn_RdKAJZEEcB1vQ/formResponse";
        break;
      case "130": //32
        url = "https://docs.google.com/forms/d/e/1FAIpQLSfOr5NElroOPmHpsb58si9pBCg6jqeb76qXFqYVfZOg5F9xQw/formResponse";
        break;
      case "140": //33
        url = "https://docs.google.com/forms/d/e/1FAIpQLSe0eIlUOpLsExBjJ1AWXs2n4Yk2oE9JnqPuhOJfzXC6LlmMZw/formResponse";
        break;
      case "150": //34
        url = "https://docs.google.com/forms/d/e/1FAIpQLSdqz5NFBGo8ESzyMvHAxu4wTiHcE_BO1xYvZ9Hx3fcjhcG4bA/formResponse";
        break;
      case "160": //35
        url = "https://docs.google.com/forms/d/e/1FAIpQLScWTAS40h6VBF82NBQlMsEEuNX9k4nVU0pfCY5LlHiBM0Ds2w/formResponse";
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
    console.log(downTime)
    if(nodemcuUpdates.count >= 0){
      const params = new URLSearchParams();
      params.set('ifq', '');
      params.set('entry.1539816157', nodemcuUpdates.count.toString());
      params.set('entry.170581986', nodemcuUpdates.maintenance.toString());
      params.set('entry.526514586', '');
      params.set('entry.1170934882', downTime);
      
      const fullUrl = `${url}?${params.toString()}`;
      console.log(fullUrl);
      return this.http.get(fullUrl);
    }
    return of("");
  }
}
