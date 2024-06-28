import {style, animate, trigger, transition, query, group, animateChild} from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    style({position: 'relative'}),
    query(
      ':enter, :leave',
      [
        style({
          position: 'relative',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ],
      {optional: true},
    ),
    query(':enter', [style({opacity: 0 })], {optional: true}),
    query(':leave', animateChild(), {optional: true}),
    group([
      query(':leave', [animate('200ms ease-out', style({opacity: 0}))], {
        optional: true,
      }),
      query(':enter', [animate('300ms ease-out', style({opacity: 1}))], {optional: true}),
      query('@*', animateChild(), {optional: true}),
    ]),
  ]),
]);