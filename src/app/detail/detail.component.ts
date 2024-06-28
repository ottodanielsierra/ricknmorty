import { Component } from '@angular/core';
import { CharacterService } from '../services/character.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {

  character: any;

  constructor(private characterService: CharacterService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.characterService.getCharacterWithEpisodes(id).subscribe(data => {
        this.character = data;
      });
    });    
  }
}
