import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface LeaderboardUser {
  rank: number;
  name: string;
  level: number;
  score: number;
  avatar: string;
  isCurrentUser?: boolean;
}

@Component({
  selector: 'app-leaderboard',
  imports: [CommonModule],
  templateUrl: './leaderboard.html',
  styleUrl: './leaderboard.scss',
  standalone: true
})
export class Leaderboard {
  users = signal<LeaderboardUser[]>([
    {
      rank: 120,
      name: 'You',
      level: 5,
      score: 5354,
      avatar: 'assets/user.png',
      isCurrentUser: true
    },
    {
      rank: 1,
      name: 'user1',
      level: 90,
      score: 100454,
      avatar: 'assets/user.png'
    },
    {
      rank: 2,
      name: 'user2',
      level: 89,
      score: 99845,
      avatar: 'assets/user.png'
    },
    {
      rank: 3,
      name: 'user3',
      level: 89,
      score: 95445,
      avatar: 'assets/user.png'
    }
  ]);
}
