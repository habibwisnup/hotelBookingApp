import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutModule } from "../layout/layout.module";
import { HeaderComponent } from "../layout/header/header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, LayoutModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  guestCount = 1;
  checkInDate = '';
  checkoutDate = '';
  showDateError = false;
  hotelName: string = '';
  hotels: string[] = [];
  filteredHotels: any;
  showSuggestions = false;
  popularRooms: any[] = [];

  defaultDestinations = [
    {
      name: 'Spain',
      imageUrl: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'London',
      imageUrl: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Lisbon',
      imageUrl: 'https://images.unsplash.com/photo-1504470695779-75300268aa0e?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Croatia',
      imageUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Bratislava',
      imageUrl: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Copenhagen',
      imageUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80'
    }
  ];

  roomImages: string[] = [
    'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1504470695779-75300268aa0e?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1468436139062-f60a71c5c892?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1464086181684-4b58ac8b6c89?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80'
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // Cek dan isi hotel dummy jika kurang dari 6
    let hotelsFromStorage = JSON.parse(localStorage.getItem('hotels') || '[]');
    if (!Array.isArray(hotelsFromStorage) || hotelsFromStorage.length <= 6) {
      const dummyHotels = [
        { id: 1, name: 'Spain', ready: true },
        { id: 2, name: 'London', ready: true },
        { id: 3, name: 'Lisbon', ready: true },
        { id: 4, name: 'Croatia', ready: true },
        { id: 5, name: 'Bratislava', ready: true },
        { id: 6, name: 'Copenhagen', ready: true }
      ];
      hotelsFromStorage = dummyHotels;
      localStorage.setItem('hotels', JSON.stringify(dummyHotels));
    }
    this.hotels = hotelsFromStorage;
    console.log(this.hotels);

    // Cek dan isi room dummy untuk setiap hotel (4-8 per hotel)
    let roomsFromStorage = JSON.parse(localStorage.getItem('rooms') || '[]');
    if (!Array.isArray(roomsFromStorage)) roomsFromStorage = [];
    
    let newRooms: any[] = [];
    hotelsFromStorage.forEach((hotel: any, idx: number) => {
      const existingRooms = roomsFromStorage.filter((r: any) => r.hotelId === hotel.id);
      if (existingRooms.length < 4) {
        // Tambahkan room dummy random 4-8
        const roomCount = Math.floor(Math.random() * 5) + 4; // 4-8
        for (let i = 0; i < roomCount; i++) {
          newRooms.push({
            name: `Room ${hotel.name} #${i+1}`,
            hotel: hotel.name,
            hotelId: hotel.id,
            imageUrl: this.getRandomImageFromSix(),
            available: true,
            price: 100 + idx * 20 + i * 10,
            description: `A nice room #${i+1} in ${hotel.name}`,
            rating: 4 + Math.random(),
            reviewsCount: 10 + Math.floor(Math.random() * 20),
            guestCount: 1 + Math.floor(Math.random() * 4)
          });
        }
      }
    });
    if (newRooms.length > 0) {
      roomsFromStorage = roomsFromStorage.concat(newRooms);
      localStorage.setItem('rooms', JSON.stringify(roomsFromStorage));
    }

    // Set tanggal hari ini
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;
    this.checkInDate = todayStr;
    this.checkoutDate = todayStr;

    // Ambil 6 room acak untuk popularRooms jika kosong atau kurang dari 6
    if (!this.popularRooms || this.popularRooms.length < 6) {
      const randomRooms = this.getRandomItems(roomsFromStorage, 6).map(room => ({
        name: room.hotel,
        imageUrl: this.getRandomImageFromSix()
      }));
      this.popularRooms = randomRooms;
    }
  }

  getRandomImages(n: number): string[] {
    const shuffled = this.roomImages
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    return shuffled.slice(0, n);
  }
  
  getRandomImageFromSix(): string {
    const sixImages = this.getRandomImages(20);
    const idx = Math.floor(Math.random() * sixImages.length);
    return sixImages[idx];
  }

  onHotelNameInput() {
    const val = this.hotelName.toLowerCase();
    this.filteredHotels = this.hotels.filter((h: any) => h.name.toLowerCase().includes(val));
    this.showSuggestions = true;
  }

  selectHotel(hotel: any) {
    this.hotelName = hotel.name;
    this.showSuggestions = false;
  }

  hideSuggestions() {
    setTimeout(() => this.showSuggestions = false, 150);
  }

  searchRooms() {
    if (!this.hotelName || !this.checkInDate || !this.checkoutDate) {
      this.showDateError = true;
      setTimeout(() => this.showDateError = false, 2000);
      return;
    }
    this.showDateError = false;
    localStorage.setItem('search', JSON.stringify({
      hotelName: this.hotelName,
      guestCount: this.guestCount,
      checkInDate: this.checkInDate,
      checkoutDate: this.checkoutDate
    }));
    this.router.navigate(['/rooms']);
  }

  goToRooms(hotelName: string) {
    this.hotelName = hotelName;
    localStorage.setItem('search', JSON.stringify({
      hotelName: hotelName,
      guestCount: this.guestCount,
      checkInDate: this.checkInDate,
      checkoutDate: this.checkoutDate
    }));
    this.router.navigate(['/rooms']);
  }

  getRandomItems(arr: any[], n: number) {
    const shuffled = arr.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  }
}