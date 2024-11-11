import { Routes } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CreaeditausuarioComponent } from './components/usuarios/creaeditausuario/creaeditausuario.component';
import { ControlesComponent } from './components/controles/controles.component';
import { CreaeditacontrolComponent } from './components/controles/creaeditacontrol/creaeditacontrol.component';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

import { CultivosComponent } from './components/cultivos/cultivos.component';
import { CreaeditacultivoComponent } from './components/cultivos/creaeditacultivo/creaeditacultivo.component';
import { LotesComponent } from './components/lotes/lotes.component';
import { CreaeditaloteComponent } from './components/lotes/creaeditalote/creaeditalote.component';
import { CreaeditacotizacionesComponent } from './components/cotizaciones/creaeditacotizaciones/creaeditacotizaciones.component';
import { RolesComponent } from './components/roles/roles.component';
import { CreaeditarolesComponent } from './components/roles/creaeditaroles/creaeditaroles.component';
import { CotizacionesComponent } from './components/cotizaciones/cotizaciones.component';
import { AgricultorComponent } from './components/agricultor/agricultor.component';

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
        path:'login',
        component:LoginComponent,
    },
    {
        path:'signup',
        component:SignupComponent,
    },
    {
        path:'agricultor',
        component:AgricultorComponent,
        children:[
            {
                path:'cultivos',
                component:CultivosComponent,
                children:[
                    {
                        path:'nuevo',
                        component:CreaeditacultivoComponent,
                    },
                    {
                        path:'ediciones/:id', component:CreaeditacultivoComponent,
                    }
                ]
            },
            {
                path:'lotes',
                component:LotesComponent,
                children:[
                    {
                        path:'nuevo',
                        component:CreaeditaloteComponent,
                    },
                    {
                        path:'ediciones/:id', component:CreaeditaloteComponent,
                    }
                ]
            }
        ]
    }
    
];
