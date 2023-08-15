import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-organisaer-home',
  templateUrl: './organisaer-home.component.html',
  styleUrls: ['./organisaer-home.component.css']
})
export class OrganisaerHomeComponent implements OnInit {
  totalPackage: number = 0;
  totalCurrency: number = 0;
  totalOrders: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const organisaerId = localStorage.getItem('organisaerId');
    this.fetchChartData(organisaerId); // Pass organisaerId as an argument
    // this.fetchBookingData(organisaerId);
    this.dashboardData(organisaerId);
  }

  fetchChartData(organisaerId: string | null): void {
    if (!organisaerId) {
      console.error('organisaerId is not available.');
      return;
    }

    this.http.get<any>(`http://www.backend.aventuraevents.site/organisaer/dashbord/${organisaerId}`)
      .subscribe(
        (data: any) => {
          console.log('Fetched data:', data); // Debugging: Check the structure of the fetched data
          // Process the data received from the backend and render the chart
          if (data && data.orderChart && data.orderChart.length > 0) {
            this.RenderChart(data.orderChart[0].data);
          } else {
            console.error('No chart data available.');
          }
        },
        (error: any) => {
          console.error('Error fetching chart data:', error);
        }
      );
  }



  // fetchBookingData(organisaerId: string | null): void {
  //   if (!organisaerId) {
  //     console.error('organisaerId is not available.');
  //     return;
  //   }
    
  //   this.http.get<any>(`http://localhost:5000/organisaer/bookinggraph/${organisaerId}`)
  //     .subscribe(
  //       (data: any) => {
  //         console.log('Fetched booking data:', data);
  //         if (data && data.bookingChart && data.bookingChart.length > 0) {
  //           this.RenderBookingChart(data.bookingChart[0].data);
  //         } else {
  //           console.error('No booking data available.');
  //         }
  //       },
  //       (error: any) => {
  //         console.error('Error fetching booking data:', error);
  //       }
  //     );
  // }



  dashboardData(organisaerId: string | null): void {
    if (!organisaerId) {
      console.error('organisaerId is not available.');
      return;
    }
    
    this.http.get<any>(`http://www.backend.aventuraevents.site/organisaer/dashboardData/${organisaerId}`)
      .subscribe(
        (data: any) => {
          console.log('Fetched dashboard data:', data);
          this.totalPackage = data.totalPackage;
          this.totalCurrency = data.totalCurrency;
          this.totalOrders = data.totalOrders;
         
        },
        (error: any) => {
          console.error('Error fetching booking data:', error);
        }
      );
  }
  
  

  RenderChart(chartData: any) {
    const labels = Object.keys(chartData);
    const data = Object.values(chartData);
  
    const myChart = new Chart('piechart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Number of Events',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1 // Set the step size for y-axis ticks
            }
          }
        }
      }
    });
  }


  


  RenderBookingChart(bookingData: any[]) {
    const labels = bookingData.map(entry => entry.createdAt); // Assuming you want to use createdAt as labels
    const data = bookingData.map(entry => entry.Qtystatus); // Assuming you want to use Qtystatus as data
  
    const myBookingChart = new Chart('bookingChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Number of Bookings',
          data: data,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }
  
  
  
  

}
