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
import { QuejasComponent } from './components/quejas/quejas.component';
import { CreaeditaquejaComponent } from './components/quejas/creaeditaqueja/creaeditaqueja.component';
import { MetodospagoComponent } from './components/metodospago/metodospago.component';
import { CreaeditametodospagoComponent } from './components/metodospago/creaeditametodospago/creaeditametodospago.component';
import { RastreosComponent } from './components/rastreos/rastreos.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { CreaeditareporteComponent } from './components/reportes/creaeditareporte/creaeditareporte.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { CreaeditapagosComponent } from './components/pagos/creaeditapagos/creaeditapagos.component';
import { DistribuidorComponent } from './components/distribuidor/distribuidor.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';
import { CreaeditavehiculosComponent } from './components/vehiculos/creaeditavehiculos/creaeditavehiculos.component';

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
            },
            {
                path:'quejas',
                component: QuejasComponent,
                children:[
                    {
                        path:'nuevo',
                        component: CreaeditaquejaComponent,
                    },
                    {
                        path:'ediciones/:id',
                        component: CreaeditaquejaComponent,
                    }
                ]
            },
            {
                path:'metodospago',
                component:MetodospagoComponent,
                children:[
                    {
                        path:'nuevo',
                        component:CreaeditametodospagoComponent,
                    },
                    {
                        path:'ediciones/:id',
                        component:CreaeditametodospagoComponent,
                    }
                ]
            },
            {
                path:'rastreos',
                component:RastreosComponent,
            }
        ]
    },
    {
        path:'administrador',
        component:AdministradorComponent,
        children:[
            {
                path:'roles',
                component: RolesComponent,
                children:[
                    {
                        path:'nuevo',
                        component:CreaeditarolesComponent,
                    },
                    {
                        path:'ediciones/:id',
                        component:CreaeditarolesComponent,
                    }
                ]
            },
            {
                path:'usuarios',
                component: UsuariosComponent,
                children:[
                    {
                        path:'nuevo',
                        component:CreaeditausuarioComponent,
                    },
                    {
                        path:'ediciones/:id',
                        component:CreaeditausuarioComponent,
                    },
                ]
            },
            {
                path:'controles',
                component: ControlesComponent,
                children:[
                    {
                        path:'nuevo',
                        component:CreaeditacontrolComponent,
                    },
                    {
                        path:'ediciones/:id',
                        component:CreaeditacontrolComponent,
                    }
                ]
            },
            {
                path:'reportes',
                component: ReportesComponent,
                children:[
                    {
                        path:'nuevo',
                        component: CreaeditareporteComponent,
                    },
                    {
                        path:'ediciones/:id',
                        component: CreaeditareporteComponent,
                    }
                ]
            },
            {
                path:'pagos',
                component:PagosComponent,
            }
        ]
    },
    {
        path:'distribuidor',
        component: DistribuidorComponent,
        children:[
            {
                path:'vehiculos',
                component: VehiculosComponent,
                children:[
                    {
                        path:'nuevo',
                        component: CreaeditavehiculosComponent,
                    },
                    {
                        path:'ediciones/:id',
                        component: CreaeditavehiculosComponent,
                    }
                ]
            }
        ]
    }
    
];
