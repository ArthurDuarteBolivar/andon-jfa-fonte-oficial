import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './pages/counter/counter.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: "counter/:name", component: CounterComponent },
  {path: "**", redirectTo: "counter/010"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
