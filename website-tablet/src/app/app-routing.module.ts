import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './pages/counter/counter.component';
import { AppComponent } from './app.component';
import { ErrorRouterComponent } from './pages/error-router/error-router.component';
import { QrcodeCounterComponent } from './pages/qrcode-counter/qrcode-counter.component';

const routes: Routes = [
  { path: 'counter/:name', component: CounterComponent },
  { path: 'qrcode/:name', component: QrcodeCounterComponent },
  { path: 'error', component: ErrorRouterComponent },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
