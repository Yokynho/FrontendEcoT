import { RouterModule, Routes } from '@angular/router';
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
import { QuejasComponent } from './components/quejas/quejas.component';
import { CreaeditaquejaComponent } from './components/quejas/creaeditaqueja/creaeditaqueja.component';
import { MetodospagoComponent } from './components/metodospago/metodospago.component';
import { CreaeditametodospagoComponent } from './components/metodospago/creaeditametodospago/creaeditametodospago.component';
import { RastreosComponent } from './components/rastreos/rastreos.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { CreaeditareporteComponent } from './components/reportes/creaeditareporte/creaeditareporte.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { CreaeditapagosComponent } from './components/pagos/creaeditapagos/creaeditapagos.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';
import { CreaeditavehiculosComponent } from './components/vehiculos/creaeditavehiculos/creaeditavehiculos.component';
import { RutasComponent } from './components/rutas/rutas.component';
import { CreaeditarutaComponent } from './components/rutas/creaeditaruta/creaeditaruta.component';
import { CreaeditarastreoComponent } from './components/rastreos/creaeditarastreo/creaeditarastreo.component';
import { Pagos } from './models/Pagos';
import { HomeComponent } from './components/home/home.component';
import { seguridadGuard } from './guard/seguridad.guard';
import { ReportesquerysComponent } from './components/reportesquerys/reportesquerys.component';
import { TotalcotizacionesporusuarioComponent } from './components/reportesquerys/totalcotizacionesporusuario/totalcotizacionesporusuario.component';
import { ReportelotesporusuarioComponent } from './components/reportesquerys/reportelotesporusuario/reportelotesporusuario.component';
import { ReporteplacaporcantidadcargaComponent } from './components/reportesquerys/reporteplacaporcantidadcarga/reporteplacaporcantidadcarga.component';

export const routes: Routes = [
   
    {
        path:'home',
        component:HomeComponent,
        children:[
            {
                path:'cultivos',
                component: CultivosComponent,
                canActivate: [seguridadGuard],
                children:[
                    {
                        path:'nuevo',
                        component: CreaeditacultivoComponent,
                        canActivate: [seguridadGuard],

                    },
                    {
                        path:'ediciones/:id',
                        component: CreaeditacultivoComponent,
                        canActivate: [seguridadGuard],
                    }
                ],
            },
            {
                path:'cotizaciones',
                component: CotizacionesComponent,
                children:[
                    {
                        path:'nuevo',
                        component: CreaeditacotizacionesComponent,
                    },
                    {
                        path:'ediciones/:id',
                        component: CreaeditacotizacionesComponent,
                    }
                ],
                canActivate: [seguridadGuard],
            },
            {
                path:'cultivos',
                component: CultivosComponent,
                children:[
                    {
                        path:'nuevo',
                        component: CreaeditacultivoComponent,
                    },
                    {
                        path:'ediciones/:id',
                        component: CreaeditacultivoComponent,
                    }
                ],
                canActivate: [seguridadGuard],
            },
        
            {
                path:'lotes',
                component: LotesComponent,
                children:[
                    {
                        path:'nuevo',
                        component: CreaeditaloteComponent,
                    },
                    {
                        path:'ediciones/:id',
                        component: CreaeditaloteComponent,
                    }
                ],
                canActivate: [seguridadGuard],
            },
        
            {
                path:'metodospago',
                component: MetodospagoComponent,
                children:[
                    {
                        path:'nuevo',
                        component: CreaeditametodospagoComponent,
                    },
                    {
                        path:'ediciones/:id',
                        component: CreaeditametodospagoComponent,
                    }
                ],
                canActivate: [seguridadGuard],
            },
        
            {
                path:'pagos',
                component: PagosComponent,
                children:[
                    {
                        path:'nuevo',
                        component: CreaeditapagosComponent,
                    },
                    {
                        path:'ediciones/:id',
                        component: CreaeditapagosComponent,
                    }
                ],
                canActivate: [seguridadGuard],
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
                ],
                canActivate: [seguridadGuard],
            },
        
            {
                path:'rastreos',
                component: RastreosComponent,
                children:[
                    {
                        path:'nuevo',
                        component: CreaeditarastreoComponent,
                    },
                    {
                        path:'ediciones/:id',
                        component: CreaeditarastreoComponent,
                    }
                ],
                canActivate: [seguridadGuard],
            },
        
            {
                path:'soluciones',
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
                ],
                canActivate: [seguridadGuard],
            },
        
            {
                path:'roles',
                component: RolesComponent,
                children:[
                    {
                        path:'nuevo',
                        component: CreaeditarolesComponent,
                    },
                    {
                        path:'ediciones/:id',
                        component: CreaeditarolesComponent,
                    }
                ],
                canActivate: [seguridadGuard],
            },
        
            {
                path:'rutas',
                component: RutasComponent,
                children:[
                    {
                        path:'nuevo',
                        component: CreaeditarutaComponent,
                    },
                    {
                        path:'ediciones/:id',
                        component: CreaeditarutaComponent,
                    }
                ],
                canActivate: [seguridadGuard],
            },
        
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
                ],
                canActivate: [seguridadGuard],
            },
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
                canActivate: [seguridadGuard],
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
                canActivate: [seguridadGuard],
            },
            {
                path:'reportes',
                component:ReportesquerysComponent,
                canActivate: [seguridadGuard],
                children: [
                    {
                        path: 'totalcotizacionesporusuario',
                        component: TotalcotizacionesporusuarioComponent,
                        canActivate: [seguridadGuard],
                    },
                    {
                        path: 'lotesporusuario',
                        component: ReportelotesporusuarioComponent, 
                        canActivate: [seguridadGuard],
                    },
                    {
                        path: 'placaporcantidadcarga',
                        component: ReporteplacaporcantidadcargaComponent, 
                        canActivate: [seguridadGuard],
                    },
                ]
            },
        ]
    },
    
    
    

    {
        path:'login',
        component:LoginComponent,
    },
    {
        path:'signup',
        component:SignupComponent,
    },
    

    
];
