import { Routes } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CreaeditausuarioComponent } from './components/usuarios/creaeditausuario/creaeditausuario.component';
import { ControlesComponent } from './components/controles/controles.component';
import { CreaeditacontrolComponent } from './components/controles/creaeditacontrol/creaeditacontrol.component';

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
];
