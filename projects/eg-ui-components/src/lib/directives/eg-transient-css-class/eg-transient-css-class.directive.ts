import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';

/**
 * This directive will add a definable CSS class (= egTransientClass) to the
 * host and removes it after a customizable timeout (=egDuration). The class
 * will only be added in response to appearance or disappearance of another
 * class (= trackedClass) which can be also defined.
 *
 * A common use case is to react on a change of host classes by adding a
 * transient class to indicate that a CSS animation should be performed. Having
 * this animation class being automatically removed right after the duration of
 * the animation will prevent the animation to be fired again on certain edge
 * cases which can happen on screen rotation for example where the host classes
 * do not change but the renderer fires the animations again.
 *
 * @example <div class="sidebar" [ngClass]="--closed: !sidebarOpen"
 * egTransientCssClass [egTracked]="[{--closed: 'both'}]"
 * [egDuration]="[{--closed: 1000}]"
 * [egTransientClass]="'--my-transient-class'"></div>
 *
 * This example declaration will add the '--my-transient-class' class for a
 * duration of 1000ms to the host whenever the class '--closed' appears or
 * disappears from the host. The boolean value indicates on what event the
 * egTransientClass should appear: When 'true' it will appear on appearance AND
 * disappearance of the defined class. When 'false' the animation flag will only
 * appear on appearance of the defined class.
 *
 * @example <div egTransientCssClass [egTracked]="[{--closed: 'both'}, {--open:
 * 'add'}]" [egDuration]="[{--closed: 1000}, {--open: 2000}]"
 * [egTransientClass]="'--my-transient-class'"></div>
 *
 * This example highlights of how to use this directive for multiple classes
 * that needs to be animated with different timeouts.
 *
 */
@Directive({
  selector: '[egTransientCssClass]'
})
export class EgTransientCssClassDirective implements OnInit, OnDestroy {
  /**
   * Tracked CSS classes
   */
  @Input('egTracked') egTracked: Array<{
    [key: string]: 'add' | 'remove' | 'both';
  }> = [];

  @Input('egDuration') egDuration: Array<{
    [key: string]: number;
  }> = [];

  /**
   * CSS class name
   */
  @Input('egTransientClass') egTransientClass!: string;

  @HostBinding('class') get classes(): string {
    if (this.hasTransientClass) {
      if (!this.egTransientClass) {
        console.warn(
          '[EgTransientCssClassDirective] no transient class name defined. Action skipped. You must define [egTransientClass]'
        );
      }
      return this.egTransientClass ? this.egTransientClass : '';
    }
    return '';
  }

  private hasTransientClass = false;

  /**
   * Last state we reacted to.
   */
  private previousMutationCssClasses: string | undefined;

  private changeObserver!: MutationObserver;

  constructor(private elemRef: ElementRef) {}
  public ngOnInit(): void {
    // MutationObserver delivers array of 3 MutationRecores. From what I'vse seen, the first one is the relevant one.
    this.changeObserver = new MutationObserver((mutations: MutationRecord[]) =>
      this.onHostCssClassChange(
        mutations[0].oldValue,
        ((mutations[0].target as unknown) as { className: string })
          .className as string
      )
    );
    this.changeObserver.observe(this.elemRef.nativeElement, {
      attributeFilter: ['class'],
      attributeOldValue: true
    } as MutationObserverInit);
  }

  public ngOnDestroy(): void {
    this.changeObserver?.disconnect();
  }

  /**
   * @param previousClasses - String of CSS classes from previous mutation
   * @param currentClasses - String of CSS classes from current mutation
   */
  public onHostCssClassChange(
    previousClasses: string | null,
    currentClasses: string
  ): void {
    // Be aware that there can be multiple mutations in a row where CSS classes
    // did not change. We can skip these 'nothing changed' events.
    if (this.previousMutationCssClasses === currentClasses) {
      return; // nothing changed;
    }
    this.previousMutationCssClasses = currentClasses;

    this.getKeys(this.egTracked).forEach((key) =>
      this.updateAnimationTagForTrackedCssClass(
        key,
        this.cssClassesToArray(previousClasses),
        this.cssClassesToArray(currentClasses)
      )
    );
  }

  /**
   * Splits a string with 0...n CSS class names to an array.
   *
   * @param classes - string with CSS class names separated by space
   */
  private cssClassesToArray(classes: string | null): string[] | undefined {
    return classes ? classes.split(' ') : undefined;
  }

  /**
   * Here we check if one of our tracked CSS classes was added or removed and
   * check if we should add the animation CSS tag for that event.
   */
  private updateAnimationTagForTrackedCssClass(
    key: string,
    previousState: string[] | undefined,
    currentState: string[] | undefined
  ) {
    const added =
      !this.hasClass(key, previousState) && this.hasClass(key, currentState);

    const removed =
      this.hasClass(key, previousState) && !this.hasClass(key, currentState);

    const shouldActOn = this.getValueForKey(key, this.egTracked);

    if (added && (shouldActOn === 'add' || shouldActOn === 'both')) {
      this.addAnimationTagAndRemoveOnTimeout(key);
    }

    if (removed && (shouldActOn === 'remove' || shouldActOn === 'both')) {
      this.addAnimationTagAndRemoveOnTimeout(key);
    }
  }

  /**
   * Ensures that the host binding for the animation tag will set the class AND
   * remove the class after the desired timeout.
   */
  private addAnimationTagAndRemoveOnTimeout(key: string) {
    if (!this.egDuration) {
      console.warn(
        '[EgTransientCssClassDirective] no custom duration defined, fallback to default duration. You should define [egDuration]'
      );
    }

    const timeout = this.getValueForKey(key, this.egDuration) ?? 1000;

    this.hasTransientClass = true;
    setTimeout(() => {
      this.hasTransientClass = false;
    }, timeout);
  }

  private hasClass(className: string, classes: string[] | undefined): boolean {
    if (classes) {
      for (let index = 0; index < classes.length; index++) {
        if (classes[index] === className) {
          return true;
        }
      }
    }
    return false;
  }

  private getKeys(arr: Array<{ [key: string]: any }>): string[] {
    return arr ? arr.map((elem) => Object.keys(elem)[0]) ?? [] : [];
  }

  private getValueForKey<T>(
    key: string,
    arr: Array<{ [key: string]: T }>
  ): T | undefined {
    if (key && arr) {
      const elemForKey = arr.find((elem) => Object.keys(elem)[0] === key);
      if (elemForKey) {
        return elemForKey[key];
      }
    }
    return undefined;
  }
}
