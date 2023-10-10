import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { IFile, IFolder } from 'src/app/shared/interfaces/file.interface';
import { IComponentConfig } from 'src/app/shared/interfaces/global.interface';
import { FilesService } from 'src/app/shared/services/files-service/files.service';
import { ErrorHandlerService } from 'src/app/shared/services/global-services/toast-service/toast.service';

@Component({
  selector: 'app-files-page',
  templateUrl: './storage-page.component.html',
  styleUrls: ['./storage-page.component.scss']
})
export class FilesPageComponent implements OnInit, OnDestroy {

  constructor(
    public readonly filesService: FilesService,
    private readonly errorHandlerService: ErrorHandlerService,
    private readonly modalController: ModalController,
    private readonly toastController: ToastController
  ) { }

  subscription: Subscription = new Subscription()
  files: IFile[] = []
  folders: IFolder[] = []
  path: string[] = []
  config: IComponentConfig = {
    pageName: 'allFiles',
    pageType: 'files',
    params: {
      tab: 'all',
      isSetedFilters: false,
      pageSize: 75,
      pageIndex: 0,
      sortBy: 'dateCreated',
      sortDirection: 'desc'
    }   
  }
  loadingConfig = {
    isLoading: false,
    showLoader: false
  }

  ngOnInit(): void {
    this.fetch()
  }

  fetch(config: any = {
    startLoad: true,
    showLoader: true,
    concatData: false,
    infiniteEvent: null
  }): void {
    this.loadingConfig.isLoading = config.startLoad
    this.loadingConfig.showLoader = config.showLoader
    this.subscription.add(this.filesService.fetch(this.config.params, this.path).subscribe(
      (result: {files: IFile[], folders: IFolder[]}) => {        
        if(config.concatData) {
          this.files = this.files.concat(result.files)
          this.folders = this.folders.concat(result.folders)
        } else {
          this.files = result.files
          this.folders = result.folders
        }

        if(config.infiniteEvent) {
          config.infiniteEvent.target.complete()
        }
      },
      (error: any) => this.errorHandlerService.catchError(error),
      () => {
        this.loadingConfig.isLoading = false
        this.loadingConfig.showLoader = false
      }
    ))
  }

  reloadData(event: any) {
    this.config.params = event.config.params
    const fetchParams = {
      startLoad: event?.reloadConfig?.startLoad ? true : false,
      concatData: event?.reloadConfig?.concatData ? true : false,
      showLoader: event?.reloadConfig?.showLoader ? true : false,
      infiniteEvent: event.event
    }

    this.fetch(fetchParams)    
  }

  segmentChanged(event: any): void {
    this.config.params.tab = event.detail.value
    this.fetch({
      startLoad: true,
      showLoader: false,
      concatData: false,
    })
  }

  async addItem() {

  }

  getFileSize(length: number): number {
    return +(length / 10000).toFixed(2)
  }

  // downloadItem(file: IFile) {
  //   const fileTransfer: FileTransferObject = this.transfer.create()
  //   fileTransfer.download()
  // }

  async deleteItem(event: IFile, type: 'file' | 'folder') {    
    await this.filesService.delete(event._id, type, event.filename)
    this.fetch({
      startLoad: true,
      startLoader: true,
      concatData: false,
    })

    const toast = await this.toastController.create({
      message: 'Файл успешно удалён',
      duration: 2500
    })

    toast.present()
    this.fetch()
  }

  uploadFile(event: any, file?: File, path?: string[]) {
    const formData = new FormData()
    if(file) {
      formData.append('file', file, file.name)
      this.subscription.add(this.filesService.upload(formData, 'files', path).subscribe(
        () => {
          this.fetch()
        },
        (error) => this.errorHandlerService.catchError(error)
      ))
    } else {
      const selectedFile = <File>event.target.files[0]     
      formData.append('file', selectedFile, selectedFile.name)
      this.subscription.add(this.filesService.upload(formData, 'files', this.path).subscribe(
        () => {
          this.fetch()
        },
        (error) => this.errorHandlerService.catchError(error)
      ))  
    } 
  }

  async createFolder(): Promise<void> {
    const modal = await this.modalController.create({
      component: AddFolder
    })
    
    await modal.present()

    const { data } = await modal.onWillDismiss()
    if(data) {
      const path = this.path
      path.push(data.formValue.title)
      this.uploadFile(null, data.file, path) 
      
      this.fetch({
        startLoad: true,
        showLoader: false,
        concatData: false
      })
    }    
  }

  isHasPreview(file: IFile) {
    const allowedPreview = ['image/jpeg', 'image/png'] 
    return allowedPreview.includes(file.metadata.mimetype)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}

@Component({
  selector: 'add-folder',
  templateUrl: 'dialogs/add-folder.html'
})
export class AddFolder {
  constructor(public readonly modalController: ModalController) {}

  selectedFile!: File
  folderFormGroup = new FormGroup({
    title: new FormControl(null, Validators.required)
  })

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0]
  }

  onSubmit() {
    this.modalController.dismiss({
      formValue: this.folderFormGroup.value,
      file: this.selectedFile
    })
  }
}