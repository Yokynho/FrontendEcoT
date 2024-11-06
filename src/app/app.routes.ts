import { Routes } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CreaeditausuarioComponent } from './components/usuarios/creaeditausuario/creaeditausuario.component';
import { ControlesComponent } from './components/controles/controles.component';
import { CreaeditacontrolComponent } from './components/controles/creaeditacontrol/creaeditacontrol.component';
import { CultivosComponent } from './components/cultivos/cultivos.component';
import { CreaeditacultivoComponent } from './components/cultivos/creaeditacultivo/creaeditacultivo.component';
import { LotesComponent } from './components/lotes/lotes.component';
import { CreaeditaloteComponent } from './components/lotes/creaeditalote/creaeditalote.component';
import { CreaeditacotizacionesComponent } from './components/cotizaciones/creaeditacotizaciones/creaeditacotizaciones.component';
import { RolesComponent } from './components/roles/roles.component';
import { CreaeditarolesComponent } from './components/roles/creaeditaroles/creaeditaroles.component';
export const routes: Routes = [
    {
        path:'usuarios',
        component:UsuariosComponent,
        children:[
            {
                path:'nuevo',
                component: CreaeditausuarioComponent,
            },
            {
                path:'ediciones/:id', component: CreaeditausuarioComponent,
            },
        ],
    },
    {
        path:'controles',
        component:ControlesComponent,
        children:[
            {
                path:'nuevo',
                component:CreaeditacontrolComponent,
            },
            {
                path:'ediciones/:id', component:CreaeditacontrolComponent,
            },
        ],
    },
    
    {

        path: 'cultivos',component: CultivosComponent,
        children: [
          {
            path: 'nuevo',
            component: CreaeditacultivoComponent,
          },
          {
            path:'ediciones/:id', component:CreaeditacultivoComponent,
        },
        ],
  
      },
      {
  
        path: 'lotes',component: LotesComponent,
        children: [
          {
            path: 'nuevo',
            component: CreaeditaloteComponent,
          },
          {
            path:'ediciones/:id', component:CreaeditaloteComponent,
        },
        ],
      },
      {
        path:'cotizaciones',
        component: CotizacionesComponent,
        children:[
            {
                path:'nuevo',
                component:CreaeditacotizacionesComponent,
            },
            {
                path:'ediciones/:id',component:CreaeditacotizacionesComponent,
            },
        ],
    },
    {
        path:'roles',component:RolesComponent,
        children:[
            {
                path:'nuevo',
                component:CreaeditarolesComponent,
            },
            {        
                path:'ediciones/:id', component:CreaeditarolesComponent,
            },
        ],
        
    }
];
