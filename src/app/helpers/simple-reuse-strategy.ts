import {ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy} from '@angular/router';

/**
 * 路由复用策略。Angular实现多标签页效果(路由重用)
 * https://www.cnblogs.com/lslgg/p/7700888.html
 */
export class SimpleReuseStrategy implements RouteReuseStrategy {

  public static handlers: { [key: string]: DetachedRouteHandle } = {};
  private static waitDelete: string;

  private static route: ActivatedRouteSnapshot;

  public static deleteRouteSnapshotAll(): void {
    this.handlers = {};
  }

  public static deleteRouteSnapshot(url: string): void {
    // const key = url.replace(/\//g, '_');
    const key = url.replace(/\//g, '_') + '_' + (this.route.routeConfig.loadChildren || this.route.routeConfig.component.toString().split('(')[0].split(' ')[1] );
    if (SimpleReuseStrategy.handlers[key]) {
      delete SimpleReuseStrategy.handlers[key];
    } else {
      SimpleReuseStrategy.waitDelete = key;
    }
  }

  /** 表示对所有路由允许复用 如果你有路由不想利用可以在这加一些业务逻辑判断 */
  public shouldDetach(route: ActivatedRouteSnapshot): boolean {
    console.log('=======shouldDetach');
    const  data = route.routeConfig && route.routeConfig.data && route.routeConfig.data.isRemove; // 路由中配置了data数据的，才复用
    if (data) {
      return true;  // true代表复用该路由
    } else {
      return false;
    }
  }

  /** 当路由离开时会触发。按path作为key存储路由快照&组件当前实例对象 */
  public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    console.log('=======shouldDetach');
    if (SimpleReuseStrategy.waitDelete && SimpleReuseStrategy.waitDelete === this.getRouteUrl(route)) {
      // 如果待删除是当前路由则不存储快照
      SimpleReuseStrategy.waitDelete = null;
      return;
    }
    SimpleReuseStrategy.handlers[this.getRouteUrl(route)] = handle;
  }

  /** 若 path 在缓存中有的都认为允许还原路由 */
  public shouldAttach(route: ActivatedRouteSnapshot): boolean {
    console.log('=======shouldDetach');
    return !!SimpleReuseStrategy.handlers[this.getRouteUrl(route)];
  }

  /** 从缓存中获取快照，若无则返回nul */
  public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    console.log('=======shouldDetach');
    if (!route.routeConfig) {
      return null;
    }

    return SimpleReuseStrategy.handlers[this.getRouteUrl(route)];
  }

  /** 进入路由触发，判断是否同一路由 */
  public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig &&
      JSON.stringify(future.params) === JSON.stringify(curr.params);
  }

  private getRouteUrl(route: ActivatedRouteSnapshot) {
    // https://www.cnblogs.com/caption/p/9332393.html
    // return route['_routerState'].url.replace(/\//g, '_');

    SimpleReuseStrategy.route = route;

    return route['_routerState'].url.replace(/\//g, '_')
      + '_' + (route.routeConfig.loadChildren || route.routeConfig.component.toString().split('(')[0].split(' ')[1] );
  }
}
