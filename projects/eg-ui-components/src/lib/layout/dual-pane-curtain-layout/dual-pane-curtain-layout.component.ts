import {
  Component,
  HostBinding,
  Input,
  OnInit,
  TemplateRef
} from '@angular/core';

import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'eg-dual-pane-curtain-layout',
  templateUrl: './dual-pane-curtain-layout.component.html',
  styleUrls: ['./dual-pane-curtain-layout.component.scss']
})
export class EgDualPaneCurtainLayoutComponent implements OnInit {
  private subscription$ = new Subscription();
  @Input()
  public stateOneActive!: Observable<boolean>;

  @HostBinding('class')
  public stateClass: string = '';

  public isStateOne!: boolean;

  @Input()
  public stateOneContentTmpl!: TemplateRef<any>;

  @Input()
  public stateTwoContentTmpl!: TemplateRef<any>;

  @Input()
  public asideOneContentTmpl!: TemplateRef<any>;

  @Input()
  public asideTwoContentTmpl!: TemplateRef<any>;

  public ngOnInit(): void {
    this.subscription$.add(
      this.stateOneActive.subscribe((isStateOne) =>
        this.toggleState(isStateOne)
      )
    );
    this.toggleState(true);
  }

  private toggleState(isStateOne: boolean) {
    this.isStateOne = isStateOne;
    this.stateClass = isStateOne ? '-state-one' : '-state-two';
  }

  public ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }
}
