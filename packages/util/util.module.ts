import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelloComponent } from './src/hello/hello.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HelloComponent],
  exports: [HelloComponent]
})
export class ZJMYUtilModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ZJMYUtilModule
    };
  }
}
