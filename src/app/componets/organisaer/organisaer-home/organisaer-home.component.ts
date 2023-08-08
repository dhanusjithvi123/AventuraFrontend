import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-organisaer-home',
  templateUrl: './organisaer-home.component.html',
  styleUrls: ['./organisaer-home.component.css']
})
export class OrganisaerHomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const organisaerId = localStorage.getItem('organisaerId');
    this.fetchChartData(organisaerId); // Pass organisaerId as an argument
  }

  fetchChartData(organisaerId: string | null): void {
    if (!organisaerId) {
      console.error('organisaerId is not available.');
      return;
    }

    this.http.get<any>(`http://localhost:5000/organisaer/dashbord/${organisaerId}`)
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

  RenderChart(chartData: any) {
    const labels = Object.keys(chartData);
    const data = Object.values(chartData);

    const myChart = new Chart('piechart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
