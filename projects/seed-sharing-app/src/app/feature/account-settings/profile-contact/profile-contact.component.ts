import { Component, Input, OnInit } from '@angular/core';
import { SeedSharingAccountDto } from '@eg/edible-garden-api/src/public-api';

import { EgIconType } from 'projects/eg-ui-dynamic-icons/src/public-api';

@Component({
  selector: 'seed-profile-contact',
  templateUrl: './profile-contact.component.html',
  styleUrls: ['./profile-contact.component.scss']
})
export class ProfileContactComponent implements OnInit {

  @Input()
  public accountData: SeedSharingAccountDto | undefined;

  public EgIconType = EgIconType;

  constructor() { }

  ngOnInit(): void {
  }

}
