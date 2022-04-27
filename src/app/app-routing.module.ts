import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/albums/youshengshu',
    pathMatch: 'full'
  },
  //需要注释掉，否则点击面包屑一级菜单栏时获取到的新标签无法赋值给url，即this.router.navigateByUrl(`albums/${category.pinyin}`)不会进行路径跳转
  // {
  //   path: '**',
  //   redirectTo: '/albums/youshengshu'
  // }
  {
    path: 'album/:albumId',
    loadChildren: () => import('./pages/album/album.module').then(m => m.AlbumModule),
    data: {
      title: '专辑详情'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'//当向后导航时，滚动到以前的滚动位置。当向前导航时滚动位置设置为 [0, 0]，未来该选项是默认值
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
