import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact.component';
import { RouteDataEnum } from '../model/route-data.enum';
import { ApplicationConfigResolver } from '../resolver/application-config.resolver';

const routes: Routes = [
  {
    path: '',
    component: ContactComponent,
    resolve: {
      [RouteDataEnum.applicationConfig]: ApplicationConfigResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactRoutingModule {}
