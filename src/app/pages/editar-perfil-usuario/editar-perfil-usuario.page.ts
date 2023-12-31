import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { format } from 'date-fns';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { CantonesService } from 'src/app/services/cantones.service';
import { DistritosService } from 'src/app/services/distritos.service';
import { PosicionesService } from 'src/app/services/posiciones.service';
import { SeleccionarFechaPage } from '../seleccionar-fecha/seleccionar-fecha.page';
import avatarArray from '../../../assets/data/avatars.json';
import { AlertasService } from 'src/app/services/alertas.service';
import { ChangeDetectorRef } from '@angular/core'
import { EliminarCuentaPage } from '../eliminar-cuenta/eliminar-cuenta.page';
import { GestorPerfilImagenesPage } from '../gestor-perfil-imagenes/gestor-perfil-imagenes.page';
import { GestorImagenesService } from '../../services/gestor-imagenes.service';
@Component({
  selector: 'app-editar-perfil-usuario',
  templateUrl: './editar-perfil-usuario.page.html',
  styleUrls: ['./editar-perfil-usuario.page.scss'],
})
export class EditarPerfilUsuarioPage implements OnInit { 
Cod_Canton  : any
showPosicion = false;
showProvicia = false;
showCanton = false;
showDistrito = false;
imgs = avatarArray;
  private modalOpen:boolean = false;
  areaUnit =1;
  sliderOpts = {
    zoom: false,
    slidesPerView: 4,
    spaceBetween: 2,
    centeredSlides: false,
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 3,
        spaceBetween: 5
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      // when window width is >= 940px
      940: {
        slidesPerView: 3,
        spaceBetween: 40
      },

      // when window width is >= 1200px
      1300: {
        slidesPerView: 4,
        spaceBetween: 40
      }
    },
  };
    usuario = this.usuarioService.usuarioActual;
isVisible = false;
  image = 'assets/user.svg'
  ///// In functions declaration zone
  @ViewChild(IonSlides) slides: IonSlides;
  avatarSlide = {
    slidesPerView: 2.5
  }
  avatars = false;
  imgs2 = [
    {  seleccionado: false, img: '049-boy.svg'},
    {  seleccionado: false, img: '002-girl-26.svg'},
    {  seleccionado: false, img: '003-boy-14.svg'},
    {  seleccionado: false, img: '004-woman-1.svg'},
    {  seleccionado: false, img: '005-man-3.svg'},
    {  seleccionado: false, img: '006-woman.svg'},
    {  seleccionado: false, img: '007-girl-25.svg'},
    {  seleccionado: false, img: '008-girl-24.svg'},
    {  seleccionado: false, img: '009-boy-13.svg'},
    {  seleccionado: false, img: '010-girl-23.svg'},
    {  seleccionado: false, img: '011-boy-12.svg'},
    {  seleccionado: false, img: '012-girl-22.svg'},
    {  seleccionado: false, img: '013-boy-11.svg'},
    {  seleccionado: false, img: '014-boy-10.svg'},
    {  seleccionado: false, img: '015-girl-21.svg'},
    {  seleccionado: false, img: '016-girl-20.svg'},
    {  seleccionado: false, img: '017-boy-9.svg'},
    {  seleccionado: false, img: '018-boy-8.svg'},
    {  seleccionado: false, img:  '019-girl-19.svg'},
    {  seleccionado: false, img:  '020-boy-7.svg'},
    {  seleccionado: false, img: '021-boy-6.svg'},
    {  seleccionado: false, img: '022-boy-5.svg'},
    {  seleccionado: false, img:  '023-girl-18.svg'},
    {  seleccionado: false, img:  '024-boy-4.svg'},
    {  seleccionado: false, img: '025-girl-17.svg'},
    {  seleccionado: false, img: '026-girl-16.svg'},
    {  seleccionado: false, img: '027-hipster.svg'},
    {  seleccionado: false, img: '028-girl-15.svg'},
    {  seleccionado: false, img: '029-girl-14.svg'},
    {  seleccionado: false, img: '030-girl-13.svg'},
    {  seleccionado: false, img: '031-boy-3.svg'},
    {  seleccionado: false, img: '032-girl-12.svg'},
    {  seleccionado: false, img: '033-man-2.svg'},
    {  seleccionado: false, img: '034-girl-11.svg'},
    {  seleccionado: false, img: '035-girl-10.svg'},
    {  seleccionado: false, img: '036-girl-9.svg'},
    {  seleccionado: false, img: '037-girl-8.svg'},
    {  seleccionado: false, img: '038-man-1.svg'},
    {  seleccionado: false, img: '039-girl-7.svg'},
    {  seleccionado: false, img:  '040-man.svg'},
    {  seleccionado: false, img:  '041-girl-6.svg'},
    {  seleccionado: false, img: '042-girl-5.svg'},
    {  seleccionado: false, img: '043-girl-4.svg'},
    {  seleccionado: false, img:  '044-boy-2.svg'},
    {  seleccionado: false, img:  '045-girl-3.svg'},
    {  seleccionado: false, img: '046-girl-2.svg'},
    {  seleccionado: false, img: '047-boy-1.svg'},
    {  seleccionado: false, img: '048-girl-1.svg'},
    {  seleccionado: false, img:'001-boy-15.svg'},
    {  seleccionado: false, img: '050-girl.svg'}
    
    
    
    ]
  constructor(
    
    public modalCtrl: ModalController,
    public usuarioService: UsuariosService,
    public provinciasService: ProvinciasService,
    public cantonesService: CantonesService,
    public distritosService: DistritosService,
    public posicionesService: PosicionesService,
    public userService: UsuariosService,
    public alertasService: AlertasService,
    public cdr: ChangeDetectorRef,
    public gestorImagenesService: GestorImagenesService
    ) {



     }
   

    ngOnInit() {

  this.posicionesService.posiciones = [];
   this.posicionesService.syncPosicionesToPromise().then(resp =>{
  this.showPosicion = true;
 this.usuario.usuario.Cod_Posicion = this.usuarioService.usuarioActual.usuario.Cod_Posicion;
this.posicionesService.posiciones  = resp;

   });


   this.provinciasService.provincias = [];
      this.provinciasService.syncProvinciasPromise().then(resp =>{
        this.provinciasService.provincias = resp
this.showProvicia = true;
this.usuario.usuario.Cod_Provincia = this.usuarioService.usuarioActual.usuario.Cod_Provincia
      })
  
      this.usuario.usuario.Cod_Provincia = this.usuarioService.usuarioActual.usuario.Cod_Provincia


      if(this.usuario.usuario.Cod_Provincia){
        this.cantonesService.syncCantones(this.usuario.usuario.Cod_Provincia).then(resp =>{
      this.showCanton = true;
      this.showDistrito = null;
      this.cantonesService.cantones = resp.slice(0);
      this.alertasService.loadingDissmiss();
      this.usuario.usuario.Cod_Canton = this.usuarioService.usuarioActual.usuario.Cod_Canton

      if(this.usuario.usuario.Cod_Provincia && this.usuario.usuario.Cod_Canton){
        this.distritosService.syncDistritos(this.usuario.usuario.Cod_Canton).then(resp =>{
          this.distritosService.distritos = resp.slice(0);
          this.showDistrito = true;
          this.alertasService.loadingDissmiss();
          this.usuario.usuario.Cod_Distrito = this.usuarioService.usuarioActual.usuario.Cod_Distrito
        });
      
        }


      
        })


  


       }else{
        this.alertasService.loadingDissmiss();
       }

  }

  avatar(){
    this.avatars = !this.avatars

  }


  async  gestorPerfilImagenes(){

    const modal = await this.modalCtrl.create({
      component: GestorPerfilImagenesPage,
      cssClass:'alert-modal',
      swipeToClose: false,
      mode:'ios',
    });
  
    
     await modal.present();
     const { data } = await modal.onWillDismiss();
  
     
    
   this.cdr.detectChanges();
  }


  slideChange(event){
    let currentIndex = this.slides.getActiveIndex().then(resp =>{
      this.imgs.forEach(av => av.seleccionado = false);
      this.imgs[resp].seleccionado = true;
      this.image = this.imgs[resp].img
      this.usuario.usuario.Foto = this.imgs[resp].img;
      this.usuario.usuario.Avatar = true;
      this.usuarioService.usuarioActual.usuario.Avatar = true;
      this.usuarioService.usuarioActual.usuario.Foto =  this.imgs[resp].img;

//      this.gestorImagenesService.actualizaFotoUsuario(this.usuario.Cod_Usuario, this.usuario.Avatar, this.usuario.Foto); 

  
    })
 
  }


  updateUser(){
    
  //  if(fActualizar.invalid) {return;}
 
    this.modalCtrl.dismiss({'data':true}, null, 'perfil-usuario')
    console.log(this.usuario, this.usuario.usuario.Cod_Posicion, 'Cod_Posicion')
    this.usuario.usuario.Cod_Pais = this.usuario.usuario.Pais == 'CR' ? '+506' : '+1';
    this.usuarioService.actualizarUsuario(this.usuario.usuario, this.usuario.usuario.Cod_Usuario)

  }
  imageUpload2(source:string){
   
    let fileName = this.userService.usuarioActual.usuario.Foto
    let location = 'perfil-usuario';
/**
 *        this.gestorImagenesService.selectImage(source,fileName,location, false).then(resp =>{
this.usuario.Foto = resp
this.usuario.Avatar = false;
this.gestorImagenesService.actualizaFotoUsuario(this.usuario.Cod_Usuario, this.usuario.Avatar, this.usuario.Foto);    
     this.cdr.detectChanges();



       })
 */
      
  }
  syncProvincias(){
    this.provinciasService.syncProvincias();
  }

  seleccionarAvatar(img, i){
  

    this.imgs.forEach(av => av.seleccionado = false);
    img.seleccionado = true;
    this.image = this.imgs[i].img;
    this.usuario.usuario.Foto =  this.imgs[i].img;
    this.usuario.usuario.Avatar = true;
    this.usuarioService.usuarioActual.usuario.Avatar = true;
    this.usuarioService.usuarioActual.usuario.Foto =   this.image;

   // this.gestorImagenesService.actualizaFotoUsuario(this.usuario.Cod_Usuario, this.usuario.Avatar, this.usuario.Foto); 
 
    }




    regresar(){

    this.modalCtrl.dismiss( )
  }

  async SelectDate(){
    if (!this.modalOpen){
      this.modalOpen = true;
      const modal = await this.modalCtrl.create({
        component:SeleccionarFechaPage,
        cssClass:'date-modal',
     breakpoints: [0, 0.3, 0.5, 0.8],
     initialBreakpoint: 0.5,
        componentProps:{
          title:'Fecha de nacimiento',
          id: 'seleccionar-fecha',
          fecha: new Date(this.usuarioService.usuarioActual.usuario.Fecha_Nacimiento.replace('-','/'))
        },
        id: 'seleccionar-fecha'
      })
    
      await modal.present();
      const { data } = await modal.onWillDismiss();
   
      if(data !== undefined ){
        console.log(data,'data')
        this.usuario.usuario.Fecha_Nacimiento = format(data.date,'yyyy/MM/dd')
            this.modalOpen = false;
      }else{
   
             this.modalOpen = false;
      }
      
    }
  
    
  }


  onChangeProvincias($event){
    this.alertasService.presentaLoading('Cargando datos...')
    this.usuario.usuario.Cod_Provincia = $event.target.value;
    this.usuario.usuario.Cod_Canton = null;
    this.usuario.usuario.Cod_Distrito = null;
    this.cantonesService.cantones = [];
    this.distritosService.distritos = [];
 if(this.usuario.usuario.Cod_Provincia){
  this.cantonesService.syncCantones(this.usuario.usuario.Cod_Provincia).then(resp =>{
this.showCanton = true;
this.showDistrito = null;
this.cantonesService.cantones = resp.slice(0);
this.alertasService.loadingDissmiss();
  })
 }else{
  this.alertasService.loadingDissmiss();
 }
  }
  onChangeCantones($event){
    this.alertasService.presentaLoading('Cargando datos...')
    this.usuario.usuario.Cod_Canton = $event.target.value;
    this.usuario.usuario.Cod_Distrito = null;
    this.distritosService.distritos = [];
if(this.usuario.usuario.Cod_Provincia && this.usuario.usuario.Cod_Canton){
  this.distritosService.syncDistritos(this.usuario.usuario.Cod_Canton).then(resp =>{
    this.distritosService.distritos = resp.slice(0);
    this.showDistrito = true;
    this.alertasService.loadingDissmiss();
    
  })
}else{
  this.alertasService.loadingDissmiss();
}

  }

  onChangeDistritos($event){

    this.usuario.usuario.Cod_Distrito = $event.target.value;

  }

  async eliminarCuenta(){

    let modal = await this.modalCtrl.create({
      component:EliminarCuentaPage,
      cssClass:'medium-modal',
    })



     await modal.present();

     const { data } = await modal.onWillDismiss();
   
     if(data !== undefined ){

      this.regresar();
     }
  }
  
}